function clearPage() {
    let ClearedRows = '<div id="PartyRow1" class="PartyRow"></div><div id="PartyRow2" class="PartyRow"></div><div id="PartyRow3" class="PartyRow"> </div>'
    document.getElementById("BoxesContainer").innerHTML = ClearedRows;
};

function LockCheck() {
    // Get the checkbox
    var checkBox = document.getElementById("CheckBox");

    // If the checkbox is checked, display the output text
    if (checkBox.checked == true) {
        CountLock = 1;
    } else {
        CountLock = 0;
    }
    pullPagePartyCount();
} 

function LockToggle() {
    CountLock = !CountLock;
    if (CountLock) {
        if (Seat) { SeatCount = lockAndAdjustArray(SeatCount, -1, Max) }
        else { PartyData = lockAndAdjustArray(PartyData, -1, Max); }
        console.log("Gothere!");
        PushPageValues();
        ChartUpdate();
    };
}

function setSmoothData() {
    SmoothData.data.lables = PrtyLabels;
    SmoothData.data.datasets[0].data = PartyData;
    SmoothData.data.datasets[0].backgroundColor = colors;
};

function setSeatData() {
    HighChartsData.series[0].data = generateParlimentdata(colors, PrtyLabels, SeatCount, PartyCount);
}

function createPage() {
    var BoxCount = 0;
    Row = 1;
    for (var i = 0; i < PartyCount; i++) {

        if (BoxCount > 4) {
            BoxCount = 0;
            Row = Row + 1;
        }
        addBox(Row,i)
        BoxCount = BoxCount + 1;
    }
    var ChangeVar = document.getElementsByClassName("Update")
    for (var i = 0; i < ChangeVar.length; i++) {
        ChangeVar[i].addEventListener("change", pullPagePartyCount);
    }
};

function addBox(row, i) {
    let PollBox = '<div class="col-md-1"><input type="text" id="'
        + i + 'Party" class="Update Name" /></div><div class="col-md-1"><input type="number" min="0" id="'
        + i + 'Label" class="Count Update" /></div><div class="col-md-1"><input type="color" id="'
        + i + 'PartyColor" class="Update Color"/><input type="checkbox" id="'
        + i + 'Checkbox" class="Update checkbox"></div>'
    document.getElementById("PartyRow" + Row).innerHTML += PollBox;
}

function grabPolling() {
    for (var i = 0; i < PollingData.length; i++) {
        let RowHTML = '<tr class="PollRow" onClick="clickPoll(this.id)" id=Polling_' + i + '> <td class="Date"> ' + PollingData[i].Date + '</td > <td class="Company">' + PollingData[i].Company + '</td> <td class="Level">' + PollingData[i].Level + '</td> </tr>'
        document.getElementById("pollingData").innerHTML += RowHTML;
    };
}

function ArraySum(SumArray) {
    var Returnvalue = SumArray.reduce((partialSum, a) => partialSum + a, 0);
    return Returnvalue;
};

// Function to handle chart click
function handleChartClick(event, elements) {
    if (elements.length > 0) {
        // Get the index of the clicked element
        var clickedIndex = elements[0].index;
        var remove = false;
        for (var i = 0; i < Selected.length; i++) {
            if (Selected[i] == clickedIndex) {
                arrayFilter = Selected.filter(function (letter) {
                    return letter !== clickedIndex;
                })
                Selected = arrayFilter
                remove = true;
                clear();
                break;
            }
        }

        if (!remove) {
            Selected.push(clickedIndex)
            // Get the label or any other information you need from the clicked element
            var clickedLabel = PrtyLabels[clickedIndex];
            addElementToList(clickedLabel);
        }
        else {
            Selected.forEach(Value => {
                var Label = PrtyLabels[Value];
                addElementToList(Label);
            });
        }
    }
    ChartUpdate();
}

function addElementToList(element) {
    var list = document.getElementById('elementList');
    var listItem = document.createElement('li');
    listItem.textContent = element;
    list.appendChild(listItem);
}

function generateParlimentdata(colors,labels,data,count) {
    var returndata = [];
    for (var i = 0; i < count; i++) {
        returndata[i] = [labels[i], data[i], colors[i]]
    }
    return returndata;
}


function totalCalculator(data, count) {
    var returndata = 0;
    for (var i = 0; i < count; i++) {
        returndata = + data[i];
    };
    return returndata
};

function clickPoll(PollId) {
    var PollNumber = PollId.split('_')[1];
    PartyData = PollingData[PollNumber].PartyData;
    PrtyLabels = PollingData[PollNumber].PartyLabels;
    colors = PollingData[PollNumber].PartyColor;
    Type = PollingData[PollNumber].Level;
    PartyCount = PollingData[PollNumber].Count;
    SeatCount = PollingData[PollNumber].SeatProj;
    SeatMajority = PollingData[PollNumber].SeatMajor;
    SeatMax = PollingData[PollNumber].SeatMax;
    TotalPrim = ArraySum(PollingData[0].PartyData);
    TotalSeat = ArraySum(PollingData[0].SeatProj);
    clearPage();
    createPage();
    PushPageValues();
    ChartUpdate();
};

//Function returns 0 if fine, if not returns number of seats difference between Current count and Count max
function CountCheck() {
    if (CountLock) {
        var Count = 0;
        if (Seat) {
            Count = ArraySum(SeatCount);
        }
        else {
            Count = ArraySum(PartyData);
        };
        return Count - Max;
    };
    return 0;
}

function pullPagePartyCount() {
    var lockvalue = -1;
    for (var i = 0; i < PartyCount; i++) {
        var ID = i + "Label";
        var TempVariable = 0;
        var Count = 0;
        if (Seat) {
            TempVariable = Number(document.getElementById(ID).value)
            Count = SeatCount[i];
        }
        else {
            TempVariable = Number(document.getElementById(ID).value);
            Count = PartyData[i];
        };
        if (TempVariable != Count) { lockvalue = i; }
        if (Seat) { SeatCount[i] = TempVariable; }
        else { PartyData[i] = TempVariable; }
    };
    for (var i = 0; i < PrtyLabels.length; i++) {
        ID = i + "Party";
        IDColor = i + "PartyColor";
        PrtyLabels[i] = document.getElementById(ID).value;
        colors[i] = document.getElementById(IDColor).value;
    }
    if (lockvalue != - 1 && CountLock) {
        if (Seat) { SeatCount = lockAndAdjustArray(SeatCount, lockvalue, Max) }
        else { PartyData = lockAndAdjustArray(PartyData, lockvalue, Max); }
        PushPageValues();
    };
    ChartUpdate();
};

function lockAndAdjustArray(arr, i, targetSum) {
    if ( i >= arr.length) {
        throw new Error("Index out of bounds");
    }
    // Calculate the sum of the array excluding the locked value
    SumOfArray = ArraySum(arr);
    var LeftOverCount = (SumOfArray - targetSum);

    // Adjust the array values except the locked value
    var loopcount = 0;
    var num = 0;
    if (LeftOverCount < 0) {
        num = 1;
    }
    else {
        num = -1;
    }
    for (var j = 0; LeftOverCount != 0;) {
        loopcount++;
        if (j !== i && arr[j] != 0) {
            arr[j] += num
            LeftOverCount += num;
        }
        if (loopcount > 200) {
            console.log("too many loops, breaking")
            console.log(j);
            console.log(LeftOverCount);
            console.log(arr.length);
            break;
        }
        if (j >= PartyCount-1) {
            j = 0;
        }
        else {
            j++;
        }
    }
    // Adjust for floating-point errors
    console.log(ArraySum(arr));
    return arr;
}

function MajortiyCheck(PartyIDs, MajorityNumber) {
    var count = 0;
    PartyIDs.forEach(Party => {
        count += PartyData[Party];
    })
    document.getElementById("CurrentValue").innerText = count;
    if (MajorityNumber < count) {
        return true;
    }
    else {
        return false;
    }
}

function buttonClear() {
    Selected = [];
    clear();
    ChartUpdate();
}

function clear() {
    var list = document.getElementById('elementList');
    list.innerHTML = "";
}

function ChartUpdate() {
    if (Seat) {
        var Majority = SeatMajority;
        ParlimentData = generateParlimentdata(colors, PrtyLabels, SeatCount, PartyCount);
        HighChartsData.series[0].data = ParlimentData;
        SeatChart.series[0].update({ data: ParlimentData }, true);
    }
    else {
        var Majority = 50;
        SmoothChart.data.datasets[0].data = PartyData;
        SmoothChart.data.labels = PrtyLabels;
        SmoothChart.data.datasets[0].backgroundColor = colors;
        SmoothChart.update();
    }
    UpdateRightChartInfo()
}

function UpdateRightChartInfo() {
    if (Seat) { document.getElementById("Threshold").innerText = SeatMajority }
    else { document.getElementById("Threshold").innerText = 50 }
    document.getElementById("Majority").innerText = MajortiyCheck(Selected, Majority);
    document.getElementById("Type").innerText = Type;
    document.getElementById("elementList").innerHTML = "";
    document.getElementById("MaxCount").innerText = Max;
}

function PushPageValues() {
    UpdateRightChartInfo();

    var Count = document.getElementsByClassName("Count");
    for (var i = 0; i < Count.length; i++) {
        if (Seat) {
            Count[i].value = SeatCount[i];
        }
        else {
            Count[i].value = PartyData[i];
        }
    }
    var Name = document.getElementsByClassName("Name");
    for (var i = 0; i < Name.length; i++) {
        Name[i].value = PrtyLabels[i];
    }
    var LSColors = document.getElementsByClassName("Color");
    for (var i = 0; i < LSColors.length; i++) {
        LSColors[i].value = colors[i];
    }

    Selected = [];
    document.getElementById("CurrentValue").innerHTML = 0;
}

function addParty(Name, Count, Colour) {
    PrtyLabels.push(Name);
    PartyData.push(Count);
    colors.push(Colour);
    pullPagePartyCount();
}

function ChangeAll(Labels, Counts, Colours) {
    PrtyLabels = Labels;
    PartyData = Counts;
    colors = Colours;
    PushPageValues();
}

function PlusButton(ElementID) {
    addParty("", 0, "#FFFFF");
    };

function RenderChart() {
    if (Seat) {
        Max = SeatMax;
        SmoothChart.destroy();
        setSeatData();
        document.getElementById("ChartID").innerHTML = '<figure class="highcharts-figure"><div id="container"></div></figure>';
        SeatChart = Highcharts.chart('container', HighChartsData);
    }
    else {
        Max = 100;
        setSmoothData();
        document.getElementById("ChartID").innerHTML = '<canvas style="width:50%" id="SmoothCircle"></canvas > '
        SmoothChart = new Chart(document.getElementById('SmoothCircle'), SmoothData);
    };
    UpdateRightChartInfo()
    PushPageValues();
}
function ChangeMode() {
    Seat = !Seat;
    RenderChart();
}