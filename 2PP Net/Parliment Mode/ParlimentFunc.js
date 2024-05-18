
//-- SVG Functions --
//
function SetSeatColor(ParlimentList){
  ParlimentList.forEach((i) => {
    var Seat = document.getElementById(i)
    eval("PartyID = Currentelectorateparty." + i)
    eval("SeatColor = PartyColor." + PartyID)
    try {
      if (rgb2hex(Seat.style.fill) != SeatColor.toLowerCase()){
        Seat.style.fill = SeatColor;
        //console.log("Set Color for " + i)
      }
      else {
        // console.log( i + " already correct color")
      }
    }
    catch {
      console.log("Error," + i + " not found")
    }
    Seat.addEventListener("click",ClickonSeat)
    function ClickonSeat(SeatID){
      Name = document.getElementById("ElcName")
      eval ("Name.innerText =  ElectorateIDNameArray." + i)
      MPName = document.getElementById("ElcMoP")
      eval ("MPName.innerText = MPArray." + i)
      PartyName = document.getElementById("ElcPrty")
      PartyIcon = document.getElementById("ElcPrtyIcon")
      eval ("ElcPartyID = Currentelectorateparty." + i)
      eval("PartyName.innerText = PartyNameArray." + ElcPartyID)
      eval("PartyIcon.style.color = PartyColor." + ElcPartyID)
      LocName = document.getElementById("ElcState")
      eval("LocID = ElcLocation." + i)
      eval("LocName.innerText = StateIDArray." + LocID)
    }
  })
};

var svgUrl    = "./Australian_House_of_Representatives_chart.svg";
var container = $("#container");
$.get(svgUrl) 
  .then(injectSvg)

function injectSvg(xmlDoc) {
  var svg = $(xmlDoc).find("svg");
  container.append(svg);
  svg.attr("id", "test")
  svg.attr("height","")
  svg.attr("width","100%")
  svg.attr("onload","SetSeatColor(ElectorateList)")
  loaded = true;
}

//Taken from Satckoverflow
// https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

//--Seat Functions--


var Chart2PP = {
  "type": "bar",
  "data": {
    "datasets": [
      {
        "label": "Liberal",
        "data": [
          31.8
        ],
        "backgroundColor": "#56638a"
      },
      {
        "label": "Labor",
        "data": [
          22.1
        ],
        "backgroundColor": "#c97064"
      },
      {
        "label": "Greens",
        "data": [
          20
        ],
        "backgroundColor": "#68a357"
      },
      {
        "label": "Independent",
        "data": [
          20.8
        ],
        "backgroundColor": "#d4e4bc"
      },
      {
        "label": "Other",
        "data": [
          5.3
        ],
        "backgroundColor": "#ede7e3"
      }
    ],
    "labels": [
      ""
    ]
  },
  "options": {
    "indexAxis": "y",
    "maintainAspectRatio": false,
    "elements": {
      "bar": {
        "borderWidth": 2
      }
    },
    "plugins": {
      "legend": {
        "position": "right"
      },
      "title": {
        "display": false,
        "text": ""
      }
    },
    "scales": {
      "x": {
        "axis": "x",
        "stacked": true,
        "max": 100,
        "type": "linear",
        "beginAtZero": true,
        "ticks": {
          "minRotation": 0,
          "maxRotation": 50,
          "mirror": false,
          "textStrokeWidth": 0,
          "textStrokeColor": "",
          "padding": 3,
          "display": true,
          "autoSkip": true,
          "autoSkipPadding": 3,
          "labelOffset": 0,
          "minor": {},
          "major": {},
          "align": "center",
          "crossAlign": "near",
          "showLabelBackdrop": false,
          "backdropColor": "rgba(255, 255, 255, 0.75)",
          "backdropPadding": 2,
          "color": "#666"
        },
        "display": true,
        "offset": false,
        "reverse": false,
        "bounds": "ticks",
        "clip": true,
        "grace": 0,
        "grid": {
          "display": true,
          "lineWidth": 1,
          "drawOnChartArea": true,
          "drawTicks": true,
          "tickLength": 8,
          "offset": false,
          "color": "rgba(0,0,0,0.1)"
        },
        "border": {
          "display": true,
          "dash": [],
          "dashOffset": 0,
          "width": 1,
          "color": "rgba(0,0,0,0.1)"
        },
        "title": {
          "display": false,
          "text": "",
          "padding": {
            "top": 4,
            "bottom": 4
          },
          "color": "#666"
        },
        "id": "x",
        "position": "bottom"
      },
      "y": {
        "axis": "y",
        "stacked": true,
        "max": 100,
        "type": "category",
        "offset": true,
        "grid": {
          "offset": true,
          "display": true,
          "lineWidth": 1,
          "drawOnChartArea": true,
          "drawTicks": true,
          "tickLength": 8,
          "color": "rgba(0,0,0,0.1)"
        },
        "ticks": {
          "minRotation": 0,
          "maxRotation": 50,
          "mirror": false,
          "textStrokeWidth": 0,
          "textStrokeColor": "",
          "padding": 3,
          "display": true,
          "autoSkip": true,
          "autoSkipPadding": 3,
          "labelOffset": 0,
          "minor": {},
          "major": {},
          "align": "center",
          "crossAlign": "near",
          "showLabelBackdrop": false,
          "backdropColor": "rgba(255, 255, 255, 0.75)",
          "backdropPadding": 2,
          "color": "#666"
        },
        "display": true,
        "reverse": false,
        "beginAtZero": false,
        "bounds": "ticks",
        "clip": true,
        "grace": 0,
        "border": {
          "display": true,
          "dash": [],
          "dashOffset": 0,
          "width": 1,
          "color": "rgba(0,0,0,0.1)"
        },
        "title": {
          "display": false,
          "text": "",
          "padding": {
            "top": 4,
            "bottom": 4
          },
          "color": "#666"
        },
        "id": "y",
        "position": "left"
      }
    }
  }
}

