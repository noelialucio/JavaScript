//DECLARACION DE VARIABLES
let opcion;
let pedido = []
let listaCombos = [];
let idCombos;
let combo1;
let combo2;
let combo3;
let combo4;
let armadoShopping;
let totalAMostrar = document.createElement("div");
let pedidoAMostrar = document.createElement("h6");
let total = parseInt(sessionStorage.getItem('total') != null ? parseInt(sessionStorage.getItem('total')) : 0);
let totalCombo1 = parseInt(sessionStorage.getItem('totalCombo1') != null ? parseInt(sessionStorage.getItem('totalCombo1')) : 0);
let totalCombo2 = parseInt(sessionStorage.getItem('totalCombo2') != null ? parseInt(sessionStorage.getItem('totalCombo2')) : 0);
let totalCombo3 = parseInt(sessionStorage.getItem('totalCombo3') != null ? parseInt(sessionStorage.getItem('totalCombo3')) : 0);
let totalCombo4 = parseInt(sessionStorage.getItem('totalCombo4') != null ? parseInt(sessionStorage.getItem('totalCombo4')) : 0);
let contadorCarritoInterno =sessionStorage.getItem('contadorCarritoInterno') != null ? sessionStorage.getItem('contadorCarritoInterno') : 0;
let contadorCombo1 = sessionStorage.getItem('contadorCombo1') != null ? sessionStorage.getItem('contadorCombo1') : 0;
let contadorCombo2 = sessionStorage.getItem('contadorCombo2') != null ? sessionStorage.getItem('contadorCombo2') : 0;
let contadorCombo3 = sessionStorage.getItem('contadorCombo3') != null ? sessionStorage.getItem('contadorCombo3') : 0;
let contadorCombo4 = sessionStorage.getItem('contadorCombo4') != null ? sessionStorage.getItem('contadorCombo4') : 0;
let usuarioNuevo = localStorage.getItem('usuarioNuevo') != undefined ? localStorage.getItem('usuarioNuevo') : undefined;

//Declaracion de constantes seleccionando por Id.
const contadorCarrito = document.querySelector("#contadorCarrito")
const subTotal = document.querySelector("#subTotal")
const comboUno = document.querySelector("#ComboUno");
const comboDos = document.querySelector("#ComboDos");
const comboTres = document.querySelector("#ComboTres");
const comboCuatro = document.querySelector("#ComboCuatro");
const botonCarrito = document.querySelector("#botonCarrito");
const cerrarSesion = document.querySelector("#cerrarSesion");



//Declaracion Clases
class Combos {
    constructor(nombre, precio,agregado,img,id) {
        this.nombre = nombre;
        this.precio = precio;
        this.agregado = agregado;
        this.img = img
        this.id = id;
    }
}

class Usuarios {
    constructor(nombre, direccion,email,telefono) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.email = email
        this.telefono = telefono;
    }
}

//Valores predeterminados HTML
contadorCarrito.innerHTML=contadorCarritoInterno
subTotal.innerHTML = total


//Corroborar que sea un usuario nuevo.
if (!localStorage.getItem('usuarioNuevo')) {
    Swal.fire({
        title: 'Iniciar Sesion',
        html: `<input type="text" id="nombre" class="swal2-input" placeholder="Nombre">
        <input type="text" id="direccion" class="swal2-input" placeholder="Direccion">
        <input type="text" id="telefono" class="swal2-input" placeholder="Telefono">
        <input type="email" id="email" class="swal2-input" placeholder="Email">
        `,
        confirmButtonText: 'Iniciar Sesion',
        focusConfirm: false,
        preConfirm: () => {
        const nombre = Swal.getPopup().querySelector('#nombre').value
        const direccion = Swal.getPopup().querySelector('#direccion').value
        const telefono = Swal.getPopup().querySelector('#telefono').value
        const email = Swal.getPopup().querySelector('#email').value
        if (!nombre || !direccion || !telefono|| !email) {
            Swal.showValidationMessage(`Por favor ingrese todos los datos`)
        }
        return {nombre: nombre, direccion: direccion,telefono: telefono, email : email }
        }
    }).then((result) => {
        Swal.fire(`
        Nombre: ${result.value.nombre}
        Direccion: ${result.value.direccion}
        Telefono: ${result.value.telefono}
        Email: ${result.value.email}
        `.trim())
        usuarioNuevo = new Usuarios(result.value.nombre,result.value.direccion,result.value.email,result.value.telefono)
        const usuarioNuevoString = JSON.stringify(usuarioNuevo)
        localStorage.setItem('usuarioNuevo', usuarioNuevoString);
    }
    
    )
}  


//Llamado al archivo json.
fetch('pizzeria.json')
    .then( (res) => res.json()) 
    .then( (data) => {
        data.forEach((combo) => {
          listaCombos.push(new Combos (combo.nombre,combo.precio,combo.agregado,combo.img,combo.id))
        })
    })
    .catch((error) =>{
      console.log(error)
    })    


//General para armar pedido
async function armarPedido(combo){
    await elegirComida(combo);
    await comidaAgregada(combo.agregado);
    
}

//Cartel success de comida agregada
async function comidaAgregada(titulo){
    Swal.fire({
    position: 'center',
    icon: 'success',
    title: titulo,
    showConfirmButton: false,
    timer: 1500
    })
    ;
}

//AGREGAR COMIDA A PEDIDO
async function elegirComida(combo) {
    idCombos = combo.nombre
    total += combo.precio;
    contadorCarritoInterno++;
    const contadorCarritoInternoString = JSON.stringify(contadorCarritoInterno)
    sessionStorage.setItem('contadorCarritoInterno', contadorCarritoInternoString);
    const totalString = JSON.stringify(total)
    sessionStorage.setItem('total', totalString);
    pedido.push(idCombos)
    subTotal.innerHTML = total
    contadorCarrito.innerHTML = contadorCarritoInterno
    document.body.appendChild(totalAMostrar);
    document.body.appendChild(pedidoAMostrar);
};


//EVENTOS para sumar contadores y totales de los combos.
comboUno.addEventListener("click", () => {
    setTimeout(() =>{
        contadorCombo1++;
        totalCombo1 += combo1.precio;
        const totalCombo1String = JSON.stringify(totalCombo1)
        sessionStorage.setItem('totalCombo1', totalCombo1String);
        const contadorCombo1String = JSON.stringify(contadorCombo1)
        sessionStorage.setItem('contadorCombo1', contadorCombo1String);
        armarPedido(combo1)
    },1000)
});


comboDos.addEventListener("click", () => {
    setTimeout(() =>{
        contadorCombo2++;
        totalCombo2 += combo2.precio;
        const totalCombo2String = JSON.stringify(totalCombo2)
        sessionStorage.setItem('totalCombo2', totalCombo2String);
        const contadorCombo2String = JSON.stringify(contadorCombo2)
        sessionStorage.setItem('contadorCombo2', contadorCombo2String);
        armarPedido(combo2)
    },1000)
});


comboTres.addEventListener("click",  () => {
    setTimeout(() =>{
        contadorCombo3++;
        totalCombo3 += combo3.precio;
        const totalCombo3String = JSON.stringify(totalCombo3)
        sessionStorage.setItem('totalCombo3', totalCombo3String);
        const contadorCombo3String = JSON.stringify(contadorCombo3)
        sessionStorage.setItem('contadorCombo3', contadorCombo3String);
        armarPedido(combo3)
    },1000)
});


comboCuatro.addEventListener("click", () => {
    setTimeout(() =>{
        contadorCombo4++;
        totalCombo4 += combo4.precio;
        const totalCombo4String = JSON.stringify(totalCombo4)
        sessionStorage.setItem('totalCombo4', totalCombo4String);
        const contadorCombo4String = JSON.stringify(contadorCombo4)
        sessionStorage.setItem('contadorCombo4', contadorCombo4String);
        armarPedido(combo4)
    },1000)
});



//CERRAR SESION
cerrarSesion.onclick = function () {
    Swal.fire({
        title: 'Seguro desea cerrar Sesion?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Si,cerrar sesion.',
    }).then((result) => {
        if (result.isConfirmed) {
            
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Sesion cerrada.',
                
            }).then((result) => {
                if (result) {
                    vaciar()
                    localStorage.clear();
                    location.reload();
                }
            });
        } else {
        Swal.fire('La operacion no ha sido realizada', '', 'info')
        }
    })
}


//FUNCION REUTILIZABLE PARA VACIAR CARRITO
function vaciar() {
    total = 0;
    pedido = [];
    totalAMostrar = 0;
    totalCombo1 = 0;
    totalCombo2 = 0;
    totalCombo3 = 0;
    totalCombo4 = 0;
    contadorCarritoInterno = 0;
    contadorCombo1 = 0;
    contadorCombo2 = 0;
    contadorCombo3 = 0;
    contadorCombo4 = 0;
    sessionStorage.clear();
   
}


//Instanciando objetos y carrito para poder tomar los valores del objeto, los pongo en el mismo timeout.
setTimeout(() =>{
    combo1 = listaCombos[0];
    combo2 = listaCombos[1];
    combo3 = listaCombos[2];
    combo4 = listaCombos[3];
    botonCarrito.addEventListener("click",  () => {
       if(total != 0){
           document.body.innerHTML =  
           `<section class="h-100 h-custom" style="background-color: #eee; id= "sectionArmadoShopping">
               <div class="container py-5 h-100">
               <div class="row d-flex justify-content-center align-items-center h-100">
                   <div class="col">
                   <div class="card">
                       <div class="card-body p-4">
                       <div class="row">
                           <div class="col-lg-7">
                               <h5 class="mb-3"><a href="#!" class="text-body"><i
                                       class="fas fa-long-arrow-alt-left me-2"></i>Pedido</a></h5>
                               <hr>
               
                           <div class="card mb-3">
                               <div class="card-body">
                               <div class="d-flex justify-content-between">
                                   <div class="d-flex flex-row align-items-center">
                                   <div>
                                       <img
                                       src=${combo1.img}
                                       class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                                   </div>
                                   <div class="ms-3">
                                       <h5>${combo1.nombre}</h5>
                                   </div>
                                   </div>
                                   <div class="d-flex flex-row align-items-center">
                                   <div style="width: 50px;">
                                       <h5 class="fw-normal mb-0">${contadorCombo1}</h5>
                                   </div>
                                   <div style="width: 80px;">
                                       <h5 class="mb-0">$${totalCombo1}</h5>
                                   </div>
                                   <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
                                   </div>
                               </div>
                               </div>
                           </div>
               
                           <div class="card mb-3">
                               <div class="card-body">
                               <div class="d-flex justify-content-between">
                                   <div class="d-flex flex-row align-items-center">
                                   <div>
                                       <img
                                       src=${combo2.img}
                                       class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                                   </div>
                                   <div class="ms-3">
                                       <h5>${combo2.nombre}</h5>
                                   </div>
                                   </div>
                                   <div class="d-flex flex-row align-items-center">
                                   <div style="width: 50px;">
                                       <h5 class="fw-normal mb-0">${contadorCombo2}</h5>
                                   </div>
                                   <div style="width: 80px;">
                                       <h5 class="mb-0">$${totalCombo2}</h5>
                                   </div>
                                   <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
                                   </div>
                               </div>
                               </div>
                           </div>
               
                           <div class="card mb-3">
                               <div class="card-body">
                               <div class="d-flex justify-content-between">
                                   <div class="d-flex flex-row align-items-center">
                                   <div>
                                       <img
                                       src=${combo3.img}
                                       class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                                   </div>
                                   <div class="ms-3">
                                   <h5>${combo3.nombre}</h5>
                                   </div>
                                   </div>
                                   <div class="d-flex flex-row align-items-center">
                                   <div style="width: 50px;">
                                       <h5 class="fw-normal mb-0">${contadorCombo3}</h5>
                                   </div>
                                   <div style="width: 80px;">
                                       <h5 class="mb-0">$${totalCombo3}</h5>
                                   </div>
                                   <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
                                   </div>
                               </div>
                               </div>
                           </div>
               
                           <div class="card mb-3">
                               <div class="card-body">
                                   <div class="d-flex justify-content-between">
                                   <div class="d-flex flex-row align-items-center">
                                       <div>
                                       <img
                                           src=${combo4.img}
                                           class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                                       </div>
                                       <div class="ms-3">
                                       <h5>${combo4.nombre}</h5>
                                       </div>
                                   </div>
                                   <div class="d-flex flex-row align-items-center">
                                       <div style="width: 50px;">
                                       <h5 class="fw-normal mb-0">${contadorCombo4}</h5>
                                       </div>
                                       <div style="width: 80px;">
                                       <h5 class="mb-0">$${totalCombo4}</h5>
                                       </div>
                                       <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
                                   </div>
                                   </div>
                               </div>
                               </div>
                           <div class="card mb-3 mb-lg-0">
                               <div class="card-body">
                                   <div class="d-flex justify-content-between">
                                       <button type="button" class="btn btn-danger float-right" id="volverAtras">Volver Atras</button>
                                       <button type="button" class="btn btn-success float-right" id="finalizarPedido">Finalizar Pedido</button>
                                       <button type="button" class="btn btn-danger" id="vaciarCarrito">Vaciar carrito</button>
                                   </div>
                               </div>
                           </div>
                       </div>
                       </div>
                       </div>
                   </div>
                   </div>
               </div>
               </div>
           </section>`
           const finalizarPedido = document.querySelector("#finalizarPedido");
           finalizarPedido.addEventListener("click", async() => {
               Swal.fire({
                   title: 'Deseas finalizar la compra?',
                   showDenyButton: true,
                   showCancelButton: true,
                   confirmButtonText: 'Si',
               }).then((result) => {
                       if (result.isConfirmed) {    
                           const usuarioInterno = usuarioNuevo.nombre != undefined? usuarioNuevo :JSON.parse(usuarioNuevo);
                               Swal.fire(  'Confirmado!', 
                                           usuarioInterno.nombre + '  su compra de:' + pedido +" va hacia su direccion: " + usuarioInterno.direccion +
                                               " con un total de:$" + total +  ".Puede seguir su pedido via email:" + usuarioInterno.email +
                                               ". Ante cualquier inconveniente lo comunicaremos a su telefono:" + usuarioInterno.telefono
                                           ,  
                                           'success'
                                       ).then((result) => {
                                               if (result) {
                                                   vaciar()
                                                   location.reload();
                                               }
                                       });
                       } 
                       else {
                               Swal.fire('La operacion no ha sido realizada', '', 'info')
                               }
                   });
               
           });
           const volverAtras = document.querySelector("#volverAtras");
           volverAtras.addEventListener("click", async() => {
               location.reload();
           });
           const vaciarCarrito = document.querySelector("#vaciarCarrito");
           vaciarCarrito.onclick = function () {

               Swal.fire({
                   title: 'Vaciar Carrito?',
                   showDenyButton: true,
                   showCancelButton: true,
                   confirmButtonText: 'Si',
               }).then((result) => {
                   if (result.isConfirmed) {
                       
                       Swal.fire({
                           position: 'center',
                           icon: 'error',
                           title: 'Carrito vacio.',
                           
                       }).then((result) => {
                           if (result) {
                               vaciar()
                               location.reload();
                           }
                       });
                   } else {
                   Swal.fire('La operacion no ha sido realizada', '', 'info')
                   }
               })

               
           
           
           }    
       }
   });
   },1000)