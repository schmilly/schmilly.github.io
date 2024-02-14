function clearPage() {
    let ClearedRows = '<div id="PartyRow1" class="PartyRow"></div><div id="PartyRow2" class="PartyRow"></div><div id="PartyRow3" class="PartyRow"> </div>'
    document.getElementById("BoxesContainer").innerHTML = ClearedRows;
};

function setSmoothData() {
    SmoothData = {
        type: 'doughnut',
        data: {
            labels: PrtyLabels,
            datasets: [{
                label: 'Count',
                data: PartyData,
                borderWidth: 1,
                backgroundColor: colors
            }]
        },
        options: {
            rotation: -90,
            circumference: 180,
            maintainAspectRatio: false,
            onClick: handleChartClick,
        }
    };
};

function setSeatData() {
    ParlimentData = generateParlimentdata(colors, PrtyLabels, SeatCount, PartyCount);
    HighChartsData = {
        chart: {
            type: 'item',
        },
        title: {
            text: 'Distribution of seats'
        },
        series: [{
            name: 'Representatives',
            keys: ['name', 'y', 'color'],
            data: ParlimentData,
            dataLabels: {
                enabled: false,
            },

            // Circular options
            startAngle: -90,
            endAngle: 90
        }],
        plotOptions: {
            series: {
                states: {
                    inactive: {
                        opacity: 1
                    }
                }
            }
        }
    };
}

function createPage() {
    var BoxCount = 0;
    Row = 1;
    for (var i = 0; i < PartyCount; i++) {
        let PollBox = '<div class="col-md-1"><input type="text" id="' + i + 'Party" class="Update Name" /></div><div class="col-md-1"><input type="number" id="' + i + 'Label" class="Count Update" /></div><div class="col-md-1"><input type="color" id="' + i + 'PartyColor" class="Update Color"/><input type="checkbox" id="'+i+'Checkbox" class="Update checkbox"></div>'
        if (BoxCount > 4) {
            BoxCount = 0;
            Row = Row + 1;
        }
        document.getElementById("PartyRow" + Row).innerHTML += PollBox;
        BoxCount = BoxCount + 1;
    }
    var ChangeVar = document.getElementsByClassName("Update")
    RenderChart();
    for (var i = 0; i < ChangeVar.length; i++) {
        ChangeVar[i].addEventListener("change", getPartyCount);
    }
};

function grabPolling() {
    for (var i = 0; i < PollingData.length; i++) {
        let RowHTML = '<tr class="PollRow" onClick="clickPoll(this.id)" id=Polling_' + i + '> <td class="Date"> ' + PollingData[i].Date + '</td > <td class="Company">' + PollingData[i].Company + '</td> <td class="Level">' + PollingData[i].Level + '</td> </tr>'
        document.getElementById("pollingData").innerHTML += RowHTML;
    };
}

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
    clearPage();
    createPage();
    UpdateDisplayValues();
    ChartUpdate();
};

function getPartyCount() {
    for (var i = 0; i < PartyCount; i++) {
        var ID = i + "Label";
        if (Seat) { SeatCount[i] = Number(document.getElementById(ID).value) }
        else { PartyData[i] = Number(document.getElementById(ID).value); };
    }
    for (var i = 0; i < PrtyLabels.length; i++) {
        ID = i + "Party";
        IDColor = i + "PartyColor";
        PrtyLabels[i] = document.getElementById(ID).value;
        colors[i] = document.getElementById(IDColor).value;
    }
    ChartUpdate();
};

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
        setSeatData();
        SeatChart = Highcharts.chart('container', HighChartsData);
    }
    else {
        var Majority = 50;
        SmoothChart.data.datasets[0].data = PartyData;
        SmoothChart.data.labels = PrtyLabels;
        SmoothChart.data.datasets[0].backgroundColor = colors;
        SmoothChart.update();
    }
    document.getElementById("Majority").innerText = MajortiyCheck(Selected, Majority);
}

function UpdateDisplayValues() {

    document.getElementById("Type").innerText = Type;
    document.getElementById("elementList").innerHTML = "";

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
    getPartyCount();
}

function ChangeAll(Labels, Counts, Colours) {
    PrtyLabels = Labels;
    PartyData = Counts;
    colors = Colours;
    UpdateDisplayValues();
}

function PlusButton(ElementID) {
    addParty("", 0, "#FFFFF");
    };

function RenderChart() {
    if (Seat) {
        SmoothChart.destroy();
        setSeatData();
        document.getElementById("ChartID").innerHTML = '<figure class="highcharts-figure"><div id="container"></div></figure>';
        SeatChart = Highcharts.chart('container', HighChartsData);
        document.getElementById("Threshold").innerText = SeatMajority;
    }
    else {
        setSmoothData();
        document.getElementById("ChartID").innerHTML = '<canvas style="width:50%" id="SmoothCircle"></canvas > '
        SmoothChart = new Chart(document.getElementById('SmoothCircle'), SmoothData);
        document.getElementById("Threshold").innerText = 50;
    };
    UpdateDisplayValues();
}
function ChangeMode() {
    Seat = !Seat;
    RenderChart();
}