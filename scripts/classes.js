class Item{
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }  
}

class Descuento{
    constructor(id, valor){
        this.id = id;
        this.valor = valor;        
    }
    aplicarDescuento(importe) {
        return(importe*(1-this.valor));            
    }
}

class Carrito{
    constructor(itemsDisponibles,descuentosDisponibles){
        this.itemsPedidos = [];
        this.itemsDisponibles = itemsDisponibles;
        this.descuentosDisponibles = descuentosDisponibles;        
    }
    vaciarCarrito(){
        this.itemsPedidos = [];
    }

    articuloValido(numeroArticulo){
        if((numeroArticulo>0)&&(numeroArticulo<=this.itemsDisponibles.length)){
            return true;                    
        }else{
            return false;
        }
    }

    darNombreArticulo(numeroArticulo){
        if(this.articuloValido(numeroArticulo)){
            return this.itemsDisponibles[numeroArticulo-1].nombre;                    
        }else{
            alert("Número de artículo incorrecto");
            return "Descatalogado";
        }
    }
    darPrecio(numeroArticulo){
        if(this.articuloValido(numeroArticulo)){
            return this.itemsDisponibles[numeroArticulo-1].precio;                     
        }else{
            alert("Número de artículo incorrecto");
            return 0;
        }
    }
    darCantidad(numeroArticulo){
        if(this.articuloValido(numeroArticulo)){
            const articulo = this.itemsPedidos.find((elem) => elem.numeroArticulo === numeroArticulo);
            if( articulo == undefined){
                return 0;                 
            }else{
                return articulo.cantidad;
            }                             
        }else{
            alert("Número de artículo incorrecto");
            return 0; 
        }   
    }    
    agregarArticulo(numeroArticulo, cantidad){
        if(this.articuloValido(numeroArticulo)){
            const articulo = this.itemsPedidos.find((elem) => elem.numeroArticulo === numeroArticulo);
            if( articulo == undefined){
                this.itemsPedidos.push({ numeroArticulo: numeroArticulo, cantidad: cantidad });                 
            }else{
                articulo.cantidad += cantidad;
            }                             
        }else{
            alert("Número de artículo incorrecto");
        }                       
    }
    
    quitarArticulo(numeroArticulo, cantidad){
        if(this.articuloValido(numeroArticulo)){
            const articulo = this.itemsPedidos.find((elem) => elem.numeroArticulo === numeroArticulo);
            if( articulo != undefined){
                articulo.cantidad -= cantidad;
                if(articulo.cantidad<0){
                    articulo.cantidad = 0;
                }               
            }                           
        }else{
            alert("Número de artículo incorrecto");
        }   
    }
    
    elegirArticulo(){
        if(this.itemsDisponibles.length>0){
            let mensaje ="Digite el número del artículo que quiere agregar al carrito:\n";
            for (let numeroArticulo=1; numeroArticulo<=this.itemsDisponibles.length;numeroArticulo++){
                mensaje = mensaje + "\nN° "+numeroArticulo+"\tPrecio unitario: "+this.darPrecio(numeroArticulo)+" UYU + IVA\t"+this.darNombreArticulo(numeroArticulo);       
            }
            let entrada = prompt(mensaje);
            return entrada;
        }else{
            return "NOHAYARTICULOSDISPONIBLES";
        }
    }
   pedirArticuloYCantidad(){
        let item = this.elegirArticulo();    
        if ((item!=null)&&(item!="NOHAYARTICULOSDISPONIBLES")){
            let  numeroArticulo = parseInt(item);
            if((numeroArticulo>0) && (numeroArticulo<=this.itemsDisponibles.length)){
                //Número de item correcto, pedir cantidad
                let entradaCantidad = prompt("Agregar cantidad de "+this.darNombreArticulo(numeroArticulo));
                if (entradaCantidad != null){
                    let cantidad = parseInt(entradaCantidad);
                    if (cantidad>0){
                        this.agregarArticulo(numeroArticulo, cantidad);
                        alert("Se agregó al carrito "+cantidad+ " "+this.darNombreArticulo(numeroArticulo));                
                    }else {
                        alert("No se agregaron elementos al carrito");
                    }
                }else{
                    alert("No se agregaron elementos al carrito");
                }
            }else{
                alert("N° de artículo incorrecto");            
            }
        }
        return (item);      
    }
    
    subtotalCarrito(descuento){                     
        return this.itemsPedidos.reduce((acumulador,elem) => acumulador + elem.cantidad * descuento.aplicarDescuento(this.darPrecio(elem.numeroArticulo)),0);          
    }
    
    mostrarCarrito(){   
        let mensaje ="Carrito:\n";              
        for(const elem of this.itemsPedidos){
            mensaje = mensaje + "\n"+elem.cantidad+" "+this.darNombreArticulo(elem.numeroArticulo)+"\n Precio unitario: "+this.darPrecio(elem.numeroArticulo)+" UYU + IVA   Precio subtotal: "+(this.darPrecio(elem.numeroArticulo)*elem.cantidad)+" UYU + IVA";
        }
        return (confirm(mensaje));
        
    }
    
    mostrarCarritoDto(descuento){
        let mensaje ="Carrito:\n";
        let precio = 0;
        let precioConDescuento = 0;
        let precioSubtotalConDescuento = 0;
        let subtotal = 0;
        for(const elem of this.itemsPedidos){           
            precio = this.darPrecio(elem.numeroArticulo);
            precioConDescuento = descuento.aplicarDescuento(precio);
            precioSubtotalConDescuento = precioConDescuento*elem.cantidad;
            mensaje = mensaje + "\n"+elem.cantidad+" "+this.darNombreArticulo(elem.numeroArticulo)+"\n   Precio unitario: "+precio+" UYU + IVA\n   Precio unit. con "+descuento.valor*100+"% dto: "+ precioConDescuento+" UYU + IVA\n   Precio subtotal: "+precioSubtotalConDescuento+" UYU + IVA\n";
            subtotal += precioSubtotalConDescuento;            
        }   
        console.log("Total carrito con descuento = "+subtotal+" UYU + IVA");
        console.log("Total carrito con descuento IVA incluido = "+subtotal*(1+IVA)+" UYU + IVA"); 
        return(confirm(mensaje+"\nTotal con "+descuento.valor*100+"% dto: "+subtotal+" UYU\nIVA "+IVA*100+"%: "+(subtotal*IVA)+" UYU\nTotal IVA incluido: "+(subtotal*(1+IVA))+" UYU"));    
    }
    
    cargarCarrito(){
        let item = 0;   
        let continuar = false; 
        let verCarrito = false;
        do {
            item = this.pedirArticuloYCantidad();
            if ((item!=null)&&(item!="NOHAYARTICULOSDISPONIBLES")){
                continuar = confirm("¿Desea agregar más artículos?");   
                verCarrito = true; 
            }else if (item =="NOHAYARTICULOSDISPONIBLES"){  
                alert("Lo sentimos no hay artículos disponibles por el momento");
                continuar = false;
                verCarrito = false; 
            }else{ 
                continuar = false;              
            }          
        } while (continuar);    
        return(verCarrito); 
    }
    
    aplicarDescuentoCarrito(){
        let intentoDto = 0;
        const salida = new Descuento("",0);
        let ingresaDescuento = confirm("¿Desea ingresar un código de descuento?");                   
        while(ingresaDescuento && (intentoDto<3)){           
            let codigoDto = prompt("Ingrese código de descuento:");
            intentoDto++;
            const descuento = this.descuentosDisponibles.find((elem)=>elem.id===codigoDto);
            if (descuento!=undefined){
                salida.valor = descuento.valor;
                salida.id = descuento.id;                
                alert("Se aplica un "+salida.valor*100+"% de descuento");
                ingresaDescuento = false;
            }else{
                if (intentoDto<3){
                    ingresaDescuento = confirm("Código de descuento incorrecto. ¿Desea volver a ingresar el código?");
                }else{
                    alert("Código de descuento incorrecto");
                    ingresaDescuento = false;
                }
            }                
        } 
        return salida;       
    }
    simulador(){
        // Simulador de carrito de compra
        let comprar = true;
        while(comprar){    
            let verCarrito = this.cargarCarrito();            
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
}
