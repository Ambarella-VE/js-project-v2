// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC6eM-qqMfClgfrkQa4eh7XC3rOoTl_8Dg",
  authDomain: "simulador-js.firebaseapp.com",
  projectId: "simulador-js",
  storageBucket: "simulador-js.appspot.com",
  messagingSenderId: "947265477327",
  appId: "1:947265477327:web:36a3b6887965e61feb35ba"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

//Inicializacion
document.addEventListener('DOMContentLoaded', function() {
  var sidenavElems = document.querySelectorAll('.sidenav');
  var sidenavInit = M.Sidenav.init(sidenavElems);
  var modalElems = document.querySelectorAll('.modal');
  var modalInit = M.Modal.init(modalElems);

  // Verificar si es la misma sesión y reistrar visitantes
  let isOnline = sessionStorage.getItem("isOnline");

  isOnline = JSON.parse(isOnline);

  function saveVisit() {
    db.collection('visitors').doc().set({
      timestamp: new Date(),
    });
    sessionStorage.setItem("isOnline",true)
  }
  if (!isOnline){
    saveVisit();
  };
  
  let visitors = 0;

  async function getVisitors() {
    const querySnapshot = await db.collection('visitors').get();
    querySnapshot.forEach(doc =>{
      visitors += 1;
    });
    const modalText = $("#modal-text");

    const line = document.createElement('p');
    line.innerHTML = `
      Más de ${visitors} personas han usado nuestros servicios. 
    `;

    modalText.append(line);
  }
  getVisitors();

  // Verificar en el session storage si el usuario ya se ha suscrito en la sesión actual
  let isSubscribed = sessionStorage.getItem("userSubscribed")
  isSubscribed = JSON.parse(isSubscribed)

  if (!isSubscribed) {
    const elemInstance = M.Modal.getInstance(modalElems[0])
    setTimeout(() => {
      elemInstance.open();
    }, 15000);
  };
});


// Método para transformar string a proper case
String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g,
    function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
};



// Declarar clase usuario suscriptor
class SubUser {
  constructor(fName,lName,eMail) {
    this.fname = fName;
    this.lname = lName;
    this.email = eMail;
  }
}

// Declarar variables del modal
let firstNameModal = $('#firstName');
let firstNameModalContainer = $('#firstName-container');
let lastNameModal =  $('#lastName');
let lastNameModalContainer =  $('#lastName-container');
let emailModal = $('#email');
let emailModalContainer = $('#email-container');
let btnSubscribe = $('#btnSubscribe');


// Handle form
firstNameModal.focusout(() => {
  firstNameModalContainer.find('span').remove();
  if (firstNameModal.val()=="") {
    firstNameModal.removeClass("validate");
    firstNameModal.removeClass("valid");
    firstNameModal.addClass("invalid");
    const helperText = document.createElement('span');
    helperText.textContent = "Campo requerido";
    helperText.setAttribute("class",'helper-text');
    firstNameModalContainer.append(helperText);
  } else {
    firstNameModal.addClass("validate");
    firstNameModal.removeClass("invalid");
    firstNameModalContainer.find('span').remove();
  };
});

emailModal.focusout(() => {
  emailModalContainer.find('span.helper-text').remove();
  if (emailModal.val()==""
      || !emailRegex.test(emailModal.val())
    ) {
    emailModal.removeClass("validate");
    emailModal.removeClass("valid");
    emailModal.addClass("invalid");
    const helperText = document.createElement('span');
    helperText.textContent = "Ingresa un email válido";
    helperText.setAttribute("class",'helper-text');
    emailModalContainer.append(helperText);
  } else {
    emailModal.addClass("validate");
    emailModal.removeClass("invalid");
    emailModalContainer.find('span').remove();
  };
});



// Disparador de función en botón suscribirse
btnSubscribe.on('click', (event) => {
  event.preventDefault();
  if (
    firstNameModal.val()!=""
    && lastNameModal.val()!=""
    && emailModal.val()!=""
    && emailRegex.test(emailModal.val())
    ) {
      firstNameModal = firstNameModal.val().toProperCase();
      lastNameModal =  lastNameModal.val().toProperCase();
      emailModal = emailModal.val().toLowerCase();
      currentUser = new SubUser(firstNameModal,lastNameModal,emailModal);
      db.collection('subscriptions').doc().set({
        fname: firstNameModal,
        lname: lastNameModal,
        email: emailModal,
        timeStamp: new Date()
      });
      localStorage.setItem("currentUser",JSON.stringify(currentUser));
      sessionStorage.setItem("userSubscribed",true);
      M.toast({html: 'Te has suscrito correctamente', classes: 'rounded'});
      firstNameModal.trigger('focusout');
      emailModal.trigger('focusout');
    } else {
      var modalElems = document.querySelectorAll('.modal');
      var modalInit = M.Modal.init(modalElems);
      const elemInstance = M.Modal.getInstance(modalElems[0])
      M.toast({html: 'Completa con tu nombre y un email válido', classes: 'rounded', completeCallback: 
        () => {
          elemInstance.open()
        }});
      firstNameModal.trigger('focusout');
      emailModal.trigger('focusout');
    }
});

// Función animations
function fadeInFn(classOrId, time=1500, timeOut) {
  $(classOrId).css("display","none");
  setTimeout(() => {
    $(classOrId).fadeIn(time);
  },timeOut)
}; 
function slideDownFn(classOrId, time=1500, timeOut) {
  $(classOrId).css("display","none");
  setTimeout(() => {
    $(classOrId).slideDown(time);
  },timeOut)
}; 