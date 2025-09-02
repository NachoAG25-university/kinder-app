/**
 * Libro de Clases Virtual Kinder
 * Aplicación frontend para gestión de asistencia de alumnos
 * 
 * @author Desarrollador Frontend
 * @version 1.0.0
 */

// Variables globales
let alumnos = [];
let fechaActual = new Date().toISOString().split('T')[0];
let modalConfirmacion;
let toastNotificacion;

/**
 * Inicialización de la aplicación
 */
document.addEventListener('DOMContentLoaded', function() {
    inicializarAplicacion();
});

/**
 * Función principal de inicialización
 */
async function inicializarAplicacion() {
    try {
        // Inicializar componentes de Bootstrap
        modalConfirmacion = new bootstrap.Modal(document.getElementById('modalConfirmacion'));
        toastNotificacion = new bootstrap.Toast(document.getElementById('toast-notificacion'));
        
        // Cargar datos de alumnos
        await cargarAlumnos();
        
        // Configurar navegación
        configurarNavegacion();
        
        // Configurar eventos de la vista principal
        configurarVistaPrincipal();
        
        // Configurar eventos de la vista de asistencia
        configurarVistaAsistencia();
        
        // Configurar eventos de la vista de reporte
        configurarVistaReporte();
        
        // Configurar eventos de la vista de reporte mensual
        configurarVistaReporteMensual();
        
        // Configurar botón volver del detalle de alumno
        configurarBotonVolver();
        
        // Establecer fecha actual por defecto
        document.getElementById('fecha-asistencia').value = fechaActual;
        document.getElementById('fecha-reporte').value = fechaActual;
        document.getElementById('mes-reporte-mensual').value = fechaActual.substring(0, 7); // YYYY-MM
        
        console.log('Aplicación inicializada correctamente');
        
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
        mostrarToast('Error al cargar la aplicación', 'error');
    }
}

/**
 * Cargar datos de alumnos desde el archivo JSON
 */
async function cargarAlumnos() {
    try {
        const response = await fetch('data/alumnos.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        alumnos = await response.json();
        console.log(`${alumnos.length} alumnos cargados correctamente`);
    } catch (error) {
        console.error('Error al cargar alumnos:', error);
        // Crear datos de ejemplo si falla la carga
        alumnos = [
            { id: "A001", nombre: "Matías", apellido_paterno: "Pérez", apellido_materno: "González", fecha_nacimiento: "2019-03-15", curso: "Kinder A", apoderado: "Ana González", contacto: "+56 9 1234 5678", foto: "img/alumno1.jpg" },
            { id: "A002", nombre: "Sofía", apellido_paterno: "Rojas", apellido_materno: "López", fecha_nacimiento: "2019-05-20", curso: "Kinder A", apoderado: "Carlos Rojas", contacto: "+56 9 8765 4321", foto: "img/alumno2.jpg" },
            { id: "A003", nombre: "Lucas", apellido_paterno: "Díaz", apellido_materno: "Soto", fecha_nacimiento: "2018-11-02", curso: "Kinder B", apoderado: "Javiera Soto", contacto: "+56 9 5555 4444", foto: "img/alumno3.jpg" },
            { id: "A004", nombre: "Valentina", apellido_paterno: "Silva", apellido_materno: "Morales", fecha_nacimiento: "2019-01-10", curso: "Kinder A", apoderado: "Patricia Morales", contacto: "+56 9 3333 2222", foto: "img/alumno4.jpg" },
            { id: "A005", nombre: "Diego", apellido_paterno: "Morales", apellido_materno: "Vega", fecha_nacimiento: "2018-08-25", curso: "Kinder B", apoderado: "Roberto Vega", contacto: "+56 9 7777 8888", foto: "img/alumno5.jpg" }
        ];
        console.log('Usando datos de ejemplo');
    }
}

/**
 * Configurar navegación entre vistas
 */
function configurarNavegacion() {
    const navInicio = document.getElementById('nav-inicio');
    
    navInicio.addEventListener('click', function(e) {
        e.preventDefault();
        cambiarVista('principal');
    });
}

/**
 * Configurar eventos de la vista principal
 */
function configurarVistaPrincipal() {
    // Configurar botones de navegación
    const botonesNavegacion = document.querySelectorAll('.btn-navegacion');
    
    botonesNavegacion.forEach(boton => {
        boton.addEventListener('click', function() {
            const vista = this.getAttribute('data-vista');
            cambiarVista(vista);
        });
    });
}

/**
 * Cambiar entre vistas de la aplicación
 */
function cambiarVista(vista) {
    const navInicio = document.getElementById('nav-inicio');
    const vistaPrincipal = document.getElementById('vista-principal');
    const vistaAsistencia = document.getElementById('vista-asistencia');
    const vistaReporte = document.getElementById('vista-reporte');
    const vistaDetalleAlumno = document.getElementById('vista-detalle-alumno');
    const vistaReporteMensual = document.getElementById('vista-reporte-mensual');
    
    // Ocultar todas las vistas
    vistaPrincipal.style.display = 'none';
    vistaAsistencia.style.display = 'none';
    vistaReporte.style.display = 'none';
    vistaDetalleAlumno.style.display = 'none';
    vistaReporteMensual.style.display = 'none';
    
    // Remover clases active de navegación
    navInicio.classList.remove('active');
    
    // Mostrar vista correspondiente
    if (vista === 'principal') {
        navInicio.classList.add('active');
        vistaPrincipal.style.display = 'block';
    } else if (vista === 'asistencia') {
        vistaAsistencia.style.display = 'block';
    } else if (vista === 'reporte') {
        vistaReporte.style.display = 'block';
    } else if (vista === 'reporte-mensual') {
        vistaReporteMensual.style.display = 'block';
    } else if (vista === 'detalle-alumno') {
        vistaDetalleAlumno.style.display = 'block';
    }
}

/**
 * Configurar eventos de la vista de asistencia
 */
function configurarVistaAsistencia() {
    const btnCargarFecha = document.getElementById('btn-cargar-fecha');
    const fechaAsistencia = document.getElementById('fecha-asistencia');
    
    btnCargarFecha.addEventListener('click', function() {
        const fecha = fechaAsistencia.value;
        if (fecha) {
            renderizarTablaAsistencia(fecha);
        } else {
            mostrarToast('Por favor seleccione una fecha', 'warning');
        }
    });
    
    // También cargar al cambiar la fecha
    fechaAsistencia.addEventListener('change', function() {
        const fecha = this.value;
        if (fecha) {
            renderizarTablaAsistencia(fecha);
        }
    });
}

/**
 * Configurar eventos de la vista de reporte
 */
function configurarVistaReporte() {
    const btnGenerarReporte = document.getElementById('btn-generar-reporte');
    const fechaReporte = document.getElementById('fecha-reporte');
    
    btnGenerarReporte.addEventListener('click', function() {
        const fecha = fechaReporte.value;
        if (fecha) {
            generarReporte(fecha);
        } else {
            mostrarToast('Por favor seleccione una fecha', 'warning');
        }
    });
    
    // También generar reporte al cambiar la fecha
    fechaReporte.addEventListener('change', function() {
        const fecha = this.value;
        if (fecha) {
            generarReporte(fecha);
        }
    });
}

/**
 * Configurar eventos de la vista de reporte mensual
 */
function configurarVistaReporteMensual() {
    const btnGenerarReporteMensual = document.getElementById('btn-generar-reporte-mensual');
    const mesReporteMensual = document.getElementById('mes-reporte-mensual');
    
    btnGenerarReporteMensual.addEventListener('click', function() {
        const mes = mesReporteMensual.value;
        if (mes) {
            generarReporteMensual(mes);
        } else {
            mostrarToast('Por favor seleccione un mes', 'warning');
        }
    });
    
    // También generar reporte al cambiar el mes
    mesReporteMensual.addEventListener('change', function() {
        const mes = this.value;
        if (mes) {
            generarReporteMensual(mes);
        }
    });
}

/**
 * Configurar botón volver del detalle de alumno
 */
function configurarBotonVolver() {
    const btnVolver = document.getElementById('btn-volver-listado');
    
    if (btnVolver) {
        btnVolver.addEventListener('click', function() {
            cambiarVista('asistencia');
        });
    }
}

/**
 * Renderizar tabla de asistencia para una fecha específica
 */
function renderizarTablaAsistencia(fecha) {
    const contenedor = document.getElementById('lista-alumnos');
    
    // Verificar si ya existe un registro para esta fecha
    const registroExistente = obtenerRegistroAsistencia(fecha);
    
    let html = `
        <div class="table-responsive">
            <table class="table table-hover tabla-asistencia">
                <thead>
                    <tr>
                        <th style="width: 60px;">Foto</th>
                        <th>Alumno</th>
                        <th style="width: 120px;">Asistencia</th>
                        <th>Observaciones</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    alumnos.forEach(alumno => {
        const registroAlumno = registroExistente ? 
            registroExistente.detalle.find(d => d.id === alumno.id) : null;
        
        const presente = registroAlumno ? registroAlumno.presente : true;
        const observaciones = registroAlumno ? registroAlumno.observaciones : '';
        
        html += `
            <tr data-alumno-id="${alumno.id}">
                <td>
                    ${alumno.foto ? 
                        `<img src="${alumno.foto}" alt="${alumno.nombre}" class="foto-alumno" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : 
                        ''
                    }
                    <div class="foto-alumno-placeholder" style="display: ${alumno.foto ? 'none' : 'flex'};">
                        <i class="fas fa-user"></i>
                    </div>
                </td>
                <td>
                    <strong>
                        <a href="#" class="text-decoration-none nombre-alumno-clickeable" data-alumno-id="${alumno.id}">
                            ${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno}
                        </a>
                    </strong><br>
                    <small class="text-muted">ID: ${alumno.id} | Curso: ${alumno.curso}</small>
                </td>
                <td>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="asistencia-${alumno.id}" 
                               id="presente-${alumno.id}" value="presente" 
                               ${presente ? 'checked' : ''} ${registroExistente ? 'disabled' : ''}>
                        <label class="form-check-label" for="presente-${alumno.id}">
                            <span class="badge bg-success">Presente</span>
                        </label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="asistencia-${alumno.id}" 
                               id="ausente-${alumno.id}" value="ausente" 
                               ${!presente ? 'checked' : ''} ${registroExistente ? 'disabled' : ''}>
                        <label class="form-check-label" for="ausente-${alumno.id}">
                            <span class="badge bg-danger">Ausente</span>
                        </label>
                    </div>
                </td>
                <td>
                    <input type="text" class="form-control observaciones-field" 
                           id="observaciones-${alumno.id}" 
                           placeholder="Observaciones (requerido si está ausente)"
                           value="${observaciones}"
                           ${presente ? 'disabled' : ''}
                           ${!presente ? 'required' : ''}
                           ${registroExistente ? 'disabled' : ''}>
                    <div class="mensaje-error" id="error-${alumno.id}">
                        Este campo es requerido para alumnos ausentes
                    </div>
                </td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    // Agregar botón de guardar solo si no hay registro existente
    if (!registroExistente) {
        html += `
            <div class="text-center mt-4">
                <button type="button" class="btn btn-success btn-lg btn-guardar" id="btn-guardar-asistencia">
                    <i class="fas fa-save me-2"></i>Guardar Registro del Día
                </button>
            </div>
        `;
    } else {
        html += `
            <div class="alert alert-info text-center mt-4">
                <i class="fas fa-info-circle me-2"></i>
                <strong>Registro ya guardado para esta fecha.</strong> No se puede modificar.
            </div>
        `;
    }
    
    contenedor.innerHTML = html;
    
    // Configurar eventos para campos de observaciones
    if (!registroExistente) {
        configurarEventosObservaciones();
        configurarBotonGuardar(fecha);
    }
    
    // Configurar eventos para nombres clickeables
    configurarEventosNombresClickeables();
    
    // Aplicar animación
    contenedor.classList.add('fade-in');
}

/**
 * Configurar eventos para los nombres clickeables de alumnos
 */
function configurarEventosNombresClickeables() {
    const contenedor = document.getElementById('lista-alumnos');
    
    contenedor.addEventListener('click', function(e) {
        if (e.target.classList.contains('nombre-alumno-clickeable')) {
            e.preventDefault();
            const alumnoId = e.target.getAttribute('data-alumno-id');
            mostrarDetalleAlumno(alumnoId);
        }
    });
}

/**
 * Configurar eventos para los campos de observaciones
 */
function configurarEventosObservaciones() {
    alumnos.forEach(alumno => {
        const radioPresente = document.getElementById(`presente-${alumno.id}`);
        const radioAusente = document.getElementById(`ausente-${alumno.id}`);
        const campoObservaciones = document.getElementById(`observaciones-${alumno.id}`);
        const mensajeError = document.getElementById(`error-${alumno.id}`);
        
        // Evento para cuando se marca como presente
        radioPresente.addEventListener('change', function() {
            if (this.checked) {
                campoObservaciones.disabled = true;
                campoObservaciones.required = false;
                campoObservaciones.value = '';
                campoObservaciones.classList.remove('campo-invalido');
                mensajeError.style.display = 'none';
            }
        });
        
        // Evento para cuando se marca como ausente
        radioAusente.addEventListener('change', function() {
            if (this.checked) {
                campoObservaciones.disabled = false;
                campoObservaciones.required = true;
                campoObservaciones.focus();
            }
        });
        
        // Evento para validación en tiempo real
        campoObservaciones.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.remove('campo-invalido');
                mensajeError.style.display = 'none';
            }
        });
    });
}

/**
 * Configurar botón de guardar asistencia
 */
function configurarBotonGuardar(fecha) {
    const btnGuardar = document.getElementById('btn-guardar-asistencia');
    if (btnGuardar) {
        btnGuardar.addEventListener('click', function() {
            if (validarAsistencia()) {
                modalConfirmacion.show();
                // Configurar evento de confirmación
                document.getElementById('btn-confirmar-guardar').onclick = function() {
                    guardarAsistencia(fecha);
                    modalConfirmacion.hide();
                };
            }
        });
    }
}

/**
 * Validar que todos los campos requeridos estén completos
 */
function validarAsistencia() {
    let esValido = true;
    
    // Limpiar errores previos
    document.querySelectorAll('.mensaje-error').forEach(error => {
        error.style.display = 'none';
    });
    document.querySelectorAll('.campo-invalido').forEach(campo => {
        campo.classList.remove('campo-invalido');
    });
    
    alumnos.forEach(alumno => {
        const radioAusente = document.getElementById(`ausente-${alumno.id}`);
        const campoObservaciones = document.getElementById(`observaciones-${alumno.id}`);
        const mensajeError = document.getElementById(`error-${alumno.id}`);
        
        if (radioAusente.checked && campoObservaciones.value.trim() === '') {
            campoObservaciones.classList.add('campo-invalido');
            mensajeError.style.display = 'block';
            esValido = false;
        }
    });
    
    if (!esValido) {
        mostrarToast('Por favor complete todos los campos requeridos', 'error');
    }
    
    return esValido;
}

/**
 * Guardar registro de asistencia en localStorage
 */
function guardarAsistencia(fecha) {
    try {
        const detalle = [];
        
        alumnos.forEach(alumno => {
            const radioPresente = document.getElementById(`presente-${alumno.id}`);
            const campoObservaciones = document.getElementById(`observaciones-${alumno.id}`);
            
            detalle.push({
                id: alumno.id,
                nombre: alumno.nombre,
                presente: radioPresente.checked,
                observaciones: campoObservaciones.value.trim()
            });
        });
        
        const registro = {
            fecha: fecha,
            detalle: detalle,
            timestamp: new Date().toISOString()
        };
        
        // Guardar en localStorage
        const clave = `asistencia-${fecha}`;
        localStorage.setItem(clave, JSON.stringify(registro));
        
        mostrarToast('Registro guardado exitosamente', 'success');
        
        // Recargar la tabla para mostrar el estado guardado
        setTimeout(() => {
            renderizarTablaAsistencia(fecha);
        }, 1000);
        
        console.log('Asistencia guardada:', registro);
        
    } catch (error) {
        console.error('Error al guardar asistencia:', error);
        mostrarToast('Error al guardar el registro', 'error');
    }
}

/**
 * Obtener registro de asistencia desde localStorage
 */
function obtenerRegistroAsistencia(fecha) {
    try {
        const clave = `asistencia-${fecha}`;
        const registro = localStorage.getItem(clave);
        return registro ? JSON.parse(registro) : null;
    } catch (error) {
        console.error('Error al obtener registro:', error);
        return null;
    }
}

/**
 * Generar reporte para una fecha específica
 */
function generarReporte(fecha) {
    const contenedor = document.getElementById('contenido-reporte');
    const registro = obtenerRegistroAsistencia(fecha);
    
    if (!registro) {
        contenedor.innerHTML = `
            <div class="estado-vacio">
                <i class="fas fa-calendar-times"></i>
                <h5>No hay registros para la fecha seleccionada</h5>
                <p class="text-muted">Seleccione otra fecha o registre la asistencia primero.</p>
            </div>
        `;
        return;
    }
    
    // Calcular estadísticas
    const totalAlumnos = registro.detalle.length;
    const presentes = registro.detalle.filter(a => a.presente).length;
    const ausentes = totalAlumnos - presentes;
    const conObservaciones = registro.detalle.filter(a => !a.presente && a.observaciones.trim() !== '').length;
    
    let html = `
        <div class="fade-in">
            <!-- Resumen con badges -->
            <div class="row mb-4">
                <div class="col-12">
                    <h5 class="mb-3">
                        <i class="fas fa-chart-pie me-2"></i>Resumen del Día
                    </h5>
                    <div class="text-center">
                        <span class="badge bg-success badge-resumen">
                            <i class="fas fa-check me-1"></i>Presentes: ${presentes}
                        </span>
                        <span class="badge bg-danger badge-resumen">
                            <i class="fas fa-times me-1"></i>Ausentes: ${ausentes}
                        </span>
                        <span class="badge bg-info badge-resumen">
                            <i class="fas fa-clipboard me-1"></i>Con Observaciones: ${conObservaciones}
                        </span>
                    </div>
                </div>
            </div>
            
            <!-- Tabla de observaciones -->
            <div class="row">
                <div class="col-12">
                    <h5 class="mb-3">
                        <i class="fas fa-list me-2"></i>Detalle de Ausencias
                    </h5>
    `;
    
    const ausencias = registro.detalle.filter(a => !a.presente);
    
    if (ausencias.length === 0) {
        html += `
            <div class="alert alert-success">
                <i class="fas fa-thumbs-up me-2"></i>
                ¡Excelente! Todos los alumnos estuvieron presentes.
            </div>
        `;
    } else {
        html += `
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Alumno</th>
                            <th>Observaciones</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        ausencias.forEach(ausencia => {
            html += `
                <tr>
                    <td><strong>${ausencia.nombre}</strong></td>
                    <td>${ausencia.observaciones || 'Sin observaciones'}</td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
    }
    
    html += `
                </div>
            </div>
        </div>
    `;
    
    contenedor.innerHTML = html;
}

/**
 * Mostrar vista de detalle de un alumno específico
 */
function mostrarDetalleAlumno(alumnoId) {
    // Buscar el alumno por ID
    const alumno = alumnos.find(a => a.id === alumnoId);
    
    if (!alumno) {
        mostrarToast('Alumno no encontrado', 'error');
        return;
    }
    
    // Calcular edad a partir de la fecha de nacimiento
    const fechaNacimiento = new Date(alumno.fecha_nacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mesActual = hoy.getMonth();
    const mesNacimiento = fechaNacimiento.getMonth();
    
    const edadCalculada = (mesActual < mesNacimiento || 
        (mesActual === mesNacimiento && hoy.getDate() < fechaNacimiento.getDate())) 
        ? edad - 1 : edad;
    
    // Formatear fecha de nacimiento
    const fechaFormateada = fechaNacimiento.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Generar HTML del detalle del alumno
    const html = `
        <div class="fade-in">
            <div class="row">
                <div class="col-md-4 text-center mb-4">
                    ${alumno.foto ? 
                        `<img src="${alumno.foto}" alt="${alumno.nombre}" class="foto-alumno-detalle" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : 
                        ''
                    }
                    <div class="foto-alumno-detalle-placeholder" style="display: ${alumno.foto ? 'none' : 'flex'};">
                        <i class="fas fa-user"></i>
                    </div>
                </div>
                <div class="col-md-8">
                    <h3 class="mb-3 text-primary">${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno}</h3>
                    
                    <div class="row">
                        <div class="col-sm-6 mb-3">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h6 class="card-title text-muted">
                                        <i class="fas fa-id-card me-2"></i>Información Personal
                                    </h6>
                                    <p class="mb-1"><strong>ID:</strong> ${alumno.id}</p>
                                    <p class="mb-1"><strong>Edad:</strong> ${edadCalculada} años</p>
                                    <p class="mb-0"><strong>Fecha de Nacimiento:</strong> ${fechaFormateada}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 mb-3">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h6 class="card-title text-muted">
                                        <i class="fas fa-graduation-cap me-2"></i>Información Académica
                                    </h6>
                                    <p class="mb-1"><strong>Curso:</strong> ${alumno.curso}</p>
                                    <p class="mb-0"><strong>Estado:</strong> <span class="badge bg-success">Activo</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                    <h6 class="card-title text-muted">
                                        <i class="fas fa-users me-2"></i>Información de Contacto
                                    </h6>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <p class="mb-1"><strong>Apoderado:</strong> ${alumno.apoderado}</p>
                                        </div>
                                        <div class="col-sm-6">
                                            <p class="mb-0"><strong>Contacto:</strong> 
                                                <a href="tel:${alumno.contacto}" class="text-decoration-none">
                                                    ${alumno.contacto}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Poblar el contenedor de información
    document.getElementById('info-alumno').innerHTML = html;
    
    // Cambiar a la vista de detalle
    cambiarVista('detalle-alumno');
}

/**
 * Generar reporte mensual de asistencia
 */
function generarReporteMensual(periodo) {
    try {
        // Parsear el período (YYYY-MM)
        const [año, mes] = periodo.split('-');
        const mesNumero = parseInt(mes);
        const añoNumero = parseInt(año);
        
        // Obtener el número de días en el mes
        const diasEnMes = new Date(añoNumero, mesNumero, 0).getDate();
        
        // Inicializar datos de asistencia por alumno
        const datosAsistencia = {};
        alumnos.forEach(alumno => {
            datosAsistencia[alumno.id] = {
                nombre: `${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno}`,
                presentes: 0,
                totalDias: 0
            };
        });
        
        // Recopilar datos de localStorage para el mes
        let diasConRegistro = 0;
        for (let dia = 1; dia <= diasEnMes; dia++) {
            const fecha = `${año}-${mes.padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
            const clave = `asistencia-${fecha}`;
            const registro = localStorage.getItem(clave);
            
            if (registro) {
                try {
                    const datosDia = JSON.parse(registro);
                    diasConRegistro++;
                    
                    // Procesar cada alumno del día
                    datosDia.detalle.forEach(detalleAlumno => {
                        if (datosAsistencia[detalleAlumno.id]) {
                            datosAsistencia[detalleAlumno.id].totalDias++;
                            if (detalleAlumno.presente) {
                                datosAsistencia[detalleAlumno.id].presentes++;
                            }
                        }
                    });
                } catch (error) {
                    console.error(`Error al procesar registro del ${fecha}:`, error);
                }
            }
        }
        
        // Calcular porcentajes y preparar datos para renderizado
        const datosReporte = Object.values(datosAsistencia).map(alumno => {
            const porcentaje = alumno.totalDias > 0 
                ? Math.round((alumno.presentes / alumno.totalDias) * 100)
                : 0;
            
            return {
                nombre: alumno.nombre,
                porcentaje: porcentaje,
                presentes: alumno.presentes,
                totalDias: alumno.totalDias
            };
        });
        
        // Ordenar por porcentaje descendente
        datosReporte.sort((a, b) => b.porcentaje - a.porcentaje);
        
        // Renderizar la tabla
        renderizarTablaMensual(datosReporte, periodo, diasConRegistro);
        
        console.log(`Reporte mensual generado para ${periodo}:`, datosReporte);
        
    } catch (error) {
        console.error('Error al generar reporte mensual:', error);
        mostrarToast('Error al generar el reporte mensual', 'error');
    }
}

/**
 * Renderizar tabla del reporte mensual
 */
function renderizarTablaMensual(datosReporte, periodo, diasConRegistro) {
    const contenedor = document.getElementById('tabla-reporte-mensual');
    
    // Formatear el período para mostrar
    const [año, mes] = periodo.split('-');
    const nombreMes = new Date(año, mes - 1).toLocaleDateString('es-ES', { 
        month: 'long', 
        year: 'numeric' 
    });
    
    if (diasConRegistro === 0) {
        contenedor.innerHTML = `
            <div class="estado-vacio">
                <i class="fas fa-calendar-times"></i>
                <h5>No hay registros para ${nombreMes}</h5>
                <p class="text-muted">No se encontraron registros de asistencia para este mes.</p>
            </div>
        `;
        return;
    }
    
    // Calcular estadísticas generales
    const totalAlumnos = datosReporte.length;
    const promedioAsistencia = Math.round(
        datosReporte.reduce((sum, alumno) => sum + alumno.porcentaje, 0) / totalAlumnos
    );
    const alumnosPerfectos = datosReporte.filter(a => a.porcentaje === 100).length;
    
    let html = `
        <div class="fade-in">
            <!-- Resumen del mes -->
            <div class="row mb-4">
                <div class="col-12">
                    <h5 class="mb-3">
                        <i class="fas fa-chart-pie me-2"></i>Resumen de ${nombreMes}
                    </h5>
                    <div class="text-center">
                        <span class="badge bg-primary badge-resumen">
                            <i class="fas fa-calendar me-1"></i>Días con Registro: ${diasConRegistro}
                        </span>
                        <span class="badge bg-success badge-resumen">
                            <i class="fas fa-percentage me-1"></i>Promedio General: ${promedioAsistencia}%
                        </span>
                        <span class="badge bg-warning badge-resumen">
                            <i class="fas fa-star me-1"></i>Asistencia Perfecta: ${alumnosPerfectos} alumnos
                        </span>
                    </div>
                </div>
            </div>
            
            <!-- Tabla de asistencia mensual -->
            <div class="row">
                <div class="col-12">
                    <h5 class="mb-3">
                        <i class="fas fa-list me-2"></i>Asistencia por Alumno
                    </h5>
                    <div class="table-responsive">
                        <table class="table table-hover tabla-asistencia">
                            <thead>
                                <tr>
                                    <th style="width: 50px;">#</th>
                                    <th>Alumno</th>
                                    <th style="width: 200px;">Asistencia</th>
                                    <th style="width: 120px;">Porcentaje</th>
                                    <th style="width: 150px;">Detalle</th>
                                </tr>
                            </thead>
                            <tbody>
    `;
    
    datosReporte.forEach((alumno, index) => {
        // Determinar color de la barra de progreso según el porcentaje
        let colorBarra = 'bg-success';
        let colorTexto = 'text-success';
        let icono = 'fas fa-check-circle';
        
        if (alumno.porcentaje < 80) {
            colorBarra = 'bg-danger';
            colorTexto = 'text-danger';
            icono = 'fas fa-exclamation-triangle';
        } else if (alumno.porcentaje < 95) {
            colorBarra = 'bg-warning';
            colorTexto = 'text-warning';
            icono = 'fas fa-exclamation-circle';
        }
        
        html += `
            <tr>
                <td>
                    <span class="badge bg-secondary">${index + 1}</span>
                </td>
                <td>
                    <strong>${alumno.nombre}</strong>
                </td>
                <td>
                    <div class="progress" style="height: 20px;">
                        <div class="progress-bar ${colorBarra}" 
                             role="progressbar" 
                             style="width: ${alumno.porcentaje}%"
                             aria-valuenow="${alumno.porcentaje}" 
                             aria-valuemin="0" 
                             aria-valuemax="100">
                            ${alumno.porcentaje}%
                        </div>
                    </div>
                </td>
                <td class="text-center">
                    <span class="${colorTexto} fw-bold">
                        <i class="${icono} me-1"></i>${alumno.porcentaje}%
                    </span>
                </td>
                <td class="text-center">
                    <small class="text-muted">
                        ${alumno.presentes}/${alumno.totalDias} días
                    </small>
                </td>
            </tr>
        `;
    });
    
    html += `
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    contenedor.innerHTML = html;
}

/**
 * Mostrar toast de notificación
 */
function mostrarToast(mensaje, tipo = 'info') {
    const toastMensaje = document.getElementById('toast-mensaje');
    const toast = document.getElementById('toast-notificacion');
    
    // Configurar mensaje y estilo según el tipo
    toastMensaje.textContent = mensaje;
    
    // Limpiar clases previas
    toast.classList.remove('bg-success', 'bg-danger', 'bg-warning', 'bg-info');
    
    // Agregar clase según el tipo
    switch (tipo) {
        case 'success':
            toast.classList.add('bg-success', 'text-white');
            break;
        case 'error':
            toast.classList.add('bg-danger', 'text-white');
            break;
        case 'warning':
            toast.classList.add('bg-warning', 'text-dark');
            break;
        default:
            toast.classList.add('bg-info', 'text-white');
    }
    
    // Mostrar toast
    toastNotificacion.show();
}

/**
 * Mostrar información del sistema
 */
function mostrarInformacionSistema() {
    const totalAlumnos = alumnos.length;
    const totalRegistros = Object.keys(localStorage).filter(key => key.startsWith('asistencia-')).length;
    
    const mensaje = `
        <strong>Información del Sistema</strong><br><br>
        <i class="fas fa-users me-2"></i><strong>Alumnos registrados:</strong> ${totalAlumnos}<br>
        <i class="fas fa-calendar-check me-2"></i><strong>Días con registros:</strong> ${totalRegistros}<br>
        <i class="fas fa-code me-2"></i><strong>Versión:</strong> 1.0.0<br>
        <i class="fas fa-calendar me-2"></i><strong>Última actualización:</strong> ${new Date().toLocaleDateString('es-ES')}
    `;
    
    mostrarToast(mensaje, 'info');
}

// Exportar funciones para uso global (si es necesario)
window.LibroClasesKinder = {
    mostrarToast,
    generarReporte,
    renderizarTablaAsistencia,
    mostrarInformacionSistema
};
