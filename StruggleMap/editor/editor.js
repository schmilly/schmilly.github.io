/* ================================================================
Strike Data Editor v8
Add key at top of object
Delete keys / array entries / table rows
Change lat/lng ref to different variable (autocomplete)
Convert leaf to variable reference (autocomplete)
Generic schema from all entries for new-entry template
Workers quick-set for strike data
Editable source view + localStorage cache
================================================================ */
const FILES = ['locations.js', 'data.js'];
const CACHE_KEY = 'strike-editor-cache-v1';
const state = {
  locationFilter: null,
  files: {}, runtime: {}, trees: {},
  usages: {}, usageCounts: {},
  selection: null,
  search: '',
  evalError: null,
  expandedRows: new Set(),
  detailsOpen: new Map(),
  viewScroll: 0,
  usageFilter: null,
  viewMode: 'edit',
  highlightLine: null,
  colFilters: {},
  coordMode: 'all',
  sort: null,
  filterPopover: null,
  selectedRows: new Set(),
  bulkCol: null,
  schemaCache: new Map(),   // arrayPath -> [keys]
  focusRow: null,
};
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&', '<': '<', '>': '>', '"': '"', "'": "'" }[c]));
const cssEsc = s => (window.CSS && CSS.escape) ? CSS.escape(s) : String(s).replace(/"/g, '\\"');
function toast(msg, kind = '') {
  const el = document.createElement('div');
  el.className = 'toast ' + kind; el.textContent = msg;
  document.body.appendChild(el); setTimeout(() => el.remove(), 2600);
}
/* ================================================================
LINE INDEX
================================================================ */
function buildLineIndex(src) {
  const starts = [0];
  for (let i = 0; i < src.length; i++) if (src.charCodeAt(i) === 10) starts.push(i + 1);
  return starts;
}
function lineOf(li, pos) {
  let lo = 0, hi = li.length - 1;
  while (lo < hi) { const m = (lo + hi + 1) >> 1; if (li[m] <= pos) lo = m; else hi = m - 1; }
  return lo + 1;
}
/* ================================================================
USAGE COLLECTION
================================================================ */
function collectUsages(fileName, ast, source, lineIndex) {
  const usages = [];
  const isUsage = (node, parent) => {
    if (node.type !== 'Identifier') return false;
    if (!parent) return true;
    if (parent.type === 'MemberExpression' && parent.property === node && !parent.computed) return false;
    if (parent.type === 'Property') {
      if (parent.shorthand) return true;
      if (parent.key === node && !parent.computed) return false;
    }
    if (parent.type === 'VariableDeclarator' && parent.id === node) return false;
    if ((parent.type === 'FunctionDeclaration' || parent.type === 'FunctionExpression'
      || parent.type === 'ArrowFunctionExpression') && parent.params?.includes(node)) return false;
    if (parent.type === 'LabeledStatement' && parent.label === node) return false;
    return true;
  };
  const resolveChain = (node) => {
    const parts = [];
    let cur = node;
    while (cur.type === 'MemberExpression') {
      if (cur.computed) {
        if (cur.property.type === 'Literal') parts.unshift(cur.property.value);
        else parts.unshift('');
      } else parts.unshift(cur.property.name);
      cur = cur.object;
    }
    if (cur.type === 'Identifier') return { root: cur, path: parts };
    return null;
  };
  const extractLabel = (objNode) => {
    if (!objNode || objNode.type !== 'ObjectExpression') return null;
    for (const want of ['id', 'actionId', 'title', 'name']) {
      for (const p of objNode.properties) {
        if (p.type !== 'Property') continue;
        let key;
        if (!p.computed && p.key.type === 'Identifier') key = p.key.name;
        else if (!p.computed && p.key.type === 'Literal') key = p.key.value;
        if (key === want && p.value.type === 'Literal') return { key: want, value: p.value.value };
      }
    }
    return null;
  };
  const walk = (node, parent, ctx) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach(n => walk(n, parent, ctx)); return; }
    if (!node.type) return;
    if (node.type === 'MemberExpression') {
      const chain = resolveChain(node);
      if (chain) {
        const line = lineOf(lineIndex, chain.root.start);
        usages.push({
          name: chain.root.name, path: chain.path,
          file: fileName, line,
          col: chain.root.start - (lineIndex[line - 1] || 0),
          varName: ctx.varName, arrayIndex: ctx.arrayIndex,
          recordLabel: ctx.recordLabel, pos: chain.root.start,
        });
        let cur = node;
        while (cur.type === 'MemberExpression') {
          if (cur.computed) walk(cur.property, cur, ctx);
          cur = cur.object;
        }
        return;
      }
    }
    if (node.type === 'Identifier' && isUsage(node, parent)) {
      const line = lineOf(lineIndex, node.start);
      usages.push({
        name: node.name, path: [],
        file: fileName, line,
        col: node.start - (lineIndex[line - 1] || 0),
        varName: ctx.varName, arrayIndex: ctx.arrayIndex,
        recordLabel: ctx.recordLabel, pos: node.start,
      });
    }
    if (node.type === 'ArrayExpression') {
      node.elements.forEach((el, i) => {
        if (!el) return;
        walk(el, node, {
          ...ctx,
          arrayIndex: ctx.arrayIndex == null ? i : ctx.arrayIndex,
          recordLabel: ctx.recordLabel || extractLabel(el),
        });
      });
      return;
    }
    if (node.type === 'Property') {
      if (node.computed) walk(node.key, node, ctx);
      walk(node.value, node, ctx);
      return;
    }
    for (const key in node) {
      if (key === 'start' || key === 'end' || key === 'loc' || key === 'range') continue;
      const child = node[key];
      if (child && typeof child === 'object') walk(child, node, ctx);
    }
  };
  for (const stmt of ast.body) {
    if (stmt.type === 'VariableDeclaration') {
      for (const d of stmt.declarations) if (d.init) walk(d.init, null, { varName: d.id.name });
    } else walk(stmt, null, { varName: '(top-level)' });
  }
  return usages;
}
function pathMatches(usagePath, targetPath) {
  if (usagePath.length < targetPath.length) return false;
  for (let i = 0; i < targetPath.length; i++) {
    if (usagePath[i] === '' || targetPath[i] === '') continue;
    if (usagePath[i] !== targetPath[i]) return false;
  }
  return true;
}
function getUsagesForPath(varName, path) {
  const list = state.usages[varName] || [];
  if (!path || !path.length) return list;
  return list.filter(u => pathMatches(u.path, path));
}
/* ================================================================
FILE PARSING
================================================================ */
function parseSource(text) {
  const ast = acorn.parse(text, { ecmaVersion: 2022, sourceType: 'script' });
  const vars = [];
  for (const stmt of ast.body) {
    if (stmt.type === 'VariableDeclaration') {
      for (const d of stmt.declarations) {
        if (d.id.type === 'Identifier' && d.init) vars.push({ name: d.id.name, node: d.init });
      }
    }
  }
  return { ast, vars };
}
function loadFileText(name, text, handle) {
  let parsed;
  try { parsed = parseSource(text); }
  catch (e) { toast(`Parse error in ${name}: ${e.message}`, 'err'); return false; }
  state.files[name] = {
    name, source: text, lines: text.split('\n'),
    ast: parsed.ast, vars: parsed.vars,
    handle: handle || null,
    lineIndex: buildLineIndex(text),
  };
  return true;
}
async function handleFiles(fileList) {
  for (const f of fileList) loadFileText(f.name, await f.text(), null);
  rebuildAll();
}
/* ================================================================
COMMIT EDIT
================================================================ */
function commitEdit(fileName, splices) {
  const file = state.files[fileName];
  if (!file) return false;
  if (!splices.length) return false;
  const sorted = [...splices].sort((a, b) => b.start - a.start);
  let newSource = file.source;
  for (const s of sorted) {
    if (s.start < 0 || s.end > newSource.length || s.start > s.end) {
      toast('Edit offset out of range — reload the page.', 'err');
      return false;
    }
    newSource = newSource.slice(0, s.start) + s.text + newSource.slice(s.end);
  }
  let parsed;
  try { parsed = parseSource(newSource); }
  catch (e) {
    toast('Edit would break ' + fileName + ': ' + e.message, 'err');
    return false;
  }
  file.source = newSource;
  file.ast = parsed.ast;
  file.vars = parsed.vars;
  file.lineIndex = buildLineIndex(newSource);
  file.lines = newSource.split('\n');
  saveToCache();
  return true;
}
/* ================================================================
AST -> TREE
================================================================ */
function buildTree(node, value, source, file) {
  const t = node.type;
  if (t === 'Literal' || t === 'TemplateLiteral' ||
    (t === 'UnaryExpression' && (node.operator === '-' || node.operator === '+'))) {
    return { kind: 'leaf', node, value, source, file };
  }
  if (t === 'ArrayExpression') {
    const children = (node.elements || []).map((el, i) => {
      if (!el) return { kind: 'hole', index: i };
      const v = Array.isArray(value) ? value[i] : undefined;
      return buildTree(el, v, source, file);
    });
    return { kind: 'array', node, value, children, source, file };
  }
  if (t === 'ObjectExpression') {
    const children = [];
    for (const p of node.properties) {
      if (p.type !== 'Property') continue;
      let key;
      if (!p.computed && p.key.type === 'Identifier') key = p.key.name;
      else if (!p.computed && p.key.type === 'Literal') key = p.key.value;
      else key = null;
      const v = (value && typeof value === 'object') ? value[key] : undefined;
      children.push({ key: key ?? '?', keyNode: p.key, value: buildTree(p.value, v, source, file) });
    }
    return { kind: 'object', node, value, children, source, file };
  }
  return { kind: 'ref', node, value, source, file, text: source.slice(node.start, node.end) };
}
/* ================================================================
COORD HELPERS
================================================================ */
const LAT_KEYS = new Set(['lat', 'latitude']);
const LNG_KEYS = new Set(['lng', 'lon', 'long', 'longitude']);
function findCoordNodes(rootNode) {
  const lats = [], lngs = [];
  const walk = (node) => {
    if (!node || typeof node !== 'object') return;
    if (node.kind === 'object') {
      for (const child of node.children) {
        const k = String(child.key).toLowerCase();
        if (LAT_KEYS.has(k)) lats.push(child.value);
        else if (LNG_KEYS.has(k)) lngs.push(child.value);
        walk(child.value);
      }
    } else if (node.kind === 'array') {
      for (const c of node.children) walk(c);
    }
  };
  walk(rootNode);
  return { lats, lngs };
}
function classifyCoordRecord(rec) {
  const { lats, lngs } = findCoordNodes(rec);
  if (lats.length || lngs.length) {
    const anyRef = [...lats, ...lngs].some(n => n.kind === 'ref');
    return anyRef ? 'ref' : 'raw';
  }
  for (const child of rec.children || []) {
    if ((child.key === 'locations' || child.key === 'location') && child.value.kind === 'ref') {
      return 'ref';
    }
  }
  return null;
}
/* ================================================================
EVALUATION / REBUILD
================================================================ */
function rebuildAll() {
  const present = FILES.filter(n => state.files[n]);
  if (!present.length) {
    state.runtime = {}; state.trees = {}; state.usages = {}; state.usageCounts = {};
    state.evalError = null; state.schemaCache.clear();
    renderSidebar(); renderMain(); updateStatus();

    return;
  }
  const body = $('#mainBody');
  state.viewScroll = body ? body.scrollTop : 0;
  document.querySelectorAll('details[data-path]').forEach(d => {
    state.detailsOpen.set(d.dataset.path, d.open);
  });
  const combined = present.map(n => `/* ==== ${n} ==== */\n${state.files[n].source}`).join('\n;\n');
  const sandbox = {};
  state.evalError = null;
  try { new Function('window', 'self', 'globalThis', combined)(sandbox, sandbox, sandbox); }
  catch (e) {
    state.evalError = e.message;
    console.error(e);
    updateStatus();
    return;
  }
  state.runtime = sandbox;
  state.trees = {};
  for (const name of present) {
    const f = state.files[name];
    for (const v of f.vars) {
      state.trees[name + '::' + v.name] = buildTree(v.node, sandbox[v.name], f.source, name);
    }
  }
  state.usages = {};
  for (const name of present) {
    const f = state.files[name];
    const list = collectUsages(name, f.ast, f.source, f.lineIndex);
    for (const u of list) (state.usages[u.name] ||= []).push(u);
  }
  state.usageCounts = {};
  for (const [varName, list] of Object.entries(state.usages)) {
    const files = {};
    for (const u of list) files[u.file] = (files[u.file] || 0) + 1;
    state.usageCounts[varName] = { total: list.length, files };
  }
  state.schemaCache.clear();
  renderSidebar(); renderMain(); updateStatus();
}
function updateStatus() {
  const loaded = Object.keys(state.files);
  const banner = $('#banner');
  if (state.evalError) {
    banner.textContent = '⚠ Evaluation error: ' + state.evalError;
    banner.classList.remove('hidden');
  } else banner.classList.add('hidden');
  if (!loaded.length) {
    $('#status').textContent = 'No files loaded';
    $('#saveBtn').disabled = true; $('#saveAsBtn').disabled = true;
    return;
  }
  const varCount = loaded.reduce((a, n) => a + state.files[n].vars.length, 0);
  const usageTotal = Object.values(state.usageCounts).reduce((a, c) => a + c.total, 0);
  $('#status').textContent = `${loaded.length} file(s) · ${varCount} variables · ${usageTotal} usages`;
  $('#saveBtn').disabled = !Object.values(state.files).some(f => f.handle);
  $('#saveAsBtn').disabled = false;
}
/* ================================================================
CACHE (localStorage)
================================================================ */
function saveToCache() {
  const data = {};
  for (const name of FILES) {
    if (state.files[name]) data[name] = state.files[name].source;
  }
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(data)); } catch { }
}
function loadFromCache() {
  const raw = localStorage.getItem(CACHE_KEY);
  if (!raw) return false;
  try {
    const data = JSON.parse(raw);
    let loaded = 0;
    for (const [name, source] of Object.entries(data)) {
      if (loadFileText(name, source, null)) loaded++;
    }
    if (loaded) { rebuildAll(); return true; }
  } catch { }
  return false;
}
function clearCache() {
  localStorage.removeItem(CACHE_KEY);
  toast('Cache cleared', 'ok');
  renderCacheBanner();
}
function renderCacheBanner() {
  let banner = $('#cacheBanner');
  const hasCache = !!localStorage.getItem(CACHE_KEY);
  if (!hasCache) {
    if (banner) banner.remove();
    return;
  }
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'cacheBanner';
    banner.className = 'cache-banner';
    document.body.insertBefore(banner, document.querySelector('.app') || document.body.firstChild);
  }
  banner.innerHTML = '';
  const lbl = document.createElement('span');
  lbl.textContent = '💾 Cached data available in browser';
  banner.appendChild(lbl);
  const spacer = document.createElement('span'); spacer.className = 'spacer';
  banner.appendChild(spacer);
  const loadBtn = document.createElement('button');
  loadBtn.textContent = 'Load from cache';
  loadBtn.onclick = () => {
    if (loadFromCache()) toast('Loaded from cache', 'ok');
    else toast('Cache was empty', '');
  };
  const clrBtn = document.createElement('button');
  clrBtn.textContent = 'Clear cache';
  clrBtn.onclick = () => {
    if (confirm('Clear cached data? This cannot be undone.')) clearCache();
  };
  banner.appendChild(loadBtn);
  banner.appendChild(clrBtn);
}
/* ================================================================
SIDEBAR
================================================================ */
function renderSidebar() {
  const sb = $('#sidebar'); sb.innerHTML = '';
  const loaded = Object.keys(state.files);
  if (!loaded.length) {
    sb.innerHTML = `<div style="padding:16px;color:var(--muted);font-size:12px">Load files to see variables.</div>`;
    return;
  }
  for (const name of FILES) {
    const f = state.files[name];
    const group = document.createElement('div'); group.className = 'file-group';
    const head = document.createElement('div'); head.className = 'file-header';
    head.innerHTML = `<span class="dot ${f ? '' : 'off'}"></span>${esc(name)}`;
    group.appendChild(head);
    if (!f) {
      const d = document.createElement('div'); d.className = 'var-item';
      d.style.color = 'var(--muted)'; d.style.cursor = 'default'; d.textContent = 'not loaded';
      group.appendChild(d);
    } else {
      const sorted = [...f.vars].sort((a, b) =>
        (state.usageCounts[b.name]?.total || 0) - (state.usageCounts[a.name]?.total || 0));
      for (const v of sorted) {
        const val = state.runtime[v.name];
        const item = document.createElement('div'); item.className = 'var-item';
        if (state.selection && state.selection.file === name && state.selection.name === v.name)
          item.classList.add('active');
        let size = '';
        if (Array.isArray(val)) size = `${val.length}`;
        else if (val && typeof val === 'object') size = `${Object.keys(val).length}`;
        const counts = state.usageCounts[v.name];
        const total = counts?.total || 0;
        const usedElsewhere = counts ? Object.keys(counts.files).some(fn => fn !== name) : false;
        const usageClass = total === 0 ? 'uses-zero' : (usedElsewhere ? 'uses-other' : 'uses-self');
        item.innerHTML = `<span class="var-name">${esc(v.name)}</span> <span class="var-meta"> ${size ? `<span class="count">${size}</span>` : ''} <span class="uses-badge ${usageClass}">${total}</span> </span>`;
        item.onclick = () => {
          state.selection = { file: name, name: v.name };
          state.usageFilter = null; state.viewMode = 'edit';
          state.colFilters = {}; state.coordMode = 'all'; state.sort = null;
          state.locationFilter = null;
          state.selectedRows = new Set(); state.bulkCol = null;
          renderSidebar(); renderMain();
          updateUrl('push');
        };
        group.appendChild(item);
      }
    }
    sb.appendChild(group);
  }
}
/* ================================================================
MAIN RENDER
================================================================ */
function renderMain() {
  const body = $('#mainBody'); body.innerHTML = '';
  closeFilterPopover(); closeAutocomplete();
  $$('#viewToggle button').forEach(b => b.classList.toggle('active', b.dataset.view === state.viewMode));
  if (!state.selection) {
    $('#mainTitle').textContent = '—';
    $('#mainBadge').textContent = '';
    $('#usesChip').classList.add('hidden');
    $('#addEntryBtn').classList.add('hidden');
    $('#coordMode').classList.add('hidden');
    body.innerHTML = `<div class="empty"> <h2>${Object.keys(state.files).length ? 'Select a variable' : 'No files loaded'}</h2> <p>${Object.keys(state.files).length ? 'Pick something from the sidebar.' : 'Load <code>locations.js</code> and <code>data.js</code> to get started.'}</p> </div>`;
    return;
  }
  const { file, name } = state.selection;
  if (state.viewMode === 'source') {
    $('#mainTitle').textContent = name;
    $('#mainBadge').textContent = `${file} · source view (editable)`;
    $('#usesChip').classList.add('hidden');
    $('#addEntryBtn').classList.add('hidden');
    $('#coordMode').classList.add('hidden');
    body.appendChild(renderSourceView(file));
    return;
  }
  const tree = state.trees[file + '::' + name];
  if (!tree) { body.innerHTML = `<div class="empty"><h2>Not found</h2></div>`; return; }
  const val = tree.value;
  const typeStr = Array.isArray(val) ? `Array(${val.length})`
    : val === null ? 'null'
      : (typeof val === 'object' ? `Object(${Object.keys(val).length})` : typeof val);
  $('#mainTitle').textContent = name;
  $('#mainBadge').textContent = `${file} · ${typeStr}`;
  const isObjArr = tree.kind === 'array' && isObjectArray(tree);
  const addBtn = $('#addEntryBtn');
  if (isObjArr) {
    addBtn.classList.remove('hidden');
    addBtn.onclick = () => addArrayEntry(tree, file + '::' + name);
  } else addBtn.classList.add('hidden');
  const hasCoords = isObjArr && tree.children.some(c =>
    c.kind === 'object' && classifyCoordRecord(c) !== null);
  $('#coordMode').classList.toggle('hidden', !hasCoords);
  if (hasCoords) {
    $$('#coordMode button').forEach(b => {
      b.classList.toggle('active', b.dataset.mode === state.coordMode);
      b.onclick = () => { state.coordMode = b.dataset.mode; renderMain(); };
    });
  }
  const usage = state.usageCounts[name];
  const chip = $('#usesChip');
  if (usage && usage.total > 0) {
    chip.classList.remove('hidden');
    $('#usesChipCount').textContent = usage.total;
    chip.onclick = () => {
      const panel = $('.usages-panel');
      if (panel) { panel.open = !panel.open; if (panel.open) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
    };
  } else chip.classList.add('hidden');
  body.appendChild(renderUsagesPanel(name, file));
  const wrap = document.createElement('div');
  body.appendChild(wrap);
  const ctx = { varName: name, logicPath: [] };
  if (isObjArr) wrap.appendChild(renderRecordTable(tree, file + '::' + name, ctx));
  else wrap.appendChild(renderNode(tree, file + '::' + name, 0, ctx));
  requestAnimationFrame(() => { body.scrollTop = state.viewScroll; });
}
function isObjectArray(node) {
  if (node.kind !== 'array' || !node.children.length) return false;
  let objs = 0, total = 0;
  for (const c of node.children) {
    if (c.kind === 'hole') continue;
    total++;
    if (c.kind === 'object' && c.children.length > 0) objs++;
  }
  return total > 0 && objs === total;
}
/* ================================================================
SOURCE VIEW (editable)
================================================================ */
function renderSourceView(file) {
  const f = state.files[file];
  const wrap = document.createElement('div');
  wrap.className = 'source-editor-wrap';
  const toolbar = document.createElement('div');
  toolbar.className = 'source-toolbar';
  const saveBtn = document.createElement('button');
  saveBtn.className = 'primary';
  saveBtn.textContent = '💾 Save source';
  saveBtn.title = 'Parse and re-render (Ctrl/Cmd+S)';
  const revertBtn = document.createElement('button');
  revertBtn.textContent = '↺ Revert';
  revertBtn.title = 'Discard unsaved changes in editor';
  const fileSaveBtn = document.createElement('button');
  fileSaveBtn.textContent = '💾 Save to disk';
  fileSaveBtn.disabled = !f.handle;
  fileSaveBtn.onclick = async () => {
    try {
      const w = await f.handle.createWritable();
      await w.write(ta.value); await w.close();
      toast('Saved to disk', 'ok');
    } catch (e) { toast('Save failed: ' + e.message, 'err'); }
  };
  const status = document.createElement('span');
  status.className = 'source-status';
  const updateStatus = () => {
    const lines = ta.value.split('\n').length;
    const dirty = ta.value !== f.source;
    status.textContent = `${lines} lines · ${ta.value.length} chars${dirty ? ' · unsaved' : ''}`;
    status.style.color = dirty ? 'var(--warn)' : 'var(--muted)';
  };
  saveBtn.onclick = () => {
    const newText = ta.value;
    if (newText === f.source) { toast('No changes', ''); return; }
    try { parseSource(newText); }
    catch (e) { toast('Parse error: ' + e.message, 'err'); return; }
    f.source = newText;
    f.lines = newText.split('\n');
    f.lineIndex = buildLineIndex(newText);
    const parsed = parseSource(newText);
    f.ast = parsed.ast;
    f.vars = parsed.vars;
    saveToCache();
    rebuildAll();
    toast('Source saved & re-rendered', 'ok');
  };
  revertBtn.onclick = () => {
    ta.value = f.source;
    updateStatus();
    toast('Reverted to last saved', '');
  };
  toolbar.appendChild(saveBtn);
  toolbar.appendChild(revertBtn);
  if (f.handle) toolbar.appendChild(fileSaveBtn);
  toolbar.appendChild(status);
  const ta = document.createElement('textarea');
  ta.className = 'source-editor';
  ta.value = f.source;
  ta.spellcheck = false;
  ta.autocapitalize = 'off';
  ta.oninput = updateStatus;
  ta.onkeydown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const s = ta.selectionStart, end = ta.selectionEnd;
      ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(end);
      ta.selectionStart = ta.selectionEnd = s + 2;
      updateStatus();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      saveBtn.click();
    }
  };
  updateStatus();
  wrap.appendChild(toolbar);
  wrap.appendChild(ta);
  requestAnimationFrame(() => ta.focus());
  return wrap;
}
/* ================================================================
USAGES PANEL
================================================================ */
function renderUsagesPanel(name, ownFile) {
  const panel = document.createElement('details');
  panel.className = 'usages-panel';
  const pathFilter = state.usageFilter?.path || [];
  const list = pathFilter.length ? getUsagesForPath(name, pathFilter) : (state.usages[name] || []);
  const fullList = state.usages[name] || [];
  panel.open = list.length > 0 && list.length <= 5;
  const sum = document.createElement('summary');
  if (!fullList.length) {
    sum.innerHTML = `<span class="uses-zero-label">No usages found in the loaded files</span>`;
    panel.appendChild(sum); panel.open = false;
    return panel;
  }
  const groups = new Map();
  for (const u of list) {
    const key = u.file + '::' + u.varName;
    if (!groups.has(key)) groups.set(key, { file: u.file, varName: u.varName, items: [] });
    groups.get(key).items.push(u);
  }
  const byFile = {};
  for (const u of list) byFile[u.file] = (byFile[u.file] || 0) + 1;
  const chipHtml = Object.entries(byFile).map(([f, c]) =>
    `<span class="uses-chip${f === ownFile ? ' uses-chip-self' : ''}">${esc(f)}<em>${c}</em></span>`).join('');
  const pathChip = pathFilter.length
    ? `<span class="path-filter" id="clearPathFilter">${esc(pathFilter.join('.'))} ✕</span>` : '';
  sum.innerHTML = `<span class="uses-count">${list.length}${pathFilter.length ? '/' + fullList.length : ''}</span> <span class="uses-summary-text">uses of <code>${esc(name)}</code> ${pathChip}</span> <span class="uses-chips">${chipHtml}</span> <span class="uses-hint">click a line to jump</span>`;
  panel.appendChild(sum);
  setTimeout(() => {
    const clr = $('#clearPathFilter');
    if (clr) clr.onclick = (e) => {
      e.stopPropagation(); e.preventDefault();
      state.usageFilter = null; renderMain();
    };
  });
  const bodyEl = document.createElement('div'); bodyEl.className = 'uses-body';
  const groupList = [...groups.values()].sort((a, b) => {
    if (a.file !== b.file) {
      if (a.file === ownFile) return 1;
      if (b.file === ownFile) return -1;
      return a.file.localeCompare(b.file);
    }
    return b.items.length - a.items.length;
  });
  for (const g of groupList) {
    const group = document.createElement('div'); group.className = 'uses-group';
    const heading = document.createElement('button');
    heading.type = 'button'; heading.className = 'uses-heading';
    heading.innerHTML = `<code>${esc(g.varName)}</code><span class="uses-file">${esc(g.file)}</span><span class="uses-count-sm">${g.items.length}</span>`;
    group.appendChild(heading);
    const seen = new Set();
    const uniq = [];
    for (const u of g.items) {
      const k = u.line + ':' + u.col;
      if (seen.has(k)) continue;
      seen.add(k); uniq.push(u);
    }
    uniq.sort((a, b) => a.line - b.line);
    const lines = document.createElement('div'); lines.className = 'uses-lines';
    const MAX = 12;
    for (const u of uniq.slice(0, MAX)) {
      const el = document.createElement('div'); el.className = 'uses-line';
      const snippet = (state.files[u.file]?.lines[u.line - 1] || '').trim();
      const cut = snippet.length > 140 ? snippet.slice(0, 140) + '…' : snippet;
      const recLabel = u.recordLabel ? `<span class="uses-record">${esc(u.recordLabel.key)}=${esc(String(u.recordLabel.value))}</span>` : '';
      const pathLabel = u.path.length ? `<span class="uses-var">.${esc(u.path.join('.'))}</span>` : '';
      el.innerHTML = `<span class="jump">↗</span><span class="uses-ln">L${u.line}</span>${recLabel}${pathLabel}<span class="uses-snippet"><code>${esc(cut)}</code></span>`;
      el.onclick = () => jumpToUsage(u);
      lines.appendChild(el);
    }
    if (uniq.length > MAX) {
      const more = document.createElement('div'); more.className = 'uses-more';
      more.textContent = `… and ${uniq.length - MAX} more line${uniq.length - MAX === 1 ? '' : 's'} in this group`;
      lines.appendChild(more);
    }
    group.appendChild(lines); bodyEl.appendChild(group);
  }
  panel.appendChild(bodyEl);
  return panel;
}
/* ================================================================
NODE RENDERING
================================================================ */
function renderNode(node, path, depth, ctx) {
  if (!node) return document.createElement('span');
  if (node.kind === 'leaf' || node.kind === 'ref') return renderLeaf(node, path, { ctx });
  if (node.kind === 'array') return renderArray(node, path, depth, ctx);
  if (node.kind === 'object') return renderObject(node, path, depth, ctx);
  if (node.kind === 'hole') { const s = document.createElement('span'); s.textContent = '—'; s.style.color = 'var(--muted)'; return s; }
  return document.createElement('span');
}
function renderLeaf(node, path, opts = {}) {
  const wrap = document.createElement('div');
  wrap.className = 'leaf';
  wrap.dataset.leafPath = path;
  const v = node.value;
  const isRef = node.kind === 'ref';
  const key = opts.key;
  const parentObj = opts.parentObj;
  const isHTML = typeof v === 'string' && /<\w+[^>]>/.test(v);
  const isCoord = isCoordinateKey(key);
  const coordSibs = isCoord && parentObj ? findCoordSiblings(parentObj, key, node) : null;
  const isCoordPair = !!coordSibs;
  if (isRef && (isCoordPair || isCoord)) {
    const btn = document.createElement('button');
    btn.className = 'coord-ref';
    btn.title = 'Click to jump to ' + node.text.split(/[[.]/)[0];
    const resolvedTxt = (typeof v === 'number') ? v : '';
    btn.innerHTML = `<span>${esc(node.text)}</span><span class="arrow">→</span>` +
      (resolvedTxt !== '' ? `<span class="resolved">${resolvedTxt}</span>` : '');
    btn.onclick = (e) => { e.preventDefault(); e.stopPropagation(); navigateToRef(node); };
    wrap.appendChild(btn);
    const changeBtn = document.createElement('button');
    changeBtn.className = 'ref-change';
    changeBtn.textContent = '↻';
    changeBtn.title = 'Change to a different variable';
    changeBtn.onclick = (e) => {
      e.preventDefault(); e.stopPropagation();
      showVariableAutocomplete(changeBtn, {
        placeholder: 'Pick replacement variable…',
      }, (newVar) => {
        if (changeRefTarget(node, newVar)) {
          toast('Ref changed to ' + newVar, 'ok');
        }
      });
    };
    wrap.appendChild(changeBtn);
    const toRawBtn = document.createElement('button');
    toRawBtn.className = 'to-ref-btn';
    toRawBtn.textContent = '→#';
    toRawBtn.title = 'Convert to raw value';
    toRawBtn.onclick = (e) => {
      e.preventDefault(); e.stopPropagation();
      const cur = typeof v === 'number' ? v : (v === undefined || v === null ? '' : String(v));
      const newVal = prompt('Enter raw value (number or string):', String(cur));
      if (newVal === null) return;
      const n = Number(newVal);
      const literal = (newVal.trim() !== '' && !Number.isNaN(n)) ? String(n) : JSON.stringify(newVal);
      if (commitEdit(node.file, [{ start: node.node.start, end: node.node.end, text: literal }])) {
        toast('Converted to raw value', 'ok');
      }
    };
    wrap.appendChild(toRawBtn);
    if (isCoordPair) {
      const mapBtn = document.createElement('button');
      mapBtn.className = 'icon-btn'; mapBtn.textContent = '📍'; mapBtn.title = 'Pick on map';
      mapBtn.onclick = () => openMapForLeaf(node, parentObj, key);
      wrap.appendChild(mapBtn);
      const extractBtn = document.createElement('button');
      extractBtn.className = 'icon-btn extract-btn';
      extractBtn.textContent = '↗loc';
      extractBtn.title = 'Extract coordinates into a locations array';
      extractBtn.onclick = (e) => {
        e.preventDefault(); e.stopPropagation();
        openExtractLocationDialog(parentObj, { pairIndex: 0 });
      };
      wrap.appendChild(extractBtn);
    }
    return wrap;
  }
  let control;
  if (v === true || v === false) {
    control = document.createElement('select');
    control.innerHTML = `<option value="true">true</option><option value="false">false</option>`;
    control.value = String(v); control.style.maxWidth = '100px';
    control.onchange = () => applyLeafEdit(node, control.value);
  } else if (v === null) {
    control = document.createElement('input');
    control.type = 'text'; control.value = 'null'; control.disabled = true;
    control.style.maxWidth = '120px';
    } else if (!isRef && isDateKey(key)) {
    control = document.createElement('input');
    control.type = 'date';
    const iso = (v == null) ? '' : String(v);
    const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
    control.value = m ? `${m[1]}-${m[2]}-${m[3]}` : '';
    control.style.maxWidth = '170px';
    control.onchange = () => applyDateEdit(node, control.value);
  } else if (typeof v === 'number') {
    control = document.createElement('input');
    control.type = 'number'; control.step = 'any'; control.value = String(v);
    control.onchange = () => applyLeafEdit(node, control.value);
  } else {
    control = document.createElement('input');
    control.type = 'text'; control.value = v === undefined ? '' : String(v);
    control.onchange = () => applyLeafEdit(node, control.value);
  }
  wrap.appendChild(control);
  const toRefBtn = document.createElement('button');
  toRefBtn.className = 'to-ref-btn';
  toRefBtn.textContent = '→var';
  toRefBtn.title = 'Convert to a variable reference';
  toRefBtn.onclick = (e) => {
    e.preventDefault(); e.stopPropagation();
    showVariableAutocomplete(toRefBtn, {
      placeholder: 'Pick variable to reference…',
    }, (varName) => {
      if (commitEdit(node.file, [{ start: node.node.start, end: node.node.end, text: varName }])) {
        toast('Converted to reference: ' + varName, 'ok');
      }
    });
  };
  wrap.appendChild(toRefBtn);
  if (isHTML) {
    const btn = document.createElement('button');
    btn.className = 'icon-btn'; btn.textContent = '👁'; btn.title = 'Preview HTML';
    btn.onclick = () => {
      const preview = wrap.querySelector('.html-preview') || wrap.querySelector('input');
      if (preview && preview.tagName === 'INPUT') {
        const div = document.createElement('div');
        div.className = 'html-preview'; div.innerHTML = preview.value;
        preview.replaceWith(div);
        btn.textContent = '✎'; btn.title = 'Back to edit';
      } else {
        const inp = document.createElement('input');
        inp.type = 'text'; inp.value = String(node.value);
        inp.onchange = () => applyLeafEdit(node, inp.value);
        preview.replaceWith(inp);
        btn.textContent = '👁'; btn.title = 'Preview HTML';
      }
    };
    wrap.appendChild(btn);
  }
  if (isCoordPair) {
    const mapBtn = document.createElement('button');
    mapBtn.className = 'icon-btn'; mapBtn.textContent = '📍'; mapBtn.title = 'Pick on map';
    mapBtn.onclick = () => openMapForLeaf(node, parentObj, key);
    wrap.appendChild(mapBtn);
    const extractBtn = document.createElement('button');
    extractBtn.className = 'icon-btn extract-btn';
    extractBtn.textContent = '↗loc';
    extractBtn.title = 'Extract coordinates into a locations array';
    extractBtn.onclick = (e) => {
      e.preventDefault(); e.stopPropagation();
      openExtractLocationDialog(parentObj, { varName: opts.ctx && opts.ctx.varName });
    };
    wrap.appendChild(extractBtn);
  }
  if (isRef) {
    const tag = document.createElement('span');
    tag.className = 'ref-tag';
    tag.textContent = node.text.length > 48 ? node.text.slice(0, 48) + '…' : node.text;
    tag.title = 'Click to jump to ' + node.text.split(/[[.]/)[0];
    tag.onclick = (e) => { e.preventDefault(); e.stopPropagation(); navigateToRef(node); };
    wrap.appendChild(tag);
    const changeBtn = document.createElement('button');
    changeBtn.className = 'ref-change';
    changeBtn.textContent = '↻';
    changeBtn.title = 'Change to a different variable';
    changeBtn.onclick = (e) => {
      e.preventDefault(); e.stopPropagation();
      showVariableAutocomplete(changeBtn, {
        placeholder: 'Pick replacement variable…',
      }, (newVar) => {
        if (changeRefTarget(node, newVar)) {
          toast('Ref changed to ' + newVar, 'ok');
        }
      });
    };
    wrap.appendChild(changeBtn);
  }
  return wrap;
}
function renderArray(node, path, depth, ctx) {
  const details = document.createElement('details');
  details.className = 'container'; details.dataset.path = path;
  details.open = state.detailsOpen.has(path) ? state.detailsOpen.get(path) : (depth < 2);
  details.addEventListener('toggle', () => state.detailsOpen.set(path, details.open));
  const sum = document.createElement('summary');
  const n = node.children.filter(c => c.kind !== 'hole').length;
  sum.innerHTML = `<span class="pill">Array(${n})</span>`;
  if (isObjectArray(node)) {
    const addBtn = document.createElement('button');
    addBtn.className = 'arr-add'; addBtn.textContent = '+ Add'; addBtn.title = 'Append a new entry';
    addBtn.onclick = (e) => { e.preventDefault(); e.stopPropagation(); addArrayEntry(node, path); };
    sum.appendChild(addBtn);
  }
  details.appendChild(sum);
  const body = document.createElement('div'); body.className = 'body';
  if (n === 0) {
    const e = document.createElement('div');
    e.style.cssText = 'color:var(--muted);font-size:12px'; e.textContent = '(empty)';
    body.appendChild(e);
  } else {
    const list = document.createElement('div'); list.className = 'obj';
    node.children.forEach((child, i) => {
      if (child.kind === 'hole') return;
      const row = document.createElement('div'); row.className = 'row';
      const k = document.createElement('div'); k.className = 'key';
      k.innerHTML = `<span class="idx">[${i}]</span>`;
      const del = document.createElement('button');
      del.className = 'del-btn'; del.textContent = '×';
      del.title = 'Remove this entry';
      del.onclick = (e) => {
        e.stopPropagation();
        if (confirm(`Remove entry [${i}]?`)) {
          if (deleteArrayEntry(node, i)) toast('Entry removed', 'ok');
        }
      };
      k.appendChild(del);
      if (child.kind === 'object' || child.kind === 'array') {
        const toRefBtn = document.createElement('button');
        toRefBtn.className = 'to-ref-btn';
        toRefBtn.textContent = '→var';
        toRefBtn.title = 'Replace this entry with a variable reference';
        toRefBtn.onclick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          convertNodeToRef(child, toRefBtn);
        };
        k.appendChild(toRefBtn);
      }
      const childPairs = findCoordPairsInTree(child.value);
      if (childPairs.length) {
        const exBtn = document.createElement('button');
        exBtn.className = 'extract-key-btn';
        exBtn.textContent = '↗loc';
        exBtn.title = 'Extract coordinates from this key into a locations array';
        exBtn.onclick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          openExtractLocationDialog(ctx.recordRoot || node, {
            preferredContainer: child.value,
          });
        };
        k.appendChild(exBtn);
      }
      const v = document.createElement('div');
      v.appendChild(renderNode(child, path + '[' + i + ']', depth + 1, ctx));
      row.appendChild(k); row.appendChild(v);
      list.appendChild(row);
    });
    body.appendChild(list);
  }
  details.appendChild(body); return details;
}
function renderObject(node, path, depth, ctx) {
  const details = document.createElement('details');
  details.className = 'container'; details.dataset.path = path;
  details.open = state.detailsOpen.has(path) ? state.detailsOpen.get(path) : (depth < 2);
  details.addEventListener('toggle', () => state.detailsOpen.set(path, details.open));
  const sum = document.createElement('summary');
  sum.innerHTML = `<span class="pill">Object(${node.children.length})</span>`;
  details.appendChild(sum);
  const body = document.createElement('div'); body.className = 'body';
  if (depth < 2) {
    const addRow = document.createElement('div'); addRow.className = 'add-key-row';
    const lbl = document.createElement('span');
    lbl.className = 'add-key-label'; lbl.textContent = 'New key';
    const keyInp = document.createElement('input');
    keyInp.className = 'key-inp';
    keyInp.placeholder = 'key name';
    const typeSel = document.createElement('select');
    typeSel.className = 'type-inp';
    typeSel.title = 'Value type';
    typeSel.innerHTML =
      `<option value="auto">auto</option>` +
      `<option value="array">array</option>` +
      `<option value="object">object</option>`;
    const valInp = document.createElement('input');
    valInp.className = 'val-inp';
    const refreshPlaceholder = () => {
      const t = typeSel.value;
      valInp.placeholder =
        t === 'array' ? 'array items — e.g.  1, 2, 3   or  "a", "b"   (blank = [])' :
        t === 'object' ? 'object JSON — e.g.  {"lat": -25.5, "lng": 134}   (blank = {})' :
        'value — e.g. [-37.65, 145.03] or "text" or =COMPANY["Jetstar"]';
    };
    refreshPlaceholder();
    typeSel.onchange = refreshPlaceholder;
    const addBtn = document.createElement('button');
    addBtn.className = 'go';
    addBtn.textContent = '+ Add key';
    const commit = () => {
      const k = keyInp.value.trim();
      const v = valInp.value;
      if (!k) { toast('Enter a key name', 'err'); return; }
      if (addObjectKey(node, path, k, v, typeSel.value)) {
        keyInp.value = ''; valInp.value = '';
      }
    };
    addBtn.onclick = commit;
    keyInp.onkeydown = (e) => { if (e.key === 'Enter') valInp.focus(); };
    valInp.onkeydown = (e) => { if (e.key === 'Enter') commit(); };
    addRow.appendChild(lbl);
    addRow.appendChild(keyInp);
    addRow.appendChild(typeSel);
    addRow.appendChild(valInp);
    addRow.appendChild(addBtn);
    body.appendChild(addRow);
  }
  const grid = document.createElement('div'); grid.className = 'obj';
  for (const child of node.children) {
    const row = document.createElement('div'); row.className = 'row';
    const k = document.createElement('div'); k.className = 'key';
    const childPath = [...ctx.logicPath, child.key];
    const uses = getUsagesForPath(ctx.varName, childPath);
    const badge = uses.length
      ? `<span class="path-uses" title="${uses.length} usage(s) of ${child.key}">${uses.length}</span>` : '';
    k.innerHTML = `<span class="key-name">${esc(child.key)}</span>${badge}`;
    const pathBtn = k.querySelector('.path-uses');
    if (pathBtn) {
      pathBtn.onclick = (e) => {
        e.stopPropagation();
        state.usageFilter = { path: childPath };
        renderMain();
        const panel = $('.usages-panel'); if (panel) panel.open = true;
      };
    }
    const del = document.createElement('button');
    del.className = 'del-btn'; del.textContent = '×';
    del.title = `Remove key "${child.key}"`;
    del.onclick = (e) => {
      e.stopPropagation();
      if (confirm(`Remove key "${child.key}"?`)) {
        if (deleteObjectKey(node, child.key)) toast(`Removed "${child.key}"`, 'ok');
      }
    };
    k.appendChild(del);
    if (child.value.kind === 'object' || child.value.kind === 'array') {
      const toRefBtn = document.createElement('button');
      toRefBtn.className = 'to-ref-btn';
      toRefBtn.textContent = '→var';
      toRefBtn.title = 'Replace this value with a variable reference';
      toRefBtn.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        convertNodeToRef(child.value, toRefBtn);
      };
      k.appendChild(toRefBtn);
    }
    // FIX 2 (part 1): Add ↗loc button next to keys whose value is an array with coord pairs
    const childPairs = findCoordPairsInTree(child.value);
    if (childPairs.length) {
      const exBtn = document.createElement('button');
      exBtn.className = 'extract-key-btn';
      exBtn.textContent = '↗loc';
      exBtn.title = 'Extract coordinates from this key into a locations array';
      exBtn.onclick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        openExtractLocationDialog(ctx.recordRoot || node, {
          preferredContainer: child.value,
        });
      };
      k.appendChild(exBtn);
    }
    const v = document.createElement('div');
    v.appendChild(renderNode(child.value, path + '.' + child.key, depth + 1,
      { varName: ctx.varName, logicPath: childPath, key: child.key, parentObj: node }));
    row.appendChild(k); row.appendChild(v);
    grid.appendChild(row);
  }
  body.appendChild(grid);
  details.appendChild(body); return details;
}
/* ================================================================
DELETE OPERATIONS
================================================================ */
function deleteObjectKey(objTree, keyName) {
  const file = state.files[objTree.file];
  const obj = objTree.node;
  let targetProp = null;
  for (const p of obj.properties) {
    if (p.type !== 'Property') continue;
    let k;
    if (!p.computed && p.key.type === 'Identifier') k = p.key.name;
    else if (!p.computed && p.key.type === 'Literal') k = p.key.value;
    if (k === keyName) { targetProp = p; break; }
  }
  if (!targetProp) return false;
  let start = targetProp.start;
  let end = targetProp.end;
  let postEnd = end;
  let ateComma = false;
  while (postEnd < obj.end - 1) {
    const ch = file.source[postEnd];
    if (/\s/.test(ch)) postEnd++;
    else if (ch === ',') { end = postEnd + 1; ateComma = true; break; }
    else break;
  }
  if (!ateComma) {
    let preStart = start;
    while (preStart > obj.start + 1) {
      const ch = file.source[preStart - 1];
      if (/\s/.test(ch)) preStart--;
      else if (ch === ',') { start = preStart - 1; break; }
      else break;
    }
  }
  if (!commitEdit(objTree.file, [{ start, end, text: '' }])) return false;
  rebuildAll();
  return true;
}
function deleteArrayEntry(arrTree, index) {
  const file = state.files[arrTree.file];
  const arr = arrTree.node;
  const el = arr.elements[index];
  if (!el) return false;
  let start = el.start;
  let end = el.end;
  let postEnd = end;
  let ateComma = false;
  while (postEnd < arr.end - 1) {
    const ch = file.source[postEnd];
    if (/\s/.test(ch)) postEnd++;
    else if (ch === ',') { end = postEnd + 1; ateComma = true; break; }
    else break;
  }
  if (!ateComma) {
    let preStart = start;
    while (preStart > arr.start + 1) {
      const ch = file.source[preStart - 1];
      if (/\s/.test(ch)) preStart--;
      else if (ch === ',') { start = preStart - 1; break; }
      else break;
    }
  }
  if (!commitEdit(arrTree.file, [{ start, end, text: '' }])) return false;
  rebuildAll();
  return true;
}
function deleteTableRow(arrTree, index) {
  return deleteArrayEntry(arrTree, index);
}
function changeRefTarget(node, newVarName) {
  if (!commitEdit(node.file, [{
    start: node.node.start, end: node.node.end, text: newVarName,
  }])) return false;
  rebuildAll();
  return true;
}
/* ================================================================
AUTOCOMPLETE DROPDOWN
================================================================ */
function showVariableAutocomplete(anchor, options, onSelect) {
  closeAutocomplete();
  const pop = document.createElement('div');
  pop.className = 'ac-pop'; pop.id = 'acPop';

  const header = document.createElement('div');
  header.className = 'ac-header';
  const inp = document.createElement('input');
  inp.type = 'text';
  inp.placeholder = options.placeholder || 'Search variables…';
  header.appendChild(inp);
  pop.appendChild(header);

  const crumb = document.createElement('div');
  crumb.className = 'ac-crumb';
  pop.appendChild(crumb);

  const list = document.createElement('div');
  list.className = 'ac-list';
  pop.appendChild(list);

  // ---- navigation state ----
  let curVarName = null;
  let curVarFile = null;
  let curPath = [];     // array of string keys / numeric indices
  let activeIdx = 0;

  const pathStr = (parts = curPath, root = curVarName) => {
    let s = root;
    for (const p of parts) {
      if (typeof p === 'number') s += '[' + p + ']';
      else if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(p)) s += '.' + p;
      else s += '[' + JSON.stringify(p) + ']';
    }
    return s;
  };

  const getNode = () => {
    if (!curVarName) return null;
    const tree = state.trees[curVarFile + '::' + curVarName];
    if (!tree) return null;
    let node = tree;
    for (const part of curPath) {
      if (node.kind === 'object') {
        const c = node.children.find(x => x.key === part);
        if (!c) return null;
        node = c.value;
      } else if (node.kind === 'array') {
        if (typeof part !== 'number') return null;
        const c = node.children[part];
        if (!c || c.kind === 'hole') return null;
        node = c;
      } else return null;
    }
    return node;
  };

  const nodePreview = (n) => {
    if (!n) return '';
    if (n.kind === 'leaf' || n.kind === 'ref') return '= ' + summarize(n);
    if (n.kind === 'array') return 'Array(' + n.children.filter(c => c.kind !== 'hole').length + ')';
    if (n.kind === 'object') return 'Object(' + n.children.length + ')';
    return '';
  };

  const renderCrumb = () => {
    crumb.innerHTML = '';
    if (!curVarName) {
      const span = document.createElement('span');
      span.className = 'ac-crumb-empty';
      span.textContent = 'Choose a variable → drill into keys/indices';
      crumb.appendChild(span);
      return;
    }
    const mkBtn = (label, onClick) => {
      const b = document.createElement('button');
      b.className = 'ac-crumb-btn';
      b.textContent = label;
      b.onclick = onClick;
      return b;
    };
    crumb.appendChild(mkBtn(curVarName, () => { curPath = []; inp.value = ''; activeIdx = 0; render(); }));
    curPath.forEach((seg, i) => {
      const sep = document.createElement('span');
      sep.className = 'ac-crumb-sep';
      sep.textContent = '›';
      crumb.appendChild(sep);
      crumb.appendChild(mkBtn(String(seg), () => {
        curPath = curPath.slice(0, i + 1);
        inp.value = ''; activeIdx = 0;
        render();
      }));
    });
  };

  const render = () => {
    renderCrumb();
    list.innerHTML = '';
    const filter = inp.value.trim().toLowerCase();

    // ---------- root: list variables ----------
    if (!curVarName) {
      const vars = [];
      for (const fname of FILES) {
        const f = state.files[fname];
        if (!f) continue;
        if (options.fileFilter && !options.fileFilter(fname)) continue;
        for (const v of f.vars) {
          vars.push({
            name: v.name, file: fname,
            count: state.usageCounts[v.name]?.total || 0,
          });
        }
      }
      vars.sort((a, b) => {
        const aLoc = a.file === 'locations.js' ? 0 : 1;
        const bLoc = b.file === 'locations.js' ? 0 : 1;
        if (aLoc !== bLoc) return aLoc - bLoc;
        return b.count - a.count;
      });
      const filtered = vars.filter(v =>
        !filter ||
        v.name.toLowerCase().includes(filter) ||
        v.file.toLowerCase().includes(filter));
      if (!filtered.length) {
        list.innerHTML = '<div class="ac-empty">No matches</div>';
        return;
      }
      filtered.slice(0, 80).forEach((v, i) => {
        const item = document.createElement('div');
        item.className = 'ac-item' + (i === activeIdx ? ' active' : '');
        item.innerHTML =
          `<span class="ac-name">${esc(v.name)}</span>` +
          `<span class="ac-file">${esc(v.file)}</span>` +
          `<span class="ac-count">${v.count}</span>` +
          `<span class="ac-drill">›</span>`;
        item.onclick = () => {
          curVarName = v.name;
          curVarFile = v.file;
          curPath = [];
          inp.value = '';
          activeIdx = 0;
          render();
        };
        list.appendChild(item);
      });
      return;
    }

    // ---------- inside a variable ----------
    const node = getNode();
    if (!node) {
      list.innerHTML = '<div class="ac-empty">Node not found</div>';
      return;
    }

    const items = [];

    // "Use this path" item (always offered when not at root)
    {
      const fullPath = pathStr();
      items.push({
        kind: 'use',
        label: fullPath,
        preview: nodePreview(node),
        onClick: () => { onSelect(fullPath, curVarFile); closeAutocomplete(); },
      });
    }

    // Children
    if (node.kind === 'object') {
      for (const c of node.children) {
        const keyLabel = String(c.key);
        if (filter && !keyLabel.toLowerCase().includes(filter)) continue;
        const childPath = [...curPath, c.key];
        const childStr = pathStr(childPath);
        const isContainer = c.value.kind === 'object' || c.value.kind === 'array';
        items.push({
          kind: 'child',
          label: keyLabel,
          preview: nodePreview(c.value),
          isContainer,
          onClick: () => {
            if (isContainer) {
              curPath = childPath; inp.value = ''; activeIdx = 0; render();
            } else {
              onSelect(childStr, curVarFile); closeAutocomplete();
            }
          },
        });
      }
    } else if (node.kind === 'array') {
      node.children.forEach((c, i) => {
        if (c.kind === 'hole') return;
        const keyLabel = '[' + i + ']';
        if (filter && !keyLabel.toLowerCase().includes(filter)) return;
        const childPath = [...curPath, i];
        const childStr = pathStr(childPath);
        const isContainer = c.kind === 'object' || c.kind === 'array';
        items.push({
          kind: 'child',
          label: keyLabel,
          preview: nodePreview(c),
          isContainer,
          onClick: () => {
            if (isContainer) {
              curPath = childPath; inp.value = ''; activeIdx = 0; render();
            } else {
              onSelect(childStr, curVarFile); closeAutocomplete();
            }
          },
        });
      });
    }

    if (items.length === 0) {
      list.innerHTML = '<div class="ac-empty">No children</div>';
      return;
    }

    items.forEach((it, i) => {
      const el = document.createElement('div');
      el.className = 'ac-item'
        + (i === activeIdx ? ' active' : '')
        + (it.kind === 'use' ? ' ac-item-use' : '');
      if (it.kind === 'use') {
        el.innerHTML =
          `<span class="ac-use">✓</span>` +
          `<span class="ac-name">${esc(it.label)}</span>` +
          `<span class="ac-preview">${esc(it.preview)}</span>`;
      } else {
        el.innerHTML =
          `<span class="ac-name">${esc(it.label)}</span>` +
          `<span class="ac-preview">${esc(it.preview)}</span>` +
          (it.isContainer ? '<span class="ac-drill">›</span>' : '');
      }
      el.onclick = it.onClick;
      list.appendChild(el);
    });
  };

  render();

  inp.oninput = () => { activeIdx = 0; render(); };
  inp.onkeydown = (e) => {
    const items = list.querySelectorAll('.ac-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIdx = Math.min(activeIdx + 1, items.length - 1);
      items.forEach((it, i) => it.classList.toggle('active', i === activeIdx));
      items[activeIdx]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIdx = Math.max(activeIdx - 1, 0);
      items.forEach((it, i) => it.classList.toggle('active', i === activeIdx));
      items[activeIdx]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      items[activeIdx]?.click();
    } else if (e.key === 'Escape') {
      closeAutocomplete();
    } else if (e.key === 'Backspace' && inp.value === '' && curPath.length > 0) {
      e.preventDefault();
      curPath = curPath.slice(0, -1);
      activeIdx = 0;
      render();
    }
  };

  document.body.appendChild(pop);
  const rect = anchor.getBoundingClientRect();
  const popRect = pop.getBoundingClientRect();
  let left = rect.left;
  let top = rect.bottom + 4;
  if (left + popRect.width > window.innerWidth - 8) left = window.innerWidth - popRect.width - 8;
  if (top + popRect.height > window.innerHeight - 8) top = rect.top - popRect.height - 4;
  pop.style.left = Math.max(8, left) + 'px';
  pop.style.top = Math.max(8, top) + 'px';
  setTimeout(() => inp.focus(), 0);

  const onDocClick = (e) => {
    if (!pop.contains(e.target) && !anchor.contains(e.target)) {
      closeAutocomplete();
      document.removeEventListener('mousedown', onDocClick);
    }
  };
  setTimeout(() => document.addEventListener('mousedown', onDocClick), 0);
}

function closeAutocomplete() {
  const p = $('#acPop');
  if (p) p.remove();
}

function convertNodeToRef(childNode, anchorEl) {
  if (!childNode || !childNode.node) {
    toast('Cannot convert this node', 'err');
    return;
  }
  showVariableAutocomplete(anchorEl, {
    placeholder: 'Pick variable to reference…',
  }, (varName) => {
    if (!commitEdit(childNode.file, [{
      start: childNode.node.start,
      end: childNode.node.end,
      text: varName,
    }])) return;
    rebuildAll();
    toast('Replaced with ' + varName, 'ok');
  });
}
/* ================================================================
SCHEMA (generic template from all entries)
================================================================ */
function computeSchema(arrayTree) {
  const cached = state.schemaCache.get(arrayTree.node.start);
  if (cached) return cached;
  const keys = new Set();
  const keyOrder = [];
  for (const c of arrayTree.children) {
    if (c.kind !== 'object') continue;
    for (const kv of c.children) {
      if (!keys.has(kv.key)) {
        keys.add(kv.key);
        keyOrder.push(kv.key);
      }
    }
  }
  const priority = PRIORITY_COLS.filter(k => keys.has(k));
  const rest = keyOrder.filter(k => !PRIORITY_COLS.includes(k));
  const schema = [...priority, ...rest];
  state.schemaCache.set(arrayTree.node.start, schema);
  return schema;
}
function renderSchemaBar(arrayTree) {
  const schema = computeSchema(arrayTree);
  if (!schema.length) return null;
  const bar = document.createElement('div');
  bar.className = 'schema-bar';
  const lbl = document.createElement('span');
  lbl.className = 'schema-label';
  lbl.textContent = `Schema (${schema.length} keys)`;
  bar.appendChild(lbl);
  for (const k of schema) {
    const chip = document.createElement('span');
    chip.className = 'schema-key';
    chip.textContent = k;
    bar.appendChild(chip);
  }
  return bar;
}
/* ================================================================
RECORD TABLE
================================================================ */
const PRIORITY_COLS = [
  'id', 'title', 'name', 'union', 'type', 'industry', 'state', 'city',
  'startDate', 'endDate', 'workers', 'lat', 'lng', 'url', 'actionId'
];
function getColValue(rec, col) {
  if (!rec || rec.kind !== 'object') return undefined;
  const kv = rec.children.find(c => c.key === col);
  return kv ? kv.value.value : undefined;
}
function compareValues(a, b) {
  if (a === undefined && b === undefined) return 0;
  if (a === undefined) return 1;
  if (b === undefined) return -1;
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  if (typeof a === 'boolean' && typeof b === 'boolean') return (a ? 1 : 0) - (b ? 1 : 0);
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
}
function renderRecordTable(node, path, ctx) {
  const container = document.createElement('div');
  const schemaBar = renderSchemaBar(node);
  if (schemaBar) container.appendChild(schemaBar);
  const bar = document.createElement('div'); bar.className = 'table-actions';
  const addBtn = document.createElement('button');
  addBtn.textContent = '+ Add entry';
  addBtn.title = 'Add new entry using generic schema';
  addBtn.onclick = () => addArrayEntry(node, path);
  bar.appendChild(addBtn);
  const allKeysSet = new Set();
  for (const c of node.children) {
    if (c.kind !== 'object') continue;
    for (const kv of c.children) allKeysSet.add(kv.key);
  }
  if (allKeysSet.has('workers')) {
    const wq = document.createElement('span');
    wq.className = 'workers-quick';
    const lbl = document.createElement('label');
    lbl.textContent = 'Workers:';
    const inp = document.createElement('input');
    inp.type = 'number'; inp.min = '0'; inp.step = '1';
    inp.placeholder = 'set all visible';
    inp.title = 'Set workers on all visible (or selected) rows';
    const go = document.createElement('button');
    go.className = 'go'; go.textContent = 'Apply';
    go.onclick = () => {
      const v = inp.value.trim();
      if (v === '' || Number.isNaN(Number(v))) { toast('Enter a valid number', 'err'); return; }
      applyWorkersQuick(node, path, Number(v));
    };
    inp.onkeydown = (e) => { if (e.key === 'Enter') go.click(); };
    wq.appendChild(lbl); wq.appendChild(inp); wq.appendChild(go);
    bar.appendChild(wq);
  }
    if (allKeysSet.has('addDate') || state.selectedRows.size > 0) {
    const aq = document.createElement('span');
    aq.className = 'workers-quick adddate-quick';
    const lbl = document.createElement('label');
    lbl.textContent = 'Add date:';
    const inp = document.createElement('input');
    inp.type = 'date';
    inp.value = todayIso();
    inp.title = 'Set addDate on all visible (or selected) rows';
    const go = document.createElement('button');
    go.className = 'go'; go.textContent = 'Apply';
    go.onclick = () => {
      const v = inp.value.trim();
      if (!v) { toast('Pick a date', 'err'); return; }
      applyAddDateQuick(node, path, v);
    };
    inp.onkeydown = (e) => { if (e.key === 'Enter') go.click(); };
    aq.appendChild(lbl); aq.appendChild(inp); aq.appendChild(go);
    bar.appendChild(aq);
  }
  const summary = renderActiveFiltersSummary();
  if (summary) bar.appendChild(summary);
  container.appendChild(bar);
  // Location-reference filter dropdown
  {
    const refCounts = new Map();
    for (const rec of node.children) {
      if (rec.kind !== 'object') continue;
      for (const r of getRecordLocationRefs(rec)) {
        refCounts.set(r, (refCounts.get(r) || 0) + 1);
      }
    }
    if (refCounts.size) {
      const wrap = document.createElement('span');
      wrap.className = 'loc-filter';
      const lbl = document.createElement('label');
      lbl.textContent = 'Location:';
      const sel = document.createElement('select');
      const optAll = document.createElement('option');
      optAll.value = '';
      optAll.textContent = `All (${node.children.length})`;
      sel.appendChild(optAll);
      const sorted = [...refCounts.entries()].sort((a, b) => b[1] - a[1]);
      for (const [name, cnt] of sorted) {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = `${name} (${cnt})`;
        if (state.locationFilter === name) opt.selected = true;
        sel.appendChild(opt);
      }
      if (!state.locationFilter) optAll.selected = true;
      sel.onchange = () => {
        state.locationFilter = sel.value || null;
        renderMain();
      };
      wrap.appendChild(lbl); wrap.appendChild(sel);
      bar.appendChild(wrap);
    }
  }
  const allKeys = [], seen = new Set();
  for (const c of node.children) {
    if (c.kind !== 'object') continue;
    for (const kv of c.children) if (!seen.has(kv.key)) { seen.add(kv.key); allKeys.push(kv.key); }
  }
  const cols = [...PRIORITY_COLS.filter(k => seen.has(k)), ...allKeys.filter(k => !PRIORITY_COLS.includes(k))];
  const visibleCols = cols.slice(0, 10);
  const filter = state.search.trim().toLowerCase();
  let records = node.children.map((rec, idx) => ({ rec, idx }));
  records = records.filter(({ rec }) => {
    if (rec.kind !== 'object') return false;
    if (filter && !JSON.stringify(rec.value ?? '').toLowerCase().includes(filter)) return false;
    if (state.coordMode !== 'all') {
      const cls = classifyCoordRecord(rec);
      if (state.coordMode === 'raw' && cls !== 'raw') return false;
      if (state.coordMode === 'ref' && cls !== 'ref') return false;
    }
    if (Object.keys(state.colFilters).length) {
      for (const [col, set] of Object.entries(state.colFilters)) {
        if (!set.size) continue;
        const repr = valueRepr(getColValue(rec, col));
        if (!set.has(repr)) return false;
      }
    }
    return true;
  });
  if (state.locationFilter) {
    records = records.filter(({ rec }) => {
      const refs = getRecordLocationRefs(rec);
      return refs.includes(state.locationFilter);
    });
  }
  if (state.sort) {
    const dir = state.sort.dir === 'desc' ? -1 : 1;
    records.sort((a, b) => dir * compareValues(
      getColValue(a.rec, state.sort.col),
      getColValue(b.rec, state.sort.col),
    ));
  }
  if (state.selectedRows.size > 0) {
    const bulkBar = document.createElement('div'); bulkBar.className = 'bulk-bar';
    const cnt = document.createElement('span');
    cnt.className = 'bulk-count';
    cnt.textContent = `${state.selectedRows.size} selected`;
    bulkBar.appendChild(cnt);
    const colSel = document.createElement('select');
    colSel.title = 'Column to edit';
    if (!state.bulkCol || !visibleCols.includes(state.bulkCol)) {
      state.bulkCol = visibleCols[0];
    }
    for (const c of visibleCols) {
      const opt = document.createElement('option');
      opt.value = c; opt.textContent = c;
      if (c === state.bulkCol) opt.selected = true;
      colSel.appendChild(opt);
    }
    colSel.onchange = () => { state.bulkCol = colSel.value; renderMain(); };
    bulkBar.appendChild(colSel);
    const typeHint = getBulkTypeHint(node, path, state.bulkCol);
    const valInp = document.createElement('input');
    valInp.className = 'bulk-val';
    valInp.placeholder =
      typeHint === 'number' ? 'number (or =expr for a reference)' :
        typeHint === 'boolean' ? 'true / false' :
          'new value (or =expr for a reference)';
    valInp.onkeydown = (e) => { if (e.key === 'Enter') applyBulkEditNow(valInp.value, typeHint); };
    const goBtn = document.createElement('button');
    goBtn.className = 'go';
    goBtn.textContent = 'Apply to selected';
    goBtn.onclick = () => applyBulkEditNow(valInp.value, typeHint);
    const clrBtn = document.createElement('button');
    clrBtn.textContent = 'Clear selection';
    clrBtn.onclick = () => { state.selectedRows = new Set(); renderMain(); };
    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑 Delete selected';
    delBtn.style.color = 'var(--err)';
    delBtn.onclick = () => {
      if (!confirm(`Delete ${state.selectedRows.size} row(s)? This cannot be undone.`)) return;
      deleteSelectedRows(node, path);
    };
    bulkBar.appendChild(valInp);
    bulkBar.appendChild(goBtn);
    bulkBar.appendChild(delBtn);
    bulkBar.appendChild(clrBtn);
    const hint = document.createElement('span');
    hint.className = 'bulk-hint';
    hint.textContent = typeHint === 'number' ? '(numbers)'
      : typeHint === 'boolean' ? '(boolean)'
        : '(text)';
    bulkBar.appendChild(hint);
    container.appendChild(bulkBar);
  }
  const table = document.createElement('table'); table.className = 'data';
  const thead = document.createElement('thead');
  const htr = document.createElement('tr');
  const selTh = document.createElement('th');
  selTh.className = 'col-select';
  const selAll = document.createElement('input');
  selAll.type = 'checkbox';
  const visibleRowPaths = records.map(({ idx }) => `${path}[${idx}]`);
  const selectedVisible = visibleRowPaths.filter(rp => state.selectedRows.has(rp));
  selAll.checked = visibleRowPaths.length > 0 && selectedVisible.length === visibleRowPaths.length;
  selAll.indeterminate = selectedVisible.length > 0 && selectedVisible.length < visibleRowPaths.length;
  selAll.title = 'Select / deselect all visible rows';
  selAll.onchange = () => {
    if (selAll.checked) visibleRowPaths.forEach(rp => state.selectedRows.add(rp));
    else visibleRowPaths.forEach(rp => state.selectedRows.delete(rp));
    renderMain();
  };
  selTh.appendChild(selAll);
  htr.appendChild(selTh);
  const expTh = document.createElement('th'); expTh.style.width = '26px';
  htr.appendChild(expTh);
  const delTh = document.createElement('th'); delTh.style.width = '30px';
  htr.appendChild(delTh);
  visibleCols.forEach(c => {
    const th = document.createElement('th');
    if (state.colFilters[c]?.size) th.classList.add('filtered');
    const inner = document.createElement('div'); inner.className = 'th-inner';
    const label = document.createElement('button');
    label.className = 'th-label';
    const isSorted = state.sort && state.sort.col === c;
    if (isSorted) label.classList.add('sorted');
    label.innerHTML = isSorted
      ? `${esc(c)} <span class="sort-arrow">${state.sort.dir === 'asc' ? '▲' : '▼'}</span>`
      : esc(c);
    label.title = 'Click to sort by ' + c;
    label.onclick = (e) => {
      e.stopPropagation();
      if (state.sort && state.sort.col === c) {
        state.sort = { col: c, dir: state.sort.dir === 'asc' ? 'desc' : 'asc' };
      } else state.sort = { col: c, dir: 'asc' };
      renderMain();
    };
    const fbtn = document.createElement('button');
    fbtn.className = 'filter-btn'; fbtn.textContent = '▾';
    fbtn.title = `Filter by ${c}`;
    fbtn.onclick = (e) => { e.stopPropagation(); openColFilter(c, node, e.currentTarget); };
    inner.appendChild(label); inner.appendChild(fbtn);
    th.appendChild(inner); htr.appendChild(th);
  });
  thead.appendChild(htr); table.appendChild(thead);
  const tbody = document.createElement('tbody'); table.appendChild(tbody);
  for (const { rec, idx } of records) {
    const rowPath = `${path}[${idx}]`;
    const tr = document.createElement('tr');
    tr.className = 'row-item'; tr.dataset.rowPath = rowPath;
    if (state.selectedRows.has(rowPath)) tr.classList.add('is-selected');
    const selTd = document.createElement('td'); selTd.className = 'col-select';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = state.selectedRows.has(rowPath);
    cb.onchange = () => {
      if (cb.checked) state.selectedRows.add(rowPath);
      else state.selectedRows.delete(rowPath);
      renderMain();
    };
    selTd.appendChild(cb); tr.appendChild(selTd);
    const tdExp = document.createElement('td');
    const exp = document.createElement('span'); exp.className = 'expander'; exp.textContent = '▸';
    tdExp.appendChild(exp); tr.appendChild(tdExp);
    const tdDel = document.createElement('td'); tdDel.style.textAlign = 'center';
    const rowDel = document.createElement('button');
    rowDel.className = 'del-btn'; rowDel.textContent = '🗑';
    rowDel.title = 'Delete this row';
    rowDel.onclick = (e) => {
      e.stopPropagation();
      if (confirm('Delete this row?')) {
        if (deleteArrayEntry(node, idx)) toast('Row deleted', 'ok');
      }
    };
    tdDel.appendChild(rowDel); tr.appendChild(tdDel);
    // FIX 2 (part 2): Render each cell, adding ↗loc button for array columns with coord pairs
    for (const col of visibleCols) {
      const kv = rec.children.find(c => c.key === col);
      const td = document.createElement('td'); td.className = 'cell';
      if (kv && (kv.value.kind === 'leaf' || kv.value.kind === 'ref')) {
        td.appendChild(renderLeaf(kv.value, rowPath + '.' + col, { key: col, parentObj: rec, ctx }));
      } else if (kv && kv.value.kind === 'array') {
        // Check if this array contains coordinate pairs
        const pairs = findCoordPairsInTree(kv.value);
        if (pairs.length) {
          const wrap = document.createElement('div');
          wrap.style.display = 'flex';
          wrap.style.alignItems = 'center';
          wrap.style.gap = '6px';
          const s = document.createElement('span'); s.className = 'pill';
          s.textContent = summarize(kv.value);
          wrap.appendChild(s);
          const exBtn = document.createElement('button');
          exBtn.className = 'extract-row-btn';
          exBtn.textContent = '↗loc';
          exBtn.title = 'Extract coordinates from this array into a locations variable';
          exBtn.onclick = (e) => {
            e.stopPropagation();
            e.preventDefault();
            openExtractLocationDialog(rec, {
              preferredContainer: kv.value,
            });
          };
          wrap.appendChild(exBtn);
          td.appendChild(wrap);
        } else {
          const s = document.createElement('span'); s.className = 'pill';
          s.textContent = summarize(kv.value); td.appendChild(s);
        }
      } else if (kv) {
        const s = document.createElement('span'); s.className = 'pill';
        s.textContent = summarize(kv.value); td.appendChild(s);
      } else td.innerHTML = `<span style="color:var(--muted)">—</span>`;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
    const detailRow = document.createElement('tr');
    detailRow.className = 'detail-row';
    detailRow.classList.add('hidden');
    const detailTd = document.createElement('td');
    detailTd.colSpan = visibleCols.length + 3;
    const inner = document.createElement('div'); inner.className = 'detail-inner';
    detailTd.appendChild(inner); detailRow.appendChild(detailTd);
    tbody.appendChild(detailRow);
    let built = false;
    const openRow = () => {
      if (!built) {
        inner.appendChild(renderObject(rec, rowPath, 1, {
          varName: ctx.varName,
          logicPath: [idx],
          recordRoot: rec,
        }));
        built = true;
      }
      detailRow.classList.remove('hidden'); exp.classList.add('open');
      state.expandedRows.add(rowPath);
      updateUrl('replace');
    };
    const closeRow = () => {
      detailRow.classList.add('hidden'); exp.classList.remove('open');
      state.expandedRows.delete(rowPath);
      updateUrl('replace');
    };
    exp.onclick = () => detailRow.classList.contains('hidden') ? openRow() : closeRow();
    if (state.expandedRows.has(rowPath)) openRow();
  }
  container.appendChild(table);
  const note = document.createElement('div'); note.className = 'table-note';
  note.textContent = `${records.length} of ${node.children.length} records · showing ${visibleCols.length} of ${cols.length} columns` +
    (state.sort ? ` · sorted by ${state.sort.col} ${state.sort.dir === 'asc' ? '▲' : '▼'}` : '') +
    (cols.length > visibleCols.length ? ' · expand a row to edit every field' : '');
  container.appendChild(note);
  return container;
}
function applyWorkersQuick(arrayTree, arrayPath, value) {
  const { file } = state.selection;
  const targets = state.selectedRows.size
    ? [...state.selectedRows].filter(rp => rp.startsWith(arrayPath + '['))
    : arrayTree.children.map((_, i) => `${arrayPath}[${i}]`);
  const splices = [];
  const seen = new Set();
  let applied = 0, skipped = 0;
  for (const rp of targets) {
    const idx = parseInt(rp.slice(arrayPath.length + 1, -1), 10);
    const rec = arrayTree.children[idx];
    if (!rec || rec.kind !== 'object') { skipped++; continue; }
    const kv = rec.children.find(c => c.key === 'workers');
    if (!kv) { skipped++; continue; }
    const leaf = kv.value;
    if (leaf.kind !== 'leaf' && leaf.kind !== 'ref') { skipped++; continue; }
    const key = leaf.node.start + ':' + leaf.node.end;
    if (seen.has(key)) continue;
    seen.add(key);
    splices.push({ start: leaf.node.start, end: leaf.node.end, text: String(value) });
    applied++;
  }
  if (!splices.length) { toast('No workers fields to update', 'err'); return; }
  if (!commitEdit(file, splices)) return;
  rebuildAll();
  toast(`Set workers=${value} on ${applied} row${applied === 1 ? '' : 's'}${skipped ? ` (${skipped} skipped)` : ''}`, 'ok');
  state.selectedRows = new Set();
  renderMain();
}
function applyAddDateQuick(arrayTree, arrayPath, value) {
  const { file } = state.selection;
  const f = state.files[file];
  if (!f) return;
  const targets = state.selectedRows.size
    ? [...state.selectedRows].filter(rp => rp.startsWith(arrayPath + '['))
    : arrayTree.children.map((_, i) => `${arrayPath}[${i}]`);

  const lit = JSON.stringify(value);
  const splices = [];
  const seen = new Set();
  let updated = 0, inserted = 0, skipped = 0;

  for (const rp of targets) {
    const idx = parseInt(rp.slice(arrayPath.length + 1, -1), 10);
    const rec = arrayTree.children[idx];
    if (!rec || rec.kind !== 'object') { skipped++; continue; }
    const kv = rec.children.find(c => c.key === 'addDate');

    if (kv) {
      const leaf = kv.value;
      if (leaf.kind !== 'leaf' && leaf.kind !== 'ref') { skipped++; continue; }
      const key = leaf.node.start + ':' + leaf.node.end;
      if (seen.has(key)) continue;
      seen.add(key);
      splices.push({ start: leaf.node.start, end: leaf.node.end, text: lit });
      updated++;
    } else {
      const rn = rec.node;
      if (!rn || rn.type !== 'ObjectExpression') { skipped++; continue; }
      // Insert right after `{`, matching the first property's indent.
      const props = (rn.properties || []).filter(p => p.type === 'Property');
      let innerIndent;
      if (props.length) {
        const firstP = props[0];
        const lls = f.source.lastIndexOf('\n', firstP.start) + 1;
        innerIndent = f.source.slice(lls, firstP.start).match(/^\s*/)[0];
      } else {
        const ols = f.source.lastIndexOf('\n', rn.start) + 1;
        const objIndent = f.source.slice(ols, rn.start).match(/^\s*/)[0] || '';
        innerIndent = objIndent + '    ';
      }
      const text = `\n${innerIndent}addDate: ${lit},`;
      const pos = rn.start + 1;
      const key = pos + ':ins';
      if (seen.has(key)) continue;
      seen.add(key);
      splices.push({ start: pos, end: pos, text });
      inserted++;
    }
  }

  if (!splices.length) { toast('Nothing to update', 'err'); return; }
  if (!commitEdit(file, splices)) return;
  rebuildAll();
  const bits = [];
  if (updated)  bits.push(`${updated} updated`);
  if (inserted) bits.push(`${inserted} inserted`);
  if (skipped)  bits.push(`${skipped} skipped`);
  toast(`addDate → ${value} (${bits.join(', ')})`, 'ok');
  state.selectedRows = new Set();
  renderMain();
}
function deleteSelectedRows(arrayTree, arrayPath) {
  const indices = [...state.selectedRows]
    .filter(rp => rp.startsWith(arrayPath + '['))
    .map(rp => parseInt(rp.slice(arrayPath.length + 1, -1), 10))
    .sort((a, b) => b - a);
  const file = state.files[arrayTree.file];
  const arr = arrayTree.node;
  const splices = [];
  for (const idx of indices) {
    const el = arr.elements[idx];
    if (!el) continue;
    let start = el.start, end = el.end;
    let postEnd = end, ateComma = false;
    while (postEnd < arr.end - 1) {
      const ch = file.source[postEnd];
      if (/\s/.test(ch)) postEnd++;
      else if (ch === ',') { end = postEnd + 1; ateComma = true; break; }
      else break;
    }
    if (!ateComma) {
      let preStart = start;
      while (preStart > arr.start + 1) {
        const ch = file.source[preStart - 1];
        if (/\s/.test(ch)) preStart--;
        else if (ch === ',') { start = preStart - 1; break; }
        else break;
      }
    }
    splices.push({ start, end, text: '' });
  }
  if (!splices.length) { toast('Nothing to delete', 'err'); return; }
  if (!commitEdit(arrayTree.file, splices)) return;
  const n = splices.length;
  rebuildAll();
  state.selectedRows = new Set();
  toast(`Deleted ${n} row${n === 1 ? '' : 's'}`, 'ok');
}
function getBulkTypeHint(tree, path, col) {
  for (const rp of state.selectedRows) {
    if (!rp.startsWith(path + '[')) continue;
    const idx = parseInt(rp.slice(path.length + 1, -1), 10);
    const rec = tree.children[idx];
    if (!rec || rec.kind !== 'object') continue;
    const kv = rec.children.find(c => c.key === col);
    if (!kv) continue;
    if (kv.value.kind === 'leaf') return typeof kv.value.value;
    if (kv.value.kind === 'ref') return typeof kv.value.value;
  }
  return 'string';
}
function applyBulkEditNow(rawInput, typeHint) {
  if (!state.selectedRows.size) { toast('No rows selected', 'err'); return; }
  const { file, name } = state.selection;
  const treePath = file + '::' + name;
  const tree = state.trees[treePath];
  if (!tree) return;
  const col = state.bulkCol;
  if (!col) { toast('Pick a column', 'err'); return; }
  const raw = (rawInput ?? '').trim();
  if (raw.startsWith('=')) {
    const expr = raw.slice(1).trim();
    if (!expr) { toast('Empty expression', 'err'); return; }
    try { acorn.parseExpressionAt(expr, 0, { ecmaVersion: 2022 }); }
    catch (e) { toast('Invalid expression: ' + e.message, 'err'); return; }
    runBulkSplices(col, () => expr);
    return;
  }
  const literal = serializeAsLiteral(raw, typeHint);
  if (literal == null) return;
  runBulkSplices(col, () => literal);
}
function serializeAsLiteral(raw, typeHint) {
  if (typeHint === 'number') {
    const n = Number(raw);
    if (raw === '' || Number.isNaN(n)) { toast('Not a valid number', 'err'); return null; }
    return String(n);
  }
  if (typeHint === 'boolean') {
    return raw === 'true' ? 'true' : raw === 'false' ? 'false' : (() => { toast('Expected true or false', 'err'); return null; })();
  }
  return JSON.stringify(raw);
}
function runBulkSplices(col, literalGen) {
  const { file, name } = state.selection;
  const treePath = file + '::' + name;
  const tree = state.trees[treePath];
  if (!tree) return;
  const splices = [];
  const seen = new Set();
  let skipped = 0;
  for (const rp of state.selectedRows) {
    if (!rp.startsWith(treePath + '[')) continue;
    const idx = parseInt(rp.slice(treePath.length + 1, -1), 10);
    const rec = tree.children[idx];
    if (!rec || rec.kind !== 'object') { skipped++; continue; }
    const kv = rec.children.find(c => c.key === col);
    if (!kv) { skipped++; continue; }
    const leaf = kv.value;
    if (leaf.kind !== 'leaf' && leaf.kind !== 'ref') { skipped++; continue; }
    const key = leaf.node.start + ':' + leaf.node.end;
    if (seen.has(key)) continue;
    seen.add(key);
    splices.push({
      start: leaf.node.start,
      end: leaf.node.end,
      text: literalGen(),
    });
  }
  if (!splices.length) { toast('Nothing to edit in those rows', 'err'); return; }
  if (!commitEdit(file, splices)) return;
  const n = splices.length;
  rebuildAll();
  toast(`Updated ${col} on ${n} row${n === 1 ? '' : 's'}${skipped ? ` (${skipped} skipped)` : ''}`, 'ok');
  state.selectedRows = new Set();
  renderMain();
}
function valueRepr(v) {
  if (v === undefined) return '';
  if (v === null) return 'null';
  if (typeof v === 'string') return v;
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  return JSON.stringify(v);
}
function renderActiveFiltersSummary() {
  const entries = Object.entries(state.colFilters).filter(([, s]) => s.size);
  const coord = state.coordMode !== 'all';
  const loc = !!state.locationFilter;
  if (!entries.length && !coord && !loc) return null;
  if (!entries.length && !coord) return null;
  const wrap = document.createElement('div'); wrap.className = 'filter-summary';
  wrap.innerHTML = `<span style="opacity:.7">Filters:</span>`;
  for (const [col, set] of entries) {
    const chip = document.createElement('span');
    chip.className = 'filter-chip';
    chip.innerHTML = `${esc(col)}: ${set.size} value${set.size === 1 ? '' : 's'} <span class="x">×</span>`;
    chip.querySelector('.x').onclick = () => { delete state.colFilters[col]; renderMain(); };
    wrap.appendChild(chip);
  }
  if (coord) {
    const chip = document.createElement('span'); chip.className = 'filter-chip';
    chip.innerHTML = `coords: ${state.coordMode} <span class="x">×</span>`;
    chip.querySelector('.x').onclick = () => { state.coordMode = 'all'; renderMain(); };
    wrap.appendChild(chip);
  }
  if (state.locationFilter) {
    const chip = document.createElement('span'); chip.className = 'filter-chip';
    chip.innerHTML = `location: ${esc(state.locationFilter)} <span class="x">×</span>`;
    chip.querySelector('.x').onclick = () => { state.locationFilter = null; renderMain(); };
    wrap.appendChild(chip);
  }
  const clear = document.createElement('button');
  clear.textContent = 'Clear all';
  clear.style.fontSize = '11px'; clear.style.padding = '2px 8px';
  clear.onclick = () => {
    state.colFilters = {};
    state.coordMode = 'all';
    state.locationFilter = null;
    renderMain();
  };
  wrap.appendChild(clear);
  return wrap;
}
function summarize(node) {
  if (node.kind === 'array') return `Array(${node.children.filter(c => c.kind !== 'hole').length})`;
  if (node.kind === 'object') return `Object(${node.children.length})`;
  if (node.kind === 'leaf' || node.kind === 'ref') {
    const s = node.value === undefined ? '' : String(node.value);
    return s.length > 40 ? s.slice(0, 40) + '…' : s;
  }
  return '…';
}
/* ================================================================
COLUMN FILTER POPOVER
================================================================ */
function openColFilter(col, tree, anchorEl) {
  closeFilterPopover();
  const values = new Map();
  for (const rec of tree.children) {
    if (rec.kind !== 'object') continue;
    const v = getColValue(rec, col);
    if (v === undefined) continue;
    const repr = valueRepr(v);
    if (repr.length > 120) continue;
    if (!values.has(repr)) values.set(repr, { count: 0 });
    values.get(repr).count++;
  }
  if (!values.size) { toast('No filterable values in this column'); return; }
  const pop = document.createElement('div');
  pop.className = 'filter-popover';
  const current = state.colFilters[col] || new Set();
  let working = new Set(current);
  const header = document.createElement('div'); header.className = 'fp-header';
  const search = document.createElement('input');
  search.type = 'text'; search.placeholder = 'Search values…'; search.autofocus = true;
  header.appendChild(search); pop.appendChild(header);
  const list = document.createElement('div'); list.className = 'fp-list';
  const sorted = [...values.entries()].sort((a, b) => b[1].count - a[1].count);
  const renderList = (filterText) => {
    list.innerHTML = '';
    const f = filterText.trim().toLowerCase();
    for (const [repr, meta] of sorted) {
      if (f && !repr.toLowerCase().includes(f)) continue;
      const item = document.createElement('label'); item.className = 'fp-item';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = working.has(repr);
      cb.onchange = () => {
        if (cb.checked) working.add(repr); else working.delete(repr);
      };
      const val = document.createElement('span'); val.className = 'fp-val';
      val.textContent = repr === '' ? '(empty)' : repr;
      const count = document.createElement('span'); count.className = 'fp-count';
      count.textContent = meta.count;
      item.appendChild(cb); item.appendChild(val); item.appendChild(count);
      list.appendChild(item);
    }
  };
  renderList('');
  search.oninput = () => renderList(search.value);
  pop.appendChild(list);
  const footer = document.createElement('div'); footer.className = 'fp-footer';
  const clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear';
  clearBtn.onclick = () => {
    delete state.colFilters[col];
    closeFilterPopover(); renderMain();
  };
  const applyBtn = document.createElement('button');
  applyBtn.className = 'primary'; applyBtn.textContent = 'Apply';
  applyBtn.onclick = () => {
    if (working.size === 0) delete state.colFilters[col];
    else state.colFilters[col] = working;
    closeFilterPopover(); renderMain();
  };
  footer.appendChild(clearBtn); footer.appendChild(applyBtn);
  pop.appendChild(footer);
  document.body.appendChild(pop);
  const rect = anchorEl.getBoundingClientRect();
  const popRect = pop.getBoundingClientRect();
  let left = rect.left;
  let top = rect.bottom + 4;
  if (left + popRect.width > window.innerWidth - 8) left = window.innerWidth - popRect.width - 8;
  if (top + popRect.height > window.innerHeight - 8) top = rect.top - popRect.height - 4;
  pop.style.left = Math.max(8, left) + 'px';
  pop.style.top = Math.max(8, top) + 'px';
  state.filterPopover = pop;
  setTimeout(() => search.focus(), 0);
  const onDocClick = (e) => {
    if (!pop.contains(e.target) && !anchorEl.contains(e.target)) {
      closeFilterPopover();
      document.removeEventListener('mousedown', onDocClick);
    }
  };
  setTimeout(() => document.addEventListener('mousedown', onDocClick), 0);
}
function closeFilterPopover() {
  if (state.filterPopover) { state.filterPopover.remove(); state.filterPopover = null; }
}
/* ================================================================
NAVIGATION
================================================================ */
function parseRefChain(node) {
  const parts = [];
  let cur = node;
  while (cur.type === 'MemberExpression') {
    if (cur.computed) {
      if (cur.property.type === 'Literal') parts.unshift(cur.property.value);
      else parts.unshift('');
    } else parts.unshift(cur.property.name);
    cur = cur.object;
  }
  if (cur.type === 'Identifier') return { root: cur.name, parts };
  return null;
}
function findVarFile(name) {
  for (const fname of Object.keys(state.files)) {
    if (state.files[fname].vars.some(v => v.name === name)) return fname;
  }
  return null;
}
function navigateToRef(leafNode) {
  // leafNode is a tree node ({ kind: 'ref', node: <AST>, file, text, ... })
  const ast = leafNode && leafNode.node;
  if (!ast) return;
  const chain = parseRefChain(ast);
  if (!chain) {
    // Fallback: try to grab the root identifier straight from the source text
    const m = String(leafNode.text || '').match(/^\s*([A-Za-z_$][A-Za-z0-9_$]*)/);
    if (!m) { toast('Could not parse reference', 'err'); return; }
    const varFile = findVarFile(m[1]);
    if (!varFile) { toast('Could not find variable ' + m[1], 'err'); return; }
    state.selection = { file: varFile, name: m[1] };
    state.viewMode = 'edit';
    state.usageFilter = null;
    state.selectedRows = new Set();
    state.locationFilter = null;
    renderSidebar(); renderMain();
    updateUrl('push');
    requestAnimationFrame(() => { /* ...existing scroll... */ });
    return;
  }
  const varFile = findVarFile(chain.root);
  if (!varFile) { toast('Could not find variable ' + chain.root, 'err'); return; }
  state.selection = { file: varFile, name: chain.root };
  state.viewMode = 'edit';
  state.usageFilter = null;
  state.selectedRows = new Set();
  state.locationFilter = null;
  // Build the tree path and open every container along the way
  let treePath = varFile + '::' + chain.root;
  const paths = [treePath];
  for (const p of chain.parts) {
    if (typeof p === 'number') treePath += '[' + p + ']';
    else if (p === '') treePath += '[*]';
    else treePath += '.' + p;
    paths.push(treePath);
  }
  for (let i = 0; i < paths.length - 1; i++) state.detailsOpen.set(paths[i], true);
  renderSidebar(); renderMain();
  updateUrl('push');
  requestAnimationFrame(() => {
    const target = document.querySelector(`[data-leaf-path="${cssEsc(treePath)}"]`);
    if (target) {
      target.scrollIntoView({ block: 'center', behavior: 'smooth' });
      target.classList.remove('flash-leaf');
      void target.offsetWidth;
      target.classList.add('flash-leaf');
    } else {
      const container = document.querySelector(`details[data-path="${cssEsc(treePath)}"]`);
      if (container) container.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  });
}
function jumpToUsage(u) {
  state.selection = { file: u.file, name: u.varName };
  state.viewMode = 'edit';
  state.usageFilter = null;
  state.selectedRows = new Set();
  state.locationFilter = null;
  if (u.arrayIndex != null) state.expandedRows.add(`${u.file}::${u.varName}[${u.arrayIndex}]`);
  state.highlightLine = u.line;
  renderSidebar(); renderMain();
  updateUrl('push');
  requestAnimationFrame(() => {
    if (u.arrayIndex != null) {
      const rowPath = `${u.file}::${u.varName}[${u.arrayIndex}]`;
      const el = document.querySelector(`[data-row-path="${cssEsc(rowPath)}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
        return;
      }
    }
    const srcLine = document.querySelector(`.source-view .line[data-line="${u.line}"]`);
    if (srcLine) srcLine.scrollIntoView({ block: 'center' });
  });
}
/* ================================================================
EDITING
================================================================ */
function applyLeafEdit(node, raw) {
  const file = state.files[node.file];
  if (!file) return;
  const original = node.value;
  let literal;
  if (original === null) literal = 'null';
  else if (typeof original === 'number') {
    const n = Number(raw);
    if (raw.trim() === '' || Number.isNaN(n)) { toast('Not a valid number', 'err'); return; }
    literal = String(n);
  } else if (typeof original === 'boolean') literal = raw === 'true' ? 'true' : 'false';
  else literal = JSON.stringify(String(raw));
  if (file.source.slice(node.node.start, node.node.end) === literal) return;
  if (!commitEdit(node.file, [{
    start: node.node.start,
    end: node.node.end,
    text: literal,
  }])) return;
  rebuildAll();
}
function applyDateEdit(node, value) {
  const file = state.files[node.file];
  if (!file) return;
  const v = String(value || '').trim();
  const literal = JSON.stringify(v);           // always a string literal
  if (file.source.slice(node.node.start, node.node.end) === literal) return;
  if (!commitEdit(node.file, [{
    start: node.node.start, end: node.node.end, text: literal,
  }])) return;
  rebuildAll();
}
function applyCoordEdit(latNode, lngNode, lat, lng) {
  const fileName = latNode.file;
  if (lngNode.file !== fileName) {
    toast('Coordinates are in different files — cannot edit both.', 'err');
    return;
  }
  if (!commitEdit(fileName, [
    { start: latNode.node.start, end: latNode.node.end, text: String(lat) },
    { start: lngNode.node.start, end: lngNode.node.end, text: String(lng) },
  ])) return;
  rebuildAll();
}
function isCoordinateKey(key) {
  if (!key) return false;
  const k = String(key).toLowerCase();
  return LAT_KEYS.has(k) || LNG_KEYS.has(k);
}
function isDateKey(key) {
  if (!key) return false;
  return /date/i.test(String(key));
}
function todayIso() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function findCoordSiblings(parentObj, currentKey, currentNode) {
  if (!parentObj) return null;
  const myLower = String(currentKey).toLowerCase();
  const isLat = LAT_KEYS.has(myLower);
  const isLng = LNG_KEYS.has(myLower);
  if (!isLat && !isLng) return null;
  const targetKeys = isLat ? LNG_KEYS : LAT_KEYS;
  for (const child of parentObj.children) {
    if (targetKeys.has(String(child.key).toLowerCase())) {
      return isLat
        ? { latNode: currentNode, lngNode: child.value, latKey: currentKey, lngKey: child.key }
        : { latNode: child.value, lngNode: currentNode, latKey: child.key, lngKey: currentKey };
    }
  }
  return null;
}
/* ================================================================
ADD ARRAY ENTRY (uses schema)
================================================================ */
function addArrayEntry(arrayTree, arrayPath) {
  const file = state.files[arrayTree.file];
  if (!file) return;
  const arr = arrayTree.node;
  const els = (arr.elements || []).filter(Boolean);
  const schema = computeSchema(arrayTree);
  if (!schema.includes('addDate')) schema.push('addDate');
  const first = els[0];
  let last = null;
  for (let i = arr.elements.length - 1; i >= 0; i--) if (arr.elements[i]) { last = arr.elements[i]; break; }
  if (!last && !first) { toast('Empty array — cannot infer template', 'err'); return; }
  const refObj = first || last;
  const lastLineStart = last ? file.source.lastIndexOf('\n', last.start) + 1
    : file.source.lastIndexOf('\n', arr.start) + 1;
  const lastIndent = last
    ? file.source.slice(lastLineStart, last.start).match(/^\s*/)[0]
    : (file.source.slice(lastLineStart, arr.start).match(/^\s*/)[0] || '') + '    ';
  // Always prefix a comma when we're inserting after an existing element.
  // (The old logic incorrectly skipped it when there was a trailing comma,
  //  which produced `...}  {...}` → "Unexpected token".)
  const sep = last ? ',' : '';
  const nextId = computeNextId(els);
  const template = buildEntryTemplateFromSchema(schema, refObj, lastIndent, nextId);
  const insertion = `${sep}\n${lastIndent}${template}`;
  const insertAt = last ? last.end : arr.start + 1;
  if (!commitEdit(arrayTree.file, [{
    start: insertAt,
    end: insertAt,
    text: insertion,
  }])) return;
  const newIndex = arr.elements.length;
  rebuildAll();
  toast('Entry added (schema-based)', 'ok');
  state.expandedRows.add(`${arrayPath}[${newIndex}]`);
  renderMain();
  requestAnimationFrame(() => {
    const el = document.querySelector(`[data-row-path="${cssEsc(arrayPath + '[' + newIndex + ']')}"]`);
    if (el) {
      el.scrollIntoView({ block: 'center' });
      el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
    }
  });
}
function computeNextId(elements) {
  let max = 0;
  for (const el of elements) {
    if (!el || el.type !== 'ObjectExpression') continue;
    for (const p of el.properties) {
      if (p.type !== 'Property') continue;
      let key;
      if (!p.computed && p.key.type === 'Identifier') key = p.key.name;
      else if (!p.computed && p.key.type === 'Literal') key = p.key.value;
      if (key === 'id' && p.value.type === 'Literal' && typeof p.value.value === 'number' && p.value.value > max)
        max = p.value.value;
    }
  }
  return max + 1;
}
function buildEntryTemplateFromSchema(schema, refObj, indent, nextId) {
  const inner = indent + '    ';
  const lines = ['{'];
  const existingDefaults = new Map();
  if (refObj && refObj.type === 'ObjectExpression') {
    for (const p of refObj.properties) {
      if (p.type !== 'Property') continue;
      let k;
      if (!p.computed && p.key.type === 'Identifier') k = p.key.name;
      else if (!p.computed && p.key.type === 'Literal') k = p.key.value;
      else continue;
      existingDefaults.set(k, p.value);
    }
  }
  for (const key of schema) {
    const keyRepr = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
    let def;
    if (key === 'addDate') {
      def = JSON.stringify(todayIso());
    } else {
      const refNode = existingDefaults.get(key);
      def = refNode ? defaultForValue(refNode, key, nextId)
                    : defaultForUnknownKey(key, nextId);
    }
    lines.push(`${inner}${keyRepr}: ${def},`);
  }
  lines.push(`${indent}}`);
  return lines.join('\n');
}
function defaultForUnknownKey(key, nextId) {
  const k = key.toLowerCase();
  if (k === 'id') return String(nextId ?? 0);
  if (k === 'adddate') return JSON.stringify(todayIso());
  if (LAT_KEYS.has(k) || LNG_KEYS.has(k)) return '0';
  if (k === 'workers') return '0';
  if (k.endsWith('date') || k === 'startdate' || k === 'enddate') return '""';
  if (k === 'url') return '""';
  return 'null';
}
function buildEntryTemplate(objNode, indent, nextId) {
  const inner = indent + '    ';
  const lines = ['{'];
  for (const p of objNode.properties) {
    if (p.type !== 'Property') continue;
    let key;
    if (!p.computed && p.key.type === 'Identifier') key = p.key.name;
    else if (!p.computed && p.key.type === 'Literal') key = p.key.value;
    else continue;
    const keyRepr = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
    const def = defaultForValue(p.value, key, nextId);
    lines.push(`${inner}${keyRepr}: ${def},`);
  }
  lines.push(`${indent}}`);
  return lines.join('\n');
}
function defaultForValue(node, key, nextId) {
  if (node.type === 'ArrayExpression') return '[]';
  if (node.type === 'ObjectExpression') return '{}';
  if (node.type === 'Identifier' || node.type === 'MemberExpression' || node.type === 'CallExpression') {
    if (isCoordinateKey(key)) return '0';
    return 'null';
  }
  if (node.type === 'Literal') {
    const v = node.value;
    if (typeof v === 'number') return key === 'id' ? String(nextId ?? 0) : '0';
    if (typeof v === 'string') return '""';
    if (typeof v === 'boolean') return 'false';
    if (v === null) return 'null';
  }
  if (node.type === 'UnaryExpression' && node.operator === '-') return '0';
  return 'null';
}
/* ================================================================
ADD OBJECT KEY
================================================================ */
function parseUserValue(str) {
  const s = str.trim();
  if (!s) return null;
  try { return JSON.parse(s); } catch { }
  if (s === 'true') return true;
  if (s === 'false') return false;
  if (s === 'null') return null;
  if (/^-?\d+(\.\d+)?([eE][-+]?\d+)?$/.test(s)) return Number(s);
  return s;
}
function jsLiteral(v, indent) {
  if (v === null) return 'null';
  if (typeof v === 'number') return Number.isFinite(v) ? String(v) : '0';
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  if (typeof v === 'string') return JSON.stringify(v);
  if (Array.isArray(v)) {
    if (!v.length) return '[]';
    const inner = indent + '    ';
    const allSimple = v.every(x => x === null || typeof x === 'number' || typeof x === 'boolean' || typeof x === 'string');
    if (allSimple) return '[' + v.map(x => jsLiteral(x, indent)).join(', ') + ']';
    return '[\n' + v.map(x => inner + jsLiteral(x, inner)).join(',\n') + '\n' + indent + ']';
  }
  if (typeof v === 'object') {
    const keys = Object.keys(v);
    if (!keys.length) return '{}';
    const inner = indent + '    ';
    const keyRepr = k => /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
    return '{\n' + keys.map(k => inner + keyRepr(k) + ': ' + jsLiteral(v[k], inner)).join(',\n') + '\n' + indent + '}';
  }
  return 'null';
}
function addObjectKey(objTree, objPath, keyName, rawValue, type) {
  const file = state.files[objTree.file];
  if (!file) return false;
  const obj = objTree.node;
  for (const child of objTree.children) {
    if (child.key === keyName) {
      toast(`Key "${keyName}" already exists`, 'err');
      return false;
    }
  }

  // Work out indent up front — needed for pretty-printed arrays/objects.
  const props = obj.properties.filter(p => p.type === 'Property');
  let indent;
  if (props.length) {
    const lastP = props[props.length - 1];
    const lls = file.source.lastIndexOf('\n', lastP.start) + 1;
    indent = file.source.slice(lls, lastP.start).match(/^\s*/)[0];
  } else {
    const ols = file.source.lastIndexOf('\n', obj.start) + 1;
    indent = (file.source.slice(ols, obj.start).match(/^\s*/)[0] || '') + '     ';
  }

  let valueText;
  const raw = (rawValue ?? '').trim();
  type = type || 'auto';

  if (type === 'array') {
    if (!raw) valueText = '[]';
    else {
      const parts = raw.split(',').map(s => s.trim()).filter(Boolean);
      valueText = jsLiteral(parts.map(parseUserValue), indent);
    }
  } else if (type === 'object') {
    if (!raw) valueText = '{}';
    else {
      try {
        valueText = jsLiteral(JSON.parse(raw), indent);
      } catch (e) {
        toast('Object value is not valid JSON: ' + e.message, 'err');
        return false;
      }
    }
  } else if (raw.startsWith('=')) {
    const expr = raw.slice(1).trim();
    if (!expr) { toast('Empty expression', 'err'); return false; }
    try { acorn.parseExpressionAt(expr, 0, { ecmaVersion: 2022 }); }
    catch (e) { toast('Invalid expression: ' + e.message, 'err'); return false; }
    valueText = expr;
  } else {
    const v = parseUserValue(raw);
    valueText = jsLiteral(v, indent);
  }

  const keyRepr = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(keyName)
    ? keyName : JSON.stringify(keyName);

  if (props.length === 0) {
    const ols = file.source.lastIndexOf('\n', obj.start) + 1;
    const objIndent = file.source.slice(ols, obj.start).match(/^\s*/)[0] || '';
    const innerIndent = objIndent + '    ';
    const text = `\n${innerIndent}${keyRepr}: ${valueText}\n${objIndent}`;
    if (!commitEdit(objTree.file, [{
      start: obj.start + 1, end: obj.end - 1, text,
    }])) return false;
  } else {
    const ols = file.source.lastIndexOf('\n', obj.start) + 1;
    const objIndent = file.source.slice(ols, obj.start).match(/^\s*/)[0] || '';
    const innerIndent = objIndent + '    ';
    const text = `\n${innerIndent}${keyRepr}: ${valueText},`;
    if (!commitEdit(objTree.file, [{
      start: obj.start + 1, end: obj.start + 1, text,
    }])) return false;
  }

  rebuildAll();
  toast(`Added "${keyName}" (${type})`, 'ok');
  const newPath = objPath + '.' + keyName;
  requestAnimationFrame(() => {
    const el = document.querySelector(`[data-leaf-path="${cssEsc(newPath)}"]`);
    if (el) {
      el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      el.classList.remove('flash-leaf'); void el.offsetWidth; el.classList.add('flash-leaf');
    } else {
      const c = document.querySelector(`details[data-path="${cssEsc(newPath)}"]`);
      if (c) c.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  });
  return true;
}
/* ================================================================
MAP
================================================================ */
let mapPicker = null;
function openMapForLeaf(node, parentObj, key) {
  const sibs = findCoordSiblings(parentObj, key, node);
  if (!sibs) { toast('No matching coordinate found', 'err'); return; }
  const lat = Number(sibs.latNode.value);
  const lng = Number(sibs.lngNode.value);
  const fallback = { lat: -25.5, lng: 134.0 };
  const startLat = isFinite(lat) && lat !== 0 ? lat : fallback.lat;
  const startLng = isFinite(lng) && lng !== 0 ? lng : fallback.lng;
  const hadValidCoords = isFinite(lat) && isFinite(lng) && lat !== 0 && lng !== 0;
  const modal = $('#mapModal');
  const container = $('#mapContainer');
  modal.classList.remove('hidden');
  if (mapPicker) { mapPicker.remove(); mapPicker = null; }
  container.innerHTML = '';
  const map = L.map(container, { zoomControl: true, worldCopyJump: true })
    .setView([startLat, startLng], hadValidCoords ? 13 : 4);
  const tiles = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    { subdomains: 'abcd', maxZoom: 19, attribution: '© OpenStreetMap contributors © CARTO', crossOrigin: true }
  );
  tiles.addTo(map);
  let tileErrors = 0, tileOk = 0, errMsgEl = null;
  tiles.on('tileload', () => { tileOk++; });
  tiles.on('tileerror', () => {
    tileErrors++;
    if (tileErrors >= 4 && tileOk === 0 && !errMsgEl) {
      errMsgEl = document.createElement('div');
      errMsgEl.className = 'map-error';
      errMsgEl.textContent = 'Map tiles failed to load. You can still click the map to set coordinates.';
      container.appendChild(errMsgEl);
    }
  });
  const marker = L.marker([startLat, startLng], { draggable: true }).addTo(map);
  const updateReadout = (la, ln) => { $('#mapReadout').textContent = `${la.toFixed(6)}, ${ln.toFixed(6)}`; };
  updateReadout(startLat, startLng);
  map.on('click', (e) => { marker.setLatLng(e.latlng); updateReadout(e.latlng.lat, e.latlng.lng); });
  marker.on('dragend', () => { const ll = marker.getLatLng(); updateReadout(ll.lat, ll.lng); });
  const saveBtn = $('#mapSaveBtn');
  const cancelBtn = $('#mapCancelBtn');
  const backdrop = $('#mapBackdrop');
  const close = () => {
    modal.classList.add('hidden');
    if (mapPicker) { mapPicker.remove(); mapPicker = null; }
    container.innerHTML = '';
    saveBtn.onclick = null; cancelBtn.onclick = null; backdrop.onclick = null;
  };
  saveBtn.onclick = () => {
    const ll = marker.getLatLng();
    applyCoordEdit(sibs.latNode, sibs.lngNode, +ll.lat.toFixed(7), +ll.lng.toFixed(7));
    close(); toast('Coordinates updated', 'ok');
  };
  cancelBtn.onclick = close;
  backdrop.onclick = close;
  mapPicker = map;
  setTimeout(() => map.invalidateSize(), 60);
}
/* ================================================================
EXTRACT TO LOCATIONS
================================================================ */
function getLocationVarNames() {
  return new Set(collectExtractTargets().map(t => t.varName));
}
function getRecordLocationRefs(recTree) {
  const locationVars = getLocationVarNames();
  const found = new Set();
  const walk = (n) => {
    if (!n) return;
    if (n.kind === 'ref') {
      const m = String(n.text).match(/^\s*([A-Za-z_$][A-Za-z0-9_$]*)/);
      if (m && locationVars.has(m[1])) found.add(m[1]);
      return;
    }
    if (n.kind === 'array') n.children.forEach(walk);
    else if (n.kind === 'object') n.children.forEach(c => walk(c.value));
  };
  walk(recTree);
  return [...found];
}
/* ---- find every {lat,lng} pair anywhere in a tree (descends into loc[]) ---- */
function findCoordPairsInTree(rootTree) {
  const results = [];
  const walk = (node, path) => {
    if (!node) return;
    if (node.kind === 'object') {
      let latLeaf = null, lngLeaf = null;
      for (const c of node.children) {
        const k = String(c.key).toLowerCase();
        if (c.value.kind !== 'leaf' && c.value.kind !== 'ref') continue;
        if (LAT_KEYS.has(k) && !latLeaf) latLeaf = { key: c.key, leaf: c.value };
        else if (LNG_KEYS.has(k) && !lngLeaf) lngLeaf = { key: c.key, leaf: c.value };
      }
      if (latLeaf && lngLeaf) {
        results.push({ container: node, latLeaf, lngLeaf, path: path || '(root)' });
        return;
      }
      for (const c of node.children)
        walk(c.value, path ? path + '.' + c.key : String(c.key));
    } else if (node.kind === 'array') {
      node.children.forEach((c, i) =>
        walk(c, path ? path + '[' + i + ']' : '[' + i + ']'));
    }
  };
  walk(rootTree, '');
  return results;
}
/* ---- targets: any array-of-objects OR object-of-objects (in any loaded file) ---- */
/* FIX 1: Now also includes objects whose values are arrays (like CITY_COORDS, MELB, etc.) */
function collectExtractTargets() {
  const results = [];
  for (const fname of Object.keys(state.files)) {
    const f = state.files[fname];
    for (const v of f.vars) {
      const tree = state.trees[fname + '::' + v.name];
      if (!tree) continue;
      if (tree.kind === 'array') {
        const nonHole = tree.children.filter(c => c.kind !== 'hole');
        if (!nonHole.length) continue;
        const objCount = nonHole.filter(c => c.kind === 'object').length;
        if (!objCount) continue;
        results.push({
          kind: 'array',
          file: fname, varName: v.name, tree,
          size: nonHole.length,
          hasCoords: nonHole.some(c =>
            c.kind === 'object' && classifyCoordRecord(c) !== null),
        });
      } else if (tree.kind === 'object') {
        const children = tree.children;
        if (!children.length) continue;
        // Check if any child is an object OR an array (for location data like CITY_COORDS)
        const hasObjects = children.some(c => c.value.kind === 'object');
        const hasArrays = children.some(c => c.value.kind === 'array');
        if (!hasObjects && !hasArrays) continue;
        results.push({
          kind: 'object',
          file: fname, varName: v.name, tree,
          size: children.length,
          hasCoords: children.some(c => {
            if (c.value.kind === 'object') {
              return classifyCoordRecord(c.value) !== null;
            } else if (c.value.kind === 'array') {
              // Check if array contains coordinate pairs
              return c.value.children.some(item =>
                item.kind === 'object' && classifyCoordRecord(item) !== null
              );
            }
            return false;
          }),
        });
      }
    }
  }
  results.sort((a, b) => {
    const aLoc = a.file === 'locations.js' ? 0 : 1;
    const bLoc = b.file === 'locations.js' ? 0 : 1;
    if (aLoc !== bLoc) return aLoc - bLoc;
    if (a.hasCoords !== b.hasCoords) return a.hasCoords ? -1 : 1;
    if (a.kind !== b.kind) return a.kind === 'array' ? -1 : 1;
    return b.size - a.size;
  });
  return results;
}
/* ---- schema of the target (union of all object entries, priority-ordered) ---- */
function getTargetSchema(target) {
  const ordered = []; const seen = new Set();
  const add = (objTree) => {
    for (const kv of objTree.children) {
      if (!seen.has(kv.key)) {
        seen.add(kv.key);
        ordered.push({ key: kv.key, sample: kv.value });
      }
    }
  };
  if (target.kind === 'array') {
    const first = target.tree.children.find(c => c.kind === 'object' && c.children.length);
    if (first) add(first);
    for (const c of target.tree.children)
      if (c.kind === 'object' && c !== first && c.children.length) add(c);
  } else {
    const firstKv = target.tree.children.find(c =>
      c.value.kind === 'object' && c.value.children.length);
    if (firstKv) add(firstKv.value);
    for (const c of target.tree.children)
      if (c.value.kind === 'object' && c !== firstKv && c.value.children.length) add(c.value);
  }
  const lower = new Set(ordered.map(k => k.key.toLowerCase()));
  if (![...lower].some(k => LAT_KEYS.has(k))) ordered.push({ key: 'lat', sample: null });
  if (![...lower].some(k => LNG_KEYS.has(k))) ordered.push({ key: 'lng', sample: null });
  const byKey = new Map(ordered.map(o => [o.key, o]));
  const prioritized = PRIORITY_COLS.map(k => byKey.get(k)).filter(Boolean);
  const rest = ordered.filter(o => !PRIORITY_COLS.includes(o.key));
  return [...prioritized, ...rest];
}
function computeNextIdInTarget(target) {
  let max = 0;
  const scan = (tree) => {
    for (const kv of tree.children) {
      if (kv.key === 'id' && typeof kv.value.value === 'number' && kv.value.value > max)
        max = kv.value.value;
    }
  };
  if (target.kind === 'array') {
    for (const c of target.tree.children) if (c.kind === 'object') scan(c);
  } else {
    for (const c of target.tree.children) if (c.value.kind === 'object') scan(c.value);
  }
  return max + 1;
}
function inferFieldType(sample) {
  if (!sample) return 'unknown';
  const v = sample.value;
  if (typeof v === 'number') return 'number';
  if (typeof v === 'boolean') return 'boolean';
  if (typeof v === 'string') return 'string';
  return 'unknown';
}
function defaultFieldText(key, sample, pair, prefillName, nextId) {
  const kl = key.toLowerCase();
  if (LAT_KEYS.has(kl)) return String(pair.latLeaf.leaf.value);
  if (LNG_KEYS.has(kl)) return String(pair.lngLeaf.leaf.value);
  if (kl === 'id' && typeof pair.idNext === 'number') return String(nextId);
  if ((kl === 'name' || kl === 'title') && prefillName) return prefillName;
  if (sample && (sample.kind === 'leaf' || sample.kind === 'ref')) {
    const v = sample.value;
    if (v === null || v === undefined) return '';
    if (typeof v === 'string') return v;
    return String(v);
  }
  return '';
}
function buildEntryFromFields(schema, fieldStates) {
  const parts = [];
  for (const { key } of schema) {
    const st = fieldStates.get(key);
    if (!st) continue;
    const raw = st.input.value;
    let literal;
    if (st.type === 'number') {
      const t = raw.trim();
      const n = Number(t);
      literal = (t === '' || !Number.isFinite(n)) ? 'null' : String(n);
    } else if (st.type === 'boolean') {
      literal = raw === 'true' ? 'true' : 'false';
    } else if (st.type === 'string') {
      literal = JSON.stringify(raw);
    } else {
      const t = raw.trim();
      if (t === '') literal = 'null';
      else if (t === 'true') literal = 'true';
      else if (t === 'false') literal = 'false';
      else if (t === 'null') literal = 'null';
      else if (/^-?\d+(\.\d+)?([eE][-+]?\d+)?$/.test(t)) literal = String(Number(t));
      else if (t.startsWith('[') || t.startsWith('{') || t.startsWith('"')) {
        try { JSON.parse(t); literal = t; } catch { literal = JSON.stringify(t); }
      }
      else literal = JSON.stringify(t);
    }
    const keyRepr = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
    parts.push(`${keyRepr}: ${literal}`);
  }
  return `{ ${parts.join(', ')} }`;
}
function planInsertion(target, keyName) {
  const f = state.files[target.file];
  if (target.kind === 'array') {
    const arr = target.tree.node;
    let last = null;
    for (let i = arr.elements.length - 1; i >= 0; i--)
      if (arr.elements[i]) { last = arr.elements[i]; break; }
    const refPos = last ? last.start : arr.start;
    const lls = f.source.lastIndexOf('\n', refPos) + 1;
    const indent = last
      ? f.source.slice(lls, last.start).match(/^\s*/)[0]
      : (f.source.slice(lls, arr.start).match(/^\s*/)[0] || '') + '    ';
    const sep = last ? ',' : '';
    const insertAt = last ? last.end : arr.start + 1;
    const newIdx = target.tree.children.filter(c => c.kind !== 'hole').length;
    return {
      ref: `${target.varName}[${newIdx}]`,
      buildSplice: (entryText) => ({
        start: insertAt, end: insertAt,
        text: `${sep}\n${indent}${entryText}`,
      }),
    };
  }
  const obj = target.tree.node;
  const props = obj.properties.filter(p => p.type === 'Property');
  const ols = f.source.lastIndexOf('\n', obj.start) + 1;
  const objIndent = f.source.slice(ols, obj.start).match(/^\s*/)[0] || '';
  const innerIndent = objIndent + '    ';
  const key = keyName;
  const keyRepr = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
  const ref = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
    ? `${target.varName}.${key}`
    : `${target.varName}[${keyRepr}]`;
  return {
    ref,
    buildSplice: (entryText) => {
      if (props.length === 0) {
        return {
          start: obj.start + 1, end: obj.end - 1,
          text: `\n${innerIndent}${keyRepr}: ${entryText}\n${objIndent}`,
        };
      }
      return {
        start: obj.start + 1, end: obj.start + 1,
        text: `\n${innerIndent}${keyRepr}: ${entryText},`,
      };
    },
  };
}
function openExtractLocationDialog(searchRoot, opts = {}) {
  const pairs = findCoordPairsInTree(searchRoot);
  if (!pairs.length) { toast('No lat/lng pair found in this record', 'err'); return; }
  let selectedPair = pairs[0];
  if (opts.pairIndex != null && pairs[opts.pairIndex]) {
    selectedPair = pairs[opts.pairIndex];
  } else if (opts.preferredContainer) {
    const match = pairs.find(p => p.container === opts.preferredContainer);
    if (match) selectedPair = match;
  }
  const targets = collectExtractTargets();
  if (!targets.length) {
    toast('No array/object targets found. Make sure locations.js is loaded and has no eval error.', 'err');
    return;
  }
  let prefillName = '';
  {
    const scan = (node) => {
      if (!node || prefillName) return;
      if (node.kind === 'object') {
        for (const c of node.children) {
          const k = String(c.key).toLowerCase();
          if ((k === 'name' || k === 'title') && typeof c.value.value === 'string') {
            prefillName = c.value.value; return;
          }
        }
        for (const c of node.children) scan(c.value);
      } else if (node.kind === 'array') for (const c of node.children) scan(c);
    };
    scan(searchRoot);
  }
  const keyPrefill = (prefillName || 'site')
    .toLowerCase().replace(/[^a-z0-9_]+/g, '').replace(/^_+|_+$/g, '') || 'site';
  const modal = document.createElement('div'); modal.className = 'modal';
  const backdrop = document.createElement('div'); backdrop.className = 'modal-backdrop';
  const content = document.createElement('div');
  content.className = 'modal-content extract-modal';
  const header = document.createElement('div'); header.className = 'modal-header';
  const htitle = document.createElement('strong'); htitle.textContent = 'Extract to locations';
  header.appendChild(htitle);
  const sp = document.createElement('div'); sp.className = 'spacer'; sp.style.flex = '1';
  header.appendChild(sp);
  const cancelBtn = document.createElement('button'); cancelBtn.textContent = 'Cancel';
  const applyBtn = document.createElement('button');
  applyBtn.className = 'primary'; applyBtn.textContent = 'Create & link';
  header.appendChild(cancelBtn); header.appendChild(applyBtn);
  content.appendChild(header);
  const body = document.createElement('div'); body.className = 'extract-body';
  content.appendChild(body);
  if (pairs.length > 1) {
    const row = document.createElement('div'); row.className = 'ex-row';
    const lbl = document.createElement('span');
    lbl.className = 'ex-lbl'; lbl.textContent = 'Coordinate pair';
    const pairSel = document.createElement('select');
    pairs.forEach((p, i) => {
      const o = document.createElement('option');
      o.value = String(i);
      const la = typeof p.latLeaf.leaf.value === 'number' ? p.latLeaf.leaf.value : '?';
      const ln = typeof p.lngLeaf.leaf.value === 'number' ? p.lngLeaf.leaf.value : '?';
      o.textContent = `${p.path} (${la}, ${ln})`;
      pairSel.appendChild(o);
    });
    pairSel.value = String(pairs.indexOf(selectedPair));
    row.appendChild(lbl); row.appendChild(pairSel);
    body.appendChild(row);
    pairSel.onchange = () => {
      selectedPair = pairs[parseInt(pairSel.value, 10)] || pairs[0];
      rebuildFields();
    };
  }
  const targetRow = document.createElement('div'); targetRow.className = 'ex-row';
  const targetLbl = document.createElement('span');
  targetLbl.className = 'ex-lbl'; targetLbl.textContent = 'Target';
  const targetSel = document.createElement('select');
  targets.forEach((t, i) => {
    const o = document.createElement('option');
    o.value = String(i);
    const kindLabel = t.kind === 'array' ? 'array' : 'object';
    const coordsLabel = t.hasCoords ? ', has coords' : '';
    const sizeLabel = t.kind === 'array'
      ? `${t.size} entr${t.size === 1 ? 'y' : 'ies'}`
      : `${t.size} key${t.size === 1 ? '' : 's'}`;
    o.textContent = `${t.file} › ${t.varName} [${kindLabel}] (${sizeLabel}${coordsLabel})`;
    targetSel.appendChild(o);
  });
  targetRow.appendChild(targetLbl); targetRow.appendChild(targetSel);
  body.appendChild(targetRow);
  const keyRow = document.createElement('div'); keyRow.className = 'ex-row';
  const keyLbl = document.createElement('span');
  keyLbl.className = 'ex-lbl'; keyLbl.textContent = 'Key name';
  const keyInp = document.createElement('input');
  keyInp.type = 'text'; keyInp.placeholder = 'e.g. site_melbourne';
  keyRow.appendChild(keyLbl); keyRow.appendChild(keyInp);
  body.appendChild(keyRow);
  const fieldsWrap = document.createElement('div'); fieldsWrap.className = 'ex-fields';
  body.appendChild(fieldsWrap);
  const readout = document.createElement('div'); readout.className = 'ex-readout';
  body.appendChild(readout);
  const modes = document.createElement('div'); modes.className = 'ex-modes';
  const r1 = document.createElement('label');
  const r1i = document.createElement('input');
  r1i.type = 'radio'; r1i.name = 'extractMode'; r1i.value = 'leaves'; r1i.checked = true;
  const r1s = document.createElement('span');
  r1.appendChild(r1i); r1.appendChild(r1s);
  const r2 = document.createElement('label');
  const r2i = document.createElement('input');
  r2i.type = 'radio'; r2i.name = 'extractMode'; r2i.value = 'container';
  const r2s = document.createElement('span');
  r2.appendChild(r2i); r2.appendChild(r2s);
  modes.appendChild(r1); modes.appendChild(r2);
  body.appendChild(modes);
  const preview = document.createElement('pre'); preview.className = 'ex-preview';
  body.appendChild(preview);
  modal.appendChild(backdrop); modal.appendChild(content);
  document.body.appendChild(modal);
  let schema = [];
  let fieldStates = new Map();
  const rebuildFields = () => {
    const t = targets[parseInt(targetSel.value, 10)];
    if (!t) return;
    const isObj = t.kind === 'object';
    keyRow.style.display = isObj ? '' : 'none';
    if (isObj && keyInp.value.trim() === '') keyInp.value = keyPrefill;
    schema = getTargetSchema(t);
    fieldStates = new Map();
    const pair = selectedPair;
    const nextId = computeNextIdInTarget(t);
    fieldsWrap.innerHTML = '';
    for (const { key, sample } of schema) {
      const type = inferFieldType(sample);
      const row = document.createElement('div'); row.className = 'ex-field';
      const kEl = document.createElement('div'); kEl.className = 'ex-field-key';
      kEl.innerHTML = `${esc(key)}<span class="ex-type">${type === 'unknown' ? '' : type}</span>`;
      row.appendChild(kEl);
      let input;
      if (type === 'boolean') {
        input = document.createElement('select');
        input.innerHTML = `<option value="true">true</option><option value="false">false</option>`;
      } else if (type === 'number') {
        input = document.createElement('input');
        input.type = 'number'; input.step = 'any';
      } else {
        input = document.createElement('input');
        input.type = 'text';
      }
      const kl = key.toLowerCase();
      const isLat = LAT_KEYS.has(kl);
      const isLng = LNG_KEYS.has(kl);
      const isId = kl === 'id';
      const isName = (kl === 'name' || kl === 'title');
      let def = defaultFieldText(key, sample, pair, prefillName, nextId);
      if (type === 'boolean' && def !== 'true' && def !== 'false') def = 'false';
      input.value = def;
      if (isLat || isLng || isId || isName) {
        const badge = document.createElement('span');
        badge.className = 'ex-field-badge';
        badge.textContent = isLat ? 'from lat' : isLng ? 'from lng' : isId ? 'next id' : 'from name';
        row.appendChild(input); row.appendChild(badge);
      } else {
        row.appendChild(input);
      }
      if (isId) {
        input.addEventListener('input', () => { });
      }
      input.addEventListener('input', refresh);
      input.addEventListener('change', refresh);
      fieldsWrap.appendChild(row);
      fieldStates.set(key, { type, input });
    }
    keyInp.oninput = () => { refresh(); };
    refresh();
  };
  const refresh = () => {
    const t = targets[parseInt(targetSel.value, 10)];
    if (!t) return;
    const latVal = selectedPair.latLeaf.leaf.value;
    const lngVal = selectedPair.lngLeaf.leaf.value;
    readout.textContent = `From ${selectedPair.path}: lat ${latVal} · lng ${lngVal}`;
    if (typeof latVal !== 'number' || typeof lngVal !== 'number') {
      preview.textContent = 'Coordinates must be numeric to extract.';
      return;
    }
    const isObj = t.kind === 'object';
    const keyName = isObj ? keyInp.value.trim() : null;
    if (isObj && !keyName) {
      preview.textContent = 'Enter a key name for the new location.';
      return;
    }
    const entryText = buildEntryFromFields(schema, fieldStates);
    const plan = planInsertion(t, keyName);
    const mode = modal.querySelector('input[name=extractMode]:checked').value;
    const dest = isObj
      ? `${t.file} › ${t.varName}  as key  "${keyName}"`
      : `${t.file} › ${t.varName}  (new entry)`;
    if (mode === 'container') {
      r1s.textContent = `Replace lat/lng values with references`;
      r2s.textContent = `Replace the containing object  (${selectedPair.path} → ${plan.ref})`;
      preview.textContent =
        `Insert into ${dest}:\n  ${entryText}\n\n` +
        `Replace inside ${selectedPair.path}:\n  → ${plan.ref}`;
    } else {
      r1s.textContent = `Replace lat/lng values with references  (${selectedPair.latLeaf.key} → ${plan.ref}.lat, ${selectedPair.lngLeaf.key} → ${plan.ref}.lng)`;
      r2s.textContent = `Replace the containing object  (${selectedPair.path} → ${plan.ref})`;
      preview.textContent =
        `Insert into ${dest}:\n  ${entryText}\n\n` +
        `Replace inside ${selectedPair.path}:\n` +
        `  ${selectedPair.latLeaf.key}: → ${plan.ref}.lat\n` +
        `  ${selectedPair.lngLeaf.key}: → ${plan.ref}.lng`;
    }
  };
  targetSel.onchange = () => { rebuildFields(); };
  r1i.onchange = refresh;
  r2i.onchange = refresh;
  rebuildFields();
  const close = () => modal.remove();
  cancelBtn.onclick = close;
  backdrop.onclick = close;
  applyBtn.onclick = () => {
    const t = targets[parseInt(targetSel.value, 10)]; if (!t) return;
    const isObj = t.kind === 'object';
    const keyName = isObj ? keyInp.value.trim() : null;
    if (isObj && !keyName) { toast('Enter a key name', 'err'); return; }
    if (isObj) {
      for (const p of t.tree.node.properties) {
        if (p.type !== 'Property') continue;
        let pk;
        if (!p.computed && p.key.type === 'Identifier') pk = p.key.name;
        else if (!p.computed && p.key.type === 'Literal') pk = p.key.value;
        if (pk === keyName) { toast(`Key "${keyName}" already exists in ${t.varName}`, 'err'); return; }
      }
    }
    const entryText = buildEntryFromFields(schema, fieldStates);
    const plan = planInsertion(t, keyName);
    const targetSplice = plan.buildSplice(entryText);
    const mode = modal.querySelector('input[name=extractMode]:checked').value;
    const sourceFile = selectedPair.container.file;
    const targetFile = t.file;
    const sourceSplices = mode === 'container'
      ? [{
        start: selectedPair.container.node.start,
        end: selectedPair.container.node.end,
        text: plan.ref
      }]
      : [
        {
          start: selectedPair.latLeaf.leaf.node.start,
          end: selectedPair.latLeaf.leaf.node.end,
          text: `${plan.ref}.lat`
        },
        {
          start: selectedPair.lngLeaf.leaf.node.start,
          end: selectedPair.lngLeaf.leaf.node.end,
          text: `${plan.ref}.lng`
        },
      ];
    let ok = true;
    if (sourceFile === targetFile) {
      ok = commitEdit(sourceFile, [targetSplice, ...sourceSplices]);
    } else {
      ok = commitEdit(targetFile, [targetSplice]);
      if (ok) ok = commitEdit(sourceFile, sourceSplices);
    }
    if (!ok) return;
    close();
    rebuildAll();
    toast(`Extracted ${selectedPair.path} → ${plan.ref}`, 'ok');
  };
}


/* ================================================================
SAVE / DOWNLOAD / WIRING
================================================================ */
async function saveAll() {
  let saved = 0;
  for (const name of FILES) {
    const f = state.files[name];
    if (!f || !f.handle) continue;
    try {
      const w = await f.handle.createWritable();
      await w.write(f.source); await w.close();
      saved++;
    } catch (e) { toast(`Save failed for ${name}: ${e.message}`, 'err'); }
  }
  if (saved) toast(`Saved ${saved} file(s)`, 'ok');
  else toast('No writable handles — use "Download copies"', '');
}
function downloadAll() {
  for (const name of FILES) {
    const f = state.files[name]; if (!f) continue;
    const blob = new Blob([f.source], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
  toast('Downloaded', 'ok');
}
async function openWithPicker() {
  if (!window.showOpenFilePicker) {
    toast('Direct file access unavailable — using classic picker. Use "Download copies" to save.');
    $('#fileInput').click(); return;
  }
  try {
    const handles = await window.showOpenFilePicker({
      multiple: true,
      types: [{ description: 'JavaScript', accept: { 'text/javascript': ['.js'] } }],
    });
    for (const h of handles) {
      const f = await h.getFile();
      loadFileText(f.name, await f.text(), h);
    }
    rebuildAll();
  } catch (e) { if (e.name !== 'AbortError') toast(e.message, 'err'); }
}
$('#openBtn').onclick = openWithPicker;
$('#saveBtn').onclick = saveAll;
$('#saveAsBtn').onclick = downloadAll;
$('#fileInput').onchange = e => { handleFiles(e.target.files); e.target.value = ''; };
$('#searchBox').oninput = e => { state.search = e.target.value; renderMain(); };
$$('#viewToggle button').forEach(b => b.onclick = () => { state.viewMode = b.dataset.view; renderMain(); });
window.addEventListener('dragover', e => e.preventDefault());
window.addEventListener('drop', async e => {
  e.preventDefault();
  if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
});
window.addEventListener('scroll', closeFilterPopover, true);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (!$('#mapModal').classList.contains('hidden')) $('#mapCancelBtn').click();
    else { closeFilterPopover(); closeAutocomplete(); }
  }
});
// Boot: try cache first, then render banner

/* ================================================================
DEEP-LINK ROUTING
================================================================ */
let _suppressHash = false;

function serializeState() {
  if (!state.selection) return '';
  const p = new URLSearchParams();
  p.set('file', state.selection.file);
  p.set('var', state.selection.name);
  if (state.viewMode === 'source') p.set('view', 'source');
  const prefix = state.selection.file + '::' + state.selection.name;
  if (state.focusRow && state.focusRow.startsWith(prefix + '[')) {
    const m = state.focusRow.match(/\[(\d+)\]$/);
    if (m && state.focusRow === prefix + '[' + m[1] + ']') p.set('row', m[1]);
  }
  return p.toString();
}

function updateUrl(mode) {
  if (_suppressHash) return;
  const h = serializeState();
  const target = location.pathname + location.search + (h ? '#' + h : '');
  const current = location.pathname + location.search + location.hash;
  if (target === current) return;
  try {
    if (mode === 'replace') history.replaceState(null, '', target);
    else history.pushState(null, '', target);
  } catch { /* ignore */ }
}

function parseAndApplyHash() {
  const raw = location.hash.replace(/^#/, '');
  if (!raw) return false;

  // Canonical form already applied — nothing to do.
  if (raw === serializeState()) return true;

  // Bare anchor: #my-action-id → look up entry by actionId.
  if (!raw.includes('=')) {
    const ok = navigateToActionId(decodeURIComponent(raw));
    if (ok) updateUrl('replace');
    return ok;
  }

  const p = new URLSearchParams(raw);
  const file = p.get('file');
  const name = p.get('var');
  if (!file || !name) return false;
  const treeKey = file + '::' + name;
  if (!state.files[file] || !state.trees[treeKey]) return false;

  _suppressHash = true;
  try {
    state.selection = { file, name };
    state.viewMode = p.get('view') === 'source' ? 'source' : 'edit';
    state.usageFilter = null;
    state.selectedRows = new Set();
    state.locationFilter = null;
    state.focusRow = null;

    const row = p.get('row');
    if (row != null) {
      const rp = `${treeKey}[${row}]`;
      state.focusRow = rp;
      state.expandedRows.add(rp);
    }

    renderSidebar();
    renderMain();

    requestAnimationFrame(() => {
      if (state.focusRow) {
        const el = document.querySelector(`[data-row-path="${cssEsc(state.focusRow)}"]`);
        if (el) {
          el.scrollIntoView({ block: 'center', behavior: 'smooth' });
          el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
        }
      }
    });
  } finally {
    _suppressHash = false;
  }
  return true;
}

function navigateToActionId(actionId) {
  for (const fname of Object.keys(state.files)) {
    const f = state.files[fname];
    for (const v of f.vars) {
      const tree = state.trees[fname + '::' + v.name];
      if (!tree || tree.kind !== 'array') continue;
      for (let i = 0; i < tree.children.length; i++) {
        const c = tree.children[i];
        if (!c || c.kind !== 'object') continue;
        const idF = c.children.find(x => x.key === 'actionId');
        if (idF && String(idF.value.value) === String(actionId)) {
          _suppressHash = true;
          try {
            state.selection = { file: fname, name: v.name };
            state.viewMode = 'edit';
            state.usageFilter = null;
            state.selectedRows = new Set();
            state.locationFilter = null;
            state.focusRow = `${fname}::${v.name}[${i}]`;
            state.expandedRows.add(state.focusRow);
            renderSidebar();
            renderMain();
            requestAnimationFrame(() => {
              const el = document.querySelector(`[data-row-path="${cssEsc(state.focusRow)}"]`);
              if (el) {
                el.scrollIntoView({ block: 'center', behavior: 'smooth' });
                el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
              }
            });
          } finally {
            _suppressHash = false;
          }
          return true;
        }
      }
    }
  }
  toast('No entry with actionId "' + actionId + '"', 'err');
  return false;
}
window.addEventListener('dragover', e => e.preventDefault());
window.addEventListener('drop', async e => {
  e.preventDefault();
  if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
});
window.addEventListener('scroll', closeFilterPopover, true);

window.addEventListener('hashchange', () => { parseAndApplyHash(); });
window.addEventListener('popstate', () => { parseAndApplyHash(); });

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (!$('#mapModal').classList.contains('hidden')) $('#mapCancelBtn').click();
    else { closeFilterPopover(); closeAutocomplete(); }
  }
  // Alt+Left / Alt+Right also work as Back/Forward in most browsers.
});

renderCacheBanner();
const hadCache = loadFromCache();
if (!hadCache) rebuildAll();
// Deep-link on first load (after files exist).
if (location.hash) parseAndApplyHash();

// Copy-link button
$('#linkBtn')?.addEventListener('click', async () => {
  if (!state.selection) { toast('Select a variable first'); return; }
  updateUrl('replace');
  try {
    await navigator.clipboard.writeText(location.href);
    toast('Link copied to clipboard', 'ok');
  } catch {
    prompt('Copy this link:', location.href);
  }
});