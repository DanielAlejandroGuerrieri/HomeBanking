//Declaración de variables
var dineroActual = 0;
const nombreUsuario = 'Daniel';
const passUsuario = 3264;
var saldoCuenta = 10000;
var limiteExtraccion = 3000;
var nombreServicio = ['Agua', 'Teléfono', 'Luz', 'Internet'];
var precioServicio = [350, 425, 210, 570];
var nombreCuenta = ['Cuenta amiga 1', 'Cuenta amiga 2'];
var numeroCuenta = [1234567, 7654321];



//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla(dineroActual);
    actualizarLimiteEnPantalla();
    iniciarSesion();
}

//inicio de sesión
function iniciarSesion() {
    var usuarioActual = prompt('Ingrese el usuario: ');
    if (usuarioActual === nombreUsuario) {
        var passIngresado = parseInt(prompt('Ingrese la contraseña numerica de 4 digitos: '));
        if (passIngresado === passUsuario) {
            alert('Bienvenido/a ' + nombreUsuario + ' ya puedes comenzar a realizar operaciones');
            cargarNombreEnPantalla(nombreUsuario);
            actualizarSaldoEnPantalla(saldoCuenta);
        } else {
            alert('No coincide la contraseña.');
            iniciarSesion();
        }
    } else {
        alert('Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad.');
        actualizarSaldoEnPantalla(0);
    }
}


//Funcione de suma para agregar dinero
function agregarDinero(dinero) {
    saldoCuenta += dinero;
}

//Funcione de extaccion
function sacarDinero(dinero) {
    saldoCuenta -= dinero;
}

// Validar por valores mayores a cero o no numericos.
function validar(valor) {
    if (!isNaN(valor) && valor > 0 && null !== valor) {
        return true;
    } else {
        if (isNaN(valor)) {
            return false;
        }
        alert('Valor inválido');
        return false;
    }
}


//Verificar que sean montos divisibles por 100
function soloBilletesDe100(dinero) {
    if ((dinero % 100) == 0) {
        return true;
    } else {
        alert('Solo entrega billetes de 100.');
        return false;
    }
}

//Verificar que el monto no exceda el limite de extracción.
function excedeLimiteDeExtraccion(dinero) {
    if (dinero <= limiteExtraccion) {
        return true;
    } else {
        alert('Su limite de extracción es de: ' + limiteExtraccion);
        return false;
    }
}

//Verificar si el hay saldo disponible.
function haySaldoDisponible() {
    return saldoCuenta > 0;
}

//Funciones a completar
function cambiarLimiteDeExtraccion() {
    limiteExtraccion = parseInt(prompt('Nuevo limite de extraccion: '));
    if (validar(limiteExtraccion)) {
        actualizarLimiteEnPantalla();
        alert('Su nuevo limite de extraccion es: ' + limiteExtraccion);
    }
}

//Función de extracción de dinero
function extraerDinero() {
    var saldoAnterior = saldoCuenta;
    var dineroExtraido = parseInt(prompt('Ingrese el monto a extraer: '));
    if (validar(dineroExtraido) && excedeLimiteDeExtraccion(dineroExtraido) && soloBilletesDe100(dineroExtraido)) {
        sacarDinero(dineroExtraido);
        actualizarSaldoEnPantalla(saldoCuenta);
        alert('Dinero extraido: $' + dineroExtraido + '\nSaldo anterior: $' + saldoAnterior + '\nSaldo actual: $' + saldoCuenta);
    }

}

//Función para realizar el depósito de dinero.
function depositarDinero() {
    var saldoAnterior = saldoCuenta;
    var dineroDepositado = parseInt(prompt('Ingrese el monto a depositar: '));
    if (validar(dineroDepositado)) {
        agregarDinero(dineroDepositado);
        actualizarSaldoEnPantalla(saldoCuenta);
        alert('Has depositado: $' + dineroDepositado + '\nSaldo anterior: $' + saldoAnterior + '\nSaldo actual: $' + saldoCuenta);
    }
}

//Seccion para el pago de servicios.
function pagarServicio() {
    var mostrar = '';
    for (var i = 0; i < nombreServicio.length; i++) {
        var indice = i + 1;
        mostrar = mostrar + indice + '-' + nombreServicio[i] + ': $' + precioServicio[i] + '\n';
    }
    var opcion = parseInt(prompt('Ingrese el número del servicio que desea abonar:\n' + mostrar));
    if (validar(opcion)) {
        switch (opcion) {
            case 1:

                servicioAPagar(opcion);
                pagarServicio();
                break;
            case 2:
                servicioAPagar(opcion);
                pagarServicio();

                break;
            case 3:
                servicioAPagar(opcion);
                pagarServicio();
                break;
            case 4:
                servicioAPagar(opcion);
                pagarServicio();
                break;

            default:
                break;
        }
    }
}

function servicioAPagar(opcion) {
    var indice = opcion - 1;
    if (precioServicio[indice] <= saldoCuenta) {
        var precioPrevio = precioServicio[indice];
        var saldoCuentaAnterior = saldoCuenta;
        sacarDinero(precioServicio[indice]);
        actualizarSaldoEnPantalla(saldoCuenta);
        alert('Has pagado el servicio ' + nombreServicio[indice] + '\nSaldo anterior: $' + saldoCuentaAnterior + '\nDinero descontado: $' + precioPrevio + '\nSaldo actual: $' + saldoCuenta);
    } else {
        alert('No hay suficiente saldo en tu cuenta para pagar este servicio.');
    }
}

function transferirDinero() {
    var dineroATransferir = parseInt(prompt('Ingrese el monto a transferir: '));
    if (validar(dineroATransferir)) {
        if (dineroATransferir <= saldoCuenta) {
            var indice = numeroCuenta.indexOf(parseInt(prompt('Ingrese el numero de cuenta al que desea transferir: \nCuenta Amiga 1:  1234567\nCuenta Amiga 2:  7654321.')));
            if (indice != -1) {
                sacarDinero(dineroATransferir);
                actualizarSaldoEnPantalla(saldoCuenta);
                alert('Se han transferido $' + dineroATransferir + '\nCuenta destino: ' + nombreCuenta[indice]);
            } else {
                alert('Solo puede transferirse dinero a una cuenta amiga');
            }
        } else {
            alert('No se puede transferir ese monto, no tiene el saldo suficiente.');
        }
    }
}


//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla(nombre) {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombre;
}

function actualizarSaldoEnPantalla(saldo) {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldo;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}