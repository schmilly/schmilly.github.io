// update-locations.js
// Builds a reverse index from locations.js (name -> JS variable expression)
// and rewrites generic entries in data.js to use those variables.
// Run: node update-locations.js

const fs = require('fs');
const vm = require('vm');

const DATA_FILE      = './data.js';
const LOCATIONS_FILE = './locations.js';
const BACKUP_FILE    = './data.js.bak';

// ------------------------------------------------------------
// 1. Load locations.js in a sandbox
// ------------------------------------------------------------
console.log('Loading locations.js...');
let locCode = fs.readFileSync(LOCATIONS_FILE, 'utf8');
// Strip the Object.assign(window, {...}) block that references data.js vars
locCode = locCode.replace(/Object\.assign\(window,\s*\{[\s\S]*?\}\);\s*$/m, '');

const sandbox = { window: {}, console };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
try { vm.runInContext(locCode, sandbox); }
catch (e) { console.error('ERROR in locations.js:', e.message); process.exit(1); }
const W = sandbox.window;

// ------------------------------------------------------------
// 2. Build reverse index: name -> { latExpr, lngExpr, priority }
// ------------------------------------------------------------
const lookup = {};

function esc(k) { return String(k).replace(/\\/g, '\\\\').replace(/"/g, '\\"'); }

function indexEntry(name, latExpr, lngExpr, priority) {
  if (!name || !latExpr || !lngExpr) return;
  const prev = lookup[name];
  if (!prev || prev.priority < priority) {
    lookup[name] = { latExpr, lngExpr, priority };
  }
}

function walk(varName, obj, priority, pathParts) {
  if (!obj || typeof obj !== 'object') return;
  for (const [key, val] of Object.entries(obj)) {
    const parts    = [...pathParts, esc(key)];
    const buildPath = () => varName + parts.map(p => `["${p}"]`).join('');

    if (Array.isArray(val) && val.length >= 2 && typeof val[0] === 'number') {
      const p = buildPath();
      indexEntry(key, `${p}[0]`, `${p}[1]`, priority);

    } else if (val && typeof val === 'object'
               && typeof val.lat === 'number'
               && typeof val.lng === 'number') {
      const p = buildPath();
      indexEntry(key, `${p}.lat`, `${p}.lng`, priority);
      if (val.name) indexEntry(val.name, `${p}.lat`, `${p}.lng`, priority);

    } else if (val && typeof val === 'object' && !Array.isArray(val)) {
      walk(varName, val, priority, parts);
    }
  }
}

// Priority: higher wins if same name appears in multiple objects.
// (Do NOT include CITY_COORDS - those are the generic ones we're replacing.)
const varPriority = {
  SPECIFIC: 200,
  VICLoc: 200, CANLoc: 200, WALoc: 200,
  HOSP: 180,
  MELB: 150, SYD: 150, BRIS: 150, PER: 150, ADL: 150,
  UNI: 150, PORT: 150, MINE: 150, REF: 150, POWER: 150,
  COMPANY: 140,
  CAN: 120, SA: 120, WA: 120, QLD: 120, TAS: 120, VIC: 120, LIB: 120,
};

for (const [varName, prio] of Object.entries(varPriority)) {
  if (W[varName]) walk(varName, W[varName], prio, []);
}

console.log(`  Indexed ${Object.keys(lookup).length} named locations.`);

// ------------------------------------------------------------
// 3. Aliases: data.js `name:` string -> key in locations.js index
//    Extend this list as missed names appear in the report.
// ------------------------------------------------------------
const aliases = {
  // --- VIC hospitals / health ---
  'Various Melbourne hospitals':                    'Royal Melbourne',
  'Various Victorian public hospitals':             'Royal Melbourne',
  'Various public hospitals':                       'Royal Melbourne',
  'Various Victorian public health sites':          'Royal Melbourne',
  'Various public health sites':                    'Royal Melbourne',
  'Various health services':                        'Royal Melbourne',
  'Various public health services':                 'Royal Melbourne',
  'Victorian public hospitals':                     'Royal Melbourne',
  'Victorian public health services':               'Royal Melbourne',
  'Victorian health services':                      'Royal Melbourne',
  'Victorian public health sites':                  'Royal Melbourne',
  'Various hospitals':                              'Royal Melbourne',
  'Various hospitals and health services':          'Royal Melbourne',
  'Royal Melbourne Hospital':                       'Royal Melbourne',
  "Royal Women's Hospital":                         "Royal Women's",
  "Royal Children's Hospital":                      "Royal Children's",
  "St Vincent's Private Hospital":                  "St Vincent's Hospital Melbourne",
  'Melbourne Private Hospital':                     'Healthscope Facilities',
  'Geelong Clinic':                                 'Healthscope Facilities',
  'Northern Health / St Vincent\'s':                'Northern Health',
  "Northern Health / St Vincent's":                 'Northern Health',

  // --- VIC education ---
  'Schools across Victoria':                        'Victorian Parliament',
  'Victorian kindergartens':                        'Victorian Parliament',
  'Various public schools':                         'Victorian Parliament',
  'Various Catholic schools':                       'Victorian Parliament',
  "Education Minister's Office":                    "Education Minister's Office",

  // --- VIC parks / councils ---
  'Parks Victoria':                                 'Parks Vic',
  'Parks Victoria Board meeting':                   'Parks Vic',
  'Various parks':                                  'Parks Vic',
  'Various parks across Victoria':                  'Parks Vic',
  'Various metropolitan councils':                  'Melbourne Town Hall',
  'Various metropolitan Melbourne councils':        'Melbourne Town Hall',
  'Various councils':                               'Coburg Town Hall',
  'Merri-bek Council':                              'Merri-bek Council',
  'Hume City Council':                              'Hume City Council',
  'Greater Dandenong Council':                      'Greater Dandenong Council',
  'City of Yarra':                                  'Yarra City Council',
  'Broadmeadows':                                   'Hume City Council',
  'Coburg':                                         'Coburg Town Hall',
  'Dandenong':                                      'Greater Dandenong Council',
  'Niddrie':                                        'Victorian Parliament',
  'South Melbourne':                                'Acciona Office',
  'Parliament House':                               'Victorian Parliament',
  'Victorian Parliament':                           'Victorian Parliament',
  'Bourke Street Mall / Parliament House':          'Victorian Parliament',
  'Treasury Gardens / Parliament House':            'Treasury Gardens',
  'Trades Hall / Parliament House':                 'Trades Hall',
  "Environment Minister's Office, 8 Nicholson Street": 'Victorian Parliament',

  // --- VIC specific workplaces ---
  'Scope Head Office':                              'Scope Head Office',
  'Crown Melbourne':                                'Crown Melbourne',
  'AEMO':                                           'AEMO',
  'Note Printing Australia':                        'Note Printing Australia',
  'Mazda Australia warehouse, Epping':              'Mazda Australia Epping',
  'Air Radiators, Lara':                            'Air Radiators Lara',
  'Vindex Sunshine':                                'Vindex Sunshine',
  'Bucher Municipal':                               'Bucher Municipal',
  'CSR Yarraville':                                 'CSR Yarraville',
  'Infrabuild Wire Mill':                           'Infrabuild Wire Mill',
  'Opal Maryvale Mill':                             'Opal Maryvale Mill',
  'Victoria University':                            'Victoria University',
  'Maurice Blackburn':                              'Maurice Blackburn',
  'Ravenhall and Fulham Correctional Centres':      'Ravenhall Correctional Centre',
  'Kinetic depots':                                 'Kinetic Depots',
  'NPT Depot':                                      'NPT Depot',
  'Lumus Imaging':                                  'Lumus Imaging',
  'Various imaging sites':                          'Lumus Imaging',
  'DFFH':                                           'DFFH',
  'Ambulance Victoria':                             'Ambulance Victoria',
  'Department of Health / Parliament House':        'Department of Health',
  'Various locations':                              'Victorian Parliament',
  'Various sites':                                  'Victorian Parliament',
  "Campbell's Soup Shepparton":                     "Campbell's Soup Shepparton",
  'Coburg Town Hall':                               'Coburg Town Hall',
  'Hadfield Depot':                                 'Hadfield Depot',

  // --- NSW ---
  'Sydney Trains Network':                          'Sydney Trains',
  'Sydney Trains':                                  'Sydney Trains',
  'Sydney construction sites':                      'Stowe',
  'DP World Port Botany':                           'Port Botany',
  'Port Botany':                                    'Port Botany',
  'Sydney Airport':                                 'Airport',
  'Woolworths distribution centres':                'Woolworths DC',
  'Downer Engineering sites':                       'Downer Engineering',
  'Concrite operations, NSW':                       'Concrite',
  'Cootamundra Hospital':                           'Cootamundra',
  'Cootamundra Pathology Lab.':                     'Cootamundra',
  'Orange Base Hospital':                           'Orange Base',
  'Young Hospital':                                 'Young',
  'NSW public hospitals':                           'NSW public hospitals',
  'Various public hospitals':                       'NSW public hospitals',
  'Various hospitals':                              'NSW public hospitals',
  'Royal Newcastle Centre':                         'Royal Newcastle Centre',
  'Immigration Detention Centres':                  'Immigration Detention Centres',
  'Vales Point Power Station':                      'Vales Point Power Station',
  'Snowy 2.0 Project':                              'Snowy 2.0',
  'Ulan Underground Mine':                          'Ulan Underground Mine',
  'Progress Rail':                                  'Progress Rail',
  'NRMA Headquarters':                              'NRMA',
  'Coca-Cola Northmead':                            'Coca-Cola Northmead',
  'Wingecarribee Shire Council':                    'Wingecarribee Shire Council',
  'Kiama Council':                                  'Kiama Council',
  'Riverina Water':                                 'Riverina Water',
  'NSW public hospitals ':                          'NSW public hospitals',

  // --- QLD ---
  'Queensland Rail Network':                        'Queensland Rail',
  'Queensland Rail':                                'Queensland Rail',
  'Brisbane City Council':                          'Brisbane City Council',
  'Brisbane Youth Detention Centre':                'Brisbane Youth Detention Centre',
  'Cairns Youth Detention Centre':                  'Cairns Youth Detention Centre',
  'Western Downs Council':                          'Western Downs Council',
  'Western Downs Regional Council':                 'Western Downs Council',
  'Isis Sugar Mill':                                'Isis Sugar Mill',
  'Noosa City Council':                             'Noosa City Council',
  'Queensland Fertility Group':                     'Queensland Fertility Group',
  'UGL Townsville':                                 'UGL Townsville',
  'Gladstone Port':                                 'Gladstone Port',
  'Department of Transport and Main Roads':         'Department of Transport and Main Roads',
  'Mater Hospital':                                 'Mater Hospital Brisbane',
  'Brisbane River':                                 'Brisbane',
  'Parliament House':                               'Queensland Parliament',
  'TAFEs across Queensland':                        'TAFEs across Queensland',
  'Queensland public hospitals':                    'Queensland public hospitals',
  'Various public hospitals':                       'Queensland public hospitals',
  'Various hospitals':                              'Queensland public hospitals',
  'Various Catholic schools':                       'Queensland Parliament',

  // --- WA ---
  'Port Hedland':                                   'BHP Port Hedland',
  'BHP Port Hedland':                               'BHP Port Hedland',
  'Fremantle Port':                                 'Fremantle Port',
  'Perth Airport':                                  'Airport',
  'Curtin University':                              'Curtin University',
  'BP Refinery Kwinana':                            'BP Refinery Kwinana',
  'Mining Area C / South Flank':                    'Mining Area C',
  'Premier Coal Mine':                              'Premier Coal Mine',
  'Barrow Island':                                  'Barrow Island',
  'Ventia custodial services, WA':                  'Ventia custodial services',
  'SCT Logistics, Perth':                           'SCT Logistics Perth',
  'Freo Cranes operations Pilbara':                 'Freo Cranes Pilbara',
  'ANMF WA Office':                                 'ANMF WA',
  'HSU WA Office':                                  'HSU WA',
  'Perth CBD':                                      'Forrest Place',
  'WA public hospitals':                            'Royal Perth',
  'Various hospitals':                              'Royal Perth',
  'Various public hospitals':                       'Royal Perth',

  // --- SA ---
  'SA Health':                                      'SA Health',
  'Parliament House':                               'SA Parliament',
  'Parliament House / SA Health':                   'SA Parliament',
  'Osborne Naval Shipyard':                         'Osborne Naval Shipyard',
  'Various Catholic schools':                       'SA Parliament',
  'SA public hospitals':                            'SA public hospitals',
  'Various public hospitals':                       'SA public hospitals',
  'Various hospitals':                              'SA public hospitals',
  'SA prisons':                                     'SA prisons',
  'Adelaide CBD':                                   'SA Parliament',
  'Lyell McEwin Hospital':                          'Lyell McEwin',
  'Flinders Medical Centre':                        'Flinders Medical Centre',
  'Service Stream SA / Edinburgh RAAF Base':        'Service Stream SA',
  'Service Stream SA':                              'Service Stream SA',
  'City of Port Adelaide Enfield':                  'City of Port Adelaide Enfield',
  'Adelaide Remand Centre':                         'Adelaide Remand Centre',

  // --- TAS ---
  'TasRail':                                        'TasRail',
  'Tasmanian State Government':                     'Tasmanian Parliament',
  'Tasmanian public schools':                       'Tasmanian Parliament',
  'Launceston Reception Prison':                    'Launceston Reception Prison',
  'TasWater':                                       'TasWater',
  'Ambulance Tasmania':                             'Ambulance Tasmania',
  'Department of Premier and Cabinet and Building Tasmania': 'Department of Premier and Cabinet',
  'Launceston General Hospital':                    'Launceston General',
  'Royal Hobart Hospital':                          'Royal Hobart',
  'North West Regional Hospital':                   'North West Regional',
  'Mersey Community Hospital':                      'Mersey Community',
  'Beaconsfield District Health Service':           'Beaconsfield',
  'Tolosa Street':                                  'Tolosa Street Mental Health Service',
  'Roy Fagan Centre':                               'Roy Fagan Centre',
  'Wellington Clinics, Royal Hobart Hospital':      'Wellington Clinics',
  'Hobart Port':                                    'Hobart Port',
  'Burnie Port':                                    'Burnie Port',
  'Devonport Port':                                 'Devonport Port',
  'Kinetic Hobart':                                 'Kinetic Hobart',
  'Kinetic Launceston':                             'Kinetic Launceston',
  'Kinetic Burnie':                                 'Kinetic Burnie',
  'Kinetic Devonport':                              'Kinetic Devonport',
  'Various public hospitals':                       'Royal Hobart',
  'Various hospitals':                              'Royal Hobart',

  // --- ACT ---
  'ACT Government':                                 'ACT Government',
  'ACT public schools':                             'ACT public schools',
  'Civic Square / Glebe Park':                      'ACT Government',
  'ACT Legislative Assembly':                       'ACT Parliament',
  'Canberra Hospital':                              'Canberra',
  'Tuggeranong':                                    'Tuggeranong',

  // --- NT ---
  'Darwin Correctional Centre / Berrimah Correctional Centre': 'Darwin Correctional Centre',
  'Ichthys gas facilities':                         'Ichthys gas field',
  'Darwin public hospitals':                        'Darwin public hospitals',
};

// ------------------------------------------------------------
// 4. Rewrite data.js
// ------------------------------------------------------------
console.log('Reading data.js...');
let dataContent = fs.readFileSync(DATA_FILE, 'utf8');
fs.copyFileSync(DATA_FILE, BACKUP_FILE);
console.log(`  Backup saved to ${BACKUP_FILE}`);

const cityCoords = W.CITY_COORDS || {};

function isGeneric(latStr, lngStr) {
  if (latStr.includes('CITY_COORDS') || lngStr.includes('CITY_COORDS')) return true;
  const lat = parseFloat(latStr);
  const lng = parseFloat(lngStr);
  if (isNaN(lat) || isNaN(lng)) return false;
  for (const coords of Object.values(cityCoords)) {
    if (Array.isArray(coords)
        && Math.abs(lat - coords[0]) < 0.005
        && Math.abs(lng - coords[1]) < 0.005) return true;
  }
  return false;
}

const locRegex = /\{\s*city:\s*"([^"]*)"\s*,\s*state:\s*"([^"]*)"\s*,\s*lat:\s*([^,}]+?)\s*,\s*lng:\s*([^,}]+?)\s*,\s*name:\s*"([^"]*)"\s*\}/g;

let replaced = 0, skipped = 0;
const missed = new Map(); // name -> count

dataContent = dataContent.replace(locRegex, (match, city, state, latStr, lngStr, name) => {
  if (!isGeneric(latStr.trim(), lngStr.trim())) { skipped++; return match; }

  const targetKey = aliases[name] !== undefined ? aliases[name] : name;
  const target    = lookup[targetKey];

  if (!target) {
    missed.set(name, (missed.get(name) || 0) + 1);
    return match;
  }

  replaced++;
  return `{ city: "${city}", state: "${state}", lat: ${target.latExpr}, lng: ${target.lngExpr}, name: "${name}" }`;
});

console.log(`\nResults:`);
console.log(`  Replaced generic entries: ${replaced}`);
console.log(`  Skipped (already specific): ${skipped}`);

if (missed.size > 0) {
  console.log(`\n  Names with no specific mapping (${missed.size}):`);
  [...missed.entries()].sort().forEach(([n, c]) => console.log(`    (${c}×) "${n}"`));
  console.log(`\n  → Add these to the 'aliases' object to map them.`);
}

fs.writeFileSync(DATA_FILE, dataContent);
console.log(`\nWrote ${DATA_FILE}.`);