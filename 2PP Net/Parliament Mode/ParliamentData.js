RawDataHeaderID = [
  "N/A",  "N/A",  "N/A",  "N/A",
  "LaP", 
  "ALP",
  "Grn",
  "One",
  "UAP",
  "Oth",
  "N/A","N/A",  "N/A" 
]

PollList = [
  "LaP", 
  "ALP",
  "Grn",
  "One",
  "UAP",
  "Oth",
  ]

Location = {
  "ALP":5,
  "LaP":4,
  "Grn":6,
  "One":7,
  "UAP":8,
  "Oth":9
}

var PollIDConvert = {
  "ALP": "ALP",
  "Lib": "LaP",
  "LaP": "LaP",
  "LNP": "LaP",
  "UAP": "UAP",
  "Grn": "Grn", 
  "Nat": "LaP",
  "One": "One",
    "Oth": "Oth",
  "Ind": "Oth",
  "JLN": "Oth",
  "CAl": "Oth",
  "KAP": "Oth"
}
 
var PartyNameArray = {
  "ALP": "Labor Party",
  "Lib": "Liberal Party",
  "LaP": "Liberal and Nationals Party",
  "LNP": "Liberal National Party",
  "UAP": "United Australia Party",
  "Grn": "Greens", 
  "Nat": "Nationals",
  "One": "One Nation",
    "Oth": "Other",
  "Ind": "Indipendent",
  "JLN": "Jacqui Lambie Network",
  "CAl": "Center Alliance",
  "KAP": "Katter Australia Party"
}

var PartyColor = {
  "ALP": "#ee0003",
  "Lib": "#0068e8",
  "LaP": "#0068e8",
  "LNP": "#008fe8",
  "UAP": "#ffff00",
  "Grn": "#33b747", 
  "Nat": "#1f412f",
  "One": "#cc5b10",
    "Oth": "#EDE7E3",
  "Ind": "#C2C7D0",
  "JLN": "#BCA371",
  "CAl": "Orange",
  "KAP": "#910f00"
}

ElectorateList =
  [
    "Adelaide",
    "Aston",
    "Ballarat",
    "Banks",
    "Barker",
    "Barton",
    "Bass",
    "Bean",
    "Bendigo",
    "Bennelong",
    "Berowra",
    "Blair",
    "Blaxland",
    "Bonner",
    "Boothby",
    "Bowman",
    "Braddon",
    "Bradfield",
    "Brand",
    "Brisbane",
    "Bruce",
    "Burt",
    "Calare",
    "Calwell",
    "Canberra",
    "Canning",
    "Capricornia",
    "Casey",
    "Chifley",
    "Chisholm",
    "Clark",
    "Cook",
    "Cooper",
    "Corangamite",
    "Corio",
    "Cowan",
    "Cowper",
    "Cunningham",
    "Curtin",
    "Dawson",
    "Deakin",
    "Dickson",
    "Dobell",
    "Dunkley",
    "Durack",
    "EdenMonaro",
    "Fadden",
    "Fairfax",
    "Farrer",
    "Fenner",
    "Fisher",
    "Flinders",
    "Flynn",
    "Forde",
    "Forrest",
    "Fowler",
    "Franklin",
    "Fraser",
    "Fremantle",
    "Gellibrand",
    "Gilmore",
    "Gippsland",
    "Goldstein",
    "Gorton",
    "Grayndler",
    "Greenway",
    "Grey",
    "Griffith",
    "Groom",
    "Hasluck",
    "Hawke",
    "Herbert",
    "Higgins",
    "Hindmarsh",
    "Hinkler",
    "Holt",
    "Hotham",
    "Hughes",
    "Hume",
    "Hunter",
    "Indi",
    "Isaacs",
    "Jagajaga",
    "Kennedy",
    "Kingsford_Smith",
    "Kingston",
    "Kooyong",
    "La_Trobe",
    "Lalor",
    "Leichhardt",
    "Lilley",
    "Lindsay",
    "Lingiari",
    "Longman",
    "Lyne",
    "Lyons",
    "Macarthur",
    "Mackellar",
    "Macnamara",
    "Macquarie",
    "Makin",
    "Mallee",
    "Maranoa",
    "Maribyrnong",
    "Mayo",
    "McEwen",
    "McMahon",
    "McPherson",
    "Melbourne",
    "Menzies",
    "Mitchell",
    "Monash",
    "Moncrieff",
    "Moore",
    "Moreton",
    "New_England",
    "Newcastle",
    "Nicholls",
    "North_Sydney",
    "OConnor",
    "Oxley",
    "Page",
    "Parkes",
    "Parramatta",
    "Paterson",
    "Pearce",
    "Perth",
    "Petrie",
    "Rankin",
    "Reid",
    "Richmond",
    "Riverina",
    "Robertson",
    "Ryan",
    "Scullin",
    "Shortland",
    "Solomon",
    "Spence",
    "Sturt",
    "Swan",
    "Sydney",
    "Tangney",
    "Wannon",
    "Warringah",
    "Watson",
    "Wentworth",
    "Werriwa",
    "Whitlam",
    "Wide_Bay",
    "Wills",
    "Wright"
  ]


var ElectorateIDNameArray = {
  "Adelaide":"Adelaide",
  "Aston":"Aston",
  "Ballarat":"Ballarat",
  "Banks":"Banks",
  "Barker":"Barker",
  "Barton":"Barton",
  "Bass":"Bass",
  "Bean":"Bean",
  "Bendigo":"Bendigo",
  "Bennelong":"Bennelong",
  "Berowra":"Berowra",
  "Blair":"Blair",
  "Blaxland":"Blaxland",
  "Bonner":"Bonner",
  "Boothby":"Boothby",
  "Bowman":"Bowman",
  "Braddon":"Braddon",
  "Bradfield":"Bradfield",
  "Brand":"Brand",
  "Brisbane":"Brisbane",
  "Bruce":"Bruce",
  "Burt":"Burt",
  "Calare":"Calare",
  "Calwell":"Calwell",
  "Canberra":"Canberra",
  "Canning":"Canning",
  "Capricornia":"Capricornia",
  "Casey":"Casey",
  "Chifley":"Chifley",
  "Chisholm":"Chisholm",
  "Clark":"Clark",
  "Cook":"Cook",
  "Cooper":"Cooper",
  "Corangamite":"Corangamite",
  "Corio":"Corio",
  "Cowan":"Cowan",
  "Cowper":"Cowper",
  "Cunningham":"Cunningham",
  "Curtin":"Curtin",
  "Dawson":"Dawson",
  "Deakin":"Deakin",
  "Dickson":"Dickson",
  "Dobell":"Dobell",
  "Dunkley":"Dunkley",
  "Durack":"Durack",
  "EdenMonaro":"Eden-Monaro",
  "Fadden":"Fadden",
  "Fairfax":"Fairfax",
  "Farrer":"Farrer",
  "Fenner":"Fenner",
  "Fisher":"Fisher",
  "Flinders":"Flinders",
  "Flynn":"Flynn",
  "Forde":"Forde",
  "Forrest":"Forrest",
  "Fowler":"Fowler",
  "Franklin":"Franklin",
  "Fraser":"Fraser",
  "Fremantle":"Fremantle",
  "Gellibrand":"Gellibrand",
  "Gilmore":"Gilmore",
  "Gippsland":"Gippsland",
  "Goldstein":"Goldstein",
  "Gorton":"Gorton",
  "Grayndler":"Grayndler",
  "Greenway":"Greenway",
  "Grey":"Grey",
  "Griffith":"Griffith",
  "Groom":"Groom",
  "Hasluck":"Hasluck",
  "Hawke":"Hawke",
  "Herbert":"Herbert",
  "Higgins":"Higgins",
  "Hindmarsh":"Hindmarsh",
  "Hinkler":"Hinkler",
  "Holt":"Holt",
  "Hotham":"Hotham",
  "Hughes":"Hughes",
  "Hume":"Hume",
  "Hunter":"Hunter",
  "Indi":"Indi",
  "Isaacs":"Isaacs",
  "Jagajaga":"Jagajaga",
  "Kennedy":"Kennedy",
  "Kingsford_Smith":"Kingsford Smith",
  "Kingston":"Kingston",
  "Kooyong":"Kooyong",
  "La_Trobe":"La Trobe",
  "Lalor":"Lalor",
  "Leichhardt":"Leichhardt",
  "Lilley":"Lilley",
  "Lindsay":"Lindsay",
  "Lingiari":"Lingiari",
  "Longman":"Longman",
  "Lyne":"Lyne",
  "Lyons":"Lyons",
  "Macarthur":"Macarthur",
  "Mackellar":"Mackellar",
  "Macnamara":"Macnamara",
  "Macquarie":"Macquarie",
  "Makin":"Makin",
  "Mallee":"Mallee",
  "Maranoa":"Maranoa",
  "Maribyrnong":"Maribyrnong",
  "Mayo":"Mayo",
  "McEwen":"McEwen",
  "McMahon":"McMahon",
  "McPherson":"McPherson",
  "Melbourne":"Melbourne",
  "Menzies":"Menzies",
  "Mitchell":"Mitchell",
  "Monash":"Monash",
  "Moncrieff":"Moncrieff",
  "Moore":"Moore",
  "Moreton":"Moreton",
  "New_England":"New England",
  "Newcastle":"Newcastle",
  "Nicholls":"Nicholls",
  "North_Sydney":"North Sydney",
  "OConnor":"O'Connor",
  "Oxley":"Oxley",
  "Page":"Page",
  "Parkes":"Parkes",
  "Parramatta":"Parramatta",
  "Paterson":"Paterson",
  "Pearce":"Pearce",
  "Perth":"Perth",
  "Petrie":"Petrie",
  "Rankin":"Rankin",
  "Reid":"Reid",
  "Richmond":"Richmond",
  "Riverina":"Riverina",
  "Robertson":"Robertson",
  "Ryan":"Ryan",
  "Scullin":"Scullin",
  "Shortland":"Shortland",
  "Solomon":"Solomon",
  "Spence":"Spence",
  "Sturt":"Sturt",
  "Swan":"Swan",
  "Sydney":"Sydney",
  "Tangney":"Tangney",
  "Wannon":"Wannon",
  "Warringah":"Warringah",
  "Watson":"Watson",
  "Wentworth":"Wentworth",
  "Werriwa":"Werriwa",
  "Whitlam":"Whitlam",
  "Wide_Bay":"Wide Bay",
  "Wills":"Wills",
  "Wright":"Wright"
}

var Currentelectorateparty = {
  "Adelaide":"ALP",
  "Aston":"ALP",
  "Ballarat":"ALP",
  "Banks":"Lib",
  "Barker":"Lib",
  "Barton":"ALP",
  "Bass":"Lib",
  "Bean":"ALP",
  "Bendigo":"ALP",
  "Bennelong":"ALP",
  "Berowra":"Lib",
  "Blair":"ALP",
  "Blaxland":"ALP",
  "Bonner":"LNP",
  "Boothby":"ALP",
  "Bowman":"LNP",
  "Braddon":"Lib",
  "Bradfield":"Lib",
  "Brand":"ALP",
  "Brisbane":"Grn",
  "Bruce":"ALP",
  "Burt":"ALP",
  "Calare":"Ind",
  "Calwell":"ALP",
  "Canberra":"ALP",
  "Canning":"Lib",
  "Capricornia":"LNP",
  "Casey":"Lib",
  "Chifley":"ALP",
  "Chisholm":"ALP",
  "Clark":"Ind",
  "Cook":"Lib",
  "Cooper":"ALP",
  "Corangamite":"ALP",
  "Corio":"ALP",
  "Cowan":"ALP",
  "Cowper":"Nat",
  "Cunningham":"ALP",
  "Curtin":"Ind",
  "Dawson":"LNP",
  "Deakin":"Lib",
  "Dickson":"LNP",
  "Dobell":"ALP",
  "Dunkley":"ALP",
  "Durack":"Lib",
  "EdenMonaro":"ALP",
  "Fadden":"LNP",
  "Fairfax":"LNP",
  "Farrer":"Lib",
  "Fenner":"ALP",
  "Fisher":"LNP",
  "Flinders":"Lib",
  "Flynn":"LNP",
  "Forde":"LNP",
  "Forrest":"Lib",
  "Fowler":"Ind",
  "Franklin":"ALP",
  "Fraser":"ALP",
  "Fremantle":"ALP",
  "Gellibrand":"ALP",
  "Gilmore":"ALP",
  "Gippsland":"Nat",
  "Goldstein":"Ind",
  "Gorton":"ALP",
  "Grayndler":"ALP",
  "Greenway":"ALP",
  "Grey":"Lib",
  "Griffith":"Grn",
  "Groom":"LNP",
  "Hasluck":"ALP",
  "Hawke":"ALP",
  "Herbert":"LNP",
  "Higgins":"ALP",
  "Hindmarsh":"ALP",
  "Hinkler":"LNP",
  "Holt":"ALP",
  "Hotham":"ALP",
  "Hughes":"Lib",
  "Hume":"Lib",
  "Hunter":"ALP",
  "Indi":"Ind",
  "Isaacs":"ALP",
  "Jagajaga":"ALP",
  "Kennedy":"KAP",
  "Kingsford_Smith":"ALP",
  "Kingston":"ALP",
  "Kooyong":"Ind",
  "La_Trobe":"Lib",
  "Lalor":"ALP",
  "Leichhardt":"LNP",
  "Lilley":"ALP",
  "Lindsay":"Lib",
  "Lingiari":"ALP",
  "Longman":"LNP",
  "Lyne":"Nat",
  "Lyons":"ALP",
  "Macarthur":"ALP",
  "Mackellar":"Ind",
  "Macnamara":"ALP",
  "Macquarie":"ALP",
  "Makin":"ALP",
  "Mallee":"Nat",
  "Maranoa":"LNP",
  "Maribyrnong":"ALP",
  "Mayo":"CAl",
  "McEwen":"ALP",
  "McMahon":"ALP",
  "McPherson":"LNP",
  "Melbourne":"Grn",
  "Menzies":"Lib",
  "Mitchell":"Lib",
  "Monash":"Ind",
  "Moncrieff":"LNP",
  "Moore":"Lib",
  "Moreton":"ALP",
  "New_England":"Nat",
  "Newcastle":"ALP",
  "Nicholls":"Nat",
  "North_Sydney":"Ind",
  "OConnor":"Lib",
  "Oxley":"ALP",
  "Page":"Nat",
  "Parkes":"Nat",
  "Parramatta":"ALP",
  "Paterson":"ALP",
  "Pearce":"ALP",
  "Perth":"ALP",
  "Petrie":"LNP",
  "Rankin":"ALP",
  "Reid":"ALP",
  "Richmond":"ALP",
  "Riverina":"Nat",
  "Robertson":"ALP",
  "Ryan":"Grn",
  "Scullin":"ALP",
  "Shortland":"ALP",
  "Solomon":"ALP",
  "Spence":"ALP",
  "Sturt":"Lib",
  "Swan":"ALP",
  "Sydney":"ALP",
  "Tangney":"ALP",
  "Wannon":"Lib",
  "Warringah":"Ind",
  "Watson":"ALP",
  "Wentworth":"Ind",
  "Werriwa":"ALP",
  "Whitlam":"ALP",
  "Wide_Bay":"LNP",
  "Wills":"ALP",
  "Wright":"LNP"
}

var ElcLocation = {"Adelaide":"SA",
  "Aston":"Vic",
  "Ballarat":"Vic",
  "Banks":"NSW",
  "Barker":"SA",
  "Barton":"NSW",
  "Bass":"TAS",
  "Bean":"ACT",
  "Bendigo":"Vic",
  "Bennelong":"NSW",
  "Berowra":"NSW",
  "Blair":"QLD",
  "Blaxland":"NSW",
  "Bonner":"QLD",
  "Boothby":"SA",
  "Bowman":"QLD",
  "Braddon":"TAS",
  "Bradfield":"NSW",
  "Brand":"WA",
  "Brisbane":"QLD",
  "Bruce":"Vic",
  "Burt":"WA",
  "Calare":"NSW",
  "Calwell":"Vic",
  "Canberra":"ACT",
  "Canning":"WA",
  "Capricornia":"QLD",
  "Casey":"Vic",
  "Chifley":"NSW",
  "Chisholm":"Vic",
  "Clark":"TAS",
  "Cook":"NSW",
  "Cooper":"Vic",
  "Corangamite":"Vic",
  "Corio":"Vic",
  "Cowan":"WA",
  "Cowper":"NSW",
  "Cunningham":"NSW",
  "Curtin":"WA",
  "Dawson":"QLD",
  "Deakin":"Vic",
  "Dickson":"QLD",
  "Dobell":"NSW",
  "Dunkley":"Vic",
  "Durack":"WA",
  "EdenMonaro":"NSW",
  "Fadden":"QLD",
  "Fairfax":"QLD",
  "Farrer":"NSW",
  "Fenner":"ACT",
  "Fisher":"QLD",
  "Flinders":"Vic",
  "Flynn":"QLD",
  "Forde":"QLD",
  "Forrest":"WA",
  "Fowler":"NSW",
  "Franklin":"TAS",
  "Fraser":"Vic",
  "Fremantle":"WA",
  "Gellibrand":"Vic",
  "Gilmore":"NSW",
  "Gippsland":"Vic",
  "Goldstein":"Vic",
  "Gorton":"Vic",
  "Grayndler":"NSW",
  "Greenway":"NSW",
  "Grey":"SA",
  "Griffith":"QLD",
  "Groom":"QLD",
  "Hasluck":"WA",
  "Hawke":"Vic",
  "Herbert":"QLD",
  "Higgins":"Vic",
  "Hindmarsh":"SA",
  "Hinkler":"QLD",
  "Holt":"Vic",
  "Hotham":"Vic",
  "Hughes":"NSW",
  "Hume":"NSW",
  "Hunter":"NSW",
  "Indi":"Vic",
  "Isaacs":"Vic",
  "Jagajaga":"Vic",
  "Kennedy":"QLD",
  "Kingsford_Smith":"NSW",
  "Kingston":"SA",
  "Kooyong":"Vic",
  "La_Trobe":"Vic",
  "Lalor":"Vic",
  "Leichhardt":"QLD",
  "Lilley":"QLD",
  "Lindsay":"NSW",
  "Lingiari":"NT",
  "Longman":"QLD",
  "Lyne":"NSW",
  "Lyons":"TAS",
  "Macarthur":"NSW",
  "Mackellar":"NSW",
  "Macnamara":"Vic",
  "Macquarie":"NSW",
  "Makin":"SA",
  "Mallee":"Vic",
  "Maranoa":"QLD",
  "Maribyrnong":"Vic",
  "Mayo":"SA",
  "McEwen":"Vic",
  "McMahon":"NSW",
  "McPherson":"QLD",
  "Melbourne":"Vic",
  "Menzies":"Vic",
  "Mitchell":"NSW",
  "Monash":"Vic",
  "Moncrieff":"QLD",
  "Moore":"WA",
  "Moreton":"QLD",
  "New_England":"NSW",
  "Newcastle":"NSW",
  "Nicholls":"Vic",
  "North_Sydney":"NSW",
  "OConnor":"WA",
  "Oxley":"QLD",
  "Page":"NSW",
  "Parkes":"NSW",
  "Parramatta":"NSW",
  "Paterson":"NSW",
  "Pearce":"WA",
  "Perth":"WA",
  "Petrie":"QLD",
  "Rankin":"QLD",
  "Reid":"NSW",
  "Richmond":"NSW",
  "Riverina":"NSW",
  "Robertson":"NSW",
  "Ryan":"QLD",
  "Scullin":"Vic",
  "Shortland":"NSW",
  "Solomon":"NT",
  "Spence":"SA",
  "Sturt":"SA",
  "Swan":"WA",
  "Sydney":"NSW",
  "Tangney":"WA",
  "Wannon":"Vic",
  "Warringah":"NSW",
  "Watson":"NSW",
  "Wentworth":"NSW",
  "Werriwa":"NSW",
  "Whitlam":"NSW",
  "Wide_Bay":"QLD",
  "Wills":"Vic",
  "Wright":"QLD"}

var StateIDArray = {
  "NSW": "New South Wales",
  "QLD": "Queensland",
  "TAS": "Tasmania",
  "WA": "Western Australia",
  "SA": "South Australia",
  "ACT": "Australian Capital Territory",
  "Vic": "Victoria",
  "NT": "Northen Territory"
};

var MPArray = {"Adelaide":"Steve Georganas",
  "Aston":"Mary Doyle",
  "Ballarat":"Catherine King",
  "Banks":"David Coleman",
  "Barker":"Tony Pasin",
  "Barton":"Linda Burney",
  "Bass":"Bridget Archer",
  "Bean":"David Smith",
  "Bendigo":"Lisa Chesters",
  "Bennelong":"Jerome Laxale",
  "Berowra":"Julian Leeser",
  "Blair":"Shayne Neumann",
  "Blaxland":"Jason Clare",
  "Bonner":"Ross Vasta",
  "Boothby":"Louise Miller-Frost",
  "Bowman":"Henry Pike",
  "Braddon":"Gavin Pearce",
  "Bradfield":"Paul Fletcher",
  "Brand":"Madeleine King",
  "Brisbane":"Stephen Bates",
  "Bruce":"Julian Hill",
  "Burt":"Matt Keogh",
  "Calare":"Andrew Gee",
  "Calwell":"Maria Vamvakinou",
  "Canberra":"Alicia Payne",
  "Canning":"Andrew Hastie",
  "Capricornia":"Michelle Landry",
  "Casey":"Aaron Violi",
  "Chifley":"Ed Husic",
  "Chisholm":"Carina Garland",
  "Clark":"Andrew Wilkie",
  "Cook":"Simon Kennedy",
  "Cooper":"Ged Kearney",
  "Corangamite":"Libby Coker",
  "Corio":"Richard Marles",
  "Cowan":"Anne Aly",
  "Cowper":"Pat Conaghan",
  "Cunningham":"Alison Byrnes",
  "Curtin":"Kate Chaney",
  "Dawson":"Andrew Willcox",
  "Deakin":"Michael Sukkar",
  "Dickson":"Peter Dutton",
  "Dobell":"Emma McBride",
  "Dunkley":"Jodie Belyea",
  "Durack":"Melissa Price",
  "EdenMonaro":"Kristy McBain",
  "Fadden":"Cameron Caldwell",
  "Fairfax":"Ted O'Brien",
  "Farrer":"Sussan Ley",
  "Fenner":"Andrew Leigh",
  "Fisher":"Andrew Wallace",
  "Flinders":"Zoe McKenzie",
  "Flynn":"Colin Boyce",
  "Forde":"Bert van Manen",
  "Forrest":"Nola Marino",
  "Fowler":"Dai Le",
  "Franklin":"Julie Collins",
  "Fraser":"Daniel Mulino",
  "Fremantle":"Josh Wilson",
  "Gellibrand":"Tim Watts",
  "Gilmore":"Fiona Phillips",
  "Gippsland":"Darren Chester",
  "Goldstein":"Zoe Daniel",
  "Gorton":"Brendan O'Connor",
  "Grayndler":"Anthony Albanese",
  "Greenway":"Michelle Rowland",
  "Grey":"Rowan Ramsey",
  "Griffith":"Max Chandler-Mather",
  "Groom":"Garth Hamilton",
  "Hasluck":"Tania Lawrence",
  "Hawke":"Sam Rae",
  "Herbert":"Phillip Thompson",
  "Higgins":"Michelle Ananda-Rajah",
  "Hindmarsh":"Mark Butler",
  "Hinkler":"Keith Pitt",
  "Holt":"Cassandra Fernando",
  "Hotham":"Clare O'Neil",
  "Hughes":"Jenny Ware",
  "Hume":"Angus Taylor",
  "Hunter":"Dan Repacholi",
  "Indi":"Helen Haines",
  "Isaacs":"Mark Dreyfus",
  "Jagajaga":"Kate Thwaites",
  "Kennedy":"Bob Katter",
  "Kingsford_Smith":"Matt Thistlethwaite",
  "Kingston":"Amanda Rishworth",
  "Kooyong":"Monique Ryan",
  "La_Trobe":"Jason Wood",
  "Lalor":"Joanne Ryan",
  "Leichhardt":"Warren Entsch",
  "Lilley":"Anika Wells",
  "Lindsay":"Melissa McIntosh",
  "Lingiari":"Marion Scrymgour",
  "Longman":"Terry Young",
  "Lyne":"David Gillespie",
  "Lyons":"Brian Mitchell",
  "Macarthur":"Mike Freelander",
  "Mackellar":"Sophie Scamps",
  "Macnamara":"Josh Burns",
  "Macquarie":"Susan Templeman",
  "Makin":"Tony Zappia",
  "Mallee":"Anne Webster",
  "Maranoa":"David Littleproud",
  "Maribyrnong":"Bill Shorten",
  "Mayo":"Rebekha Sharkie",
  "McEwen":"Rob Mitchell",
  "McMahon":"Chris Bowen",
  "McPherson":"Karen Andrews",
  "Melbourne":"Adam Bandt",
  "Menzies":"Keith Wolahan",
  "Mitchell":"Alex Hawke",
  "Monash":"Russell Broadbent",
  "Moncrieff":"Angie Bell",
  "Moore":"Ian Goodenough",
  "Moreton":"Graham Perrett",
  "New_England":"Barnaby Joyce",
  "Newcastle":"Sharon Claydon",
  "Nicholls":"Sam Birrell",
  "North_Sydney":"Kylea Tink",
  "OConnor":"Rick Wilson",
  "Oxley":"Milton Dick",
  "Page":"Kevin Hogan",
  "Parkes":"Mark Coulton",
  "Parramatta":"Andrew Charlton",
  "Paterson":"Meryl Swanson",
  "Pearce":"Tracey Roberts",
  "Perth":"Patrick Gorman",
  "Petrie":"Luke Howarth",
  "Rankin":"Jim Chalmers",
  "Reid":"Sally Sitou",
  "Richmond":"Justine Elliot",
  "Riverina":"Michael McCormack",
  "Robertson":"Gordon Reid",
  "Ryan":"Elizabeth Watson-Brown",
  "Scullin":"Andrew Giles",
  "Shortland":"Pat Conroy",
  "Solomon":"Luke Gosling",
  "Spence":"Matt Burnell",
  "Sturt":"James Stevens",
  "Swan":"Zaneta Mascarenhas",
  "Sydney":"Tanya Plibersek",
  "Tangney":"Sam Lim",
  "Wannon":"Dan Tehan",
  "Warringah":"Zali Steggall",
  "Watson":"Tony Burke",
  "Wentworth":"Allegra Spender",
  "Werriwa":"Anne Stanley",
  "Whitlam":"Stephen Jones",
  "Wide_Bay":"Llew O'Brien",
  "Wills":"Peter Khalil",
  "Wright":"Scott Buchholz"}
