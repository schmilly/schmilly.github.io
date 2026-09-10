// ============================================
// AU Strike Watch - Main Application
// Features: grouped actions (multiple entries), multiple locations,
// unified emoji markers with colored backgrounds.
// ============================================

(function() {
    'use strict';

    // ─── Configuration ───
    const MAP_CENTER = [-25.5, 134.0];
    const MAP_ZOOM = 4;
    const TILE_LAYER_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}';
    const TILE_LAYER_ATTRIBUTION = 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community';

    // ─── Type definitions ───
    const TYPE_INFO = {
        strike:     { emoji: '✊', color: '#e74c3c' },
 lockout:    { emoji: '🔒', color: '#e67e22' },
 protest:    { emoji: '🪧', color: '#f1c40f' },
 planned:    { emoji: '📋', color: '#3498db' },
 resolved:   { emoji: '✔', color: '#2ecc71' },
 ballot:      {emoji: '🗳️',color:'#acbfa4'},
 scab:       {emoji:'🐀',color:'brown'},
 default:    { emoji: '❔', color: '#95a5a6' }
    };

    function getTypeInfo(type) {
        return TYPE_INFO[type] || TYPE_INFO.default;
    }

    function getEmojiHtml(type, size = 20) {
        const info = getTypeInfo(type);
        const containerSize = size + 6;
        const fontSize = size;
        return `<span  style="font-size: ${fontSize}px; line-height: 1;color: ${info.color}">${info.emoji}</span>`;
    }

        // ─── State ───
        let allEntries = [];
        let groupedActions = [];
        let filteredActions = [];
        let activeTypeFilter = 'all';
        let activeStateFilter = 'all';
        let activeDateRange = 'all';
        let activeUpcomingFilter = false;
        let activeTagFilter = null;
        let tagsExpanded = false;
        let searchQuery = '';
        let selectedActionId = null;
        let map;
        let markerClusterGroup;
        let markersMap = new Map();

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
            if (window.STRIKE_DATA && Array.isArray(window.STRIKE_DATA)) {
                allEntries = window.STRIKE_DATA;
            } else {
                allEntries = [];
                console.warn('No STRIKE_DATA found.');
            }

            buildGroupedActions();
            initMap();
            bindUIEvents();
            buildTagFilters();
            applyFilters();
            updateTicker();
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
                // Sort entries by start date ascending
                entries.sort((a, b) => {
                    const dateA = new Date(a.startDate);
                    const dateB = new Date(b.startDate);
                    if (dateA - dateB !== 0) return dateA - dateB;
                    return (a.id || 0) - (b.id || 0);
                });

                const latestEntry = entries[entries.length - 1];

                // Calculate earliest start date across all entries
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

            // Sort groups by latest entry start date descending (unchanged)
            groupedActions.sort((a, b) => new Date(b.latestEntry.startDate) - new Date(a.latestEntry.startDate));
        }

        // ─── Build tag filter chips dynamically ───
        function buildTagFilters() {
            const tagSet = new Set();
            allEntries.forEach(entry => {
                if (entry.tags && Array.isArray(entry.tags)) {
                    entry.tags.forEach(tag => tagSet.add(tag));
                }
            });

            tagFilterContainer.innerHTML = '';
            const allChip = document.createElement('div');
            allChip.className = 'filter-chip' + (activeTagFilter === null ? ' active' : '');
            allChip.dataset.tag = 'all';
            allChip.textContent = 'All Tags';
            allChip.addEventListener('click', () => {
                activeTagFilter = null;
                updateTagChips();
                applyFilters();
            });
            tagFilterContainer.appendChild(allChip);

            [...tagSet].sort((a, b) => a.localeCompare(b)).forEach(tag => {
                const chip = document.createElement('div');
                chip.className = 'filter-chip' + (activeTagFilter === tag ? ' active' : '');
                chip.dataset.tag = tag;
                chip.textContent = tag;
                chip.addEventListener('click', () => {
                    activeTagFilter = tag;
                    updateTagChips();
                    applyFilters();
                });
                tagFilterContainer.appendChild(chip);
            });

            updateTagVisibility();
        }

        function updateTagChips() {
            tagFilterContainer.querySelectorAll('.filter-chip').forEach(chip => {
                chip.classList.toggle('active',
                    chip.dataset.tag === 'all' ? activeTagFilter === null : chip.dataset.tag === activeTagFilter
                );
            });
            updateTagVisibility();
        }

        function updateTagVisibility() {
            const chips = [...tagFilterContainer.querySelectorAll('.filter-chip')];
            const collapsedCount = 7;
            chips.forEach((chip, index) => {
                chip.hidden = !tagsExpanded && index >= collapsedCount && chip.dataset.tag !== activeTagFilter;
            });
            if (tagToggleBtn) {
                const hiddenCount = chips.filter(chip => chip.hidden).length;
                tagToggleBtn.hidden = hiddenCount === 0;
                tagToggleBtn.textContent = tagsExpanded ? 'Show fewer tags' : `Show all tags${hiddenCount ? ` (${hiddenCount})` : ''}`;
                tagToggleBtn.setAttribute('aria-expanded', String(tagsExpanded));
            }
        }

        // ─── Map Initialization ───
        function initMap() {
            map = L.map(mapContainer, {
                center: MAP_CENTER,
                zoom: MAP_ZOOM,
                zoomControl: true,
                attributionControl: true
            });

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
            const typeInfo = getTypeInfo(entry.type);
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

            // Search filter
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

            // Type filter
            if (activeTypeFilter !== 'all') {
                result = result.filter(action => action.latestEntry.type === activeTypeFilter);
            }

            // State filter
            if (activeStateFilter !== 'all') {
                result = result.filter(action => {
                    const e = action.latestEntry;
                    if (e.state === activeStateFilter) return true;
                    if (e.locations && e.locations.some(loc => loc.state === activeStateFilter)) return true;
                    return false;
                });
            }

            // Date range filter
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

            // Upcoming filter
            if (activeUpcomingFilter) {
                const now = new Date();
                result = result.filter(action => {
                    const e = action.latestEntry;
                    const start = new Date(e.startDate);
                    return start > now;
                });
            }

            // Tag filter
            if (activeTagFilter) {
                result = result.filter(action => {
                    const e = action.latestEntry;
                    return e.tags && e.tags.includes(activeTagFilter);
                });
            }

            filteredActions = result;
            updateStats();
            updateEventList();
            renderMarkers();
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

                item.innerHTML = `
                <div style="flex-shrink:0;">${getEmojiHtml(latest.type, 18)}</div>
                <div class="event-info">
                <div class="event-title">${escapeHtml(latest.title)}</div>
                <div class="event-meta">
                <span class="meta-tag">${latest.union || 'N/A'}</span>
                <span class="meta-tag">${latest.industry || 'N/A'}</span>
                ${updateCount}
                ${latest.tags ? latest.tags.map(t => `<span class="meta-tag" style="background:#333;">#${t}</span>`).join('') : ''}
                </div>
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
            // Duplicate the ticker content so the animation loops seamlessly.
            tickerContentEl.innerHTML = tickerHTML + tickerHTML;
            tickerContentEl.classList.remove('is-scrolling');
            void tickerContentEl.offsetWidth;
            tickerContentEl.classList.add('is-scrolling');
        }

        // ─── Detail Modal ───
        // ─── Detail Modal ───
        function openDetailModal(actionId) {
            const action = groupedActions.find(a => a.actionId === actionId);
            if (!action) return;

            const latest = action.latestEntry;
            const firstStart = action.firstStartDate || latest.startDate; // fallback
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

            // History with sources, title and union for each entry
            let historyHtml = '';
            if (action.entries.length > 1) {
                historyHtml = `
                <div class="detail-section">
                <div class="detail-label">📜 Update History</div>
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

            detailModalContent.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
            <div>${getEmojiHtml(latest.type, 24)}</div>
            <span style="font-size: 13px; font-weight: 700; color: ${typeInfo.color};">${typeLabel}</span>
            <span style="margin-left: auto; font-size: 12px; color: #8b949e;">${formatDate(latest.startDate)}</span>
            </div>
            <h3 style="margin-bottom: 8px;">${escapeHtml(latest.title)}</h3>
            <div class="detail-section"><div class="detail-label">Union</div><div class="detail-value">${escapeHtml(latest.union || 'Not specified')}</div></div>
            <div class="detail-section"><div class="detail-label">Industry</div><div class="detail-value">${escapeHtml(latest.industry || 'Not specified')}</div></div>
            <div class="detail-section"><div class="detail-label">Locations</div><div class="detail-value">${locationsHtml}</div></div>
            <div class="detail-section"><div class="detail-label">Workers Affected</div><div class="detail-value">${latest.workers ? latest.workers.toLocaleString() : 'Unknown'}</div></div>
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
            buildTagFilters();
            closeAddModal();
            applyFilters();
            updateTicker();
        }

        // ─── UI Event Binding ───
        function bindUIEvents() {
            if (tagToggleBtn) {
                tagToggleBtn.addEventListener('click', () => {
                    tagsExpanded = !tagsExpanded;
                    updateTagVisibility();
                });
            }

            sidebarToggleBtn.addEventListener('click', () => {
                sidebarEl.classList.toggle('collapsed');
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
