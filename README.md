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
    [http://localhost:3000](http://localhost:3000)

## Estructura del Proyecto

- **src/app/layout.tsx**: Componente principal que maneja la estructura global del sitio, incluyendo la barra de navegación y el diseño base.
- **src/app/page.tsx**: Página de inicio donde se muestra un mensaje de bienvenida y el formulario para agregar publicaciones.
- **src/app/posts/page.tsx**: Página que muestra una lista de publicaciones con la opción de editar cada una.
- **src/app/components/Navbar.tsx**: Componente de navegación que permite la navegación entre las páginas principales del sitio.
- **src/app/components/PostForm.tsx**: Formulario para agregar o editar publicaciones.
- **src/app/context/PostContext.tsx**: Contexto global que maneja el estado de las publicaciones y proporciona funciones para agregar, editar y alternar la visibilidad de las publicaciones.
- **src/app/styles/globals.css**: Estilos globales de la aplicación, incluyendo soporte para un modo oscuro.
- **tsconfig.json**: Configuración de TypeScript.
- **package.json**: Dependencias y scripts del proyecto.

## Funcionalidades Detalladas

### Cargar Publicaciones

- Las publicaciones se cargan al inicio mediante una solicitud GET a la API de **JSONPlaceholder**.

### Agregar Publicaciones

- Los usuarios pueden agregar nuevas publicaciones mediante el formulario en la página de inicio.

### Editar Publicaciones

- Los usuarios pueden editar una publicación haciendo clic en el botón "Editar" en cada tarjeta de publicación.

### Alternar Visibilidad de Publicaciones

- Los usuarios pueden alternar entre ver solo las primeras 4 publicaciones o todas las disponibles con el botón "Show More" o "Show Less".

## Dependencias

- **Next.js**: Framework de React para aplicaciones de servidor.
- **React**: Librería para construir interfaces de usuario.
- **Axios**: Cliente HTTP para realizar solicitudes.
- **Tailwind CSS**: Framework de CSS para estilos rápidos y responsivos.

## Desarrollo

- **Instalación de dependencias**: 
    ```bash
    npm install
    ```

- **Ejecutar el proyecto**:
    ```bash
    npm run dev
    ```

- **Linter**: El proyecto usa ESLint para el análisis de código.
    ```bash
    npm run lint
    ```

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE.txt para más detalles.