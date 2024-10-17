// Variables
const container = document.querySelector(".container");

// Login
const loginForm = document.querySelector("#login-form");
const loginCont = document.querySelector(".login-cont");
const userCont = document.querySelector(".user-cont");
const userInput = document.querySelector("#user");
let iconUser = userInput.previousElementSibling;
const passwdCont = document.querySelector(".password-cont");
const passwordInput = document.querySelector("#password");
let iconPasswd = passwordInput.previousElementSibling;
const twoColumns = document.querySelector(".two-columns");
const eyes = document.querySelectorAll(".eye");
const login = document.querySelector(".login-btn");
const signLink = document.querySelector(".sign-up-link");
let alertLogin = document.querySelector(".alert-login");

// Sign Up
const signForm = document.querySelector("#sign-form");
const signInputs = document.querySelectorAll(".sign-input");

const signUserCont = document.querySelector(".sign-user-cont");
const signUser = document.querySelector("#sign-user");
let iconUserSign = signUser.previousElementSibling;

const signPasswdCont = document.querySelector(".sign-password-cont");
const signPassw = document.querySelector("#sign-password");
let iconPasswdSign = signPassw.previousElementSibling;

const repeatPasswCont = document.querySelector(".repeat-password-cont");
const repeatPassw = document.querySelector("#repeat-password");
let iconPasswdRe = repeatPassw.previousElementSibling;

const loginLink = document.querySelector(".login-link");

const emailCont = document.querySelector(".email-cont");
const emailInput = document.querySelector("#email");
let iconEmail = emailInput.previousElementSibling;

const terms = document.querySelector("#terms");
let alertSign = document.querySelectorAll(".alert-sign");

let user = "Admin";
let password = "Asdf1234+";
// Eventos

// Show/Hidden Password
eyes.forEach((eye) => {
  eye.addEventListener("click", (e) => {
    let estado = e.target;
    if (estado.src.includes("eye-open")) {
      estado.previousElementSibling.type = "text";
      estado.src = "icons/eye-closed.svg";
      return;
    }
    estado.previousElementSibling.type = "password";
    estado.src = "icons/eye-open.svg";
  });
});

// Submit de Login Form
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  iconReset();
  
  alertLogin.style.display = "none";
  alertLogin.classList.remove('error');

  if (userInput.value !== user /*&& userInput.value !== ""*/ | passwordInput.value !== password) {
    alertLogin.style.display = "flex";    
    alertLogin.classList.add('error');
    /*alertLogin.textContent = "* Usuario o contraseña incorrectos.";*/
    alertLogin.textContent = "* Incorrect username or password.";
  }
  userInput.value = "";
  passwordInput.value = "";

});


// Submit de Sign Up Form
signForm.addEventListener("submit", (e) => {
  e.preventDefault();
  iconHover();

  alertSign.forEach((error) => {

    let input = error.previousElementSibling.children[1];
    iconHover();

    // Valida los input menos el check
    if (input.value === "") {

      error.classList.add("error");
      error.style.display = "flex";
      /*error.textContent = "* Completa este campo."*/
      error.textContent = "* Complete this field."

    } else {
      error.style.display = "none";
      error.classList.remove("error");
    }

    // Valida el check de terminos y condiciones
    if (!terms.checked) {
      terms.style.border = "1px solid red";
      terms.nextElementSibling.style.color = "red";
    } else {
      terms.style.border = "1px solid rgba(0, 0, 0, 0.5)";
      terms.nextElementSibling.style.color = "#181818";
    }
  });

  // Valida las contraseñas entre si, en el signup
  passwdMatch();

  // Valida el formulario de signup, que ningun campo este en rojo, es decir, invalido
  validar();
  iconHover();
  /*iconReset();*/
});

// Link de Sign Up, gira la carta
signLink.addEventListener("click", () => {
  signForm.style.transform = "rotateY(0)";
  loginForm.style.transform = "rotateY(-180deg)";
  

  setTimeout(() => {
    loginForm.reset();
    iconReset();
    alertLogin.style.display = "none";
    alertLogin.classList.remove('error');
  }, 1000);
});

// Link de Login Up, gira la carta
loginLink.addEventListener("click", () => {
  loginForm.style.transform = "rotateY(0)";
  signForm.style.transform = "rotateY(-180deg)";

  setTimeout(() => {
    signForm.reset();
    signInputs.forEach((input) => {
      input.classList.remove("rojo");
      terms.style.border = "1px solid rgba(0, 0, 0, 0.5)";
      terms.nextElementSibling.style.color = "#181818";
    });
    alertSign.forEach((error) => {
      error.classList.remove("error");
      error.style.display = "none";
    });
  }, 1000);
});


// Funciones

function validar() {
  let validado = false;
  let campos = [];

  // Rellenamos el array con los campos
  alertSign.forEach((error) => {
    campos.push(error);
  });

  // Validamos si el checkbox está marcado y el metodo every() para ver si NINGUN campo tiene la clase 'rojo'
  if (
    terms.checked &&
    campos.every((campo) => !campo.classList.contains("error"))
  ) {
    validado = true;
  }

  // Si todos los campos estan validados completamos el sign
  if (validado) {
    alert("Registrado Correctamente");
    signForm.reset();

    setTimeout(function () {
      location.reload();
    }, 1000); // Recarga la página después de 5 segundos
  }
}

// Comprueba si las contraseñas del signup coinciden
function passwdMatch() {
  if (signPassw.value !== repeatPassw.value) {
    signPassw.value = "";
    signPassw.placeholder = "Passwords should match.";
    signPassw.classList.add("rojo");
    repeatPassw.value = "";
    repeatPassw.placeholder = "Passwords should match.";
    repeatPassw.classList.add("rojo");
    iconPasswdSign.src = "icons/lock.svg";
    iconPasswdRe.src = "icons/lock.svg";
  } else if ((signPassw.value == "") | (repeatPassw.value == "")) {
    signPassw.classList.add("rojo");
    repeatPassw.classList.add("rojo");
    iconPasswdSign.src = "icons/lock.svg";
    iconPasswdRe.src = "icons/lock.svg";
  } else {
    signPassw.classList.remove("rojo");
    repeatPassw.classList.remove("rojo");
  }
}

// Cambia de color los iconos cuando no estan vacios
iconHover();
function iconHover(){
  userInput.addEventListener('input', ()=>{
    
    if(userInput.value !== ""){
      iconUser.src = "icons/userActive.svg";
    } else{
      iconUser.src = "icons/user.svg";
    }
    });

    passwordInput.addEventListener('input', ()=>{
      if(passwordInput.value !== ""){
        iconPasswd.src = "icons/lockActive.svg";
      } else{
        iconPasswd.src = "icons/lock.svg";
      }
      });

      
      signUser.addEventListener('input', ()=>{
        if(signUser.value !== ""){
          iconUserSign.src = "icons/userActive.svg";
        } else{
          iconUserSign.src = "icons/user.svg";
        }
        });

      emailInput.addEventListener('input', ()=>{
        if(emailInput.value !== ""){
          iconEmail.src = "icons/mailActive.svg";
        } else{
          iconEmail.src = "icons/mail.svg";
        }
        });

        signPassw.addEventListener('input', ()=>{
          if(signPassw.value !== ""){
            iconPasswdSign.src = "icons/lockActive.svg";
          } else{
            iconPasswdSign.src = "icons/lock.svg";
          }
          });

          repeatPassw.addEventListener('input', ()=>{
            if(repeatPassw.value !== ""){
              iconPasswdRe.src = "icons/lockActive.svg";
            } else{
              iconPasswdRe.src = "icons/lock.svg";
            }
            });
}

// Formatear iconos
function iconReset(){

      iconUser.src = "icons/user.svg";

        iconPasswd.src = "icons/lock.svg";

          iconUserSign.src = "icons/user.svg";

          iconEmail.src = "icons/mail.svg";
        
  
            iconPasswdSign.src = "icons/lock.svg";
       
              iconPasswdRe.src = "icons/lock.svg";
     
}