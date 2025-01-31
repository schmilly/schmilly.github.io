//Color Pallet
// #C97064 - Red (Highlight Color)
// #BCA371 - Brwn (non Selected)
// #A6B07E - Secondary Select (Sage)
// #68A357 - Green (N/A)
// #32965D - Additonal Green (Shamrock)
//
PartyColor = {
    "APR": "#FF006E",
    "APL": "#FF4F83",
    "GnR": "#39FF32",
    "GnL": "#55AA32",
    "VcS": "#000000",
    "SAl": "#FF0008",
    "Unf": "#808080"
}

PrtyNme = {
    "APR": "Labor Right",
    "APL": "Labor Left",
    "GnR": "Greens Right",
    "GnL": "Greens Left",
    "VcS": "Victorian Socialists",
    "SAl": "Socialist Alternative",
    "Unf": "Unaffiliated"
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
{...Electorates[ElectID.Lyons], PrimaryVote: [51.2,32.5,8.9,0.9,6.5]},
{...Electorates[ElectID.Braddon], PrimaryVote: [57.2,26.5,5.5,6.1,4.7]},
]  


const TasmaniaState =
    [
        {
        "Date": "Current",
        "Company": "Current House",
        "Level": "Tasmania State - Current House",
        "Count": 7,
        "PartyLabels": [PrtyNme.VcS, PrtyNme.SAl, PrtyNme.GnL, PrtyNme.Unf, PrtyNme.GnR, PrtyNme.APL,PrtyNme.APR],
        "PartyData": [48, 28, 12, 6, 6],
        "PartyColor": [PartyColor.VcS, PartyColor.SAl, PartyColor.GnL, PartyColor.Unf, PartyColor.GnR, PartyColor.APL,PartyColor.APR],
        "SeatProj": [1, 1, 5, 3, 4,2,2],
        "SeatMajor": 13,
        "SeatMax": 18,
        "ElectorateSeatCount": 5,
        "Electorate": Result_2021,
    }
    ]
