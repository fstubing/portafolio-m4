# PROYECTO PORTAFOLIO MÓDULO 4

## CUENTA DE GITHUB

https://github.com/fstubing

## LINK GITHUB PAGES

[Deploy Github Pages](https://fstubing.github.io/portafolio-m4/)

## INTRODUCCIÓN

Proyecto consiste en la continuación de la construcción de un sitio web de e-commerce básico. Respecto al proyecto de los módulos anteriores, se agregó página de administrador de inventario que se ingresa mediante login, además de realizar mejoras de estilo, conforme a lo sugerido en evaluación de ejercicio anterior

## HERRAMIENTAS UTILIZADAS

### 1. USO DE COMANDOS EN TERMINAL
- cd, touch, mkdir y ls

### 2. USO COMANDOS GIT
- git init, add, commit, branch, status, log, push

### 3. USO DE BOOTSTRAP
- Se utilizan componentes carrusel, navbar y tarjetas. Sin mayores cambios respecto al proyecto anterior.

### 4. USO DE HTML
- Extructura de página web se realiza en base a HTML. Sin mayores cambios respecto al proyecto anterior, salvo la nueva página de inventario.

### 5. USO DE CSS
- Estilos del sitio utiliza en parte importante estilos base de bootstrap, pero de todas formas se modifican algunos de ellos y se le entrega estilo en aquellos elementos que no son de bootstrap. Sin mayores cambios respecto al proyecto anterior.

### 6. USO DE JAVASCRIPT
Las principales modificaciones realizadas en comparación al proyecto anterior están dadas en el uso de javascript. Son especialmente relevantes los siguientes aspectos:

#### a.- login.js
- Se establece condición. Si existe el usuario que se loguea, entonces se envía mensaje informando de ello y redirije a página de administrador del inventario, codificando la URL. Si no existe usuario solo se envía mensaje de error.
- La función para cerrar cesión se gatilla al darle click al botón, vaciando el local storage y redirigiendo a la página de inicio.

#### b.- inventory.js
- Se declara variable que contiene productos que se almacenarán en local storage y se representarán en la base de datos.
- Se declara la variable rescateDelCarrito que tiene por objeto captura los elementos que estaban en el local storage antes de ingresar a la página de inventario. La idea es que al salir de la página, esos elementos sean devueltos al local storage
- Se declara array de productos para efectos de que se carguen de entrada al ingresar a la página.
- Se crea una clase denominada Producto. Se le crea un constructor y establecen sus propiedades. Además se le crean una serie de métodos: listar todos los productos, filtrar un producto en particular, borrar producto, actualizar producto y agregar producto. De esta manera se llevan a cabo todas las posibles hipótesis del CRUD (crear, leer, actualizar y borrar).
- Función cargarTabla, encargada de actualizar dinámicamente los productos en la tabla html del inventario.
- Función buscarProducto, encargada de crear el objeto producto en base al sku que se le proporciona a la función.
- Lógica que rellena automáticamente el formulario en el envento que el sku ingresado coincida con alguno de los existentes en la BBDD.
- Lógica que agrega productos a la BBDD. primero, a partir del evento click en el botón de agregar, se declarar variables a las cuales se les asignan los valores ingresados en el formulario. Segundo, se crea un nuevo objeto en base a la clase Producto, a la cual se le asignan como valores de sus propiedades, los ingresados en el formulario. Tercero, se establece condición para el caso de que exista el producto en la base de datos: si es true, entrega mensaje de error y si es false, carga el producto en la base de dato a través de uno de los métodos del objeto creado a partir de la clase Producto.
- Lógica que elimina productos a la BBDD. Primero, a partir del evento click en el botón de eliminar, se declara variable con los valores ingresado en sku y que sirven para crear una nueva instancia de Producto. Luego se declara una variable que contiene un confirm preguntando si se está seguro de eliminar el producto. Finalmente, se establece condición que en caso de que el confirm sea true, se procede a eliminar el producto a través de uno de los métodos del objeto e igualmente actualizar la base.
- Lógica de actualizar productos de la BBDD. Funciona de manera similar a la lógica de agregar productos, pero teniendo como diferencia esencial el resultado del if/else. En este caso, en caso de que existan los productos, se actualizar mediante un método del instancia y en caso contrario, entrega mensaje de error.
- Función main que rellena el local storage con los productos que inicialmente tendrá la BBDD. Si el local storage venía con productos del carrito de compras, en ese caso lo vacía y rellena con la variable productos. Si no tenía productos el local storage, solo rellena.
- Finalmente, la función cambio que se gatilla al dar click en cerrar cesión. Si hacemos logout, devuelve los productos que venían del carrito al local storage y nos redirige al home.
