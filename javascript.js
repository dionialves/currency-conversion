
const convertFrom = document.getElementById("convertFrom");
const convertTo = document.getElementById("convertTo");
const value = document.getElementById("value");
const buttonConverter = document.getElementById("buttonConverter");
const imgConvertFrom = document.getElementById("imgConvertFrom");
const imgConvertTo = document.getElementById("imgConvertTo");
const textCoinFrom = document.getElementById("textCoinFrom");
const textCoinTo = document.getElementById("textCoinTo");
const valueCoinFrom = document.getElementById("valueCoinFrom");
const valueCoinTo = document.getElementById("valueCoinTo");

let oldValueInSelectFrom = 0;
let oldValueInSelectTo = 1;

// mudar select para texto
//

const coin = {
    dolar: {
        code: "US$",
        name: "Dolar Americano",
        pathImage: "./img/dolar.png",
        languageCode: 'en-US',
        currency: 'USD',
        conversionRate: 1
    },
    real: {
        code: "R$",
        name: "Real Brasileiro",
        pathImage: "./img/real.png",
        languageCode: 'pt-BR',
        currency: 'BRL',
        conversionRate: 4.75
    },
    euro: {
        code: "€",
        name: "Euro",
        pathImage: "./img/euro.png",
        languageCode: 'en-GB',
        currency: 'GBP',
        conversionRate: 0.91
    },
    libra: {
        code: "£",
        name: "Libra Esterlinara",
        pathImage: "./img/libra.png",
        languageCode: 'en-GB',
        currency: 'GBP',
        conversionRate: 0.78
    },
    bitcoin: {
        code: "₿",
        name: "Bitcon",
        pathImage: "./img/bitcoin.png",
        languageCode: 'en-US',
        currency: 'BTC',
        conversionRate: 0.000034
    }
};


const listOfCoins = Object.keys(coin);

const listOfOptions = createListOfCoins(listOfCoins);
const listImage = createListImageOfCoins(listOfCoins);

addOptionsSelect(listOfOptions, convertFrom, 1);
addOptionsSelect(listOfOptions, convertTo, 0);



function createListOfCoins(CoinsInObjects){

    list = [];
    for (let i=0; i < CoinsInObjects.length; i++){
        list.push(coin[CoinsInObjects[i]].code + " " + coin[CoinsInObjects[i]].name)
    };

    return list;
};

function createListImageOfCoins(CoinsInObjects){

    list = [];
    for (let i=0; i < CoinsInObjects.length; i++){
        list.push(coin[CoinsInObjects[i]].pathImage);
    }

    return list;
};

function addOptionsSelect(list, select, initialValue){

    for (let i=0; i < list.length; i++) {
    
        const option = document.createElement('option');
        option.value = i;
        option.text = list[i];
    
        select.appendChild(option);
    };
    select.value = initialValue;
};

function changeValueFrom(){

    if (convertFrom.selectedIndex == convertTo.selectedIndex) {
        invertValuesBetweenFromTo();
    }
    oldValueInSelectFrom = convertFrom.selectedIndex;
    oldValueInSelectTo = convertTo.selectedIndex;
    updateResultConvertion();
};

function changeValueTo(){

    if (convertFrom.selectedIndex == convertTo.selectedIndex) {
        invertValuesBetweenFromTo();
    }
    oldValueInSelectFrom = convertFrom.selectedIndex;
    oldValueInSelectTo = convertTo.selectedIndex;
    updateResultConvertion();
};

function invertValuesBetweenFromTo(){
    convertFrom.selectedIndex = oldValueInSelectTo;
    convertTo.selectedIndex = oldValueInSelectFrom;

    oldValueInSelectFrom = convertFrom.selectedIndex;
    oldValueInSelectTo = convertTo.selectedIndex;
};

function updateResultConvertion(){
    imgConvertFrom.src = listImage[convertFrom.selectedIndex];
    textCoinFrom.textContent = listOfOptions[convertFrom.selectedIndex];
    valueCoinFrom.textContent = coin[listOfCoins[convertFrom.selectedIndex]].code + " 0,00";

    imgConvertTo.src = listImage[convertTo.selectedIndex];
    textCoinTo.textContent = listOfOptions[convertTo.selectedIndex];
    valueCoinTo.textContent = coin[listOfCoins[convertTo.selectedIndex]].code + " 0,00";
};

function convertCoin (){

    result =  coin[listOfCoins[0]].conversionRate / coin[listOfCoins[convertFrom.selectedIndex]].conversionRate;
    result = result.toFixed(2) * coin[listOfCoins[convertTo.selectedIndex]].conversionRate;

    valueCoinFrom.textContent =  new Intl.NumberFormat(coin[listOfCoins[convertFrom.selectedIndex]].languageCode, {
        style: "currency",
        currency: coin[listOfCoins[convertFrom.selectedIndex]].currency
      }).format(value.value);

    valueCoinTo.textContent = new Intl.NumberFormat(coin[listOfCoins[convertTo.selectedIndex]].languageCode, {
        style: "currency",
        currency: coin[listOfCoins[convertTo.selectedIndex]].currency,
        maximumFractionDigits:8,
      }).format(result * value.value)

}

convertFrom.addEventListener('change', changeValueFrom);
convertTo.addEventListener('change', changeValueTo);
buttonConverter.addEventListener('click', convertCoin);