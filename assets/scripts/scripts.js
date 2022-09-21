let inputName = document.getElementById("name");
let cardName = document.getElementById("name_info");

let inputNumber = document.getElementById("number");
let cardNumber = document.getElementById("number_info");

let inputMonth = document.getElementById("month");
let cardMonth = document.getElementById("month_info");

let inputYear = document.getElementById("year");
let cardYear = document.getElementById("year_info");

let inputCvv = document.getElementById("cvv");
let cardCvv = document.getElementById("cvv_info");

let btnConfirmar = document.getElementById("btn");

let msgErrorName = document.querySelector(".msg_error_name");
let msgErrorNumber = document.querySelector(".msg_error_number");
let msgErrorDate = document.querySelector(".msg_error_date");

//Event Listeners

// cardholder name
inputName.addEventListener("input", () => {
  cardName.innerHTML = inputName.value;
  cardInfoDefault();
});

// card number
inputNumber.addEventListener("input", () => {
  cardNumber.innerHTML = inputNumber.value;

  cardInfoDefault();
  inputNumberValidate();
});

// card month
inputMonth.addEventListener("input", (e) => {
  inputMonthValidate();
});

//card year
inputYear.addEventListener("input", () => {
  inputYearValidate();
});

// cvv
inputCvv.addEventListener("input", () => {
  onlyNumbersInputValidate(inputCvv);

  cardCvv.innerHTML = inputCvv.value;
  cardInfoDefault();
});

// Retornar valor default no cartão caso estiver vazio no input.
function cardInfoDefault() {
  const defaultValue = {
    cardNameDefault: "--",
    cardNumberDefault: "0000 0000 0000 0000",
    cardMonthDefault: "00",
    cardYearDefault: "00",
    cardCvvDefault: "000",
  };

  // Definindo Input Name Default
  if (inputName.value === "") {
    cardName.innerHTML = defaultValue.cardNameDefault;
    removeInputOk(inputName);
  } else {
    addInputOk(inputName);
    removeInputError(inputName, msgErrorName);
  }

  // Input Number Default
  if (inputNumber.value === "") {
    cardNumber.innerHTML = defaultValue.cardNumberDefault;
    removeInputOk(inputNumber);
    removeInputError(inputNumber, msgErrorNumber);
  } else {
    addInputOk(inputNumber);
    removeInputError(inputNumber, msgErrorNumber);
  }

  // Input Month Default
  if (inputMonth.value === "") {
    cardMonth.innerHTML = defaultValue.cardMonthDefault;
    removeInputOk(inputMonth);
  } else {
    addInputOk(inputMonth);
    removeInputError(inputMonth, msgErrorDate);
  }

  // Input Month Default
  if (inputYear.value === "") {
    cardYear.innerHTML = defaultValue.cardYearDefault;
    removeInputOk(inputYear);
  } else {
    addInputOk(inputYear);
    removeInputError(inputYear, msgErrorDate);
  }
}

// Padrões de erro
const errorsMsgs = {
  error1: "Preencha todos os dados",
  error2: "Somente números",
  error3: "Fora de validade",
};

// Adicionar 0 a frente no input mes e ano se inserir apenas 1 digito.

// function inputsDateValidate(input) {
//   if (input.value.length < 2) {
//     input.value = "0" + input.value;
//   }
// }

// Validar Input CardNumber
function inputNumberValidate() {
  let values = inputNumber.value;
  let formattedCardNumber = values.replace(/[^\w]/g, "");
  formattedCardNumber = formattedCardNumber.substring(0, 16);

  let valuesWithSpaces = formattedCardNumber.match(/\w{1,4}/g);
  const validate = /^[0-9]*$/;
  if (!validate.test(formattedCardNumber)) {
    addInputError(inputNumber, msgErrorNumber);
    msgErrorNumber.innerHTML = errorsMsgs.error2;
    inputNumber.value = valuesWithSpaces.join(" ");
  } else {
    if (valuesWithSpaces !== null) {
      formattedCardNumber = valuesWithSpaces.join(" ");
    }
    if (values !== formattedCardNumber) {
      inputNumber.value = valuesWithSpaces.join(" ");
    }
  }
}

function inputMonthValidate() {
  if (
    inputMonth.value > 12 ||
    inputMonth.value < 0 ||
    inputMonth.value === "-" ||
    inputMonth.value === "00"
  ) {
    inputMonth.value = "";
  } else {
    cardMonth.innerHTML = inputMonth.value;
    cardInfoDefault();
  }
}

// validar input Year
function inputYearValidate() {
  // Verificando se o ano está dentro da validade.
  let ano = new Date().getFullYear().toString();

  if (inputYear.value >= ano.substr(-2) || inputYear.value === "") {
    removeInputError(inputYear, msgErrorDate);
    cardYear.innerHTML = inputYear.value;
    cardInfoDefault();
  } else if (inputYear.value.length < 2) {
    cardYear.innerHTML = inputYear.value;
  } else {
    addInputError(inputYear, msgErrorDate);
    msgErrorDate.innerHTML = errorsMsgs.error3;
  }
}

// Adicionar estilo no input ao dar erro de validação.
function addInputError(input, msgError) {
  input.classList.add("input_error");
  msgError.classList.add("msg_error");
}

// Remover estilo do input ao entrar na validação.
function removeInputError(input, msgError) {
  input.classList.remove("input_error");
  msgError.classList.remove("msg_error");
  msgError.innerHTML = "";
}

// Adicionar estilo no input ao preencher corretamente.
function addInputOk(input) {
  input.classList.add("input_ok");
}

// Remover estilo do input ao deixar o mesmo vazio.
function removeInputOk(input) {
  input.classList.remove("input_ok");
}

// Não permitir inserir letras no input Month, Year e CVV.
function onlyNumbersInputValidate(input) {
  let values = input.value;

  //definindo regex
  const pattern = /^[0-9]*$/;

  //validando regex e apresentando elemento diferente isNaN no input.
  if (!pattern.test(values)) {
    input.value = values
      .split("")
      .filter((element) => !isNaN(element))
      .join("");
  }
}

btnConfirmar.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    (inputMonth.value === "0" && inputMonth.value.length < 2) ||
    inputMonth.value === ""
  ) {
    addInputError(inputMonth, msgErrorDate);
    msgErrorDate.innerHTML = errorsMsgs.error1;
  } else {
    inputsDateValidate(inputMonth);
    inputMonthValidate();
  }
  inputsDateValidate(inputYear);
  inputYearValidate();
});
