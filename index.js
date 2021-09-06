const bill = document.querySelector('#bill-input');
const tipButtons = Array.from(document.querySelectorAll('.data__button'));
const custom = document.querySelector('#custom-input');
const message = document.querySelector('.message-invalid');
const people = document.querySelector('#people-input');
const tip = document.querySelector('.tip-price');
const total = document.querySelector('.total-price');
const reset = document.querySelector('.results__button');

//AUXILIARY VARIABLES

let billValue = 0;
let tipValue = 0;
let peopleValue = 0;
let tipAmount = 0;
let totalAmount = 0;
let selectedTip; /* the button from tip % that was clicked */


//ARROW FUNCTIONS

/* validates # of people != 0 */
const validateInputs = () => {
  /*validates that the message only appears if the user inputs 0
  not when they didn't write anything yet*/
  if (people.value === '') { return false } //first time or after resetAll
  if (peopleValue === 0) {
    message.classList.remove('invisible');
    return false;
  } else {
    /* if it doesn't have the invisible class then add it */
    if (!message.classList.contains('invisible')) {
      message.classList.add('invisible');
    }
    return true;
  }
};

const calculateAmounts = () => {
  tipAmount = ((billValue * tipValue) / peopleValue).toFixed(2);
  totalAmount = ((billValue + billValue * tipValue) / peopleValue).toFixed(2);
  tip.innerHTML = tipAmount;
  total.innerHTML = totalAmount;
 };

 /* changes were made so reset button enabled & calculate if possible */
const getResults = () => {
  reset.disabled = false;
  if (validateInputs()) {
    calculateAmounts();
  }
};

/* button tip % clicked */
const tipSelected = (button) => {
  tipValue = button.target.value;
  resetSelected();
  button.target.classList.add('button--active');
  selectedTip = button.target;
  custom.value = '';
  people.focus();
  getResults();
};

/* clear the selectedTip */
const resetSelected = () => {
  if (typeof selectedTip !== 'undefined') {
    selectedTip.classList.remove('button--active');
    selectedTip = undefined;
  }
};

const resetAll = () => {
  tip.textContent = '0.00';
  total.textContent = '0.00';
  bill.value = '';
  custom.value = '';
  people.value = '';
  reset.disabled = true;
  tipValue = 0;
  peopleValue = 0;
  billValue = 0;
  resetSelected();
  /* if it doesn't have the invisible class then add it */
  if (!message.classList.contains('invisible')) {
    message.classList.add('invisible');
  };
  bill.focus();
};

//EVENT LISTENERS

bill.addEventListener('change', (e) => {
  billValue = parseFloat(e.target.value);
  getResults();
});

custom.addEventListener('change', (e) => {
  tipValue = parseFloat(e.target.value) / 100;
  resetSelected();
  getResults();
});

people.addEventListener('change', (e) => {
  peopleValue = Math.round(e.target.value);
  getResults();
});

reset.addEventListener('click', resetAll);

// for (var i = 0; i < tipButtons.length; i++) {
//   tipButtons[i].addEventListener('click', tipSelected);
// }

tipButtons.map((button) => {
  button.addEventListener('click', tipSelected);
});

resetAll()