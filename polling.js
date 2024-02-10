PartyColor = {
    "Labor": "#f54245",
    "Liberal": "#1a75ff",
    "LiberalNat": "#0033cc",
    "LNParty":"#0066ff",
    "Greens": "#42f575",
    "Nationals": "#009933",
    "OneNation": "#ffff99",
    "Other": "#e8e3d3",
    "Indipednt": "#fffff",
    "JaquieLambie": "#f5c842"
}

PrtyNme = {
    "ALP": "Labor",
    "Lib": "Liberal",
    "Grn": "Greens",
    "LaP": "Liberal and Nationals",
    "LNP": "Liberal-National Party",
    "One": "One Nation",
    "Oth": "Other",
    "Ind": "Indipendent",
    "OaI": "Others/Indipendents",
    "JLP": "Jaquie Lambie Party",
    "KAP": "Katter Australia Party",
    "Nat": "Nationals"
}

PollingData =
[   {
        "Date": "2024-01-10",
        "Company":"Freshwater Strategy",
        "Level": "Federal",
        "Count":4,
        "PartyLabels": [PrtyNme.LaP, PrtyNme.ALP, PrtyNme.Grn,PrtyNme.Oth],
        "PartyData": [39, 31, 14, 15],
        "PartyColor": [PartyColor.LiberalNat, PartyColor.Labor, PartyColor.Greens, PartyColor.Other,],
        "SeatProj": [11,10,6,1],
        "SeatMajor": 12
    },
    {
        "Date": "2024-01-10",
        "Company": "YouGov",
        "Level": "State - Tasmania",
        "Count": 5,
        "PartyLabels": [PrtyNme.Lib, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.JLP, PrtyNme.OaI],
        "PartyData": [31, 27, 15, 20, 7],
        "PartyColor": [PartyColor.Liberal, PartyColor.Labor, PartyColor.Greens, PartyColor.JaquieLambie,  PartyColor.Other]
    },
    {
        "Date": "2024-01-15",
        "Company": "OpinionMatters",
        "Level": "State - Victoria",
        "Count": 5,
        "PartyLabels": [PrtyNme.LaP, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.One, PrtyNme.OaI],
        "PartyData": [35, 30, 18, 10, 7],
        "PartyColor": [PartyColor.LiberalNat, PartyColor.Labor, PartyColor.Greens, PartyColor.OneNation,  PartyColor.Other]
    },
    {
        "Date": "2024-01-20",
        "Company": "SurveyCorp",
        "Level": "Federal",
        "Count": 4,
        "PartyLabels": [PrtyNme.LaP, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.KAP, PrtyNme.Oth],
        "PartyData": [40, 28, 16, 5, 11],
        "PartyColor": [PartyColor.LiberalNat, PartyColor.Labor, PartyColor.Greens, PartyColor.JaquieLambie,  PartyColor.Other]
    },
    {
        "Date": "2024-02-05",
        "Company": "ElectionAnalytics",
        "Level": "State - Western Australia",
        "Count": 6,
        "PartyLabels": [PrtyNme.LaP, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.JLP, PrtyNme.OaI],
        "PartyData": [33, 25, 20, 15, 7],
        "PartyColor": [PartyColor.LiberalNat, PartyColor.Labor, PartyColor.Greens, PartyColor.JaquieLambie,  PartyColor.Other]
    },
    {
        "Date": "2024-02-10",
        "Company": "StrategicPolls",
        "Level": "Federal",
        "Count": 5,
        "PartyLabels": [PrtyNme.LaP, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.KAP, PrtyNme.Oth],
        "PartyData": [41, 27, 15, 4, 13],
        "PartyColor": [PartyColor.LiberalNat, PartyColor.Labor, PartyColor.Greens, PartyColor.JaquieLambie,  PartyColor.Other]
    },
    {
        "Date": "2024-02-15",
        "Company": "PublicOpinions",
        "Level": "State - New South Wales",
        "Count": 7,
        "PartyLabels": [PrtyNme.LaP, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.One, PrtyNme.OaI],
        "PartyData": [36, 28, 16, 8, 12],
        "PartyColor": [PartyColor.LiberalNat, PartyColor.Labor, PartyColor.Greens, PartyColor.JaquieLambie,  PartyColor.Other]
    },
    {
        "Date": "2024-02-20",
        "Company": "VoteSurvey",
        "Level": "Federal",
        "Count": 4,
        "PartyLabels": [PrtyNme.LaP, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.One, PrtyNme.Oth],
        "PartyData": [38, 29, 13, 3, 17],
        "PartyColor": [PartyColor.LiberalNat, PartyColor.Labor, PartyColor.Greens, PartyColor.JaquieLambie,  PartyColor.Other]
    },
    {
        "Date": "2024-02-25",
        "Company": "InsightPolls",
        "Level": "State - Queensland",
        "Count": 6,
        "PartyLabels": [PrtyNme.LaP, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.KAP, PrtyNme.Oth],
        "PartyData": [37, 26, 17, 6, 14],
        "PartyColor": [PartyColor.LiberalNat, PartyColor.Labor, PartyColor.Greens, PartyColor.JaquieLambie, PartyColor.Other]
    },
    {
        "Date": "2024-03-05",
        "Company": "NationwideSurveys",
        "Level": "Federal",
        "Count": 5,
        "PartyLabels": [PrtyNme.LaP, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.One, PrtyNme.Oth],
        "PartyData": [39, 30, 14, 5, 12],
        "PartyColor": [PartyColor.LiberalNat, PartyColor.Labor, PartyColor.Greens, PartyColor.OneNation, PartyColor.Other]
    },
    {
        "Date": "2024-03-10",
        "Company": "MetroInsights",
        "Level": "State - South Australia",
        "Count": 4,
        "PartyLabels": [PrtyNme.Lib, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.JLP, PrtyNme.OaI],
        "PartyData": [32, 29, 16, 18, 5],
        "PartyColor": [PartyColor.Liberal, PartyColor.Labor, PartyColor.Greens, PartyColor.JaquieLambie, PartyColor.Other]
    },
    {
        "Date": "2024-03-15",
        "Company": "PeopleVoice",
        "Level": "Federal",
        "Count": 7,
        "PartyLabels": [PrtyNme.LaP, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.KAP, PrtyNme.Oth],
        "PartyData": [40, 27, 15, 7, 11],
        "PartyColor": [PartyColor.LiberalNat, PartyColor.Labor, PartyColor.Greens, PartyColor.JaquieLambie, PartyColor.Other]
    },
    {
        "Date": "2024-03-20",
        "Company": "CityOpinions",
        "Level": "State - Northern Territory",
        "Count": 5,
        "PartyLabels": [PrtyNme.LaP, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.One, PrtyNme.Oth],
        "PartyData": [35, 28, 18, 10, 9],
        "PartyColor": [PartyColor.LiberalNat, PartyColor.Labor, PartyColor.Greens, PartyColor.OneNation, PartyColor.Other]
    },
    {
        "Date": "2024-04-05",
        "Company": "NationalTrends",
        "Level": "Federal",
        "Count": 6,
        "PartyLabels": [PrtyNme.LaP, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.KAP, PrtyNme.Oth],
        "PartyData": [38, 29, 16, 6, 11],
        "PartyColor": [PartyColor.LiberalNat, PartyColor.Labor, PartyColor.Greens, PartyColor.JaquieLambie, PartyColor.Other]
    },
    {
        "Date": "2024-04-10",
        "Company": "RegionInsights",
        "Level": "State - Australian Capital Territory",
        "Count": 4,
        "PartyLabels": [PrtyNme.Lib, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.JLP, PrtyNme.OaI],
        "PartyData": [33, 30, 15, 17, 5],
        "PartyColor": [PartyColor.Liberal, PartyColor.Labor, PartyColor.Greens, PartyColor.JaquieLambie, PartyColor.Other]
    },
    {
        "Date": "2024-04-15",
        "Company": "SurveyInsights",
        "Level": "Federal",
        "Count": 7,
        "PartyLabels": [PrtyNme.LaP, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.One, PrtyNme.Oth],
        "PartyData": [41, 26, 14, 8, 11],
        "PartyColor": [PartyColor.LiberalNat, PartyColor.Labor, PartyColor.Greens, PartyColor.OneNation, PartyColor.Other]
    },
    {
        "Date": "2024-04-20",
        "Company": "VoiceOfPeople",
        "Level": "State - South Australia",
        "Count": 5,
        "PartyLabels": [PrtyNme.LaP, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.KAP, PrtyNme.Oth],
        "PartyData": [36, 28, 17, 6, 13],
        "PartyColor": [PartyColor.LiberalNat, PartyColor.Labor, PartyColor.Greens, PartyColor.JaquieLambie, PartyColor.Other]
    },
    {
        "Date": "2024-05-05",
        "Company": "AustralianInsights",
        "Level": "Federal",
        "Count": 6,
        "PartyLabels": [PrtyNme.LaP, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.JLP, PrtyNme.OaI],
        "PartyData": [37, 27, 16, 15, 5],
        "PartyColor": [PartyColor.LiberalNat, PartyColor.Labor, PartyColor.Greens, PartyColor.JaquieLambie, PartyColor.Other]
    },
    {
        "Date": "2024-05-10",
        "Company": "StateVoice",
        "Level": "State - Victoria",
        "Count": 4,
        "PartyLabels": [PrtyNme.Lib, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.One, PrtyNme.Oth],
        "PartyData": [34, 31, 14, 12, 9],
        "PartyColor": [PartyColor.Liberal, PartyColor.Labor, PartyColor.Greens, PartyColor.OneNation, PartyColor.Other]
    },
]