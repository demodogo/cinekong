const comentarios = document.getElementById('comentarios');
const charAlert = document.getElementById('alerta-char');
const maxLength = comentarios.getAttribute('maxlength');
const errorDiv = document.getElementById('error-alerta');
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let errores = [];

comentarios.addEventListener('input', () => {
    const charDisp = maxLength - comentarios.value.length;
    console.log(charDisp);
    charAlert.innerHTML = `${charDisp} / 300`;
});

function validarForm(e) {
    errorDiv.innerHTML = '';
    errores = [];
    e.preventDefault();
    let rut = $("#rut").val().trim();
    let comentarios = $("#comentarios").val().trim();
    let password = $("#password").val().trim();
    let email = $("#email").val().trim();
    let nombre = $("#nombre").val().trim();
    let telefono = $("#telefono").val().trim();
    let comuna = $("#comuna").val().trim();
    let peliculaFavorita = $("#peli-favorita").val().trim();
    let peliQueOdias = $("#peli-que-odias").val().trim();
    let terminosChecked = $("#terminos").prop("checked");

    if ( rut.length < 1 || comentarios.length < 1 || password.length < 1 || email.length < 1 || nombre.length < 1 || telefono.length < 1 ||
        comuna.length < 1 || peliculaFavorita.length < 1 || peliQueOdias.length < 1 ) {  
        errores.push("* No ingresó todos los campos <br/>");
    }

    if (password.length < 6) {
        errores.push("* La contraseña debe contener 6 caracteres <br/>");
    }

    if (!emailRegex.test(email)) {
        errores.push("* Ingrese un email válido <br/>");
    }

    if( /^\d+$/.test(telefono)) {
        errores.push("* Ingrese un telefono válido <br/>");
    }
    
    if(!terminosChecked) {
        errores.push("* Debe aceptar los términos please")
    }

    if(!validarRut(rut)) {
        errores.push("* Rut incorrecto");
    }
    for (let i = 0; i < errores.length; i++) {
        $("#error-alerta").append(errores[i]);
    }



}

$("#contacto-btn").on("click", (e) => {
    validarForm(e);
    console.log(errores);
    if(errores.length === 0) {
        $("#error-alerta").addClass("d-none");
        alert("Datos enviados. Muchas gracias :)")
    } else if (errores.length >= 1) {
        $("#error-alerta").removeClass("d-none")
    }
})



function validarRut(rut) {
    rut = rut.replace(/[^0-9kK]/g, '')

    let digitoVerificador = rut.charAt(rut.length - 1);
    let rutNumerico = parseInt(rut.slice(0, -1), 10);
    let suma = 0;
    let multiplicador = 1;

    while (rutNumerico > 0) {
        multiplicador++;
        if (multiplicador === 8) {
            multiplicador = 2;
        }
        suma += (rutNumerico % 10) * multiplicador;
        rutNumerico = Math.floor(rutNumerico / 10);
    }
    let resto = suma % 11;
    let digitoCalculado = (11 - resto).toString();
    if (digitoCalculado === '10') {
        digitoCalculado = 'K';
    } else if (digitoCalculado === '11') {
        digitoCalculado = '0';
    }
    return digitoVerificador === digitoCalculado;
}