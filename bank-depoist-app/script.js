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

displayMovements(account1.movements);

//2.Antra uzduotis, susiraseme viska i viena funkcija ir suskaiciuojame visus inestus pinigus tam tikruose laukeliuose
const displayCalculationsMovements = function (acc) {
  //Skaiciuojame balance suma
  acc.balance = account1.movements.reduce((acc, mov) => acc + mov, 0);
  balanceValue.textContent = `${acc.balance} Eur`;

  //Skaiciuojame acc inestu pinigu suma In
  acc.sumIn = account1.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  summaryIn.textContent = `${acc.sumIn} Eur`;

  //paskaiciuoti acc nusiimtu pinigu suma
  acc.sumOut = account1.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  summaryOut.textContent = `${Math.abs(acc.sumOut)} Eur`;
};
displayCalculationsMovements(account1.movements);

//3. Trecia uzduotis nustatytis siandienos data
const displayCurrentDate = function () {
  balanceDate.textContent = `${new Date().toLocaleDateString()}`;
};
displayCurrentDate();

//4. ketvirta uzduotis. Prisijungti su tam tikru Acc

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

//login event handler

//let kintamasis reikalingas outsides addeventlistener function. Kad butu galima transferint pinigus is kurio acc i kazkieno acc
let currentAccount;

labelLoginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("LOGIN");
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUserName.value
  );
  console.log(currentAccount);
});
