const resultEl = document.getElementById("result");
const lenghtEl = document.getElementById("passwordLength");
const lowercaseEl = document.getElementById("lowercase");
const uppercaseEl = document.getElementById("uppercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

clipboardEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Password copied to clipboard!",
    background: "#f6f5f2",
    showConfirmButton: false,
    timer: 1500,
  });
});

generateEl.addEventListener("click", () => {
  const lenght = +lenghtEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  if (hasLower || hasUpper || hasNumber || hasSymbol === true) {
    if (lenght > 3 && lenght < 21) {
      resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, lenght);
    } else {
      Swal.fire({
        text: "Please enter a value between 4 and 20.",
        icon: "info",
        background: "#f6f5f2",
      });
      return;
    }
  } else {
    Swal.fire({
      text: "Please tick at least one checkbox.",
      icon: "info",
      background: "#f6f5f2",
    });
    return;
  }
});

function generatePassword(lower, upper, number, symbol, length) {
  let PasswordArray = [];
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter((item) => Object.values(item)[0]);

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      PasswordArray.push(randomFunc[funcName]());
    });
    shuffle(PasswordArray);
  }

  function shuffle(PasswordArray) {
    for (let i = PasswordArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [PasswordArray[i], PasswordArray[j]] = [PasswordArray[j], PasswordArray[i]];
    }
  }
  const strPassword = PasswordArray.join(" ").replace(/\s/g, "");

  const finalPassword = strPassword.substring(0, length);

  return finalPassword;
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
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
