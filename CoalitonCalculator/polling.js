

PartyColor = {
    "ALP": "#f54245",
    "Lib": "#56638A",
    "LaP": "#40798C",
    "LNP":"#0066ff",
    "Grn": "#42f575",
    "Nat": "#009933",
    "One": "#ffff99",
    "OaI": "#e8e3d3",
    "Oth": "#EDE7E3",
    "Ind": "#D4E4BC",
    "JLN": "#f5c842"
}

PrtyNme = {
    "ALP": "Labor",
    "Lib": "Liberal",
    "Grn": "Greens",
    "LaP": "Liberal and Nationals",
    "LNP": "Liberal-National Party",
    "One": "One Nation",
    "Oth": "Other",
    "Ind": "Independent",
    "OaI": "Others/independents",
    "JLN": "Jacqui Lambie Network",
    "KAP": "Katter Australia Party",
    "Nat": "Nationals"
}

const TasmaniaState =
    [
        {
        "Date": "Current",
        "Company": "Current House",
        "Level": "Tasmanian State",
        "Count": 5,
        "PartyLabels": [PrtyNme.Lib, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.Ind, PrtyNme.Oth],
        "PartyData": [48, 28, 12, 6, 6],
        "PartyColor": [PartyColor.Lib, PartyColor.ALP, PartyColor.Grn, PartyColor.Ind, PartyColor.Oth],
        "SeatProj": [11, 8, 2, 4, 0],
        "SeatMajor": 13,
        "SeatMax": 25,
        "Divisons": []
    },
    {
        "Date": "Extrapolated",
        "Company": "35 Seat Count Extrapolated from Current House",
        "Level": "Tasmanian State",
        "Count": 6,
        "PartyLabels": [PrtyNme.Lib, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.JLN, PrtyNme.Ind, PrtyNme.Oth],
        "PartyData": [48, 28, 12, 0, 6, 6],
        "PartyColor": [PartyColor.Lib, PartyColor.ALP, PartyColor.Grn, PartyColor.JLN, PartyColor.Ind, PartyColor.Oth],
        "SeatProj": [15, 11, 3, 0, 6, 0],
        "SeatMajor": 18,
        "SeatMax": 35
    },
    {
        "Date": "2024-01-10",
        "Company": "You Gov Poll",
        "Level": "Tasmanian State",
        "Count": 6,
        "PartyLabels": [PrtyNme.Lib, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.JLN, PrtyNme.Ind, PrtyNme.Oth],
        "PartyData": [31, 27, 15, 20, 7, 0],
        "PartyColor": [PartyColor.Lib, PartyColor.ALP, PartyColor.Grn, PartyColor.JLN, PartyColor.Ind, PartyColor.Oth],
        "SeatProj": [ 11, 10, 6, 7, 1, 0],
        "SeatMajor": 18,
        "SeatMax": 35
    },
    {
        "Date": "2021-05-01",
        "Company": "2021 Results",
        "Level": "Tasmanian State",
        "Count": 6,
        "PartyLabels": [PrtyNme.Lib, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.JLN, PrtyNme.Ind, PrtyNme.Oth],
        "PartyData": [48, 28, 12, 0, 6,6],
        "PartyColor": [PartyColor.Lib, PartyColor.ALP, PartyColor.Grn, PartyColor.JLN, PartyColor.Ind, PartyColor.Oth],
        "SeatProj": [13, 9, 2, 0, 1,0],
        "SeatMajor": 13,
        "SeatMax": 25
    }   
    ]
Object.freeze(TasmaniaState);