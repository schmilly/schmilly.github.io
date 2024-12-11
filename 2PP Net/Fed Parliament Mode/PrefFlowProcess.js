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
      if (parseFloat(InputArray.data[x]).toFixed(0) >= 50){

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
      if (InputArray.ID[MinLocation] == "ALP"){
        ElimCandidate = {
          "Ind":0.5, "Grn": 0.75, "Lib": 0.25, "LNP": 0.25, "Nat":0.25, "CLP":0.25
        }
      }
      else{
        //Put Code here to find based on backup pref table, and defined elim candidate that way
        ElimCandidate = {
          "Lib": 0.5, "ALP": 0.5, "LNP": 0.5, "Nat":0.5, "CLP":0.5, "Ind":0.5, "Grn": 0.5
        }}
      //Tempt solution; Divide up equally between Lib+Nat and Labor
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
        HoverText = HoverText + "|" + (PercentageofVote*100).toFixed(1)  + "% (" + VoteGone.toFixed(2) + ") added to " + InputArray.label[x]   
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
      History.innerHTML = History.innerHTML+"<br>" + Count + "} <b> Eliminated: </b> <b style='color:"+ColorElim+"'>" + NameElim + "</b> with <abr data-tooltip='"+ HoverText  +"' data-placement='left'>" + Amount[0].toFixed(2) + "</abr> % of votes"
    }
  }
  return InputArray

}

function SimulatePrefChart(seat,SeatWin){
  FinalWinData = PrefrenceFlows(CalculateSeatPrim(
      RawData[SelectedPollPos],
      RawData[RawData.length-1],
      seat),DivisonPrefrences2022House,seat)
  ArrayToChartJS(FinalWinData,FinalPredictPref.data)
  WinnerNum = getHighestValue(FinalWinData.data)
  SeatWin = FinalWinData.label[WinnerNum]
  document.getElementById("Winner").innerText = FinalWinData.label[WinnerNum]
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
