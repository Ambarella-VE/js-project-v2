//Inicializacion MaterializeCSS
document.addEventListener('DOMContentLoaded', function() {
  var formSelectElems = document.querySelectorAll('select');
  var formSelectInit = M.FormSelect.init(formSelectElems);
});

// Declarar variables Simulador
let capital = $('#capital');
let rate = $('#rate');
let frequency = $('#frequency');
let periods = $('#periods');
let btnCalculate = $('#btnCalculate');
let tableResults = $('#table-results tbody');
let tableContainer = $('#tableContainer');

/* tableContainer = document.querySelector('#tableContainer');
 */
// Disparador de función en boton SIMULAR
btnCalculate.on('click', function (event) {
  event.preventDefault();
  calculateAnnuity(capital.val(), rate.val(), frequency.val(), periods.val())
})

//Funcion de Simulador
function calculateAnnuity (capital, rate, frequency, periods) {

  tableResults.empty();

  // Declarar variables
  let annuity = 0;
  let actualCapital = capital;
  let interestFee = 0;
  let capitalFee = 0;

  // Calculo de cuota
  if (frequency === 'biweekly') {
    annuity = capital * (rate/100/24)
                /
                (1-Math.pow(1+rate/100/24,-periods));
  } else if (frequency === 'monthly') {
    annuity = capital * (rate/100/12)
                /
                (1-Math.pow(1+rate/100/12,-periods));
  } else if (frequency === 'quarterly') {
    annuity = capital * (rate/100/4)
                /
                (1-Math.pow(1+rate/100/4,-periods));
  } else {
    annuity = capital * (rate/100/12)
                /
                (1-Math.pow(1+rate/100/12,-periods));
  }

  for(let i = 0; i <= periods; i++) {

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${i}</td>
      <td>${parseFloat(annuity).toFixed(2)}</td>
      <td>${parseFloat(interestFee).toFixed(2)}</td>
      <td>${parseFloat(capitalFee).toFixed(2)}</td>
      <td>${parseFloat(actualCapital).toFixed(2)}</td>
    `
    if (frequency === 'biweekly') {
      interestFee = actualCapital * rate/100/24;
    } else if (frequency === 'monthly') {
      interestFee = actualCapital * rate/100/12;
    } else if (frequency === 'quarterly') {
      interestFee = actualCapital * rate/100/4;
    } else {
      interestFee = actualCapital * rate/100/12;
    }

    capitalFee = annuity - interestFee;
    actualCapital = actualCapital - capitalFee;
    
    tableContainer.css('display','block');
    tableResults.append(row);
    
  }
}