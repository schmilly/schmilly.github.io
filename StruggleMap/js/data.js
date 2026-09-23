// ============================================
// AU dtrike Watch - Data File
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
    "Kooragang Island": [-32.886807957868044, 151.77933788271903],
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
    "Viva": [-38.07680767751296, 144.37967195955835], //Oil refinery
    "Pacific National": {
        "NSW": [-33.840659007925886, 151.2059929824021],
        "VIC": [-37.802469240892684, 144.91788990626077],
    },
    "Alcoa": {
        "WA": [-32.03623881672403, 115.83298262212477]
    },
    "Nissan Casting": [-38.02148284314224, 145.2165257516094],
    "Arnott's": [-34.94790670988418, 138.55855418822352],
    "Fleurieu Cranes": [-34.84434769783146, 138.5671177063876],
    "DP World": [-33.967410544907686, 151.22038597785794],
    "NRMA": [-33.8459, 151.0699],
    "Stowe": [-33.8119, 151.03241],
    "Bega Dairy": [-36.6661, 149.8231],
    "Bridgestone": [-34.9406, 138.6170],
    "Ceva Logistics": [-37.8064, 144.7371],
    "Valmet": {
        "NSW": [-33.7650, 151.2755]
    },
    "CSL": {
        "VIC": [-37.6881, 144.9396]
    },
    "RACQ": [-27.5863, 153.1001],
    "Ichthys gas field": [-12.3519, 130.1464],
    "FedEx": { //Fed Ex HQ's in each capital city
        "PER": [-31.991228965142373, 115.91983629673909],
        "SYD": [-33.924754990813874, 151.18778396151285],
        "MELB": [-37.69748673856566, 144.8581720352885],
        "BRIS": [-27.425800876345058, 153.08531336776494],
        "ADL": [-34.945925929930176, 138.5481889223183],
        "CAN": [-35.394494369262326, 149.1650417412423]
    },
    "DXC": {
        "HQ": [-33.779443835275245, 151.12839627976174],
        "VIC": [-37.81644172891636, 144.96220319140227],
        "QLD": [-27.453496838068023, 153.03833752649774],
        "ACT": [-35.313489520105335, 149.18984661134039]
    },
}


const MELB = {
    "Port": [-37.84192, 144.9234],
    "Quantem": [-37.8174, 144.9077],
    "Arts Centre": [-37.821456413674404, 144.96882381429486],
    "Trades Hall": [-37.80654107023885, 144.96625939962078],
    "Town Hall": [-37.816106117492154, 144.9670850824903],
    "Uni": [-37.79840685767232, 144.96095388740878],
    "Peter MacCallum Cancer Centre": [-37.80026478320679, 144.95671662077825],
    "RLA Polymers": [-37.817593111961365, 145.305556385398],
    "Overnewton College": [-37.706363106002726, 144.8216275455058],
    "Secure Journeys Melbourne": [-37.68409443780323, 144.94450175001506],
}

const BRIS = {
    "Mater Hospital Brisbane": [-27.486102725716407, 153.02784104315765],
    "Secure Journeys Brisbane": [-27.422621424649737, 153.1022575959132],
    "River": [-27.48038317578606, 153.03099475353326]
}

const PER = {
    "Ocean": [-32.06461197040717, 115.68461785309951],
    "Airport": [-31.939091610821503, 115.96655132495701],

}

const SYD = {
    "Quay": [-33.86047772953971, 151.2110670199961],
    "Uni": [-33.88810449082193, 151.1871032773295],
    "Northern Beaches": [-33.670256518987316, 151.31802318697055],
    "QANTAS": [-33.92548617476988, 151.18660150979397],
    "Airport": [-33.94111, 151.1746],
    "Water": [-33.81681165499027, 151.00586267114213]
}

const MINE = {
    "Wambo": [-32.58159379060998, 151.01065361676308]
}

const REF = { //refinerys
    "Townsville Copper": [-19.253381711248775, 146.83341807654375]
}

const CAN = {
    "ACT Government Analytical Laboratory": [-35.33153716457696, 149.04976620656367],
    "ATO": [-35.34296155147976, 149.08567122290285]
}

const SA = {
    "Service Stream SA": [-34.860410821670975, 138.5680181935495],
    "City of Port Adelaide Enfield": [-34.84380947005328, 138.50440372486509],
    "SA Pathology": [-34.9197, 138.6080], //Main lab
    "KONE": [-34.9142, 138.628]
}

const WA = {
    "Varanus Island": [-20.651803004964947, 115.57788827871269],
    "Worsley Alumina": [-33.2421, 116.0666],
    "Port of Broome": [-18.00372, 122.2107]
}

const QLD = {
    "Bethany Christian Care": {
        "The Plains": [-27.5926, 153.1005],
        "Janoah Gardens": [-27.4681, 153.1709],
    },
    "QUT": [-27.4779, 153.0274], //Queensland Uni of Technology
    "Griffith Uni": [-27.5531, 153.0510],
    "Parliament": [-27.475532182152072, 153.02740592577948]
}

const TAS = {
    "Royal Hobart Hospital": [-42.8798, 147.3292],
}

const VIC = {
    "Port of Portland": [-38.3531, 141.6176],
    "DOT": [-37.8150, 144.9743], //Vic Department of transport,
    "Parks Vic": [-37.81046, 144.96036],
    "Hume City": [-37.681992618429874, 144.91828546273769],
}

const PORT = { //Ports
    "Hobart": [-42.88178, 147.33922],
    "Portland": [-38.3531, 141.6176],
}

const UNI = { //Unis
    "QLD": [-27.4977, 153.0128],
    "Griffith": [-27.5531, 153.0510],
    "QLD Uni Tech": [-27.4779, 153.0274],
    "MELB": [-37.79840685767232, 144.96095388740878],
}
const STRIKE_DATA = [
    {
        id: 315,
        actionId: "unimelb-nteu",
        title: "UniMelb NTEU Strike for Paid Sick Leave for Casuals and Safe Workloads",
        union: "NTEU",
        industry: "Education",
        type: "strike",
        startDate: "2026-08-27",
        endDate: "2026-08-27",
        workers: null,
        state: "VIC",
        description: "Hundreds of NTEU members at the University of Melbourne went on strike on 27 August in response to management's refusal to agree to key bargaining demands, including paid sick leave for casuals and safer workloads for academic staff. The five-hour strike was strongly supported by students, who joined staff at a campus rally featuring NTEU speakers and UMSU President Lushomo Chinganya. Aboriginal staff member and senior lecturer Kim Alley highlighted the union's demand for improved protections for First Nations staff. NTEU bargaining lead Dr Carla Winston said academic workloads are 'unsustainable', with staff expected to work weekends and into the evening, and that management 'has no clue' about daily workloads. Casual worker Clare condemned management's refusal to instate sick leave for casuals, saying casuals are forced to choose between working while sick or losing pay. After the rally, a mass meeting voted unanimously to adopt a new bargaining claim requiring all major changes involving permanent relocation of staff to be put to a ballot of affected staff and win majority approval.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: MELB["Uni"][0], lng: MELB["Uni"][1], name: "University of Melbourne" }
        ],
        sources: [
            { name: "Green Left - Uni of Melb NTEU strike for sick leave for casuals, safe workloads", url: "https://www.greenleft.org.au/2026/1461/news/uni-melb-nteu-strike-sick-leave-casuals-safe-workloads" }
        ],
        tags: ["education", ""]
    },

    {
        id: 316,
        actionId: "bhp-hedland",
        title: "BHP Port Hedland Talks End Without Deal, Resume Next Week",
        union: "AMWU / ETU / AWU / MEU",
        industry: "Mining",
        type: "strike",
        startDate: "2026-09-08",
        endDate: "",
        workers: null,
        state: "WA",
        description: "Talks between BHP and the Combined BHP Ports Unions ended without a deal, with further negotiations scheduled for next Tuesday (15 Sept), facilitated by the Fair Work Commission. BHP tabled an updated proposal offering a 17% pay increase over four years for most workers, a A$25,000 transition payment paid over two years, and an increase to roster allowances. The three unions rejected the offer, saying it leaves about 40% of the workforce in a worse position and keeps wage inequalities alive, and pointing to BHP's ~$13 billion underlying profit for fiscal 2026. Workers are seeking pay that recognises extreme remote heat, long hours and time away from families. Port Hedland is the world's largest iron ore loading port, with BHP shipping around $80 million worth of iron ore daily through the facility.",
        locations: [
            { city: "Port Hedland", state: "WA", lat: CITY_COORDS["Port Hedland"][0], lng: CITY_COORDS["Port Hedland"][1], name: "BHP Port Hedland" }
        ],
        sources: [
            { name: "Reuters - BHP, union talks for Port Hedland iron ore workers to stretch on into next week", url: "https://www.reuters.com/business/world-at-work/bhp-union-talks-port-hedland-iron-ore-workers-stretch-into-next-week-2026-09-08/" },
            { name: "The DCN - Unions reject BHP's updated Pilbara port offer as dispute intensifies", url: "https://www.thedcn.com.au/news/bhp-tables-updated-offer-as-pilbara-port-dispute-enters-new-phase" }
        ]
    },

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
        state: "NSW",
        workers: 19,
        description: "Peabody lockout and pay dispute resolves in favour of MEU workers",

        locations: [
            { city: "Newcastle", state: "NSW", lat: MINE["Wambo"][0], lng: MINE["Wambo"][1], name: "Wambo Washery" }
        ],
        sources: [
            { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" },
            { name: "MEU - Peabody locks out Wambo Washery Workers", url: "https://meu.org.au/peabody-locks-out-wambo-washery-workers/" },
            { name: "MEU - SOLIDARITY WINS: PEABODY WORKERS DEFEAT ENERGY GIANT’S LOCKOUTS AND WIN FAIR DEAL", url: "https://meu.org.au/peabody-wambo-workers-defeat-lockouts-win-fair-deal/" },
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
        ],
        tags: ["education", "stall", "negotiation", "rally"]
    },

    // RTBU NSW - Keolis Downer (action paused)
    {
        id: 203,
        actionId: "keolis-downer-rtbu",
        title: "Keolis Downer Bus Action Paused for Negotiations",
        union: "RTBU NSW",
        industry: "Transport",
        type: "update",
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
        state: "QLD",
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
        type: "stoppage",
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
        type: "stoppage",
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
        type: "stoppage",
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
        type: "ballot",
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
        type: "ballotpass",
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
    //*
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
            { city: "Hobart", state: "TAS", lat: PORT["Hobart"][0], lng: PORT["Hobart"][1], name: "Hobart Port" },
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
            { city: "Melbourne", state: "VIC", lat: VIC["DOT"][0], lng: VIC["DOT"][1], name: "Major artereal roads" }
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
        type: "stoppage",
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
        ],
        tags: ["stall", "negotiation"]
    },

    // Professionals Australia - ACT Forensic Scientists
    {
        id: 103,
        actionId: "act-forensic-scientists",
        title: "ACT Forensic Scientists First Strike",
        union: "Professionals Australia",
        industry: "Public Sector",
        type: "stoppage",
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
        type: "stoppage",
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
        state: "QLD",
        workers: null,
        description: "Second strike on 7 Aug 8-10am. First strike on 31 Jul 8-10am. Bosses offered below-inflation increase.",
        locations: [
            { city: "Brisbane", state: "QLD", lat: BRIS["River"][0], lng: BRIS["River"][1], name: "Brisbane River" }
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
        state: "SA",
        description: "First strike at Arnott's since 1990s. Wages have fallen behind inflation. KKR private equity owner.",

        locations: [
            { city: "Adelaide", state: "SA", lat: COMPANY["Arnott's"][0], lng: COMPANY["Arnott's"][1], name: "Arnott's Adelaide" }
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
        state: "NSW",
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
        state: "SA",
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
        type: "stoppage",
        startDate: "2026-07-31",
        endDate: "",
        workers: null,
        state: "SA",
        description: "3-hour stoppage. Fighting unilateral redeployment clause and AI use without consultation.",

        locations: [
            { city: "Adelaide", state: "SA", lat: SA["City of Port Adelaide Enfield"][0], lng: SA["City of Port Adelaide Enfield"][1], name: "City of Port Adelaide Enfield" }
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
        state: "VIC",
        description: "Third strike planned on 19 Aug. Negotiations stalled with new Education Minister.",

        locations: [
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Schools across Victoria" }
        ],
        sources: [
            { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
        ],
        tags: ["negotiation", "stall", "education"]
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
        state: "VIC",
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
        state: "VIC",
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
        type: "stoppage",
        startDate: "2026-08-05",
        endDate: "2026-08-05",
        workers: null,
        state: "WA",
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
        state: "VIC",
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
        type: "stoppage",
        startDate: "2026-07-29",
        endDate: "",
        state: "VIC",
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
        state: "VIC",
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
        state: "VIC",
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
        state: "VIC",
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
        state: "VIC",
        description: "New agreement endorsed after weeks of action: 11.5% over 3 years, $3000 sign-on, improved allowances.",

        locations: [
            { city: "Geelong", state: "VIC", lat: COMPANY["Viva"][0], lng: COMPANY["Viva"][1], name: "Viva Oil Refinery" }
        ],
        sources: [
            { name: "Disputes Report - August 5th", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-5-august" }
        ],
    },
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
            { name: "Wikipedia - 2026 Queensland rail strikes", url: "https://en.wikipedia.org/wiki/2026_Queensland_rail_strikes" },
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
        actionId: "service-stream-ASU-coliban",
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
            { city: "Brisbane", lat: QLD["Parliament"][0], lng: QLD["Parliament"][1], name: "Parliament House" }
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
        type: "update",
        startDate: "2026-08-31",
        endDate: "2026-09-08",
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
        title: "Quantem Stand Down, Scabs and Rallies",
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
            { city: "Broadmeadows", lat: VIC["Hume City"][0], lng: VIC["Hume City"][1], name: "Hume City Council" },
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
            { name: "ABC News - Jetstar's profits soar as passengers face more fees and workers push for bigger share", url: "https://www.abc.net.au/news/2026-08-18/jetstar-profits-soar-workers-pay-stalls/107002696" }
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
        type: "ballotpass",
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
        tags: ["other", "fwc-ballot"]
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
        type: "ballotpass",
        startDate: "2026-09-08",
        endDate: "",
        workers: null,
        description: "Protected action ballot result from Fair Work Commission.",
        locations: [
            {
                city: "Unknown",
                state: "",
                lat: COMPANY["Bridgestone"][0],
                lng: COMPANY["Bridgestone"][1],
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
    /* Commented out because it has no votes in the result (??)
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
                city: "Portland",
                state: "VIC",
                lat: VIC["Port of Portland"][0],
                lng: VIC["Port of Portland"][1],
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
    }, */
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
        actionId: "csl-amwu-etu",
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
        actionId: "csl-amwu-etu",
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
        type: "ballotpass",
        startDate: "2026-09-02",
        endDate: "",
        workers: null,
        description: "Protected action ballot result from Fair Work Commission.",
        locations: [
            {
                city: "Unknown",
                state: "",
                lat: COMPANY["Bega Dairy"][0],
                lng: COMPANY["Bega Dairy"][1],
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
        type: "ballotpass",
        startDate: "2026-09-02",
        endDate: "",
        workers: null,
        description: "Protected action ballot result from Fair Work Commission.",
        locations: [
            {
                city: "Unknown",
                state: "",
                lat: COMPANY["Bega Dairy"][0],
                lng: COMPANY["Bega Dairy"][1],
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
        endDate: "2026-09-01",
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
        endDate: "2026-09-01",
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
        type: "ballotpass",
        startDate: "2026-09-01",
        endDate: "",
        workers: 54,
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
        type: "ballotpass",
        startDate: "2026-08-31",
        endDate: "",
        workers: 318,
        description: "Protected action ballot result from Fair Work Commission.",
        locations: [
            {
                city: "Unknown",
                state: "",
                lat: COMPANY["Ceva Logistics"][0],
                lng: COMPANY["Ceva Logistics"][1],
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
        type: "ballotpass",
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
        tags: ["other", "fwc-ballot"]
    },
    {
        id: 5023,
        actionId: "amwu-south32-worsley-alumina-pty-ltd",
        title: "AMWU and South32 Worsley Alumina Pty Ltd - Protected Action Ballot",
        union: "AMWU",
        industry: "Mining",
        type: "ballotpass",
        startDate: "2026-08-28",
        endDate: "",
        workers: 136,
        description: "Protected action ballot result from Fair Work Commission.",
        locations: [
            {
                city: "Perth", state: "WA",
                lat: WA["Worsley Alumina"][0],
                lng: WA["Worsley Alumina"][1],
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
        tags: ["education", "fwc-ballot"]
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
            { city: "Sydney", state: "NSW", lat: COMPANY["DP World"][0], lng: COMPANY["DP World"][1], name: "DP World Port Botany" }
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
        workers: 350,
        description: "School nurses taking action for over 80 days. Fighting for pay parity with public sector colleagues. Actions include community engagement, media comment, wearing union shirts, displaying campaign messages.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Various public schools" }
        ],
        sources: [
            { name: "Disputes Report - July 22", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-22-july" },
            { name: "Public school nurses to launch industrial action - ANMF", url: "https://otr.anmfvic.asn.au/articles/public-school-nurses-to-launch-industrial-action/" }
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
    {
        id: 701201,
        actionId: "ugl-varanus-island",
        title: "UGL VI EBA Voted up",
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
            { city: "Brisbane", state: "QLD", lat: QLD["Bethany Christian Care"]["Janoah Gardens"][0], lng: QLD["Bethany Christian Care"]["Janoah Gardens"][1], name: "Janoah Gardens - Bethany Christian Care" },
            { city: "Brisbane", state: "QLD", lat: QLD["Bethany Christian Care"]["The Plains"][0], lng: QLD["Bethany Christian Care"]["The Plains"][1], name: "The Plains - Bethany Christian Care" }
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
            { city: "Broome", state: "WA", lat: WA["Port of Broome"][0], lng: WA["Port of Broome"][1], name: "Port of Broome" }
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
        type: "ballot",
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
        actionId: "inpex-ichthys",
        title: "Inpex Workers Endorse New Agreement",
        union: "AWU / ETU / MUA",
        industry: "Oil & Gas",
        type: "resolved",
        startDate: "2026-07-22",
        endDate: "2026-07-22",
        workers: null,
        description: "97.3% participation, 97.5% voted in favour. Agreement includes highest remuneration among Tier-1 operators, career progression, 20 job share positions, additional leave, improved fatigue management. Unions estimate action cost Inpex $200 million.",
        locations: [
            { city: "Darwin", state: "NT", lat: COMPANY["Ichthys gas field"][0], lng: COMPANY["Ichthys gas field"][1], name: "Ichthys gas facilities" }
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
            { city: "Canberra", state: "ACT", lat: CAN["ATO"][0], lng: CAN["ATO"][1], name: "ATO (as a DXC client)" },
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Victorian WorkCover Authority / WorkSafe / Victoria Police" },
            { city: "Gold Coast", state: "QLD", lat: CITY_COORDS["Gold Coast"][0], lng: CITY_COORDS["Gold Coast"][1], name: "City of Gold Coast" },
            { city: "Macquarie Park", state: "NSW", lat: COMPANY["DXC"]["HQ"][0], lng: COMPANY["DXC"]["HQ"][1], name: "DXC" }
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
        endDate: "2026-07-07",
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
        title: "BHP Mining Area C and South Flank Agreement Endorsed Despite Unions Recommending No",
        union: "AMWU / AWU / ETU / MEU",
        industry: "Mining",
        type: "ballotfail",
        startDate: "2026-07-07",
        endDate: "2026-07-07",
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
        id: 8504,
        actionId: "port-broome-mua",
        title: "Broome Port MUA Members Unanimously Back Agreement in Principle",
        union: "MUA WA",
        industry: "Ports",
        type: "resolved",
        startDate: "2026-08-28",
        endDate: "2026-08-28",
        workers: null,
        state: "WA",
        description: "MUA members at the Port of Broome met at 6am on Friday 28 August to hear a full report back on outcomes in the new agreement, following written reports from the Fair Work process the week before that resulted in a suspension of all industrial action. The session allowed full debate and questions between members, committee and officials present including WA Branch Secretary Will Tracey and Organiser Paul Brett. The outcome reached in Fair Work had been before three different Fair Work Commissioners and came about after 30 days of bans and stoppages including a full 11-day shutdown of all operations at the Port of Broome. The Port of Broome had filed for an Intractable Bargaining Declaration programmed for hearing on 21-22 September. At the conclusion of the meeting the Broome membership voted unanimously to back the agreement in principle, subject to drafting. The final draft is to be presented to the workforce the following Tuesday.",
        locations: [
            { city: "Broome", state: "WA", lat: -17.9614, lng: 122.2353, name: "Port of Broome" }
        ],
        sources: [
            { name: "MUA WA Branch - Facebook post, 29 August 2026", url: "https://www.facebook.com/muawabranch/posts/mua-members-at-the-port-of-broome-met-at-6am-on-friday-28th-to-hear-a-full-repor/1624928089639196/" }
        ],
        tags: ["maritime",]
    },
    {
        id: 8503,
        actionId: "port-broome-mua",
        title: "MUA Urges Members to Back New Broome Port Agreement After 11-Day Shutdown",
        union: "MUA WA",
        industry: "Ports",
        type: "resolved",
        startDate: "2026-09-08",
        endDate: "2026-09-08",
        workers: null,
        state: "WA",
        description: "The MUA's WA Branch has called on members to vote yes to a new enterprise agreement at the Port of Broome, following a hard-fought industrial campaign that culminated in an 11-day shutdown of operations. Wharf crews and maintenance workers had been on strike since 7 August, halting cruise ship arrivals and livestock loading, with both terminals closed and cruise passengers ferried ashore in small boats. The dispute centred on pay and conditions, with the union arguing Broome Port trades were the lowest paid in the state's port system. The new agreement, if endorsed, would replace the previous deal that expired in October 2025.",
        locations: [
            { city: "Broome", state: "WA", lat: WA["Port of Broome"][0], lng: WA["Port of Broome"][1], name: "Port of Broome" }
        ],
        sources: [
            { name: "The DCN - MUA urges members to back new Broome Port agreement", url: "https://www.thedcn.com.au/news/mua-urges-members-to-back-new-broome-port-agreement" }
        ],
        tags: ["maritime"]
    },
    {
        id: 8015,
        actionId: "racq-amwu",
        title: "RACQ Workers Endorse New Offer After June Action",
        union: "AMWU QLD",
        industry: "Roadside Assistance / Insurance",
        type: "resolved",
        startDate: "2026-07-01",
        endDate: "2026-07-01",
        workers: null,
        state: "QLD",
        description: "Following industrial action in June, workers endorsed a new offer from RACQ. The new deal includes a 17% pay rise, allowances indexed every year, leave loading, paid time for on-job tasks and other improvements.",
        locations: [
            { city: "Brisbane", state: "QLD", lat: COMPANY["RACQ"][0], lng: COMPANY["RACQ"][1], name: "RACQ" }
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
            { city: "Gold Coast", state: "QLD", lat: CITY_COORDS["Gold Coast"][0], lng: CITY_COORDS["Gold Coast"][1], name: "City of Gold Coast" },
            { city: "Macquarie Park", state: "NSW", lat: COMPANY["DXC"]["HQ"][0], lng: COMPANY["DXC"]["HQ"][1], name: "DXC Australia Headquarters" }
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
    },
    {
        id: 8201,
        actionId: "melb-councils-asu",
        title: "Melbourne Council Workers Hold Second 24-Hour Strike",
        union: "ASU Victoria",
        industry: "Local Government",
        type: "strike",
        startDate: "2026-06-17",
        endDate: "2026-06-17",
        workers: null,
        state: "VIC",
        description: "ASU members from 8 metropolitan Melbourne councils went on strike for 24 hours on 17 June, the second such strike in pursuit of a multi-employer agreement. Workers have been negotiating for 6 months without an offer. The ASU demands 10% in the first year and 4% annually after. Workers rallied at Trades Hall then marched to Parliament House. Services disrupted including closed libraries and uncollected bins. The ASU launched Federal Court action against Hume City Council for docking pay despite withdrawn bans; members voted to reinstate partial work bans.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Trades Hall / Parliament House" },
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Various metropolitan councils" }
        ],
        sources: [
            { name: "Disputes Report - 24 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-24-june" }
        ]
    },
    {
        id: 8202,
        actionId: "aeu-vic-teachers",
        title: "Victorian Teachers Reject In-Principle Agreement",
        union: "AEU Victoria",
        industry: "Education",
        type: "planned",
        startDate: "2026-06-19",
        endDate: "",
        workers: null,
        state: "VIC",
        description: "On 19 June Victorian AEU members rejected an offer recommended by their union. 57.7% voted against the proposed agreement. The AEU Joint Primary and Secondary Council met and rejected motions to recommence industrial action, instead voting to survey members. AEU Vic Branch President Justin Mullaly stated 'we need to move swiftly towards industrial action' and panned calls for an August strike as 'too late'. Council meets again on 17 July.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Schools across Victoria" }
        ],
        sources: [
            { name: "Disputes Report - 24 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-24-june" }
        ]
    },
    {
        id: 8203,
        actionId: "western-downs-council",
        title: "Western Downs Council Workers Strike and Locked Out",
        union: "AWU / The Services Union QLD",
        industry: "Local Government",
        type: "lockout",
        startDate: "2026-06-18",
        endDate: "",
        workers: null,
        state: "QLD",
        description: "On 18 June union members at Western Downs Council walked off the job and rallied at Dalby, and were again locked out by management. Workers last struck in May and were locked out in response. Council has threatened lockouts for extremely low-level bans such as working to rule or wearing campaign badges. Despite multiple QIRC hearings, bosses continue to stall. A conciliation meeting is scheduled for 6 July. Workers are fighting for a decent pay increase to keep up with cost of living.",
        locations: [
            { city: "Dalby", state: "QLD", lat: -27.1833, lng: 151.2667, name: "Western Downs Council" }
        ],
        sources: [
            { name: "Disputes Report - 24 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-24-june" }
        ]
    },
    {
        id: 8204,
        actionId: "keolis-downer-rtbu",
        title: "Keolis Downer Northern Beaches Opal Readers Off for Two Weeks",
        union: "RTBU NSW",
        industry: "Transport",
        type: "strike",
        startDate: "2026-06-18",
        endDate: "2026-07-02",
        workers: null,
        state: "NSW",
        description: "RTBU members driving buses in Sydney's Northern Beaches turned off Opal card readers for two weeks starting 18 June, continuing until 2 July. This represents an escalation in industrial action against Keolis Downer. Negotiations have been underway for several months but Keolis Downer refuse to budge on pay, conditions and driver retention. Next bargaining meeting scheduled for 26 June.",
        locations: [
            { city: "Sydney", state: "NSW", lat: SYD["Northern Beaches"][0], lng: SYD["Northern Beaches"][1], name: "Northern Beaches" }
        ],
        sources: [
            { name: "Disputes Report - 24 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-24-june" }
        ]
    },
    {
        id: 8205,
        actionId: "canberra-hospital-hsu",
        title: "Canberra Hospital Health Workers Take Industrial Action",
        union: "HSU ACT",
        industry: "Healthcare",
        type: "strike",
        startDate: "2026-06-17",
        endDate: "2026-06-19",
        workers: null,
        state: "ACT",
        description: "HSU members at Canberra Hospital in medical imaging, sonography and pathology participated in industrial action. After 6 months of negotiations without a meaningful offer from the Territory Government, on 17 June members wore campaign t-shirts and implemented bans on answering telephone calls, responding to voicemail messages and responding to electronic messages. Other administrative bans took place on 18 June, culminating in a 1-hour stoppage on 19 June.",
        locations: [
            { city: "Canberra", state: "ACT", lat: CITY_COORDS["Canberra"][0], lng: CITY_COORDS["Canberra"][1], name: "Canberra Hospital" }
        ],
        sources: [
            { name: "Disputes Report - 24 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-24-june" }
        ]
    },
    {
        id: 8206,
        actionId: "ugl-viva-refinery",
        title: "UGL Viva Refinery Workers Strike Again",
        union: "AMWU Victoria",
        industry: "Oil & Gas",
        type: "strike",
        startDate: "2026-06-22",
        endDate: "2026-06-22",
        workers: null,
        state: "VIC",
        description: "AMWU members at the Viva Refinery in Geelong stopped work for a second time on 22 June, following previous industrial action on 12 June. UGL is trying to strip conditions including redundancy and income protection, and force workers back onto the award.",
        locations: [
            { city: "Geelong", state: "VIC", lat: COMPANY["Viva"][0], lng: COMPANY["Viva"][1], name: "Viva Oil Refinery" }
        ],
        sources: [
            { name: "Disputes Report - 24 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-24-june" }
        ]
    },
    {
        id: 8207,
        actionId: "peabody-meu",
        title: "Peabody Locks Out Wambo Washery Workers",
        union: "MEU",
        industry: "Mining",
        type: "lockout",
        startDate: "2026-06-17",
        endDate: "2026-07-01",
        workers: null,
        state: "NSW",
        description: "On 17 June workers at the Wambo Washery were locked out by Peabody. The lockout is set to last for at least two weeks. It is in response to industrial action undertaken by MEU members at the washery since May. Peabody have offered a 2.5% annual wage increase and unfair changes to bonus arrangements. Workers are fighting for a better deal.",
        locations: [
            { city: "Newcastle", state: "NSW", lat: MINE["Wambo"][0], lng: MINE["Wambo"][1], name: "Wambo Washery" }
        ],
        sources: [
            { name: "Disputes Report - 24 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-24-june" }
        ]
    },
    {
        id: 8208,
        actionId: "anmf-sa-nurses",
        title: "SA Nurses and Midwives Hold Second 24-Hour Strike",
        union: "ANMF SA",
        industry: "Healthcare",
        type: "strike",
        startDate: "2026-06-18",
        endDate: "2026-06-18",
        workers: null,
        state: "SA",
        description: "On 18 June ANMF members at the Flinders Medical Centre participated in the second 24-hour strike by ANMF members since the resumption of industrial action. If a decent offer is not forthcoming, the next strike will take place at the Royal Adelaide Hospital in early July.",
        locations: [
            { city: "Adelaide", state: "SA", lat: -35.0167, lng: 138.5667, name: "Flinders Medical Centre" }
        ],
        sources: [
            { name: "Disputes Report - 24 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-24-june" }
        ]
    },
    {
        id: 8209,
        actionId: "dof-offshore",
        title: "DOF ROV Workers Commence Rolling Stoppages",
        union: "Offshore Alliance",
        industry: "Offshore Energy",
        type: "strike",
        startDate: "2026-06-14",
        endDate: "",
        workers: null,
        state: "WA",
        description: "Offshore Alliance members working with Remotely Operated Vehicles (ROV) at DOF commenced rolling 1-hour stoppages on 14 June. According to the Offshore Alliance, DOF workers have been stuck on a substandard agreement since 2016 negotiated during an industry downturn. When work and profits returned, wages didn't. The Alliance has also warned that DOF is attempting to hire scabs.",
        locations: [
            { city: "Perth", state: "WA", lat: PER["Ocean"][0], lng: PER["Ocean"][1], name: "DOF Base" }
        ],
        sources: [
            { name: "Disputes Report - 24 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-24-june" }
        ]
    },
    {
        id: 8210,
        actionId: "racq-amwu",
        title: "RACQ Patrol Officers Hold Another Stoppage",
        union: "AMWU QLD",
        industry: "Roadside Assistance / Insurance",
        type: "strike",
        startDate: "2026-06-23",
        endDate: "2026-06-23",
        workers: null,
        state: "QLD",
        description: "Patrol Officers at RACQ held another stoppage on 23 June. Workers are fighting for a fair deal and want the bosses to come back to the negotiating table.",
        locations: [
            { city: "Brisbane", state: "QLD", lat: CITY_COORDS["Brisbane"][0], lng: CITY_COORDS["Brisbane"][1], name: "RACQ" }
        ],
        sources: [
            { name: "Disputes Report - 24 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-24-june" }
        ]
    },
    {
        id: 8211,
        actionId: "secure-journeys",
        title: "Secure Journeys Detention Workers Continue Action",
        union: "UWU",
        industry: "Detention Services",
        type: "strike",
        startDate: "2026-06-19",
        endDate: "",
        workers: null,
        description: "Industrial action at immigration detention centres around the country continued late last week. UWU members employed by Secure Journeys continue their campaign for decent wages, improvements to safety and to have unsafe rostering addressed.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: MELB["Secure Journeys Melbourne"][0], lng: MELB["Secure Journeys Melbourne"][1], name: "Melbourne Immigration Detention Centre" },
            { city: "Brisbane", state: "QLD", lat: BRIS["Secure Journeys Brisbane"][0], lng: BRIS["Secure Journeys Brisbane"][1], name: "Brisbane Immigration Detention Centre" }
        ],
        sources: [
            { name: "Disputes Report - 24 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-24-june" }
        ]
    },
    {
        id: 8212,
        actionId: "parks-victoria",
        title: "Parks Victoria Workers Rally at Board Meeting",
        union: "ASU / AWU / CPSU Victoria",
        industry: "Environment / Parks",
        type: "strike",
        startDate: "2026-06-24",
        endDate: "2026-06-24",
        workers: null,
        state: "VIC",
        description: "The dispute at Parks Victoria continues. CPSU members walked off the job and rallied outside Parks Victoria's Board meeting on 24 June. Work bans also remain in place.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Parks Victoria Board meeting" }
        ],
        sources: [
            { name: "Disputes Report - 24 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-24-june" }
        ]
    },
    {
        id: 8213,
        actionId: "glencore-mines-meu",
        title: "Glencore Mine Workers Vote for Industrial Action",
        union: "MEU",
        industry: "Mining",
        type: "ballotpass",
        startDate: "2026-06-23",
        endDate: "",
        workers: null,
        state: "NSW",
        description: "MEU members at three Glencore mines have voted in favour of industrial action: Wambo 95% yes, Mangoola 97% yes and Ravensworth 95% yes. Workers are ready to fight back against Glencore's proposed tiered pay structures, referred to as Glencore's Shifty Cuts.",
        locations: [
            { city: "Newcastle", state: "NSW", lat: MINE["Wambo"][0], lng: MINE["Wambo"][1], name: "Wambo Mine" },
            { city: "Hunter Valley", state: "NSW", lat: -32.2, lng: 150.9, name: "Mangoola Mine" },
            { city: "Hunter Valley", state: "NSW", lat: -32.4, lng: 151.0, name: "Ravensworth Mine" }
        ],
        sources: [
            { name: "Disputes Report - 24 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-24-june" }
        ]
    },
    {
        id: 8214,
        actionId: "bhp-hedland",
        title: "BHP Port Hedland Ballot and Draft Agreement",
        union: "AMWU / ETU / WMWA",
        industry: "Mining",
        type: "ballot",
        startDate: "2026-06-19",
        endDate: "2026-07-07",
        workers: null,
        state: "WA",
        description: "The Western Mine Workers Association (AWU and MEU) applied for a protected action ballot for members at BHP's Port Hedland operations, following successful ballots of AMWU and ETU members. Secretaries of the AMWU, ETU and AWU met on 19 June to plan leverage. BHP put forward a draft enterprise agreement on 23 June. A bargaining meeting is scheduled for 7 July, and strike action is not anticipated before then.",
        locations: [
            { city: "Port Hedland", state: "WA", lat: CITY_COORDS["Port Hedland"][0], lng: CITY_COORDS["Port Hedland"][1], name: "BHP Port Hedland" }
        ],
        sources: [
            { name: "Disputes Report - 24 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-24-june" }
        ]
    },
    {
        id: 8215,
        actionId: "sydney-construction-etu",
        title: "Sydney Construction Workers Win 5.25% First-Year Increase",
        union: "ETU NSW",
        industry: "Construction",
        type: "resolved",
        startDate: "2026-06-24",
        endDate: "2026-06-24",
        workers: null,
        state: "NSW",
        description: "ETU members at 12 construction companies in Sydney have won a 5.25% pay increase for the first year of their new agreement. While negotiations for the rest of the agreement continue, workers will benefit from the increase in their next pay packet with backpay to 1 May.",
        locations: [
            { city: "Sydney", state: "NSW", lat: CITY_COORDS["Sydney"][0], lng: CITY_COORDS["Sydney"][1], name: "Sydney construction sites" }
        ],
        sources: [
            { name: "Disputes Report - 24 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-24-june" }
        ]
    },
    {
        id: 8216,
        actionId: "inpex-ichthys",
        title: "Inpex In-Principle Agreement Reached, Ending Ichthys Action",
        union: "AWU / ETU / MUA",
        industry: "Oil & Gas",
        type: "resolved",
        startDate: "2026-06-17",
        endDate: "",
        workers: null,
        description: "An in-principle agreement between unions and Inpex was reached on 17 June, ending industrial action at the Ichthys gas facilities. Media reports say the agreement includes annual wage increases of 3.75%, improved job security and career progression systems. The Offshore Alliance alleged the strike action at Ichthys cost Inpex $200 million in lost production.",
        locations: [
            { city: "Darwin", state: "NT", lat: COMPANY["Ichthys gas field"][0], lng: COMPANY["Ichthys gas field"][1], name: "Ichthys gas facilities" }
        ],
        sources: [
            { name: "Disputes Report - 24 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-24-june" }
        ]
    },
    {
        id: 8217,
        actionId: "fleurieu-cranes-cfmeu",
        title: "Fleurieu Cranes Workers Vote Up New EBA",
        union: "CFMEU SA",
        industry: "Construction",
        type: "resolved",
        startDate: "2026-06-18",
        endDate: "2026-06-18",
        workers: null,
        state: "SA",
        description: "On 18 June the CFMEU shared that members at Fleurieu Cranes had voted up a new EBA. In March, protected action ballots were being voted on at Fleurieu Cranes and Crane Services, two of the biggest crane companies in South Australia. It is unclear if industrial action commenced or if the threat was enough. The union described it as a huge win.",
        locations: [
            { city: "Adelaide", state: "SA", lat: COMPANY["Fleurieu Cranes"][0], lng: COMPANY["Fleurieu Cranes"][1], name: "Fleurieu Cranes" }
        ],
        sources: [
            { name: "Disputes Report - 24 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-24-june" }
        ]
    },
    {
        id: 8218,
        actionId: "early-childhood-educators-uwu",
        title: "Early Childhood Educators Cancel July Action After Funding Win",
        union: "UWU",
        industry: "Early Childhood Education",
        type: "resolved",
        startDate: "2026-06-24",
        endDate: "2026-06-24",
        workers: null,
        description: "UWU members in early childhood education will no longer walk off the job in July as the Federal Government agreed to fund a 15% pay increase for another 18 months. Workers were facing a funding cliff and pay cut in November. The additional funding fills the gap until gender undervaluation wage increases come into effect in 2029.",
        locations: [
            { city: "Sydney", state: "NSW", lat: CITY_COORDS["Sydney"][0], lng: CITY_COORDS["Sydney"][1], name: "Early childhood centres" },
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Early childhood centres" }
        ],
        sources: [
            { name: "Disputes Report - 24 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-24-june" }
        ]
    },
    {
        id: 8219,
        actionId: "forest-firefighters-awu",
        title: "Forest Firefighters Win New Agreement After 18 Months",
        union: "AWU Victoria",
        industry: "Emergency Services / Forestry",
        type: "resolved",
        startDate: "2025-01-01",
        endDate: "2026-06-24",
        workers: 1000,
        state: "VIC",
        description: "After 18 months of protected industrial action, AWU forest firefighters have been successful in their campaign for a new agreement. No details on the agreement yet, but over the campaign membership grew from 300 to 1000 members.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Forest firefighting crews" }
        ],
        sources: [
            { name: "Disputes Report - 24 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-24-june" }
        ]
    },
    {
        id: 8220,
        actionId: "stowe-etu",
        title: "Stowe Workers Vote Up In-Principle Agreement",
        union: "ETU NSW",
        industry: "Construction / Manufacturing",
        type: "resolved",
        startDate: "2026-06-24",
        endDate: "2026-06-24",
        workers: null,
        state: "NSW",
        description: "After two weeks of industrial action, ETU members at Stowe have voted up an in-principle agreement. The agreement includes wage increases of 23.25% over 4 years (6%/6%/6%/5.25%), 5 weeks annual leave, improved parental leave, improvements to allowances and May Day guaranteed as a paid day off.",
        locations: [
            { city: "Sydney", state: "NSW", lat: COMPANY["Stowe"][0], lng: COMPANY["Stowe"][1], name: "Stowe" }
        ],
        sources: [
            { name: "Disputes Report - 24 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-24-june" }
        ]
    },
    {
        id: 8301,
        actionId: "inpex-ichthys",
        title: "Inpex Ichthys Workers Escalate Industrial Action",
        union: "AWU / ETU / MUA WA",
        industry: "Oil & Gas",
        type: "strike",
        startDate: "2026-06-02",
        endDate: "",
        workers: null,
        state: "NT",
        description: "On 2 June union members at all 3 Inpex Ichthys gas facilities walked off the job seeking 3% annual wage increases. Initial action was two 2-hour stoppages and bans on overtime and shift swaps. On 8 June unions accused Inpex of reneging on a classification framework offer and escalated to daily 8-hour stoppages. Inpex launched FWC s.424 proceedings, which were rejected on 13 June. On 12 June unions wound back to two 2-hour stoppages but rejected the latest offer. A notice to extend protected action beyond 23 June was being sent.",
        locations: [
            { city: "Darwin", state: "NT", lat: COMPANY["Ichthys gas field"][0], lng: COMPANY["Ichthys gas field"][1], name: "Ichthys gas facilities" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" }
        ]
    },
    {
        id: 8302,
        actionId: "parks-victoria",
        title: "Parks Victoria CPSU 24-Hour Strike and Ongoing Bans",
        union: "ASU / AWU / CPSU Vic",
        industry: "Environment / Parks",
        type: "strike",
        startDate: "2026-06-08",
        endDate: "",
        workers: null,
        state: "VIC",
        description: "CPSU members at Parks Victoria walked off the job for 24 hours on 11 June as an escalation in the campaign. ASU members held a one-hour stopwork rally on 8 June at Brimbank Park. CPSU altered long-weekend plans due to legal technicalities raised by Parks Victoria over 'closing' vs not opening parks, and instead escalated to a 24-hour strike. Indefinite bans remain on rubbish collection, cleaning facilities and fireplaces, and taking meal breaks in the field. Ballot membership: AWU 55, ASU 43, CPSU 304.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Parks Victoria" },
            { city: "Melbourne", state: "VIC", lat: -37.7500, lng: 144.8500, name: "Brimbank Park" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" }
        ]
    },
    {
        id: 8303,
        actionId: "keolis-downer-rtbu",
        title: "Keolis Downer Northern Beaches Drivers Stop Wearing Uniforms",
        union: "RTBU NSW",
        industry: "Transport",
        type: "strike",
        startDate: "2026-06-16",
        endDate: "",
        workers: null,
        state: "NSW",
        description: "Bus drivers in Sydney's Northern Beaches commenced industrial action with RTBU members stopping wearing their uniforms. The action is unlikely to disrupt passengers and is hoped to nudge Keolis Downer into a better offer. Workers seek a decent wage increase to keep up with cost of living and improved conditions. No agreement was reached between Keolis Downer Hunter and the RTBU after more than a year of negotiations; an intractable bargaining declaration was issued in April.",
        locations: [
            { city: "Sydney", state: "NSW", lat: SYD["Northern Beaches"][0], lng: SYD["Northern Beaches"][1], name: "Northern Beaches" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" }
        ]
    },
    {
        id: 8304,
        actionId: "msav-public-health",
        title: "MSAV and VAHPA Joint 24-Hour Strike and Rally",
        union: "MSAV / VAHPA",
        industry: "Healthcare",
        type: "strike",
        startDate: "2026-06-16",
        endDate: "2026-06-16",
        workers: null,
        state: "VIC",
        description: "On 16 June MSAV and VAHPA members joined forces for a combined rally during joint 24-hour strike action. Workers gathered in front of the Department of Health building before marching to Parliament House, with rally estimates of 2500-5000 people. MSAV has been negotiating for 14 months seeking 28% over 4 years; VAHPA has been negotiating for 8 months seeking 38.16% over 3 years.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Department of Health / Parliament House" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" }
        ]
    },
    {
        id: 8305,
        actionId: "nt-correctional-officers-uwu",
        title: "NT Correctional Officers Strike for 12 Hours",
        union: "UWU NT",
        industry: "Corrections",
        type: "strike",
        startDate: "2026-06-09",
        endDate: "2026-06-09",
        workers: null,
        state: "NT",
        description: "On 9 June correctional officers at Darwin Correctional Centre and Berrimah Correctional Centre walked off the job for 12 hours. The NT Government and Department of Corrections applied to the FWC to stop the action, but the application was dismissed and the strike went ahead. Prisoners were stuck in their cells and court proceedings were disrupted. A revised offer of 13% over 4 years is out to ballot, closing 29 June; UWU recommends a no vote.",
        locations: [
            { city: "Darwin", state: "NT", lat: CITY_COORDS["Darwin"][0], lng: CITY_COORDS["Darwin"][1], name: "Darwin Correctional Centre / Berrimah Correctional Centre" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" }
        ]
    },
    {
        id: 8306,
        actionId: "secure-journeys",
        title: "Secure Journeys Detention Workers Commence Industrial Action",
        union: "UWU",
        industry: "Detention Services",
        type: "strike",
        startDate: "2026-06-04",
        endDate: "",
        workers: null,
        description: "UWU members at Secure Journeys commenced industrial action on 4 June. Secure Journeys runs Australia's immigration detention network for Border Force. Workers are concerned about low pay, dangerous rosters, under-staffing and under-resourcing. After 10 bargaining meetings, Secure Journeys have not moved on any claims. Rostering and fatigue management are the biggest issues, with workers regularly working eleven 12-hour shifts in 15-day blocks. Action began with a one-hour stoppage on 4 June, followed by two one-hour stoppages on 5 June, escalating to two 2-hour stoppages on 11 and 12 June.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: MELB["Secure Journeys Melbourne"][0], lng: MELB["Secure Journeys Melbourne"][1], name: "Melbourne Immigration Detention Centre" },
            { city: "Brisbane", state: "QLD", lat: BRIS["Secure Journeys Brisbane"][0], lng: BRIS["Secure Journeys Brisbane"][1], name: "Brisbane Immigration Detention Centre" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" }
        ]
    },
    {
        id: 8307,
        actionId: "aeu-vic-teachers",
        title: "Victorian Teachers Vote on In-Principle Agreement",
        union: "AEU Victoria",
        industry: "Education",
        type: "ballot",
        startDate: "2026-06-16",
        endDate: "2026-06-18",
        workers: null,
        state: "VIC",
        description: "AEU members in Victoria are voting on whether to accept the in-principle agreement recommended by the branch council and executive. The ratification process takes place at sub-branch (school) level, with voting closing 5pm 18 June. If supported, the agreement goes to a ballot of all employees under the FWA. If rejected, the state government will withdraw its offer and negotiations will recommence. Socialists in Schools reported no votes at 17 schools, a small snapshot of over 1500 schools statewide.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Schools across Victoria" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" }
        ]
    },
    {
        id: 8308,
        actionId: "kinetic-tas-twu",
        title: "Tasmanian Kinetic Bus Drivers Strike for 6 Hours",
        union: "TWU Tasmania",
        industry: "Transport",
        type: "strike",
        startDate: "2026-06-11",
        endDate: "2026-06-11",
        workers: null,
        state: "TAS",
        description: "Bus drivers in Hobart and Launceston struck for 6 hours on 11 June, an escalation from a 2-hour stoppage in April. TWU members employed by Kinetic, which has a state government contract to run public buses, are paid up to $250 less per week than Metro drivers. Workers are fighting for pay parity. The state government said it would be inappropriate to get involved in a private dispute, but the union argues the state has a responsibility to ensure workers are paid appropriately.",
        locations: [
            { city: "Hobart", state: "TAS", lat: CITY_COORDS["Hobart"][0], lng: CITY_COORDS["Hobart"][1], name: "Kinetic Hobart" },
            { city: "Launceston", state: "TAS", lat: CITY_COORDS["Launceston"][0], lng: CITY_COORDS["Launceston"][1], name: "Kinetic Launceston" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" }
        ]
    },
    {
        id: 8309,
        actionId: "dxc-asu-professionals-australia",
        title: "DXC Workers Hold Fourth Round of Strike Action",
        union: "Professionals Australia / ASU",
        industry: "IT Services",
        type: "strike",
        startDate: "2026-06-09",
        endDate: "",
        workers: null,
        description: "Industrial action at DXC is ongoing, with a fourth round of strike action last week. DXC told workers that if they don't agree to the proposed offer by August their current agreements will lapse and they will be pushed back onto the Award (this is not true). About 85% of the agreement has been agreed, but key items remain unresolved including DXC's insistence on cutting standby rates. A worker interviewed by CRN said: 'You know what needs to be done. Stop blaming your masters in the US for being unable to reach an agreement.'",
        locations: [
            { city: "Canberra", state: "ACT", lat: CITY_COORDS["Canberra"][0], lng: CITY_COORDS["Canberra"][1], name: "ATO / DXC clients" },
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Victorian clients" },
            { city: "Gold Coast", state: "QLD", lat: CITY_COORDS["Gold Coast"][0], lng: CITY_COORDS["Gold Coast"][1], name: "City of Gold Coast" },
            { city: "Macquarie Park", state: "NSW", lat: COMPANY["DXC"]["HQ"][0], lng: COMPANY["DXC"]["HQ"][1], name: "DXC Australia Headquarters" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" }
        ]
    },
    {
        id: 8310,
        actionId: "act-aeu-teachers",
        title: "ACT Public School Teachers Hold First Full-Day Strike in 15 Years",
        union: "AEU ACT",
        industry: "Education",
        type: "strike",
        startDate: "2026-06-11",
        endDate: "2026-06-11",
        workers: null,
        state: "ACT",
        description: "On 11 June ACT school teachers went on strike for 24 hours, the first full-day strike by teachers in the Territory in more than 15 years. All public schools were closed with no on-site supervision. The action followed a 2-hour strike in May. AEU members are fighting for wage increases plus action on workload and staff shortages. Teachers and supporters met in Civic Square before marching to Glebe Park.",
        locations: [
            { city: "Canberra", state: "ACT", lat: CITY_COORDS["Canberra"][0], lng: CITY_COORDS["Canberra"][1], name: "Civic Square / Glebe Park" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" }
        ]
    },
    {
        id: 8311,
        actionId: "crown-melbourne-uwu",
        title: "Crown Melbourne Workers Vote Down Subpar Agreement",
        union: "UWU Vic",
        industry: "Hospitality / Gaming",
        type: "strike",
        startDate: "2026-06-16",
        endDate: "",
        workers: null,
        state: "VIC",
        description: "Crown put another subpar agreement out to vote and UWU ran a successful no campaign, with the agreement voted down by a substantial margin. Crown refused to allow the union to run meetings, put up digital noticeboard signs saying 'the union is lying to you', and pressured workers to vote yes. Bargaining has been going for close to a year and Crown is refusing to budge despite 2 weeks of FWC-facilitated intensive bargaining. Workers previously struck on New Year's Eve and Valentine's Day. The proposed agreement does not meet expectations for wages, conditions or job security.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: -37.8226, lng: 144.9580, name: "Crown Melbourne" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" }
        ]
    },
    {
        id: 8312,
        actionId: "anmf-sa-nurses",
        title: "SA Nurses and Midwives Return to Significant Industrial Action",
        union: "ANMF SA",
        industry: "Healthcare",
        type: "strike",
        startDate: "2026-06-04",
        endDate: "",
        workers: null,
        state: "SA",
        description: "ANMF members walked off the job for 24 hours at the Lyell McEwin Hospital on 4 June, returning to significant industrial action in the fight for a decent EBA offer. On 18 June ANMF members at Flinders Medical Centre commenced a 24-hour strike. In February the ANMF accepted an interim administrative wage increase and paused action before the state election. Negotiations have since hit another stalemate.",
        locations: [
            { city: "Adelaide", state: "SA", lat: -34.7500, lng: 138.6000, name: "Lyell McEwin Hospital" },
            { city: "Adelaide", state: "SA", lat: -35.0167, lng: 138.5667, name: "Flinders Medical Centre" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" }
        ]
    },
    {
        id: 8313,
        actionId: "peabody-meu",
        title: "Wambo Washery Industrial Action Continues",
        union: "MEU",
        industry: "Mining",
        type: "strike",
        startDate: "2026-05-01",
        endDate: "",
        workers: null,
        state: "NSW",
        description: "The dispute at the Wambo coal mine washery continues. MEU members in the washery have been taking industrial action for over a month, fighting for a fair agreement with a decent wage offer. Peabody has only offered 2.5% annual wage increases.",
        locations: [
            { city: "Newcastle", state: "NSW", lat: MINE["Wambo"][0], lng: MINE["Wambo"][1], name: "Wambo Washery" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" }
        ]
    },
    {
        id: 8314,
        actionId: "ugl-viva-refinery",
        title: "UGL Viva Refinery Workers Commence Industrial Action",
        union: "AMWU Vic",
        industry: "Oil & Gas",
        type: "strike",
        startDate: "2026-06-12",
        endDate: "",
        workers: null,
        state: "VIC",
        description: "AMWU members employed by UGL at the Viva oil refinery in Geelong commenced industrial action on 12 June, at the same refinery where there was a major fire in April. Workers held a 4-hour stoppage and commenced indefinite bans on overtime call-backs. UGL is trying to strip conditions including redundancy and income protection and force workers back onto the award. More stoppages are expected.",
        locations: [
            { city: "Geelong", state: "VIC", lat: COMPANY["Viva"][0], lng: COMPANY["Viva"][1], name: "Viva Oil Refinery" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" }
        ]
    },
    {
        id: 8315,
        actionId: "stowe-etu",
        title: "Stowe Workers Strike, Shutting Down Microsoft Data Centre Build",
        union: "ETU NSW",
        industry: "Construction",
        type: "strike",
        startDate: "2026-06-11",
        endDate: "",
        workers: null,
        state: "NSW",
        description: "On 11 June ETU members at Stowe voted to commence strike action with 24-hour stoppages for the rest of the week. Workers met again on 15 June and voted to continue striking for another 48 hours. The stoppages are causing significant disruption including shutting down construction of the $1.3 billion Microsoft data centre in Kemps Creek. Workers are fighting for a better offer with higher wages and improved conditions.",
        locations: [
            { city: "Sydney", state: "NSW", lat: CITY_COORDS["Sydney"][0], lng: CITY_COORDS["Sydney"][1], name: "Stowe" },
            { city: "Kemps Creek", state: "NSW", lat: -33.8500, lng: 150.8000, name: "Microsoft data centre, Kemps Creek" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" }
        ]
    },
    {
        id: 8316,
        actionId: "cleanco-kareeya",
        title: "Cleanco Barron Gorge Workers Take Industrial Action",
        union: "ETU QLD",
        industry: "Energy",
        type: "strike",
        startDate: "2026-06-05",
        endDate: "2026-06-05",
        workers: null,
        state: "QLD",
        description: "Workers at Cleanco Barron Gorge took industrial action on 5 June as part of their EBA campaign. These ETU members work on the Barron Gorge Hydroelectric Power Station.",
        locations: [
            { city: "Cairns", state: "QLD", lat: CITY_COORDS["Cairns"][0], lng: CITY_COORDS["Cairns"][1], name: "Barron Gorge Hydroelectric Power Station" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" }
        ]
    },
    {
        id: 8317,
        actionId: "melb-councils-asu",
        title: "Melbourne Council Workers Hold Second Strike",
        union: "ASU Vic",
        industry: "Local Government",
        type: "strike",
        startDate: "2026-06-17",
        endDate: "2026-06-17",
        workers: null,
        state: "VIC",
        description: "ASU members from 8 metropolitan Melbourne city councils walked off the job on 17 June, the second strike in pursuit of a decent multi-employer agreement. Workers from Merri-bek Council rallied outside council chambers in Coburg before the previous week's Council meeting urging increased budget allocation for labour costs.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Various metropolitan councils" },
            { city: "Coburg", state: "VIC", lat: CITY_COORDS["Coburg"][0], lng: CITY_COORDS["Coburg"][1], name: "Merri-bek Council" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" }
        ]
    },
    {
        id: 8318,
        actionId: "tmr-qld-etu",
        title: "Queensland Transport and Main Roads Workers Continue Action",
        union: "ETU QLD",
        industry: "Public Sector",
        type: "strike",
        startDate: "2026-06-08",
        endDate: "",
        workers: null,
        state: "QLD",
        description: "The dispute between workers at the state government Department of Transport and Main Roads continues. ETU members in Cairns participated in industrial action on 8 June. Industrial action commenced at TMR in September last year.",
        locations: [
            { city: "Cairns", state: "QLD", lat: CITY_COORDS["Cairns"][0], lng: CITY_COORDS["Cairns"][1], name: "Department of Transport and Main Roads" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" }
        ]
    },
    {
        id: 8319,
        actionId: "racq-amwu",
        title: "RACQ Patrol Workers Locked Out After Partial Work Bans",
        union: "AMWU QLD",
        industry: "Roadside Assistance / Insurance",
        type: "lockout",
        startDate: "2026-06-01",
        endDate: "",
        workers: null,
        state: "QLD",
        description: "In the first week of June, following a unanimous yes vote in a protected action ballot, AMWU member patrol workers at the RACQ commenced partial work bans. The RACQ refused to accept partial work, essentially locking workers out. Bosses have followed up by lecturing workers not to mention the dispute to RACQ members or explain that delays are related to industrial action. Workers are fighting for pay parity with RACQ auto workshop mechanics.",
        locations: [
            { city: "Brisbane", state: "QLD", lat: COMPANY["RACQ"][0], lng: COMPANY["RACQ"][1], name: "RACQ" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" }
        ]
    },
    {
        id: 8320,
        actionId: "scgh-mortuary-hsu",
        title: "Sir Charles Gairdner Hospital Mortuary Technicians Stop Work",
        union: "HSU WA",
        industry: "Healthcare",
        type: "strike",
        startDate: "2026-06-01",
        endDate: "",
        workers: 11,
        state: "WA",
        description: "Mortuary technicians at Sir Charles Gairdner Hospital in Perth took stop work action in early June. Management put forward a proposal for 24/7 rosters. HSUWA members are fighting to ensure appropriate parameters are adopted so workers are supported through the change.",
        locations: [
            { city: "Perth", state: "WA", lat: -31.9505, lng: 115.8000, name: "Sir Charles Gairdner Hospital" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" },
            { name: "HSU WA Insta Post", url: "https://www.instagram.com/p/DZcXKJpjEEE/" },
        ]
    },
    {
        id: 8321,
        actionId: "nrma-amwu",
        title: "NRMA Patrol Officers Strike for First Time in 20 Years",
        union: "AMWU NSW",
        industry: "Roadside Assistance",
        type: "strike",
        startDate: "2026-06-15",
        endDate: "",
        workers: 260,
        state: "NSW",
        description: "On 15 June NRMA patrol officers marched to NRMA headquarters to hand deliver their claims, demanding a 17% wage increase over 4 years. Workers and their union have been bargaining for 6 months without a deal. On Monday evening 260 AMWU members at the NRMA commenced a 48-hour strike. It has been 20 years since NRMA workers last went on strike.",
        locations: [
            { city: "Sydney", state: "NSW", lat: COMPANY["NRMA"][0], lng: COMPANY["NRMA"][1], name: "NRMA Headquarters" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" }
        ]
    },
    {
        id: 8322,
        actionId: "alcoa-ugl-amwu",
        title: "UGL Alcoa Workers Vote in Favour of Industrial Action",
        union: "AMWU WA",
        industry: "Manufacturing",
        type: "ballot",
        startDate: "2026-06-16",
        endDate: "",
        workers: null,
        state: "WA",
        description: "AMWU members employed by UGL at Alcoa Wagerup and Pinjarra voted in favour of industrial action, with 98.9% of participating members in favour. The protected action ballot comes after months of bargaining and a subpar offer from the bosses.",
        locations: [
            { city: "Perth", state: "WA", lat: COMPANY["Alcoa"]["WA"][0], lng: COMPANY["Alcoa"]["WA"][1], name: "Alcoa Wagerup / Pinjarra" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" }
        ]
    },
    {
        id: 8323,
        actionId: "bhp-hedland",
        title: "BHP Port Hedland Workers Vote Overwhelmingly for Strike Action",
        union: "AMWU / ETU WA",
        industry: "Mining",
        type: "ballot",
        startDate: "2026-06-16",
        endDate: "",
        workers: null,
        state: "WA",
        description: "90% of AMWU members and 100% of ETU members at BHP's Port Hedland operation voted in favour of taking strike action. The unions accuse BHP of progressively ripping away conditions including rent subsidies, transport to and from work, meals while on shift and healthcare support. Workers are fighting for clear classification criteria, enforceable conditions and parity for workers at the port with the same skills and experience. Negotiations have been underway for 6 months but BHP has not been cooperative, and had already started trying to recruit scabs before the ballots were counted. No notice of industrial action has been given yet.",
        locations: [
            { city: "Port Hedland", state: "WA", lat: CITY_COORDS["Port Hedland"][0], lng: CITY_COORDS["Port Hedland"][1], name: "BHP Port Hedland" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" }
        ]
    },
    {
        id: 8324,
        actionId: "ambulance-tas-hacsu",
        title: "Ambulance Tasmania Workers Endorse New Agreement",
        union: "HACSU Tasmania",
        industry: "Emergency Services / Ambulance",
        type: "resolved",
        startDate: "2026-06-16",
        endDate: "2026-06-16",
        workers: null,
        state: "TAS",
        description: "87% of HACSU members endorsed a new agreement with Ambulance Tasmania, bringing a long dispute to an end after industrial action commenced 9 months ago. The agreement includes the standard 8.75% wage increase over 3 years, plus structural adjustments, a modernised classification structure and improved conditions. HACSU state secretary Robbie Moore confirmed the agreement addresses key issues around rostering and single officer responses. It will soon be lodged with the Tasmanian Industrial Commission.",
        locations: [
            { city: "Hobart", state: "TAS", lat: CITY_COORDS["Hobart"][0], lng: CITY_COORDS["Hobart"][1], name: "Ambulance Tasmania" }
        ],
        sources: [
            { name: "Disputes Report - 17 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-17-june" }
        ]
    },
    {
        id: 8401,
        actionId: "inpex-ichthys",
        title: "Inpex Ichthys Workers Commence Industrial Action",
        union: "AWU / ETU / MUA WA",
        industry: "Oil & Gas",
        type: "strike",
        startDate: "2026-06-02",
        endDate: "",
        workers: null,
        state: "NT",
        description: "Union members at Inpex's Ichthys LNG facilities commenced industrial action on 2 June. According to the Offshore Alliance, while significant progress was made in negotiations, they fell short on a number of fundamental claims. Workers are fighting for 3% annual wage increases and improvements to conditions. AREEA claimed this would increase labour costs by 50-60%. Action at 3 facilities included stoppages and work bans. Workers were set to commence action the previous week but it was suspended at the eleventh hour.",
        locations: [
            { city: "Darwin", state: "NT", lat: COMPANY["Ichthys gas field"][0], lng: COMPANY["Ichthys gas field"][1], name: "Ichthys gas facilities" }
        ],
        sources: [
            { name: "Disputes Report - 3 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-3-june" }
        ]
    },
    {
        id: 8402,
        actionId: "port-adelaide-enfield-asu",
        title: "City of Port Adelaide Enfield Workers Take First Action Since 1990s",
        union: "ASU SA",
        industry: "Local Government",
        type: "strike",
        startDate: "2026-06-02",
        endDate: "",
        workers: null,
        state: "SA",
        description: "ASU members at the City of Port Adelaide Enfield commenced industrial action on 2 June, the first time since the 1990s that City of PAE workers have taken action. The stoppage comes after ASU members twice rejected an agreement from management. The dispute is not just about wages and conditions; management has proposed allowing the Council to move employees into entirely different roles. ASU members are likely to escalate over the next fortnight with work bans across libraries, depots and the civic centre.",
        locations: [
            { city: "Adelaide", state: "SA", lat: -34.8604, lng: 138.5680, name: "City of Port Adelaide Enfield" }
        ],
        sources: [
            { name: "Disputes Report - 3 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-3-june" }
        ]
    },
    {
        id: 8403,
        actionId: "parks-victoria",
        title: "Parks Victoria Industrial Action Continues Across Three Unions",
        union: "ASU / AWU / CPSU Vic",
        industry: "Environment / Parks",
        type: "strike",
        startDate: "2026-06-02",
        endDate: "",
        workers: null,
        state: "VIC",
        description: "Industrial action at Parks Victoria continues by ASU, AWU and CPSU members. ASU members are writing slogans on PV vehicles, displaying campaign signs, and have bans on rubbish collection, cleaning facilities and fireplaces, travelling between work centres, and meal breaks in the field. AWU members are calling for reclassification and pay uplift for rangers, displaying campaign material, making media statements, placing signage at parks and on PV vehicles, and adding campaign email signatures and auto-replies. CPSU members have stoppages and indefinite bans on online tasks, responding to Ministerial enquiries, rubbish collection, cleaning, meal breaks in the field, plus campaign material, media statements and email signatures. More action is likely over the long weekend. All union members are calling for pay parity with public sector colleagues.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Parks Victoria" }
        ],
        sources: [
            { name: "Disputes Report - 3 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-3-june" }
        ]
    },
    {
        id: 8404,
        actionId: "ieu-vic-catholic-teachers",
        title: "Victorian Catholic Teachers Launch Term of Action",
        union: "IEU Vic",
        industry: "Education",
        type: "strike",
        startDate: "2026-05-29",
        endDate: "",
        workers: null,
        state: "VIC",
        description: "The IEU in Victoria is pursuing a Single Interest Application to bargain across the whole Catholic sector in Victoria. While awaiting a Fair Work Commission ruling, the union launched a term of action. Catholic teachers across the state held before or after school rallies on 29 May and will wear IEU t-shirts on Fridays going forward. The IEU has put forward 113 claims, of which 100 have been rejected outright. Members are fighting for decent pay, improved conditions and union rights.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Catholic schools across Victoria" }
        ],
        sources: [
            { name: "Disputes Report - 3 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-3-june" }
        ]
    },
    {
        id: 8405,
        actionId: "qld-rail-amwu-etu",
        title: "Queensland Rail Blames Union Action for Reduced Timetable",
        union: "AMWU / ASU / ETU / RTBU QLD",
        industry: "Rail Transport",
        type: "strike",
        startDate: "2026-06-01",
        endDate: "",
        workers: null,
        state: "QLD",
        description: "Queensland Rail issued a press release announcing regional trains would move to a reduced timetable from 1 June due to 'impacts from union protected industrial action'. The Courier Mail picked this up close to verbatim. No mention was made that maintenance disruption could have been minimised by accepting partial work bans or by making a decent offer. The disruptions in this protracted dispute lie with the bosses and state government, not the workers.",
        locations: [
            { city: "Brisbane", state: "QLD", lat: CITY_COORDS["Brisbane"][0], lng: CITY_COORDS["Brisbane"][1], name: "Queensland Rail Network" }
        ],
        sources: [
            { name: "Disputes Report - 3 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-3-june" }
        ]
    },
    {
        id: 8406,
        actionId: "dxc-asu-professionals-australia",
        title: "DXC Uses Contractors Lacking Security Clearances During Strike",
        union: "ASU / Professionals Australia",
        industry: "IT Services",
        type: "strike",
        startDate: "2026-06-02",
        endDate: "",
        workers: null,
        description: "Industrial action and strike-breaking tactics continue at IT services provider DXC. While workers participated in stoppages, DXC attempted to bring in contractors to cover gaps. According to unions, many of these contractors did not have the required security clearances needed to work on sensitive government accounts. DXC's clients include the Department of Defence, Australian Signals Directorate, the ATO and the Department of Home Affairs.",
        locations: [
            { city: "Canberra", state: "ACT", lat: CITY_COORDS["Canberra"][0], lng: CITY_COORDS["Canberra"][1], name: "ATO / Department of Defence / ASD / Home Affairs" },
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "DXC clients" },
            { city: "Macquarie Park", state: "NSW", lat: COMPANY["DXC"]["HQ"][0], lng: COMPANY["DXC"]["HQ"][1], name: "DXC Australia Headquarters" }
        ],
        sources: [
            { name: "Disputes Report - 3 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-3-june" }
        ]
    },
    {
        id: 8407,
        actionId: "glencore-wambo-meu",
        title: "Wambo United Joint Venture Workers Vote for Industrial Action",
        union: "MEU",
        industry: "Mining",
        type: "ballotpass",
        startDate: "2026-06-02",
        endDate: "",
        workers: null,
        state: "NSW",
        description: "Over 95% of MEU members at the Wambo United Joint Venture coal mine near Singleton voted in favour of taking industrial action, with 95% of eligible workers participating. The MEU is negotiating a replacement EBA. Management has proposed lower tier classifications that would undermine Same Job Same Pay laws, changes to on-site conditions, no backpay, and has shown a lack of engagement on workers' claims.",
        locations: [
            { city: "Singleton", state: "NSW", lat: -32.5667, lng: 151.1667, name: "Wambo United Joint Venture" }
        ],
        sources: [
            { name: "Disputes Report - 3 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-3-june" }
        ]
    },
    {
        id: 8408,
        actionId: "dof-offshore",
        title: "DOF ROV Workers Vote Overwhelmingly for Industrial Action",
        union: "Offshore Alliance",
        industry: "Offshore Energy",
        type: "ballot",
        startDate: "2026-06-02",
        endDate: "",
        workers: null,
        state: "WA",
        description: "Offshore Alliance members working with Remotely Operated Vehicles (ROV) at DOF overwhelmingly voted in favour of industrial action. DOF is a Norwegian-based multinational providing offshore services including construction, repair, inspection and maintenance. 95% of eligible members participated in the ballot, and 100% of participants voted in favour.",
        locations: [
            { city: "Perth", state: "WA", lat: PER["Ocean"][0], lng: PER["Ocean"][1], name: "DOF Base" }
        ],
        sources: [
            { name: "Disputes Report - 3 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-3-june" }
        ]
    },
    {
        id: 8409,
        actionId: "isis-sugar-mill-amwu",
        title: "Isis Sugar Mill Workers Vote for Industrial Action",
        union: "AMWU QLD",
        industry: "Food Manufacturing",
        type: "ballot",
        startDate: "2026-06-02",
        endDate: "",
        workers: null,
        state: "QLD",
        description: "Workers at the Isis Sugar Mill in Cordalba voted in favour of taking industrial action. At least 85% of voters supported each measure on the ballot. AMWU members are ready to fight for a fair EBA with better pay, stronger conditions and respect.",
        locations: [
            { city: "Cordalba", state: "QLD", lat: -25.1667, lng: 152.2333, name: "Isis Sugar Mill" }
        ],
        sources: [
            { name: "Disputes Report - 3 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-3-june" }
        ]
    },
    {
        id: 84091,
        actionId: "isis-sugar-mill-amwu",
        title: "AMWU / AWU / CEPU and Isis Central Sugar Mill Company Limited - Protected Action Ballot",
        union: "AMWU",
        industry: "Other",
        type: "ballot",
        startDate: "2026-05-26",
        endDate: "",
        workers: null,
        description: "Protected action ballot result from Fair Work Commission. Workers have voted in favour of taking industrial action.",
        locations: [
            {
                city: "Unknown",
                state: "",
                lat: -25.5,
                lng: 134.0,
                name: "Isis Central Sugar Mill Company Limited"
            }
        ],
        sources: [
            {
                name: "AMWU FWC Ballot Result",
                url: "https://www.fwc.gov.au/documents/ballot-results/amwu_2026526.pdf"
            },
            {
                name: "AWU FWC Ballot Result",
                url: "https://www.fwc.gov.au/documents/ballot-results/awu_2026489.pdf"
            },
            {
                name: "CEPU FWC Ballot Result",
                url: "https://www.fwc.gov.au/documents/ballot-results/cepu_2026487.pdf"
            }
        ],
        tags: ["other", "amwu", "fwc-ballot"]
    },

    {
        id: 8410,
        actionId: "bhp-hedland",
        title: "BHP Port Hedland Unions Apply for Protected Action Ballots",
        union: "AMWU / ETU WA",
        industry: "Mining",
        type: "ballot",
        startDate: "2026-06-02",
        endDate: "",
        workers: null,
        state: "WA",
        description: "Both the AMWU and ETU applied for protected action ballot orders at BHP's port operations at Port Hedland. Negotiations have been underway for 6 months but fruitless. Media reports claim AMWU and ETU members make up just under half of BHP's workforce at the port and could cause serious disruption. High-voltage electricians at BHP are already taking industrial action in a separate pay dispute. A proposed offer for South Flank and Mining Area C was described by the ETU as 'a pile of snot', by the AMWU as full of 'vague classifications, management discretion and salary absorption clauses', and by the AWU as a 'significant step forward'.",
        locations: [
            { city: "Port Hedland", state: "WA", lat: CITY_COORDS["Port Hedland"][0], lng: CITY_COORDS["Port Hedland"][1], name: "BHP Port Hedland" }
        ],
        sources: [
            { name: "Disputes Report - 3 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-3-june" }
        ]
    },
    {
        id: 8411,
        actionId: "hwu-public-sector-health",
        title: "HWU Public Sector Health Workers Endorse New Agreement",
        union: "HWU",
        industry: "Healthcare",
        type: "resolved",
        startDate: "2026-06-02",
        endDate: "",
        workers: 22271,
        state: "VIC",
        description: "Public sector health and allied services, manager and administrative workers voted up a new agreement. 91.3% of HWU members endorsed the deal, with 94% of workers who voted in the final ballot saying yes. The deal includes a 12.5% wage increase over 2.5 years, backpay from December 2025, a $1500 pro-rata cash payment, and improvements including enforceable workload protections, reproductive health leave, an increase in personal days without evidence and more.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Victorian public health services" }
        ],
        sources: [
            { name: "Disputes Report - 3 June", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-3-june" },
            { name: "HWU Victoria - Facebook Post June 1", url: "https://www.facebook.com/healthworkersunion/posts/pfbid03434HvJmGbptvL7ww52M3mmxNPPwAfhW7XwEFc9QG6brAyU8cDmrU1UXG5jLnY9PDl" },
        ]
    },
    {
        id: 8508,
        actionId: "hwu-public-sector-health",
        title: "Victorian Health Workers Endorse New Enterprise Agreement",
        union: "HWU",
        industry: "Healthcare",
        type: "resolved",
        startDate: "2026-06-03",
        endDate: "2026-06-03",
        workers: 22267,
        state: "VIC",
        description: "Victorian health workers emphatically endorsed their new Public Sector Enterprise Agreement, with 93.5% voting in favour and more than 22,000 workers taking part. A total of 20,832 healthcare workers voted yes, with fifteen health services returning a unanimous 100% endorsement. The deal delivers significant wage increases and workplace improvements for tens of thousands of workers. The vote coincided with Administrator Charlie Donnelly certifying that the HWU is functioning effectively and ready to be returned to democratic control, following a turnaround in finances and membership growth from 10,674 to more than 14,500 since administration began in December 2024.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Victorian health services" }
        ],
        sources: [
            { name: "HWU - Statement from the Administrator Charlie Donnelly, 3 June 2026", url: "https://hwu.org.au/statement-from-the-administrator-charlie-donnelly/" }
        ],
        tags: ["healthcare"]
    },
    {
        id: 8601,
        actionId: "tasports",
        title: "TasPorts MUA and AMOU Members Commence Industrial Action",
        union: "AMOU / MUA Tasmania",
        industry: "Ports",
        type: "strike",
        startDate: "2026-09-12",
        endDate: "",
        workers: null,
        state: "TAS",
        description: "AMOU and MUA members at TasPorts commenced industrial action at 6am on Saturday 12 September. Workers participated in a 4-hour stoppage on Saturday morning and a range of ongoing work bans are in place. Workers are fighting for a fair wage increase, pay rates comparable with equivalent workers interstate, and an increase in superannuation contributions from 12.5% to 15%. Workers were originally poised to take action in early August, but it was suspended.",
        locations: [
            { city: "Hobart", state: "TAS", lat: PORT["Hobart"][0], lng: PORT["Hobart"][1], name: "Hobart Port" },
            { city: "Burnie", state: "TAS", lat: CITY_COORDS["Burnie"][0], lng: CITY_COORDS["Burnie"][1], name: "Burnie Port" },
            { city: "Devonport", state: "TAS", lat: CITY_COORDS["Devonport"][0], lng: CITY_COORDS["Devonport"][1], name: "Devonport Port" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ]
    },
    {
        id: 8602,
        actionId: "qut-nteu",
        title: "QUT NTEU Members Commence Industrial Action",
        union: "NTEU",
        industry: "Education",
        type: "strike",
        startDate: "2026-09-16",
        endDate: "",
        workers: null,
        state: "QLD",
        description: "NTEU members at the Queensland University of Technology commenced industrial action. Workers stopped work for two hours on 16 September from 11:30am-1:30pm. Work bans include a ban on meeting with supervisors, managers and Deans; periodic bans on using Outlook, Canvas and Salesforce; wearing NTEU merchandise; and interrupting work to make statements about taking protected industrial action. The NTEU began negotiations with QUT in December 2025 and the university is yet to make a counter offer on pay, with no agreement on fixing workloads or improving change management provisions. QUT has applied to the FWC to mediate negotiations rather than working with the union directly. Workers are fighting for a 20% wage increase, protection from AI, workload protections and improvements to leave.",
        locations: [
            { city: "Brisbane", state: "QLD", lat: QLD["QUT"][0], lng: QLD["QUT"][1], name: "Queensland University of Technology" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ],
        tags: ["education"]
    },
    {
        id: 8603,
        actionId: "bhp-hedland",
        title: "BHP Port Hedland Talks Stall, Unions Seek Intractable Bargaining Declaration",
        union: "AMWU / AWU / ETU",
        industry: "Mining",
        type: "strike",
        startDate: "2026-09-08",
        endDate: "",
        workers: null,
        state: "WA",
        description: "On 8 September, BHP and unions with members at Port Hedland met at the FWC but no agreement was reached. BHP offered a $25,000 transition payment and a 17% wage increase over the proposed 4-year agreement. According to ETU WA Branch secretary Adam Woodage, under the proposal 40% of the workforce would be 'going backwards'. Woodage said: 'There were two major tiers of conditions, we want everyone on the good tier… they want everyone on the shit tier.' The sticking point is that BHP's base wages are below what most workers are currently paid and rely on performance payments to top up take-home pay. Unions do not want existing wage inequalities resolved by cutting some workers' wages. The AMWU, AWU and ETU are applying to the FWC for an intractable bargaining declaration, which if granted would kick off an arbitration process.",
        locations: [
            { city: "Port Hedland", state: "WA", lat: CITY_COORDS["Port Hedland"][0], lng: CITY_COORDS["Port Hedland"][1], name: "BHP Port Hedland" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ],
        tags: ["mining", "stall", "negotiations"]
    },
    {
        id: 8604,
        actionId: "uq-nteu",
        title: "University of Queensland NTEU Half-Day Strike and Work Bans",
        union: "NTEU",
        industry: "Education",
        type: "strike",
        startDate: "2026-09-08",
        endDate: "2026-09-08",
        workers: null,
        state: "QLD",
        description: "On 8 September NTEU members at the University of Queensland struck for half a day. Workers have also been participating in a ban on meetings with supervisors, managers and Deans, and a ban on participation in staff appraisal processes. Workers are fighting for a 20% pay increase over 3 years, but the University is offering only 12% over 4 years. Other key sticking points include the NTEU's claim for 17% superannuation for casuals, action on workload, and an end-of-year shutdown. Bargaining with the university commenced in February this year.",
        locations: [
            { city: "Brisbane", state: "QLD", lat: UNI["QLD"][0], lng: UNI["QLD"][1], name: "University of Queensland" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ],
        tags: ["education", "nteu"]
    },
    {
        id: 8605,
        actionId: "fedex-lock-out-transport-strike",
        title: "FedEx Locks Out 3000 Workers After National Transport Strike",
        union: "TWU",
        industry: "Transport / Logistics",
        type: "lockout",
        startDate: "2026-09-11",
        endDate: "",
        workers: 3000,
        description: "Thousands of transport workers at FedEx, <a href='#twu-transport-strike'>Border Express, K&S, SCT, PFD, Sadliers, Goldstar and Qube struck for 24 hours on Thursday 10 September.</a> In response to Thursday's strike action, FedEx locked out 3000 workers across the country on Friday 11 September.",
        see_also: "",
        locations: [
            { city: "Sydney", state: "NSW", lat: COMPANY["FedEx"]["SYD"][0], lng: COMPANY["FedEx"]["SYD"][1], name: "FedEx Sydney" },
            { city: "Melbourne", state: "VIC", lat: COMPANY["FedEx"]["MELB"][0], lng: COMPANY["FedEx"]["MELB"][1], name: "FedEx Melbourne" },
            { city: "Brisbane", state: "QLD", lat: COMPANY["FedEx"]["BRIS"][0], lng: COMPANY["FedEx"]["BRIS"][1], name: "FedEx Brisbane" },
            { city: "Perth", state: "WA", lat: COMPANY["FedEx"]["PER"][0], lng: COMPANY["FedEx"]["PER"][1], name: "FedEx Perth" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ]
    },
    {
        id: 8606,
        actionId: "griffith-nteu",
        title: "Griffith University NTEU Members Hold Stoppages",
        union: "NTEU",
        industry: "Education",
        type: "stoppage",
        startDate: "2026-09-09",
        endDate: "2026-09-09",
        workers: null,
        state: "QLD",
        description: "NTEU members at Griffith University have held two 30-minute stoppages recently, the first on 26 August and the second on 9 September. Workers are fighting for a 20% wage increase, but Griffith University has neither responded to this claim nor put a counter offer. As with QUT and UQ, workers at Griffith are also fighting for protections against AI, action on workload, 17% superannuation for casuals and improvements to leave.",
        locations: [
            { city: "Brisbane", state: "QLD", lat: QLD["Griffith Uni"][0], lng: QLD["Griffith Uni"][1], name: "Griffith University" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ],
        tags: ["education", "nteu"]
    },
    {
        id: 8607,
        actionId: "scope-hacsu",
        title: "Scope Disability Workers Walk Off at 35 Housing Homes",
        union: "HACSU Vic",
        industry: "Disability Services",
        type: "strike",
        startDate: "2026-09-11",
        endDate: "",
        workers: null,
        state: "VIC",
        description: "On Friday 11 September, workers from 35 disability housing homes walked off the job and rallied outside Scope's headquarters. Workers and their union have been in negotiations for a new EBA for 2 years. The dispute centres on public services being outsourced to private providers, resulting in worse wages for workers and likely worse standards of care for people with disabilities.",
        locations: [
            { city: "Hawthorn", state: "VIC", lat: CITY_COORDS["Hawthorn"][0], lng: CITY_COORDS["Hawthorn"][1], name: "Scope Head Office" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" },
            { name: "The Age - Scope disability workers strike over pay", url: "https://www.theage.com.au/national/victoria/scope-disability-workers-strike-over-pay-20260911-p5a2kz.html" }
        ]
    },
    {
        id: 8608,
        actionId: "sydney-ferries",
        title: "Transdev Cancels Parramatta River Ferries Amid MUA Dispute",
        union: "MUA",
        industry: "Transport",
        type: "strike",
        startDate: "2026-09-12",
        endDate: "2026-09-13",
        workers: null,
        state: "NSW",
        description: "The MUA's dispute with Sydney ferries operator Transdev continues. While the MUA invited Sydneysiders to enjoy free ferry rides, Transdev maintains the MUA cannot turn off Opal card readers as part of industrial action and that passengers must tap on and tap off. Transdev then cancelled ferry services along the Parramatta River over the weekend of 12-13 September. While Transdev claimed this was linked to industrial action, the MUA said it was retaliation, with Deputy Branch Secretary Paul Garrett saying: 'If Transdev chooses to cancel services, that is a decision being made by the company, not by the workers. The workers are ready to do their jobs and will be at work across the weekend being paid to leave boats tied up to the wharf.' MUA members are fighting for a decent deal and wages that keep up with the cost of living.",
        locations: [
            { city: "Sydney", state: "NSW", lat: SYD["Quay"][0], lng: SYD["Quay"][1], name: "Circular Quay / Parramatta River" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ]
    },
    {
        id: 8609,
        actionId: "vic-doctors-strike",
        title: "ASMOF Victoria Withdraws Planned 24-Hour Strike After Government Threat",
        union: "ASMOF Vic",
        industry: "Healthcare",
        type: "update",
        startDate: "2026-09-15",
        endDate: "",
        workers: null,
        state: "VIC",
        description: "Public hospital doctors were planning to strike for 24 hours on 15 September, but the action was called off on Monday 14 September. According to ASMOF: 'On Friday, the Government advised us that if it did not believe hospitals could be sufficiently staffed during the stoppage, it would use technical and patient safety mechanisms available to it to seek to stop the action. That has occurred. Following legal advice and discussions in the Commission today, ASMOF Victoria has withdrawn the planned 24-hour stoppage on Sep 17.' Patient safety was enough of an issue for the state government to suspend industrial action, but not enough to address key claims including banning shifts longer than 12.5 hours, capping consecutive night shifts at four in a row and introducing doctor-to-patient ratios.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Various Melbourne hospitals" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ]
    },
    {
        id: 8610,
        actionId: "rivercity-ferries",
        title: "River City Ferries Stoppages Continue on CityCat Services",
        union: "AMOU / MUA",
        industry: "Transport",
        type: "strike",
        startDate: "2026-09-10",
        endDate: "",
        workers: null,
        state: "QLD",
        description: "The dispute between River City Ferries and the MUA continues with more stoppages on CityCat ferries. A 24-hour stoppage was held from 4am on Thursday 10 September. Two 2-hour stoppages were held on 16 and 17 September targeting peak hours of 8am-10am and 4pm-6pm. Workers are fighting for a 6% wage increase in the first year of a new agreement followed by 4.75% or the FWC increase, whichever is greater, as well as backpay from the expiry of the current agreement and improvements to conditions.",
        locations: [
            { city: "Brisbane", state: "QLD", lat: CITY_COORDS["Brisbane"][0], lng: CITY_COORDS["Brisbane"][1], name: "Brisbane River" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ]
    },
    {
        id: 8611,
        actionId: "act-public-sector",
        title: "ACT Public Sector Workers Reject Latest Pay Offer",
        union: "AEU / CFMEU / CPSU / Professionals Australia",
        industry: "Public Sector",
        type: "strike",
        startDate: "2026-09-15",
        endDate: "",
        workers: null,
        state: "ACT",
        description: "Workers in the ACT public sector rejected the Territory Government's most recent pay offer. Unions ran a vote no campaign on the offer, which included top-up payments if inflation hit certain levels but did not budge from the base 9% pay increase over 3 years. 63% of those who participated rejected the offer. Several unions including the CPSU and AEU have threatened to escalate industrial action. Professionals Australia were first out of the barriers, with ACT pharmacists striking for two hours on 15 September.",
        locations: [
            { city: "Canberra", state: "ACT", lat: CITY_COORDS["Canberra"][0], lng: CITY_COORDS["Canberra"][1], name: "ACT Government" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ]
    },
    {
        id: 8612,
        actionId: "melb-councils-asu",
        title: "Melbourne Council Bans Escalate as Councils Dock Wages",
        union: "ASU Victoria",
        industry: "Local Government",
        type: "strike",
        startDate: "2026-09-08",
        endDate: "",
        workers: null,
        state: "VIC",
        description: "Industrial action continues across 8 Melbourne metropolitan councils. Harder-hitting bans are back on, including street cleaning through the City of Yarra and residential bin collection in Hume and Merri-bek. Merri-bek is docking workers wages up to 15% if they participate in industrial action, and Hume has commenced docking wages by up to 11.5%. The ASU had been pressuring the state government to amend rate capping legislation, but with the election fast approaching this is no longer a live option, though the union is still lobbying the government to contribute to a solution. An update from the ASU on 8 September reported that conversations with the State Government continue to progress positively but noted there was no firm commitment from the government, nor a pay offer from councils.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Various metropolitan councils" },
            { city: "Coburg", state: "VIC", lat: CITY_COORDS["Coburg"][0], lng: CITY_COORDS["Coburg"][1], name: "Merri-bek Council" },
            { city: "Broadmeadows", state: "VIC", lat: CITY_COORDS["Broadmeadows"][0], lng: CITY_COORDS["Broadmeadows"][1], name: "Hume City Council" },
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "City of Yarra" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ]
    },
    {
        id: 8613,
        actionId: "jetstar-asu",
        title: "Jetstar Workers Commence Industrial Action",
        union: "ASU",
        industry: "Aviation",
        type: "strike",
        startDate: "2026-09-12",
        endDate: "",
        workers: 900,
        description: "Having overwhelmingly voted in favour of industrial action, ASU members at Jetstar commenced industrial action on Saturday 12 September. Workers are wearing campaign badges and stickers while working and talking to customers about their campaign.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: COMPANY["Jetstar"][0], lng: COMPANY["Jetstar"][1], name: "Jetstar HQ" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ]
    },
    {
        id: 8614,
        actionId: "service-stream-sa-cepu",
        title: "Service Stream SA Workers Vote Down Second Unendorsed Agreement",
        union: "CEPU SA",
        industry: "Telecommunications",
        type: "strike",
        startDate: "2026-09-11",
        endDate: "",
        workers: null,
        state: "SA",
        description: "Workers have voted down another unendorsed proposed agreement from Service Stream. Workers previously voted down a subpar agreement in July. Stoppages at Service Stream continue. A rally in support of workers was held on Friday 11 September at the Edinburgh RAAF base.",
        locations: [
            { city: "Adelaide", state: "SA", lat: SA["Service Stream SA"][0], lng: SA["Service Stream SA"][1], name: "Service Stream SA / Edinburgh RAAF Base" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ]
    },
    {
        id: 8615,
        actionId: "bridgestone-uwu",
        title: "Bridgestone Tyrefitters Commence Six-Day Strike",
        union: "UWU",
        industry: "Manufacturing",
        type: "strike",
        startDate: "2026-09-10",
        endDate: "2026-09-16",
        workers: null,
        description: "UWU members working as tyrefitters at Bridgestone commenced a 6-day strike on Thursday 10 September. Workers are fighting for a fair deal that will keep up with the cost of living. UWU members are asking supporters to sign a petition calling on Managing Director Heath Barclay to provide workers with a decent offer.",
        locations: [{
            city: "Unknown",
            state: "",
            lat: COMPANY["Bridgestone"][0],
            lng: COMPANY["Bridgestone"][1],
            name: "Bridgestone Australia Ltd"
        }],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ]
    },
    {
        id: 8616,
        actionId: "sa-pathology-psa",
        title: "SA Pathology Immunology Workers Take Industrial Action",
        union: "PSA SA",
        industry: "Healthcare",
        type: "strike",
        startDate: "2026-09-16",
        endDate: "",
        workers: null,
        state: "SA",
        description: "PSA members working in Immunology at SA Pathology have taken industrial action. Workers are fighting back against increasing workloads that are affecting staff wellbeing and service quality.",
        locations: [
            { city: "Adelaide", state: "SA", lat: CITY_COORDS["Adelaide"][0], lng: CITY_COORDS["Adelaide"][1], name: "SA Pathology" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ]
    },
    {
        id: 8617,
        actionId: "vahpa-allied-health",
        title: "VAHPA 'Four Weeks To Fix It' Campaign Enters Week Two",
        union: "VAHPA",
        industry: "Healthcare",
        type: "protest",
        startDate: "2026-09-16",
        endDate: "",
        workers: null,
        state: "VIC",
        description: "Week 2 of VAHPA's 'Four Weeks To Fix It' campaign is encouraging members to put up campaign posters, chalk messages and distribute campaign materials at the start of shifts.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Various hospitals" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ]
    },
    {
        id: 8618,
        actionId: "csl-amwu-etu",
        title: "FWC Orders CSL Industrial Action to Stop",
        union: "AMWU / ETU Vic",
        industry: "Manufacturing",
        type: "strike",
        startDate: "2026-09-11",
        endDate: "",
        workers: null,
        state: "VIC",
        description: "The Victorian branches of both the AMWU and ETU posted notices advising that industrial action at CSL scheduled for 11 September was ordered by the FWC to stop, not occur and not be organised. The dispute is believed to be limited to an agreement covering workers in metals classifications.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: COMPANY["CSL"]["VIC"][0], lng: COMPANY["CSL"]["VIC"][1], name: "CSL" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ]
    },
    {
        id: 8619,
        actionId: "kone-cepu",
        title: "Kone Workers Commence Industrial Action",
        union: "CEPU SA",
        industry: "Manufacturing / Services",
        type: "strike",
        startDate: "2026-09-15",
        endDate: "",
        workers: null,
        state: "SA",
        description: "CEPU members at Kone have commenced industrial action in pursuit of a better deal. Workers held stop work meetings on 15 September and voted to escalate industrial action.",
        locations: [
            { city: "Adelaide", state: "SA", lat: SA["KONE"][0], lng: SA["KONE"][1], name: "Kone" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ]
    },
    {
        id: 8620,
        actionId: "wellington-clinics-hacsu",
        title: "Wellington Clinics Nurses Stop Work Over Fixed-Term Contract Cuts",
        union: "HACSU Tasmania",
        industry: "Healthcare",
        type: "strike",
        startDate: "2026-09-15",
        endDate: "",
        workers: null,
        state: "TAS",
        description: "HACSU nurses working across medical specialist clinics at the Wellington Clinics at Royal Hobart Hospital stopped work on 15 September to protest against a decision not to extend fixed-term nursing contracts at the clinics. 50% of the nursing workforce are on fixed-term contracts, representing approximately 5 full-time equivalent positions. Health Minister Eric Abetz has termed the cuts 'operational efficiencies'.",
        locations: [
            { city: "Hobart", state: "TAS", lat: TAS["Royal Hobart Hospital"][0], lng: TAS["Royal Hobart Hospital"][1], name: "Wellington Clinics, Royal Hobart Hospital" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ]
    },
    {
        id: 8621,
        actionId: "overnewton-college",
        title: "Overnewton Teachers Escalate to Half-Day Strike",
        union: "IEU Vic",
        industry: "Education",
        type: "strike",
        startDate: "2026-09-17",
        endDate: "2026-09-17",
        workers: null,
        state: "VIC",
        description: "Teachers at Overnewton College struck for half a day on 17 September. The teachers have already been implementing a range of work bans for over a week, including ignoring dress code and wearing oodies and slippers to work. Parents at the school have created a petition in support of the teachers, but argue that any wage increase for teachers should not be funded by an increase to fees.",
        locations: [
            { city: "Keilor", state: "VIC", lat: MELB["Overnewton College"][0], lng: MELB["Overnewton College"][1], name: "Overnewton College" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ]
    },
    {
        id: 8622,
        actionId: "certis-twu",
        title: "TWU Certis Members Vote in Protected Action Ballot",
        union: "TWU NSW",
        industry: "Aviation / Security",
        type: "ballot",
        startDate: "2026-09-11",
        endDate: "2026-09-18",
        workers: null,
        state: "NSW",
        description: "The TWU in NSW advised a protected action ballot for its members at Certis is open from 11 September to 18 September. The ballot is believed to be for Certis members at Sydney Airport.",
        locations: [
            { city: "Sydney", state: "NSW", lat: SYD["Airport"][0], lng: SYD["Airport"][1], name: "Sydney Airport" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ]
    },
    {
        id: 8623,
        actionId: "western-downs-council",
        title: "Western Downs Regional Council Reaches In-Principle Agreement",
        union: "AWU / The Services Union QLD",
        industry: "Local Government",
        type: "resolved",
        startDate: "2026-09-16",
        endDate: "2026-09-16",
        workers: null,
        state: "QLD",
        description: "An in-principle agreement has been made between unions and the Western Downs Regional Council. A formal ballot on the agreement opened on 15 September and closes on 17 September. An AWU organiser described it as a 'significant agreement' with wage increases of up to 16% over 3 years and a new increment scheme that will see workers properly remunerated for their skills and experience. The Services Union noted the agreement includes wage increases of 3% more than the original offer as well as improved conditions and benefits.",
        locations: [
            { city: "Dalby", state: "QLD", lat: -27.1833, lng: 151.2667, name: "Western Downs Regional Council" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ]
    },
    {
        id: 8624,
        actionId: "valmet-amwu-etu",
        title: "Valmet Workers Win In-Principle Agreement After Two Days of Bans",
        union: "AMWU / ETU NSW",
        industry: "Manufacturing",
        type: "resolved",
        startDate: "2026-09-14",
        endDate: "2026-09-16",
        workers: null,
        state: "NSW",
        description: "Union members at Valmet have reached an in-principle agreement. It took just two days of partial work bans at one site with 100% ETU membership to drag the bosses back to the negotiating table with an improved offer. The in-principle agreement includes significant wage increases and the removal of a pay averaging system that disadvantaged newer employees.",
        locations: [
            { city: "Sydney", state: "NSW", lat: COMPANY["Valmet"]["NSW"][0], lng: COMPANY["Valmet"]["NSW"][1], name: "Valmet" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ]
    },
    {
        id: 8625,
        actionId: "parks-victoria",
        title: "Parks Victoria Unions Reach In-Principle Agreement After 12 Months",
        union: "ASU / AWU / CPSU Victoria",
        industry: "Environment / Parks",
        type: "resolved",
        startDate: "2026-09-16",
        endDate: "2026-09-16",
        workers: null,
        state: "VIC",
        description: "After fighting for more than 12 months, unions at Parks Victoria have reached an in-principle agreement. According to the CPSU, the deal includes a 3% pay increase, a $5000 one-off payment and a structural wages uplift that will boost base levels of pay. The ASU shared that their members will get a boost to their pay of between 4.5% and 6% depending on grade. When workers commenced industrial action in May, it was the first time in 15 years. Actions included 24-hour strikes (including one the previous week), closure of parks and various work bans.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Parks Victoria" }
        ],
        sources: [
            { name: "Disputes Report - 16 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-16-september" }
        ]
    },
    {
        id: 8505,
        actionId: "port-adelaide-enfield-asu",
        title: "Port Adelaide Enfield Workers Vote Down Agreement for Fourth Time",
        union: "ASU SA",
        industry: "Local Government",
        type: "strike",
        startDate: "2026-08-20",
        endDate: "",
        workers: null,
        state: "SA",
        description: "ASU members at the City of Port Adelaide Enfield have voted NO to management's proposed Enterprise Agreement for the fourth time. Members have fought against attacks on job security and are standing strong for wages that keep up with the cost of living. The union's message to Council is that it is time to listen and come back with a fair offer.",
        locations: [
            { city: "Adelaide", state: "SA", lat: SA["City of Port Adelaide Enfield"][0], lng: SA["City of Port Adelaide Enfield"][1], name: "City of Port Adelaide Enfield" }
        ],
        sources: [
            { name: "ASU Proud SA/NT - Instagram post, 20 August 2026", url: "https://www.instagram.com/p/DcP6rj4Gvon/" }
        ],
        tags: ["local-government", "asu"]
    },
    {
        id: 8512,
        actionId: "quantem-mua",
        title: "Quantem Workers Return to Work After Two-Week Stand-Down Chokes Port",
        union: "MUA Vic",
        industry: "Fuel Port Operations",
        type: "update",
        startDate: "2026-09-15",
        endDate: "",
        workers: null,
        state: "VIC",
        description: "Despite scabs being present inside the terminal, no product was loaded onto or unloaded from any ship for the entire two-week period. On Sep 14 workers voted unanimously to temporarily lift their work bans and return to work while the union seeks to finalise an agreement at the negotiating table and voted unanimously to escalate the campaign if agreement cannot be reached in the coming weeks. Members expressed their sincere thanks to everyone who attended rallies, provided food, pressured Melbourne Ports, and sent messages of solidarity.",
        locations: [
            { city: "Port Melbourne", state: "VIC", lat: MELB["Quantem"][0], lng: MELB["Quantem"][1], name: "Quantem Terminal" }
        ],
        sources: [
            { name: "MUA - QUANTEM DISPUTE UPDATE, 15 September 2026", url: "https://www.facebook.com/reel/904260922550490" },
            { name: "Disputes Report - 23 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-23-september" }
        ],
        tags: ["maritime", "mua"]
    },
    {
        id: 8507,
        actionId: "ieu-vic-catholic-teachers",
        title: "IEU publicises details of offer from the Vic. Catholic Ed. Auth.",
        union: "IEU Vic",
        industry: "Education",
        type: "update",
        startDate: "2026-09-18",
        endDate: "",
        workers: null,
        state: "VIC",
        description: "IEU press release reveals conditions and changes offered to the IEU from the Victorian Catholic Education Authority (VCEU)",
        locations: [
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Catholic schools across Victoria" }
        ],
        sources: [
            { name: "IEU Victoria Tasmania - VCEA's latest offer unpacked", url: "https://www.ieuvictas.org.au/news/vceaoffer" }
        ],
        tags: ["education", "ieu"]
    },
    {
        id: 8509,
        actionId: "isis-sugar-mill-amwu",
        title: "Isis Central Sugar Mill Workers Secure EBA After Protected Action",
        union: "AWU / AMWU QLD & NT",
        industry: "Food Manufacturing",
        type: "resolved",
        startDate: "2026-07-01",
        endDate: "2026-07-01",
        workers: null,
        state: "QLD",
        description: "After lengthy negotiations and protected industrial action, AWU members at Isis Central Sugar Mill have secured wins in cane railways including better conditions, allowances, wages and improved safety. The AWU and AMWU hosted a BBQ for union members to discuss the latest EBA offer. Workers at the mill share a sense of collective responsibility, working for the last locally owned sugar mill in Queensland, with many family generations working side-by-side. The locally focused bargaining collective between workers and management reached an agreement that benefits workers, the mill's viability, and the Childers community and economy.",
        locations: [
            { city: "Childers", state: "QLD", lat: -25.2333, lng: 152.2833, name: "Isis Central Sugar Mill" }
        ],
        sources: [
            { name: "AWU Queensland & NT Branch - Facebook post, 1 July 2026", url: "https://www.facebook.com/AWUqueensland/posts/the-awu-and-amwu-qld-nt-hosted-a-bbq-for-union-members-at-isis-central-sugar-mil/1344596671195987/" }
        ],
        tags: ["food-manufacturing"]
    },
    {
        id: 8510,
        actionId: "qld-rail-amwu-etu",
        title: "Queensland Rail Reaches In-Principle Agreement on All Remaining EBAs",
        union: "AMWU / ETU / RTBU / TSU",
        industry: "Rail Transport",
        type: "resolved",
        startDate: "2026-09-18",
        endDate: "2026-09-18",
        workers: 6000,
        state: "QLD",
        description: "Queensland Rail has reached an in-principle agreement on all remaining enterprise agreements, ending a long-running pay dispute and months of union disruption. In-principle deals were finalised on the remaining three of seven EBAs: Network, Rollingstock and Operations, and a new electrical-only agreement, following negotiations in the Fair Work Commission since May. Key conditions include an 8.5% wage increase over three years plus an additional cost-of-living relief payment of up to 1% in each of the second and third years depending on inflation, in line with the Queensland Government-Owned Corporations Wages Policy. Backpay will be paid from 1 August 2026 for the Network and Rollingstock and Operations agreements, and from 1 September 2026 for the electrical-only agreement. Union protected industrial action has been lifted, allowing the maintenance backlog to be cleared. The SEQ network is on track to restore 91% of services (7,725 weekly services, or an additional 417) from 12 October, with a full timetable expected by the end of November. Beenleigh and Shorncliffe line services will uplift to 15-minute peak services. All outcomes have been recommended by the Fair Work Commission to go to a ballot of employees, with a recommendation to vote yes.",
        locations: [
            { city: "Brisbane", state: "QLD", lat: CITY_COORDS["Brisbane"][0], lng: CITY_COORDS["Brisbane"][1], name: "Queensland Rail Network" }
        ],
        sources: [
            { name: "Statement from the Minister for Transport and Main Roads - Queensland Government", url: "https://statements.qld.gov.au/statements/106087" },
            { name: "National Tribune - Statement From Minister For Transport And Main Roads", url: "https://www.nationaltribune.com.au/statement-from-minister-for-transport-and-main-roads/" },
            { name: "National Tribune - More trains coming as Queensland Rail reaches final in-principle agreements", url: "https://www.nationaltribune.com.au/more-trains-coming-as-queensland-rail-reaches-final-in-principle-agreements/" },
            { name: "ABC News - Queensland Rail and unions reach agreement, ending months-long pay dispute", url: "https://newsapp.abc.net.au/news/2026-09-18/qld-rail-dispute-resolved/107170016" },
            { name: "Disputes Report - 23 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-23-september" }
        ],
        tags: ["rail-transport", "amwu", "rtbu", "etu", "tsu"]
    },
    // ============================================
    // Disputes Report - 23 September 2026
    // Source: https://disputesreport.substack.com/p/industrial-disputes-and-news-23-september
    // ============================================
    {
        id: 8701,
        actionId: "melb-councils-asu",
        title: "Hume City Council Mayor Calls on ASU to End Industrial Action",
        union: "ASU Vic",
        industry: "Local Government",
        type: "strike",
        startDate: "2026-09-18",
        endDate: "",
        workers: null,
        state: "VIC",
        description: "Hume City Council mayor Carly Moore put out a statement on 18 September calling on the ASU to end industrial action and 'focus on reaching an agreement through the bargaining process'. Moore said Hume was negotiating in good faith and 'demonstrated its commitment to employees by providing a 2.5% pay increase in November 2025'. What Moore's statement did not mention, but the ASU shared on social media, is that Moore herself received a 10.6% pay rise last year. The action in Hume is part of a braoder campaign against multiple councils the ASU is running",
        locations: [
            { city: "Broadmeadows", state: "VIC", lat: VIC["Hume City"][0], lng: VIC["Hume City"][1], name: "Hume City Council" },
            { city: "Coburg", lat: CITY_COORDS["Coburg"][0], lng: CITY_COORDS["Coburg"][1], name: "Merri-bek Council" },
            { city: "Dandenong", lat: CITY_COORDS["Dandenong"][0], lng: CITY_COORDS["Dandenong"][1], name: "Greater Dandenong Council" }
        ],
        sources: [
            { name: "Disputes Report - 23 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-23-september" },
            
        ]
    },
    {
        id: 8702,
        actionId: "tas-public-sector-nurses",
        title: "Tasmanian Public Sector Nurses Commence Industrial Action",
        union: "HACSU / ANMF Tasmania",
        industry: "Healthcare",
        type: "action",
        startDate: "2026-09-21",
        endDate: "",
        workers: null,
        state: "TAS",
        description: "HACSU member nurses in Tasmania's public sector commenced industrial action on 21 September. HACSU had set a deadline of 14 September for the government to present an offer, but no offer has been tabled. HACSU's bargaining team have participated in 50 hours of negotiations. Industrial action has kicked off with a round of workplace bans, including wearing campaign materials, placing campaign materials on patient care boards, speaking to media and the public about the campaign, working to rule by taking all breaks on time, not participating in audit-related activities, not attending non-patient related meetings, and not filing RFAs or taking late files to admissions. Meanwhile, ANMF members at the Royal Hobart Hospital endorsed industrial action at a mass meeting on 22 September, with further mass meetings in the north and north-west later this week. Public sector nurses are fighting for a fair deal with decent wages and conditions and safer staffing levels.",
        locations: [
            { city: "Hobart", state: "TAS", lat: CITY_COORDS["Hobart"][0], lng: CITY_COORDS["Hobart"][1], name: "Royal Hobart Hospital" },
            { city: "Launceston", state: "TAS", lat: CITY_COORDS["Launceston"][0], lng: CITY_COORDS["Launceston"][1], name: "Launceston General Hospital" },
            { city: "Burnie", state: "TAS", lat: CITY_COORDS["Burnie"][0], lng: CITY_COORDS["Burnie"][1], name: "North West Regional Hospital" }
        ],
        sources: [
            { name: "Disputes Report - 23 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-23-september" }
        ]
    },
    {
        id: 8703,
        actionId: "qantas-twu",
        title: "TWU Industrial Action Set to Commence at Qantas Subsidiaries",
        union: "TWU",
        industry: "Aviation",
        type: "stoppage",
        startDate: "2026-09-23",
        endDate: "",
        workers: null,
        state: "NSW",
        description: "Negotiations between the TWU and Qantas in the FWC on 18 September did not progress significantly, so industrial action is set to commence this week. TWU members employed at Qantas Ground Services are expected to strike for 24 hours on 24 September, while TWU members at Australia Air Express are expected to strike on 23 September. The TWU has been in negotiations with Qantas for 11 months seeking decent pay and conditions. Workers also have concerns about safety, the splintering of workers into multiple subsidiaries, and the outsourcing of permanent jobs. The TWU posted a video late on 22 September saying Qantas was trying legal manoeuvres to stop industrial action.",
        locations: [
            { city: "Sydney", state: "NSW", lat: SYD["QANTAS"][0], lng: SYD["QANTAS"][1], name: "Qantas" },
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Qantas" }
        ],
        sources: [
            { name: "Disputes Report - 23 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-23-september" }
        ]
    },
    {
        id: 8704,
        actionId: "arts-centre-melb",
        title: "Arts Centre Melbourne Workers Hold Second 24-Hour Strike",
        union: "CPSU / ETU / MEAA",
        industry: "Arts & Culture",
        type: "stoppage",
        startDate: "2026-09-18",
        endDate: "",
        workers: null,
        state: "VIC",
        description: "Union members at Arts Centre Melbourne held a second 24-hour strike on 18 September. The first 24-hour strike on 11 September resulted in two shows being cancelled and one postponed. It was anticipated that Friday's strike would disrupt programming and venue operations. Workers are fighting for a decent wage increase to keep up with the cost of living, while Arts Centre Melbourne management is refusing anything more than the 3% referenced in the state government's wages policy. It is worth noting that other state government employees, most notably nurses and teachers, fought for and won wage increases well above the wages policy. Unions have warned that further industrial action will occur if negotiations stall, and that this could include disruption to the opening of the Ian Potter State Theatre in October.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: MELB["Arts Centre"][0], lng: MELB["Arts Centre"][1], name: "Arts Centre Melbourne" },
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Hamer Hall"][0], lng: CITY_COORDS["Hamer Hall"][1], name: "Hamer Hall" }
        ],
        sources: [
            { name: "Disputes Report - 23 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-23-september" }
        ]
    },
    {
        id: 8705,
        actionId: "bhp-hedland",
        title: "BHP Port Hedland Unions Apply for Intractable Bargaining Declaration",
        union: "AMWU / AWU / ETU",
        industry: "Mining",
        type: "update",
        startDate: "2026-09-17",
        endDate: "",
        workers: null,
        state: "WA",
        description: "On 17 September, the unions in dispute with BHP at Port Hedland all posted identical statements on social media. The statement notes that workers rejected a proposal from BHP that would leave half the workforce worse off, and that unions want to resolve inequality in conditions by lifting everyone to the same standards. It goes on to say that negotiations have reached an impasse, there is no reasonable chance an agreement will be reached without the intervention of the FWC, and that is why they are applying for an intractable bargaining declaration.",
        locations: [
            { city: "Port Hedland", state: "WA", lat: CITY_COORDS["Port Hedland"][0], lng: CITY_COORDS["Port Hedland"][1], name: "BHP Port Hedland" }
        ],
        sources: [
            { name: "Disputes Report - 23 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-23-september" }
        ]
    },
    {
        id: 8707,
        actionId: "wa-nurses-midwives-anmf",
        title: "WA Nurses and Midwives Angry Over Delayed Ratio Rollout",
        union: "ANMF WA",
        industry: "Healthcare",
        type: "planned",
        startDate: "2026-09-23",
        endDate: "",
        workers: null,
        state: "WA",
        description: "Nurses and midwives in WA are furious that the Cook government has delayed the next major stage of the rollout of nurse/patient ratios in WA. The next stage was due to happen in September and was meant to extend ratios to remaining metropolitan emergency departments and many specialist wards. No revised timeline has been provided. ANMF WA Secretary Romina Raschilla said 'Our nurses and midwives are really quite angry, and they are calling for industrial action. They want to strike.' WA's public sector nurses and midwives last went on strike in 2022 in their EBA campaign that included a demand for ratios.",
        locations: [
            { city: "Perth", state: "WA", lat: CITY_COORDS["Perth"][0], lng: CITY_COORDS["Perth"][1], name: "Various public hospitals" }
        ],
        sources: [
            { name: "Disputes Report - 23 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-23-september" }
        ]
    },
    {
        id: 8708,
        actionId: "act-aeu-teachers",
        title: "ACT Teachers Call Another Stoppage After Rejecting Offer",
        union: "AEU ACT",
        industry: "Education",
        type: "stoppage",
        startDate: "2026-09-24",
        endDate: "2026-09-24",
        workers: null,
        state: "ACT",
        description: "After rejecting the territory government's latest offer, public school teachers in the ACT have called another stoppage. Teachers will stop work from 8:30am-10:30am on 24 September. In response, ACT Education Directorate has announced all public schools, preschools and specialist schools will close from 8:30-10:30am with the school day starting from 10:30am. In addition to their demands around pay, the AEU is also putting a spotlight on resourcing and workload issues in schools where a shortage of teachers is causing schools to regularly split and collapse classes.",
        locations: [
            { city: "Canberra", state: "ACT", lat: CITY_COORDS["Canberra"][0], lng: CITY_COORDS["Canberra"][1], name: "ACT public schools" }
        ],
        sources: [
            { name: "Disputes Report - 23 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-23-september" }
        ]
    },
    {
        id: 8709,
        actionId: "jetstar-asu",
        title: "Jetstar Workers Escalate Action with Shoe Ban and Fee Bans",
        union: "ASU",
        industry: "Aviation",
        type: "action",
        startDate: "2026-09-18",
        endDate: "",
        workers: null,
        description: "On 18 September ASU members at Jetstar escalated their industrial action. Workers commenced a ban on following the uniform policy on shoes, and will now be wearing sneakers and other comfy shoes at work, as well as campaign badges and stickers. On 23 September, Jetstar workers will not process fees for overweight baggage, seat changes or late fees.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: COMPANY["Jetstar"][0], lng: COMPANY["Jetstar"][1], name: "Jetstar HQ" }
        ],
        sources: [
            { name: "Disputes Report - 23 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-23-september" }
        ]
    },
    {
        id: 8710,
        actionId: "certis-twu",
        title: "Certis Security Workers at Sydney Airport to Commence Industrial Action",
        union: "TWU NSW",
        industry: "Aviation / Security",
        type: "stoppage",
        startDate: "2026-09-24",
        endDate: "",
        workers: null,
        state: "NSW",
        description: "Certis Security workers at Sydney Airport will commence industrial action on 24 September, and TWU members employed as Work Safety Officers will strike from 10pm on Monday 28 September through to 1am on 29 September. Workers are fighting for stronger protections, improved conditions and pathways to full-time employment.",
        locations: [
            { city: "Sydney", state: "NSW", lat: SYD["Airport"][0], lng: SYD["Airport"][1], name: "Sydney Airport" }
        ],
        sources: [
            { name: "Disputes Report - 23 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-23-september" }
        ]
    },
    {
        id: 8711,
        actionId: "vahpa-allied-health",
        title: "VAHPA 'Four Weeks To Fix It' Campaign Enters Week Three",
        union: "VAHPA",
        industry: "Healthcare",
        type: "protest",
        startDate: "2026-09-21",
        endDate: "",
        workers: null,
        state: "VIC",
        description: "For Week 3 of the 'Four Weeks To Fix It Campaign', VAHPA members will be participating in rolling lunchtime rallies. Rallies kicked off on 21 September at the Royal Women's Hospital, and on 22 September at Northern Health and Monash Health. On 23 September rallies took place at the Alfred, Western Health, Austin Health and Bendigo Health. On 24 September, workers will rally at Grampians Health.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Various hospitals" }
        ],
        sources: [
            { name: "Disputes Report - 23 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-23-september" }
        ]
    },
    {
        id: 8712,
        actionId: "usyd-nteu",
        title: "University of Sydney NTEU Members to Vote on Further Stop Work Action",
        union: "NTEU",
        industry: "Education",
        type: "planned",
        startDate: "2026-09-24",
        endDate: "",
        workers: null,
        state: "NSW",
        description: "NTEU members at the University of Sydney will meet on 24 September and vote on taking further stop work action on 13 October. Delegates will also share an update on bargaining.",
        locations: [
            { city: "Sydney", state: "NSW", lat: SYD["Uni"][0], lng: SYD["Uni"][1], name: "University of Sydney" }
        ],
        sources: [
            { name: "Disputes Report - 23 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-23-september" }
        ]
    },
    {
        id: 8713,
        actionId: "sydney-water-professionals-australia",
        title: "Sydney Water Professionals Australia Members Endorse Protected Action Ballot",
        union: "Professionals Australia",
        industry: "Utilities",
        type: "ballotpass",
        startDate: "2026-09-23",
        endDate: "",
        workers: null,
        state: "NSW",
        description: "Professionals Australia members at Sydney Water have endorsed a protected action ballot. 95% of those who participated voted yes, with 87% of eligible members participating. Workers at Sydney Water are fighting for decent wage increases and fair working hours.",
        locations: [
            { city: "Sydney", state: "NSW", lat: SYD["Water"][0], lng: SYD["Water"][1], name: "Sydney Water" }
        ],
        sources: [
            { name: "Disputes Report - 23 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-23-september" }
        ]
    },
    {
        id: 8714,
        actionId: "aemo-professionals-australia",
        title: "AEMO Workers Vote in Favour of Industrial Action",
        union: "Professionals Australia",
        industry: "Energy",
        type: "ballotpass",
        startDate: "2026-09-23",
        endDate: "",
        workers: null,
        state: "VIC",
        description: "Professionals Australia members at AEMO have voted in favour of taking industrial action. AEMO has put a subpar offer to workers for a third time, with 68% voting it down. Professionals Australia members are set to commence industrial action next week.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "AEMO" }
        ],
        sources: [
            { name: "Disputes Report - 23 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-23-september" }
        ]
    },
    {
        id: 8715,
        actionId: "certis-mua",
        title: "Certis Gatehouse Workers at Port Botany Endorse New Agreement",
        union: "MUA NSW",
        industry: "Ports / Security",
        type: "resolved",
        startDate: "2026-09-23",
        endDate: "",
        workers: null,
        state: "NSW",
        description: "MUA gatehouse workers employed by Certis at DP World Port Botany have endorsed a new agreement. The agreement includes a 10% wage increase on commencement, backdated to July, along with other improvements. Workers have been fighting for a fair deal for 6 months and participated in industrial action including two stoppages that effectively shut down the terminal.",
        locations: [
            { city: "Sydney", state: "NSW", lat: COMPANY["DP World"][0], lng: COMPANY["DP World"][1], name: "DP World Port Botany" }
        ],
        sources: [
            { name: "Disputes Report - 23 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-23-september" }
        ]
    },
    {
        id: 8716,
        actionId: "aeu-vic-teachers",
        title: "Victorian Teachers Endorse New Agreement in Whole-Workforce Ballot",
        union: "AEU Victoria",
        industry: "Education",
        type: "resolved",
        startDate: "2026-09-23",
        endDate: "2026-09-23",
        workers: null,
        state: "VIC",
        description: "The whole workforce ballot for the new agreement for public school teachers in Victoria has concluded with 93.1% of those who participated endorsing the deal. 79% of AEU members had previously endorsed the agreement.",
        locations: [
            { city: "Melbourne", state: "VIC", lat: CITY_COORDS["Melbourne"][0], lng: CITY_COORDS["Melbourne"][1], name: "Schools across Victoria" }
        ],
        sources: [
            { name: "Disputes Report - 23 September 2026", url: "https://disputesreport.substack.com/p/industrial-disputes-and-news-23-september" }
        ]
    },
];

// Export globally
window.STRIKE_DATA = STRIKE_DATA;
window.CITY_COORDS = CITY_COORDS;
