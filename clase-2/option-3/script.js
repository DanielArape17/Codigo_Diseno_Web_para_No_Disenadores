// Esperamos a que todo el HTML esté cargado antes de ejecutar la lógica
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Seleccionamos los elementos clave del DOM
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.panel-seccion');
  const barrasProgreso = document.querySelectorAll('.barra-progreso');

  // 2. Función para manejar la navegación entre secciones
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Evitamos el salto brusco predeterminado del navegador

      // A) Actualizar el estado activo en el menú lateral
      navLinks.forEach(l => l.classList.remove('activo')); // Limpiamos todos
      this.classList.add('activo'); // Iluminamos el clickeado

      // B) Obtener el ID de la sección a la que queremos ir (ej: "skills")
      const targetId = this.getAttribute('href').substring(1);

      // C) Ocultar todas las secciones y mostrar solo la seleccionada
      sections.forEach(sec => sec.classList.remove('visible'));
      
      const targetSection = document.getElementById(targetId);
      targetSection.classList.add('visible');

      // D) Disparar animaciones específicas si entramos a una sección concreta
      if (targetId === 'skills') {
        animarBarrasProgreso();
      } else {
        reiniciarBarrasProgreso(); // Si salimos de skills, las regresamos a 0%
      }
    });
  });

  // 3. Función para animar las barras de porcentaje (UI Crafting)
  function animarBarrasProgreso() {
    // Usamos un pequeño setTimeout (50ms) para permitir que el navegador 
    // renderice el 'display: flex' de la sección antes de cambiar el ancho.
    // Esto asegura que la transición CSS se ejecute suavemente.
    setTimeout(() => {
      barrasProgreso.forEach(barra => {
        const valor = barra.getAttribute('data-valor'); // Leemos el HTML (ej: "90")
        barra.style.width = valor + '%'; // Inyectamos el estilo inline
      });
    }, 50);
  }

  // 4. Función para resetear las barras (Para que se animen cada vez que entras)
  function reiniciarBarrasProgreso() {
    barrasProgreso.forEach(barra => {
      barra.style.width = '0%';
    });
  }

  // 5. Opcional: Interacción de los botones del Hero para que naveguen usando el mismo sistema
  const btnHeroPortfolio = document.querySelector('.btn-cyan-solido[href="#portfolio"]');
  if(btnHeroPortfolio) {
    btnHeroPortfolio.addEventListener('click', (e) => {
      e.preventDefault();
      // Simulamos un click en el icono del portafolio en el menú lateral
      document.querySelector('.nav-link[href="#portfolio"]').click();
    });
  }

});