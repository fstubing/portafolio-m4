let usuarios = [
    {
        nombre: "Pedro",
        password: "123456",
        correo: "pedro@gmail.com"
    },
    {
        nombre: "Carlos",
        password: "123456",
        correo: "carlos@gmail.com"
    },

]

function capturador(){
document.getElementById("form-login").addEventListener("submit", function(event){
    event.preventDefault();
    let nombre = document.getElementById("login-nombre").value;
    let password = document.getElementById("login-password").value;

    let encontrado = usuarios.find(usuario => usuario.nombre == nombre && usuario.password == password)

    if(encontrado){
        Swal.fire('Usuario autenticado')
        location.replace(encodeURIComponent("./inventario.html"))
    }else{
        Swal.fire('Datos incorrectos');
    }
})
}

capturador()



