//agrega a 'itemsDisponibles' nuevos items creados a partir de 'items' y 'precios'
function agregarItemsDisponibles(itemsDisponibles,items,precios){
    if(items.length==precios.length){
        id = itemsDisponibles.length+1;
        for(let index=0; index<items.length;index++){
            const item = new Item(id,items[index],precios[index]);
            itemsDisponibles.push(item);
            id++;
        }
    }else{
        alert("Error en carga de ítems");
    }
}

// verifica si numeroArticulo es un artículo válido de itemsDisponibles
function articuloValido(itemsDisponibles,numeroArticulo){
    if((numeroArticulo>0)&&(numeroArticulo<=itemsDisponibles.length)){
        return true;                    
    }else{
        return false;
    }
}

//Devuelve el nombre del artículo si numeroArticulo es un artículo válido de itemsDisponibles o "Descatalogado" en caso contrario
function darNombreArticulo(itemsDisponibles,numeroArticulo){
    if(articuloValido(itemsDisponibles,numeroArticulo)){
        return itemsDisponibles[numeroArticulo-1].nombre;                    
    }else{        
        return "No disponible";
    }
}

//Devuelve el precio del artículo si numeroArticulo es un artículo válido de itemsDisponibles o -1 en caso contrario
function darPrecio(itemsDisponibles,numeroArticulo){
    if(articuloValido(itemsDisponibles,numeroArticulo)){
        return itemsDisponibles[numeroArticulo-1].precio;                     
    }else{
        alert("Número de artículo incorrecto");
        return -1;
    }
}



// codigoSitio(): devuelve el código del sitio elegido si es un valor válido o 0 sino
function codigoSitio(){   
    let sitioElegido = document.getElementById("sitio").value;      
    let resultado = sitioElegido>0? sitioElegido : 0;    
    return resultado;                
}

// cantidadDePaginas(): devuelve la cantidad de páginas elegidas si es un valor válido o 1 sino
function cantidadDePaginas(){            
    let cantidad = parseInt(document.getElementById("cantidad").value);    
    let resultado = cantidad>0? cantidad : 1;    
    return resultado;                 
}

//guarda en local storage el sitio y cantidad ingresado en el formulario de servicios premium
function sitioYCantidad(){
    const resultado = { sitio:codigoSitio(),cantidad:cantidadDePaginas()}; 
    let mensaje = `El sitio no está disponible en este momento`;
    if (articuloValido(itemsDisponibles,resultado.sitio)){
        let nombreSitio = darNombreArticulo(itemsDisponibles,resultado.sitio); 
        mensaje = `Se agregó al carrito ${resultado.cantidad} páginas de un sitio ${nombreSitio}`;          
        let carrito = JSON.parse(localStorage.getItem('carrito'));        
        if (carrito){            
            let sitioExistente = carrito.find((elem)=>elem.sitio === resultado.sitio); 
            if (sitioExistente!=undefined){
                sitioExistente.cantidad += resultado.cantidad;
            }else{
                carrito.push(resultado);
            }
        }
        else{
            carrito = [];
            carrito.push(resultado);
        }            
        localStorage.setItem('carrito',JSON.stringify(carrito));       
    }        
    alert(mensaje);          
}


function simulador(){
    // Simulador de carrito de compra
    let comprar = true;
    while(comprar){    
        let formulario = document.getElementById("formPremium");            
        let verCarrito = formulario.addEventListener("submit",this.cargarCarrito);            
        if (verCarrito){
            let continuar = this.mostrarCarrito();                
            if (continuar){
                let importeAPagar = this.subtotalCarrito(this.descuentosDisponibles[0]);
                if (importeAPagar>0){
                    let pagar = confirm("Importe a pagar "+importeAPagar+" UYU + IVA\n¿Desea pagar ahora?");
                    if (pagar){    
                        let dto = this.aplicarDescuentoCarrito();                 
                        if (!this.mostrarCarritoDto(dto)){
                            comprar = confirm(mensajeCarritoOSalir);
                            if (comprar){
                                this.vaciarCarrito();
                            }               
                        }else{
                            importeAPagar = this.subtotalCarrito(dto);     
                            // Cliente paga
                            alert("Gracias por elegirnos");   
                            this.vaciarCarrito();                                                
                        }                                            
                    }else{
                        comprar = confirm(mensajeCarritoOSalir);
                        if (comprar){
                            this.vaciarCarrito();
                        }
                    }
                }else{
                    comprar = confirm(mensajeCarritoOSalir);
                    if (comprar){
                        this.vaciarCarrito();
                    }
                } 
            }else{
                comprar = confirm(mensajeCarritoOSalir);
                if (comprar){
                    this.vaciarCarrito();
                }
            }
        }else{               
            comprar = confirm(mensajeContinuarOSalir);
        }    
    }
    alert("Gracias por utilizar nuestro simulador ¡Hasta la próxima!");
}



