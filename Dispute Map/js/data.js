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
    "Viva":[-38.07680767751296, 144.37967195955835], //Oil refinery
    "Pacific National": {
        "NSW":[-33.840659007925886, 151.2059929824021],
        "VIC":[-37.802469240892684, 144.91788990626077],
    },
    "Alcoa": {
        "WA":[-32.03623881672403, 115.83298262212477]
    },
    "Nissan Casting": [-38.02148284314224, 145.2165257516094],
}

const MELB = {
    "Port": [-37.84192, 144.9234],
    "Quantem": [-37.8174, 144.9077],
    "Arts Centre": [-37.821456413674404, 144.96882381429486],
    "Trades Hall": [-37.80654107023885, 144.96625939962078],
    "Town Hall": [-37.816106117492154, 144.9670850824903],
    "Uni":[-37.79840685767232, 144.96095388740878],
    "Peter MacCallum Cancer Centre": [-37.80026478320679, 144.95671662077825],
    "RLA Polymers": [-37.817593111961365, 145.305556385398],
    "Overnewton College":[-37.706363106002726, 144.8216275455058],
    "Secure Journeys Melbourne": [-37.68409443780323, 144.94450175001506]
}

const BRIS = {
    "Mater Hospital Brisbane" : [-27.486102725716407, 153.02784104315765],
    "Secure Journeys Brisbane": [-27.422621424649737, 153.1022575959132]
}

const PER = {
    "Ocean": [-32.06461197040717, 115.68461785309951],
    "Airport": [-31.939091610821503, 115.96655132495701]
}

const SYD = {
    "Quay": [-33.86047772953971, 151.2110670199961],
    "Uni": [-33.88810449082193, 151.1871032773295],
    "Northern Beaches": [-33.670256518987316, 151.31802318697055],
    "QANTAS": [-33.92548617476988, 151.18660150979397],
}

const MINE = {
    "Wambo": [-32.58159379060998, 151.01065361676308]
}

const REF = { //refinerys
    "Townsville Copper": [-19.253381711248775, 146.83341807654375]
}

const CAN = {
    "ACT Government Analytical Laboratory" : [-35.33153716457696, 149.04976620656367],
}

const SA = {
    "Service Stream SA": [-34.860410821670975, 138.5680181935495]
}

const WA ={
    "Varanus Island": [-20.393, 115.3427]
}
const STRIKE_DATA = [


    // MEU - Peabody (lockout abandoned)
    {
        id: 317,
        actionId: "peabody-meu",
        title: "Peabody Abandons Third Lockout",
        union: "MEU",
        industry: "Mining",
        type: "resolved",
        startDate: "2026-08-05",
        endDate: "2026-08-13",
        state:"NSW",
        workers: 19,
        description: "Peabody lockout and pay dispute resolves in favour of MEU workers",

        locations: [
            { city: "Newcastle", state: "NSW", lat: MINE["Wambo"][0], lng: MINE["Wambo"][1], name: "Wambo Washery" }
        ],
        sources: [
            { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" },
            { name: "MEU - Peabody locks out Wambo Washery Workers", url: "https://meu.org.au/peabody-locks-out-wambo-washery-workers/"},
            { name: "MEU - SOLIDARITY WINS: PEABODY WORKERS DEFEAT ENERGY GIANT’S LOCKOUTS AND WIN FAIR DEAL", url: "https://meu.org.au/peabody-wambo-workers-defeat-lockouts-win-fair-deal/"},
        ]
    },

    // ============================================
    // 29 JULY 2026 REPORT
    // ============================================

    // ACT Public Sector (rejection of offer)
    {
        id: 200,
        actionId: "act-public-sector",
        title: "ACT Public Sector Unions Reject New Offer",
        union: "AEU / ANMF / CFMEU / CPSU",
        industry: "Public Sector",
        type: "planned",
        startDate: "2026-07-20",
        endDate: "",
        workers: null,
        description: "Unions reject 9% over 3 years offer. 66% CPSU members voted no; CFMEU GSOs unanimous rejection. Vote no campaign to be run.",

        locations: [
            { city: "Canberra", state: "ACT", lat: CITY_COORDS["Canberra"][0], lng: CITY_COORDS["Canberra"][1], name: "ACT Government" }
        ],
        sources: [
            { name: "Disputes Report - July 29", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-29-july" }
        ]
    },

// AWU/ETU QLD - Glencore
{
    id: 201,
    actionId: "glencore-townsville",
    title: "Glencore Townsville Copper Refinery Workers Reject Offer",
    union: "AWU / ETU",
    industry: "Mining",
    type: "strike",
    startDate: "2026-03-01",
    endDate: "",
    workers: null,
    description: "After 18 months bargaining, workers rejected 12% over 4 years. Struck for 4 hours and partial bans in March. New draft even worse.",

    locations: [
        { city: "Townsville", state: "QLD", lat: REF["Townsville Copper"][0], lng: REF["Townsville Copper"][1], name: "Townsville Copper Refinery" }
    ],
    sources: [
        { name: "Disputes Report - July 29", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-29-july" }
    ]
},

// AEU Victoria - Public school teachers (second strike)
{
    id: 202,
    actionId: "aeu-vic-teachers",
    title: "Victorian Teachers Hold Second 24-Hour Strike",
    union: "AEU Victoria",
    industry: "Education",
    type: "strike",
    startDate: "2026-07-23",
    endDate: "2026-07-23",
    workers: null,
    description: "Second 24-hour strike this year. Rally at Bourke Street Mall then Parliament House. Negotiations stalled.",

    locations: [
        { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Schools across Victoria" }
    ],
    sources: [
        { name: "Disputes Report - July 29", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-29-july" }
    ]
},

// RTBU NSW - Keolis Downer (action paused)
{
    id: 203,
    actionId: "keolis-downer-rtbu",
    title: "Keolis Downer Bus Action Paused for Negotiations",
    union: "RTBU NSW",
    industry: "Transport",
    type: "resolved",
    startDate: "2026-07-29",
    endDate: "",
    workers: null,
    description: "Industrial action on Northern Beaches buses to stop for 8 weeks while wage negotiations continue.",

    locations: [
        { city: "Sydney", state: "NSW", lat: SYD["Northern Beaches"][0], lng: SYD["Northern Beaches"][1], name: "Northern Beaches" }
    ],
    sources: [
        { name: "Disputes Report - July 29", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-29-july" }
    ]
},

// MEU - Peabody (lockout)
{
    id: 204,
    actionId: "peabody-meu",
    title: "Peabody Workers Locked Out Again at Wambo Washery",
    union: "MEU",
    industry: "Mining",
    type: "lockout",
    startDate: "2026-07-15",
    endDate: "",
    workers: null,
    description: "Another 14-day lockout. 3 months in dispute, 18 bargaining meetings. CEO got 29% increase.",


    locations: [
        { city: "Newcastle", state: "NSW", lat: MINE["Wambo"][0], lng: MINE["Wambo"][1], name: "Wambo Washery" }
    ],
    sources: [
        { name: "Disputes Report - July 29", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-29-july" }
    ]
},

// VAHPA - Allied health workers (3-hour strike)
{
    id: 205,
    actionId: "vahpa-allied-health",
    title: "Allied Health Workers 3-Hour Stop Work",
    union: "VAHPA",
    industry: "Healthcare",
    type: "strike",
    startDate: "2026-07-23",
    endDate: "2026-07-23",
    workers: 1000,
    description: "Around 1000 workers across public hospitals stopped work for 3 hours. Rejected 19-21% offer; demand 36% over 3 years.",

    locations: [
        { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Various public hospitals" }
    ],
    sources: [
        { name: "Disputes Report - July 29", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-29-july" }
    ]
},

// Mater Hospital maintenance workers
{
    id: 206,
    actionId: "mater-hospital-qld",
    title: "Mater Hospital Maintenance Workers Take Action",
    union: "AMWU / CFMEU / ETU / PPTEU",
    industry: "Healthcare",
    type: "strike",
    startDate: "2026-07-21",
    endDate: "2026-07-21",
    workers: null,
    state:"QLD",
    description: "Industrial action at Mater Hospital Brisbane over EBA. Negotiations 9+ months.",
    locations: [
        { city: "Brisbane", state: "QLD", lat: BRIS["Mater Hospital Brisbane"][0], lng: BRIS["Mater Hospital Brisbane"][1], name: "Mater Hospital" }
    ],
    sources: [
        { name: "Disputes Report - July 29", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-29-july" }
    ]
},

// UWU - Secure Journeys (weekend stoppages)
{
    id: 207,
    actionId: "secure-journeys",
    title: "Secure Journeys Detention Workers Weekend Stoppages",
    union: "UWU",
    industry: "Detention Services",
    type: "strike",
    startDate: "2026-07-25",
    endDate: "2026-07-26",
    workers: null,
    description: "Stoppages at Melbourne and Brisbane centres on 25-26 July. Safety concerns for workers and detainees.",

    locations: [
        { city: "Melbourne", state: "VIC", lat: MELB["Secure Journeys Melbourne"][0], lng: MELB["Secure Journeys Melbourne"][1], name: "Melbourne Immigration Detention Centre" },
        { city: "Brisbane", state: "QLD", lat: BRIS["Secure Journeys Brisbane"][0], lng: BRIS["Secure Journeys Brisbane"][1], name: "Brisbane Immigration Detention Centre" }
    ],
    sources: [
        { name: "Disputes Report - July 29", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-29-july" }
    ]
},

// CEPU SA - Service Stream
{
    id: 208,
    actionId: "service-stream-sa-cepu",
    title: "Service Stream SA Stoppages Continue",
    union: "CEPU SA",
    industry: "Telecommunications",
    type: "strike",
    startDate: "2026-07-22",
    endDate: "",
    workers: null,
    description: "Day 5 of stoppages. Back at bargaining table after rejecting management's offer.",

    locations: [
        { city: "Adelaide", state: "SA", lat: SA["Service Stream SA"][0], lng: SA["Service Stream SA"][1], name: "Service Stream SA" }
    ],
    sources: [
        { name: "Disputes Report - July 29", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-29-july" }
    ]
},

// MSAV - Public health professionals (planned strike)
{
    id: 209,
    actionId: "msav-public-health",
    title: "MSAV 24-Hour Strike Planned",
    union: "MSAV",
    industry: "Healthcare",
    type: "planned",
    startDate: "2026-07-30",
    endDate: "2026-07-30",
    workers: null,
    description: "24-hour strike planned for 30 July. Originally targeting Bendigo, may shift to Premier Carroll's electorate of Niddrie.",

    locations: [
        { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Various locations" }
    ],
    sources: [
        { name: "Disputes Report - July 29", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-29-july" }
    ]
},

// ASU Victoria - Metropolitan Melbourne council workers (stop work)
{
    id: 210,
    actionId: "melb-councils-asu",
    title: "Melbourne Council Workers Stop Work and Rally",
    union: "ASU Victoria",
    industry: "Local Government",
    type: "strike",
    startDate: "2026-07-30",
    endDate: "2026-07-30",
    workers: null,
    description: "4-hour stoppage (10am-2pm) with rally at Parliament. Demands: 10% first year, 4% annual, rate capping reform.",

    locations: [
        { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Victorian Parliament" }
    ],
    sources: [
        { name: "Disputes Report - July 29", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-29-july" }
    ]
},

// AMWU WA - UGL Alcoa (PABO)
{
    id: 211,
    actionId: "alcoa-ugl-amwu",
    title: "Alcoa Workers Endorse Industrial Action",
    union: "AMWU WA",
    industry: "Manufacturing",
    type: "planned",
    startDate: "2026-07-29",
    endDate: "",
    workers: null,
    description: "92% vote yes in PABO. Negotiations months; company can't afford improved wages. Action imminent.",
    locations: [
        { city: "Perth", state: "WA", lat: COMPANY["Alcoa"]["WA"][0], lng: COMPANY["Alcoa"]["WA"][1], name: "Alcoa WA" }
    ],
    sources: [
        { name: "Disputes Report - July 29", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-29-july" }
    ]
},

// HACSU Vic - Scope (voting on action)
{
    id: 212,
    actionId: "scope-hacsu",
    title: "Scope Disability Workers Voting on Industrial Action",
    union: "HACSU Vic",
    industry: "Disability Services",
    type: "planned",
    startDate: "2026-07-29",
    endDate: "",
    workers: null,
    description: "After 18 months bargaining, members voting on action. Claims: non-contact hours, minimum shift lengths, fair rostering.",

    locations: [
        { city: "Hawthorn", state: "VIC", lat: CITY_COORDS["Hawthorn"][0], lng: CITY_COORDS["Hawthorn"][1], name: "Scope Head Office" }
    ],
    sources: [
        { name: "Disputes Report - July 29", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-29-july" }
    ]
},

// TWU - FedEx (PABO granted)
{
    id: 213,
    actionId: "twu-transport-strike",
    title: "FedEx Protected Action Ballot Granted",
    union: "TWU",
    industry: "Transport / Logistics",
    type: "planned",
    startDate: "2026-07-22",
    endDate: "2026-08-20",
    workers: null,
    description: "FWC granted PABO; ballot closes 20 Aug. Workers voted down offer without job security. Amazon Effect concerns.",

    locations: [
        { city: "Sydney", state: "NSW", lat: CITY_COORDS["Sydney"][0], lng: CITY_COORDS["Sydney"][1], name: "FedEx Sydney" },
        { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "FedEx Melbourne" }
    ],
    sources: [
        { name: "Disputes Report - July 29", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-29-july" }
    ]
},

// RTBU - Pacific National (vote for action)
{
    id: 214,
    actionId: "pacific-national-rtbu",
    title: "Pacific National Intermodal Crew Vote for Action",
    union: "RTBU",
    industry: "Rail Transport",
    type: "planned",
    startDate: "2026-07-29",
    endDate: "",
    workers: null,
    description: "Intermodal train crew voted in favour of industrial action; 90%+ support for most actions.",

    locations: [
        { city: "Sydney", state: "NSW", lat: COMPANY["Pacific National"]["NSW"][0], lng: COMPANY["Pacific National"]["NSW"][1], name: "Pacific National NSW" },
        { city: "Melbourne", state: "VIC", lat: COMPANY["Pacific National"]["VIC"][0], lng: COMPANY["Pacific National"]["VIC"][1], name: "Pacific National VIC" }
    ],
    sources: [
        { name: "Disputes Report - July 29", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-29-july" }
    ]
},

// AMOU/MUA Tasmania - TasPorts (vote for action)
{
    id: 215,
    actionId: "tasports",
    title: "TasPorts Workers Vote for Industrial Action",
    union: "AMOU / MUA / CFMEU Tasmania",
    industry: "Ports",
    type: "planned",
    startDate: "2026-07-29",
    endDate: "",
    workers: null,
    description: "Workers at 11 ports voted for action including 24-hour strikes. Offer below CPI.",

    locations: [
        { city: "Hobart", state: "TAS", lat: CITY_COORDS["Hobart"][0], lng: CITY_COORDS["Hobart"][1], name: "Hobart Port" },
        { city: "Burnie", state: "TAS", lat: CITY_COORDS["Burnie"][0], lng: CITY_COORDS["Burnie"][1], name: "Burnie Port" },
        { city: "Devonport", state: "TAS", lat: CITY_COORDS["Devonport"][0], lng: CITY_COORDS["Devonport"][1], name: "Devonport Port" }
    ],
    sources: [
        { name: "Disputes Report - July 29", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-29-july" }
    ]
},

// CPSU/ETU/MEAA Vic - Arts Centre Melbourne (PABO)
{
    id: 216,
    actionId: "arts-centre-melb",
    title: "Arts Centre Melbourne Workers Vote in PABO",
    union: "CPSU / ETU / MEAA",
    industry: "Arts & Culture",
    type: "planned",
    startDate: "2026-07-29",
    endDate: "",
    workers: null,
    description: "Protected action ballot currently underway. Workers ready to fight for above 3% wage cap.",

    locations: [
        { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Arts Centre Melbourne" }
    ],
    sources: [
        { name: "Disputes Report - July 29", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-29-july" }
    ]
},
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
    state: "WA",
    description: "24-hour ship loading ban on 8 Aug, 24-hour stoppage from 5:30am on 9 Aug. ETU high voltage electricians striking 12 hours on 9 Aug. Negotiations stalled.",

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
    state: "ACT",
    workers: null,
    description: "Two-hour stoppage and march to Legislative Assembly. Demanding hazard allowance. Work bans since 29 June.",

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
    startDate: "2026-06-31",
    endDate: "",
    state:"QLD",
    workers: null,
    description: "Second strike on 7 Aug 8-10am. First strike on 31 Jul 8-10am. Bosses offered below-inflation increase.",
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
    state:"SA",
    description: "First strike at Arnott's since 1990s. Wages have fallen behind inflation. KKR private equity owner.",

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
    state:"NSW",
    workers: null,
    description: "2-hour stop work meeting on 10 Aug to discuss industrial campaign. Bargaining delayed by management.",

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
    state: "VIC",
    description: "24-hour strike on 11 Aug with rally at Peter MacCallum Cancer Centre. Follows previous strike on 16 June.",

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
    state:"SA",
    description: "Members rejected offer despite leadership recommendation. 67% voted no. Matter referred to SA Employment Tribunal.",
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

    locations: [
        { city: "Sydney", state: "NSW", lat: COMPANY["Pacific National"]["NSW"][0], lng: COMPANY["Pacific National"]["NSW"][1], name: "Pacific National NSW" },
        { city: "Melbourne", state: "VIC", lat: COMPANY["Pacific National"]["VIC"][0], lng: COMPANY["Pacific National"]["VIC"][1], name: "Pacific National VIC" }
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
    state:"SA",
    description: "3-hour stoppage. Fighting unilateral redeployment clause and AI use without consultation.",

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
    title: "Victorian Public School Teachers met and voted to Strike for 24 Hours",
    union: "AEU Victoria",
    industry: "Education",
    type: "planned",
    startDate: "2026-07-31",
    endDate: "2026-07-31",
    workers: null,
    state:"VIC",
    description: "Third strike planned on 19 Aug. Negotiations stalled with new Education Minister.",

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
    state:"VIC",
    description: "Planned action from 4 Aug to 4 Sep cancelled due to FWC s.418 order. Action not going ahead.",

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
    state:"VIC",
    description: "Unanimous vote for action; started with overtime ban.",

    locations: [
        { city: "Melbourne", state: "VIC", lat: MELB["RLA Polymers"][0], lng: MELB["RLA Polymers"][1], name: "RLA Polymers" }
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
    state:"WA",
    description: "More stoppages today. Campaign for pay parity, secure jobs, respectful rostering.",

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
    state:"VIC",
    description: "Indefinite strike after Acciona refused to finalise bargaining. Rally outside South Melbourne office on 3 Aug.",

    locations: [
        { city: "South Melbourne", state: "VIC", lat: CITY_COORDS["South Melbourne"][0], lng: CITY_COORDS["South Melbourne"][1], name: "Acciona Office" }
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
    state:"VIC",
    workers: null,
    description: "Rolling stoppages at Pakenham and Calder Park depots. Seeking parity with Metro Trains and V/Line.",

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
    state:"VIC",
    startDate: "2026-07-29",
    endDate: "2026-08-05",
    workers: null,
    description: "Ballot opened 29 July, closes 5 August. Key claims: wages, allowances, leave. MEAA calls for increased government funding.",

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
    state:"VIC",
    startDate: "2026-08-05",
    endDate: "",
    workers: null,
    description: "Unanimous vote for industrial action. Concerns over intrusive surveillance and safety record (8 deaths since 2022).",

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
    actionId: "service-stream-ASU-coliban",
    title: "Service Stream Coliban Workers Vote for Action",
    union: "ASU Vic",
    industry: "Utilities",
    type: "planned",
    startDate: "2026-08-05",
    endDate: "",
    workers: null,
    state:"VIC",
    description: "Unanimous vote for action; contract ending 2027, no pay rise since 2024. Considering bans and stop works.",

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
    actionId: "ugl-viva-refinery",
    title: "Viva Oil Refinery Workers Endorse New EBA",
    union: "AMWU / AWU Vic",
    industry: "Oil & Gas",
    type: "resolved",
    startDate: "2026-08-01",
    endDate: "2026-08-03",
    workers: null,
    state:"VIC",
    description: "New agreement endorsed after weeks of action: 11.5% over 3 years, $3000 sign-on, improved allowances.",

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
        title: "Queensland Rail Industrial Action",
        union: "AMWU / ETU / RTBU / TSU",
        industry: "Rail Transport",
        type: "strike",
        startDate: "2026-07-01",
        endDate: "",
        workers: 7000,
        description: "Rolling stoppages and overtime bans affecting maintenance; delays expected.",
        locations: [
            { city: "Brisbane", lat: CITY_COORDS["Brisbane"][0], lng: CITY_COORDS["Brisbane"][1], name: "Queensland Rail Network" }
        ],
        sources: [
            { name: "Disputes Report - 2nd of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-2-september" },
            { name: "Wikipedia - 2026 Queensland rail strikes", url:"https://en.wikipedia.org/wiki/2026_Queensland_rail_strikes"},
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
            { city: "Sydney", lat: SYD["Quay"][0], lng: SYD["Quay"][1], name: "Circular Quay" }
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
        title: "University of Sydney Strike",
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
            { city: "Sydney", lat: SYD["Quay"][0], lng: SYD["Quay"][1], name: "Circular Quay" }
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
            { city: "Keilor", lat: MELB["Overnewton College"][0], lng: MELB["Overnewton College"][1], name: "Overnewton College" }
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
            { city: "Melbourne", state: "VIC", lat: MELB["Secure Journeys Melbourne"][0], lng: MELB["Secure Journeys Melbourne"][1], name: "Melbourne Immigration Detention Centre" },
            { city: "Brisbane", state: "QLD", lat: BRIS["Secure Journeys Brisbane"][0], lng: BRIS["Secure Journeys Brisbane"][1], name: "Brisbane Immigration Detention Centre" }
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
        actionId: "lumus-imaging-strike",
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
        title: "National Patient Transport (NPT) Workers Strike",
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
        actionId: "tasports",
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
        endDate: "2026-09-09",
        workers: 900,
        description: "82% turnout, 99% yes vote for action. No dates announced yet.",
        locations: [
            { city: "Melbourne", lat: COMPANY["Jetstar"][0], lng: COMPANY["Jetstar"][1], name: "Jetstar HQ" }
        ],
        sources: [
            { name: "Disputes Report - 9th of September", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-9-september" },
            { name: "ABC News - Jetstar's profits soar as passengers face more fees and workers push for bigger share", url: "https://www.abc.net.au/news/2026-08-18/jetstar-profits-soar-workers-pay-stalls/107002696"}
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
    },
    {
        id: 5000,
        actionId: "hsu-the-department-of-families-fairness-and-housing",
        title: "HSU and The Department of Families, Fairness and Housing - Protected Action Ballot",
        union: "HSU",
        industry: "Other",
        type: "ballot",
        startDate: "2026-09-08",
        endDate: "",
        workers: null,
        description: "Protected action ballot result from Fair Work Commission.",
        locations: [
            {
                city: "Unknown",
                state: "",
                lat: -25.5,
                lng: 134.0,
                name: "The Department of Families, Fairness and Housing"
            }
        ],
        sources: [
            {
                name: "FWC Ballot Result",
                url: "https://www.fwc.gov.au/documents/ballot-results/hsu_20261044.pdf"
            }
        ],
        tags: ["other", "hsu", "fwc-ballot"]
    },
{
    id: 5001,
    actionId: "jetstar-asu",
    title: "ASU and Jetstar Airways Pty Limited - Protected Action Ballot",
    union: "ASU",
    industry: "Other",
    type: "ballot",
    startDate: "2026-09-08",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    locations: [
        {
            city: "Unknown",
            state: "",
            lat: -25.5,
            lng: 134.0,
            name: "Jetstar Airways Pty Limited"
        }
    ],
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/asu_20261041.pdf"
        }
    ],
    tags: ["other", "asu", "fwc-ballot"]
},
{
    id: 5002,
    actionId: "tasports",
    title: "CFMEU and Tasmania Ports Corporation Pty Ltd T/A Tasports - Protected Action Ballot",
    union: "CFMEU",
    industry: "Maritime",
    type: "ballot",
    startDate: "2026-09-08",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    locations: [
        {
            city: "Unknown",
            state: "",
            lat: -25.5,
            lng: 134.0,
            name: "Tasmania Ports Corporation Pty Ltd T/A Tasports"
        }
    ],
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/cfmeu_20261008.pdf"
        }
    ],
    tags: ["maritime", "cfmeu", "fwc-ballot"]
},
{
    id: 5003,
    actionId: "twu-bridgestone-australia-ltd",
    title: "TWU and Bridgestone Australia Ltd - Protected Action Ballot",
    union: "TWU",
    industry: "Other",
    type: "ballot",
    startDate: "2026-09-08",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    locations: [
        {
            city: "Unknown",
            state: "",
            lat: -25.5,
            lng: 134.0,
            name: "Bridgestone Australia Ltd"
        }
    ],
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/twu_20261050.pdf"
        }
    ],
    tags: ["other", "twu", "fwc-ballot"]
},
{
    id: 5004,
    actionId: "premier-coal",
    title: "MEU and Premier Coal Pty Ltd - Protected Action Ballot",
    union: "MEU",
    industry: "Mining",
    type: "ballot",
    startDate: "2026-09-07",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/meu_20261039.pdf"
        }
    ],
    tags: ["mining", "meu", "fwc-ballot"]
},
{
    id: 5006,
    actionId: "sydney-ferries",
    title: "AIMPE and Transdev Sydney Ferries Pty Ltd - Protected Action Ballot",
    union: "AIMPE",
    industry: "Rail Transport",
    type: "ballot",
    startDate: "2026-09-04",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/aimpe_20261035.pdf"
        }
    ],
    tags: ["rail-transport", "aimpe", "fwc-ballot"]
},
{
    id: 5007,
    actionId: "amou-port-of-portland-pty-limited",
    title: "AMOU and Port of Portland Pty Limited - Protected Action Ballot",
    union: "AMOU",
    industry: "Maritime",
    type: "ballot",
    startDate: "2026-09-04",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    locations: [
        {
            city: "Unknown",
            state: "",
            lat: -25.5,
            lng: 134.0,
            name: "Port of Portland Pty Limited"
        }
    ],
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/amou_20261029.pdf"
        }
    ],
    tags: ["maritime", "amou", "fwc-ballot"]
},
{
    id: 5008,
    actionId: "premier-coal",
    title: "AMWU and Premier Coal Pty Ltd - Protected Action Ballot",
    union: "AMWU",
    industry: "Mining",
    type: "ballot",
    startDate: "2026-09-04",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/amwu_20261030.pdf"
        }
    ],
    tags: ["mining", "amwu", "fwc-ballot"]
},
{
    id: 5009,
    actionId: "twu-transport-strike",
    title: "TWU and Qube Logistics (Vic) Pty Ltd - Protected Action Ballot",
    union: "TWU",
    industry: "Transport / Logistics",
    type: "ballot",
    startDate: "2026-09-03",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    locations: [
        {
            city: "Unknown",
            state: "",
            lat: -25.5,
            lng: 134.0,
            name: "Qube Logistics (Vic) Pty Ltd"
        }
    ],
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/twu_20261028.pdf"
        }
    ],
    tags: ["transport-/-logistics", "twu", "fwc-ballot"]
},
{
    id: 5010,
    actionId: "amwu-csl-limited",
    title: "AMWU and CSL Limited - Protected Action Ballot",
    union: "AMWU",
    industry: "Other",
    type: "ballot",
    startDate: "2026-09-03",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    locations: [
        {
            city: "Unknown",
            state: "",
            lat: -25.5,
            lng: 134.0,
            name: "CSL Limited"
        }
    ],
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/amwu_20261027.pdf"
        }
    ],
    tags: ["other", "amwu", "fwc-ballot"]
},
{
    id: 5011,
    actionId: "cepu-csl-limited",
    title: "CEPU and CSL Limited - Protected Action Ballot",
    union: "CEPU",
    industry: "Other",
    type: "ballot",
    startDate: "2026-09-03",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    locations: [
        {
            city: "Unknown",
            state: "",
            lat: -25.5,
            lng: 134.0,
            name: "CSL Limited"
        }
    ],
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/cepu_20261026.pdf"
        }
    ],
    tags: ["other", "cepu", "fwc-ballot"]
},
{
    id: 5012,
    actionId: "overnewton-college",
    title: "IEU and Overnewton Anglican Community College Limited - Protected Action Ballot",
    union: "IEU",
    industry: "Education",
    type: "ballot",
    startDate: "2026-09-02",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    locations: [
        {
            city: "Unknown",
            state: "",
            lat: -25.5,
            lng: 134.0,
            name: "Overnewton Anglican Community College Limited"
        }
    ],
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/ieu_20261010.pdf"
        }
    ],
    tags: ["education", "ieu", "fwc-ballot"]
},
{
    id: 5013,
    actionId: "uwu-bega-dairy-and-drinks-pty-ltd",
    title: "UWU and Bega Dairy and Drinks Pty Ltd - Protected Action Ballot",
    union: "UWU",
    industry: "Other",
    type: "ballot",
    startDate: "2026-09-02",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    locations: [
        {
            city: "Unknown",
            state: "",
            lat: -25.5,
            lng: 134.0,
            name: "Bega Dairy and Drinks Pty Ltd"
        }
    ],
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/uwu_20261015.pdf"
        }
    ],
    tags: ["other", "uwu", "fwc-ballot"]
},
{
    id: 5014,
    actionId: "twu-veolia-recycling-recovery-pty-ltd-veolia-environmental-services-australia-pty-ltd",
    title: "TWU and Veolia Recycling & Recovery Pty Ltd, Veolia Environmental Services (Australia) Pty Ltd - Protected Action Ballot",
    union: "TWU",
    industry: "Other",
    type: "ballot",
    startDate: "2026-09-02",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    locations: [
        {
            city: "Unknown",
            state: "",
            lat: -25.5,
            lng: 134.0,
            name: "Veolia Recycling & Recovery Pty Ltd, Veolia Environmental Services (Australia) Pty Ltd"
        }
    ],
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/twu_20261016.pdf"
        }
    ],
    tags: ["other", "twu", "fwc-ballot"]
},
{
    id: 5015,
    actionId: "twu-bega-dairy-and-drinks-pty-ltd",
    title: "TWU and Bega Dairy and Drinks Pty Ltd - Protected Action Ballot",
    union: "TWU",
    industry: "Other",
    type: "ballot",
    startDate: "2026-09-02",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    locations: [
        {
            city: "Unknown",
            state: "",
            lat: -25.5,
            lng: 134.0,
            name: "Bega Dairy and Drinks Pty Ltd"
        }
    ],
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/twu_20261014.pdf"
        }
    ],
    tags: ["other", "twu", "fwc-ballot"]
},
{
    id: 5016,
    actionId: "cfmeu-mammoet-australia-pty-ltd",
    title: "CFMEU and Mammoet Australia Pty Ltd - Protected Action Ballot",
    union: "CFMEU",
    industry: "Other",
    type: "ballot",
    startDate: "2026-09-01",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    locations: [
        {
            city: "Unknown",
            state: "",
            lat: -25.5,
            lng: 134.0,
            name: "Mammoet Australia Pty Ltd"
        }
    ],
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/cfmeu_2026926.pdf"
        }
    ],
    tags: ["other", "cfmeu", "fwc-ballot"]
},
{
    id: 5017,
    actionId: "cepu-siemens-ltd",
    title: "CEPU and Siemens Ltd - Protected Action Ballot",
    union: "CEPU",
    industry: "Other",
    type: "ballot",
    startDate: "2026-09-01",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    locations: [
        {
            city: "Unknown",
            state: "",
            lat: -25.5,
            lng: 134.0,
            name: "Siemens Ltd"
        }
    ],
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/cepu_20261006.pdf"
        }
    ],
    tags: ["other", "cepu", "fwc-ballot"]
},
{
    id: 5018,
    actionId: "lumus-imaging-strike",
    title: "ANMF and Lumus Imaging (Victoria/Tasmania) Pty Ltd - Protected Action Ballot",
    union: "ANMF",
    industry: "Healthcare",
    type: "ballot",
    startDate: "2026-09-01",
    endDate: "2026-09-01",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/anmf_20261011.pdf"
        }
    ],
    tags: ["healthcare", "anmf", "fwc-ballot"]
},
{
    id: 5019,
    actionId: "amwu-nissan-casting-australia-pty-ltd",
    title: "AMWU and Nissan Casting Australia Pty Ltd - Protected Action Ballot",
    union: "AMWU",
    industry: "Other",
    type: "ballot",
    startDate: "2026-09-01",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    locations: [
        {
            city: "Dandeong, Victoria",
            state: "VIC",
            lat: COMPANY["Nissan Casting"][0],
            lng: COMPANY["Nissan Casting"][1],
            name: "Nissan Casting Australia Pty Ltd"
        }
    ],
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/amwu_2026986.pdf"
        }
    ],
    tags: ["other", "amwu", "fwc-ballot"]
},
{
    id: 5020,
    actionId: "npt-vau",
    title: "VAU and National Patient Transport Pty Ltd - Protected Action Ballot",
    union: "VAU",
    industry: "Maritime",
    type: "ballot",
    startDate: "2026-08-31",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    locations: [
        {
            city: "Unknown",
            state: "",
            lat: -25.5,
            lng: 134.0,
            name: "National Patient Transport Pty Ltd"
        }
    ],
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/vau_2026996.pdf"
        }
    ],
    tags: ["maritime", "vau", "fwc-ballot"]
},
{
    id: 5021,
    actionId: "twu-ceva-logistics-australia-pty-ltd",
    title: "TWU and Ceva Logistics (Australia) Pty Ltd - Protected Action Ballot",
    union: "TWU",
    industry: "Transport / Logistics",
    type: "ballot",
    startDate: "2026-08-31",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    locations: [
        {
            city: "Unknown",
            state: "",
            lat: -25.5,
            lng: 134.0,
            name: "Ceva Logistics (Australia) Pty Ltd"
        }
    ],
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/twu_20261000.pdf"
        }
    ],
    tags: ["transport-/-logistics", "twu", "fwc-ballot"]
},
{
    id: 5022,
    actionId: "awu-service-stream-limited",
    title: "AWU and Service Stream Limited - Protected Action Ballot",
    union: "AWU",
    industry: "Other",
    type: "ballot",
    startDate: "2026-08-28",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    locations: [
        {
            city: "Unknown",
            state: "",
            lat: -25.5,
            lng: 134.0,
            name: "Service Stream Limited"
        }
    ],
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/awu_2026992.pdf"
        }
    ],
    tags: ["other", "awu", "fwc-ballot"]
},
{
    id: 5023,
    actionId: "amwu-south32-worsley-alumina-pty-ltd",
    title: "AMWU and South32 Worsley Alumina Pty Ltd - Protected Action Ballot",
    union: "AMWU",
    industry: "Mining",
    type: "ballot",
    startDate: "2026-08-28",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    locations: [
        {
            city: "Unknown",
            state: "",
            lat: -25.5,
            lng: 134.0,
            name: "South32 Worsley Alumina Pty Ltd"
        }
    ],
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/amwu_2026977.pdf"
        }
    ],
    tags: ["mining", "amwu", "fwc-ballot"]
},
{
    id: 5024,
    actionId: "adelaide-catholic-schools",
    title: "IEU and Catholic Church Endowment Society Incorporated T/A Cardijn College - Protected Action Ballot",
    union: "IEU",
    industry: "Education",
    type: "ballot",
    startDate: "2026-08-27",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    locations: [
        {
            city: "Unknown",
            state: "",
            lat: -25.5,
            lng: 134.0,
            name: "Catholic Church Endowment Society Incorporated T/A Cardijn College"
        }
    ],
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/ieu_2026997.pdf"
        }
    ],
    tags: ["education", "ieu", "fwc-ballot"]
},
    {
        id: 5293,
        actionId: "qld-rail-amwu-etu",
        title: "AMWU and Queensland Rail Transit Authority - Protected Action Ballot",
        union: "AMWU",
        industry: "Rail Transport",
        type: "ballot",
        startDate: "2026-03-23",
        endDate: "",
        workers: null,
        description: "Protected action ballot result from Fair Work Commission.",
        locations: [
            {
                city: "Unknown",
                state: "",
                lat: -25.5,
                lng: 134.0,
                name: "Queensland Rail Transit Authority"
            }
        ],
        sources: [
            {
                name: "FWC Ballot Result",
                url: "https://www.fwc.gov.au/documents/ballot-results/AMWU_2026202.pdf"
            },
            {
                name: "FWC Ballot Result",
                url: "https://www.fwc.gov.au/documents/ballot-results/AMWU_2026203.pdf"
            },
            {
                name: "FWC Ballot Result",
                url: "https://www.fwc.gov.au/documents/ballot-results/AMWU_2026204.pdf"
            },
            {
                name: "FWC Ballot Result",
                url: "https://www.fwc.gov.au/documents/ballot-results/RTBU_2026200.pdf"
            },
                        {
                name: "FWC Ballot Result",
                url: "https://www.fwc.gov.au/documents/ballot-results/CEPU_2026208.pdf"
            },

        ],
        tags: ["rail-transport", "amwu", "fwc-ballot"]
    },
    {
        id: 5297,
        actionId: "qld-rail-amwu-etu",
        title: "CEPU and Queensland Rail - Protected Action Ballot",
        union: "CEPU",
        industry: "Rail Transport",
        type: "ballot",
        startDate: "2026-03-23",
        endDate: "",
        workers: null,
        description: "Protected action ballot result from Fair Work Commission.",
        locations: [
            {
                city: "Unknown",
                state: "",
                lat: -25.5,
                lng: 134.0,
                name: "Queensland Rail"
            }
        ],
        sources: [
            {
                name: "FWC Ballot Result",
                url: "https://www.fwc.gov.au/documents/ballot-results/CEPU_2026209.pdf"
            }
        ],
        tags: ["rail-transport", "cepu", "fwc-ballot"]
    },
{
    id: 5171,
    actionId: "mater-hospital-qld",
    title: "AMWU and Mater Misericordiae Ltd - Protected Action Ballot",
    union: "AMWU",
    industry: "Other",
    type: "ballot",
    startDate: "2026-06-08",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission. ",
    locations: [
        {
            city: "Unknown",
            state: "",
            lat: -25.5,
            lng: 134.0,
            name: "Mater Misericordiae Ltd"
        }
    ],
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/amwu_2026568.pdf"
        }
    ],
    tags: ["other", "amwu", "fwc-ballot"]
},
{
    id: 5178,
    actionId: "mater-hospital-qld",
    title: "PPTEU and Mater - Protected Action Ballot",
    union: "PPTEU",
    industry: "Other",
    type: "ballot",
    startDate: "2026-06-02",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission.",
    locations: [
        {
            city: "Unknown",
            state: "",
            lat: -25.5,
            lng: 134.0,
            name: "Mater"
        }
    ],
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/ppteu_2026553.pdf"
        }
    ],
    tags: ["other", "ppteu", "fwc-ballot"]
},
{
    id: 5179,
    actionId: "mater-hospital-qld",
    title: "CEPU and Mater - Protected Action Ballot",
    union: "CEPU",
    industry: "Other",
    type: "ballot",
    startDate: "2026-06-02",
    endDate: "",
    workers: null,
    description: "Protected action ballot result from Fair Work Commission. ",
    locations: [
        {
            city: "Unknown",
            state: "",
            lat: -25.5,
            lng: 134.0,
            name: "Mater"
        }
    ],
    sources: [
        {
            name: "FWC Ballot Result",
            url: "https://www.fwc.gov.au/documents/ballot-results/cepu_2026552.pdf"
        }
    ],
    tags: ["other", "cepu", "fwc-ballot"]
},
{
    id: 7001,
    actionId: "aeu-vic-teachers",
    title: "Victorian Teachers Reject Offer, Plan 24-Hour Strike",
    union: "AEU Victoria",
    industry: "Education",
    type: "planned",
    startDate: "2026-07-23",
    endDate: "2026-07-23",
    workers: null,
    description: "AEU members rejected government offer (51.81% to 48.82%). 50,677 members voted in straw poll. Strike on 23 July with rally at Bourke Street Mall then Parliament House. Demands include action on workload and class sizes.",
    locations: [
        { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Bourke Street Mall / Parliament House" }
    ],
    sources: [
        { name: "Disputes Report - July 22", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-22-july" }
    ]
        },

        // MUA - Certis (Port Botany gatehouse guards)
        {
            id: 7002,
            actionId: "certis-mua",
            title: "Certis Gatehouse Guards Strike at Port Botany",
            union: "MUA",
            industry: "Ports / Security",
            type: "strike",
            startDate: "2026-07-24",
            endDate: "2026-07-24",
            workers: null,
            description: "Gatehouse guards at DP World Port Botany striking again. In negotiations since late last year, commenced industrial action in May. Certis refusing fair offer. Scabs expected.",
            locations: [
                { city: "Sydney", state: "NSW", lat: CITY_COORDS["Sydney"][0], lng: CITY_COORDS["Sydney"][1], name: "DP World Port Botany" }
            ],
            sources: [
                { name: "Disputes Report - July 22", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-22-july" }
            ]
        },

        // AMWU/AWU/ETU WA - BHP Port Hedland (historic strike)
        {
            id: 7003,
            actionId: "bhp-hedland",
            title: "BHP Port Hedland Workers Hold Historic Strike",
            union: "AMWU / AWU / ETU",
            industry: "Mining",
            type: "strike",
            startDate: "2026-07-23",
            endDate: "2026-07-23",
            workers: null,
            description: "Historic strike at BHP Port Hedland. Union members walked off at 2pm. Solidarity rallies in Melbourne and Brisbane. Negotiations resumed in FWC; talks described as 'constructive'. More action if negotiations stall.",
            locations: [
                { city: "Port Hedland", state: "WA", lat: CITY_COORDS["Port Hedland"][0], lng: CITY_COORDS["Port Hedland"][1], name: "BHP Port Hedland" }
            ],
            sources: [
                { name: "Disputes Report - July 22", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-22-july" }
            ]
        },

        // UWU - ISS Perth Airport (aviation screening officers)
        {
            id: 7004,
            actionId: "perth-airport-iss",
            title: "Perth Airport Screening Officers Strike",
            union: "UWU",
            industry: "Aviation",
            type: "strike",
            startDate: "2026-07-17",
            endDate: "",
            workers: null,
            description: "Aviation screening officers walked off on 17 and 20 July. Paid 13-19% less than interstate counterparts. Insecure rosters (16 hrs/week guaranteed, 4-hr shifts). One proposal already voted down. Demands: pay parity, secure jobs, respectful rostering.",
            locations: [
                { city: "Perth", state: "WA", lat: CITY_COORDS["Perth"][0], lng: CITY_COORDS["Perth"][1], name: "Perth Airport" }
            ],
            sources: [
                { name: "Disputes Report - July 22", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-22-july" }
            ]
        },

        // CPSU Victoria - Parks Victoria (work bans)
        {
            id: 7005,
            actionId: "parks-victoria",
            title: "Parks Victoria Workers Escalate Work Bans",
            union: "CPSU Victoria",
            industry: "Environment / Parks",
            type: "strike",
            startDate: "2026-07-18",
            endDate: "2026-07-27",
            workers: null,
            description: "Work bans from 18-27 July: entrance gates may not unlock, bins not emptied, toilets not cleaned. Pay grades now below minimum wage. Campaign for fair pay.",
            locations: [
                { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Various parks across Victoria" }
            ],
            sources: [
                { name: "Disputes Report - July 22", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-22-july" }
            ]
        },

        // CEPU SA - Service Stream (stoppages)
        {
            id: 7006,
            actionId: "service-stream-sa-cepu",
            title: "Service Stream SA Workers Hold Stoppages",
            union: "CEPU SA",
            industry: "Telecommunications / Defence",
            type: "strike",
            startDate: "2026-07-16",
            endDate: "",
            workers: null,
            description: "Stoppages on 16, 17, 20, 21 July. Agreement voted down. Workers from RAAF Base Edinburgh and Defence Base Woomera walked off. Seeking industry standard wages. Company recently signed $1.6B defence contract.",
            locations: [
                { city: "Adelaide", state: "SA", lat: CITY_COORDS["Adelaide"][0], lng: CITY_COORDS["Adelaide"][1], name: "RAAF Base Edinburgh / Woomera" }
            ],
            sources: [
                { name: "Disputes Report - July 22", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-22-july" }
            ]
        },

        // ANMF Victoria - Public school nurses (ongoing action)
        {
            id: 7007,
            actionId: "anmf-school-nurses",
            title: "Public School Nurses Continue Industrial Action",
            union: "ANMF Victoria",
            industry: "Healthcare / Education",
            type: "strike",
            startDate: "2026-05-01",
            endDate: "",
            workers: null,
            description: "School nurses taking action for over 80 days. Fighting for pay parity with public sector colleagues. Actions include community engagement, media comment, wearing union shirts, displaying campaign messages.",
            locations: [
                { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Various public schools" }
            ],
            sources: [
                { name: "Disputes Report - July 22", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-22-july" }
            ]
        },

        // CPSU ACT - ACT public sector (new offer)
        {
            id: 7008,
            actionId: "act-public-sector",
            title: "ACT Public Sector Workers Polled on New Offer",
            union: "CPSU ACT",
            industry: "Public Sector",
            type: "planned",
            startDate: "2026-07-22",
            endDate: "",
            workers: null,
            description: "New offer: 9% over 3 years, $600 cost of living payment (or $1000 if CPI hits 4%), super to 13%, AI clause, personal leave cap from 7 to 10 days. CPSU polling members until 27 July. Ballot in August.",
            locations: [
                { city: "Canberra", state: "ACT", lat: CITY_COORDS["Canberra"][0], lng: CITY_COORDS["Canberra"][1], name: "ACT Government" }
            ],
            sources: [
                { name: "Disputes Report - July 22", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-22-july" }
            ]
        },

        // CPSU Tasmania - Launceston Reception Prison (industrial action)
        {
            id: 7009,
            actionId: "launceston-prison-cpsu",
            title: "Launceston Prison Officers Take Industrial Action",
            union: "CPSU Tasmania",
            industry: "Corrections",
            type: "strike",
            startDate: "2026-07-14",
            endDate: "2026-07-15",
            workers: null,
            description: "Second action in 3 months. Refused additional prisoners from Hobart, only essential welfare, cancelled non-essential movements. Protesting chronic overcrowding and pest issues (rats in cells).",
            locations: [
                { city: "Launceston", state: "TAS", lat: CITY_COORDS["Launceston"][0], lng: CITY_COORDS["Launceston"][1], name: "Launceston Reception Prison" }
            ],
            sources: [
                { name: "Disputes Report - July 22", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-22-july" }
            ]
        },

        // MSAV - Public health professionals (survey for action)
        {
            id: 7010,
            actionId: "msav-public-health",
            title: "MSAV Members Surveyed on Industrial Action",
            union: "MSAV",
            industry: "Healthcare",
            type: "planned",
            startDate: "2026-07-22",
            endDate: "",
            workers: null,
            description: "Survey sent to members to gauge appetite for action. No revised offer from government despite being advised to expect one. Union signalling escalation.",
            locations: [
                { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Various public health sites" }
            ],
            sources: [
                { name: "Disputes Report - July 22", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-22-july" }
            ]
        },

        // AMWU Victoria - Kinetic buses (action commenced)
        {
            id: 7011,
            actionId: "kinetic-amwu",
            title: "Kinetic Bus Workers Commence Industrial Action",
            union: "AMWU Victoria",
            industry: "Transport",
            type: "strike",
            startDate: "2026-07-20",
            endDate: "",
            workers: null,
            description: "AMWU members at Kinetic buses in Melbourne commenced industrial action after breakdown in negotiations.",
            locations: [
                { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Kinetic depots" }
            ],
            sources: [
                { name: "Disputes Report - July 22", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-22-july" }
            ]
        },

        // ETU WA - UGL Varanus Island (ongoing, scab warning)
        {
            id: 7012,
            actionId: "ugl-varanus-island",
            title: "UGL Varanus Island Industrial Action Continues",
            union: "ETU WA",
            industry: "Oil & Gas",
            type: "strike",
            startDate: "2026-07-01",
            endDate: "",
            workers: null,
            description: "Industrial action continues. ETU warns workers against scab labour through Mobalize, TechForce, Talent HQ, Core Talent. UGL and Santos seeking replacements.",
            locations: [
                { city: "Varanus Island", state: "WA", lat: WA["Varanus Island"][0], lng: WA["Varanus Island"][1], name: "Varanus Island" }
            ],
            sources: [
                { name: "Disputes Report - July 22", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-22-july" }
            ]
        },
//Surly this has finished
// Yep
{ id:701201,
  actionId: "ugl-varanus-island",
  title:"UGL VI EBA Voted up",
  union: "Offshore Alliance",
  industry: "Oil & Gas",
  type: "resolved",
  startDate: "2026-08-19",
  endDate: "2026-08-19",
  workers: null,
  description: "UGL IV EBA voted up",
  locations: [
      { city: "Varanus Island", state: "WA", lat: WA["Varanus Island"][0], lng: WA["Varanus Island"][1], name: "Varanus Island" }
  ],
  sources: [
      { name: "Offshore Alliance FB Post - August 19", url: "https://www.facebook.com/100063786371409/posts/ugl-are-without-doubt-one-of-the-worst-maintenance-contractors-working-in-the-we/1711009564368573/" },
  ],

},

        // ETU QLD - Cleanco Kareeya Power Station (action)
        {
            id: 7013,
            actionId: "cleanco-kareeya",
            title: "Cleanco Kareeya Power Station Workers Take Action",
            union: "ETU QLD",
            industry: "Energy",
            type: "strike",
            startDate: "2026-07-15",
            endDate: "",
            workers: null,
            description: "Industrial action at Kareeya Power Station. Follows action at Barron Gorge in June. Fighting against hostile bargaining framework of Crisafulli Government. Cleanco is state government owned.",
            locations: [
                { city: "Cairns", state: "QLD", lat: CITY_COORDS["Cairns"][0], lng: CITY_COORDS["Cairns"][1], name: "Kareeya Power Station" }
            ],
            sources: [
                { name: "Disputes Report - July 22", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-22-july" }
            ]
        },

        // QNMU - Bethany Christian Care (action commenced)
        {
            id: 7014,
            actionId: "bethany-christian-care",
            title: "Bethany Christian Care Workers Commence Industrial Action",
            union: "QNMU",
            industry: "Aged Care",
            type: "strike",
            startDate: "2026-07-16",
            endDate: "",
            workers: null,
            description: "Industrial action commenced. Management offer not good enough; workers fighting for fair agreement.",
            locations: [
                { city: "Brisbane", state: "QLD", lat: CITY_COORDS["Brisbane"][0], lng: CITY_COORDS["Brisbane"][1], name: "Bethany Christian Care" }
            ],
            sources: [
                { name: "Disputes Report - July 22", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-22-july" }
            ]
        },

        // MUA WA - Port of Broome (PABO endorsed)
        {
            id: 7015,
            actionId: "port-broome-mua",
            title: "Port of Broome Workers Endorse Industrial Action",
            union: "MUA WA",
            industry: "Ports",
            type: "planned",
            startDate: "2026-07-24",
            endDate: "",
            workers: null,
            description: "100% of MUA members endorsed industrial action. Action kicks off 24 July.",
            locations: [
                { city: "Broome", state: "WA", lat: -17.9614, lng: 122.2353, name: "Port of Broome" }
            ],
            sources: [
                { name: "Disputes Report - July 22", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-22-july" }
            ]
        },

        // AIPA - Qantas (PABO vote)
        {
            id: 7016,
            actionId: "qantas-aipa",
            title: "Qantas Pilots to Vote in Protected Action Ballot",
            union: "AIPA",
            industry: "Aviation",
            type: "planned",
            startDate: "2026-07-29",
            endDate: "",
            workers: null,
            description: "AIPA members to vote in PABO next week. Negotiations ongoing for 2 years. Pilots rejected Qantas offer in April. Seeking work-life balance and pay rise above 3%. Long-haul pilots haven't taken action for 15 years.",
            locations: [
                { city: "Sydney", state: "NSW", lat: SYD["QANTAS"][0], lng: SYD["QANTAS"][1], name: "Qantas" }
            ],
            sources: [
                { name: "Disputes Report - July 22", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-22-july" }
            ]
        },

        // Resolution: AWU/ETU/MUA - Inpex (agreement endorsed)
        {
            id: 7017,
            actionId: "inpex-resolution",
            title: "Inpex Workers Endorse New Agreement",
            union: "AWU / ETU / MUA",
            industry: "Oil & Gas",
            type: "resolved",
            startDate: "2026-07-22",
            endDate: "2026-07-22",
            workers: null,
            description: "97.3% participation, 97.5% voted in favour. Agreement includes highest remuneration among Tier-1 operators, career progression, 20 job share positions, additional leave, improved fatigue management. Unions estimate action cost Inpex $200 million.",
            locations: [
                { city: "Darwin", state: "NT", lat: CITY_COORDS["Darwin"][0], lng: CITY_COORDS["Darwin"][1], name: "Inpex" }
            ],
            sources: [
                { name: "Disputes Report - July 22", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-22-july" }
            ]
        },
{
    id: 8001,
    actionId: "dxc-asu-professionals-australia",
    title: "DXC Workers Commence Stop Work Actions",
    union: "ASU / Professionals Australia",
    industry: "IT Services",
    type: "strike",
    startDate: "2026-07-01",
    endDate: "2026-07-14",
    workers: null,
    description: "After rejecting DXC's proposed offer, workers commenced 3 days of stop work actions from 1 July, including on the ATO mainframe at a peak time for the tax agency. Clients affected included the ATO, Victorian WorkCover Authority, WorkSafe, Victoria Police and City of Gold Coast. Stoppages continue until at least 14 July. Workers seek a 4% wage increase backdated to 1 July 2025.",
    locations: [
        { city: "Canberra", state: "ACT", lat: CITY_COORDS["Canberra"][0], lng: CITY_COORDS["Canberra"][1], name: "ATO / DXC clients" },
        { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Victorian WorkCover Authority / WorkSafe / Victoria Police" },
        { city: "Gold Coast", state: "QLD", lat: CITY_COORDS["Gold Coast"][0], lng: CITY_COORDS["Gold Coast"][1], name: "City of Gold Coast" }
    ],
    sources: [
        { name: "Disputes Report - 8 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-8-july" }
    ]
},
{
    id: 8002,
    actionId: "qld-rail-amwu-etu",
    title: "Queensland Rail In-Principle Agreements Reached for Three EBAs",
    union: "AMWU / ASU / ETU / Professionals Australia / RTBU QLD",
    industry: "Rail Transport",
    type: "resolved",
    startDate: "2026-07-07",
    endDate: "",
    workers: 3500,
    description: "In-principle agreements reached for the administrative, professional and technical; travel and tourism and other employees; and station operations EBAs. Includes 8% over 3 years plus a cost-of-living relief payment with backpay from 1 June 2026. Negotiations continue for train control, network, rollingstock and operations, and a proposed electrical-only agreement. Disruptions likely continue in maintenance areas.",
    locations: [
        { city: "Brisbane", state: "QLD", lat: CITY_COORDS["Brisbane"][0], lng: CITY_COORDS["Brisbane"][1], name: "Queensland Rail Network" }
    ],
    sources: [
        { name: "Disputes Report - 8 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-8-july" }
    ]
},
{
    id: 8003,
    actionId: "peabody-meu",
    title: "Peabody Extends Indefinite Lockout at Wambo Washery",
    union: "MEU",
    industry: "Mining",
    type: "lockout",
    startDate: "2026-07-01",
    endDate: "",
    workers: null,
    state: "NSW",
    description: "Peabody refused to accept work from union members participating in partial work bans after the lockout was due to end on 1 July, in practice an indefinite lockout. The MEU alleges Peabody is sharing cherry-picked figures and bundling superannuation and bonuses when wage increases are only applied to the base rate.",
    locations: [
        { city: "Newcastle", state: "NSW", lat: MINE["Wambo"][0], lng: MINE["Wambo"][1], name: "Wambo Washery" }
    ],
    sources: [
        { name: "Disputes Report - 8 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-8-july" }
    ]
},
{
    id: 8004,
    actionId: "act-aeu-teachers",
    title: "ACT Public School Teachers Continue Work Bans",
    union: "AEU ACT",
    industry: "Education",
    type: "strike",
    startDate: "2026-06-26",
    endDate: "",
    workers: null,
    state: "ACT",
    description: "AEU members at ACT public schools continue work bans. The Education Directorate sent an after-hours direction for teachers to detail industrial action in timesheets; it was withdrawn after the AEU lodged a dispute. Bans include no written comments on student reports; no staff meetings after 3:30pm; talking to parents about industrial action; not participating in Directorate surveys; and wearing AEU t-shirts on Fridays.",
    locations: [
        { city: "Canberra", state: "ACT", lat: CITY_COORDS["Canberra"][0], lng: CITY_COORDS["Canberra"][1], name: "ACT public schools" }
    ],
    sources: [
        { name: "Disputes Report - 8 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-8-july" }
    ]
},
{
    id: 8005,
    actionId: "vahpa-allied-health",
    title: "VAHPA Public Allied Health Rallies and Work Bans",
    union: "VAHPA",
    industry: "Healthcare",
    type: "strike",
    startDate: "2026-07-03",
    endDate: "",
    workers: null,
    state: "VIC",
    description: "VAHPA members rallied at GV Health Shepparton on 3 July and at Barwon Health Geelong, Peninsula University Hospital Frankston and Olivia Newton John Cancer Wellness Centre Heidelberg on 7 July. Work bans and stoppages continue after 10 months bargaining and one unsatisfactory government offer.",
    locations: [
        { city: "Shepparton", state: "VIC", lat: -36.3833, lng: 145.4000, name: "GV Health" },
        { city: "Geelong", state: "VIC", lat: CITY_COORDS["Geelong"][0], lng: CITY_COORDS["Geelong"][1], name: "Barwon Health" },
        { city: "Frankston", state: "VIC", lat: -38.1440, lng: 145.1220, name: "Peninsula University Hospital" },
        { city: "Heidelberg", state: "VIC", lat: -37.7580, lng: 145.0670, name: "Olivia Newton John Cancer Wellness Centre" }
    ],
    sources: [
        { name: "Disputes Report - 8 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-8-july" }
    ]
},
{
    id: 8006,
    actionId: "glencore-townsville",
    title: "Glencore Rejects ETU Concession Offer at Townsville Refinery",
    union: "ETU",
    industry: "Mining",
    type: "strike",
    startDate: "2026-07-02",
    endDate: "",
    workers: null,
    state: "QLD",
    description: "The ETU made a one-time concession offer to Glencore: 4% annual wage increases over 3 years with existing bonuses rolled into base rates, on the basis industrial action would be withdrawn for an uninterrupted vote. Glencore rejected the offer and threatened that large financial elements would be withdrawn if workers did not accept what was on the table. Industrial action continues.",
    locations: [
        { city: "Townsville", state: "QLD", lat: REF["Townsville Copper"][0], lng: REF["Townsville Copper"][1], name: "Townsville Copper Refinery" }
    ],
    sources: [
        { name: "Disputes Report - 8 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-8-july" }
    ]
},
{
    id: 8007,
    actionId: "downer-orange-hsu",
    title: "Orange Base Hospital Workers Walk Off Over Dangerous Rosters",
    union: "HSU NSW",
    industry: "Healthcare / Facilities",
    type: "strike",
    startDate: "2026-07-06",
    endDate: "2026-07-06",
    workers: null,
    state: "NSW",
    description: "HSU members at Orange Base Hospital walked off the job for 2 hours over dangerous rosters that leave workers with only a seven-hour gap between shifts. The Downer Group is contracted to operate non-clinical services at the public-private partnership hospital.",
    locations: [
        { city: "Orange", state: "NSW", lat: -33.2833, lng: 149.1000, name: "Orange Base Hospital" }
    ],
    sources: [
        { name: "Disputes Report - 8 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-8-july" }
    ]
},
{
    id: 8008,
    actionId: "parks-victoria",
    title: "Parks Victoria Workers Hold Second 24-Hour Strike",
    union: "ASU / CPSU Vic",
    industry: "Environment / Parks",
    type: "strike",
    startDate: "2026-07-08",
    endDate: "2026-07-08",
    workers: null,
    state: "VIC",
    description: "Second 24-hour strike at Parks Victoria. Workers rallied outside the Environment Minister's office at 8 Nicholson Street, Melbourne from 12 noon. Workers are fighting for a fair deal from the state government, including pay parity with public sector colleagues.",
    locations: [
        { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Environment Minister's Office, 8 Nicholson Street" }
    ],
    sources: [
        { name: "Disputes Report - 8 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-8-july" }
    ]
},
{
    id: 8009,
    actionId: "keolis-downer-rtbu",
    title: "Keolis Downer Northern Beaches Bus Action Escalates",
    union: "RTBU NSW",
    industry: "Transport",
    type: "strike",
    startDate: "2026-06-18",
    endDate: "",
    workers: null,
    state: "NSW",
    description: "RTBU members have been turning off Opal card readers since 18 June and this week instituted a ban on driving any bus displaying a dashboard warning light. Workers are fighting for decent wages and safer working conditions.",
    locations: [
        { city: "Sydney", state: "NSW", lat: SYD["Northern Beaches"][0], lng: SYD["Northern Beaches"][1], name: "Northern Beaches" }
    ],
    sources: [
        { name: "Disputes Report - 8 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-8-july" }
    ]
},
{
    id: 8010,
    actionId: "ugl-viva-refinery",
    title: "UGL Viva Refinery Workers Hold Weekly Friday Stoppages",
    union: "AMWU / AWU Vic",
    industry: "Oil & Gas",
    type: "strike",
    startDate: "2026-06-19",
    endDate: "",
    workers: null,
    state: "VIC",
    description: "AWU members held a 4-hour stoppage on 19 June following AMWU action on 12 June at the Viva refinery in Geelong. Workers will participate in stoppages every Friday until they get a better deal. Claims include 4% annual pay increases, better severance pay and consistent overtime pay.",
    locations: [
        { city: "Geelong", state: "VIC", lat: COMPANY["Viva"][0], lng: COMPANY["Viva"][1], name: "Viva Oil Refinery" }
    ],
    sources: [
        { name: "Disputes Report - 8 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-8-july" }
    ]
},
{
    id: 8011,
    actionId: "alcoa-ugl-amwu",
    title: "UGL BP Refinery Workers Apply for Protected Action Ballot",
    union: "AMWU WA",
    industry: "Oil & Gas",
    type: "planned",
    startDate: "2026-07-08",
    endDate: "",
    workers: null,
    state: "WA",
    description: "The AMWU applied for a protected action ballot on behalf of members at BP Refinery employed by UGL. Workers are fighting for a fair wage increase, industry standard site and travel allowances, and recognition for working on a major hazard facility.",
    locations: [
        { city: "Kwinana", state: "WA", lat: -32.2333, lng: 115.7833, name: "BP Refinery Kwinana" }
    ],
    sources: [
        { name: "Disputes Report - 8 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-8-july" }
    ]
},
{
    id: 8012,
    actionId: "bhp-hedland",
    title: "BHP Port Hedland AWU Members Endorse Industrial Action",
    union: "AWU / AMWU / ETU",
    industry: "Mining",
    type: "planned",
    startDate: "2026-07-07",
    endDate: "",
    workers: null,
    state: "WA",
    description: "AWU members employed by BHP at Port Hedland endorsed protected industrial action, with 97% voting yes, following strong protected action ballot results from AMWU and ETU members. The three unions met BHP on 7 July, with a strong indication industrial action would follow if it did not go well.",
    locations: [
        { city: "Port Hedland", state: "WA", lat: CITY_COORDS["Port Hedland"][0], lng: CITY_COORDS["Port Hedland"][1], name: "BHP Port Hedland" }
    ],
    sources: [
        { name: "Disputes Report - 8 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-8-july" }
    ]
},
{
    id: 8013,
    actionId: "bhp-mining-area-c",
    title: "BHP Mining Area C and South Flank Agreement Endorsed",
    union: "AMWU / AWU / ETU / MEU",
    industry: "Mining",
    type: "resolved",
    startDate: "2026-07-07",
    endDate: "",
    workers: null,
    state: "WA",
    description: "BHP's proposed agreement covering workers at Mining Area C and South Flank was endorsed by a narrow majority of 58%. The agreement includes annual pay increases of 4% over 4 years, 14% superannuation contributions, and a delayed flight compensation scheme commencing next year. Both the AMWU and ETU recommended a no vote; the Western Mine Workers Alliance acknowledged the agreement failed to meet a number of claims.",
    locations: [
        { city: "Pilbara", state: "WA", lat: -22.0, lng: 119.0, name: "Mining Area C / South Flank" }
    ],
    sources: [
        { name: "Disputes Report - 8 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-8-july" }
    ]
},
{
    id: 8014,
    actionId: "kinetic-tas-twu",
    title: "Kinetic Tasmania Bus Drivers Reach In-Principle Agreement",
    union: "TWU Tasmania",
    industry: "Transport",
    type: "resolved",
    startDate: "2026-07-07",
    endDate: "",
    workers: null,
    state: "TAS",
    description: "The TWU reached an in-principle agreement with Kinetic covering all Kinetic bus drivers across Tasmania in a single agreement for the first time. Workers achieved an immediate 6.65% wage increase, with 4% increases in the next 2 years, greater roster certainty, increased shift loadings and other improvements.",
    locations: [
        { city: "Hobart", state: "TAS", lat: CITY_COORDS["Hobart"][0], lng: CITY_COORDS["Hobart"][1], name: "Kinetic Hobart" },
        { city: "Launceston", state: "TAS", lat: CITY_COORDS["Launceston"][0], lng: CITY_COORDS["Launceston"][1], name: "Kinetic Launceston" },
        { city: "Burnie", state: "TAS", lat: CITY_COORDS["Burnie"][0], lng: CITY_COORDS["Burnie"][1], name: "Kinetic Burnie" },
        { city: "Devonport", state: "TAS", lat: CITY_COORDS["Devonport"][0], lng: CITY_COORDS["Devonport"][1], name: "Kinetic Devonport" }
    ],
    sources: [
        { name: "Disputes Report - 8 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-8-july" }
    ]
},
{
    id: 8015,
    actionId: "racq-amwu",
    title: "RACQ Workers Endorse New Offer After June Action",
    union: "AMWU QLD",
    industry: "Roadside Assistance / Insurance",
    type: "resolved",
    startDate: "2026-07-07",
    endDate: "",
    workers: null,
    state: "QLD",
    description: "Following industrial action in June, workers endorsed a new offer from RACQ. The new deal includes a 17% pay rise, allowances indexed every year, leave loading, paid time for on-job tasks and other improvements.",
    locations: [
        { city: "Brisbane", state: "QLD", lat: CITY_COORDS["Brisbane"][0], lng: CITY_COORDS["Brisbane"][1], name: "RACQ" }
    ],
    sources: [
        { name: "Disputes Report - 8 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-8-july" }
    ]
},
{
    id: 8016,
    actionId: "aeu-vic-teachers",
    title: "AEU members vote to accept pay and conditions offer",
    union: "AEU Victoria",
    industry: "Education",
    type: "resolved",
    startDate: "2026-08-16",
    endDate: "2026-08-16",
    workers: null,
    description: "Victorian public school teachers, principals, and education support staff have overwhelming endorsed the latest pay and conditions offer. 79% of Australian Education Union members working in Victorian public schools have voted to accept the government’s offer of pay rises between 28.3% and 32.4% over four years, and a lump sum payment of $2,000 at the start of the agreement. ",

    locations: [
        { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Schools across Victoria" }
    ],
    sources: [
        { name: "AEU Vic. - AEU members vote to accept pay and conditions offer", url: "https://www.aeuvic.asn.au/aeu-members-vote-accept-pay-and-conditions-offer" }
    ]
},
{
    id: 8101,
    actionId: "anmf-sa-nurses",
    title: "SA Nurses and Midwives Reach In-Principle Agreement",
    union: "ANMF SA",
    industry: "Healthcare",
    type: "resolved",
    startDate: "2026-07-01",
    endDate: "",
    workers: null,
    state: "SA",
    description: "ANMF reached an in-principle agreement with the SA government for public sector nurses and midwives. The deal includes a 16% wage increase: 3% in January 2027, 3% in July 2027, 4% in July 2028, plus the 6% already agreed in February (4% backdated to 1 January and 2% from 26 October). This falls short of the 23% sought but improves on the 10.75% over 3 years rejected earlier. Industrial action is suspended while members vote.",
    locations: [
        { city: "Adelaide", state: "SA", lat: CITY_COORDS["Adelaide"][0], lng: CITY_COORDS["Adelaide"][1], name: "Various public hospitals" }
    ],
    sources: [
        { name: "Disputes Report - 1 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-1-july" }
    ]
},
{
    id: 8102,
    actionId: "campbells-soup-amwu",
    title: "Campbell's Soup Workers Continue Industrial Action",
    union: "AMWU Vic",
    industry: "Food Manufacturing",
    type: "strike",
    startDate: "2026-05-20",
    endDate: "",
    workers: null,
    state: "VIC",
    description: "AMWU members at Campbell's Soup have been undertaking industrial action for 6 weeks, but negotiations remain at a standstill. Management won't move from 7.7% over 3 years and an increase in casuals. Campbell's claims workers seek 18% over 3 years. Local management is complaining about loss of raw food due to industrial action.",
    locations: [
        { city: "Shepparton", state: "VIC", lat: -36.3833, lng: 145.4000, name: "Campbell's Soup Shepparton" }
    ],
    sources: [
        { name: "Disputes Report - 1 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-1-july" }
    ]
},
{
    id: 8103,
    actionId: "aeu-vic-teachers",
    title: "Victorian Teachers to Recommence Bans in Term 3",
    union: "AEU Victoria",
    industry: "Education",
    type: "planned",
    startDate: "2026-07-13",
    endDate: "",
    workers: null,
    state: "VIC",
    description: "The AEU announced that at the start of Term 3 all bans and limitations will recommence. Expected bans include: no attending one hour of meetings per week; no principal members attending principal area forum meetings; no responding to Department of Education emails; no implementing new Department programs and initiatives; and no written comments on student reports. Term 2 reports were already missing comments due to previous bans.",
    locations: [
        { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Schools across Victoria" }
    ],
    sources: [
        { name: "Disputes Report - 1 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-1-july" }
    ]
},
{
    id: 8104,
    actionId: "dof-offshore",
    title: "DOF Accused of Recruiting Foreign Scabs",
    union: "Offshore Alliance",
    industry: "Offshore Energy",
    type: "scab",
    startDate: "2026-06-30",
    endDate: "",
    workers: null,
    state: "WA",
    description: "The Offshore Alliance warned DOF was trying to hire scabs. An article in The Australian outlined that recruiter Airswift was advertising specifically for foreign workers in response to industrial action. After being contacted by The Australian, Airswift claimed the wording was inadvertently included and did not accurately reflect the recruitment purpose. The LinkedIn post appears to have been taken down.",
    locations: [
        { city: "Perth", state: "WA", lat: PER["Ocean"][0], lng: PER["Ocean"][1], name: "DOF Base" }
    ],
    sources: [
        { name: "Disputes Report - 1 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-1-july" }
    ]
},
{
    id: 8105,
    actionId: "peabody-meu",
    title: "Peabody Lockout at Wambo Washery Continues",
    union: "MEU",
    industry: "Mining",
    type: "lockout",
    startDate: "2026-06-24",
    endDate: "2026-07-01",
    workers: null,
    state: "NSW",
    description: "The lockout of MEU members employed by Peabody at the Wambo washery continued into this week. Peabody's original notification indicated the lockout would end on 1 July, but it could be extended. Workers on the picket line were visited by ACTU President Michele O'Neil and local ALP MP Dan Repacholi. Workers are unhappy with the proposed wage increase and prepared to fight for a better deal.",
    locations: [
        { city: "Newcastle", state: "NSW", lat: MINE["Wambo"][0], lng: MINE["Wambo"][1], name: "Wambo Washery" }
    ],
    sources: [
        { name: "Disputes Report - 1 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-1-july" }
    ]
},
{
    id: 8106,
    actionId: "act-public-sector",
    title: "ACT Public Sector Professionals Commence Indefinite Action",
    union: "Professionals Australia",
    industry: "Public Sector",
    type: "strike",
    startDate: "2026-06-29",
    endDate: "",
    workers: null,
    state: "ACT",
    description: "Professionals Australia members across the ACT public sector, including forensic scientists, medical physicists, pharmacists and engineers, commenced indefinite industrial action on 29 June. They are dissatisfied with the territory government's below-inflation offer of 3% annual wage increases, delayed superannuation improvements and no backpay. The indefinite action includes bans on correspondence, electronic messaging, phone calls, out-of-hours work and external meetings.",
    locations: [
        { city: "Canberra", state: "ACT", lat: CITY_COORDS["Canberra"][0], lng: CITY_COORDS["Canberra"][1], name: "ACT Government" }
    ],
    sources: [
        { name: "Disputes Report - 1 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-1-july" }
    ]
},
{
    id: 8107,
    actionId: "melb-councils-asu",
    title: "Melbourne Metropolitan Council Action Continues",
    union: "ASU Vic",
    industry: "Local Government",
    type: "strike",
    startDate: "2026-06-01",
    endDate: "",
    workers: null,
    state: "VIC",
    description: "Industrial action continues at all 8 metropolitan Melbourne councils fighting for a multi-employer agreement. This includes low-level bans like wearing union campaign t-shirts and stopping work to share information about the dispute. ASU members at Maribyrnong and Merri-Bek have implemented additional bans including street cleaning and library bans. Some Merri-Bek workers have received pay docking notices, which the union is examining.",
    locations: [
        { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Various metropolitan Melbourne councils" },
        { city: "Coburg", state: "VIC", lat: CITY_COORDS["Coburg"][0], lng: CITY_COORDS["Coburg"][1], name: "Merri-bek Council" }
    ],
    sources: [
        { name: "Disputes Report - 1 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-1-july" }
    ]
},
{
    id: 8108,
    actionId: "dxc-asu-professionals-australia",
    title: "DXC Workers Reject Latest Offer",
    union: "Professionals Australia / ASU",
    industry: "IT Services",
    type: "strike",
    startDate: "2026-06-30",
    endDate: "",
    workers: null,
    description: "Workers at DXC rejected the tech contractor's latest offer, with 74% voting no. The deal included a one-off $1000 payment but had standby rates going backwards, no backpay and no cost-of-living increase. Professionals Australia also said DXC agreed to a number of clauses in negotiations, then deleted them without notifying anyone before putting the agreement to a vote. These included workplace delegates' rights, union induction access and union secondment leave.",
    locations: [
        { city: "Canberra", state: "ACT", lat: CITY_COORDS["Canberra"][0], lng: CITY_COORDS["Canberra"][1], name: "ATO / DXC clients" },
        { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Victorian clients" },
        { city: "Gold Coast", state: "QLD", lat: CITY_COORDS["Gold Coast"][0], lng: CITY_COORDS["Gold Coast"][1], name: "City of Gold Coast" }
    ],
    sources: [
        { name: "Disputes Report - 1 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-1-july" }
    ]
},
{
    id: 8109,
    actionId: "bhp-mining-area-c",
    title: "BHP Mining Area C and South Flank Ballot Under Way",
    union: "AMWU / ETU",
    industry: "Mining",
    type: "ballot",
    startDate: "2026-06-30",
    endDate: "2026-07-03",
    workers: null,
    state: "WA",
    description: "Both the AMWU and ETU are recommending a no vote on the agreement put out to a vote by BHP for workers at Mining Area C and South Flank. The Western Mineworkers Alliance (AWU and MEU) is not publicly recommending a yes or no vote, only saying it is important to vote. The ballot closes on Friday 3 July.",
    locations: [
        { city: "Pilbara", state: "WA", lat: -22.0, lng: 119.0, name: "Mining Area C / South Flank" }
    ],
    sources: [
        { name: "Disputes Report - 1 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-1-july" }
    ]
},
{
    id: 8110,
    actionId: "taswater-cepu",
    title: "CEPU Lodges Dispute with TasWater Over Operator Cuts",
    union: "CEPU Tasmania",
    industry: "Utilities",
    type: "planned",
    startDate: "2026-07-01",
    endDate: "",
    workers: null,
    state: "TAS",
    description: "The CEPU formally lodged a dispute with TasWater over a plan to reduce the presence of operators at water and sewerage treatment plants. TasWater's plan would shift monitoring to remote systems and automation. The dispute was lodged as Environment Tasmania demonstrated TasWater released more than half a billion litres of improperly treated sewage into state waterways in 2024-2025.",
    locations: [
        { city: "Hobart", state: "TAS", lat: CITY_COORDS["Hobart"][0], lng: CITY_COORDS["Hobart"][1], name: "TasWater" }
    ],
    sources: [
        { name: "Disputes Report - 1 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-1-july" }
    ]
},
{
    id: 8111,
    actionId: "cfmeu-sa-builders",
    title: "CFMEU SA Protected Action Ballots Voted Up at Major Builders",
    union: "CFMEU SA",
    industry: "Construction",
    type: "strike",
    startDate: "2026-06-29",
    endDate: "",
    workers: null,
    state: "SA",
    description: "The SA Branch of the CFMEU said protected action ballots had been voted up at 5 major builders, and protected industrial action would kick off this week across several major sites. FWC ballot results exist for Built, Lendlease, Multiplex, Watpac and Hansen Yuncken.",
    locations: [
        { city: "Adelaide", state: "SA", lat: CITY_COORDS["Adelaide"][0], lng: CITY_COORDS["Adelaide"][1], name: "Major construction sites" }
    ],
    sources: [
        { name: "Disputes Report - 1 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-1-july" }
    ]
},
{
    id: 8112,
    actionId: "ugl-varanus-island",
    title: "UGL Varanus Island Workers Vote in Protected Action Ballot",
    union: "Offshore Alliance",
    industry: "Oil & Gas",
    type: "ballot",
    startDate: "2026-06-30",
    endDate: "",
    workers: null,
    state: "WA",
    description: "Union members employed by UGL on Varanus Island are voting in a protected action ballot. According to the Alliance, UGL's pay offer is 16% less than workers' demands, with 2% wage increases in the second, third and fourth years. Workers are fighting for an industry standard agreement with decent pay and allowances, training pay, overcycle rates and cyclone pay during cyclone stand downs. The ballot closed 30 June.",
    locations: [
        { city: "Varanus Island", state: "WA", lat: WA["Varanus Island"][0], lng: WA["Varanus Island"][1], name: "Varanus Island" }
    ],
    sources: [
        { name: "Disputes Report - 1 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-1-july" }
    ]
},
{
    id: 8113,
    actionId: "act-cfmeu-gso",
    title: "ACT General Service Officers Endorse Industrial Action",
    union: "CFMEU ACT",
    industry: "Public Sector",
    type: "ballot",
    startDate: "2026-06-29",
    endDate: "",
    workers: 300,
    state: "ACT",
    description: "Canberra's General Service Officers overwhelmingly endorsed industrial action. Of the 300 who voted in a protected action ballot, 99% were in favour. These CFMEU members are part of the broader ACT public sector negotiations. GSOs manage maintenance, waste management, parks and sports grounds in the ACT and are seeking a 12% wage increase over 3 years.",
    locations: [
        { city: "Canberra", state: "ACT", lat: CITY_COORDS["Canberra"][0], lng: CITY_COORDS["Canberra"][1], name: "ACT Government" }
    ],
    sources: [
        { name: "Disputes Report - 1 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-1-july" }
    ]
},
{
    id: 8114,
    actionId: "vic-doctors-strike",
    title: "Victorian Public Hospital Doctors Endorse Protected Action Ballot Application",
    union: "ASMOF Vic",
    industry: "Healthcare",
    type: "ballot",
    startDate: "2026-06-29",
    endDate: "",
    workers: 2000,
    state: "VIC",
    description: "A meeting of more than 2000 ASMOF members endorsed the union applying for a protected action ballot, with only 12 members voting against. The last major industrial action by doctors in Victoria, a stop work meeting, was over 20 years ago. ASMOF has been negotiating for a new agreement for 10 months and has reached a stalemate. Key issues include high workloads, unsafe hours and poor pay.",
    locations: [
        { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Various Melbourne hospitals" }
    ],
    sources: [
        { name: "Disputes Report - 1 July", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-1-july" }
    ]
}
];

// Export globally
window.STRIKE_DATA = STRIKE_DATA;
window.CITY_COORDS = CITY_COORDS;
