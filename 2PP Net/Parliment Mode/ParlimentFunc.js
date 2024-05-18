

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
