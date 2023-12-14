"use strict";

const account1 = {
  owner: "Tom Gold",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  pin: 1111,
};

const account2 = {
  owner: "Jesica Shy",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  pin: 2222,
};

const account3 = {
  owner: "Stewen Smith",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  pin: 3333,
};

const accounts = [account1, account2, account3];

// ---------Nav---------
const labelWelcome = document.querySelector(".welcome");
const inputLoginUserName = document.querySelector(".login_input--user");
const inputPin = document.querySelector(".login_input--pin");
const labelLoginBtn = document.querySelector(".login_btn");
// --------Balance----------
const balanceLabel = document.querySelector(".balance_laber");
const balanceDate = document.querySelector(".balance_date");
const balanceValue = document.querySelector(".balance_value");
// ---------Movements---------
const movementsTypeDeposit = document.querySelector(".movements_type--deposit");
const movemetsValue = document.querySelector(".movements_value--value");
const movementsTypeWithdrawal = document.querySelector(
  ".movements_type--withdrawal"
);
const boxMovements = document.querySelector(".movements");
// --------Summarry--------
const summaryIn = document.querySelector(".summary_label--in");
const summaryOut = document.querySelector(".summary_label--out");
const summarySort = document.querySelector(".btn--sort");
// ----------section---------
const boxSection = document.querySelector(".section");
// -------------Transfer-------------------
const transferInputTo = document.querySelector(".form_input--to");
const transferInputAmount = document.querySelector(".form_input--amount");
const transferBtn = document.querySelector(".form_btn--transfer");

//1. pirma uzduotis, perkelti account1 movements duomenis is array i UI.
const displayMovements = function (movements) {
  boxMovements.innerHTML = ""; // leido nuimti html irasytas reiksmes, del to klaidu turejau su forEach metodu

  account1.movements.forEach((movement, i) => {
    const type = movement > 0 ? "deposit" : "withdrawal";
    const html = `<div class="movements_row">
    <p class="movements_type movements_type--${type}"> ${i + 1} ${type} </p>
    <p class="movements_value movements_value--value">${movement} Eur</p>
  </div>`;

    boxMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// displayMovements(account1.movements);

//susikureme kad prisijungimo vardai butu pirmosios raidas. pvz Tom Gold = tg
const createUserNames = function (accounts) {
  accounts.forEach(
    (acc) =>
      (acc.username = acc.owner
        .toLowerCase()
        .split(" ")
        .map(function (name) {
          return name[0];
        })
        .join(""))
  );
};
createUserNames(accounts);
console.log(accounts);

//2.Antra uzduotis, susiraseme viska i viena funkcija ir suskaiciuojame visus inestus pinigus tam tikruose laukeliuose
const displayCalcBalance = function (acc) {
  //Skaiciuojame balance suma
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  balanceValue.textContent = `Account Balance ${acc.balance} Eur`;
};

// displayCalcBalance(account1.movements);

const displaySummaryCalc = function (movements) {
  //Skaiciuojame acc inestu pinigu suma In
  const sumIn = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  summaryIn.textContent = `${sumIn} Eur`;

  //paskaiciuoti acc nusiimtu pinigu suma
  const sumOut = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  summaryOut.textContent = `${Math.abs(sumOut)} Eur`;
};
// displaySummaryCalc(account1.movements);

//3. Trecia uzduotis nustatytis siandienos data
const displayCurrentDate = function () {
  balanceDate.textContent = `${new Date().toLocaleDateString()}`;
};
displayCurrentDate();

//4. ketvirta uzduotis. Prisijungti su tam tikru Acc

//login event handler

const updateUI = function (acc) {
  // // parodyti movements
  displayMovements(acc.movements);
  // //parodyti balance ir summary
  displayCalcBalance(acc);
  displaySummaryCalc(acc);
};

//let kintamasis reikalingas outsides addeventlistener function. Kad butu galima transferint pinigus is kurio acc i kazkieno acc
let currentAccount;

labelLoginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  //susirandame username account
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUserName.value
  );
  console.log(currentAccount);

  // optional chaining ? pin bus tik skaitomas kai currentAccount egzistuos
  if (currentAccount?.pin === Number(inputPin.value)) console.log("login");
  //pranesti pranesima UI kad prisijunge ir nustatyti opacity 100 kad rodytu vaizda
  labelWelcome.textContent = `Welcome back ${currentAccount.owner}`;
  boxSection.style.opacity = 100;

  //clear input fields
  inputLoginUserName.value = "";
  inputPin.value = "";

  // // parodyti movements
  // displayMovements(currentAccount.movements);
  // //parodyti balance ir summary
  // displayCalcBalance(currentAccount);
  // displaySummaryCalc(currentAccount.movements);
  //perkeliau i updateUI funkcija
  updateUI(currentAccount);
});

//Transfer dalis

transferBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(transferInputAmount.value);
  console.log(amount);
  const receiveAcc = accounts.find(
    (acc) => acc.username === transferInputTo.value
  ); //ieskome accounto kuris turi tinkama reiksme
  console.log(receiveAcc);
  //patikrinti, kad negaletu sau persivesti ir didesnes sumos nei saskaitoje

  if (
    amount > 0 &&
    receiveAcc &&
    currentAccount.balance >= amount &&
    receiveAcc?.username !== currentAccount.user
  ) {
    //darome pavedima
    currentAccount.movements.push(-amount);
    receiveAcc.movements.push(amount);
    updateUI(currentAccount);
  }
  console.log("transfer valid");
});
