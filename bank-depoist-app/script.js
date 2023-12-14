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
const inputLogin = document.querySelector(".login_input--user");
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

//pirma uzduotis, perkelti account1 movements duomenis is array i UI.
const displayMovements = function (movements) {
  account1.movements.forEach((movement, i) => {
    const type = movement > 0 ? "deposit" : "withdrawal";
    const html = `<div class="movements_row">
    <p class="movements_type movements_type--${type}">${i + 1}  ${type}</p>
    <p class="movements_value movements_value--value">${movement} Eur</p>
  </div>`;
    boxMovements.insertAdjacentHTML("afterbegin", html);
  });
};

displayMovements(account1.movements);

//Paskaiciuoti acc pinigu suma
const displayCalcBalance = function (acc) {
  acc.balance = account1.movements.reduce((acc, mov) => acc + mov, 0);
  balanceValue.textContent = `${acc.balance} Eur`;
};
displayCalcBalance(account1.movements);

//Paskaiciuoti acc inestu pinigu suma
const displayCalcSumIn = function (acc) {
  acc.sumIn = account1.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  summaryIn.textContent = `${acc.sumIn} Eur`;
};
displayCalcSumIn(account1.movements);
//paskaiciuoti acc nusiimtu pinigu suma

const displayCalcSumOut = function (acc) {
  acc.sumOut = account1.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  summaryOut.textContent = `${Math.abs(acc.sumOut)} Eur`;
};
displayCalcSumOut(account1.movements);

const displayCurrentDate = function () {
  balanceDate.textContent = `${new Date().toLocaleDateString()}`;
};
displayCurrentDate();
