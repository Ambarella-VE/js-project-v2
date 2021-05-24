//Inicializacion
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
let periodsContainer = $('#periods-container');
let rateContainer = $('#rate-container');
let capitalContainer = $('#capital-container');
let btnCalculateContainer = $('#btnCalculate-container');
let rateIcon = $('#rate-icon');

// Handle form
capital.focusout(() => {
  capitalContainer.find('span').remove();
  if (capital.val()=="" || capital.val()<1) {
    capital.removeClass("validate");
    capital.removeClass("valid");
    capital.addClass("invalid");
    const helperText = document.createElement('span');
    helperText.textContent = "Debes escoger un capital mayor a 0"
    helperText.setAttribute("class",'helper-text');
    capitalContainer.append(helperText);
  } else {
    capital.addClass("validate");
    capital.removeClass("invalid");
    capitalContainer.find('span').remove();
  };
});

rate.on('focus', () => {
  if (rate.val()!=""){
    rate.addClass("validate")
  };
  rateIcon.css("fill","#009688");
});

rate.on('focusout', () => {
  rateContainer.find('span').remove();
  if (rate.val()=="" || rate.val()<1) {
    rate.removeClass("validate");
    rate.removeClass("valid");
    rate.addClass("invalid");
    const helperText = document.createElement('span');
    helperText.textContent = "Debes escoger una tasa mayor a 0"
    helperText.setAttribute("class",'helper-text');
    rateContainer.append(helperText);
  } else {
    rate.addClass("validate");
    rate.removeClass("invalid");
    rateContainer.find('span').remove();
  };
  rateIcon.css("fill","");
});

periods.on('focusout', () => {
  periodsContainer.find('span').remove();
  if (periods.val()=="" || periods.val()>72 || periods.val()<1) {
    periods.removeClass("validate");
    periods.removeClass("valid");
    periods.addClass("invalid");
    const helperText = document.createElement('span');
    helperText.textContent = "Debes escoger entre 1 y 72 cuotas"
    helperText.setAttribute("class",'helper-text');
    periodsContainer.append(helperText);
  } else {
    periods.addClass("validate");
    periods.removeClass("invalid");
    periodsContainer.find('span').remove();
  }
});

// Disparador de función en boton SIMULAR
btnCalculate.on('click', function (event) {
  event.preventDefault();
  if (
    capital.val()!=""
    && capital.val()>0
    && rate.val()!=""
    && rate.val()>0
    && periods.val()!=""
    && periods.val()>0
    ) {
      calculateAnnuity(capital.val(), rate.val(), frequency.val(), periods.val());
      capital.trigger('focusout');
      rate.trigger('focusout');
      periods.trigger('focusout');
    } else {
      M.toast({html: 'Completa los campos necesarios', classes: 'rounded'})
      capital.trigger('focusout');
      rate.trigger('focusout');
      periods.trigger('focusout');
    }
});

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