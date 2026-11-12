// ============================================
// AU Strike Watch - Main Application
// Features: grouped actions (multiple entries), multiple locations,
// unified emoji markers with colored backgrounds, collapsible filter
// sections, union-based filtering, stale-entry detection.
// ============================================

(function () {
    'use strict';

    // ─── Configuration ───
    const MAP_CENTER = [-25.5, 134.0];
    const MAP_ZOOM = 4;
    const STALE_DAYS = 30;
    const MS_PER_DAY = 86400000;
    const TILE_LAYER_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}';
    const TILE_LAYER_ATTRIBUTION = 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community';

    // ─── Type definitions ───
    const TYPE_INFO = {
        strike: { emoji: '⚒', color: 'var(--type-strike-color)', label: 'Strike', showInFilter: true },
        stoppage: { emoji: '✖', color: 'var(--type-stoppage-color)', label: 'Intermittent Strike/Stoppage', showInFilter: true },
        action: { emoji: '⚒', color: 'var(--type-action-color)', label: 'Action', showInFilter: true },
        lockout: { emoji: '⛔︎', color: 'var(--type-lockout-color)', label: 'Lockout', showInFilter: true },
        protest: { emoji: '⚑', color: 'var(--type-protest-color)', label: 'Protest', showInFilter: true },
        planned: { emoji: '⛶', color: 'var(--type-planned-color)', label: 'Planned', showInFilter: true },
        update: { emoji: '⚠', color: 'var(--type-update-color)', label: 'Update', showInFilter: true },
        resolved: { emoji: '✔', color: 'var(--type-resolved-color)', label: 'Resolved', showInFilter: true },
        ballot: { emoji: '☐', color: 'var(--type-ballot-color)', label: 'Ballot', showInFilter: true },
        scab: { emoji: '⚠', color: 'var(--type-scab-color)', label: 'Scab Alert', showInFilter: true },
        ballotpass: { emoji: '☑', color: 'var(--type-ballotpass-color)', label: 'Ballot Success', showInFilter: true },
        ballotfail: { emoji: '☒', color: 'var(--type-ballotfail-color)', label: 'Ballot Failed', showInFilter: true },
        default: { emoji: '?', color: 'var(--type-default-color)', label: 'Other', showInFilter: false },
        unkown: { emoji: '?', color: 'var(--type-unkown-color)', label: 'Unknown', showInFilter: false },
    };
    function getTypeInfo(type) {
        return TYPE_INFO[type] || TYPE_INFO.default;
    }

    // ─── Tag helpers ───
    // Tag to highlight in the event list. Normalised so "supporters wanted",
    // "supporters-wanted" and "supporters_welcome" all count.
    const HIGHLIGHT_TAG = 'supporters-wanted';

    function normalizeTag(tag) {
        return String(tag).trim().toLowerCase().replace(/[\s_]+/g, '-');
    }

    function hasTag(entry, tag) {
        if (!entry || !Array.isArray(entry.tags)) return false;
        const target = normalizeTag(tag);
        return entry.tags.some(t => normalizeTag(t) === target);
    }

    function hasHighlightTag(entry) {
        return hasTag(entry, HIGHLIGHT_TAG);
    }

    function getEmojiHtml(type, size = 20) {
        const info = getTypeInfo(type);
        const fontSize = size;
        return `<span style="font-size: ${fontSize}px; line-height: 1; color: ${info.color}">${info.emoji}</span>`;
    }

    function getLabelText(type) {
        const info = getTypeInfo(type);
        return `${info.label}`;
    }

    function getLabelHTML(type, size = 20) {
        const info = getTypeInfo(type);
        const fontSize = size;
        return `<span style="font-size: ${fontSize}px; line-height: 1; color: ${info.color}">${info.label}</span>`;
    }

    // ─── State ───
    let allEntries = [];
    let groupedActions = [];
    let filteredActions = [];
    let activityIndex = new Map();
    let activeTypeFilter = 'all';
    let activeStateFilter = 'all';
    let activeDateFrom = '';
    let activeDateTo = '';
    let dateFilterEnabled = true;
    let includeStaleEntries = false;
    let includeOngoingEntries = true;
    let activeUpcomingFilter = false;
    let activeTagFilter = null;
    let activeUnionFilter = null;
    let activeIndustryFilter = null;
    let tagsExpanded = false;
    let unionsExpanded = false;
    let industriesExpanded = false;
    let searchQuery = '';
    let selectedActionId = null;
    let hoveredActionId = null;
    let map;
    let markerClusterGroup;
    let markersMap = new Map();
    let markerCache = new Map();

    // Sidebar auto-collapse on mobile
    const MOBILE_MQ = window.matchMedia('(max-width: 768px)');
    let sidebarAutoCollapsed = false;

    // ─── DOM Elements ───
    const mapContainer = document.getElementById('map');
    const eventListEl = document.getElementById('event-list');
    const searchInput = document.getElementById('search-input');
    const searchToggleBtn = document.getElementById('search-toggle');
    const searchDropdown = document.getElementById('search-dropdown');
    const filterToggleBtn = document.getElementById('filter-toggle');
    const filterDropdown  = document.getElementById('filter-dropdown');
    const typeFilterContainer = document.getElementById('type-filters');
    const stateFilterContainer = document.getElementById('state-filters');
    const dateFromInput = document.getElementById('date-from');
    const dateToInput = document.getElementById('date-to');
    const enableDateFilterInput = document.getElementById('enable-date-filter');
    const dateOptionsEl = document.querySelector('.date-options');
    const includeStaleInput = document.getElementById('include-stale');
    const includeOngoingInput = document.getElementById('include-ongoing');
    const tagFilterContainer = document.getElementById('tag-filters');
    const tagToggleBtn = document.getElementById('tag-toggle');
    const unionFilterContainer = document.getElementById('union-filters');
    const unionToggleBtn = document.getElementById('union-toggle');
    const industryFilterContainer = document.getElementById('industry-filters');
    const industryToggleBtn = document.getElementById('industry-toggle');
    const statActiveEl = document.getElementById('stat-active');
    const statPlannedEl = document.getElementById('stat-planned');
    const statWorkersEl = document.getElementById('stat-workers');
    const statTotalEl = document.getElementById('stat-total');
    // Ticker elements might not exist in the new HTML
    const tickerContentEl = document.getElementById('ticker-content');
    const addModal = document.getElementById('add-modal');
    const detailModal = document.getElementById('detail-modal');
    const detailModalContent = document.getElementById('detail-modal-content');
    const addForm = document.getElementById('add-form');
    const addCancelBtn = document.getElementById('add-cancel');
    const sidebarToggleBtn = document.getElementById('sidebar-toggle');
    const sidebarEl = document.getElementById('sidebar');
    const listIndicatorEl   = document.getElementById('list-indicator');
const listFilterSummary = document.getElementById('list-filter-summary');
const listCountEl       = document.getElementById('list-count');

    // New UI Elements
    const upcomingFilterChip = document.getElementById('upcoming-filter');
    const upcomingFilterBtn = document.getElementById('upcoming-filter-btn');

    // ─── Initialization ───
    function init() {
        const defaultDateFrom = new Date();
        defaultDateFrom.setDate(defaultDateFrom.getDate() - STALE_DAYS);
        activeDateFrom = toDateInputValue(defaultDateFrom);
        activeDateTo = '';
        if (dateFromInput) dateFromInput.value = activeDateFrom;
        if (dateToInput) dateToInput.value = activeDateTo;
        if (enableDateFilterInput) enableDateFilterInput.checked = dateFilterEnabled;
        if (dateFromInput) dateFromInput.disabled = !dateFilterEnabled;
        if (dateToInput) dateToInput.disabled = !dateFilterEnabled;
        if (includeStaleInput) includeStaleInput.disabled = !dateFilterEnabled;
        if (includeOngoingInput) {
            includeOngoingInput.disabled = !dateFilterEnabled;
            includeOngoingInput.checked = includeOngoingEntries;
        }
        if (dateOptionsEl) dateOptionsEl.classList.toggle('is-disabled', !dateFilterEnabled);

        if (window.STRIKE_DATA && Array.isArray(window.STRIKE_DATA)) {
            allEntries = window.STRIKE_DATA;
        } else {
            allEntries = [];
            console.warn('No STRIKE_DATA found.');
        }

        initNoticeBar(); // <-- Initialize Notice Bar
        buildGroupedActions();
        buildActivityIndex();
        initMap();
        buildTypeFilters();
        buildStateFilters();
        buildLegend();
        initCollapsibleSections();
        initSidebarState();
        syncSidebarToggle();  
        bindUIEvents();
        buildTagFilters();
        buildUnionFilters();
        buildIndustryFilters();
        applyFilters();
        selectActionFromHash();
    }

    // ─── Notice Bar Logic ───
    function initNoticeBar() {
        const bar = document.getElementById('notice-bar');
        const close = document.getElementById('notice-close');
        if (!bar || !close) return;

        // Check if previously dismissed
        if (localStorage.getItem('struggle-notice-dismissed') === '1') {
            bar.hidden = true;
        }

        close.addEventListener('click', () => {
            bar.hidden = true;
            localStorage.setItem('struggle-notice-dismissed', '1');
        });
    }

    // ─── Sidebar: collapsed by default on mobile ───
    function initSidebarState() {
        if (MOBILE_MQ.matches) {
            // Suppress the slide transition on first paint so it doesn't animate open→closed.
            sidebarEl.style.transition = 'none';
            sidebarEl.classList.add('collapsed');
            void sidebarEl.offsetWidth; // force style commit
            sidebarEl.style.transition = '';
            sidebarAutoCollapsed = true;
        }

        const onBreakpointChange = (e) => {
            if (e.matches) {
                // Entered mobile: collapse
                sidebarEl.classList.add('collapsed');
                sidebarAutoCollapsed = true;
            } else if (sidebarAutoCollapsed) {
                // Returned to desktop: restore
                sidebarEl.classList.remove('collapsed');
                sidebarAutoCollapsed = false;
            }
            syncSidebarToggle();
            setTimeout(() => map && map.invalidateSize(), 300);
        };

        if (typeof MOBILE_MQ.addEventListener === 'function') {
            MOBILE_MQ.addEventListener('change', onBreakpointChange);
        } else if (typeof MOBILE_MQ.addListener === 'function') {
            MOBILE_MQ.addListener(onBreakpointChange); // Safari < 14
        }

        syncSidebarToggle();
    }

function syncSidebarToggle() {
    if (!sidebarToggleBtn) return;
    const expanded = !sidebarEl.classList.contains('collapsed');

    // Sync the internal sidebar close button
    sidebarToggleBtn.setAttribute('aria-expanded', String(expanded));

    // Sync the external reopen tab
    const mapChromeToggle = document.getElementById('map-chrome-toggle');
    if (mapChromeToggle) {
        mapChromeToggle.setAttribute('aria-expanded', String(expanded));
    }

    // Toggle body class so CSS can show/hide the reopen tab
    document.body.classList.toggle('sidebar-collapsed', !expanded);
}
    // ─── Group entries by actionId ───
    function buildGroupedActions() {
        const actionMap = new Map();

        allEntries.forEach(entry => {
            const actionId = entry.actionId || String(entry.id);
            if (!actionMap.has(actionId)) {
                actionMap.set(actionId, []);
            }
            actionMap.get(actionId).push(entry);
        });

        groupedActions = [];
        actionMap.forEach((entries, actionId) => {
            entries.sort((a, b) => {
                const dateA = new Date(a.startDate);
                const dateB = new Date(b.startDate);
                if (dateA - dateB !== 0) return dateA - dateB;
                return (a.id || 0) - (b.id || 0);
            });

            const latestEntry = entries[entries.length - 1];

            let firstStartDate = entries[0].startDate;
            entries.forEach(e => {
                const d = new Date(e.startDate);
                if (d < new Date(firstStartDate)) {
                    firstStartDate = e.startDate;
                }
            });

            groupedActions.push({
                actionId,
                entries,
                latestEntry,
                firstStartDate
            });
        });

        groupedActions.sort((a, b) => new Date(b.latestEntry.startDate) - new Date(a.latestEntry.startDate));
    }

    // ─── Build stale activity index (actionId -> latest timestamp) ───
    function buildActivityIndex() {
        activityIndex = new Map();
        groupedActions.forEach(action => {
            const latest = Date.parse(action.latestEntry.startDate);
            if (!isNaN(latest)) activityIndex.set(action.actionId, latest);
        });
    }

    function getStaleInfo(action, now = Date.now()) {
        // Only flag actions that are still marked ongoing (no end date on the latest entry).
        const latest = action.latestEntry;
        if (latest.endDate) return null;

        const ts = activityIndex.get(action.actionId);
        if (ts === undefined) return null;
        const days = Math.floor((now - ts) / MS_PER_DAY);
        if (days < STALE_DAYS) return null;
        return { days, lastTs: ts, lastDate: new Date(ts) };
    }

    function getStaleBadgeHtml(action) {
        const info = getStaleInfo(action);
        if (!info) return '';
        return `<button type="button" class="stale-badge" aria-expanded="false"
            title="No update in ${info.days} days">
            <span aria-hidden="true">⏱</span>Stale — ${info.days}d
        </button>`;
    }

    function getStaleNoticeHtml(action) {
        const info = getStaleInfo(action);
        if (!info) return '';
        const iso = info.lastDate.toISOString().split('T')[0];
        return `<div class="stale-notice" hidden>
            No update recorded for this dispute in the last
            <strong>${info.days} days</strong>
            (last activity <time datetime="${iso}">${formatDate(iso)}</time>) and it is marked as still ongoing.
            If you have newer information, please <a href="mailto:schmilly@proton.me">email me</a>.
        </div>`;
    }

    // ─── Upcoming helpers ───
    function isUpcomingEntry(entry) {
        if (!entry || !entry.startDate) return false;
        const start = new Date(entry.startDate + 'T00:00:00');
        if (isNaN(start)) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return start > today;
    }

    function daysUntil(entry) {
        const start = new Date(entry.startDate + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return Math.round((start - today) / MS_PER_DAY);
    }

    function getUpcomingBadgeHtml(entry) {
        if (!isUpcomingEntry(entry)) return '';
        const days = daysUntil(entry);
        const label = days === 1 ? 'Tomorrow' : `in ${days} days`;
        return `<span class="meta-tag upcoming"
            title="Upcoming: starts ${formatDate(entry.startDate)}">📅 Upcoming · ${label}</span>`;
    }

    // ─── Union helpers ───
    function splitUnions(unionStr) {
        if (!unionStr) return [];
        return unionStr.split('/').map(s => s.trim()).filter(Boolean);
    }

    function collectUnions() {
        const set = new Set();
        allEntries.forEach(entry => {
            splitUnions(entry.union).forEach(u => set.add(u));
        });
        return [...set].sort((a, b) => a.localeCompare(b));
    }

    function collectIndustries() {
        const set = new Set();
        allEntries.forEach(entry => {
            if (entry.industry) set.add(entry.industry);
        });
        return [...set].sort((a, b) => a.localeCompare(b));
    }

    // ─── Generic expandable chip list ───
    function renderChipList({ container, toggleBtn, values, allLabel, activeValue, collapsedCount, expanded, onSelect }) {
        if (!container) return;
        container.innerHTML = '';

        const allChip = document.createElement('div');
        allChip.className = 'filter-chip' + (activeValue === null ? ' active' : '');
        allChip.dataset.value = '__all__';
        allChip.textContent = allLabel;
        allChip.addEventListener('click', () => onSelect(null));
        container.appendChild(allChip);

        values.forEach(value => {
            const chip = document.createElement('div');
            chip.className = 'filter-chip' + (activeValue === value ? ' active' : '');
            chip.dataset.value = value;
            chip.textContent = value;
            chip.addEventListener('click', () => onSelect(value));
            container.appendChild(chip);
        });

        const chips = [...container.querySelectorAll('.filter-chip')];
        chips.forEach((chip, index) => {
            chip.hidden = !expanded && index >= collapsedCount && chip.dataset.value !== activeValue;
        });

        if (toggleBtn) {
            const hiddenCount = chips.filter(c => c.hidden).length;
            toggleBtn.hidden = hiddenCount === 0;
            toggleBtn.textContent = expanded ? 'Show fewer' : `Show all (${hiddenCount})`;
            toggleBtn.setAttribute('aria-expanded', String(expanded));
        }
    }

    // ─── Build tag filter chips dynamically ───
    function buildTagFilters() {
        const tagSet = new Set();
        allEntries.forEach(entry => {
            if (entry.tags && Array.isArray(entry.tags)) {
                entry.tags.forEach(tag => tagSet.add(tag));
            }
        });

        renderChipList({
            container: tagFilterContainer,
            toggleBtn: tagToggleBtn,
            values: [...tagSet].sort((a, b) => a.localeCompare(b)),
            allLabel: 'All Tags',
            activeValue: activeTagFilter,
            collapsedCount: 7,
            expanded: tagsExpanded,
            onSelect: (value) => {
                activeTagFilter = value;
                buildTagFilters();
                applyFilters();
            }
        });
    }

    // ─── Build union filter chips dynamically ───
    function buildUnionFilters() {
        renderChipList({
            container: unionFilterContainer,
            toggleBtn: unionToggleBtn,
            values: collectUnions(),
            allLabel: 'All Unions',
            activeValue: activeUnionFilter,
            collapsedCount: 7,
            expanded: unionsExpanded,
            onSelect: (value) => {
                activeUnionFilter = value;
                buildUnionFilters();
                applyFilters();
            }
        });
    }

    function buildIndustryFilters() {
        renderChipList({
            container: industryFilterContainer,
            toggleBtn: industryToggleBtn,
            values: collectIndustries(),
            allLabel: 'All Industries',
            activeValue: activeIndustryFilter,
            collapsedCount: 7,
            expanded: industriesExpanded,
            onSelect: (value) => {
                activeIndustryFilter = value;
                buildIndustryFilters();
                applyFilters();
            }
        });
    }

    // ─── Build event-type filter chips dynamically ───
    function buildTypeFilters() {
        if (!typeFilterContainer) return;
        typeFilterContainer.innerHTML = '';

        const makeChip = (value, html, isActive) => {
            const chip = document.createElement('div');
            chip.className = 'filter-chip' + (isActive ? ' active' : '');
            chip.dataset.type = value;
            chip.innerHTML = html;
            chip.addEventListener('click', () => {
                activeTypeFilter = value;
                buildTypeFilters();
                applyFilters();
            });
            return chip;
        };

        typeFilterContainer.appendChild(makeChip('all', 'All', activeTypeFilter === 'all'));

        Object.entries(TYPE_INFO).forEach(([key, info]) => {
            if (info.showInFilter === false) return;
            const html = `<span aria-hidden="true" style="color:${info.color}">${info.emoji}</span> ${escapeHtml(info.label)}`;
            typeFilterContainer.appendChild(makeChip(key, html, activeTypeFilter === key));
        });
    }

    // ─── Collect states present in the data (normalised to upper-case) ───
    function collectStates() {
        const set = new Set();
        const add = (s) => { if (s) set.add(s.toUpperCase()); };
        allEntries.forEach(entry => {
            add(entry.state);
            if (Array.isArray(entry.locations)) entry.locations.forEach(loc => add(loc.state));
        });
        const preferred = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];
        const known = preferred.filter(s => set.has(s));
        const extra = [...set].filter(s => !preferred.includes(s)).sort();
        return [...known, ...extra];
    }

    // ─── Build state filter chips dynamically ───
    function buildStateFilters() {
        if (!stateFilterContainer) return;
        stateFilterContainer.innerHTML = '';

        const makeChip = (value, label, isActive) => {
            const chip = document.createElement('div');
            chip.className = 'filter-chip' + (isActive ? ' active' : '');
            chip.dataset.state = value;
            chip.textContent = label;
            chip.addEventListener('click', () => {
                activeStateFilter = value;
                buildStateFilters();
                applyFilters();
            });
            return chip;
        };

        stateFilterContainer.appendChild(makeChip('all', 'All', activeStateFilter === 'all'));
        collectStates().forEach(state => {
            stateFilterContainer.appendChild(makeChip(state, state, activeStateFilter === state));
        });
    }

    // ─── Build the map legend from TYPE_INFO, showing only types in use ───
    function buildLegend() {
        const container = document.getElementById('map-container');
        if (!container) return;

        let legend = container.querySelector('.map-legend');
        if (!legend) {
            legend = document.createElement('div');
            legend.className = 'map-legend';
            container.appendChild(legend);
        }

        const present = new Set();
        groupedActions.forEach(action => present.add(action.latestEntry.type));

        const rows = [];
        Object.entries(TYPE_INFO).forEach(([key, info]) => {
            if (info.showInFilter === false) return;
            if (!present.has(key)) return;
            rows.push(
                `<div class="legend-row">
                <span class="legend-emoji" aria-hidden="true" style="color:${info.color}">${info.emoji}</span>
                <span>${escapeHtml(info.label)}</span>
            </div>`
            );
        });

        legend.innerHTML =
            `<div class="legend-title">Legend</div>` +
            (rows.length ? rows.join('') : '<div class="legend-row">No entries</div>');
    }

    // ─── Collapsible filter sections ───
    function initCollapsibleSections() {
        document.querySelectorAll('.filter-section.collapsible').forEach(section => {
            const header = section.querySelector('.filter-header');
            if (!header) return;
            header.addEventListener('click', () => {
                const isCollapsed = section.classList.toggle('collapsed');
                header.setAttribute('aria-expanded', String(!isCollapsed));
            });
        });
    }

    // ─── Map Initialization ───
    function initMap() {
        map = L.map(mapContainer, {
            center: MAP_CENTER,
            zoom: MAP_ZOOM,
            attributionControl: true,
        });

        L.tileLayer(TILE_LAYER_URL, {
            attribution: TILE_LAYER_ATTRIBUTION,
            maxZoom: 20
        }).addTo(map);

        markerClusterGroup = L.markerClusterGroup({
            chunkedLoading: true,
            showCoverageOnHover: false,
            maxClusterRadius: 25,
            iconCreateFunction: function (cluster) {
                const count = cluster.getChildCount();
                return L.divIcon({
                    html: `<div style="background-color: var(--map-background); border: 1px solid var(--map-border); border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; color: var(--map-centre); font-weight: 700; font-size: 13px;">${count}</div>`,
                    className: 'custom-cluster-icon',
                    iconSize: L.point(36, 36)
                });
            }
        });

        map.addLayer(markerClusterGroup);

        // Ensure map resizes correctly on window resize
        window.addEventListener('resize', () => {
            if (map) map.invalidateSize();
        });
    }

    // ─── Rendering Markers ───
    function renderMarkers() {
        const visibleActionIds = new Set(filteredActions.map(action => action.actionId));
        const markersToRemove = [];

        markersMap.forEach((markers, actionId) => {
            if (!visibleActionIds.has(actionId)) {
                markersToRemove.push(...markers);
                markersMap.delete(actionId);
            }
        });
        if (markersToRemove.length > 0) {
            markerClusterGroup.removeLayers(markersToRemove);
        }

        filteredActions.forEach(action => {
            const cached = markerCache.get(action.actionId);
            if (cached && cached.entry !== action.latestEntry) {
                markerClusterGroup.removeLayers(cached.markers);
                markerCache.delete(action.actionId);
                markersMap.delete(action.actionId);
            }

            const markersForAction = getMarkersForAction(action);
            if (!markersMap.has(action.actionId)) {
                markerClusterGroup.addLayers(markersForAction);
            }
            markersMap.set(action.actionId, markersForAction);
        });

        if (filteredActions.length > 0 && filteredActions.length <= 30) {
            const allLatLngs = [];
            filteredActions.forEach(action => {
                const latest = action.latestEntry;
                const locs = latest.locations || [{ lat: latest.lat, lng: latest.lng }];
                locs.forEach(l => allLatLngs.push([l.lat, l.lng]));
            });
            const bounds = L.latLngBounds(allLatLngs);
            if (bounds.isValid()) {
                map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
            }
        } else if (filteredActions.length === 0) {
            map.setView(MAP_CENTER, MAP_ZOOM);
        }

        updateMarkerHighlights();
    }

    function getMarkersForAction(action) {
        const cached = markerCache.get(action.actionId);
        if (cached && cached.entry === action.latestEntry) {
            return cached.markers;
        }

        const latest = action.latestEntry;
        const locations = latest.locations && latest.locations.length > 0
            ? latest.locations
            : [{ city: latest.city, lat: latest.lat, lng: latest.lng, name: latest.city, state: latest.state }];
        const markers = locations.map(location => createMarker(latest, location, action.actionId, action));
        markerCache.set(action.actionId, { entry: latest, markers });
        return markers;
    }

    function createMarker(entry, location, actionId) {
        const icon = L.divIcon({
            className: 'custom-emoji-marker',
            html: getEmojiHtml(entry.type, 18),
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            popupAnchor: [0, -12]
        });

        const marker = L.marker([location.lat, location.lng], { icon });

        marker.on('mouseover', () => {
            hoveredActionId = actionId;
            updateMarkerHighlights();
        });
        marker.on('mouseout', () => {
            if (hoveredActionId === actionId) {
                hoveredActionId = null;
                updateMarkerHighlights();
            }
        });
        marker.on('add', updateMarkerHighlights);

        let popupHtml = `<div style="text-align:center;">
        <strong>${escapeHtml(entry.title)}</strong><br>
        <span style="font-size:12px;">${location.name || location.city} · ${formatDate(entry.startDate)}</span><br>
        <span style="font-size:11px; color:#aaa;">${entry.union} · ${entry.industry}</span><br>
        <button class="btn" style="margin-top:8px;" onclick="openDetailFromPopup('${actionId}')">Details</button>
        </div>`;

        marker.bindPopup(popupHtml, { maxWidth: 250 });
        return marker;
    }

    function updateMarkerHighlights() {
        markersMap.forEach((markers, actionId) => {
            const isHighlighted = actionId === selectedActionId || actionId === hoveredActionId;
            markers.forEach(marker => {
                const element = marker.getElement();
                if (element) {
                    element.classList.toggle('related-location-marker', isHighlighted);
                }
            });
        });
    }

    window.openDetailFromPopup = function (actionId) {
        selectAction(actionId);
    };

    function actionUrl(actionId) {
        return `#${encodeURIComponent(actionId)}`;
    }

    function selectAction(actionId, updateUrl = true) {
        const action = groupedActions.find(item => item.actionId === actionId);
        if (!action) return;

        selectedActionId = actionId;
        updateMarkerHighlights();
        if (updateUrl && window.location.hash !== actionUrl(actionId)) {
            window.location.hash = encodeURIComponent(actionId);
        }
        updateEventList();
        openDetailModal(actionId);

        const markers = markersMap.get(actionId);
        if (markers && markers.length > 0) {
            map.setView(markers[0].getLatLng(), 14);
        }
    }

    function selectActionFromHash() {
        if (!window.location.hash) return;

        let actionId;
        try {
            actionId = decodeURIComponent(window.location.hash.slice(1));
        } catch (error) {
            return;
        }
        selectAction(actionId, false);
    }

    // ─── Filtering ───
    function toDateInputValue(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function parseDateOnly(value) {
        if (!value) return NaN;
        const timestamp = Date.parse(`${value}T00:00:00`);
        return Number.isNaN(timestamp) ? NaN : timestamp;
    }

    // ─── Filter status header (window-title style) ───
function updateListHeader() {
    if (!listFilterSummary || !listCountEl) return;

    // Collect every currently-active filter as a {label, kind} pair
    const chips = [];

    if (searchQuery.trim()) {
        chips.push({ label: `“${searchQuery.trim()}”`, kind: 'search' });
    }
    if (activeTypeFilter !== 'all') {
        chips.push({ label: getTypeInfo(activeTypeFilter).label, kind: 'type' });
    }
    if (activeStateFilter !== 'all') {
        chips.push({ label: activeStateFilter, kind: 'state' });
    }
    if (activeIndustryFilter) {
        chips.push({ label: activeIndustryFilter, kind: 'industry' });
    }
    if (activeUnionFilter) {
        chips.push({ label: activeUnionFilter, kind: 'union' });
    }
    if (activeTagFilter) {
        chips.push({ label: `#${activeTagFilter}`, kind: 'tag' });
    }
    if (activeUpcomingFilter) {
        chips.push({ label: 'Upcoming', kind: 'upcoming' });
    }

    // Date filter is on by default (last 30 days). Always show it —
// it genuinely narrows the list, so it deserves a chip either way.
if (dateFilterEnabled) {
    // Match init()'s DST-safe calendar arithmetic instead of the
    // millisecond subtraction that drifts across clock changes.
    const defaultFromDate = new Date();
    defaultFromDate.setDate(defaultFromDate.getDate() - STALE_DAYS);
    const defaultFrom = toDateInputValue(defaultFromDate);

    const isDefaultWindow =
        activeDateFrom === defaultFrom &&
        activeDateTo === '' &&
        !includeStaleEntries &&
        includeOngoingEntries;

    if (isDefaultWindow) {
        // Friendly label for the untouched default
        chips.push({ label: `Last ${STALE_DAYS} days`, kind: 'date' });
    } else {
        // Custom window — show the exact values + sub-toggles
        const parts = [];
        if (activeDateFrom) parts.push(activeDateFrom);
        if (activeDateTo) parts.push(activeDateTo);
        if (includeStaleEntries) parts.push('+stale');
        if (!includeOngoingEntries) parts.push('−ongoing');
        chips.push({ label: parts.join(' → '), kind: 'date' });
    }
}
    // Render either the empty state or the chips (with +N overflow)
    if (chips.length === 0) {
        listFilterSummary.innerHTML = `<span class="list-filter-none">All entries</span>`;
        if (listIndicatorEl) listIndicatorEl.classList.remove('active');
    } else {
        const MAX_VISIBLE = 3;
        let visibleChips = chips;
        let overflowCount = 0;

        if (chips.length > MAX_VISIBLE) {
            visibleChips = chips.slice(0, MAX_VISIBLE - 1);
            overflowCount = chips.length - (MAX_VISIBLE - 1);
        }

        let html = visibleChips
            .map(c =>
                `<span class="list-filter-chip" data-kind="${c.kind}" ` +
                `title="${escapeHtml(c.label)}">${escapeHtml(c.label)}</span>`
            )
            .join('');

        if (overflowCount > 0) {
            const fullList = chips
                .slice(MAX_VISIBLE - 1)
                .map(c => c.label)
                .join(' · ');
            html += `<span class="list-filter-chip" data-kind="overflow" ` +
                    `title="${escapeHtml(fullList)}">+${overflowCount}</span>`;
        }

        listFilterSummary.innerHTML = html;
        if (listIndicatorEl) listIndicatorEl.classList.add('active');
    }

    // Update the count badge
    listCountEl.textContent = filteredActions.length;
}

    function applyFilters() {
        let result = [...groupedActions];

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(action => {
                const e = action.latestEntry;
                return (
                    e.title.toLowerCase().includes(q) ||
                    (e.union && e.union.toLowerCase().includes(q)) ||
                    (e.industry && e.industry.toLowerCase().includes(q)) ||
                    (e.description && e.description.toLowerCase().includes(q)) ||
                    (e.locations && e.locations.some(loc =>
                        loc.city.toLowerCase().includes(q) ||
                        (loc.name && loc.name.toLowerCase().includes(q))
                    ))
                );
            });
        }

        if (activeTypeFilter !== 'all') {
            result = result.filter(action => action.latestEntry.type === activeTypeFilter);
        }

        if (activeStateFilter !== 'all') {
            const target = activeStateFilter.toUpperCase();
            result = result.filter(action => {
                const e = action.latestEntry;
                if ((e.state || '').toUpperCase() === target) return true;
                if (e.locations && e.locations.some(loc => (loc.state || '').toUpperCase() === target)) return true;
                return false;
            });
        }

        const rangeStart = parseDateOnly(activeDateFrom);
        const rangeEnd = parseDateOnly(activeDateTo);
        if (dateFilterEnabled) result = result.filter(action => {
            const e = action.latestEntry;
            const start = parseDateOnly(e.startDate);
            const end = parseDateOnly(e.endDate);
            const hasEndDate = Number.isFinite(end);
            const lastActivity = hasEndDate ? end : start;
            const outsideSelectedRange =
                (Number.isFinite(rangeStart) && lastActivity < rangeStart) ||
                (Number.isFinite(rangeEnd) && start > rangeEnd);

            if (!includeOngoingEntries && !hasEndDate) return false;
            if (outsideSelectedRange && (!includeStaleEntries || !getStaleInfo(action))) return false;
            return true;
        });

        if (activeUpcomingFilter) {
            const now = new Date();
            result = result.filter(action => {
                const e = action.latestEntry;
                const start = new Date(e.startDate);
                return start > now;
            });
        }

        if (activeUnionFilter) {
            result = result.filter(action =>
                action.entries.some(entry => splitUnions(entry.union).includes(activeUnionFilter))
            );
        }

        if (activeIndustryFilter) {
            result = result.filter(action =>
                action.entries.some(entry => entry.industry === activeIndustryFilter)
            );
        }

        if (activeTagFilter) {
            result = result.filter(action =>
                action.entries.some(entry => Array.isArray(entry.tags) && entry.tags.includes(activeTagFilter))
            );
        }

        filteredActions = result;
        updateListHeader();
        updateFilterSummaries();
        updateStats();
        updateEventList();
        renderMarkers();
    }

    // ─── Filter summary labels (shown in collapsed headers) ───
    function activeChipLabel(containerId) {
        const chip = document.querySelector(`#${containerId} .filter-chip.active`);
        return chip ? chip.textContent.trim() : '';
    }

    function updateFilterSummaries() {
        const setSummary = (key, text) => {
            const el = document.querySelector(`.filter-section[data-filter-section="${key}"] .filter-summary`);
            if (el) el.textContent = text || '';
        };

        setSummary('type', activeTypeFilter === 'all' ? '' : activeChipLabel('type-filters'));
        setSummary('state', activeStateFilter === 'all' ? '' : activeStateFilter);
        setSummary('industry', activeIndustryFilter || '');
        setSummary('union', activeUnionFilter || '');
        const dateSummary = !dateFilterEnabled
            ? 'Off'
            : [activeDateFrom, activeDateTo].filter(Boolean).join(' - ');
        const dateOptions = [
            dateFilterEnabled && includeStaleEntries ? 'stale' : '',
            dateFilterEnabled && includeOngoingEntries ? 'ongoing' : ''
        ].filter(Boolean);
        setSummary('date', [dateSummary, ...dateOptions].filter(Boolean).join(' · '));
        setSummary('upcoming', activeUpcomingFilter ? 'On' : '');
        setSummary('tags', activeTagFilter || '');
    }

    function updateStats() {
        const activeCount = filteredActions.filter(a => a.latestEntry.type !== 'resolved' && a.latestEntry.type !== 'planned').length;
        const plannedCount = filteredActions.filter(a => a.latestEntry.type === 'planned').length;
        const totalWorkers = filteredActions.reduce((sum, a) => sum + (a.latestEntry.workers || 0), 0);
        const totalCount = filteredActions.length;

        if (statActiveEl) statActiveEl.textContent = activeCount;
        if (statPlannedEl) statPlannedEl.textContent = plannedCount;
        if (statWorkersEl) statWorkersEl.textContent = totalWorkers.toLocaleString();
        if (statTotalEl) statTotalEl.textContent = totalCount;
    }

    function updateEventList() {
        if (!eventListEl) return;
        const fragment = document.createDocumentFragment();

        if (filteredActions.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'event-list-empty';
            emptyState.textContent = 'No events match your filters.';
            fragment.appendChild(emptyState);
            eventListEl.replaceChildren(fragment);
            return;
        }

        filteredActions.forEach(action => {
            const latest = action.latestEntry;
            const item = document.createElement('div');
            const isSupporters = hasHighlightTag(latest);
            item.className = 'event-item'
                + (selectedActionId === action.actionId ? ' selected' : '')
                + (isSupporters ? ' supporters-wanted' : '');
            item.dataset.actionId = action.actionId;

            const updateCount = action.entries.length > 1 ? ` <span class="meta-tag updates">${action.entries.length} updates</span>` : '';
            const staleBadge = getStaleBadgeHtml(action);
            const staleNotice = getStaleNoticeHtml(action);
            const upcomingBadge = getUpcomingBadgeHtml(latest);

            item.innerHTML = `
            <div class="event-heading">
            <div class="event-type-icon">${getEmojiHtml(latest.type, 18)}</div>
            <button type="button" class="event-title">${escapeHtml(latest.title)}</button>
            <div class="event-date">
                ${formatDate(latest.startDate)}
                <a class="event-link" href="${actionUrl(action.actionId)}" aria-label="Open link for ${escapeHtml(latest.title)}" title="Copy or share this dispute link">#</a>
            </div>
            </div>
            <div class="event-meta">
            <span class="meta-tag">${getLabelHTML(latest.type, 10)}</span>
            ${upcomingBadge}
            <span class="meta-tag">${latest.union || 'N/A'}</span>
            <span class="meta-tag">${latest.industry || 'N/A'}</span>
            ${updateCount}
${latest.tags ? latest.tags.map(t => {
                const cls = normalizeTag(t) === HIGHLIGHT_TAG ? 'meta-tag hash tag-supporters' : 'meta-tag hash';
                return `<span class="${cls}">${t}</span>`;
            }).join('') : ''}
            ${staleBadge}
            </div>
            ${staleNotice}
            `;

            fragment.appendChild(item);
        });

        eventListEl.replaceChildren(fragment);
    }

    // ─── Detail Modal ───
    function openDetailModal(actionId) {
        const action = groupedActions.find(a => a.actionId === actionId);
        if (!action) return;

        const latest = action.latestEntry;
        const firstStart = action.firstStartDate || latest.startDate;
        const typeInfo = getTypeInfo(latest.type);

        let locationsHtml = '';
        if (latest.locations && latest.locations.length > 0) {
            locationsHtml = latest.locations.map((loc, index) =>
                `<div class="location-entry${index >= 4 ? ' location-entry-hidden' : ''}"${index >= 4 ? ' hidden' : ''}>📍 ${escapeHtml(loc.name || loc.city)}, ${escapeHtml(loc.state || '')}</div>`
            ).join('');
            if (latest.locations.length > 4) {
                locationsHtml += `<button type="button" class="locations-toggle" aria-expanded="false">See more (${latest.locations.length - 4})</button>`;
            }
        } else {
            locationsHtml = `<div>📍 ${escapeHtml(latest.city || '')}, ${escapeHtml(latest.state || '')}</div>`;
        }

        let sourcesHtml = '';
        if (latest.sources && latest.sources.length > 0) {
            sourcesHtml = latest.sources.map(src =>
                `<a href="${src.url}" target="_blank" rel="noopener noreferrer" class="source-link">${src.name || src.url}</a>`
            ).join('<br>');
        }

        let historyHtml = '';
        if (action.entries.length > 1) {
            historyHtml = `
            <div class="detail-section">
            <div class="detail-label">Update History</div>
            <div style="border-left: 2px solid var(--bg-alt); padding-left: 12px; margin-top: 6px;">
            ${action.entries.map(entry => `
                <div style="margin-bottom: 12px;">
                <div style="font-weight: 700; color:var(--text-heading); font-size: 13px;">${escapeHtml(entry.title)}</div>
                <div style="font-size: 11px; color:var(--text-heading);">Union: ${escapeHtml(entry.union || 'Unknown')} · ${formatDate(entry.startDate)}</div>
                <div style="font-size: 12px; color:var(--text-quaternary); margin-top: 4px;">${entry.description}</div>
                ${entry.sources && entry.sources.length > 0 ? `
                    <div style="font-size: 11px; margin-top: 4px; color: var(--accent-alt);">
                    ${entry.sources.map(src => `<a href="${src.url}" target="_blank" rel="noopener noreferrer" class="source-link" style="font-size:11px;">${src.name || src.url}</a>`).join(' · ')}
                    </div>` : ''}
                    </div>
                    `).join('')}
                    </div>
                    </div>`;
        }

        // Stale block for the detail modal
        const staleInfo = getStaleInfo(action);
        let staleHtml = '';
        if (staleInfo) {
            const iso = staleInfo.lastDate.toISOString().split('T')[0];
            staleHtml = `
            <div class="stale-notice" style="display:block;">
                ⏱ <strong>Stale entry</strong> — no update recorded in the last
                <strong>${staleInfo.days} days</strong>
                (last activity <time datetime="${iso}">${formatDate(iso)}</time>) and it is marked as still ongoing.
            If you have newer information, please <a href="mailto:schmilly@proton.me">email me</a>.
            </div>`;
        }

        detailModalContent.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <div>${getEmojiHtml(latest.type, 24)}</div>
        <span style="font-size: 13px; font-weight: 700; color: ${typeInfo.color};">${getLabelText(latest.type)}</span>
        <span style="margin-left: auto; font-size: 12px; color: var(--text-really-muted);">${formatDate(latest.startDate)}</span><button class="btn" id="detail-close">X</button>
        </div>
        <h3 style="margin-bottom: 8px;">${escapeHtml(latest.title)}</h3>
        ${staleHtml}
        <div style="display:flex;width:100%;">
            <div style="flex:1;" class="detail-section"><div class="detail-label">Union</div><div class="detail-value">${escapeHtml(latest.union || 'Not specified')}</div></div>
            <div style="flex:1;" class="detail-section"><div class="detail-label">Industry</div><div class="detail-value">${escapeHtml(latest.industry || 'Not specified')}</div></div>
            <div style="flex:1;" class="detail-section"><div class="detail-label">Workers Involved</div><div class="detail-value">${latest.workers ? latest.workers.toLocaleString() : 'Unknown'}</div></div>
        </div>
        <div class="detail-section"><div class="detail-label">Locations</div><div class="detail-value">${locationsHtml}</div></div>
        
        <div class="detail-section"><div class="detail-label">Duration</div><div class="detail-value">${formatDate(firstStart)} — ${latest.endDate ? formatDate(latest.endDate) : 'Ongoing'}</div></div>
        <div class="detail-section"><div class="detail-label">Description</div><div class="detail-value" style="font-size: 13px; color: var(--text-tertiary);">${latest.description}</div></div>
        <div class="detail-section"><div class="detail-label">Tags</div><div class="detail-value alt">${latest.tags ? latest.tags.map(t => `<a class="tag">${t}</a>`).join(' ') : 'None'}</div></div>
        <div class="detail-section" style="display:flex;width:100%"><div style="flex:2;"><div class="detail-label">Sources</div><div class="detail-value">${sourcesHtml || 'No sources provided'}</div></div>
        <div style="flex:1;margin-top: 16px; display: flex; gap: 8px; justify-content: flex-end;"> <span style="margin-left: auto; font-size: 12px; color: var(--text-really-muted);">Added: ${latest.adddate || 'Date added missing'}</span>
        </div>
        </div>
        ${historyHtml}
        `;

        detailModal.classList.add('visible');
        document.getElementById('detail-close').addEventListener('click', () => {
            detailModal.classList.remove('visible');
        });
        const locationsToggle = detailModalContent.querySelector('.locations-toggle');
        if (locationsToggle) {
            locationsToggle.addEventListener('click', () => {
                const isExpanded = locationsToggle.getAttribute('aria-expanded') === 'true';
                detailModalContent.querySelectorAll('.location-entry-hidden').forEach(location => {
                    location.hidden = isExpanded;
                });
                locationsToggle.setAttribute('aria-expanded', String(!isExpanded));
                locationsToggle.textContent = isExpanded
                    ? `See more (${latest.locations.length - 4})`
                    : 'See less';
            });
        }
        detailModal.onclick = (e) => {
            if (e.target === detailModal) detailModal.classList.remove('visible');
        };
    }

    // ─── Add Report Modal ───
    function openAddModal() {
        if (!addModal) return;
        addModal.classList.add('visible');
        const fStart = document.getElementById('f-start');
        if (fStart) fStart.value = new Date().toISOString().split('T')[0];
    }

    function closeAddModal() {
        if (!addModal) return;
        addModal.classList.remove('visible');
        if (addForm) addForm.reset();
        const locsContainer = document.getElementById('locations-container');
        if (locsContainer) {
            locsContainer.innerHTML = `
            <div class="location-row" style="display: flex; gap: 8px; margin-bottom: 6px;">
            <input type="text" class="location-name" placeholder="Location name" style="flex: 1;">
            <input type="text" class="location-city" placeholder="City" style="flex: 1;" required>
            <input type="text" class="location-state" placeholder="State (e.g. VIC)" style="flex: 0 0 80px;" required>
            <input type="number" step="any" class="location-lat" placeholder="Lat" style="flex: 0 0 80px;">
            <input type="number" step="any" class="location-lng" placeholder="Lng" style="flex: 0 0 80px;">
            <button type="button" class="btn remove-location" style="padding: 4px 8px;">✕</button>
            </div>
            `;
        }
        const sourcesContainer = document.getElementById('sources-container');
        if (sourcesContainer) {
            sourcesContainer.innerHTML = `
            <div class="source-row" style="display: flex; gap: 8px; margin-bottom: 6px;">
            <input type="text" class="source-name" placeholder="Source name" style="flex: 1;">
            <input type="url" class="source-url" placeholder="https://…" style="flex: 2;">
            <button type="button" class="btn remove-source" style="padding: 4px 8px;">✕</button>
            </div>
            `;
        }
    }

    function handleAddSubmit(e) {
        e.preventDefault();

        const title = document.getElementById('f-title').value.trim();
        const union = document.getElementById('f-union').value.trim();
        const industry = document.getElementById('f-industry').value;
        const type = document.getElementById('f-type').value;
        const startDate = document.getElementById('f-start').value;
        const endDate = document.getElementById('f-end').value || '';
        const workers = parseInt(document.getElementById('f-workers').value, 10) || 0;
        const description = document.getElementById('f-desc').value.trim();
        const actionIdInput = document.getElementById('f-action-id').value.trim();

        const locations = [];
        document.querySelectorAll('#locations-container .location-row').forEach(row => {
            const name = row.querySelector('.location-name').value.trim();
            const city = row.querySelector('.location-city').value.trim();
            const state = row.querySelector('.location-state').value.trim().toUpperCase();
            const lat = parseFloat(row.querySelector('.location-lat').value);
            const lng = parseFloat(row.querySelector('.location-lng').value);
            if (city && state && !isNaN(lat) && !isNaN(lng)) {
                locations.push({ name: name || city, city, state, lat, lng });
            }
        });

        if (locations.length === 0) {
            alert('Please add at least one valid location with city, state, latitude, and longitude.');
            return;
        }

        const sources = [];
        document.querySelectorAll('#sources-container .source-row').forEach(row => {
            const name = row.querySelector('.source-name').value.trim();
            const url = row.querySelector('.source-url').value.trim();
            if (url) sources.push({ name: name || url, url });
        });

        const tags = [];
        if (industry) tags.push(industry.toLowerCase().replace(/\s+/g, '-'));
        if (union) tags.push(union.toLowerCase().replace(/\s+/g, '-'));

        const newEntry = {
            id: Date.now(),
            actionId: actionIdInput || `action-${Date.now()}`,
            title,
            union,
            industry,
            type,
            startDate,
            endDate,
            workers,
            description,
            tags,
            locations,
            sources
        };

        allEntries.push(newEntry);
        buildGroupedActions();
        buildActivityIndex();
        buildTagFilters();
        buildStateFilters();
        buildLegend();
        buildUnionFilters();
        buildIndustryFilters();
        closeAddModal();
        applyFilters();
    }

    // ─── Search / Filter dropdown controllers ───
function openSearch() {
    if (!searchDropdown || !searchToggleBtn) return;
    searchDropdown.classList.add('open');
    searchToggleBtn.setAttribute('aria-expanded', 'true');
    // Mutual exclusivity: close filter panel if it's open
    if (filterDropdown && filterDropdown.classList.contains('open')) {
        filterDropdown.classList.remove('open');
        if (filterToggleBtn) filterToggleBtn.setAttribute('aria-expanded', 'false');
    }
    // Focus after the animation kicks off so the input doesn't jump mid-transition
    setTimeout(() => searchInput && searchInput.focus(), 150);
}

function closeSearch() {
    if (!searchDropdown || !searchToggleBtn) return;
    searchDropdown.classList.remove('open');
    searchToggleBtn.setAttribute('aria-expanded', 'false');
}

function toggleSearch() {
    if (!searchDropdown) return;
    if (searchDropdown.classList.contains('open')) closeSearch();
    else openSearch();
}

function openFilters() {
    if (!filterDropdown || !filterToggleBtn) return;
    filterDropdown.classList.add('open');
    filterToggleBtn.setAttribute('aria-expanded', 'true');
    // Mutual exclusivity: close search panel if it's open
    if (searchDropdown && searchDropdown.classList.contains('open')) {
        searchDropdown.classList.remove('open');
        if (searchToggleBtn) searchToggleBtn.setAttribute('aria-expanded', 'false');
    }
}

function closeFilters() {
    if (!filterDropdown || !filterToggleBtn) return;
    filterDropdown.classList.remove('open');
    filterToggleBtn.setAttribute('aria-expanded', 'false');
}

function toggleFilters() {
    if (!filterDropdown) return;
    if (filterDropdown.classList.contains('open')) closeFilters();
    else openFilters();
}

    // ─── UI Event Binding ───
    function bindUIEvents() {
        window.addEventListener('hashchange', selectActionFromHash);

        eventListEl.addEventListener('click', (event) => {
            const item = event.target.closest('.event-item');
            if (!item || !eventListEl.contains(item)) return;

            const staleBtn = event.target.closest('.stale-badge');
            if (staleBtn) {
                const notice = item.querySelector('.stale-notice');
                const isOpen = staleBtn.getAttribute('aria-expanded') === 'true';
                staleBtn.setAttribute('aria-expanded', String(!isOpen));
                if (notice) notice.hidden = isOpen;
                return;
            }

            if (event.target.closest('.event-link')) return;
            selectAction(item.dataset.actionId);
        });

        if (tagToggleBtn) {
            tagToggleBtn.addEventListener('click', () => {
                tagsExpanded = !tagsExpanded;
                buildTagFilters();
            });
        }

        if (unionToggleBtn) {
            unionToggleBtn.addEventListener('click', () => {
                unionsExpanded = !unionsExpanded;
                buildUnionFilters();
            });
        }

        if (industryToggleBtn) {
            industryToggleBtn.addEventListener('click', () => {
                industriesExpanded = !industriesExpanded;
                buildIndustryFilters();
            });
        }

        if (sidebarToggleBtn) {
            sidebarToggleBtn.addEventListener('click', () => {
                sidebarEl.classList.toggle('collapsed');
                sidebarAutoCollapsed = false; // user made an explicit choice
                syncSidebarToggle();
                setTimeout(() => map && map.invalidateSize(), 300);
            });
        }

        const mapChromeToggleBtn = document.getElementById('map-chrome-toggle');
if (mapChromeToggleBtn) {
    mapChromeToggleBtn.addEventListener('click', () => {
        sidebarEl.classList.remove('collapsed');
        sidebarAutoCollapsed = false; // user made an explicit choice
        syncSidebarToggle();
        setTimeout(() => map && map.invalidateSize(), 300);
    });
}

        let searchTimeout;
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    searchQuery = searchInput.value;
                    if (searchToggleBtn) {
                        searchToggleBtn.classList.toggle('has-query', searchQuery.trim().length > 0);
                    }
                    applyFilters();
                }, 250);
            });
        }

        if (dateFromInput) {
            dateFromInput.addEventListener('change', () => {
                activeDateFrom = dateFromInput.value;
                applyFilters();
            });
        }

        if (dateToInput) {
            dateToInput.addEventListener('change', () => {
                activeDateTo = dateToInput.value;
                applyFilters();
            });
        }

        if (enableDateFilterInput) {
            enableDateFilterInput.addEventListener('change', () => {
                dateFilterEnabled = enableDateFilterInput.checked;
                if (dateFromInput) dateFromInput.disabled = !dateFilterEnabled;
                if (dateToInput) dateToInput.disabled = !dateFilterEnabled;
                if (includeStaleInput) includeStaleInput.disabled = !dateFilterEnabled;
                if (includeOngoingInput) includeOngoingInput.disabled = !dateFilterEnabled;
                if (dateOptionsEl) dateOptionsEl.classList.toggle('is-disabled', !dateFilterEnabled);
                applyFilters();
            });
        }

        if (includeStaleInput) {
            includeStaleInput.addEventListener('change', () => {
                includeStaleEntries = includeStaleInput.checked;
                applyFilters();
            });
        }

        if (includeOngoingInput) {
            includeOngoingInput.addEventListener('change', () => {
                includeOngoingEntries = includeOngoingInput.checked;
                applyFilters();
            });
        }

        // --- UPCOMING FILTERS (Fixed Duplicate ID logic) ---
        function toggleUpcoming() {
            activeUpcomingFilter = !activeUpcomingFilter;
            if (upcomingFilterChip) upcomingFilterChip.classList.toggle('active', activeUpcomingFilter);
            if (upcomingFilterBtn) upcomingFilterBtn.setAttribute('aria-pressed', String(activeUpcomingFilter));
            applyFilters();
        }

        if (upcomingFilterChip) upcomingFilterChip.addEventListener('click', toggleUpcoming);
        if (upcomingFilterBtn) upcomingFilterBtn.addEventListener('click', toggleUpcoming);

        document.getElementById('add-report-btn')?.addEventListener('click', openAddModal);
        if (addCancelBtn) addCancelBtn.addEventListener('click', closeAddModal);
        if (addModal) {
            addModal.addEventListener('click', (e) => {
                if (e.target === addModal) closeAddModal();
            });
        }
        if (addForm) {
            addForm.addEventListener('submit', handleAddSubmit);
        }

if (searchToggleBtn) searchToggleBtn.addEventListener('click', toggleSearch);
if (filterToggleBtn) filterToggleBtn.addEventListener('click', toggleFilters);

        document.getElementById('add-location-btn')?.addEventListener('click', () => {
            const container = document.getElementById('locations-container');
            if (!container) return;
            const newRow = document.createElement('div');
            newRow.className = 'location-row';
            newRow.style.display = 'flex';
            newRow.style.gap = '8px';
            newRow.style.marginBottom = '6px';
            newRow.innerHTML = `
            <input type="text" class="location-name" placeholder="Location name" style="flex: 1;">
            <input type="text" class="location-city" placeholder="City" style="flex: 1;">
            <input type="text" class="location-state" placeholder="State (e.g. VIC)" style="flex: 0 0 80px;">
            <input type="number" step="any" class="location-lat" placeholder="Lat" style="flex: 0 0 80px;">
            <input type="number" step="any" class="location-lng" placeholder="Lng" style="flex: 0 0 80px;">
            <button type="button" class="btn remove-location" style="padding: 4px 8px;">✕</button>
            `;
            container.appendChild(newRow);
        });

        document.getElementById('add-source-btn')?.addEventListener('click', () => {
            const container = document.getElementById('sources-container');
            if (!container) return;
            const newRow = document.createElement('div');
            newRow.className = 'source-row';
            newRow.style.display = 'flex';
            newRow.style.gap = '8px';
            newRow.style.marginBottom = '6px';
            newRow.innerHTML = `
            <input type="text" class="source-name" placeholder="Source name" style="flex: 1;">
            <input type="url" class="source-url" placeholder="https://…" style="flex: 2;">
            <button type="button" class="btn remove-source" style="padding: 4px 8px;">✕</button>
            `;
            container.appendChild(newRow);
        });

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-location')) {
                const rows = document.querySelectorAll('#locations-container .location-row');
                if (rows.length > 1) e.target.closest('.location-row').remove();
            }
            if (e.target.classList.contains('remove-source')) {
                e.target.closest('.source-row').remove();
            }
        });

document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;

    // Priority order: dropdowns → modals
    if (searchDropdown && searchDropdown.classList.contains('open')) {
        closeSearch();
        if (searchToggleBtn) searchToggleBtn.focus();
        return;
    }
    if (filterDropdown && filterDropdown.classList.contains('open')) {
        closeFilters();
        if (filterToggleBtn) filterToggleBtn.focus();
        return;
    }
    if (addModal && addModal.classList.contains('visible')) {
        closeAddModal();
        return;
    }
    if (detailModal && detailModal.classList.contains('visible')) {
        detailModal.classList.remove('visible');
    }
});
    }

    // ─── Utility Functions ───
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        if (isNaN(date)) return dateStr;
        return date.toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' });
    }

    // ─── Bootstrap ───
    document.addEventListener('DOMContentLoaded', init);
})();