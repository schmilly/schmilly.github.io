SmoothCircle.onclick = PollClick; 

function PollClick(click) {
  //console.log(click)
  points = ""
  try {
    points = mixedChart.getElementsAtEventForMode(click, 'nearest'
      , { intersect: true }, false)
    if (points[0].datasetIndex != 0) { throw new Error("Click on undefined average 2PP") }
  }
  catch {
    ConsoleLog.innerHTML = (ConsoleLog.innerHTML + "<br> <b style='color:red'>Error:</b> Please click on a Poll data point")
    return
  }
  ClickonPoll = RawData[points[0].index];
  PollSelected(ClickonPoll);
}

function PollSelected(ClickonPoll){
  PartyPref = ClickonPoll[11] - ClickonPoll[12]
  document.getElementById("SelectPollDate").innerText = ClickonPoll[0]
  document.getElementById("PllPollster").innerText = ClickonPoll[1]
  //document.getElementById("PllPrimaryVote").innerText = ClickonPoll[2]
  if (TwoPPBool) {
    document.getElementById("Pll2PP").innerText = points[0].element.$context.raw.y.toFixed(2) + "%";
  }
  else { document.getElementById("Pll2PP").innerText = PartyPref.toFixed(2) + "%"; }

  getPollPrimVote(ClickonPoll, PollBarFirstPref.data);
  PollBarFirstPref.update()

  SelectedPoll = ClickonPoll
  SelectedPollPos = points[0].index
  UpdatePollBar()

  Swing = DefineSwing(SelectedPoll,RawData[RawData.length-1])
  UpdateSwingTable(Swing)
}

function UpdateSwingTable(SwingList){
  SwingSum = 0
  for (const [key, value] of Object.entries(SwingList)) {
    document.getElementById(key + "Swing").childNodes[0].value = value.toFixed(2)
  } 
  UpdateSwingTotal(SwingList)
}

function UpdateSwingTotal(SwingList){
  SwingSum = 0;
  for (const [key, value] of Object.entries(SwingList)) {
    SwingSum = SwingSum + value
  }
  docSwingSum = document.getElementById("SwingSum")
  docSwingSum.innerText = SwingSum.toFixed(2);
  if (SwingSum.toFixed(2) != 0){
    docSwingSum.className = "invalid"
  } 
  else{
    docSwingSum.className = "valid"
  }
}

function getPollPrimVote(RawDataEntry,Data){
  var positionInArray = 0
  RawDataEntry.forEach((element,index) => {
      PartyID = RawDataHeaderID[index]
      if (PartyID != "N/A"){
        eval("SetPartyName = PartyNameArray." + PartyID)
        if (SetPartyName != undefined){
          eval("PartyColored = PartyColor."+ PartyID)
          Data.datasets[positionInArray] = {
            label: SetPartyName,
            data: [element],
            backgroundColor: PartyColored
          }
          positionInArray = positionInArray + 1
        }
        else{
          ConsoleLog.innerHTML = (ConsoleLog.innerHTML + "<br>Couldn't find Party with ID " + PartyID)
        }
      }  
  })
  while(Data.datasets.length > positionInArray){
    Data.datasets.pop();
  }
  //console.log(Data)
  return Data;
}


function DefineSwing(Poll,BaseLine){
  Scaler = Sum(Poll.slice(4,10))/100
  //Variable to scale based on undecided votes, fill in blanks essentially
  return Swing = { 
    "ALP":Poll[Location.ALP]/Scaler - BaseLine[Location.ALP],
    "LaP":Poll[Location.LaP]/Scaler - BaseLine[Location.LaP],
    "Grn":Poll[Location.Grn]/Scaler - BaseLine[Location.Grn],
    "One":Poll[Location.One]/Scaler - BaseLine[Location.One],
    "UAP":Poll[Location.UAP]/Scaler - BaseLine[Location.UAP],
    "Oth":Poll[Location.Oth]/Scaler - BaseLine[Location.Oth]
  }
}

function CalculateSeatPrim(Poll,BaseLine,ElcID){
  DefineSwing(Poll,BaseLine)

  return CalcSeatSwing(Swing,DataYear + "." + ElcID);
}

function CalcSeatSwing(Swing,ElcID) {
    OutputArray = {
    "label":[],
    "data":[],
    "color":[],
    "ID":[],
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
  SeatPrim = new Array();
  eval("SeatPrim = FirstPref." + ElcID)
  var othervote = 0.00;
  var positionInArray = 0
  OtherCount = 1;
  LibNatCount = 0;
  Total = 0;
  ContainsOther = false

  Object.entries(SeatPrim).forEach((element) => {
    PartyID = element[0]
    eval("SwingID = PollIDConvert." + element[0])

    if (SwingID != undefined) {
      eval("Vote." + SwingID + " = Vote." + SwingID + " + element[1]")
      //console.log(SwingID + " : " + Vote.Oth)
    }
    else {
      //ConsoleLog.innerHTML = (ConsoleLog.innerHTML + "<br>Couldn't find Party with ID " + element[0])
      //ConsoleLog.innerHTML = (ConsoleLog.innerHTML + "<br>Adding votes of "+ element[1] +  " to other vote")
      Vote.Oth = Vote.Oth + element[1]
    }

    if (SwingID == undefined || SwingID == "Oth") {
      OtherCount = OtherCount + 1
    }
    else if (SwingID == "LaP") {
      LibNatCount = LibNatCount + 1
    }
  })

  KeyIDs = Object.keys(Vote)
  VoteIDs = Object.keys(SeatPrim)
  for (i = 0; i < KeyIDs.length; i = i + 1) {
    InPrimVote = false
    for (x = 0; x < VoteIDs.length; x = x + 1) {
      eval("CheckID = PollIDConvert." + VoteIDs[x])
      if (KeyIDs[i] == CheckID) {
        InPrimVote = true
        break;
      }
    }
  }




  Object.keys(SeatPrim).forEach((PartyID) => {
    OtherPos = 0
    eval("SetPartyName = PartyNameArray." + PartyID)
    eval("SwingID = PollIDConvert." + PartyID)
    if (SwingID == undefined) {
      SwingID = "Oth"
    }
    eval("PartyColored = PartyColor." + PartyID)
    eval("SetPartyName = PartyNameArray." + PartyID)
    if (SwingID == "Oth") {
      eval("PartySwing = (Swing." + SwingID + ")/OtherCount")
      OtherPost = OtherPos + 1
    }
    else if (SwingID == "LaP")
      eval("PartySwing = (Swing." + SwingID + ")/LibNatCount")
    else
      eval("PartySwing = Swing." + SwingID)
    eval("PartyVote = SeatPrim." + PartyID)

    NewPrim = PartyVote + PartySwing
    SwingOth = Swing.Oth
    FinalVote = NewPrim
    if (FinalVote < 0) {
      SwingOth = SwingOth + FinalVote * (OtherCount / (OtherCount - OtherPos))
      //Scale based on number of other or other count so can properly apply
      FinalVote = 0
    }
    else if (SetPartyName == undefined) {
      SetPartyName = PartyID
      PartyColored = PartyColor.Oth
      SwingID = "Oth"
    }
    if (FinalVote > 0 && SwingID == "Oth") {
      Vote.Oth = Vote.Oth - PartyVote
    }
    if (FinalVote != 0) {
      if (PartyColored == undefined) {
        PartyColored = PartyColor.Oth
      }
      OutputArray.label[positionInArray] = SetPartyName;
      OutputArray.data[positionInArray] = FinalVote
      OutputArray.color[positionInArray] = PartyColored
      OutputArray.ID[positionInArray] = PartyID
    }
    Total = Total + FinalVote
    VoteSwing.push(FinalVote)
    positionInArray = positionInArray + 1
  })

  OtherVote = Vote.Oth + SwingOth / OtherCount
  if (OtherVote < 0) {
    OtherVote = OtherVote * -1
  }


  OutputArray.label[positionInArray] = PartyNameArray.Oth;
  OutputArray.data[positionInArray] = OtherVote
  OutputArray.color[positionInArray] = PartyColor.Oth
  OutputArray.ID[positionInArray] = "Oth"
  Total = Total + OtherVote
  positionInArray = positionInArray + 1

  if (Total.toFixed(1) != 100) {
    ConsoleLog.innerHTML = (ConsoleLog.innerHTML + "<br> <b> Error; </b> Values do not add up to 100: " + VoteSwing)
    ConsoleLog.innerHTML = (ConsoleLog.innerHTML + "<br>Other should be estimated to be:" + (100 - Sum(VoteSwing)))
    ConsoleLog.innerHTML = (ConsoleLog.innerHTML + "<br>Other sum is:" + OtherVote)
    ConsoleLog.innerHTML = (ConsoleLog.innerHTML + "<br>Sums to:" + Total)
    ConsoleLog.innerHTML = (ConsoleLog.innerHTML + "<br>Changing Value to Match")
    OutputArray.data[positionInArray - 1] = OtherVote + (100 - Sum(VoteSwing))
  }

  return OutputArray;
}

function ArrayToChartJS(InputArray, Data) {
  ArrayLength = InputArray.label.length
  OtherVote = 0;
  EntryCount = 0;
  for (x = 0; x < InputArray.label.length; x++) {
    if (InputArray.data[x] == undefined) {
      continue
    }
    if (InputArray.data[x] < 2 && InputArray.ID[x] != "Oth") {
      OtherVote = OtherVote + parseFloat(InputArray.data[x])
    }
    else {
      if (InputArray.ID[x] == "Oth") {
        InputArray.data[x] = parseFloat(InputArray.data[x]) + parseFloat(OtherVote)
        OtherVote = 0;
      }
      Data.datasets[EntryCount] = {
        label: InputArray.label[x],
        data: [InputArray.data[x].toFixed(2)],
        backgroundColor: InputArray.color[x]
      }
      EntryCount++
    }
  }
  if (OtherVote != 0) {
    Data.datasets[EntryCount] = {
      label: PartyNameArray.Oth,
      data: OtherVote.toFixed(2),
      backgroundColor: PartyColor.Oth
    }
    EntryCount++;
    OtherVote = 0;
  }

  while (Data.datasets.length > EntryCount) {
    Data.datasets.pop();
  }

  return Data
}

function Sum(Array) {
  SumValue = 0
  Array.forEach(element => {
    SumValue = Number(SumValue) + Number(element)
  });
  return SumValue
}


