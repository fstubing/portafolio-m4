let productosStorage = JSON.parse(localStorage.getItem("productos")) || [];
let rescateDelCarrito = productosStorage.slice()
console.log(rescateDelCarrito)

let productos = [
    {
        sku: "a1",
        nombre: "HORNO A GAS GALILEO 360",
        marca: "Castelnuovo",
        descripcion: "Horno de combustión a gas, con cuerpo completamente de acero inoxidable 430, superficie de piedra refractaria giratoria 360ª y termómetro de cámara integrado.",
        precio: 450000,
        stock: 10,
        imagen1: "./assets/img/horno_gas.jpg",
        imagen2: "./assets/img/horno2.jpg",
        imagen3: "./assets/img/horno3.jpg"
    },
    {
        sku: "a2",
        nombre: "PALA CIRCULAR PARA PIZZA 30 CM.",
        marca: "Sanelli Italy",
        descripcion: "Pala para Pizza ø30 cm Redonda con mango Aluminio 96 cm.",
        precio: 48000,
        stock: 30,
        imagen1: "./assets/img/pala_circular.jpg",
        imagen2: "./assets/img/pala2.jpg",
        imagen3: "./assets/img/pala3.jpg"
    },
    {
        sku: "a3",
        nombre: "AMASADORA PROFESIONAL APK-50",
        marca: "Pareti-Kitchenette",
        descripcion: "Con nuestras amasadoras industriales Pareti-Kitchenette® podrás facilitar el proceso de producción a gran escala, evitando la limpieza exhaustiva de trabajar en un mesón.",
        precio: 1350000,
        stock: 15,
        imagen1: "./assets/img/amasadora.png",
        imagen2: "./assets/img/amasadora2.png",
        imagen3: "./assets/img/amasadora3.png"
    },
    {
        sku: "a4",
        nombre: "BANDEJA PARA PIZZA ø30 ALUMINIO PERFORADA",
        marca: "Castelnuovo",
        descripcion: "Nuestras rejillas para pizza de 30 cm se encuentran fabricadas en aluminio, con ellas podrás hornear una masa mucho más crocante, debido a que la malla ayudará a transferir el calor a la masa.",
        precio: 25990,
        stock: 50,
        imagen1: "./assets/img/bandeja_pizza.jpg",
        imagen2: "./assets/img/bandeja2.jpg",
        imagen3: "./assets/img/bandeja3.jpg"
    },
]

class Producto{
    constructor(sku, nombre = "", marca = "", descripcion = "Sin descripción", precio = 999999, stock = 0){
        this.sku = sku;
        this.nombre = nombre;
        this.marca = marca;
        this.descripcion= descripcion;
        this.precio = precio;
        this.stock = stock;
    }

    getProducts(){
        productosStorage = productosStorage = JSON.parse(localStorage.getItem("productos")) || []
        return productosStorage;
    }
    getProduct(){
        productosStorage = JSON.parse(localStorage.getItem("productos")) || []
        return productosStorage.find(producto => producto.sku == this.sku);
    }
    deleteProduct(){
        productosStorage = JSON.parse(localStorage.getItem("productos")) || []
        productosStorage = productosStorage.filter(producto => producto.sku != this.sku)
        localStorage.setItem("productos", JSON.stringify(productosStorage))
        return productosStorage;
    }
    updateProduct(){
        productosStorage = JSON.parse(localStorage.getItem("productos")) || []
        let producto = productosStorage.find(producto => producto.sku ==this.sku)
        producto.nombre= this.nombre;
        producto.marca= this.marca;
        producto.descripcion= this.descripcion;
        producto.precio = this.precio;
        producto.stock = this.stock;
        localStorage.setItem("productos", JSON.stringify(productosStorage))
        return producto;
    }
    addProduct(){
        productosStorage = JSON.parse(localStorage.getItem("productos")) || []
        productosStorage.push(
            {
                sku: this.sku,
                nombre: this.nombre,
                marca: this.marca,
                descripcion: this.descripcion,
                precio: this.precio, 
                stock: this.stock
            }
            )
            localStorage.setItem("productos", JSON.stringify(productosStorage))
        return productosStorage
    }

}

function cargarTabla(listaProductos){
    let cuerpoTabla = document.querySelector(".section_mantenedor_productos tbody");
    cuerpoTabla.innerHTML = "";

    let acumuladorFilas = "";
    listaProductos.forEach(producto => {
        acumuladorFilas += `
                <tr>
                    <th scope="row">${producto.sku}</th>
                    <td>${producto.nombre}</td>
                    <td>${producto.marca}</td>
                    <td>${producto.descripcion}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.stock}</td>
                </tr>
        `
    });
    cuerpoTabla.innerHTML = acumuladorFilas;

}

function buscarProducto(sku){
    let producto = new Producto(sku);
    return producto.getProduct();
}

crud_form.addEventListener("submit", (event)=>{
    event.preventDefault();
})


//funcion que capture evento del input crud_id

let inputId = document.getElementById("crud_id");
inputId.addEventListener("change", (event) =>{
    event.preventDefault();
    let sku =  inputId.value;
    let producto = buscarProducto(sku);
    if(producto){
        crud_nombre.value = producto.nombre;
        crud_marca.value = producto.marca;
        crud_descripcion.value = producto.descripcion;
        crud_precio.value = producto.precio;
        crud_stock.value = producto.stock;
    }else{
        crud_nombre.value = "";
        crud_marca.value = "";
        crud_descripcion.value = "";
        crud_precio.value = 0;
        crud_stock.value = 0;

    }
})

//AGREGAR PRODUCTOS
document.getElementById("btn-agregar").addEventListener("click", (event)=> {
    event.preventDefault();
    let sku = crud_id.value;
    let nombre = crud_nombre.value;
    let marca = crud_marca.value;
    let descripcion = crud_descripcion.value;
    let precio = crud_precio.value;
    let stock = crud_stock.value;
    
    let nuevoProducto = new Producto(sku, nombre, marca, descripcion, precio, stock);
    if(nuevoProducto.getProduct()){
        Swal.fire("Ya existe un producto con dicho ID.")
    }else{
        nuevoProducto.addProduct();
        cargarTabla(nuevoProducto.getProducts());
    } 
})

//ELIMINAR PRODUCTOS
document.getElementById("btn-eliminar").addEventListener("click", (event)=> {
    event.preventDefault();
    let sku = crud_id.value;
    
    let producto = new Producto(sku);
    if(producto.getProduct()){
        let respuesta = confirm("Está seguro que quiere eliminar el producto con ID: " + producto.sku);
        if(respuesta){
            producto.deleteProduct();
            cargarTabla(producto.getProducts());
        }
        
    }else{
        Swal.fire("El producto que intenta eliminar no existe en la Base de Datos")
    }
    
})

//MODIFICAR PRODUCTOS
document.getElementById("btn-modificar").addEventListener("click", (event)=> {
    event.preventDefault();
    let sku = crud_id.value;
    let nombre = crud_nombre.value;
    let marca = crud_marca.value;
    let descripcion = crud_descripcion.value;
    let precio = crud_precio.value;
    let stock = crud_stock.value;
    
    let producto= new Producto(sku, nombre, marca, descripcion, precio, stock);
    if(producto.getProduct()){
        producto.updateProduct();
        cargarTabla(producto.getProducts());
    }else{
        Swal.fire("El producto que intenta actualizar no existe en la Base de Datos")
    } 
})


function main(){
    let productosStorage = JSON.parse(localStorage.getItem("productos"));
    if(!productosStorage){
        productosStorage = productos;
        localStorage.setItem("productos", JSON.stringify(productosStorage))
    }else{
        localStorage.clear()
        productosStorage = productos;
        localStorage.setItem("productos", JSON.stringify(productosStorage))
    }

    cargarTabla(productosStorage);
}


function cambio(){
    Swal.fire('Cerraste cesión correctamente');
    localStorage.setItem("productos", JSON.stringify(rescateDelCarrito));
    location.replace("./index.html")
  }

main();