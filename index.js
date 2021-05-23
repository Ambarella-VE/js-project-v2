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

//Inicializacion MaterializeCSS
document.addEventListener('DOMContentLoaded', function() {
  var sidenavElems = document.querySelectorAll('.sidenav');
  var sidenavInit = M.Sidenav.init(sidenavElems);
  var modalElems = document.querySelectorAll('.modal');
  var modalInit = M.Modal.init(modalElems);

});

// Método para transformar string a proper case
String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g,
    function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
};

// Verificar en el session storage si el usuario ya se ha suscrito en la sesión actual
let isConnected;

isConnected = sessionStorage.getItem("userSubscribed")
isConnected = JSON.parse(isConnected)

if (!isConnected) {
  var modalTrigger = document.getElementById("modal-trigger");
  setTimeout('modalTrigger.click()', 15000);
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
let firstNameModal;
let lastNameModal;
let emailModal;
let modalCloseBtn;
let btnSubscribe;
let currentUser;

//Asignar valores a variables del modal
firstNameModal = document.getElementById('firstName');
lastNameModal =  document.getElementById('lastName');
emailModal = document.getElementById('email');
btnSubscribe = document.getElementById('btnSubscribe');



// Disparador de función en botón suscribirse
btnSubscribe.addEventListener('click', () => {
  firstNameModal = firstNameModal.value.toProperCase();
  lastNameModal =  lastNameModal.value.toProperCase();
  emailModal = emailModal.value.toLowerCase();
  currentUser = new SubUser(firstNameModal,lastNameModal,emailModal);
  localStorage.setItem("currentUser",JSON.stringify(currentUser));
  sessionStorage.setItem("userSubscribed",true);
  M.toast({html: 'Te has suscrito correctamente'})
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