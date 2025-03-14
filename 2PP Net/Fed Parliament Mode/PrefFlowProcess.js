History = document.getElementById("PrefHistory")

function PrefrenceFlows(InputArray,PrefTable,DivisonID){
  History.innerText = ""

  PrefrencesAllocating = true;
  Count = 0
  while(PrefrencesAllocating){

    MinValue = 100;
    MinLocation = -1
    CurrentList = []
    for (x = 0; x < InputArray.data.length; x++){
      if (parseFloat(InputArray.data[x]).toFixed(2) >= 50){

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
        eval("ElimCandidate = PrefFlows2022House."+ InputArray.ID[MinLocation])
    }
    if(ElimCandidate == undefined){
      ElimCandidate = PrefFlows2022House.Oth
    }
    Total = 0;
    FlowArray = []
    HoverText = ""
    for (x = 0; x < CurrentList.length; x++){ 
      eval("Flow = ElimCandidate." + InputArray.ID[CurrentList[x]])
      if (Flow != undefined && x != MinLocation){
        Total = Total + Flow
        FlowArray.push(Flow)
      }
      else FlowArray.push(0) //Maybe change this to grab average value? 
    }
    for (x = 0; x < FlowArray.length; x++){
      PercentageofVote = FlowArray[x]/Total
      VoteGone = parseFloat(PercentageofVote*MinValue) 
      InputArray.data[x] = parseFloat(InputArray.data[x]) + VoteGone;
      if(VoteGone != 0){
        HoverText = HoverText + (PercentageofVote*100).toFixed(1)  + "% of (" + VoteGone.toFixed(2) + " added) goes to <abr data-tooltip='Current Total:"+ InputArray.data[x].toFixed(2)+"%'><b style='color:" + InputArray.color[x] + "'>" + InputArray.label[x]  + "</b></abr><br>" 
      } 
    }
    Amount = InputArray.data.splice(MinLocation,1)
    IDElim = InputArray.ID.splice(MinLocation,1)
    ColorElim = InputArray.color.splice(MinLocation,1)
    NameElim = InputArray.label.splice(MinLocation,1)
    Count = Count + 1
    //Kind of a hackey way to deal with negative values in swings but whatever
    //Just don't show distribution of votes if negative, but will still take away votes when negative.
    //Kinda silly but it works
    if(Amount[0] > 0){
      History.innerHTML = History.innerHTML + Count + "} <b> Eliminated: </b> <b style='color:"+ColorElim+"'>" + NameElim + "</b> with <i>" + Amount[0].toFixed(2) + "%</i> of votes <footer><small>" + HoverText + "</small></footer>"
    }
  }
  return InputArray

}

function SimulatePrefChart(seat,SeatWin){
  if (CustomSwing){
    FinalWinData = PrefrenceFlows(CalcSeatSwing(Swing,DataYear + "." + seat),DivisonPrefrences2022House,seat)
  }
  else{
  FinalWinData = PrefrenceFlows(CalculateSeatPrim(
      RawData[SelectedPollPos],
      RawData[RawData.length-1],
      seat),DivisonPrefrences2022House,seat)
  }
  ArrayToChartJS(FinalWinData,FinalPredictPref.data)
  WinnerNum = getHighestValue(FinalWinData.data)
  SeatWin = FinalWinData.label[WinnerNum]
  WinnerElement = document.getElementById("Winner")
  WinnerElement.innerText = FinalWinData.label[WinnerNum]
  WinnerElement.style.backgroundColor = FinalWinData.color[WinnerNum]

  FinalPredictPref.update()
  return FinalWinData.ID[WinnerNum]
}


function getHighestValue(arr){
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (parseFloat(arr[i]) > parseFloat(max)) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}
