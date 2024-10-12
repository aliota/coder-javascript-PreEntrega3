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

