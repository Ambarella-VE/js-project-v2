//Inicializacion MaterializeCSS
document.addEventListener('DOMContentLoaded', function() {
  var datePickElems = document.querySelectorAll('.datepicker');
  var datePickInit = M.Datepicker.init(datePickElems,{
    format: 'dd/mm/yyyy',
    i18n: {
      cancel: 'Cancelar',
      months: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
      monthsShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
      weekdays: ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
      weekdaysShort: ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
      weekdaysAbbrev: ['D','L','M','M','J','V','S']
    }
  });
});

//Declarar variables del form de solicitud
let fNameApp;
let lNameApp;
let bDateApp;
let emailApp;
let incomeApp;
let purposeApp;
let sliderValue;
let monthsApp;
let btnApply;

//Asignar valores a variables del form de solicitud
fNameApp = document.getElementById('first_name');
lNameApp = document.getElementById('last_name');
bDateApp = document.getElementById('birth_date');
emailApp = document.getElementById('e_mail');
incomeApp = document.getElementById('income');
purposeApp = document.getElementById('purpose');
sliderValue = document.getElementById('sliderValue');
monthsApp = document.getElementById('monthsApp');
btnApply = document.getElementById('btnApply');

// Slider

monthsApp.addEventListener('change',() => {
  sliderValue.innerHTML = monthsApp.value;
})
// Disparador de función en boton SOLICITAR
btnApply.addEventListener('click', function (event) {
  event.preventDefault();
  handleBtnApply(
    fNameApp.value,
    lNameApp.value,
    bDateApp.value,
    emailApp.value,
    parseInt(incomeApp.value),
    purposeApp.value,
    parseInt(monthsApp.value)
    )
})

// Función en boton SOLICITAR
function handleBtnApply(fName = "", lName = "", bDate = "", email = "", income = 0, purpose = "",months = 36) {

  //Calcular si es mayor de edad
  let bDateArrayStr = bDate.split('/');
  let bDateArrayInt = [];

  bDateArrayStr.map((elem) => bDateArrayInt.push(parseInt(elem)));
  let currentDate = new Date();
  let bDateDate = new Date(
    bDateArrayInt[2],
    bDateArrayInt[1]-1,
    bDateArrayInt[0]);
  let convMsToYrs = 31556952000
  let age = parseInt((currentDate - bDateDate)/convMsToYrs)
  let isOlder = age >= 18;

  if (isOlder) {

    //Calculo de capacidad de deuda y préstamo
    let rateDefault = 30;
    let debtCapacity = income*0.35;
    let maxLoan = parseInt(
                    (debtCapacity)
                    /
                    (
                      (rateDefault/100/12)
                      /
                      (
                        1-(Math.pow(1+(rateDefault/100/12),-months))
                      )
                    )
                  );
    let minLoan = parseInt(
                    (debtCapacity)
                    /
                    (
                      (rateDefault/100/12)
                      /
                      (
                        1-(Math.pow(1+(rateDefault/100/12),-12))
                      )
                    )
                  );
    
    // Validar datos para mensaje
    let areEqual = minLoan == maxLoan
    let msgContainer = document.getElementById('application-message');
    let hideContainer = document.getElementById('p-form-container');
    let currencyFormatter = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }); 

    const msg = document.createElement('div');
    msg.classList.add('container');

    if (areEqual) {
      msg.innerHTML =
        `
        <div class="row">
          <h3 class="col s12">
          Felicidades ${fName.toProperCase()}!
          </h3>
        </div>
        <div class="row">
          <h5 class="col text-flow s12 m8">
          Tienes la oportunidad de solicitar 
          </h5>
          <h5 class="col text-flow s12 m4 green-text darken-3">
            ${currencyFormatter.format(maxLoan)}
          </h5>
        </div>
        <div class="row">
          <p class="text-flow">
            En breve nos estaremos contactando contigo a través de ${email.toLowerCase()}  para continuar con la solicitud. 
          </p>
        </div>
        `
      ;
      msgContainer.style.display = 'block';
      msgContainer.appendChild(msg);
      hideContainer.style.display = 'none';
    } else {
      msgContainer.innerHTML =
        `
        <div class="row">
          <h3 class="col s12">
          Felicidades ${fName.toProperCase()}!
          </h3>
        </div>
        <div class="row">
          <h5 class="col s12 text-flow">
          Tienes la oportunidad de solicitar desde
          </h5>
          <h5 class="col s12 l3 green-text darken-3">
            ${currencyFormatter.format(minLoan)}
          </h5>
          <h5 class="col s12 l2">
          hasta
          </h5>
          <h5 class="col s12 l3 green-text darken-3">
            ${currencyFormatter.format(maxLoan)}
          </h5>
        </div>
        <div class="row">
          <p class="text-flow">
            En breve nos estaremos poniendo en contacto contigo a través de ${email.toLowerCase()}  para continuar con la solicitud. 
          </p>
        </div>
        `
      ;
      msgContainer.style.display = 'block';
      msgContainer.appendChild(msg);
      hideContainer.style.display = 'none';
    };

    console.log();
  } else {
    M.toast({html: 'Eres menor de edad! No puedes solicitar un préstamo'})
  }
};