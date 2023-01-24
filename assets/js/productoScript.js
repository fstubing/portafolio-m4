export let productos = [
    {
        sku: "a1",
        nombre: "HORNO A GAS GALILEO 360",
        marca: "Castelnuovo",
        descripcion: "Horno de combustión a gas, con cuerpo completamente de acero inoxidable 430, superficie de piedra refractaria giratoria 360ª y termómetro de cámara integrado.",
        precio: 450000,
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
        imagen1: "./assets/img/bandeja_pizza.jpg",
        imagen2: "./assets/img/bandeja2.jpg",
        imagen3: "./assets/img/bandeja3.jpg"
    },
]




let productosCarro=[]

// condición que pregunta si en el local storage hay productos y en caso positivo indica que productosCarro será igual a los productos existentes en el local storage. Se ocupa Json.parse para covertir el código en js
  if(localStorage.getItem("productos")){
    productosCarro = JSON.parse(localStorage.getItem("productos"))
    actualizarCarro(productosCarro)
  }

// función que permite agregar productos al carro. Cuando damos click en el carro se acciona la función que agrega los productos al local storage en forma de objetos. Primero, se inicializa el objeto objProducto. Segundo, se crea la variable productoEncontrado que está relacionada con la condición que se plantea a continuación. Tercero, se establece condición de que en caso que exista productoEncontrado (o sea, en el local storage), en ese caso el agregar producto al carro se representa aumentando la cantidad del objeto producto; en caso de que no exista en el carro en producto agregado, se realiza un push para incluirlo al final del array. Cuarto, se invoca función "actualizarCarro".
  function addToCart(sku){
    let objProducto={
        codigo: sku,
        cantidad: 1
    }

    let productoEncontrado = productosCarro.find(producto => producto.codigo == sku);
    if (productoEncontrado){
        productoEncontrado.cantidad= productoEncontrado.cantidad+1
    } else {
        productosCarro.push(objProducto)
    }

    actualizarCarro(productosCarro)

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto agregado correctamente.',
        showConfirmButton: false,
        timer: 1000
      })
  }

// función que actualiza el contador del carro. Primero busca en el local storage los elementos existentes. Segundo, con reduce se realiza una suma de las cantidades que existe de cada producto en el local storage. Tercero, envío la información al elemento del documento html que contiene el contador
  function actualizarCarro(listadoProductos) {
    localStorage.setItem("productos", JSON.stringify(listadoProductos))
    //document.querySelector("#cantidad-productos").innerText = listadoProductos.length; --> (me actualiza el contador del carrito según el número de objProducto agregados, pero no me sirve si el almacenamiento local los registra aumentando la cantidad del objProducto. Ej. agregé 2 productos sku a1 y 3 productos sku a2, con este código el contador del carrito me registraría solo dos (a1 y a2). Si en el local storage, no fuera aumentando la cantidad sino que los registrara separado, en ese caso el contador indicaría 5)
    const valorInicial = 0;
    const sumaProductos = listadoProductos.reduce(
        (accumulator, producto) => accumulator + producto.cantidad,
        valorInicial
    );
    document.querySelector("#cantidad-productos").innerText = sumaProductos;
  }




// logica de agregar template de producto a la página
let parametro = new URLSearchParams(location.search)
console.log(parametro.get("sku")); //obtenemos los ids de los productos
let idProducto = parametro.get("sku");

let found= productos.find(producto => producto.sku == idProducto);


if(found){
    document.querySelector(".detalle-producto").innerHTML = `
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div id="carouselExampleIndicators" class="carousel slide container mt-3">
                <div class="carousel-indicators text-bg-info">
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src="${found.imagen1}">
                  </div>
                  <div class="carousel-item">
                    <img src="${found.imagen2}">
                  </div>
                  <div class="carousel-item">
                    <img src="${found.imagen3}">
                  </div>
                  <div class="carousel-item">
                  <img src="${found.imagen2}">
                </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon bg-info" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                  <span class="carousel-control-next-icon bg-info" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="row mt-3">
                <h5>${found.marca}</h5>
            </div>
            <div class="row">
                <h2>${found.nombre}</h2>
            </div>
            <div class="row">
                <h2><b>$ ${found.precio} CLP</b></h2>
            </div>
            <div class="row">
                <h6>Descripción</h6>
                <p>${found.descripcion}</p>
            </div>
            <div class="row">
                <button class="btn btn-primary"  onclick="addToCart('${found.sku}')">AGREGAR AL CARRITO</button>
            </div>
        </div>
    </div>
`
}else{
    document.querySelector(".detalle-producto").innerHTML = `
    <h2 class='text-center'>PRODUCTO NO ENCONTRADO</h2>
    <a href="./index.html" class="btn btn-danger d-block text-center m-auto" style="width:200px;'">Volver a la página principal</a>
    `
}