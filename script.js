document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('consultaForm');
    const motivoConsulta = document.getElementById('motivoConsulta');
    const tipoConsulta = document.getElementById('tipoConsulta');
    const ctaButton = document.getElementById('ctaButton');

    const motivosPresenciales = ['Problemas de crecimiento', 'Pubertad', 'Enfermedades de la tiroides'];

    function updateFormOptions() {
        const motivoSeleccionado = motivoConsulta.value;
        const tipoSeleccionado = tipoConsulta.value;

        if (motivosPresenciales.includes(motivoSeleccionado)) {
            tipoConsulta.value = 'Presencial';
            tipoConsulta.disabled = true;
        } else {
            tipoConsulta.disabled = false;
        }

        if (tipoSeleccionado === 'En línea') {
            Array.from(motivoConsulta.options).forEach(option => {
                option.disabled = motivosPresenciales.includes(option.value);
            });
        } else {
            Array.from(motivoConsulta.options).forEach(option => {
                option.disabled = false;
            });
        }
    }

    motivoConsulta.addEventListener('change', updateFormOptions);
    tipoConsulta.addEventListener('change', updateFormOptions);

    form.addEventListener('input', function() {
        const isFormValid = form.checkValidity();
        ctaButton.classList.toggle('active', isFormValid);
    });

    ctaButton.addEventListener('click', function(e) {
        if (!form.checkValidity()) {
            e.preventDefault();
            alert('Por favor, complete todos los campos del formulario antes de agendar una consulta.');
        } else {
            const nombre = document.getElementById('nombre').value;
            const edad = document.getElementById('edad').value;
            const motivo = motivoConsulta.value;
            const tipo = tipoConsulta.value;
            const email = document.getElementById('email').value;
            const ciudad = document.getElementById('ciudad').value;
            const pais = document.getElementById('pais').value;

            const mensaje = encodeURIComponent(`Hola, mi nombre es ${nombre} de ${edad} años de edad. De ${ciudad} en ${pais}. Quisiera una cita con la doctora Laura Santos. El tipo de consulta es ${tipo} y el motivo es ${motivo}.\nCorreo electrónico: ${email}.\nGracias.`);

            ctaButton.href = `https://wa.me/529812283004?text=${mensaje}`;
        }
    });
});