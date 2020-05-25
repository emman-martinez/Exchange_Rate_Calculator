import './../css/componentes.css';

const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');
const swap = document.getElementById('swap');
const rateEl = document.getElementById('rate');

const url = 'https://api.exchangerate-api.com/v4/latest';

const calculate = async() => {

    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    try {
        const resp = await fetch(`${url}/${currency_one}`);
        if (!resp.ok) throw 'No se pudo realizar la petición';
        const data = await resp.json();
        // console.log(rate);
        const rate = data.rates[currency_two];
        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
        amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    } catch (err) {
        throw err;
    }

}

const eventos = () => { // Event Listeners
    currencyEl_one.addEventListener('change', calculate);
    amountEl_one.addEventListener('input', calculate);
    currencyEl_two.addEventListener('change', calculate);
    amountEl_two.addEventListener('input', calculate);
    swap.addEventListener('click', () => {
        const temp = currencyEl_one.value;
        currencyEl_one.value = currencyEl_two.value;
        currencyEl_two.value = temp;
        calculate();
    });
};

calculate();

const init = () => {
    console.log('Exchange Rate Calculator');
    eventos();
};

export {
    init
}