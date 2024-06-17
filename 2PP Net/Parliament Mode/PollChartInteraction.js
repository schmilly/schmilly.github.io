SmoothCircle.onclick = PollClick; 

function PollClick(click){
  //console.log(click)
  try{
    const points = mixedChart.getElementsAtEventForMode(click,'nearest'
    , { intersect: true}, false)
    if (points[0].datasetIndex != 0){throw new Error("Click on undefined average 2PP")}
    ClickonPoll = RawData[points[0].index];
    //console.log(RawData[points[0].index])
    

    PartyPref = ClickonPoll[11]-ClickonPoll[12]
    document.getElementById("SelectPollDate").innerText = ClickonPoll[0]
    document.getElementById("PllPollster").innerText = ClickonPoll[1]  
    //document.getElementById("PllPrimaryVote").innerText = ClickonPoll[2]
    if (TwoPPBool){
      document.getElementById("Pll2PP").innerText = points[0].element.$context.raw.y.toFixed(2) + "%"; 
    }
    else{document.getElementById("Pll2PP").innerText = PartyPref.toFixed(2) + "%";}

    getPollPrimVote(ClickonPoll,PollBarFirstPref.data);
    PollBarFirstPref.update()
    
    SelectedPoll = ClickonPoll
    SelectedPollPos = points[0].index
  }
  catch{
    console.log("Error; Please click on a Poll data point")
  }
}



function getPollPrimVote(RawDataEntry,Data){
  var postionInArray = 0
  RawDataEntry.forEach((element,index) => {
      PartyID = RawDataHeaderID[index]
      if (PartyID != "N/A"){
        eval("SetPartyName = PartyNameArray." + PartyID)
        if (SetPartyName != undefined){
          eval("PartyColored = PartyColor."+ PartyID)
          Data.datasets[postionInArray] = {
            label: SetPartyName,
            data: [element],
            backgroundColor: PartyColored
          }
          postionInArray = postionInArray + 1
        }
        else{
          console.log("Couldn't find Party with ID " + PartyID)
        }
      }  
  })
  while(Data.datasets.length > postionInArray){
    Data.datasets.pop();
  }
  console.log(Data)
  return Data;
}


function RenderParliment(){
  document.getElementById("disclaimertext").innerText = "\nThanks for tying this, unforutnatly my ass yet to get this to work so uhh; will be done eventually"

}
