let producto;
let total = 0
let nombre = prompt("Ingresa tu nombre");
let opcion;



function Combos(nombre, precio, id) {
    this.nombre = nombre;
    this.precio = precio;
    this.id = id ;
    this.disponible = true;
}

const combo1 = new Combos("1 Pizza + 1 Bebida",1200, "4");
const combo2 = new Combos("1 Docena de empanadas + 1 Bebida", 1700,"5");
const combo3 = new Combos("2 Pizzas + 1 Bebida", 2200, "6");
const combo4 = new Combos("1 Pizza + 1 Docena de empanadas + 1 Bebida",2500,"7");
const pizza = new Combos("1 Pizza grande de Muzzarella", 1000, "1");
const doceEmpanadas = new Combos(" Una docena de empanadas", 1500, "2");
const bebida = new Combos("Una gaseosa de 2 litros 1/4",  500, "3");


const menu = [pizza, doceEmpanadas, bebida, combo1, combo2, combo3, combo4]


alert(`Bienvenidx a tu pizzeria favorita ${nombre} ! A continuacion elegi lo que quieras comer... `)

function elegirComida() {
    producto = prompt((`Elegi la opcion que mas te guste 
    1: "1 Pizza" 
    2: "12 Empanadas" 
    3: "1 Bebida"
    4: "1 Pizza + 1 Bebida (COMBO 1)"
    5: "1 Docena de empanadas + 1 Bebida (COMBO 2)"
    6: "2 Pizzas + 1 Bebida (COMBO 3)"
    7: "1 Pizza + 1 Docena de empanadas + 1 Bebida(COMBO 4)" `)

    );
    if (producto === "1") {
        alert(`Elegiste la opcion ${pizza.id} : ${pizza.nombre} para llevar y su valor es $ ${pizza.precio}`);
        total += pizza.precio;
    } else if (producto === "2") {
        alert(`Elegiste  la opcion ${doceEmpanadas.id} : ${doceEmpanadas.nombre} para llevar y su valor es $ ${doceEmpanadas.precio}`);
        total += doceEmpanadas.precio;
    } else if (producto === "3") {
        alert(`Elegiste  la opcion ${bebida.id} : ${bebida.nombre} para llevar y su valor es $ ${bebida.precio}`);
        total += bebida.precio;
    } else if (producto === "4") {
        alert(`Elegiste  la opcion ${ combo1.id} : ${combo1.nombre} para llevar y su valor es $ ${combo1.precio}`);
        total += combo1.precio;
    } else if (producto === "5") {
        alert(`Elegiste ${combo2.id} : ${combo2.nombre} para llevar y su valor es $ ${combo2.precio}`);
        total += combo2.precio;
    } else if (producto === "6") {
        alert(`Elegiste la opcion ${combo3.id}  : ${combo3.nombre} para llevar y su valor es $ ${combo3.precio}`);
        total += combo3.precio;
    } else if (producto === "7") {
        alert(`Elegiste la ocpion ${combo4.id} : ${combo4.nombre} para llevar y su valor es $ ${combo4.precio}`);
        total += combo4.precio
    }
    const pedido =[ ];
    pedido.push (producto, total)
    console.log (pedido)
}



/*function cargarPedido () {
    const pedidoTotal = menu.find ( Combos => Combos.id === producto)
    console.log (pedidoTotal)
}*/

//cargarPedido ()

 //const pedido =[ ];
//pedido.push (producto,total);
//console.log (pedido)

function abonarPedido(direccion, telefono) {
    alert("Tenes que abonar" + " " + total);
    alert(`${nombre}, ingresa tus datos para el envio`);
    direccion = prompt("Ingresa la direccion de envio");
    telefono = prompt("Ahora ingresa tu numero de telefono");
    alert(`${nombre}, en un rato recibiras tu comida en ${direccion}! Ante cualquier inconveniente te llamaremos al ${telefono}`); {
        const datosUsuario = [nombre, direccion, telefono, total];
        console.log(datosUsuario)
    }


}




function finalizarPedido() {


    alert("Gracias por tu compra!!")

}


do {
    elegirComida();
    opcion = prompt(`Vuleva a ingresar una opcion 
        1: Agregar mas comida 
        2: Abonar Pedido
        3: Finalizar Pedido`)
} while (opcion === "1")



do {
    abonarPedido();
    opcion = prompt(`Vuleva a ingresar una opcion 
    2: Modificar datos de envio
    3: Finalizar Pedido`)
} while (opcion === "2")



finalizarPedido()