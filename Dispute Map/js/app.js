// ============================================
// AU Strike Watch - Main Application
// Features: grouped actions (multiple entries), multiple locations,
// unified emoji markers with colored backgrounds, collapsible filter
// sections, union-based filtering, stale-entry detection.
// ============================================

(function() {
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
        strike:     { emoji: '✊', color: '#e74c3c' },
        lockout:    { emoji: '🔒', color: '#e67e22' },
        protest:    { emoji: '🪧', color: '#f1c40f' },
        planned:    { emoji: '📋', color: '#3498db' },
        resolved:   { emoji: '✔', color: '#2ecc71' },
        ballot:     { emoji: '🗳️', color: '#acbfa4' },
        scab:       { emoji: '🐀', color: 'brown' },
        default:    { emoji: '?', color: '#95a5a6' }
    };

    function getTypeInfo(type) {
        return TYPE_INFO[type] || TYPE_INFO.default;
    }

    function getEmojiHtml(type, size = 20) {
        const info = getTypeInfo(type);
        const fontSize = size;
        return `<span style="font-size: ${fontSize}px; line-height: 1; color: ${info.color}">${info.emoji}</span>`;
    }

    // ─── State ───
    let allEntries = [];
    let groupedActions = [];
    let filteredActions = [];
    let activityIndex = new Map();
    let activeTypeFilter = 'all';
    let activeStateFilter = 'all';
    let activeDateRange = 'all';
    let activeUpcomingFilter = false;
    let activeTagFilter = null;
    let activeUnionFilter = null;
    let tagsExpanded = false;
    let unionsExpanded = false;
    let searchQuery = '';
    let selectedActionId = null;
    let map;
    let markerClusterGroup;
    let markersMap = new Map();

    // Sidebar auto-collapse on mobile
    const MOBILE_MQ = window.matchMedia('(max-width: 768px)');
    let sidebarAutoCollapsed = false;

    // ─── DOM Elements ───
    const mapContainer = document.getElementById('map');
    const eventListEl = document.getElementById('event-list');
    const searchInput = document.getElementById('search-input');
    const typeFilterChips = document.querySelectorAll('#type-filters .filter-chip');
    const stateFilterChips = document.querySelectorAll('#state-filters .filter-chip');
    const dateFilterChips = document.querySelectorAll('#date-filters .filter-chip');
    const upcomingFilterChip = document.getElementById('upcoming-filter');
    const tagFilterContainer = document.getElementById('tag-filters');
    const tagToggleBtn = document.getElementById('tag-toggle');
    const unionFilterContainer = document.getElementById('union-filters');
    const unionToggleBtn = document.getElementById('union-toggle');
    const statActiveEl = document.getElementById('stat-active');
    const statPlannedEl = document.getElementById('stat-planned');
    const statWorkersEl = document.getElementById('stat-workers');
    const statTotalEl = document.getElementById('stat-total');
    const tickerContentEl = document.getElementById('ticker-content');
    const addModal = document.getElementById('add-modal');
    const detailModal = document.getElementById('detail-modal');
    const detailModalContent = document.getElementById('detail-modal-content');
    const addForm = document.getElementById('add-form');
    const addCancelBtn = document.getElementById('add-cancel');
    const sidebarToggleBtn = document.getElementById('sidebar-toggle');
    const sidebarEl = document.getElementById('sidebar');

    // ─── Initialization ───
    function init() {
        injectStyles();

        if (window.STRIKE_DATA && Array.isArray(window.STRIKE_DATA)) {
            allEntries = window.STRIKE_DATA;
        } else {
            allEntries = [];
            console.warn('No STRIKE_DATA found.');
        }

        buildGroupedActions();
        buildActivityIndex();
        initMap();
        initCollapsibleSections();
        initSidebarState();
        bindUIEvents();
        buildTagFilters();
        buildUnionFilters();
        applyFilters();
        updateTicker();
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
        sidebarToggleBtn.setAttribute('aria-expanded', String(expanded));
    }

    // ─── Injected CSS for the stale badge / notice ───
    function injectStyles() {
        if (document.getElementById('stale-styles')) return;
        const style = document.createElement('style');
        style.id = 'stale-styles';
        style.textContent = `
            .stale-badge {
                display: inline-flex;
                align-items: center;
                gap: .35em;
                padding: .1em .55em;
                font-size: 11px;
                font-weight: 600;
                line-height: 1.6;
                color: #7a4a00;
                background: #fff3d6;
                border: 1px solid #e6c069;
                border-radius: 999px;
                cursor: pointer;
                vertical-align: middle;
                font-family: inherit;
            }
            .stale-badge:hover { background: #ffe9b3; }
            .stale-badge[aria-expanded="true"] {
                background: #ffe1a0;
                border-color: #d9a83c;
            }
            .stale-badge:focus-visible {
                outline: 2px solid #7a4a00;
                outline-offset: 2px;
            }
            .stale-notice {
                margin-top: 6px;
                padding: 6px 10px;
                font-size: 11.5px;
                color: #6b4a00;
                background: #fffaf0;
                border-left: 3px solid #e6c069;
                border-radius: 4px;
                animation: stale-in .2s ease-out;
            }
            .stale-notice[hidden] { display: none; }
            @keyframes stale-in {
                from { opacity: 0; transform: translateY(-.25rem); }
                to   { opacity: 1; transform: none; }
            }
            @media (prefers-reduced-motion: reduce) {
                .stale-notice { animation: none; }
            }
            @media (prefers-color-scheme: dark) {
                .stale-badge {
                    color: #ffd98a;
                    background: #3a2d10;
                    border-color: #7a5c1e;
                }
                .stale-badge:hover,
                .stale-badge[aria-expanded="true"] { background: #4a3a15; }
                .stale-notice {
                    color: #ffd98a;
                    background: #2a2110;
                    border-left-color: #7a5c1e;
                }
            }
        `;
        document.head.appendChild(style);
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
            let latest = 0;
            action.entries.forEach(entry => {
                const start = Date.parse(entry.startDate);
                if (!isNaN(start) && start > latest) latest = start;
                const end = entry.endDate ? Date.parse(entry.endDate) : NaN;
                if (!isNaN(end) && end > latest) latest = end;
            });
            if (latest > 0) activityIndex.set(action.actionId, latest);
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

        L.control.zoom({
        position: 'topright'
        }).addTo(map);

        L.tileLayer(TILE_LAYER_URL, {
            attribution: TILE_LAYER_ATTRIBUTION,
            maxZoom: 19
        }).addTo(map);

        markerClusterGroup = L.markerClusterGroup({
            chunkedLoading: true,
            showCoverageOnHover: false,
            maxClusterRadius: 50,
            iconCreateFunction: function(cluster) {
                const count = cluster.getChildCount();
                return L.divIcon({
                    html: `<div style="background-color: rgba(30,35,45,0.9); border: 1px solid #3a3f4a; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; color: #e6edf3; font-weight: 700; font-size: 13px;">${count}</div>`,
                    className: 'custom-cluster-icon',
                    iconSize: L.point(36, 36)
                });
            }
        });

        map.addLayer(markerClusterGroup);
    }

    // ─── Rendering Markers ───
    function renderMarkers() {
        markerClusterGroup.clearLayers();
        markersMap.clear();

        filteredActions.forEach(action => {
            const latest = action.latestEntry;
            let locations = [];
            if (latest.locations && latest.locations.length > 0) {
                locations = latest.locations;
            } else {
                locations = [{ city: latest.city, lat: latest.lat, lng: latest.lng, name: latest.city, state: latest.state }];
            }

            const markersForAction = [];
            locations.forEach(loc => {
                const marker = createMarker(latest, loc, action.actionId);
                markersForAction.push(marker);
                markerClusterGroup.addLayer(marker);
            });
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

        let popupHtml = `<div style="text-align:center;">
        <strong>${escapeHtml(entry.title)}</strong><br>
        <span style="font-size:12px;">${location.name || location.city}</span><br>
        <span style="font-size:11px; color:#aaa;">${entry.union} · ${entry.industry}</span><br>
        <button class="btn" style="margin-top:8px;" onclick="openDetailFromPopup('${actionId}')">Details</button>
        </div>`;

        marker.bindPopup(popupHtml, { maxWidth: 250 });
        return marker;
    }

    window.openDetailFromPopup = function(actionId) {
        openDetailModal(actionId);
    };

    // ─── Filtering ───
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
            result = result.filter(action => {
                const e = action.latestEntry;
                if (e.state === activeStateFilter) return true;
                if (e.locations && e.locations.some(loc => loc.state === activeStateFilter)) return true;
                return false;
            });
        }

        if (activeDateRange !== 'all') {
            const now = new Date();
            const daysAgo = parseInt(activeDateRange, 10);
            const cutoffDate = new Date(now);
            cutoffDate.setDate(cutoffDate.getDate() - daysAgo);

            result = result.filter(action => {
                const e = action.latestEntry;
                const start = new Date(e.startDate);
                const end = e.endDate ? new Date(e.endDate) : new Date('9999-12-31');
                return (end >= cutoffDate || start >= cutoffDate);
            });
        }

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

        if (activeTagFilter) {
            result = result.filter(action =>
                action.entries.some(entry => Array.isArray(entry.tags) && entry.tags.includes(activeTagFilter))
            );
        }

        filteredActions = result;
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
        setSummary('union', activeUnionFilter || '');
        setSummary('date', activeDateRange === 'all' ? '' : `Last ${activeDateRange}d`);
        setSummary('upcoming', activeUpcomingFilter ? 'On' : '');
        setSummary('tags', activeTagFilter || '');
    }

    function updateStats() {
        const activeCount = filteredActions.filter(a => a.latestEntry.type !== 'resolved' && a.latestEntry.type !== 'planned').length;
        const plannedCount = filteredActions.filter(a => a.latestEntry.type === 'planned').length;
        const totalWorkers = filteredActions.reduce((sum, a) => sum + (a.latestEntry.workers || 0), 0);
        const totalCount = filteredActions.length;

        statActiveEl.textContent = activeCount;
        statPlannedEl.textContent = plannedCount;
        statWorkersEl.textContent = totalWorkers.toLocaleString();
        statTotalEl.textContent = totalCount;
    }

    function updateEventList() {
        eventListEl.innerHTML = '';

        if (filteredActions.length === 0) {
            eventListEl.innerHTML = '<div style="padding: 20px; text-align: center; color: #8b949e;">No events match your filters.</div>';
            return;
        }

        filteredActions.forEach(action => {
            const latest = action.latestEntry;
            const item = document.createElement('div');
            item.className = 'event-item' + (selectedActionId === action.actionId ? ' selected' : '');
            item.dataset.actionId = action.actionId;

            const updateCount = action.entries.length > 1 ? ` <span class="meta-tag" style="background:#58a6ff33; color:#58a6ff;">${action.entries.length} updates</span>` : '';
            const staleBadge = getStaleBadgeHtml(action);
            const staleNotice = getStaleNoticeHtml(action);

            item.innerHTML = `
            <div style="flex-shrink:0;">${getEmojiHtml(latest.type, 18)}</div>
            <div class="event-info">
            <div class="event-title">${escapeHtml(latest.title)}</div>
            <div class="event-meta">
            <span class="meta-tag">${latest.union || 'N/A'}</span>
            <span class="meta-tag">${latest.industry || 'N/A'}</span>
            ${updateCount}
            ${latest.tags ? latest.tags.map(t => `<span class="meta-tag" style="background:#333;">#${t}</span>`).join('') : ''}
            ${staleBadge}
            </div>
            ${staleNotice}
            </div>
            <div class="event-date">${formatDate(latest.startDate)}</div>
            `;

            item.addEventListener('click', () => {
                selectedActionId = action.actionId;
                updateEventList();
                openDetailModal(action.actionId);
                const markers = markersMap.get(action.actionId);
                if (markers && markers.length > 0) {
                    map.setView(markers[0].getLatLng(), 10);
                }
            });

            // Wire up the stale badge toggle so it doesn't open the detail modal.
            const staleBtn = item.querySelector('.stale-badge');
            if (staleBtn) {
                staleBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const notice = item.querySelector('.stale-notice');
                    const isOpen = staleBtn.getAttribute('aria-expanded') === 'true';
                    staleBtn.setAttribute('aria-expanded', String(!isOpen));
                    if (notice) notice.hidden = isOpen;
                });
            }

            eventListEl.appendChild(item);
        });
    }

    function updateTicker() {
        if (allEntries.length === 0) {
            tickerContentEl.innerHTML = '<span>No data available.</span>';
            return;
        }
        const recent = [...groupedActions]
            .sort((a, b) => new Date(b.latestEntry.startDate) - new Date(a.latestEntry.startDate))
            .slice(0, 5);
        let tickerHTML = recent.map(action => {
            const e = action.latestEntry;
            return `<span>${getEmojiHtml(e.type, 14)} ${escapeHtml(e.title)} — ${formatDate(e.startDate)}</span>`;
        }).join('');
        tickerContentEl.innerHTML = tickerHTML + tickerHTML;
        tickerContentEl.classList.remove('is-scrolling');
        void tickerContentEl.offsetWidth;
        tickerContentEl.classList.add('is-scrolling');
    }

    // ─── Detail Modal ───
    function openDetailModal(actionId) {
        const action = groupedActions.find(a => a.actionId === actionId);
        if (!action) return;

        const latest = action.latestEntry;
        const firstStart = action.firstStartDate || latest.startDate;
        const typeInfo = getTypeInfo(latest.type);
        const typeLabel = latest.type.charAt(0).toUpperCase() + latest.type.slice(1);

        let locationsHtml = '';
        if (latest.locations && latest.locations.length > 0) {
            locationsHtml = latest.locations.map(loc =>
                `<div>📍 ${loc.name || loc.city}, ${loc.state || ''}</div>`
            ).join('');
        } else {
            locationsHtml = `<div>📍 ${latest.city}, ${latest.state || ''}</div>`;
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
            <div style="border-left: 2px solid #444; padding-left: 12px; margin-top: 6px;">
            ${action.entries.map(entry => `
                <div style="margin-bottom: 12px;">
                <div style="font-weight: 700; color: #e6edf3; font-size: 13px;">${escapeHtml(entry.title)}</div>
                <div style="font-size: 11px; color: #aaa;">Union: ${escapeHtml(entry.union || 'Unknown')} · ${formatDate(entry.startDate)}</div>
                <div style="font-size: 12px; color: #999; margin-top: 4px;">${escapeHtml(entry.description)}</div>
                ${entry.sources && entry.sources.length > 0 ? `
                    <div style="font-size: 11px; margin-top: 4px; color: #58a6ff;">
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
        <span style="font-size: 13px; font-weight: 700; color: ${typeInfo.color};">${typeLabel}</span>
        <span style="margin-left: auto; font-size: 12px; color: #8b949e;">${formatDate(latest.startDate)}</span>
        </div>
        <h3 style="margin-bottom: 8px;">${escapeHtml(latest.title)}</h3>
        ${staleHtml}
        <div class="detail-section"><div class="detail-label">Union</div><div class="detail-value">${escapeHtml(latest.union || 'Not specified')}</div></div>
        <div class="detail-section"><div class="detail-label">Industry</div><div class="detail-value">${escapeHtml(latest.industry || 'Not specified')}</div></div>
        <div class="detail-section"><div class="detail-label">Locations</div><div class="detail-value">${locationsHtml}</div></div>
        <div class="detail-section"><div class="detail-label">Workers Involved</div><div class="detail-value">${latest.workers ? latest.workers.toLocaleString() : 'Unknown'}</div></div>
        <div class="detail-section"><div class="detail-label">Duration</div><div class="detail-value">${formatDate(firstStart)} — ${latest.endDate ? formatDate(latest.endDate) : 'Ongoing'}</div></div>
        <div class="detail-section"><div class="detail-label">Description</div><div class="detail-value" style="font-size: 13px; color: #c9d1d9;">${escapeHtml(latest.description)}</div></div>
        ${historyHtml}
        <div class="detail-section"><div class="detail-label">Tags</div><div class="detail-value">${latest.tags ? latest.tags.map(t => `#${t}`).join(' ') : 'None'}</div></div>
        <div class="detail-section"><div class="detail-label">Sources</div><div class="detail-value">${sourcesHtml || 'No sources provided'}</div></div>
        <div style="margin-top: 16px; display: flex; gap: 8px; justify-content: flex-end;">
        <button class="btn" id="detail-close">Close</button>
        </div>
        `;

        detailModal.classList.add('visible');
        document.getElementById('detail-close').addEventListener('click', () => {
            detailModal.classList.remove('visible');
        });
        detailModal.onclick = (e) => {
            if (e.target === detailModal) detailModal.classList.remove('visible');
        };
    }

    // ─── Add Report Modal ───
    function openAddModal() {
        addModal.classList.add('visible');
        document.getElementById('f-start').value = new Date().toISOString().split('T')[0];
    }

    function closeAddModal() {
        addModal.classList.remove('visible');
        addForm.reset();
        document.getElementById('locations-container').innerHTML = `
        <div class="location-row" style="display: flex; gap: 8px; margin-bottom: 6px;">
        <input type="text" class="location-name" placeholder="Location name" style="flex: 1;">
        <input type="text" class="location-city" placeholder="City" style="flex: 1;" required>
        <input type="text" class="location-state" placeholder="State (e.g. VIC)" style="flex: 0 0 80px;" required>
        <input type="number" step="any" class="location-lat" placeholder="Lat" style="flex: 0 0 80px;">
        <input type="number" step="any" class="location-lng" placeholder="Lng" style="flex: 0 0 80px;">
        <button type="button" class="btn remove-location" style="padding: 4px 8px;">✕</button>
        </div>
        `;
        document.getElementById('sources-container').innerHTML = `
        <div class="source-row" style="display: flex; gap: 8px; margin-bottom: 6px;">
        <input type="text" class="source-name" placeholder="Source name" style="flex: 1;">
        <input type="url" class="source-url" placeholder="https://…" style="flex: 2;">
        <button type="button" class="btn remove-source" style="padding: 4px 8px;">✕</button>
        </div>
        `;
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
        buildUnionFilters();
        closeAddModal();
        applyFilters();
        updateTicker();
    }

    // ─── UI Event Binding ───
    function bindUIEvents() {
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

        sidebarToggleBtn.addEventListener('click', () => {
            sidebarEl.classList.toggle('collapsed');
            sidebarAutoCollapsed = false; // user made an explicit choice
            syncSidebarToggle();
        });

        let searchTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchQuery = searchInput.value;
                applyFilters();
            }, 250);
        });

        typeFilterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                typeFilterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                activeTypeFilter = chip.dataset.type;
                applyFilters();
            });
        });

        stateFilterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                stateFilterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                activeStateFilter = chip.dataset.state;
                applyFilters();
            });
        });

        dateFilterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                dateFilterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                activeDateRange = chip.dataset.range;
                applyFilters();
            });
        });

        upcomingFilterChip.addEventListener('click', () => {
            activeUpcomingFilter = !activeUpcomingFilter;
            upcomingFilterChip.classList.toggle('active', activeUpcomingFilter);
            applyFilters();
        });

        document.getElementById('add-report-btn')?.addEventListener('click', openAddModal);
        addCancelBtn.addEventListener('click', closeAddModal);
        addModal.addEventListener('click', (e) => {
            if (e.target === addModal) closeAddModal();
        });
        addForm.addEventListener('submit', handleAddSubmit);

        document.getElementById('add-location-btn')?.addEventListener('click', () => {
            const container = document.getElementById('locations-container');
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
            if (e.key === 'Escape') {
                if (addModal.classList.contains('visible')) closeAddModal();
                if (detailModal.classList.contains('visible')) detailModal.classList.remove('visible');
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