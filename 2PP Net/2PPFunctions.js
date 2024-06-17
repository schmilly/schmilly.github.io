
// Y = days since election
// X = 2PP +/-

function createDataSets(pairArray, label) {
    var Color = SelectColor(label);
    //pairArray.sort(sortFunction);
    const dataSet = {
        type: 'bubble',
        label: label + " (Day, Net 2PP %)",
        data: [],
        pointRadius: 2,
        backgroundColor: Color,
    };

    for (let i = 0; i < pairArray.length; i ++) {
        
            var pair = {
                x: pairArray[i][0],
                y: Math.round(pairArray[i][1]*100*10)/10
            };
            dataSet.data.push(pair);
    }

    return dataSet;
};
function SelectColor(label){
    if (Number.isInteger(Number(label))) {
      return Colors[label];
    }
    else{
      return "#01aaff"
    }

}
function createMean(pairsArray, label,Color) {
    if (!Color){
      var Color = SelectColor(label);
    }
    pairsArray.sort(sortFunction);
    const returnData = {
        type: 'line',
        label: label + " Term Rolling Average",
        data: [],
        tension: 0.1,

        pointRadius: 1,
        borderColor: Color,
        backgroundColor: Color,
        borderCapStyle: "round",
        borderJoinStyle: "round",
        stepped: "middle",
        borderWidth: 2,
        fill: false
    };

    var windowSize = 100;
    var result = [];
    var AverageArr = [];

    for (let i = 0; i < pairsArray.length; i++) {
        if (i+1 >= pairsArray.length+1 && Number(pairsArray[i][0]) == Number(pairsArray[i + 1][0])) {
            continue;
        }
        AverageArr.push(pairsArray[i])
        AverageArr = RemoveUnderValue(AverageArr, pairsArray[i][0], windowSize);
        AverageResult = calculateAverage(AverageArr);

        var PushVal = {
            x: pairsArray[i][0],
            y: Math.round(AverageResult*100*10)/10
        }
        result.push(PushVal);
    }
    returnData.data = result;

    return returnData;
};

function createbar(pairsArray, label,Color){
    pairsArray.sort(sortFunction);
    const returnData = {
        type: 'line',
        label: label + " Contribution to 2PP",
        data: [],
        tension: 0.1,
        skipNull: true,
        pointRadius: 0,
        borderColor: Color,
        backgroundColor: Color,
        borderCapStyle: "round",
        borderJoinStyle: "round",
        stepped: "middle",
        borderWidth: 2,
    };

    var windowSize = 100;
    var result = [];
    var AverageArr = [];

    for (let i = 0; i < pairsArray.length; i++) {
        if (i+1 >= pairsArray.length+1 && Number(pairsArray[i][0]) == Number(pairsArray[i + 1][0])) {
            continue;
        }
        AverageArr.push(pairsArray[i])
        AverageArr = RemoveUnderValue(AverageArr, pairsArray[i][0], windowSize);
        AverageResult = calculateAverage(AverageArr);

        var PushVal = {
            x: pairsArray[i][0],
            y: Math.round(AverageResult*100*10)/10
        }
        result.push(PushVal);
    }
    returnData.data = result;

    return returnData;

}

function sortFunction(a, b) {
    if (Number(a[0]) === Number(b[0])) {
        return 0;
    }
    else {
        return (Number(a[0]) < Number(b[0])) ? -1 : 1;
    }
}

function calculateAverage(data) {
    // Initialize sum
    let sum = 0;
    // Iterate through each pair in the data
    for (let i = 0; i < data.length; i++) {
        // Parse the second part of the pair to a float and add to sum
        sum += Number(data[i][1]);
    }
    // Calculate and return the average
    returnValue = sum / data.length;
    return returnValue;
}

function RemoveUnderValue(AverageArr, currentValue, windowsize) {
    if (currentValue < windowsize) {
        return AverageArr;
    }
    if (AverageArr[0][0] < (currentValue - (windowsize))) {
        AverageArr.shift();
        AverageArr = RemoveUnderValue(AverageArr, currentValue, windowsize);
    }
    return AverageArr;
}

function generateChartData(Dataset, Filelist) {
    ArrayName = ""
    Filelist.forEach(Value => {
        Dataset.push(createDataSets(eval("Array_" + Value), Value));
        Dataset.push(createMean(eval("Array_" + Value), Value ));
    });

}
