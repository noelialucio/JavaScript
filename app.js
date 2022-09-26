
let total = 0
let usuario = prompt("Ingresa tu nombre");
let opcion;
let pedido=[]
let idCombos;
let totalAMostrar = document.createElement("div");
let pedidoAMostrar = document.createElement("h6");



class Combos{
    constructor (nombre, precio, id) {
    this.nombre = nombre;
    this.precio = precio;
    this.id = id ;
    }
}

const combo1 = new Combos("1 Pizza + 1 Bebida",1200, "1");
const combo2 = new Combos("1 Docena de empanadas + 1 Bebida", 1700,"2");
const combo3 = new Combos("2 Pizzas + 1 Bebida", 2200, "3");
const combo4 = new Combos("1 Pizza + 1 Docena de empanadas + 1 Bebida",2500,"4");



alert(`Bienvenidx a tu pizzeria favorita ${usuario} ! A continuacion elegi lo que quieras comer... `)

const comboUno = document.querySelector ("#ComboUno");
comboUno.addEventListener ("click", ()=> {
    elegirComida (combo1)
});

const comboDos = document.querySelector ("#ComboDos");
comboDos.addEventListener ("click", ()=> {
    elegirComida (combo2)
});

const comboTres = document.querySelector ("#ComboTres");
comboTres.addEventListener ("click", ()=> {
    elegirComida (combo3)
});


const comboCuatro = document.querySelector ("#ComboCuatro");
comboCuatro.addEventListener ("click", ()=> {
    elegirComida (combo4)
});

function elegirComida(combo){
    idCombos =  combo.nombre
    total += combo.precio;
    pedido.push(idCombos)
    VerificarPedidoEnSessionStorage(pedido)
    totalAMostrar.innerHTML = `<h3>Total: $ ${total}</h3>`
    pedidoAMostrar.innerHTML = pedido
    document.body.appendChild(totalAMostrar);
    document.body.appendChild(pedidoAMostrar);
    VerificarComboEnLocalStorage(combo)
 };

 function VerificarPedidoEnSessionStorage(pedido){
    const pedidoString = JSON.stringify(pedido)
    sessionStorage.setItem('combos', pedidoString);
    const pedidoSessionStorage =  sessionStorage.getItem('combos');
}

function VerificarComboEnLocalStorage(combo){
    const comboString = JSON.stringify(combo)
    localStorage.setItem(combo.id, comboString);
    const comboLS =  localStorage.getItem(combo.id); 
}

const vaciarCarrito = document.querySelector("#vaciarCarrito");
vaciarCarrito.onclick = function () {
    total=0;
    pedido = [];
    totalAMostrar.innerHTML = `<h3>Total: $ ${total}</h3>`
    pedidoAMostrar.innerHTML = 'No selecciono ningun combo.'
    document.body.appendChild(totalAMostrar);
    document.body.appendChild(pedidoAMostrar);
    localStorage.clear();
    sessionStorage.clear ();
}

const finalizarPedido = document.querySelector ("#finalizarPedido");
finalizarPedido.addEventListener ("click", ()=> {
    alert("Tenes que abonar" + " " + total);
    alert(`${usuario}, ingresa tus datos para el envio`);
    direccion = prompt("Ingresa la direccion de envio");
    telefono = prompt("Ahora ingresa tu numero de telefono");
    alert(`${usuario}, en un rato recibiras tu comida en ${direccion}! Ante cualquier inconveniente te llamaremos al ${telefono}`);
          
    
});

