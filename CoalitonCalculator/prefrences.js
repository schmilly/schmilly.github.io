

function buildElectorate(electorateData,ID){
  var Title = electorateData.Name;
  var Image = electorateData.SVGLoc;

  var Seats1 = "<div class='col-md-1' ID='Seat" + ID + "' style='background:"
  var Seats2 = ";height:10px;border-style:solid' id='rectangle'></div>"
  var FinalBoxes = "";
  for (var i = 0; i<ElcSeatCount;i++){
    FinalBoxes += Seats1 + Seats2;
  }
  let ElectorateHTML = '<div class="col-md-10 ' + 
  ID + ' Electorate"><div class="col-md-2"> <h3> <b>' +
  Title + '</b> </h3> <img src="'+ 
  Image + '"></img></div><div style="width:80%;height:100px" class="col-md-8"><canvas id="' + 
  ID + '">Chart goes here</canvas> <div ID="' + 
  ID + 'Seats">' + FinalBoxes  + "</div></div>';"
  BuiltChart = document.getElementById("ElectoralAndBugRow").innerHTML += ElectorateHTML;

  var ReturnChart = {...ElectorateChart};
  ReturnChart.data = {labels: [""], datasets: []};

  var sum = 0
  var VotingData = electorateData.PrimaryVote.slice(0);
  VotingData.forEach((vote,index) => {
    ReturnChart.data.datasets.push({
      label: PrtyLabels[index],
      data: [vote],
      borderColor: colors[index],
      backgroundColor: colors[index]
    })
    sum += vote 
  }); 
  return ReturnChart;
}
