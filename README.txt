# Libro de Clases Virtual (Kinder) - Frontend App

## Descripción General

El **Libro de Clases Virtual Kinder** es una aplicación web frontend desarrollada como prototipo para la gestión de asistencia y observaciones de alumnos de jardín infantil. Esta aplicación permite a los educadores registrar la asistencia diaria de los estudiantes, agregar observaciones para alumnos ausentes y generar reportes detallados tanto diarios como mensuales. Es importante destacar que esta aplicación **no utiliza un backend**, funcionando completamente en el lado del cliente con persistencia de datos local mediante `localStorage` del navegador.

## Características Principales

- **Pantalla de bienvenida** con acceso directo a todas las vistas principales del sistema
- **Registro de asistencia diaria** (Presente/Ausente) para cada alumno con validación en tiempo real
- **Validación de observaciones obligatorias** para alumnos ausentes, asegurando que se documenten las razones de la inasistencia
- **Generación de reporte diario** con resumen completo de asistencias, ausencias y observaciones detalladas
- **Visualización de detalles individuales** de cada alumno con información personal, académica y de contacto
- **Reporte mensual avanzado** con cálculo automático de porcentajes de asistencia por alumno y barras de progreso visuales
- **Persistencia de datos en el navegador** usando `localStorage` para mantener los registros entre sesiones
- **Interfaz responsiva** compatible con dispositivos móviles, tablets y desktop
- **Navegación intuitiva** entre 5 vistas diferentes con diseño moderno y profesional

## Tecnologías Utilizadas

- **HTML5** - Estructura semántica moderna de la aplicación
- **CSS3** - Estilos avanzados con animaciones, gradientes y diseño responsivo
- **JavaScript (ECMAScript 6+)** - Lógica de la aplicación con funciones modernas como async/await
- **Bootstrap 5** - Framework CSS para componentes UI, grid system y diseño responsivo
- **Font Awesome 6.4.0** - Librería de iconos para mejorar la experiencia visual
- **Servidor Web Apache** - Entorno de ejecución requerido para el funcionamiento de la aplicación

## Instrucciones de Despliegue con Apache (Setup)

### Paso 1: Requisitos Previos
- Instalar un servidor web Apache en su máquina local. Se recomienda **XAMPP** (disponible para Windows, macOS y Linux)
- Descargar XAMPP desde: https://www.apachefriends.org/
- Instalar XAMPP siguiendo las instrucciones del instalador

### Paso 2: Clonar o Descargar el Repositorio
- Descargar o clonar el proyecto desde el repositorio
- Asegurarse de tener la carpeta completa `kinder-app` con todos sus archivos

### Paso 3: Mover los Archivos del Proyecto
- Copiar la carpeta completa `kinder-app` al directorio `htdocs` de su instalación de XAMPP
- La ruta final debe ser: `C:\xampp\htdocs\kinder-app\` (en Windows) o `/Applications/XAMPP/htdocs/kinder-app/` (en macOS)
- Verificar que todos los archivos estén presentes: `index.html`, carpetas `css/`, `js/`, `data/`, `img/`

### Paso 4: Iniciar el Servidor
- Abrir el **XAMPP Control Panel**
- Hacer clic en el botón **"Start"** junto al módulo **Apache**
- Verificar que Apache esté ejecutándose correctamente (debe aparecer en color verde)

### Paso 5: Acceder a la Aplicación
- Abrir su navegador web preferido
- Navegar a la siguiente URL: `http://localhost/kinder-app/`
- La aplicación debería cargar automáticamente mostrando la pantalla de bienvenida
- Si no funciona, verificar que:
  - Apache esté iniciado en XAMPP
  - La carpeta esté en la ubicación correcta dentro de `htdocs`
  - No haya conflictos de puerto (Apache usa el puerto 80 por defecto)

## Ejemplo de Uso de `fetch` a JSON

El siguiente código JavaScript, extraído del archivo `app.js`, demuestra cómo se utiliza la API `fetch` para cargar los datos de los alumnos desde el archivo `alumnos.json`:

```javascript
/**
 * Cargar datos de alumnos desde el archivo JSON
 */
async function cargarAlumnos() {
    try {
        // Realizar petición HTTP GET al archivo JSON
        const response = await fetch('data/alumnos.json');
        
        // Verificar que la respuesta sea exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Convertir la respuesta a formato JSON
        alumnos = await response.json();
        console.log(`${alumnos.length} alumnos cargados correctamente`);
        
    } catch (error) {
        console.error('Error al cargar alumnos:', error);
        
        // Crear datos de ejemplo si falla la carga del archivo
        alumnos = [
            { id: "A001", nombre: "Matías", apellido_paterno: "Pérez", apellido_materno: "González", fecha_nacimiento: "2019-03-15", curso: "Kinder A", apoderado: "Ana González", contacto: "+56 9 1234 5678", foto: "img/alumno1.jpg" },
            { id: "A002", nombre: "Sofía", apellido_paterno: "Rojas", apellido_materno: "López", fecha_nacimiento: "2019-05-20", curso: "Kinder A", apoderado: "Carlos Rojas", contacto: "+56 9 8765 4321", foto: "img/alumno2.jpg" },
            // ... más alumnos de ejemplo
        ];
        console.log('Usando datos de ejemplo');
    }
}
```

**Explicación del código:**
- Utiliza `async/await` para manejar operaciones asíncronas de forma moderna
- La función `fetch()` realiza una petición HTTP GET al archivo `alumnos.json`
- Se verifica el estado de la respuesta con `response.ok`
- Los datos se convierten a JSON con `response.json()`
- Incluye manejo de errores con `try/catch` y datos de fallback

## Estructura del Proyecto

```
kinder-app/
├── index.html              # Archivo principal de la aplicación
├── css/
│   └── style.css          # Estilos personalizados y responsivos
├── js/
│   └── app.js             # Lógica principal de la aplicación
├── data/
│   └── alumnos.json       # Datos de los alumnos en formato JSON
├── img/                   # Directorio para imágenes
│   ├── logo-academy.png   # Logo del colegio (requerido)
|   ├── alumno1.jpg        # Fotos de alumnos
│   └── ... 
│   
└── README.txt             # Este archivo de documentación
```

**Descripción de archivos principales:**
- **`index.html`**: Contiene la estructura HTML con 5 vistas diferentes y componentes Bootstrap
- **`css/style.css`**: Estilos personalizados con animaciones, gradientes y diseño responsivo
- **`js/app.js`**: Lógica JavaScript completa con funciones para todas las funcionalidades
- **`data/alumnos.json`**: Base de datos de alumnos con información personal y académica
- **`img/`**: Directorio para almacenar el logo del colegio y fotos de alumnos



