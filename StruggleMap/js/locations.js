//Stored here a defined locations and co-ordinates for use in data.js
//Actual 

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
    "K AND S": [-31.957271582472234, 115.98783445823149],
    "ALSTOM": [-31.89636199051062, 116.02331929038176],
    "DYNELEC": [-34.466729848922604, 150.83263302741156],
    "Tomago":[-32.82575691442906, 151.71854990432388],
    "Stowe":[-32.892972222566016, 151.60143883928703],
    "Getinge":[-27.450614416499665, 153.0709445039551],
    "Urban Utilities": [-27.45874371135019, 153.0334156010758],
    "Kinetic": {
        "TAS":[-42.836873711309906, 147.29014111981968]
    },
    "ABC":{
        "NSW":[-33.88235564824446, 151.20164428461771]
    },
    "St John":{
        "WA": [-31.945074720566403, 115.92115051154337]
    }
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
    "DBCA": [-31.9963, 115.8833], //Department of Biodiversity, Conservation and Attractions
    "TK Elev": [-31.944961151423268, 115.8653410867777], //TK elevators
    "Yagan Square": [-31.95047140130995, 115.85833823031554]

}

const SYD = {
    "Quay": [-33.86047772953971, 151.2110670199961],
    "Uni": [-33.88810449082193, 151.1871032773295],
    "Northern Beaches": [-33.670256518987316, 151.31802318697055],
    "QANTAS": [-33.92548617476988, 151.18660150979397],
    "Airport": [-33.94111, 151.1746],
    "Water": [-33.81681165499027, 151.00586267114213],
    "Crown": [-33.86263252647517, 151.20102149587257]
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
    "Parliament": [-27.475532182152072, 153.02740592577948],
    "Rail": [-27.4663, 153.0253],
}

const TAS = {
    "Royal Hobart Hospital": [-42.8798, 147.3292],
}

const VIC = {
    "Port of Portland": [-38.3531, 141.6176],
    "DOT": [-37.8150, 144.9743], //Vic Department of transport,
    "Parks Vic": [-37.81046, 144.96036],
    "Hume City": [-37.681992618429874, 144.91828546273769],
    "Melton Civic Centre": [-37.68207628629816, 144.58708142307282],
    "Thornbury": [-37.75519146696384, 144.9986849416703],
}

const PORT = { //Ports
    "Hobart": [-42.88178, 147.33922],
    "Portland": [-38.3531, 141.6176],
    "Freo": [-32.044329599057804, 115.74290083340043], //Fremantle
    "Brisbane": [-27.375799326716095, 153.1789399621756],
}

const UNI = { //Unis
    "QLD": [-27.4977, 153.0128],
    "Griffith": [-27.5531, 153.0510],
    "QLD Uni Tech": [-27.4779, 153.0274],
    "MELB": [-37.79840685767232, 144.96095388740878],
    "TAS": [-42.880384430852374, 147.32736605510502]
}

const POWER = { //Power plants
    "Kareeya": [-17.7672, 145.578],
    "Barron Gorge":[-16.8513, 145.6468],
    "Loy Yang":[-38.2509684682121, 146.5776162036045],
    "Gladstone": [-23.84852306388098, 151.21830310883442],
}

const HOSP = {
    // ============================================
    // NEW SOUTH WALES
    // ============================================
    NSW: {
        // Sydney metropolitan
        "Royal Prince Alfred": [-33.8894, 151.1824],
        "Westmead": [-33.8033, 150.9877],
        "Royal North Shore": [-33.8220, 151.1870],
        "St Vincent's Sydney": [-33.8790, 151.2150],
        "Prince of Wales": [-33.9170, 151.2290],
        "Sydney Children's": [-33.9180, 151.2340],
        "Royal Hospital for Women": [-33.9185, 151.2350],
        "Concord Repatriation General": [-33.8680, 151.1020],
        "Liverpool": [-33.9200, 150.9250],
        "Nepean": [-33.7580, 150.6980],
        "Blacktown": [-33.7720, 150.9080],
        "Campbelltown": [-34.0680, 150.8080],
        "Sutherland": [-34.0350, 151.0780],
        "Manly": [-33.7980, 151.2900],
        "Hornsby Ku-ring-gai": [-33.7030, 151.0960],
        "Ryde": [-33.7960, 151.1070],
        "Fairfield": [-33.8700, 150.9500],
        "Bankstown-Lidcombe": [-33.9250, 151.0330],
        "Auburn": [-33.8480, 151.0330],
        "Mt Druitt": [-33.7700, 150.8200],
        // Newcastle / Hunter
        "John Hunter": [-32.9210, 151.6940],
        "Maitland": [-32.7400, 151.5500],
        "Cessnock District": [-32.8330, 151.3550],
        // Illawarra / South
        "Wollongong": [-34.4250, 150.8880],
        "Shellharbour": [-34.5750, 150.8700],
        "Shoalhaven District Memorial": [-34.8800, 150.6000],
        // Regional
        "Orange Base": [-33.2833, 149.1000],
        "Cootamundra": [-34.6400, 148.0300],
        "Young": [-34.3140, 148.2970],
        "Wagga Wagga Base": [-35.1100, 147.3700],
        "Albury Base": [-36.0700, 146.9200],
        "Dubbo Base": [-32.2430, 148.6050],
        "Tamworth Rural Referral": [-31.0930, 150.9300],
        "Coffs Harbour Health Campus": [-30.2980, 153.1130],
        "Lismore Base": [-28.8080, 153.2780],
        "Port Macquarie Base": [-31.4350, 152.9000],
        "Broken Hill Base": [-31.9550, 141.4650],
        "Bathurst Base": [-33.4200, 149.5800],
        "Goulburn Base": [-34.7530, 149.7200]
    },

    // ============================================
    // VICTORIA
    // ============================================
    VIC: {
        // Melbourne metropolitan
        "Royal Melbourne": [-37.7990, 144.9560],
        "Royal Women's": [-37.7980, 144.9560],
        "Royal Children's": [-37.7920, 144.9500],
        "Peter MacCallum Cancer Centre": [-37.8003, 144.9567],
        "The Alfred": [-37.8460, 144.9810],
        "St Vincent's Hospital Melbourne": [-37.8090, 144.9780],
        "Austin": [-37.7570, 145.0570],
        "Olivia Newton John Cancer Wellness Centre": [-37.7580, 145.0670],
        "Monash Medical Centre": [-37.9080, 145.1300],
        "Eastern Health Box Hill": [-37.8180, 145.1250],
        "Maroondah": [-37.8280, 145.2420],
        "Angliss": [-37.8780, 145.2680],
        "Northern": [-37.6760, 144.9300],
        "Sunshine": [-37.7920, 144.8290],
        "Footscray": [-37.7965, 144.8990],
        "Werribee Mercy": [-37.8980, 144.6650],
        "Frankston": [-38.1440, 145.1220],
        "Dandenong": [-37.9830, 145.2150],
        "Casey": [-38.0910, 145.3020],
        "Sandringham": [-37.9550, 145.0050],
        "Williamstown": [-37.8580, 144.8920],
        "Heidelberg Repatriation": [-37.7580, 145.0470],
        "Royal Victorian Eye and Ear": [-37.8100, 144.9730],
        // Regional Victoria
        "Ballarat Base": [-37.5622, 143.8503],
        "Bendigo": [-36.7580, 144.2803],
        "Geelong University": [-38.1499, 144.3617],
        "Warrnambool Base": [-38.3830, 142.4830],
        "Mildura Base": [-34.1850, 142.1620],
        "Shepparton GV Health": [-36.3833, 145.4000],
        "Wodonga": [-36.1200, 146.8900],
        "Wangaratta Base": [-36.3550, 146.3200],
        "Sale": [-38.1100, 147.0700],
        "Traralgon": [-38.1950, 146.5400],
        "Hamilton Base": [-37.7450, 142.0230],
        "Horsham Base": [-36.7150, 142.2000],
        "Swan Hill District": [-35.3400, 143.5580],
        "Echuca Regional Health": [-36.1280, 144.7500]
    },

    // ============================================
    // QUEENSLAND
    // ============================================
    QLD: {
        // Brisbane metropolitan
        "Royal Brisbane and Women's": [-27.4480, 153.0280],
        "Princess Alexandra": [-27.5000, 153.0330],
        "Mater Hospital Brisbane": [-27.4861, 153.0278],
        "Queensland Children's": [-27.5020, 153.0290],
        "Mater Mothers'": [-27.4870, 153.0280],
        "Greenslopes Private": [-27.5040, 153.0460],
        "Redcliffe": [-27.2340, 153.1080],
        "Prince Charles": [-27.3930, 153.0280],
        "Royal Brisbane": [-27.4480, 153.0280],
        "Redland": [-27.6120, 153.2880],
        "Logan": [-27.6650, 153.1550],
        "Ipswich": [-27.6140, 152.7600],
        "Caboolture": [-27.0850, 152.9520],
        // Gold Coast
        "Gold Coast University": [-27.9610, 153.3800],
        "Robina": [-28.0800, 153.3930],
        // Regional
        "Townsville University": [-19.3250, 146.7550],
        "Cairns": [-16.9130, 145.7690],
        "Sunshine Coast University": [-26.7300, 153.1050],
        "Toowoomba": [-27.5600, 151.9500],
        "Rockhampton": [-23.3770, 150.5100],
        "Mackay Base": [-21.1412, 149.1864],
        "Bundaberg": [-24.8670, 152.3480],
        "Gladstone": [-23.8420, 151.2550],
        "Hervey Bay": [-25.2900, 152.8300],
        "Maryborough": [-25.5300, 152.7000],
        "Mount Isa Base": [-20.7250, 139.4920],
        "Emerald": [-23.5250, 148.1620],
        "Longreach": [-23.4400, 144.2500],
        "Gympie": [-26.1900, 152.6650],
        "Nambour General": [-26.6250, 152.9550],
        "Kingaroy": [-26.5400, 151.8400],
        "Roma": [-26.5700, 148.7900],
        "Bowen": [-20.0100, 148.2450]
    },

    // ============================================
    // WESTERN AUSTRALIA
    // ============================================
    WA: {
        // Perth metropolitan
        "Royal Perth": [-31.9520, 115.8650],
        "Sir Charles Gairdner": [-31.9505, 115.8000],
        "Fiona Stanley": [-32.0700, 115.8220],
        "King Edward Memorial": [-31.9530, 115.8320],
        "Perth Children's": [-31.9500, 115.8050],
        "Princess Margaret": [-31.9530, 115.8320],
        "Fremantle": [-32.0550, 115.7550],
        "Rockingham General": [-32.2780, 115.7450],
        "Joondalup Health Campus": [-31.7450, 115.7700],
        "Armadale Kelmscott Memorial": [-32.1520, 116.0170],
        "Swan District": [-31.8900, 115.9800],
        "Bentley": [-32.0000, 115.9200],
        "Kalamunda": [-31.9800, 116.0700],
        // Regional WA
        "Bunbury Regional": [-33.3271, 115.6369],
        "Geraldton Regional": [-28.7744, 114.6086],
        "Albany Health Campus": [-35.0230, 117.8830],
        "Kalgoorlie Health Campus": [-30.7480, 121.4690],
        "Port Hedland Health Campus": [-20.3107, 118.5876],
        "Karratha Health Campus": [-20.7360, 116.8460],
        "Broome Health Campus": [-17.9614, 122.2353],
        "Carnarvon Health Campus": [-24.8840, 113.6580],
        "Esperance Health Campus": [-33.8600, 121.8900],
        "Northam Health Service": [-31.6500, 116.6700],
        "Narrogin Health Service": [-32.9330, 117.1780],
        "Collie Health Service": [-33.3600, 116.1500],
        "Merredin Health Service": [-31.4800, 118.2800]
    },

    // ============================================
    // SOUTH AUSTRALIA
    // ============================================
    SA: {
        // Adelaide metropolitan
        "Royal Adelaide": [-34.9210, 138.6020],
        "Flinders Medical Centre": [-35.0167, 138.5667],
        "Lyell McEwin": [-34.7500, 138.6000],
        "The Queen Elizabeth": [-34.9030, 138.5350],
        "Modbury": [-34.8330, 138.6880],
        "Noarlunga Health Services": [-35.1420, 138.5020],
        "Repatriation General": [-35.0130, 138.5760],
        "Women's and Children's": [-34.9230, 138.6020],
        "SA Pathology": [-34.9197, 138.6080],
        "Adelaide Remand Centre": [-34.9170, 138.5900],
        "Hampstead Rehabilitation Centre": [-34.8700, 138.6100],
        "Glenside Health Services": [-34.9470, 138.6150],
        // Regional SA
        "Mount Gambier": [-37.8320, 140.7730],
        "Whyalla": [-33.0330, 137.5800],
        "Port Augusta": [-32.4950, 137.7700],
        "Port Pirie": [-33.1900, 138.0100],
        "Berri": [-34.2830, 140.6000],
        "Murray Bridge": [-35.1230, 139.2730],
        "Mount Barker": [-35.0700, 138.8600],
        "Victor Harbor": [-35.5530, 138.6200],
        "Gawler": [-34.6000, 138.7500],
        "Tanunda": [-34.5200, 138.9500]
    },

    // ============================================
    // TASMANIA
    // ============================================
    TAS: {
        "Royal Hobart": [-42.8798, 147.3292],
        "Launceston General": [-41.4420, 147.1400],
        "North West Regional": [-41.0520, 145.9060],
        "Mersey Community": [-41.1800, 146.3500],
        "Tolosa Street Mental Health Service": [-42.8650, 147.3000],
        "Roy Fagan Centre": [-42.8800, 147.3100],
        "Wellington Clinics": [-42.8798, 147.3292],
        "St John's Park": [-42.8700, 147.3050],
        "Clare House": [-42.8900, 147.3200]
    },

    // ============================================
    // AUSTRALIAN CAPITAL TERRITORY
    // ============================================
    ACT: {
        "Canberra": [-35.3420, 149.0870],
        "Calvary Public Hospital Bruce": [-35.2340, 149.0700],
        "University of Canberra": [-35.2380, 149.0880],
        "Centenary Hospital for Women and Children": [-35.3420, 149.0870],
        "ACT Government Analytical Laboratory": [-35.3315, 149.0498]
    },

    // ============================================
    // NORTHERN TERRITORY
    // ============================================
    NT: {
        "Royal Darwin": [-12.4200, 130.8530],
        "Darwin Private": [-12.4230, 130.8580],
        "Alice Springs": [-23.6980, 133.8807],
        "Gove District": [-12.1870, 136.7820],
        "Katherine District": [-14.4680, 132.2640],
        "Palmerston Regional": [-12.4830, 130.9800],
        "Darwin Correctional Centre": [-12.4700, 130.9700],
        "Berrimah Correctional Centre": [-12.4500, 130.9300],
        "Alice Springs Correctional Centre": [-23.7200, 133.8700]
    }
};

const LIB = {
    "WA State":[-31.9490, 115.8605],
}//Libraries