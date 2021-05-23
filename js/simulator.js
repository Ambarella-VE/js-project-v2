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
  const annuityFormula = {
    biweekly: 24,
    monthly: 12,
    quarterly: 4
  }

  annuityDefault = 12

  annuity = capital * (rate/100/
            annuityFormula[frequency])
            /
            (1-Math.pow(1+rate/100/
            annuityFormula[frequency],-periods))
            ||
            capital * (rate/100/
            annuityDefault)
            /
            (1-Math.pow(1+rate/100/
            annuityDefault,-periods));
  


  for(let i = 0; i <= periods; i++) {

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${i}</td>
      <td>${parseFloat(annuity).toFixed(2)}</td>
      <td>${parseFloat(interestFee).toFixed(2)}</td>
      <td>${parseFloat(capitalFee).toFixed(2)}</td>
      <td>${parseFloat(actualCapital).toFixed(2)}</td>
    `;
    
    interestFee = actualCapital * rate/100/annuityFormula[frequency] || actualCapital * rate/100/annuityDefault;

    capitalFee = annuity - interestFee;
    actualCapital = actualCapital - capitalFee;
    
    tableContainer.css('display','block');
    tableResults.append(row);
    
  }
}