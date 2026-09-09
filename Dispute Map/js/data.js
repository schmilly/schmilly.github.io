// ============================================
// AU Strike Watch - Data File
// Events from Disputes Reports - 2 & 9 September 2026
// Supports: multiple locations per action, multiple entries (updates) for same action,
// named sources.
// ============================================

const CITY_COORDS = {
    "Sydney": [-33.8688, 151.2093],
    "Melbourne": [-37.8136, 144.9631],
    "Brisbane": [-27.4698, 153.0251],
    "Perth": [-31.9505, 115.8605],
    "Adelaide": [-34.9285, 138.6007],
    "Hobart": [-42.8821, 147.3272],
    "Canberra": [-35.2809, 149.1300],
    "Darwin": [-12.4634, 130.8456],
    "Newcastle": [-32.9283, 151.7817],
    "Wollongong": [-34.4278, 150.8931],
    "Geelong": [-38.1499, 144.3617],
    "Gold Coast": [-28.0167, 153.4000],
    "Townsville": [-19.2589, 146.8169],
    "Cairns": [-16.9186, 145.7781],
    "Alice Springs": [-23.6980, 133.8807],
    "Launceston": [-41.4332, 147.1441],
    "Bendigo": [-36.7580, 144.2803],
    "Ballarat": [-37.5622, 143.8503],
    "Mackay": [-21.1412, 149.1864],
    "Rockhampton": [-23.3770, 150.5100],
    "Toowoomba": [-27.5600, 151.9500],
    "Bunbury": [-33.3271, 115.6369],
    "Geraldton": [-28.7744, 114.6086],
    "Port Kembla": [-34.4740, 150.8930],
    "Whyalla": [-33.0330, 137.5800],
    "Port Augusta": [-32.4950, 137.7700],
    "Burnie": [-41.0520, 145.9060],
    "Devonport": [-41.1800, 146.3500],
    "Mildura": [-34.1850, 142.1620],
    "Albury": [-36.0800, 146.9160],
    "Port Hedland": [-20.3107, 118.5876],
    "Pakenham": [-38.0812, 145.4870],
    "Kooragang Island": [-32.8610, 151.7750],
    "Royal Melbourne Hospital": [-37.7990, 144.9560],
    "Royal Women's Hospital": [-37.7980, 144.9560],
    "Royal Children's Hospital": [-37.7920, 144.9500],
    "Monash Medical Centre": [-37.9080, 145.1300],
    "Eastern Health Box Hill": [-37.8180, 145.1250],
    "Ballarat Base Hospital": [-37.5622, 143.8503],
    "Bendigo Hospital": [-36.7580, 144.2803],
    "Hamer Hall": [-37.8180, 144.9670],
    "Melbourne Town Hall": [-37.8150, 144.9660],
    "Keilor": [-37.7167, 144.8333],
    "Hawthorn": [-37.8220, 145.0350],
    "Port Melbourne": [-37.8300, 144.9300],
    "Broadmeadows": [-37.6850, 144.9250],
    "Coburg": [-37.7430, 144.9660],
    "Dandenong": [-37.9830, 145.2150],
    "Niddrie": [-37.7400, 144.8900],
    "Tuggeranong": [-35.4150, 149.0700],
    "Collie": [-33.3600, 116.1500],
    "South Melbourne": [-37.8330, 144.9670],
};

const COMPANY = {
    "Jetstar": [-37.8089, 144.9860],
    "Lummus Imaging": {
        "Birdge Road": [-37.8167, 144.9936],
    },
    "Viva":[-38.07680767751296, 144.37967195955835] //Oil refinery
}

const MELB = {
    "Port": [-37.84192, 144.9234],
    "Quantem": [-37.8174, 144.9077],
    "Arts Centre": [-37.821456413674404, 144.96882381429486],
    "Trades Hall": [-37.80654107023885, 144.96625939962078],
    "Town Hall": [-37.816106117492154, 144.9670850824903],
    "Uni":[-37.79840685767232, 144.96095388740878],
    "Peter MacCallum Cancer Centre": [-37.80026478320679, 144.95671662077825],
}

const PER = {
    "Ocean": [-32.06461197040717, 115.68461785309951],
    "Airport": [-31.939091610821503, 115.96655132495701]
}

const SYD = {
    "Quay": [-33.86047772953971, 151.2110670199961],
    "Uni": [-33.88810449082193, 151.1871032773295],
}

const CAN = {
    "ACT Government Analytical Laboratory" : [-35.33153716457696, 149.04976620656367],
}

const STRIKE_DATA = [

    // ============================================
    // AU Strike Watch - Data File
    // Events from Disputes Reports:
    //   - 5 August 2026
    //   - 2 September 2026
    //   - 9 September 2026
    // Each entry includes: actionId (for grouping), tags (array),
    // locations with state, named sources.
    // ============================================
        // ============================================
        // 5 AUGUST 2026 REPORT
        // ============================================

        // ASMOF Vic - Public hospital doctors (initial phase)
        {
            id: 100,
            actionId: "vic-doctors-strike",
            title: "Victorian Public Hospital Doctors Announce First Strike in 20 Years",
            union: "ASMOF Vic",
            industry: "Healthcare",
            type: "planned",
            startDate: "2026-08-13",
            endDate: "2026-08-13",
            workers: null,
            description: "Doctors to strike 12:30-4pm on 13 Aug. 76% voted, 97% in favour. Claims: 30% over 4 years, 12.5h shift cap, doctor-to-patient ratios. Phase one work bans commenced this week.",
            locations: [
                { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Various Melbourne hospitals" }
            ],
            sources: [
                { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
            ]
        },

// AWU Vic - Department of Transport & Planning
{
    id: 101,
    actionId: "awu-vic-dtp",
    title: "AWU DTP Workers Industrial Action",
    union: "AWU Vic",
    industry: "Public Sector",
    type: "strike",
    startDate: "2026-07-23",
    endDate: "",
    workers: null,
    description: "Incident Response workers taking action 7-10am and 4-7pm weekdays. Closing lanes during incidents. Fighting against roster changes and loss of RDOs.",
    tags: ["public-sector", "transport", "victoria", "roads"],
    locations: [
        { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Major arterial roads" }
    ],
    sources: [
        { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
    ]
},

// AMWU/AWU/ETU WA - BHP (initial entry for later escalation)
{
    id: 102,
    actionId: "bhp-hedland",
    title: "BHP Port Hedland Workers Endorse Further Industrial Action",
    union: "AMWU / AWU / ETU",
    industry: "Mining",
    type: "strike",
    startDate: "2026-08-08",
    endDate: "",
    workers: null,
    description: "24-hour ship loading ban on 8 Aug, 24-hour stoppage from 5:30am on 9 Aug. ETU high voltage electricians striking 12 hours on 9 Aug. Negotiations stalled.",
    tags: ["mining", "western-australia", "port-hedland", "industrial-action"],
    locations: [
        { city: "Port Hedland", state: "WA", lat: CITY_COORDS["Port Hedland"][0], lng: CITY_COORDS["Port Hedland"][1], name: "BHP Port Hedland" }
    ],
    sources: [
        { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
    ]
},

// Professionals Australia - ACT Forensic Scientists
{
    id: 103,
    actionId: "act-forensic-scientists",
    title: "ACT Forensic Scientists First Strike",
    union: "Professionals Australia",
    industry: "Public Sector",
    type: "strike",
    startDate: "2026-07-29",
    endDate: "",
    workers: null,
    description: "Two-hour stoppage and march to Legislative Assembly. Demanding hazard allowance. Work bans since 29 June.",
    tags: ["public-sector", "act", "forensic", "science"],
    locations: [
        { city: "Canberra", state: "ACT", lat: CAN["ACT Government Analytical Laboratory"][0], lng: CAN["ACT Government Analytical Laboratory"][1], name: "ACT Government Analytical Laboratory" }
    ],
    sources: [
        { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
    ]
},

// ASU Victoria - Metropolitan Melbourne councils
{
    id: 104,
    actionId: "melb-councils-asu",
    title: "Melbourne Council Workers Stop Work",
    union: "ASU Victoria",
    industry: "Local Government",
    type: "strike",
    startDate: "2026-07-30",
    endDate: "",
    workers: null,
    description: "4-hour stoppage by workers from 8 councils. Rally outside Parliament House. Demands: 10% first year, then 4% annual; rate capping reform.",
    tags: ["local-government", "victoria", "councils", "wages"],
    locations: [
        { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Parliament House" },
        { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Various councils" }
    ],
    sources: [
        { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
    ]
},

// AMOU/MUA QLD - River City Ferries (initial strike)
{
    id: 105,
    actionId: "rivercity-ferries",
    title: "River City Ferries Second Strike Announced",
    union: "AMOU / MUA",
    industry: "Transport",
    type: "strike",
    startDate: "2026-08-07",
    endDate: "",
    workers: null,
    description: "Second strike on 7 Aug 8-10am. First strike on 31 Jul 8-10am. Bosses offered below-inflation increase.",
    tags: ["transport", "ferries", "queensland", "brisbane"],
    locations: [
        { city: "Brisbane", state: "QLD", lat: CITY_COORDS["Brisbane"][0], lng: CITY_COORDS["Brisbane"][1], name: "Brisbane River" }
    ],
    sources: [
        { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
    ]
},

// UWU SA - Arnotts
{
    id: 106,
    actionId: "arnotts-uwu",
    title: "Arnott's Workers Strike for 24 Hours",
    union: "UWU SA",
    industry: "Food Manufacturing",
    type: "strike",
    startDate: "2026-08-04",
    endDate: "",
    workers: 160,
    description: "First strike at Arnott's since 1990s. Wages have fallen behind inflation. KKR private equity owner.",
    tags: ["food-manufacturing", "south-australia", "cost-of-living", "strike"],
    locations: [
        { city: "Adelaide", state: "SA", lat: CITY_COORDS["Adelaide"][0], lng: CITY_COORDS["Adelaide"][1], name: "Arnott's Adelaide" }
    ],
    sources: [
        { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
    ]
},

// NTEU NSW - University of Sydney (initial planned action)
{
    id: 107,
    actionId: "usyd-nteu",
    title: "University of Sydney NTEU Members Plan Stop Work Meeting",
    union: "NTEU",
    industry: "Education",
    type: "planned",
    startDate: "2026-08-10",
    endDate: "",
    workers: null,
    description: "2-hour stop work meeting on 10 Aug to discuss industrial campaign. Bargaining delayed by management.",
    tags: ["education", "university", "nsw", "nteu"],
    locations: [
        { city: "Sydney", state: "NSW", lat: SYD["Uni"][0], lng: SYD["Uni"][1], name: "University of Sydney" }
    ],
    sources: [
        { name: "Disputes Report - August 5", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
    ]
},

// VAHPA - Public sector allied health workers
{
    id: 108,
    actionId: "vahpa-allied-health",
    title: "VAHPA 24-Hour Strike Planned",
    union: "VAHPA",
    industry: "Healthcare",
    type: "planned",
    startDate: "2026-08-11",
    endDate: "",
    workers: null,
    description: "24-hour strike on 11 Aug with rally at Peter MacCallum Cancer Centre. Follows previous strike on 16 June.",
    tags: ["healthcare", "allied-health", "victoria", "strike"],
    locations: [
        { city: "Melbourne", state: "VIC", lat: MELB["Peter MacCallum Cancer Centre"][0], lng: MELB["Peter MacCallum Cancer Centre"][1], name: "Peter MacCallum Cancer Centre" }
    ],
    sources: [
        { name: "Disputes Report - August 5", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
    ]
},

// ANMF SA - Public sector nurses and midwives
{
    id: 109,
    actionId: "anmf-sa-nurses",
    title: "SA Nurses and Midwives Reject Government Offer",
    union: "ANMF SA",
    industry: "Healthcare",
    type: "protest",
    startDate: "2026-08-05",
    endDate: "",
    workers: null,
    description: "Members rejected offer despite leadership recommendation. 67% voted no. Matter referred to SA Employment Tribunal.",
    tags: ["healthcare", "nurses", "midwives", "south-australia"],
    locations: [
        { city: "Adelaide", state: "SA", lat: CITY_COORDS["Adelaide"][0], lng: CITY_COORDS["Adelaide"][1], name: "Various hospitals" }
    ],
    sources: [
        { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
    ]
},

// RTBU - Pacific National
{
    id: 110,
    actionId: "pacific-national-rtbu",
    title: "Pacific National Train Crew Industrial Action",
    union: "RTBU",
    industry: "Rail Transport",
    type: "strike",
    startDate: "2026-08-01",
    endDate: "",
    workers: null,
    description: "48-hour overtime ban from 1 Aug; 24-hour lift up/lay back ban on 3 Aug. Negotiations resume next week.",
    tags: ["rail", "transport", "intermodal", "overtime-ban"],
    locations: [
        { city: "Sydney", state: "NSW", lat: CITY_COORDS["Sydney"][0], lng: CITY_COORDS["Sydney"][1], name: "Pacific National NSW" },
        { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Pacific National VIC" }
    ],
    sources: [
        { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
    ]
},

// ASU SA - City of Port Adelaide Enfield
{
    id: 111,
    actionId: "port-adelaide-enfield-asu",
    title: "Port Adelaide Enfield Council Workers Third Strike",
    union: "ASU SA",
    industry: "Local Government",
    type: "strike",
    startDate: "2026-07-31",
    endDate: "",
    workers: null,
    description: "3-hour stoppage. Fighting unilateral redeployment clause and AI use without consultation.",
    tags: ["local-government", "south-australia", "council", "ai"],
    locations: [
        { city: "Adelaide", state: "SA", lat: CITY_COORDS["Adelaide"][0], lng: CITY_COORDS["Adelaide"][1], name: "City of Port Adelaide Enfield" }
    ],
    sources: [
        { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
    ]
},

// AEU Victoria - Public school teachers
{
    id: 112,
    actionId: "aeu-vic-teachers",
    title: "Victorian Public School Teachers Strike 24 Hours",
    union: "AEU Victoria",
    industry: "Education",
    type: "planned",
    startDate: "2026-08-19",
    endDate: "2026-08-19",
    workers: null,
    description: "Third strike on 19 Aug. Negotiations stalled with new Education Minister.",
    tags: ["education", "teachers", "victoria", "strike"],
    locations: [
        { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Schools across Victoria" }
    ],
    sources: [
        { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
    ]
},

// HACSU Vic - Scope (initial action cancelled by FWC)
{
    id: 113,
    actionId: "scope-hacsu",
    title: "Scope Disability Workers Industrial Action Blocked",
    union: "HACSU Vic",
    industry: "Disability Services",
    type: "strike",
    startDate: "2026-08-04",
    endDate: "2026-08-04",
    workers: null,
    description: "Planned action from 4 Aug to 4 Sep cancelled due to FWC s.418 order. Action not going ahead.",
    tags: ["disability-services", "victoria", "fwc"],
    locations: [
        { city: "Hawthorn", state: "VIC", lat: CITY_COORDS["Hawthorn"][0], lng: CITY_COORDS["Hawthorn"][1], name: "Scope Head Office" }
    ],
    sources: [
        { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
    ]
},

// AWU Victoria - RLA Polymers
{
    id: 114,
    actionId: "rla-polymers-awu",
    title: "RLA Polymers Overtime Ban",
    union: "AWU Victoria",
    industry: "Manufacturing",
    type: "strike",
    startDate: "2026-08-05",
    endDate: "",
    workers: null,
    description: "Unanimous vote for action; started with overtime ban.",
    tags: ["manufacturing", "victoria", "overtime-ban"],
    locations: [
        { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "RLA Polymers" }
    ],
    sources: [
        { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
    ]
},

// UWU WA - ISS Airport screening
{
    id: 115,
    actionId: "perth-airport-iss",
    title: "Perth Airport Screening Officers Continue Stoppages",
    union: "UWU WA",
    industry: "Aviation",
    type: "strike",
    startDate: "2026-08-05",
    endDate: "2026-08-05",
    workers: null,
    description: "More stoppages today. Campaign for pay parity, secure jobs, respectful rostering.",
    tags: ["aviation", "western-australia", "perth", "security"],
    locations: [
        { city: "Perth", state: "WA", lat: PER["Airport"][0], lng: PER["Airport"][1], name: "Perth Airport" }
    ],
    sources: [
        { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
    ]
},

// AMWU Vic - Acciona M&E
{
    id: 116,
    actionId: "acciona-me-amwu",
    title: "Acciona M&E Workers On Strike Indefinitely",
    union: "AMWU Vic",
    industry: "Construction / Infrastructure",
    type: "strike",
    startDate: "2026-07-30",
    endDate: "",
    workers: null,
    description: "Indefinite strike after Acciona refused to finalise bargaining. Rally outside South Melbourne office on 3 Aug.",
    tags: ["construction", "infrastructure", "victoria", "strike"],
    locations: [
        { city: "South Melbourne", state: "VIC", lat: CITY_COORDS["South Melbourne"][0], lng: CITY_COORDS["South Melbourne"][1], name: "Acciona Office" }
    ],
    sources: [
        { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
    ]
},

// MEU - Peabody (lockout abandoned)
{
    id: 117,
    actionId: "peabody-meu",
    title: "Peabody Abandons Third Lockout",
    union: "MEU",
    industry: "Mining",
    type: "resolved",
    startDate: "2026-08-05",
    endDate: "",
    workers: null,
    description: "Peabody abandoned lockout after MEU launched FWC proceedings. Will pay workers for lockout period.",
    tags: ["mining", "coal", "nsw", "lockout"],
    locations: [
        { city: "Newcastle", state: "NSW", lat: CITY_COORDS["Newcastle"][0], lng: CITY_COORDS["Newcastle"][1], name: "Wambo Washery" }
    ],
    sources: [
        { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
    ]
},

// AMWU/ETU Vic - Downer (initial rolling stoppages)
{
    id: 118,
    actionId: "downer-pakenham",
    title: "Downer Rail Depots Commence Rolling Stoppages",
    union: "AMWU / ETU",
    industry: "Rail Maintenance",
    type: "strike",
    startDate: "2026-07-29",
    endDate: "",
    workers: null,
    description: "Rolling stoppages at Pakenham and Calder Park depots. Seeking parity with Metro Trains and V/Line.",
    tags: ["rail-maintenance", "victoria", "strike"],
    locations: [
        { city: "Pakenham", state: "VIC", lat: CITY_COORDS["Pakenham"][0], lng: CITY_COORDS["Pakenham"][1], name: "Pakenham Depot" }
    ],
    sources: [
        { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
    ]
},

// CPSU/MEAA Victoria - Arts Centre Melbourne (PABO Watch)
{
    id: 119,
    actionId: "arts-centre-melb",
    title: "Arts Centre Melbourne Protected Action Ballot",
    union: "CPSU / MEAA",
    industry: "Arts & Culture",
    type: "planned",
    startDate: "2026-07-29",
    endDate: "2026-08-05",
    workers: null,
    description: "Ballot opened 29 July, closes 5 August. Key claims: wages, allowances, leave. MEAA calls for increased government funding.",
    tags: ["arts", "culture", "victoria", "ballot"],
    locations: [
        { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Arts Centre Melbourne" }
    ],
    sources: [
        { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
    ]
},

// TWU - Cleanaway Dandenong
{
    id: 120,
    actionId: "cleanaway-twu",
    title: "Cleanaway Dandenong Workers Vote for Action",
    union: "TWU",
    industry: "Waste Management",
    type: "planned",
    startDate: "2026-08-05",
    endDate: "",
    workers: null,
    description: "Unanimous vote for industrial action. Concerns over intrusive surveillance and safety record (8 deaths since 2022).",
    tags: ["waste-management", "victoria", "safety"],
    locations: [
        { city: "Dandenong", state: "VIC", lat: CITY_COORDS["Dandenong"][0], lng: CITY_COORDS["Dandenong"][1], name: "Cleanaway Dandenong" }
    ],
    sources: [
        { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
    ]
},

// ASU Vic - Service Stream Coliban
{
    id: 121,
    actionId: "service-stream-coliban",
    title: "Service Stream Coliban Workers Vote for Action",
    union: "ASU Vic",
    industry: "Utilities",
    type: "planned",
    startDate: "2026-08-05",
    endDate: "",
    workers: null,
    description: "Unanimous vote for action; contract ending 2027, no pay rise since 2024. Considering bans and stop works.",
    tags: ["utilities", "victoria", "water"],
    locations: [
        { city: "Bendigo", state: "VIC", lat: CITY_COORDS["Bendigo"][0], lng: CITY_COORDS["Bendigo"][1], name: "Coliban Water" }
    ],
    sources: [
        { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
    ]
},

// Wins/resolutions: AMWU/AWU Vic - Viva Oil Refinery
{
    id: 122,
    actionId: "ugl-viva-resolution",
    title: "Viva Oil Refinery Workers Endorse New EBA",
    union: "AMWU / AWU Vic",
    industry: "Oil & Gas",
    type: "resolved",
    startDate: "2026-08-01",
    endDate: "2026-08-03",
    workers: null,
    description: "New agreement endorsed after weeks of action: 11.5% over 3 years, $3000 sign-on, improved allowances.",
    tags: ["oil-gas", "victoria", "eba", "resolved"],
    locations: [
        { city: "Geelong", state: "VIC", lat: COMPANY["Viva"][0], lng: COMPANY["Viva"][1], name: "Viva Oil Refinery" }
    ],
    sources: [
        { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
    ],},
    // === 2 September 2026 Report ===

    // Victorian doctors strike - initial entries
    {
        id: 1,
        actionId: "vic-doctors-strike",
        title: "Victorian Public Hospital Doctors Strike",
        union: "ASMOF Vic",
        state: "Vic",
        industry: "Healthcare",
        type: "strike",
        startDate: "2026-08-20",
        endDate: "",
        workers: null,
        description: "Initial 4-hour stoppages at several Melbourne hospitals. Demands include a 30% pay increase over 4 years.",
        locations: [
            { city: "Royal Melbourne Hospital", lat: CITY_COORDS["Royal Melbourne Hospital"][0], lng: CITY_COORDS["Royal Melbourne Hospital"][1], name: "Royal Melbourne Hospital" },
            { city: "Royal Women's Hospital", lat: CITY_COORDS["Royal Women's Hospital"][0], lng: CITY_COORDS["Royal Women's Hospital"][1], name: "Royal Women's Hospital" },
            { city: "Royal Children's Hospital", lat: CITY_COORDS["Royal Children's Hospital"][0], lng: CITY_COORDS["Royal Children's Hospital"][1], name: "Royal Children's Hospital" }
        ],
        sources: [
            { name: "Disputes Report - 2nd of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-2-september" },
        ]
    },
    {
        id: 2,
        actionId: "vic-doctors-strike",
        title: "Victorian Public Hospital Doctors Strike (expanded)",
        union: "ASMOF Vic",
        state: "VIC",
        industry: "Healthcare",
        type: "strike",
        startDate: "2026-08-25",
        endDate: "",
        workers: null,
        description: "Rolling stoppages expanded to Monash Health, Eastern Health, Northern Health, Mercy Health, Austin Health. Ongoing work bans statewide.",
        locations: [
            { city: "Monash Medical Centre", lat: CITY_COORDS["Monash Medical Centre"][0], lng: CITY_COORDS["Monash Medical Centre"][1], name: "Monash Medical Centre" },
            { city: "Eastern Health Box Hill", lat: CITY_COORDS["Eastern Health Box Hill"][0], lng: CITY_COORDS["Eastern Health Box Hill"][1], name: "Eastern Health Box Hill" }
        ],
        sources: [
            { name: "Disputes Report - 2nd of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-2-september" },
        ]
    },

    // RiverCity Ferries
    {
        id: 3,
        actionId: "rivercity-ferries",
        title: "RiverCity Ferries (CityCat) Strike",
        union: "AMOU / MUA",
        state: "QLD",
        industry: "Transport",
        type: "strike",
        startDate: "2026-08-15",
        endDate: "",
        workers: null,
        description: "Multiple stoppages on Brisbane's CityCat ferries. Demands: 6% wage increase, backpay, improved leave and break conditions.",
        locations: [
            { city: "Brisbane", lat: CITY_COORDS["Brisbane"][0], lng: CITY_COORDS["Brisbane"][1], name: "Brisbane River" }
        ],
        sources: [
            { name: "Disputes Report - 2nd of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-2-september" },
        ]
    },

    // Arts Centre Melbourne
    {
        id: 4,
        actionId: "arts-centre-melb",
        title: "Arts Centre Melbourne Industrial Action",
        union: "CPSU / ETU / MEAA",
        industry: "Arts & Culture",
        type: "strike",
        startDate: "2026-08-13",
        endDate: "",
        workers: null,
        description: "Wages fallen 10% behind inflation; workers opposing 3% wage increase offer.",
        locations: [
            { city: "Melbourne", lat: MELB["Arts Centre"][0], lng: MELB["Arts Centre"][1], name: "Arts Centre Melbourne" }
        ],
        sources: [
            { name: "Disputes Report - 2nd of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-2-september" },
        ],
    },

    // Queensland Rail AMWU/ETU
    {
        id: 5,
        actionId: "qld-rail-amwu-etu",
        title: "Queensland Rail AMWU/ETU Industrial Action",
        union: "AMWU / ETU / RTBU / TSU",
        industry: "Rail Transport",
        type: "strike",
        startDate: "2026-07-01",
        endDate: "",
        workers: null,
        description: "Rolling stoppages and overtime bans affecting maintenance; delays expected.",
        locations: [
            { city: "Brisbane", lat: CITY_COORDS["Brisbane"][0], lng: CITY_COORDS["Brisbane"][1], name: "Queensland Rail Network" }
        ],
        sources: [
            { name: "Disputes Report - 2nd of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-2-september" },
        ]
    },

    // Downer Pakenham
    {
        id: 6,
        actionId: "downer-pakenham",
        title: "Downer Pakenham East Depot Strike",
        union: "AMWU / ETU",
        industry: "Rail Maintenance",
        type: "strike",
        startDate: "2026-07-24",
        endDate: "",
        workers: null,
        description: "Half-day and full-day strikes causing cancellations; workers seek pay parity.",
        locations: [
            { city: "Pakenham", lat: CITY_COORDS["Pakenham"][0], lng: CITY_COORDS["Pakenham"][1], name: "Pakenham East Depot" }
        ],
        sources: [
            { name: "Disputes Report - 2nd of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-2-september" },
        ]
    },

    // QLD Youth Detention Centres
    {
        id: 7,
        actionId: "qld-youth-detention",
        title: "Queensland Youth Detention Centres Strike",
        union: "AWU",
        industry: "Public Sector",
        type: "strike",
        state: "QLD",
        startDate: "2026-08-06",
        endDate: "",
        workers: null,
        description: "8-hour and 24-hour strikes plus work bans; overcrowding concerns.",
        locations: [
            { city: "Brisbane", lat: CITY_COORDS["Brisbane"][0], lng: CITY_COORDS["Brisbane"][1], name: "Brisbane Youth Detention Centre" },
            { city: "Cairns", lat: CITY_COORDS["Cairns"][0], lng: CITY_COORDS["Cairns"][1], name: "Cairns Youth Detention Centre" }
        ],
        sources: [
            { name: "Disputes Report - 2nd of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-2-september" },
        ]
    },

    // University of Melbourne NTEU
    {
        id: 8,
        actionId: "unimelb-nteu",
        title: "University of Melbourne NTEU Strike",
        union: "NTEU",
        industry: "Education",
        type: "strike",
        startDate: "2026-08-13",
        endDate: "",
        workers: null,
        description: "Stop-work meetings and 5-hour strike; claims include 20% wage rise.",
        locations: [
            { city: "Melbourne", lat: MELB["Uni"][0], lng: MELB["Uni"][1], name: "University of Melbourne" }
        ],
        sources: [
            { name: "Disputes Report - 2nd of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-2-september" },
        ]
    },

    // Sydney Ferries MUA
    {
        id: 9,
        actionId: "sydney-ferries",
        title: "Sydney Ferries MUA Strike",
        union: "MUA",
        industry: "Transport",
        type: "strike",
        startDate: "2026-09-02",
        endDate: "",
        workers: null,
        description: "5-hour strike on 2 September; 5% wage increase demand.",
        locations: [
            { city: "Sydney", lat: CITY_COORDS["Sydney"][0], lng: CITY_COORDS["Sydney"][1], name: "Circular Quay" }
        ],
        sources: [
            { name: "Disputes Report - 2nd of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-2-september" },
        ]
    },

    // ACT Public Sector
    {
        id: 10,
        actionId: "act-public-sector",
        title: "ACT Public Sector Industrial Action",
        union: "ASMOF / CFMEU / CPSU / HSU / PPTEU / PA",
        industry: "Public Sector",
        type: "strike",
        startDate: "2026-08-24",
        endDate: "",
        workers: null,
        description: "Sonographers rolling stoppages; CFMEU litter bans; vote no campaign.",
        locations: [
            { city: "Canberra", lat: CITY_COORDS["Canberra"][0], lng: CITY_COORDS["Canberra"][1], name: "ACT Government" }
        ],
        sources: [
            { name: "Disputes Report - 2nd of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-2-september" },
        ]
    },

    // University of Sydney
    {
        id: 11,
        actionId: "usyd-nteu",
        title: "University of Sydney 24-Hour Strike",
        union: "NTEU",
        industry: "Education",
        type: "strike",
        startDate: "2026-09-02",
        endDate: "2026-09-02",
        workers: null,
        description: "24-hour strike with pickets; demands similar to other universities.",
        locations: [
            { city: "Sydney", lat: SYD["Uni"][0], lng: SYD["Uni"][1], name: "University of Sydney" }
        ],
        sources: [
            { name: "Disputes Report - 2nd of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-2-september" },
        ]
    },

    // Service Stream Bendigo
    {
        id: 12,
        actionId: "service-stream-bendigo",
        title: "Service Stream Bendigo Water Workers Strike",
        union: "ASU",
        industry: "Utilities",
        type: "strike",
        startDate: "2026-08-10",
        endDate: "",
        workers: null,
        description: "24-hour strike over pay disparity with Ballarat counterparts.",
        locations: [
            { city: "Bendigo", lat: CITY_COORDS["Bendigo"][0], lng: CITY_COORDS["Bendigo"][1], name: "Bendigo" }
        ],
        sources: [
            { name: "Disputes Report - 2nd of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-2-september" },
        ]
    },

    // NCIG Kooragang Island
    {
        id: 13,
        actionId: "ncig-strike",
        title: "Newcastle Coal Infrastructure Group Strike",
        union: "ETU / MUA",
        industry: "Mining / Coal Export",
        type: "strike",
        startDate: "2026-08-24",
        endDate: "",
        workers: null,
        description: "Stoppages and overtime bans; 20% pay increase claim.",
        locations: [
            { city: "Kooragang Island", lat: CITY_COORDS["Kooragang Island"][0], lng: CITY_COORDS["Kooragang Island"][1], name: "NCIG Terminal" }
        ],
        sources: [
            { name: "Disputes Report - 2nd of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-2-september" },
        ]
    },

    // Together QLD Child Safety
    {
        id: 14,
        actionId: "together-child-safety",
        title: "Queensland Child Safety Workers Industrial Campaign",
        union: "Together",
        industry: "Public Sector",
        type: "protest",
        startDate: "2026-08-05",
        endDate: "",
        workers: null,
        description: "Stickers, posters, email signatures; QIRC application by government.",
        locations: [
            { city: "Brisbane", lat: CITY_COORDS["Brisbane"][0], lng: CITY_COORDS["Brisbane"][1], name: "Parliament House" }
        ],
        sources: [
            { name: "Disputes Report - 2nd of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-2-september" },
        ]
    },

    // Parks Victoria
    {
        id: 15,
        actionId: "parks-victoria",
        title: "Parks Victoria Workers Industrial Action",
        union: "AWU / CPSU",
        industry: "Environment / Parks",
        type: "strike",
        startDate: "2026-08-22",
        endDate: "",
        workers: null,
        description: "Strikes and indefinite bans; parity with public service.",
        locations: [
            { city: "Melbourne", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Various parks" }
        ],
        sources: [
            { name: "Disputes Report - 2nd of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-2-september" },
        ]
    },

    // BHP Port Hedland
    {
        id: 16,
        actionId: "bhp-hedland",
        title: "BHP Port Hedland Industrial Action",
        union: "AMWU / ETU / WMWA",
        industry: "Mining",
        type: "strike",
        startDate: "2026-08-08",
        endDate: "2026-08-08",
        workers: null,
        description: "24-hour ship loading ban and stoppage.",
        locations: [
            { city: "Port Hedland", lat: CITY_COORDS["Port Hedland"][0], lng: CITY_COORDS["Port Hedland"][1], name: "Port Hedland" }
        ],
        sources: [
            { name: "Disputes Report - 2nd of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-2-september" },
        ]
    },

    // === 9 September 2026 Report ===

    // Arts Centre Melbourne update
    {
        id: 17,
        actionId: "arts-centre-melb",
        title: "Arts Centre Melbourne Workers Escalate with 24-Hour Strike",
        union: "CPSU / ETU / MEAA",
        industry: "Arts & Culture",
        type: "strike",
        startDate: "2026-09-03",
        endDate: "2026-09-11",
        workers: null,
        description: "24-hour stop work planned for 11/9. Rally at 6pm at Hamer Hall same day (Friday the 11th) outside Hamer Hall. following stoppages on 3,4,5 September. Picket line at Hamer Hall. Concert by Macy Gray may be disrupted.",
        locations: [
            { city: "Melbourne", lat: MELB["Arts Centre"][0], lng: MELB["Arts Centre"][1], name: "Arts Centre Melbourne" },
            { city: "Melbourne", lat: CITY_COORDS["Hamer Hall"][0], lng: CITY_COORDS["Hamer Hall"][1], name: "Hamer Hall" },
            { city: "Melbourne", lat: CITY_COORDS["Melbourne Town Hall"][0], lng: CITY_COORDS["Melbourne Town Hall"][1], name: "Melbourne Town Hall" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" }
        ],
        tags: ["Support Needed!"]
    },

    // Sydney Ferries update
    {
        id: 18,
        actionId: "sydney-ferries",
        title: "Sydney Ferries: Free Travel and Overtime Bans",
        union: "MUA",
        industry: "Transport",
        type: "strike",
        startDate: "2026-09-11",
        endDate: "",
        workers: null,
        description: "Opal readers switched off from 11/9 to 6/10, overtime bans. Transdev refuses fair deal.",
        locations: [
            { city: "Sydney", lat: CITY_COORDS["Sydney"][0], lng: CITY_COORDS["Sydney"][1], name: "Circular Quay" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" }
        ]
    },

    // Victorian doctors update
    {
        id: 19,
        actionId: "vic-doctors-strike",
        title: "Victorian Doctors Strike Expands to Regional Hospitals",
        union: "ASMOF Vic",
        industry: "Healthcare",
        type: "strike",
        startDate: "2026-09-03",
        endDate: "",
        workers: null,
        description: "Doctors at Ballarat Base Hospital and Bendigo Hospital walked off for 4 hours on 3/9. New work bans from 7/9. Statewide 24-hour strike on 15/9 with rally at Parliament House.",
        locations: [
            { city: "Ballarat", lat: CITY_COORDS["Ballarat Base Hospital"][0], lng: CITY_COORDS["Ballarat Base Hospital"][1], name: "Ballarat Base Hospital" },
            { city: "Bendigo", lat: CITY_COORDS["Bendigo Hospital"][0], lng: CITY_COORDS["Bendigo Hospital"][1], name: "Bendigo Hospital" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" }
        ]
    },

    // RiverCity Ferries update
    {
        id: 20,
        actionId: "rivercity-ferries",
        title: "RiverCity Ferries Strike During RiverFire Festival",
        union: "AMOU / MUA",
        industry: "Transport",
        type: "strike",
        startDate: "2026-09-05",
        endDate: "",
        workers: null,
        description: "24-hour strike on 5/9 during RiverFire; another 24-hour strike planned for 10/9. 90% of workers rejected latest offer.",
        locations: [
            { city: "Brisbane", lat: CITY_COORDS["Brisbane"][0], lng: CITY_COORDS["Brisbane"][1], name: "Brisbane River" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" }
        ]
    },

    // TWU coordinated transport strike
    {
        id: 21,
        actionId: "twu-transport-strike",
        title: "TWU Coordinated Strike at Major Transport Companies",
        union: "TWU",
        industry: "Transport / Logistics",
        type: "strike",
        startDate: "2026-09-10",
        endDate: "",
        workers: null,
        description: "24-hour strike from 4am at FedEx, BorderExpress, K&S, SCT, PFD, Sadliers, Goldstar, Qube. 48-hour strike at K&S ChemTrans. Legal battle with BorderExpress.",
        locations: [
            { city: "Sydney", lat: CITY_COORDS["Sydney"][0], lng: CITY_COORDS["Sydney"][1], name: "Sydney" },
            { city: "Melbourne", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Melbourne" },
            { city: "Brisbane", lat: CITY_COORDS["Brisbane"][0], lng: CITY_COORDS["Brisbane"][1], name: "Brisbane" },
            { city: "Perth", lat: CITY_COORDS["Perth"][0], lng: CITY_COORDS["Perth"][1], name: "Perth" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" }
        ]
    },

    // Downer update
    {
        id: 22,
        actionId: "downer-pakenham",
        title: "Downer Pakenham: Industrial Action Withdrawn for FWC Hearing",
        union: "AMWU / ETU",
        industry: "Rail Maintenance",
        type: "strike",
        startDate: "2026-08-31",
        endDate: "",
        workers: null,
        description: "Unions applied for assisted bargaining and withdrew all industrial action as good faith. FWC hearing scheduled 8/9. Trains may resume normal service.",
        locations: [
            { city: "Pakenham", lat: CITY_COORDS["Pakenham"][0], lng: CITY_COORDS["Pakenham"][1], name: "Pakenham East Depot" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" }
        ]
    },

    // Overnewton Anglican Community College
    {
        id: 23,
        actionId: "overnewton-college",
        title: "Overnewton Anglican Community College Teachers' Dispute",
        union: "IEU Vic",
        industry: "Education",
        type: "strike",
        startDate: "2026-09-08",
        endDate: "2026-09-17",
        workers: null,
        description: "Work bans from 8/9, 4-hour strike on 17/9. Demands: 37% pay increase over 3 years and $5000 healthcare allowance.",
        locations: [
            { city: "Keilor", lat: CITY_COORDS["Keilor"][0], lng: CITY_COORDS["Keilor"][1], name: "Overnewton College" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" }
        ]
    },

    // Adelaide Catholic Schools
    {
        id: 24,
        actionId: "adelaide-catholic-schools",
        title: "Adelaide Catholic Schools Teachers' Industrial Action",
        union: "IEU SA",
        industry: "Education",
        type: "strike",
        startDate: "2026-09-04",
        endDate: "",
        workers: null,
        description: "Action at 17 schools; Cardijn College full-day strike on 4/9. Demands: 6% annual pay rises over 3 years, workload action.",
        locations: [
            { city: "Adelaide", lat: CITY_COORDS["Adelaide"][0], lng: CITY_COORDS["Adelaide"][1], name: "Various Catholic schools" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" }
        ]
    },

    // Scope HACSU
    {
        id: 25,
        actionId: "scope-hacsu",
        title: "Scope Disability Workers Rally",
        union: "HACSU",
        industry: "Disability Services",
        type: "protest",
        startDate: "2026-09-11",
        endDate: "",
        workers: null,
        description: "Workers to walk off job and rally at Scope Head Office, Hawthorn over pay and accessible transport cuts.",
        locations: [
            { city: "Hawthorn", lat: CITY_COORDS["Hawthorn"][0], lng: CITY_COORDS["Hawthorn"][1], name: "Scope Head Office" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" }
        ]
    },

    // Quantem MUA
    {
        id: 26,
        actionId: "quantem-mua",
        title: "Quantem Stand Down and Rallies",
        union: "MUA Vic",
        industry: "Fuel Port Operations",
        type: "scab",
        startDate: "2026-09-02",
        endDate: "",
        workers: null,
        description: "Entire workforce stood down; scabs flown in. Rallies at Port Melbourne on 2,5,8 September.",
        locations: [
            { city: "Port Melbourne", lat: MELB["Quantem"][0], lng: MELB["Quantem"][1], name: "Quantem Terminal" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" }
        ]
    },

    // DOF Offshore Alliance
    {
        id: 27,
        actionId: "dof-offshore",
        title: "DOF ROV Workers Resume Industrial Action",
        union: "Offshore Alliance",
        industry: "Offshore Energy",
        type: "scab",
        startDate: "2026-09-02",
        endDate: "",
        workers: null,
        description: "Workers recommenced action after earlier disputes. DOF trying to recruit overseas scabs and filed for intractable bargaining.",
        locations: [
            { city: "Perth", lat: PER["Ocean"][0], lng: PER["Ocean"][1], name: "DOF Base" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" }
        ]
    },

    // Youth detention update
    {
        id: 28,
        actionId: "qld-youth-detention",
        title: "Queensland Youth Detention Escalating Strikes",
        union: "AWU",
        industry: "Public Sector",
        type: "strike",
        startDate: "2026-09-02",
        endDate: "",
        workers: null,
        description: "24-hour strike on 2/9, then 12-hour stoppage on 7/9 starting 7 days of rolling stoppages. Government applied for QIRC conciliation.",
        locations: [
            { city: "Brisbane", lat: CITY_COORDS["Brisbane"][0], lng: CITY_COORDS["Brisbane"][1], name: "Brisbane Youth Detention Centre" },
            { city: "Cairns", lat: CITY_COORDS["Cairns"][0], lng: CITY_COORDS["Cairns"][1], name: "Cairns Youth Detention Centre" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" }
        ]
    },

    // Secure Journeys
    {
        id: 29,
        actionId: "secure-journeys",
        title: "Immigration Detention Workers Strike",
        union: "UWU",
        industry: "Detention Services",
        type: "strike",
        startDate: "2026-09-08",
        endDate: "",
        workers: null,
        description: "4-hour strike from 10am to 2pm. 92% no vote against offer. Safety concerns due to job cuts.",
        locations: [
            { city: "Sydney", lat: CITY_COORDS["Sydney"][0], lng: CITY_COORDS["Sydney"][1], name: "Detention Centre" },
            { city: "Melbourne", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Detention Centre" },
            { city: "Brisbane", lat: CITY_COORDS["Brisbane"][0], lng: CITY_COORDS["Brisbane"][1], name: "Detention Centre" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" }
        ]
    },

    // Melbourne metropolitan councils
    {
        id: 30,
        actionId: "melb-councils-asu",
        title: "Melbourne Councils Industrial Action",
        union: "ASU Victoria",
        industry: "Local Government",
        type: "strike",
        startDate: "2026-09-09",
        endDate: "2026-09-11",
        workers: null,
        description: "Action at Hume, Merri-bek, Greater Dandenong councils affecting rubbish collection and libraries.",
        locations: [
            { city: "Broadmeadows", lat: CITY_COORDS["Broadmeadows"][0], lng: CITY_COORDS["Broadmeadows"][1], name: "Hume City Council" },
            { city: "Coburg", lat: CITY_COORDS["Coburg"][0], lng: CITY_COORDS["Coburg"][1], name: "Merri-bek Council" },
            { city: "Dandenong", lat: CITY_COORDS["Dandenong"][0], lng: CITY_COORDS["Dandenong"][1], name: "Greater Dandenong Council" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" }
        ]
    },

    // Fire Rescue Victoria
    {
        id: 31,
        actionId: "frv-ufu",
        title: "Fire Rescue Victoria Pay Dispute Rally",
        union: "UFU Vic",
        industry: "Emergency Services",
        type: "protest",
        startDate: "2026-09-07",
        endDate: "",
        workers: null,
        description: "Rally outside Premier's office in Niddrie. Demands 25% pay increase over 3 years. No pay rise for ~5 years.",
        locations: [
            { city: "Niddrie", lat: CITY_COORDS["Niddrie"][0], lng: CITY_COORDS["Niddrie"][1], name: "Premier's Electorate Office" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" }
        ]
    },

    // ICS Tenacious
    {
        id: 32,
        actionId: "ics-tenacious",
        title: "ICS Tenacious Bunkering Tanker Industrial Action",
        union: "MUA Vic",
        industry: "Maritime",
        type: "strike",
        startDate: "2026-09-06",
        endDate: "",
        workers: null,
        description: "MUA members on bunkering tanker taking industrial action.",
        locations: [
            { city: "Melbourne", lat: MELB["Port"][0], lng: MELB["Port"][1], name: "Port Melbourne" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" }
        ]
    },

    // CFMEU ACT GSOs
    {
        id: 33,
        actionId: "act-cfmeu-gso",
        title: "CFMEU GSOs Rubbish Collection Bans Continue",
        union: "CFMEU ACT",
        industry: "Public Sector",
        type: "strike",
        startDate: "2026-09-05",
        endDate: "",
        workers: null,
        description: "Weekend bans on rubbish collection continue; fifth weekend in a row. Tuggeranong involved for first time.",
        locations: [
            { city: "Tuggeranong", lat: CITY_COORDS["Tuggeranong"][0], lng: CITY_COORDS["Tuggeranong"][1], name: "Tuggeranong" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" }
        ]
    },

    // Lumus Imaging
    {
        id: 34,
        actionId: "lumus-imaging",
        title: "Lumus Imaging Nurses Industrial Action",
        union: "ANMF Vic",
        industry: "Healthcare",
        type: "strike",
        startDate: "2026-09-07",
        endDate: "",
        workers: null,
        description: "Nurses fighting for additional 11% on top of 15.24% over 4 years offered.",
        locations: [
            { city: "Melbourne", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Various imaging sites" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" }
        ]
    },

    // VAHPA allied health
    {
        id: 35,
        actionId: "vahpa-allied-health",
        title: "VAHPA 'Four Weeks to Fix It' Campaign",
        union: "VAHPA",
        industry: "Healthcare",
        type: "protest",
        startDate: "2026-09-07",
        endDate: "",
        workers: null,
        description: "Campaign to get fair deal for public allied health workers before election. Coordinated action each week; starting with emailing MPs.",
        locations: [
            { city: "Melbourne", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Various hospitals" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" }
        ]
    },

    // National Patient Transport
    {
        id: 36,
        actionId: "npt-vau",
        title: "National Patient Transport Workers Strike",
        union: "VAU",
        industry: "Healthcare / Patient Transport",
        type: "strike",
        startDate: "2026-09-04",
        endDate: "",
        workers: null,
        description: "Stop-work actions, overtime bans, not collecting billing details, not refuelling ambulances. Demand 8% pay increase.",
        locations: [
            { city: "Melbourne", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Various" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" }
        ]
    },

    // TasPorts
    {
        id: 37,
        actionId: "tasports-mua",
        title: "TasPorts MUA Industrial Action",
        union: "MUA Tasmania",
        industry: "Ports",
        type: "strike",
        startDate: "2026-09-12",
        endDate: "",
        workers: null,
        description: "Industrial action to commence 6am on 12/9. Fighting for decent EBA.",
        locations: [
            { city: "Hobart", lat: CITY_COORDS["Hobart"][0], lng: CITY_COORDS["Hobart"][1], name: "Hobart Port" },
            { city: "Burnie", lat: CITY_COORDS["Burnie"][0], lng: CITY_COORDS["Burnie"][1], name: "Burnie Port" },
            { city: "Devonport", lat: CITY_COORDS["Devonport"][0], lng: CITY_COORDS["Devonport"][1], name: "Devonport Port" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" }
        ]
    },

    // Jetstar ballot
    {
        id: 38,
        actionId: "jetstar-asu",
        title: "Jetstar Workers Vote for Industrial Action",
        union: "ASU",
        industry: "Aviation",
        type: "planned",
        startDate: "2026-09-09",
        endDate: "",
        workers: null,
        description: "82% turnout, 99% yes vote for action. No dates announced yet.",
        locations: [
            { city: "Melbourne", lat: COMPANY["Jetstar"][0], lng: COMPANY["Jetstar"][1], name: "Jetstar HQ" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" }
        ]
    },

    // Premier Coal
    {
        id: 39,
        actionId: "premier-coal",
        title: "Premier Coal Workers Vote for Action",
        union: "AMWU / MEU",
        industry: "Mining",
        type: "planned",
        startDate: "2026-09-09",
        endDate: "",
        workers: null,
        description: "Workers at Collie mine vote in favour of action. Focus on pay and redundancy entitlements as mine transitions.",
        locations: [
            { city: "Collie", lat: CITY_COORDS["Collie"][0], lng: CITY_COORDS["Collie"][1], name: "Premier Coal Mine" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" }
        ]
    }
];

// Export globally
window.STRIKE_DATA = STRIKE_DATA;
window.CITY_COORDS = CITY_COORDS;
