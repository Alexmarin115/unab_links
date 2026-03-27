/* ================================================================
   JAVASCRIPT PRINCIPAL - Universidad Dr. Andrés Bello
   Archivo: js/main.js
   ================================================================ */


/* ================================================================
   FUNCIÓN: Mostrar la fecha del día en el header
   ================================================================
   ➤ Esta función obtiene la fecha actual del sistema del usuario
   ➤ La formatea en español y la muestra en el elemento #fecha-actual
   ➤ No necesitas modificar esta función a menos que quieras
     cambiar el formato de la fecha
   ================================================================ */
function mostrarFechaActual() {

  // Opciones de formato para la fecha en español
  const opciones = {
    weekday: 'long',    // Día de la semana: "lunes", "martes", etc.
    year:    'numeric', // Año: 2026
    month:   'long',    // Mes: "marzo", "abril", etc.
    day:     'numeric'  // Día: 25
  };

  // Crea el objeto de fecha actual
  const ahora = new Date();

  // Formatea la fecha en español de El Salvador (o cambia el idioma si prefieres)
  // Ejemplos de locale: 'es-SV' (El Salvador), 'es-VE' (Venezuela), 'es-MX' (México)
  const fechaFormateada = ahora.toLocaleDateString('es-SV', opciones);

  // Capitaliza la primera letra (por si el sistema la devuelve en minúscula)
  const fechaMayuscula = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);

  // Busca el elemento HTML con id="fecha-actual" y le inserta la fecha
  const elementoFecha = document.getElementById('fecha-actual');
  if (elementoFecha) {
    elementoFecha.textContent = fechaMayuscula;
  }
}


/* ================================================================
   FUNCIÓN: Manejar el logo (ocultar placeholder si hay imagen)
   ================================================================
   ➤ Cuando el logo cargue correctamente, oculta el texto placeholder
   ➤ Si el logo falla al cargar, el texto placeholder permanece visible
   ================================================================ */
function manejarLogo() {
  const logoImg          = document.getElementById('logo-universidad');
  const placeholderTexto = document.querySelector('.logo-placeholder-text');

  if (!logoImg) return; // Si no existe el elemento, no hace nada

  // Cuando la imagen carga correctamente
  logoImg.addEventListener('load', function () {
    // Verifica que la imagen tenga un src válido (no vacío)
    if (logoImg.src && logoImg.src !== window.location.href) {
      // Oculta el texto placeholder
      if (placeholderTexto) {
        placeholderTexto.style.display = 'none';
      }
      // Hace visible la imagen del logo
      logoImg.style.display = 'block';
    }
  });

  // Si la imagen falla al cargar (ruta incorrecta, etc.)
  logoImg.addEventListener('error', function () {
    // Mantiene el texto placeholder visible
    logoImg.style.display = 'none';
    console.warn('No se pudo cargar el logo. Verifica la ruta en el atributo src del HTML.');
  });

  // Si el src está vacío, oculta el tag <img> y muestra el placeholder
  if (!logoImg.getAttribute('src')) {
    logoImg.style.display = 'none';
  }
}


/* ================================================================
   FUNCIÓN: Animación de aparición para los botones
   ================================================================
   ➤ Agrega un efecto de aparición escalonada a los botones
   ➤ Puedes ajustar el delay (retraso) cambiando el valor 150 (ms)
   ================================================================ */
function animarBotones() {
  const botones = document.querySelectorAll('.btn-principal');

  // Itera sobre cada botón y le agrega un retraso progresivo
  botones.forEach(function (boton, indice) {
    // Retraso: 0.3s, 0.45s, 0.6s ... para efecto escalonado
    boton.style.animationDelay = (0.3 + indice * 0.15) + 's';
    boton.style.opacity = '0';
    boton.style.animation = 'fadeInUp 0.6s ease forwards';
  });
}


/* ================================================================
   FUNCIÓN: Menú hamburguesa
   ================================================================
   ➤ Controla la apertura y cierre del menú desplegable
   ➤ El menú se cierra también al hacer clic fuera de él
   ================================================================ */
function iniciarMenuHamburguesa() {
  const btn    = document.getElementById('hamburger-btn');
  const menu   = document.getElementById('menu-desplegable');

  if (!btn || !menu) return;

  // Abre o cierra el menú al pulsar el botón hamburguesa
  btn.addEventListener('click', function (e) {
    e.stopPropagation(); // Evita que el clic se propague al documento
    const estaAbierto = menu.classList.contains('abierto');

    btn.classList.toggle('abierto');
    menu.classList.toggle('abierto');
    btn.setAttribute('aria-expanded', !estaAbierto);
    menu.setAttribute('aria-hidden',   estaAbierto);
  });

  // Cierra el menú al hacer clic en cualquier parte fuera
  document.addEventListener('click', function () {
    btn.classList.remove('abierto');
    menu.classList.remove('abierto');
    btn.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden',  'true');
  });

  // Cierra el menú al pulsar Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      btn.classList.remove('abierto');
      menu.classList.remove('abierto');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden',  'true');
      btn.focus();
    }
  });
}


/* ================================================================
   INICIALIZACIÓN - Se ejecuta cuando la página termina de cargar
   ================================================================
   ➤ Aquí se llaman todas las funciones que deben correr al inicio
   ➤ Si quieres agregar más funcionalidad, crea una función arriba
     y llámala aquí abajo
   ================================================================ */
document.addEventListener('DOMContentLoaded', function () {

  // Muestra la fecha actual en el header
  mostrarFechaActual();

  // Maneja la carga del logo
  manejarLogo();

  // Activa las animaciones de los botones
  animarBotones();

  // Inicia el menú hamburguesa
  iniciarMenuHamburguesa();

  // Confirmación en consola (puedes eliminar esta línea en producción)
  console.log('✅ Página Universidad Dr. Andrés Bello cargada correctamente.');

});

