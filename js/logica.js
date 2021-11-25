const urlbase = 'http://localhost:8080/api/user';

const crear = () => {
    //document.getElementById('txtNombre').value;
    const name = $('#txtName').val();
    const email = $('#txtEmail').val();
    const password = $('#txtPassword').val();
    const confirmar = $('#txtConfirmarPassword').val();

    if (password !== confirmar) {
        mostrarMensaje('Error', 'Las contraseñas no coinciden', true);
        return;
    } else if (password.length < 6 && password.length>50) {
        mostrarMensaje('Error', 'La contraseña debe tener minimo 6 y máximo 50 caracteres', true);
        return;
    } else if(email.length>50){
        mostrarMensaje('Error', 'El correo no puede tener más de 50 caracteres', true);
        return;
    }else if(name.length>80){
        mostrarMensaje('Error', 'El nombre no puede superar 80 caracteres', true);
        return;
    }else if(name == "" || email == "" || password == "" || confirmar == ""){
        mostrarMensaje('Error', 'Todos los campos son obligatorios', true);
        return;
    }

    const validarMail=(email) =>{
        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        //Se muestra un texto a modo de ejemplo, luego va a ser un icono
        if (emailRegex.test(email)) {
            return true;
        } else {
            mostrarMensaje('Error', 'El formato del correo no corresponde', true);
            return false;
        }
    }


    const payload = {
        name: name,
        email: email,
        password: password
    };

    $.ajax({
        url: `${urlbase}/new`,
        type: "POST",
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(payload),
        statusCode: {
            201: function () {
                mostrarMensaje('Confirmacion', 'Cuenta creada de forma correcta');
                //validación de no creación de la cuenta por ya existencia de email
            }
        },
    });
}

const mostrarMensaje = (titulo, cuerpo, error) => {
    //console.log("error",error);
    document.getElementById("titulomensaje").innerHTML = titulo;
    $("#cuerpomensaje").html(cuerpo);
    $("#myToast").removeClass();
    if (error) {
        $("#myToast").addClass("toast bg-danger")
    } else {
        $("#myToast").addClass("toast bg-primary")
    }

    $("#myToast").toast("show");
}

const iniciarSesion = () => {
    const loading = '<img src="img/loading1.gif">';
    $("#loading").html(loading);

    setTimeout(()=>{
        autenticar();
    }, 5000);
}

const autenticar = ()=>{
    const email = $("#txtEmail").val();
    const password = $("#txtPassword").val();

    /* $("#autenticar").click(function(){
         if($.trim($("#email").val()) == "" || $.trim($("#password").val()) == "") {
         alert("Por favor ingrese el correo y la contraseña");
         }else{
             let datos = {
                 email: $("#email").val(),
                 password: $("#password").val()
                 }
                 $.ajax({
                     url:"http://localhost:8080/api/user/"+datos.email+"/"+datos.password,
                     method:"GET",
                     dataType:"json",
                     sucess:function(data){
                         console.log(data);
                     if (respuesta.id===null){
                         mostrarMensaje('Error', 'No existe un usuario', true);
                     }else{
                         mostrarMensaje('Bienvenido '+respuesta.name);

                         setTimeout(()=>{
                             window.location.href = 'index.html';
                         }, 1000);

                     }
                 },
                 error: function (xhr, status) {
                     $("#loading").html("");
                     console.log(xhr);
                     console.log(status);
                     mostrarMensaje('Error', 'Error al validar', true);
                 }
                 });
         }
     });
 */
    if (email.length === 0 || password.length === 0) {
        mostrarMensaje('Error', 'Debe escribir el correo y la contraseña para ingresar', true);
        $("#loading").html("");
        return;
    }else{
        let datos = {
            email: $("#email").val(),
            password: $("#password").val()
        }

        $.ajax({
            url: `${urlbase}/${email}/${password}`,
            type: 'GET',
            dataType: 'json',
            success: function (respuesta) {
                $("#loading").html("");
                console.log(respuesta);
                if (respuesta.id===null){
                    mostrarMensaje('Error', 'No existe un usuario', true);
                }else{
                    mostrarMensaje('Bienvenido '+respuesta.name);

                    setTimeout(()=>{
                        window.location.href = 'index.html';
                    }, 1000);

                }
            },
            error: function (xhr, status) {
                $("#loading").html("");
                console.log(xhr);
                console.log(status);
                mostrarMensaje('Error', 'Error al validar', true);
            }
        });
    }
}