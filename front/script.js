$(document).ready(function () {

    $('.crearUsuario').on('click', function() {
        $('#crearUsuarioForm').show();
    });
    // Mostrar el primer usuario
    $('.mostrarPrimero').on('click', function () {
        $.ajax({
            url: 'http://localhost:5000/usuarios/usuario1', // URL del endpoint
            method: 'GET',
            success: function (usuario) {
                $('.usuarios').html(`
                    <div class="carta">
                        <h3>ID: ${usuario.id}</h3>
                        <p>Nombre: ${usuario.nombre}</p>
                        <p>Apellido: ${usuario.apellido}</p>
                    </div>
                `);
            },
        });
    });

    // Mostrar todos los usuarios
    $('.sacarTodos').on('click', function () {
        $.ajax({
            url: 'http://localhost:5000/usuarios',
            method: 'GET',
            success: function (usuarios) {
                $('.usuarios').html('');
                usuarios.forEach(usuario => {
                    $('.usuarios').append(`
                        <div class="carta">
                            <h3>ID: ${usuario.id}</h3>
                            <p><strong>Nombre:</strong> ${usuario.nombre}</p>
                            <p><strong>Apellido:</strong> ${usuario.apellido}</p>
                        </div>
                    `);
                });
            },
        });
    });

    // Crear un nuevo usuario
    $('#crearUsuarioForm').on('submit', function (e) {
        e.preventDefault();

        const nombre = $('#nombre').val();
        const apellido = $('#apellido').val();

        $.ajax({
            url: 'http://localhost:5000/api/usuarios',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ nombre, apellido }),
            success: function () {
                alert(`Usuario creado coorectamente`);
                $('#crearUsuarioForm')[0].reset();
                $('#crearUsuarioForm').hide();
            }
        });
    });

    // Buscar usuario por ID
    $('#buscarUsuarioForm').on('submit', function (e) {
        e.preventDefault();

        const userId = $('#usuarioId').val();

        $.ajax({
            url: `http://localhost:5000/usuarios/${userId}`, // URL con el ID especificado
            method: 'GET',
            success: function (usuario) {
                $('.usuarios').html(`
                    <div class="carta">
                        <h3>ID: ${usuario.id}</h3>
                        <p>Nombre: ${usuario.nombre}</p>
                        <p>Apellido: ${usuario.apellido}</p>
                    </div>
                `);
            },
            error: function () {
                $('.usuarios').html('<p>No se encontro el id.</p>');
            }
        });
    });

});
