function getCurrentUIValues() {
  return {
    principle: +$loanAmount.value || 0,
    years: +$loanYears.value || 0,
    rate: +$loanRate.value || 0,
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  $loanAmount.value = 10000
  $loanYears.value = 4
  $loanRate.value = 5
  update()
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const values = getCurrentUIValues()
  const monthly = calculateMonthlyPayment(values)
  updateMonthly(monthly)
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment({ principle, years, rate }) {
  rate = (rate / 100) / 12
  const n = years * 12
  const payment = (principle * rate) / (1 - (1 + rate) ** (-n))
  return payment.toFixed(2)
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  $payment.innerText = '$' + monthly
}

const form = document.getElementById("calc-form");
const $loanAmount = document.getElementById("loan-amount")
const $loanYears = document.getElementById("loan-years")
const $loanRate = document.getElementById("loan-rate")
const $payment = document.getElementById("monthly-payment")

if (form) {
  setupIntialValues();
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    update();
  });
}