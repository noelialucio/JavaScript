//DECLARACION DE VARIABLES
let total = 0;
if (!localStorage.getItem('usuario')) {
    let usuario = prompt("Ingresa tu nombre");
    const usuarioString = JSON.stringify(usuario)
    localStorage.setItem('usuario', usuarioString);
}

let opcion;
let pedido = []
let idCombos;
let totalAMostrar = document.createElement("div");
let pedidoAMostrar = document.createElement("h6");


//CONSTRUCTOR
class Combos {
    constructor(nombre, precio, id) {
        this.nombre = nombre;
        this.precio = precio;
        this.id = id;
    }
}

//INSTANCIANDO OBJETOS
const combo1 = new Combos("1 Pizza + 1 Bebida", 1200, "1");
const combo2 = new Combos("1 Docena de empanadas + 1 Bebida", 1700, "2");
const combo3 = new Combos("2 Pizzas + 1 Bebida", 2200, "3");
const combo4 = new Combos("1 Pizza + 1 Docena de empanadas + 1 Bebida", 2500, "4");



alert(`Bienvenidx a tu pizzeria favorita ${localStorage.getItem('usuario')} ! A continuacion elegi lo que quieras comer... `)

//EVENTOS 

const comboUno = document.querySelector("#ComboUno");
comboUno.addEventListener("click", () => {
    elegirComida(combo1);
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Agregaste el COMBO 1 a tu pedido!',
        showConfirmButton: false,
        timer: 1500
    })
});

const comboDos = document.querySelector("#ComboDos");
comboDos.addEventListener("click", () => {
    elegirComida(combo2);
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Agregaste el COMBO 2 a tu pedido!',
        showConfirmButton: false,
        timer: 1500
    })
});

const comboTres = document.querySelector("#ComboTres");
comboTres.addEventListener("click", () => {
    elegirComida(combo3);
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Agregaste el COMBO 3 a tu pedido!',
        showConfirmButton: false,
        timer: 1500
    })
});


const comboCuatro = document.querySelector("#ComboCuatro");
comboCuatro.addEventListener("click", () => {
    elegirComida(combo4);
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Agregaste el COMBO 4 a tu pedido!',
        showConfirmButton: false,
        timer: 1500
    })
});

//AGREGAR COMIDA A PEDIDO

function elegirComida(combo) {
    idCombos = combo.nombre
    total += combo.precio;
    pedido.push(idCombos)
    VerificarPedidoEnSessionStorage(pedido)
    totalAMostrar.innerHTML = `<h3>Total: $ ${total}</h3>`
    pedidoAMostrar.innerHTML = pedido
    document.body.appendChild(totalAMostrar);
    document.body.appendChild(pedidoAMostrar);
    VerificarComboEnLocalStorage(combo)
};

//GUARDANDO INFO EN STORAGE
function VerificarPedidoEnSessionStorage(pedido) {
    const pedidoString = JSON.stringify(pedido)
    sessionStorage.setItem('combos', pedidoString);
    const pedidoSessionStorage = sessionStorage.getItem('combos');
}

function VerificarComboEnLocalStorage(combo) {
    const comboString = JSON.stringify(combo)
    localStorage.setItem(combo.id, comboString);
    const comboLS = localStorage.getItem(combo.id);
}



//LIMPIAR PEDIDO
const vaciarCarrito = document.querySelector("#vaciarCarrito");
vaciarCarrito.onclick = function () {
    vaciar();
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Eliminar tu pedido',
        ConfirmButtonText: 'ELIMINAR',
        
    });
   

}

//LIMPIAR PEDIDO
const cerrarSesion = document.querySelector("#cerrarSesion");
cerrarSesion.onclick = function () {
    vaciar();
    location.reload();
}

//FINALIZAR PEDIDO Y VACIAR CARRITO

const finalizarPedido = document.querySelector("#finalizarPedido");
 finalizarPedido.addEventListener("click", async() => {
   
    const {
        value: formValues
    } = await Swal.fire({
        title: `${localStorage.getItem('usuario')}, ingresa tus datos para el envio`,
        html: '<input id="swal-input1" class="swal2-input">' +
              '<input id="swal-input2" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.innerHTML= 'Enviaremos tu pedido a ',
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value,
            ]
        }
    })

    if (formValues) {
        Swal.fire(JSON.stringify(formValues))
    }
   

    vaciar();
});


//FUNCION REUTILIZABLE PARA VACIAR CARRITO
function vaciar() {
    total = 0;
    pedido = [];
    totalAMostrar.innerHTML = `<h3>Total: $ ${total}</h3>`
    pedidoAMostrar.innerHTML = 'No selecciono ningun combo.'
    document.body.appendChild(totalAMostrar);
    document.body.appendChild(pedidoAMostrar);
    localStorage.clear();
    sessionStorage.clear();
   
}