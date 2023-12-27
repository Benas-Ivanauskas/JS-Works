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
//-----------------------------------------------------------------------

//----1. integruoti movements array
// for each metodu turiu padaryti, kad rodytu movements, index.
const displayMovements = function (movement) {
  //panaikina html irasytas reiksmiu pvz 4000 Eur ir -500 Eur
  boxMovements.innerHTML = "";
  //7 uzduotyje is accounts1.movements pakeiciama i currentAcc.movements, kad rodytu prie skirtingu acc ju reiksmes
  currentAcc.movements.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = ` <div class="movements_row">
    <p class="movements_type movements_type--${type}">${i + 1} ${type}</p>
    <p class="movements_value movements_value--value">${mov} Eur</p>
  </div>`;
    //insertinome reiksmes nuo movements [0] iki movements.length-1 reiksmes eiles tvarka
    boxMovements.insertAdjacentHTML("beforeend", html);
  });
};
// displayMovements(account1.movements);

//---2. suskaiciuoti saskaitos current balance.
const displayBalance = function (account) {
  //7 uzduotyje is accounts1.movements pakeiciama i currentAcc.movements, kad rodytu prie skirtingu acc ju reiksmes
  //8 uzduotyje function (movement) keiciame i (account) ir currentActt i account
  // ir irasome account.balance = balance, kad butu konkretus tam tikro accounto balance
  const balance = account.movements.reduce((acc, cur) => acc + cur, 0);
  account.balance = balance;
  balanceValue.textContent = `Current balance - ${balance} Eur`;
};
//displayBalance(account1.movements);

//---3. nustatome sios dienos data.
const currentDate = function () {
  const date = new Date().toDateString();
  balanceDate.textContent = date;
};
currentDate();

//---4. apskaiciuojame summary in, out sumas.
const displayCalckSummary = function (movement) {
  //7 uzduotyje is accounts1.movements pakeiciama i currentAcc.movements, kad rodytu prie skirtingu acc ju reiksmes
  const sumIn = currentAcc.movements
    .filter((mov) => mov > 0)
    .reduce((mov, cur) => mov + cur, 0);
  summaryIn.textContent = `${sumIn} Eur`;

  //7 uzduotyje is accounts1.movements pakeiciama i currentAcc.movements, kad rodytu prie skirtingu acc ju reiksmes
  const sumOut = currentAcc.movements
    .filter((mov) => mov < 0)
    .reduce((mov, cur) => mov + cur, 0);
  summaryOut.textContent = `${sumOut} Eur`;
};

// displayCalckSummary(account1.movements);

//---------PVZ kaip pasidaryti su user name-----------------
const user = "Tom Gold";
console.log(
  user
    .toLowerCase()
    .split(" ") // splitino [Tom], [Gold] i skirtingus array
    .map((name) => name[0]) // returnino [T],[G] raides
    .join("") // sujunge tg
);

//---5. sukuriame login user name. Jeigu Tom Gold turi gautis tg...
const createUserNames = function (acc) {
  acc.forEach(
    (acc) =>
      (acc.username = acc.owner // padareme kad tam tikro acc owner butu lygus acc.username ir galesime naudoti kitur
        .toLowerCase()
        .split(" ")
        .map((name) => name[0])
        .join(""))
  );
};
createUserNames(accounts);
console.log(accounts);

let currentAcc;
//---6. prisijungti su tam tikru acc ir pranesti welcome user name ir nustatyti opacity
labelLoginBtn.addEventListener("click", function (e) {
  e.preventDefault();

  currentAcc = accounts.find(
    //susirandme current acc
    (acc) => acc.username === inputLoginUserName.value
  );
  console.log(currentAcc);

  if (currentAcc.pin === Number(inputPin.value))
    console.log("You are loged in!");

  labelWelcome.textContent = `Welcome back ${currentAcc.owner}!`;
  //kaip prisijungia, padarome section class opacity 100, kad rodytu visus movements, transfers, log out
  boxSection.style.opacity = 100;

  //isvalome inputs kai prisijungia
  inputLoginUserName.value = "";
  inputPin.value = "";

  //---7. padarome, kad prisijungus su skirtingu acc, rodytu ju duomenis
  //display balance, calliname su visu currentAcc
  // displayBalance(currentAcc);
  // //display movements
  // displayMovements(currentAcc.movements);
  // //display summary
  // displayCalckSummary(currentAcc.movements);
  //UpdateUI perkeliame viska i kita funkcija
  updateUI(currentAcc);
});

//---8. integruojame transfer money

transferBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(transferInputAmount.value);
  console.log(amount);
  // susirandame acc username, norime kad konkretus acc butu lygus transferinputto irasytai input reiksmei
  const receiveAcc = accounts.find(
    (acc) => acc.username === transferInputTo.value
  );
  console.log(receiveAcc);

  //1)pasidarome, kad amount >0.
  //2)negalime pervesti daugiau nei yra current.balance - current.balance<amount
  //3) padarome kad negalime pinigu transferint i savo acc
  //4)ir ar receiveracc isviso egzsistuoja
  if (
    amount > 0 &&
    currentAcc.balance > amount &&
    currentAcc?.username !== receiveAcc.username &&
    receiveAcc
  ) {
    //---9. su push method padarome, kad ivesta reiksme nuimtu ijungtam acc ir pridetu kitiems acc
    currentAcc.movements.push(-amount);
    receiveAcc.movements.push(amount);

    //update UI
    updateUI(currentAcc);
  }
});

const updateUI = function (acc) {
  //display balance
  displayBalance(currentAcc);
  //display movements
  displayMovements(currentAcc.movements);
  //display summary
  displayCalckSummary(currentAcc.movements);
};
