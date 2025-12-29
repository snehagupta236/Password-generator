const resultEl = document.getElementById('result');
const clipboardEl = document.getElementById('clipboard');
const uppercaseEl = document.getElementById('Uppercase');
const lowercaseEl = document.getElementById('Lowercase');
const numbersEl = document.getElementById('Numbers');
const symbolsEl = document.getElementById('Symbols');
const lengthEl = document.getElementById('length');


const generateBtn = document.querySelector('.container > button');


const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};


clipboardEl.addEventListener('click', () => {
  const password = resultEl.innerText;
  if (!password) return;

  navigator.clipboard.writeText(password);
  alert('Password copied to clipboard');
});


generateBtn.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = '';
  const typesCount = lower + upper + number + symbol;

  const typesArr = [
    { lower },
    { upper },
    { number },
    { symbol },
  ].filter(item => Object.values(item)[0]);

  if (typesCount === 0) return '';

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  return generatedPassword.slice(0, length);
}


function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.'; 
  return symbols[Math.floor(Math.random() * symbols.length)];
}
