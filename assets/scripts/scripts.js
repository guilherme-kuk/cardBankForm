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
let msgErrorCvv = document.querySelector(".msg_error_cvv");

//Event Listeners

// cardholder name
inputName.addEventListener("input", () => {
  cardName.innerHTML = inputName.value;
  cardInfoDefaultOrOK();
  removeInputError(inputName, msgErrorName);
});

// card number
inputNumber.addEventListener("input", () => {
  inputNumberValidate();
});

// card month
inputMonth.addEventListener("input", () => {
  onlyNumbersInputValidate(inputMonth);
  inputMonthValidate();
});

//card year
inputYear.addEventListener("input", () => {
  onlyNumbersInputValidate(inputYear);
  inputYearValidate();
});

// cvv
inputCvv.addEventListener("input", () => {
  onlyNumbersInputValidate(inputCvv);
  inputCvvValidate();
});

// Retornar valor default no cartão caso estiver vazio no input.
function cardInfoDefaultOrOK() {
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
  } else {
    addInputOk(inputName);
  }

  // Input Number Default
  if (inputNumber.value === "") {
    cardNumber.innerHTML = defaultValue.cardNumberDefault;
    removeInputOk(inputNumber);
  } else {
    addInputOk(inputNumber);
  }

  // Input Month Default
  if (inputMonth.value === "") {
    cardMonth.innerHTML = defaultValue.cardMonthDefault;
    removeInputOk(inputMonth);
  } else {
    addInputOk(inputMonth);
    // removeInputError(inputMonth, msgErrorDate);
  }

  // Input Year Default
  if (inputYear.value === "") {
    cardYear.innerHTML = defaultValue.cardYearDefault;
    removeInputOk(inputYear);
  } else {
    addInputOk(inputYear);
  }

  // Input CVV Default
  if (inputCvv.value === "") {
    cardCvv.innerHTML = defaultValue.cardCvvDefault;
    removeInputOk(inputCvv);
  } else {
    addInputOk(inputCvv);
  }
}

// Padrões de erro
const errorsMsgs = {
  error1: "Preencha todos os dados",
  error2: "Somente números",
  error3: "Fora de validade",
  error4: "Preencha o nome corretamente",
};

// Validar Input CardNumber
function inputNumberValidate() {
  let values = inputNumber.value;
  let formattedCardNumber = values.replace(/[" "]/g, "");
  formattedCardNumber = formattedCardNumber.substring(0, 16);

  let valuesWithSpaces = formattedCardNumber.match(/\w{1,4}/g);
  const validate = /^[0-9]*$/;
  if (!validate.test(formattedCardNumber)) {
    addInputError(inputNumber, msgErrorNumber);
    msgErrorNumber.innerHTML = errorsMsgs.error2;
    inputNumber.value = valuesWithSpaces.join(" ");
  } else {
    cardNumber.innerHTML = inputNumber.value;
    cardInfoDefaultOrOK();
    if (valuesWithSpaces !== null) {
      formattedCardNumber = valuesWithSpaces.join(" ");
      removeInputError(inputNumber, msgErrorNumber);
    }
    if (values !== formattedCardNumber) {
      inputNumber.value = valuesWithSpaces.join(" ");
      removeInputError(inputNumber, msgErrorNumber);
    }
  }
}

// validar input Month
function inputMonthValidate() {
  //validando caso valor seja maior que 12 ou menor que 0;
  if (
    inputMonth.value > 12 ||
    inputMonth.value < 0 ||
    inputMonth.value === "00"
  ) {
    inputMonth.value = "";
  } else {
    cardMonth.innerHTML = inputMonth.value;
    cardInfoDefaultOrOK();
    removeInputError(inputMonth, msgErrorDate);
    removeInputError(inputYear, msgErrorDate);
  }

  // caso seja digitado apenas 1 numero, ao sair do input é adicionado 0 à esquerda.
  inputMonth.addEventListener("blur", () => {
    if (inputMonth.value.length < 2) {
      inputMonth.value = "0" + inputMonth.value;
      cardMonth.innerHTML = inputMonth.value;
    }
  });
}

// validar input Year
function inputYearValidate() {
  // Verificando se o ano está dentro da validade.
  let ano = new Date().getFullYear().toString();

  if (inputYear.value >= ano.substr(-2)) {
    cardYear.innerHTML = inputYear.value;
    cardInfoDefaultOrOK();
    removeInputError(inputYear, msgErrorDate);
  } else if (inputYear.value.length < 2) {
    cardYear.innerHTML = inputYear.value;
    cardInfoDefaultOrOK();
    removeInputError(inputYear, msgErrorDate);
  } else {
    addInputError(inputYear, msgErrorDate);
    msgErrorDate.innerHTML = errorsMsgs.error3;
  }
}

// validando input CVV
function inputCvvValidate() {
  if (inputCvv.value.length >= 0) {
    cardCvv.innerHTML = inputCvv.value;
    cardInfoDefaultOrOK();
    removeInputError(inputCvv, msgErrorCvv);
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
  const regex = /[0-9]/;

  //validando regex e apresentando elemento diferente isNaN no input.
  if (!regex.test(values)) {
    input.value = values
      .split("")
      .filter((element) => !isNaN(element))
      .join("");
  }
}

//validando nome após clicar no botão confirmar
function nameAfterConfirm() {
  if (inputName.value === "") {
    //se estiver vazio no input lançara erro 1
    addInputError(inputName, msgErrorName);
    msgErrorName.innerHTML = errorsMsgs.error1;
  } else if (inputName.value.length < 8) {
    //se valor for menor que 8 caracteres, lançara erro 4
    cardName.innerHTML = inputName.value;
    addInputError(inputName, msgErrorName);
    msgErrorName.innerHTML = errorsMsgs.error4;
  }
}

// validando numero após confirmar inserção do dado no input
function numberAfterConfirm() {
  if (inputNumber.value.length < 19) {
    addInputError(inputNumber, msgErrorNumber);
    msgErrorNumber.innerHTML = errorsMsgs.error1;
  }
}

// Validando data após confirmar inserção do dado no input.
function dateAfterConfirm() {
  let mes = new Date().getMonth();
  let ano = new Date().getFullYear().toString();

  if (inputMonth.value === "" && inputYear.value === "") {
    addInputError(inputMonth, msgErrorDate);
    addInputError(inputYear, msgErrorDate);
    msgErrorDate.innerHTML = errorsMsgs.error1;
  } else if (inputMonth.value === "") {
    addInputError(inputMonth, msgErrorDate);
    msgErrorDate.innerHTML = errorsMsgs.error1;
  } else if (inputYear.value === "") {
    addInputError(inputYear, msgErrorDate);
    msgErrorDate.innerHTML = errorsMsgs.error1;
  } else if (inputMonth.value === "00") {
    inputMonth.value = "";
    addInputError(inputMonth, msgErrorDate);
    msgErrorDate.innerHTML = errorsMsgs.error1;
  } else if (inputMonth.value < mes && inputYear.value <= ano.substr(-2)) {
    // verificando se está na validade após inserir mês e ano.
    addInputError(inputMonth, msgErrorDate);
    addInputError(inputYear, msgErrorDate);
    msgErrorDate.innerHTML = errorsMsgs.error3;
  }
}

// validar input CVV após clicar no botão confirmar
function cvvAfterConfirm() {
  if (inputCvv.value.length < 3 || inputCvv.value === "") {
    addInputError(inputCvv, msgErrorCvv);
    msgErrorCvv.innerHTML = errorsMsgs.error1;
  }
}
// botão confirmar
btnConfirmar.addEventListener("click", function (e) {
  nameAfterConfirm();
  numberAfterConfirm();
  dateAfterConfirm();
  cvvAfterConfirm();

  if (
    inputName.classList.contains("input_error") ||
    inputNumber.classList.contains("input_error") ||
    inputYear.classList.contains("input_error") ||
    inputCvv.classList.contains("input_error")
  ) {
    e.preventDefault();
  } else {
    console.log("ok");
  }
});
