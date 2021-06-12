//Inicializacion MaterializeCSS
document.addEventListener('DOMContentLoaded', function() {
  var datePickElems = document.querySelectorAll('.datepicker');
  var datePickInit = M.Datepicker.init(datePickElems,{
    format: 'dd/mm/yyyy',
    showClearBtn: true,
    yearRange: [new Date().getFullYear()-100,new Date().getFullYear()-18],
    changeMonth: true,
    changeYear: true,
    i18n: {
      cancel: 'Cancelar',
      months: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
      monthsShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
      weekdays: ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
      weekdaysShort: ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
      weekdaysAbbrev: ['D','L','M','M','J','V','S'],
      clear: "Borrar"
    }
  });
});

// Declarar y asignar valores a variables del form de solicitud
let fNameApp = $('#first_name');
let fNameAppContainer = $('#first_name-container');
let lNameApp = $('#last_name');
let lNameAppContainer = $('#last_name-container');
let bDateApp = $('#birth_date');
let bDateAppContainer = $('#birth_date-container');
let emailApp = $('#e_mail');
let emailAppContainer = $('#e_mail-container');
let incomeApp = $('#income');
let incomeAppContainer = $('#income-container');
let purposeApp = $('#purpose');
let purposeAppContainer = $('#purpose-container');
let sliderValue = $('#sliderValue');
let monthsApp = $('#monthsApp');
let btnApply = $('#btnApply');

// Abrir calendar on focus
bDateApp.on('focus',() => {
  setTimeout('bDateApp.click()',200);
} )

// Slider
monthsApp.on('change',() => {
  sliderValue.text(monthsApp.val());
})

// Handle form
fNameApp.focusout(() => {
  fNameAppContainer.find('span').remove();
  if (fNameApp.val()=="") {
    fNameApp.removeClass("validate");
    fNameApp.removeClass("valid");
    fNameApp.addClass("invalid");
    const helperText = document.createElement('span');
    helperText.textContent = "Campo requerido";
    helperText.setAttribute("class",'helper-text');
    fNameAppContainer.append(helperText);
  } else {
    fNameApp.addClass("validate");
    fNameApp.removeClass("invalid");
    fNameAppContainer.find('span').remove();
  };
});

lNameApp.focusout(() => {
  lNameAppContainer.find('span').remove();
  if (lNameApp.val()=="") {
    lNameApp.removeClass("validate");
    lNameApp.removeClass("valid");
    lNameApp.addClass("invalid");
    const helperText = document.createElement('span');
    helperText.textContent = "Campo requerido";
    helperText.setAttribute("class",'helper-text');
    lNameAppContainer.append(helperText);
  } else {
    lNameApp.addClass("validate");
    lNameApp.removeClass("invalid");
    lNameAppContainer.find('span').remove();
  };
});

bDateApp.focusout(() => {
  bDateAppContainer.find('span.helper-text').remove();
  if (bDateApp.val()=="") {
    bDateApp.removeClass("validate");
    bDateApp.removeClass("valid");
    bDateApp.addClass("invalid");
    const helperText = document.createElement('span');
    helperText.textContent = "Campo requerido";
    helperText.setAttribute("class",'helper-text');
    bDateAppContainer.append(helperText);
  } else {
    bDateApp.addClass("validate");
    bDateApp.removeClass("invalid");
    bDateAppContainer.find('span.helper-text').remove();
  };
});

bDateApp.change(() => {
  bDateAppContainer.find('span.helper-text').remove();
  if (bDateApp.val()=="") {
    bDateApp.removeClass("validate");
    bDateApp.removeClass("valid");
    bDateApp.addClass("invalid");
    const helperText = document.createElement('span');
    helperText.textContent = "Campo requerido";
    helperText.setAttribute("class",'helper-text');
    bDateAppContainer.append(helperText);
  } else {
    bDateApp.addClass("validate");
    bDateApp.removeClass("invalid");
    bDateAppContainer.find('span.helper-text').remove();
  };
});

emailApp.focusout(() => {
  emailAppContainer.find('span.helper-text').remove();
  if (emailApp.val()==""
      || !emailRegex.test(emailApp.val())
    ) {
    emailApp.removeClass("validate");
    emailApp.removeClass("valid");
    emailApp.addClass("invalid");
    const helperText = document.createElement('span');
    helperText.textContent = "Ingresa un email válido";
    helperText.setAttribute("class",'helper-text');
    emailAppContainer.append(helperText);
  } else {
    emailApp.addClass("validate");
    emailApp.removeClass("invalid");
    emailAppContainer.find('span').remove();
  };
});

incomeApp.focusout(() => {
  incomeAppContainer.find('span').remove();
  if (incomeApp.val()==""
      || incomeApp.val()<1
  ) {
    incomeApp.removeClass("validate");
    incomeApp.removeClass("valid");
    incomeApp.addClass("invalid");
    const helperText = document.createElement('span');
    helperText.textContent = "Debes ingresar un monto";
    helperText.setAttribute("class",'helper-text');
    incomeAppContainer.append(helperText);
  } else {
    incomeApp.addClass("validate");
    incomeApp.removeClass("invalid");
    incomeAppContainer.find('span').remove();
  };
});

purposeApp.focusout(() => {
  purposeAppContainer.find('span').remove();
  if (purposeApp.val()=="") {
    purposeApp.removeClass("validate");
    purposeApp.removeClass("valid");
    purposeApp.addClass("invalid");
    const helperText = document.createElement('span');
    helperText.textContent = "Campo requerido";
    helperText.setAttribute("class",'helper-text');
    purposeAppContainer.append(helperText);
  } else {
    purposeApp.addClass("validate");
    purposeApp.removeClass("invalid");
    purposeAppContainer.find('span').remove();
  };
});

// Disparador de función en boton SOLICITAR
btnApply.on('click', function (event) {
  event.preventDefault();
  
  if (
    fNameApp.val()!=""
    && lNameApp.val()!=""
    && bDateApp.val()!=""
    && emailApp.val()!=""
    && incomeApp.val()!=""
    && purposeApp.val()!=""
    && monthsApp.val()!=""
    && emailRegex.test(emailApp.val())
    && incomeApp.val()>0
    ) {
      handleBtnApply(
        fNameApp.val(),
        lNameApp.val(),
        bDateApp.val(),
        emailApp.val(),
        parseInt(incomeApp.val()),
        purposeApp.val(),
        parseInt(monthsApp.val())
        )
      fNameApp.trigger('focusout');
      lNameApp.trigger('focusout');
      bDateApp.trigger('focusout');
      emailApp.trigger('focusout');
      incomeApp.trigger('focusout');
      purposeApp.trigger('focusout');
    } else {
      M.toast({html: 'Completa los campos necesarios', classes: 'rounded'})
      fNameApp.trigger('focusout');
      lNameApp.trigger('focusout');
      bDateApp.trigger('focusout');
      emailApp.trigger('focusout');
      incomeApp.trigger('focusout');
      purposeApp.trigger('focusout');
    }
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

    db.collection('applications').doc().set({
      fName: fName.toProperCase(),
      lName: lName.toProperCase(),
      bDate,
      email: email.toLowerCase(),
      income,
      purpose: purpose.charAt(0).toUpperCase() + purpose.substr(1).toLowerCase(),
      months,
      minLoan,
      maxLoan,
      timeStamp: new Date()
    })
  } else {
    M.toast({html: 'Eres menor de edad! No puedes solicitar un préstamo', classes:'rounded'})
  }
};