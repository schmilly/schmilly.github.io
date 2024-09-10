function PrefrenceFlows(InputArray,PrefTable,DivisonID){

  VoteWinner = ""
  PrefrencesAllocating = true;

  while(PrefrencesAllocating){
    MinValue = 100;
    MinLocation = -1
    CurrentList = []
    for (x = 0; x < InputArray.data.length; x++){
      if (InputArray.data[x] > 50){
        VoterWinner = InputArray.ID[x]
        PrefrencesAllocating = false;
        break;
      }
      else{
        CurrentList.push(x)
        if(InputArray.data[x] < MinValue){
          MinValue = InputArray.data[x]
          MinLocation = x
        }

      }
    };
    if(!PrefrencesAllocating){
      break
    }
    eval("ElimCandidate = PrefTable." + DivisonID + "." + InputArray.ID[MinLocation])
    if (ElimCandidate == undefined){
      //Put Code here to find based on backup pref table, and defined elim candidate that way
      ElimCandidate = {
        "LP": 0.5, "ALP": 0.5
      }
    }
    Total = 0;
    FlowArray = []
    for (x = 0; x < CurrentList.length; x++){
      eval("Flow = ElimCandidate." + InputArray.ID[CurrentList[x]])
      if (Flow != undefined){
        Total = Total + Flow
        FlowArray.push(Flow)
      }
      else FlowArray.push(0) //Maybe change this to grab average value?
    }
    for (x = 0; x < FlowArray.length; x++){
      InputArray.data[x] = parseFloat(InputArray.data[x]) + parseFloat(((FlowArray[x]/Total)*MinValue));
    }
    Amount = InputArray.data.splice(MinLocation,1)
    IDElim = InputArray.ID.splice(MinLocation,1)
    ColorElim = InputArray.color.splice(MinLocation,1)
    NameElim = InputArray.label.splice(MinLocation,1)

  }
  return InputArray

}

function SimulatePrefChart(){
  FinalWinData = PrefrenceFlows(CalculateSeatPrim(
      RawData[SelectedPollPos],
      RawData[RawData.length-1],
      selected),DivisonPrefrences2022House,selected)
  ArrayToChartJS(FinalWinData,FinalPredictPref.data)
  WinnerNum = getHighestValue(FinalWinData.data)
  document.getElementById("Winner").innerText = FinalWinData.label[WinnerNum]
  FinalPredictPref.update()
}


function getHighestValue(Array){
  HighestValue = 0;
  ReturnValue = -1;
  Array.forEach((item, index) => {
    if (item > HighestValue){
      HighestValue = item;
      ReturnValue = index;}
  }) 
  return ReturnValue
}
