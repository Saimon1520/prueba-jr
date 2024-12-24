# Proyecto de Gestión de Publicaciones

Este proyecto es una aplicación web desarrollada con **Next.js** y **Axios** para gestionar publicaciones. Los usuarios pueden agregar, editar y ver publicaciones en un formato de tarjeta interactivo. La aplicación también incluye una funcionalidad para alternar entre mostrar todos los posts o solo una parte de ellos. Los datos se obtienen de la API pública de [JSONPlaceholder](https://jsonplaceholder.typicode.com).

## Características

- **Lista de publicaciones**: Muestra una lista de publicaciones obtenidas de la API.
- **Crear nueva publicación**: Permite a los usuarios agregar nuevas publicaciones mediante un formulario.
- **Editar publicaciones**: Los usuarios pueden editar el título y el contenido de las publicaciones existentes.
- **Visibilidad de publicaciones**: Los usuarios pueden alternar entre ver solo las primeras 4 publicaciones o todas las disponibles.
- **Manejo de errores**: Se muestra un mensaje de error si ocurre un problema al cargar, agregar o editar publicaciones.
- **Interfaz interactiva**: Utiliza botones de acción y una interfaz de usuario basada en tarjetas.

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/Saimon1520/prueba-jr.git
    ```

2. Navega a la carpeta del proyecto:
    ```bash
    cd prueba-jr
    ```

3. Instala las dependencias:
    ```bash
    npm install
    ```

4. Ejecuta el proyecto:
    ```bash
    npm run dev
    ```

5. Abre la aplicación en tu navegador:
    ```
    http://localhost:3000
    ```

## Estructura del Proyecto

- **`src/app/post/page.tsx`**: Componente principal que maneja la publicación, visualización y edición de publicaciones.
- **`Styles`**: Cada componente tiene su propio diseño completamente responsivo.

## Funcionalidades Detalladas

### Cargar Publicaciones

- Las publicaciones se cargan al inicio mediante una solicitud `GET` a la API de **JSONPlaceholder**.
- Se muestra un mensaje de error si la carga falla.

### Crear Nueva Publicación

- Los usuarios pueden agregar nuevas publicaciones completando un formulario con un título y contenido.
- La nueva publicación se envía a la API mediante una solicitud `POST` y se agrega al estado local.

### Editar Publicación

- Los usuarios pueden editar cualquier publicación haciendo clic en el botón "Editar" en cada tarjeta de publicación.
- El formulario de edición permite modificar el título y el contenido de la publicación seleccionada.
- Se envía una solicitud `PATCH` a la API para guardar los cambios.

### Mostrar/Ocultar Publicaciones

- El botón "Ver más" alterna entre mostrar solo las primeras 4 publicaciones o todas las disponibles.
- Esto se gestiona con el estado `visiblePosts`, que se actualiza dinámicamente.

### Manejo de Errores

- Los errores se gestionan y se muestran al usuario cuando:
    - No se pueden cargar las publicaciones.
    - No se puede agregar una nueva publicación.
    - No se puede guardar una publicación editada.

## Tecnología Utilizada

- **Next.js**: Framework para aplicaciones React que permite la renderización del lado del servidor.
- **Axios**: Cliente HTTP para hacer peticiones a la API.
- **Tailwind CSS**: Framework de CSS para un diseño moderno y responsivo.
- **JSONPlaceholder**: API de prueba para simular datos de publicaciones.

## Capturas de Pantalla

- **Vista de publicaciones**: Muestra una lista de publicaciones con la opción de ver más, editar o agregar nuevas publicaciones.

## Consideraciones

- El proyecto no maneja la persistencia de datos más allá de las solicitudes a la API.
- Utiliza datos de prueba de **JSONPlaceholder** para simular un backend real.

## Contribuciones

Si deseas contribuir al proyecto, siéntete libre de abrir un "pull request" o enviar un "issue" para discutir mejoras o correcciones.

## Licencia

Este proyecto está bajo la Licencia MIT. Para más detalles, revisa el archivo [LICENSE](LICENSE.txt).