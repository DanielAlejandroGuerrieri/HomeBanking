var valor = parseInt(prompt('ingrese numero: '));
console.log('- ' + valor + ' -');

if (isNaN(valor) && valor >= 0 && null == valor) {
    alert('no es valido.')
} else {
    valor += 2000;
    alert('numero' + valor);
}
var confirma = confirm('desea continuar?');
console.log(confirma);

console.log(!isNaN(valor) && valor == null);
console.log(valor == null);
console.log(!valor == null);
console.log(isNaN(valor));
console.log(!isNaN(valor));
console.log(isNaN(valor) && null == valor);

var saldoAnterior = 10000;

function extraerDinero() {

    alert('saldo anterior: ' + saldoAnterior);
    var dineroExtraido = parseInt(prompt('Ingrese el monto a extraer: '));
    if (validar(dineroExtraido)) {
        saldoAnterior -= dineroExtraido;
        alert('Dinero extraido: $' + dineroExtraido + '\nSaldo : $' + saldoAnterior + '\nSaldo actual: $');

    } else {
        alert('no es valido');
    }

}


extraerDinero();