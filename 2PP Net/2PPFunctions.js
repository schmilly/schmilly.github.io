
// Y = days since election
// X = 2PP +/-

function createDataSets(pairArray, label) {
    pairArray.sort(sortFunction);
    const dataSet = {
        type: 'bubble',
        label: label,
        data: [],
        pointRadius: 2
    };

    for (let i = 0; i < pairArray.length; i ++) {
        
            var pair = {
                x: pairArray[i][0],
                y: pairArray[i][1]
            };
            dataSet.data.push(pair);
    }

    return dataSet;
}

function createMean(pairsArray, label) {
    pairsArray.sort(sortFunction);
    const returnData = {
        type: 'line',
        label: label,
        data: [],
        tension: 1,
        pointRadius: 1,
    };

    var windowSize = 100;
    var result = [];
    var AverageArr = [];

    for (let i = 0; i < pairsArray.length; i++) {
        if (i+1 >= pairsArray.length+1 && pairsArray[i][0] == pairsArray[i + 1][0]) {
            continue;
        }
        AverageArr.push(pairsArray[i])
        AverageArr = RemoveUnderValue(AverageArr, pairsArray[i][0], windowSize);
        AverageResult = calculateAverage(AverageArr);
        var PushVal = {
            x: pairsArray[i][0],
            y: AverageResult
        }
        result.push(PushVal);
    }

    returnData.data = result;

    return returnData;
};

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
        Dataset.push(createMean(eval("Array_" + Value), Value + " Rolling Average"));
    });

}