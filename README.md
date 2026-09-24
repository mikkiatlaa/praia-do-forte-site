# Praia do Forte Turismo

Web estática inspirada en el Sprint 2 de Figma. Abre `index.html` en un navegador; no requiere instalación ni servidor.

## Estructura

- `index.html`: contenido y estructura accesible.
- `style.css`: estilos base, diseño adaptable y animaciones.
- `art-direction.css`: nueva dirección visual editorial y ajustes para móvil.
- `app.js`: filtros, navegación y reserva de demostración.
- `src/enhancements.ts`: interacción de la marea, control de animación y movimiento sutil de la portada.
- `src/*.glsl`: shaders de vértices y fragmentos para la marea interactiva.
- `enhancements.js`: versión compilada, lista para usar sin instalar nada.
- `assets/`: fotografías, logotipo y tipografías guardadas localmente.

La portada usa una reinterpretación fotográfica de la cala original, preparada con la herramienta de generación de imágenes de OpenAI para darle más luz y contraste. La fotografía original se conserva en `assets/raw-01.jpg`.

La búsqueda filtra el catálogo. Cada actividad abre una ficha y un formulario de tres pasos. El formulario muestra un resumen, pero no envía datos ni procesa pagos.

La sección de mareas responde al puntero y permite alternar entre **Calm** y **Wild**, o pausar el movimiento. Si WebGL no está disponible, conserva una imagen de fondo. La preferencia del sistema para reducir movimiento también se respeta.

Para modificar el TypeScript o los shaders y regenerar `enhancements.js`:

```bash
npm install
npm run build
```
