function seatToColor(Array,Color){ 
  ReturnArray=[];
  for (var i = 0; i < ElcSeatCount; i++){
    for (var x = 0; x < Array[i]; x++){
      ReturnArray.push(Color[i]);
    }
  }
  console.log(ReturnArray);
  return ReturnArray;
}



function buildElectorate(electorateData,ID){
  var Title = electorateData.Name;
  var Image = electorateData.SVGLoc;

  var Seats1 = "<div class='col-md-1 Seats' style='background:"
  var Seats2 = ";' id='rectangle'></div>"
  var FinalBoxes = "";

  ColorArray = seatToColor(electorateData.Seats,electorateData.Color);

  for (var i = 0; i<ElcSeatCount;i++){
    FinalBoxes += Seats1 + ColorArray[i] + Seats2;
  }

  let ElectorateHTML = '<div class="col-md-10 ' + 
  ID + ' Electorate"><div class="col-md-2"> <h3> <b>' +
  Title + '</b> </h3> <img src="'+ 
  Image + '"></img></div><div style="width:80%;height:100px" class="col-md-8"><canvas id="' + 
  ID + '"></canvas> <div ID="' + 
  ID + 'Seats">' + FinalBoxes  + "</div></div>";
  document.getElementById("ElectoralAndBugRow").innerHTML += ElectorateHTML;
};

function buildChartData(electorateData){
  var ReturnChart = JSON.parse(JSON.stringify(ElectorateChart));
  var sum = 0
  var VotingData = electorateData.PrimaryVote;
  VotingData.forEach((voting,index) => {
    ReturnChart.data.datasets[index] = {
      label: PrtyLabels[index],
      data: [voting],
      backgroundColor: colors[index]
    };
    sum += voting 
  });
  return ReturnChart;

};

function BuildElect(){
  for (var i = 0; i < ElcSeatCount; i++){
    buildElectorate(Electorat[i],"Elct" + i);
  };
  BuildChart();
};

function BuildChart(){
  ElectorateChartArray = [];
  for (var x = 0; x < ElcSeatCount; x++){
    var chartData = JSON.parse(JSON.stringify(buildChartData(Electorat[x])));
    console.log(chartData);
    ElectorateChartArray[x] = 
      new Chart(document.getElementById("Elct" + x),chartData)
  }
}

