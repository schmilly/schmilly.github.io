
const Array_Greens = []

Array_2022.forEach((Value,index) => {
    console.log(RawData[index]);
    console.log(Number(RawData[index][6])/100);
    console.log(index)
    Array_2022[index]= [Value[0],Number(Net2PP)]
    Array_Greens[index] = [Value[0],Number(RawData[index][6])/100]
}
);


