const convertFrom = document.getElementById("convertFrom");
const convertTo = document.getElementById("convertTo");
const imgConvertFrom = document.getElementById("imgConvertFrom");
const imgConvertTo = document.getElementById("imgConvertTo");
const textCoinFrom = document.getElementById("textCoinFrom");
const textCoinTo = document.getElementById("textCoinTo");
const valueCoinFrom = document.getElementById("valueCoinFrom");
const valueCoinTo = document.getElementById("valueCoinTo");
const buttonConverter = document.getElementById("buttonConverter");


let oldValueInSelectFrom = "real";
let oldValueInSelectTo = "dolar";

// Lista de moedas disponíveis para converção
const coins = {
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
        conversionRate: 0
    },
    euro: {
        code: "€",
        name: "Euro",
        pathImage: "./img/euro.png",
        languageCode: 'en-GB',
        currency: 'EUR',
        conversionRate: 0
    },
    libra: {
        code: "£",
        name: "Libra Esterlinara",
        pathImage: "./img/libra.png",
        languageCode: 'en-GB',
        currency: 'GBP',
        conversionRate: 0
    },
};

const changeValueOnSelect = () => {
    // Verifica se o são diferente, caso sim, altera as informações de 
    // imagem, texto e valor
    // Caso são iguais inverte os valores
    if (convertFrom.value != convertTo.value) {
        imgConvertFrom.src = coins[convertFrom.value].pathImage
        textCoinFrom.textContent = coins[convertFrom.value].name
        //valueCoinFrom.textContent = coins[convertFrom.value].code + " 0,00";

        imgConvertTo.src = coins[convertTo.value].pathImage
        textCoinTo.textContent = coins[convertTo.value].name
        //valueCoinTo.textContent = coins[convertTo.value].code + " 0,00";
    } else {
        convertFrom.value = oldValueInSelectTo;
        convertTo.value = oldValueInSelectFrom;
        changeValueOnSelect()

    }
    // Atualiza as variáveis abaixo com os valores atuais do select.
    // Essas variáveis são usadas como auxiliares
    oldValueInSelectFrom = convertFrom.value;
    oldValueInSelectTo = convertTo.value;

    convertCoin()
};

const convertCoin = async () => {
    code = `${coins[convertFrom.value].currency}${coins[convertTo.value].currency}`
    
    const data = await fetch(
        `https://economia.awesomeapi.com.br/json/last/${coins[convertFrom.value].currency}-${coins[convertTo.value].currency}`
        ).then(response => response.json())

    valueCoinFrom.textContent =  new Intl.NumberFormat(coins[convertFrom.value].languageCode, {
        style: "currency",
        currency: coins[convertFrom.value].currency
      }).format(value.value);

    valueCoinTo.textContent = new Intl.NumberFormat(coins[convertTo.value].languageCode, {
        style: "currency",
        currency: coins[convertTo.value].currency,
        maximumFractionDigits:8,
      }).format(data[code].high * value.value)

}

convertFrom.addEventListener('change', changeValueOnSelect);
convertTo.addEventListener('change', changeValueOnSelect);
buttonConverter.addEventListener('click', convertCoin);