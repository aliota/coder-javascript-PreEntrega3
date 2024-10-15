// Constantes
const IVA = 0.22;
const mensajeContinuarOSalir = "Elija Aceptar para continuar o Cancelar para salir del simulador";
const mensajeCarritoOSalir = "Elija Aceptar para comenzar de nuevo o Cancelar para salir del simulador";
const resumenCarrito = "Resumen del carrito de compras";

// Inicializar Items Disponibles
const ITEMS = ["institucional","personal","micrositio","blog","educativo","ecommerce","portal","noticias","foro","redes"];     
const PRECIOS = [1000.00, 500.00, 600.00, 400.00, 700.00, 2000.00, 3000.00, 1500.00, 300.00, 2500.00];
const itemsDisponibles = [];
agregarItemsDisponibles(itemsDisponibles,ITEMS,PRECIOS);
console.log(itemsDisponibles);

// Inicializar descuentos
const dto0 = new Descuento("",0);
const dto5 = new Descuento("abc5",0.05);
const dto10 = new Descuento("def10",0.10);
const descuentosDisponibles = [dto0,dto5,dto10];
console.log(descuentosDisponibles);


//Simular carrito
const carrito = new Carrito(itemsDisponibles,descuentosDisponibles);
console.log(carrito);
//carrito.simulador();
let formulario = document.getElementById("formPremium");
let verCarrito = formulario.addEventListener("submit",sitioYCantidad);  
