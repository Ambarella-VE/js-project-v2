//Inicializacion MaterializeCSS
document.addEventListener('DOMContentLoaded', function() {
  var formSelectElems = document.querySelectorAll('select');
  var formSelectInit = M.FormSelect.init(formSelectElems);
});

// Declarar variables Simulador
let capital;
let rate;
let frequency;
let periods;
let btnCalculate;
let tableResults;

// Asignar valores a variables desde el form
capital = document.getElementById('capital');
rate = document.getElementById('rate');
periods = document.getElementById('periods');
frequency = document.getElementById('frequency');
btnCalculate = document.getElementById('btnCalculate');
tableResults = document.querySelector('#table-results tbody')
tableContainer = document.querySelector('#tableContainer');

// Disparador de función en boton SIMULAR
btnCalculate.addEventListener('click', function (event) {
  event.preventDefault();
  calculateAnnuity(capital.value, rate.value, frequency.value, periods.value);
})

//Funcion de Simulador
function calculateAnnuity (capital, rate, frequency, periods) {

  while (tableResults.firstChild) {
    tableResults.removeChild(tableResults.firstChild)
  }

  // Declarar variables
  let annuity = 0;
  let actualCapital = capital;
  let interestFee = 0;
  let capitalFee = 0;
  console.log(frequency)

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
    
    tableContainer.style.display = 'block';
    tableResults.appendChild(row);
    
  }
}