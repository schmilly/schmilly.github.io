

function SetSeatColor(ParlimentList){
  ParlimentList.forEach((i) => {
    eval("PartyID = Currentelectorateparty." + i)
    test = document.getElementbyId(i)
    console.log(test)
    
  })
};


var svgUrl    = "./Australian_House_of_Representatives_chart.svg";
var container = $("#container");
$.get(svgUrl)
  .then(injectSvg)
  .always(startAnimation);

function injectSvg(xmlDoc) {
  var svg = $(xmlDoc).find("svg");
  container.append(svg);
  svg.attr("id", "svg1")
}

function startAnimation() {
  // all the svg code comes here
  // the line below does work
  $("#svg1 #background").attr("fill","red");
  $("#svg2 #background").attr("fill","red");
}

