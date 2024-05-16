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
    "Eden-Monaro",
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
    "Kingsford Smith",
    "Kingston",
    "Kooyong",
    "La Trobe",
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
    "New England",
    "Newcastle",
    "Nicholls",
    "North Sydney",
    "O'Connor",
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
    "Wide Bay",
    "Wills",
    "Wright"
  ]

var PartyName = {
  "ALP":"Labor",
  "Lib":"Liberal"

}

var PartyColor = {
  "ALP": "#C97064",
  "Lib": "#56638A",
  "LaP": "#40798C",
  "LNP":"#0066ff",
  "UAP":"#ffff00",
  "Grn": "#00FF2B", 
  "Nat": "#009933",
  "One": "#FF3F00",
  "OaI": "#e8e3d3",
  "Oth": "#EDE7E3",
  "Ind": "#D4E4BC",
  "JLN": "#BCA371"
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
  "Eden-Monaro":"ALP",
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
  "Kennedy":"Katter's_Australian",
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
  "Mayo":"Centre_Alliance",
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
  "O'Connor":"Lib",
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
