//Color Pallet
// #C97064 - Red (Highlight Color)
// #BCA371 - Brwn (non Selected)
// #A6B07E - Secondary Select (Sage)
// #68A357 - Green (N/A)
// #32965D - Additonal Green (Shamrock)
//
PartyColor = {
    "ALP": "#C97064",
    "Lib": "#56638A",
    "LaP": "#40798C",
    "LNP":"#0066ff",
    "Grn": "#68A357",
    "Nat": "#009933",
    "One": "#ffff99",
    "OaI": "#e8e3d3",
    "Oth": "#EDE7E3",
    "Ind": "#D4E4BC",
    "JLN": "#BCA371"
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

const ElectorateNames = [
  "Clark",
  "Franklin",
  "Bass",
  "Lyons",
  "Braddon"
];

var SeatIndex = ["ALP","Lib","Grn","Oth","Ind","JLN"];

const ElectID = {};
ElectorateNames.forEach((name, index) => {
  ElectID[name] = index;
});

//Electorate Data Key:
//Electorate {
//  Name: ""
//  SVGLoc: "" <-Link to SVG or image of electorate
//  SeatCount: ""
//  PrimaryVote: [] <- Organised based on PartyLabels in above data
// }

const Electorates = [
  {
  Name:"Clark",
  SVGLoc:"Tasmania-" + ElectorateNames[0] + ".svg",
  PrimaryVote: [0,0,0,0,0],
  Seats: [1,2,1,0,1],
  Color: [PartyColor.ALP,PartyColor.Lib,PartyColor.Grn,PartyColor.Ind,PartyColor.Oth]
  },
  {
  Name:"Franklin",
  SVGLoc:"Tasmania-" +  ElectorateNames[1] + ".svg",
  PrimaryVote: [0,0,0,0,0],
  Seats: [1,2,1,0,1,0],
  Color: [PartyColor.ALP,PartyColor.Lib,PartyColor.Grn,PartyColor.Ind,PartyColor.Oth]
  },
  {
  Name:"Bass",
  SVGLoc:"Tasmania-" +  ElectorateNames[2] + ".svg",
  PrimaryVote: [0,0,0,0,0],
  Seats: [2,2,0,0,1,0],
  Color: [PartyColor.ALP,PartyColor.Lib,PartyColor.Grn,PartyColor.Ind,PartyColor.Oth]
  },
  {
  Name:"Lyons",
  SVGLoc:"Tasmania-" + ElectorateNames[3] + ".svg",
  PrimaryVote: [0,0,0,0,0],
  Seats: [2,2,0,0,1,0],
  Color: [PartyColor.ALP,PartyColor.Lib,PartyColor.Grn,PartyColor.Ind,PartyColor.Oth]
  },
  {
  Name:"Braddon",
  SVGLoc:"Tasmania-" + ElectorateNames[4] + ".svg",
  PrimaryVote: [0,0,0,0,0],
  Seats: [2,3,0,0,0,0],
  Color: [PartyColor.ALP,PartyColor.Lib,PartyColor.Grn,PartyColor.Ind,PartyColor.Oth]
  },
];

var Result_2021 = [
{...Electorates[ElectID.Clark], PrimaryVote: [31.8,22.1,20,20.8,5.3], Seats:[1,2,1,0,1]},
{...Electorates[ElectID.Franklin], PrimaryVote: [42.3,33.2,18.9,0.5,5.1]},
{...Electorates[ElectID.Bass], PrimaryVote: [31.8,22.1,20,20.8,5.3]},
{...Electorates[ElectID.Lyons], PrimaryVote: [51.2,32.5,8.9,0.9,1.2]},
{...Electorates[ElectID.Braddon], PrimaryVote: [57.2,26.5,5.5,6.1,4.7]},
]  


const TasmaniaState =
    [
        {
        "Date": "Current",
        "Company": "Current House",
        "Level": "Tasmania State - Current House",
        "Count": 5,
        "PartyLabels": [PrtyNme.Lib, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.Ind, PrtyNme.Oth],
        "PartyData": [48, 28, 12, 6, 6],
        "PartyColor": [PartyColor.Lib, PartyColor.ALP, PartyColor.Grn, PartyColor.Ind, PartyColor.Oth],
        "SeatProj": [11, 8, 2, 4, 0],
        "SeatMajor": 13,
        "SeatMax": 25,
        "ElectorateSeatCount": 5,
        "Electorate": Result_2021,
    },
    {
        "Date": "Extrapolated",
        "Company": "35 Seat Count Extrapolated from Current House",
        "Level": "Tasmanian State - Extrapolated House",
        "Count": 5,
        "PartyLabels": [PrtyNme.Lib, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.Ind, PrtyNme.Oth],
        "PartyData": [48, 28, 12, 6, 6],
        "PartyColor": [PartyColor.Lib, PartyColor.ALP, PartyColor.Grn, PartyColor.Ind, PartyColor.Oth],
        "SeatProj": [15, 11, 3, 6, 0],
        "SeatMajor": 18,
        "SeatMax": 35,
        "ElectorateSeatCount": 7,
        "Electorate": Result_2021,
    },
    {
        "Date": "2024-01-10",
        "Company": "You Gov Poll",
        "Level": "Tasmanian State 2024-01-10 You Gov Poll",
        "Count": 6,
        "PartyLabels": [PrtyNme.Lib, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.JLN, PrtyNme.Ind, PrtyNme.Oth],
        "PartyData": [31, 27, 15, 20, 7, 0],
        "PartyColor": [PartyColor.Lib, PartyColor.ALP, PartyColor.Grn, PartyColor.JLN, PartyColor.Ind, PartyColor.Oth],
        "SeatProj": [ 11, 10, 6, 7, 1, 0],
        "SeatMajor": 18,
        "SeatMax": 35,
        "ElectorateSeatCount": 7,
        "Electorate": [
          {...Electorates[ElectID.Braddon], PrimaryVote: [35,30,11,17,7,0]},
          {...Electorates[ElectID.Clark], PrimaryVote: [20,30,27,10,13,0]},
          {...Electorates[ElectID.Bass], PrimaryVote: [36,27,13,22,2,0]},
          {...Electorates[ElectID.Franklin], PrimaryVote: [32,24,16,22,6,0]},
          {...Electorates[ElectID.Lyons], PrimaryVote: [57.2,26.5,5.5,6.1,4.7]},
        ]
    },
    {
        "Date": "2021-05-01",
        "Company": "2021 Results",
        "Level": "Tasmanian State - 2021 Results",
        "Count": 5,
        "PartyLabels": [PrtyNme.Lib, PrtyNme.ALP, PrtyNme.Grn, PrtyNme.Ind, PrtyNme.Oth],
        "PartyData": [48, 28, 12, 6,6],
        "PartyColor": [PartyColor.Lib, PartyColor.ALP, PartyColor.Grn, PartyColor.Ind, PartyColor.Oth],
        "SeatProj": [13, 9, 2, 1,0],
        "SeatMajor": 13,
        "SeatMax": 25,
        "ElectorateSeatCount": 7,
        "Electorate": Result_2021
    }   
    ]
Object.freeze(TasmaniaState);
