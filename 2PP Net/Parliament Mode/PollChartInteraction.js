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
  //console.log(Data)
  return Data;
}


function RenderParliment(){
  document.getElementById("disclaimertext").innerText = "\nThanks for tying this, unforutnatly my ass yet to get this to work so uhh; will be done eventually"
}

function CalculateSeatPrim(Poll,BaseLine,ElcID,Data){
  Scaler =  1+Poll[Location.Undecide]/100 
    //Variable to scale based on undecided votes, fill in blanks essentially
  Swing = { 
    "ALP":Poll[Location.ALP]*Scaler - BaseLine[Location.ALP],
    "LaP":Poll[Location.LaP]*Scaler - BaseLine[Location.LaP],
    "Grn":Poll[Location.Grn]*Scaler - BaseLine[Location.Grn],
    "One":Poll[Location.One]*Scaler - BaseLine[Location.One],
    "UAP":Poll[Location.UAP]*Scaler - BaseLine[Location.UAP],
    "Oth":Poll[Location.Oth]*Scaler - BaseLine[Location.Oth]
  }
  Vote = {
    "ALP":0.00,
    "LaP":0.00,
    "Grn":0.00,
    "One":0.00,
    "UAP":0.00,
    "Oth":0.00
  }
  VoteSwing = []
  eval("SeatPrim = FirstPref." + ElcID)
  var othervote = 0.00;
  var postionInArray = 0
  Object.entries(SeatPrim).forEach((element) => {
    eval("PartyID = PollIDConvert." + element[0])
    if (PartyID != undefined){ 
      eval("Vote." + PartyID  + " = Vote." + PartyID +" + element[1]")
      //console.log(PartyID + " : " + Vote.Oth)
    }
    else{
      //console.log("Couldn't find Party with ID " + element[0])
      //console.log("Adding votes of "+ element[1] +  " to other vote")
      Vote.Oth = Vote.Oth + element[1]
    }
  });
  PollList.forEach((PartyID)=> {
    eval("PartyColored = PartyColor."+ PartyID)
    eval("SetPartyName = PartyNameArray."+ PartyID)
    eval("PartySwing = Swing." + PartyID)
    eval("PartyVote = Vote."+ PartyID)
    NewPrim = PartyVote + PartySwing
    FinalVote = NewPrim
    if (FinalVote < 0){
      Swing.Oth = Swing.Oth + FinalVote
      FinalVote = 0
    }
    Data.datasets[postionInArray] = {
      label: SetPartyName,
      data: [FinalVote.toFixed(1)],
      backgroundColor: PartyColored
    }
    VoteSwing.push(FinalVote)
    postionInArray = postionInArray + 1
  })
  while(Data.datasets.length > postionInArray){
    Data.datasets.pop();
  } 
  if (Math.round(Sum(VoteSwing)) != 100){
    console.log("Error; Values do not add up to 100: " + VoteSwing) 
    console.log("Sums to:" + Sum(VoteSwing))
  }
  return Data;
}


function Sum(Array){
  SumValue = 0
  Array.forEach(element => {
    SumValue = Number(SumValue) + Number(element)
  });
  return SumValue
}
