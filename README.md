
# Proyecto Next.js - Guía de Inicio

Bienvenidos a la prueba tecnica de Haciendola. En este proyecto, crearemos una aplicación web que permita a los usuarios registrarse y iniciar sesión en nuestra aplicación.

## Requisitos

Asegúrate de tener instalado Node.js en tu sistema. Puedes descargarlo desde el sitio web oficial de Node.js.

## Instalación

1. **Clonar el repositorio:**

   ```sh
   git clone https://github.com/mssnzz/Haciendola-Technical-Test-Frontend.git
   ```

2. **Instalar las dependencias:**

   ```sh
   npm install
   ```

## Configuración del Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```plaintext
JWT_SECRET=yourSecretKey
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dfbd2bd01e152000b31347458000ddcb
AUTH_URL=http://localhost:3000/authentication/login
```

Asegúrate de reemplazar los valores según sea necesario:

- `JWT_SECRET`: Una clave secreta para firmar los tokens JWT.
- `NEXTAUTH_URL`: La URL base de tu aplicación Next.js.
- `NEXTAUTH_SECRET`: Una clave secreta para NextAuth.js.
- `AUTH_URL`: La URL de la página de inicio de sesión de autenticación.

## Ejecución del Proyecto

Una vez configurado el archivo `.env`, puedes iniciar el servidor de desarrollo:

```sh
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

- **`npm run dev`**: Inicia el servidor de desarrollo.
- **`npm run build`**: Compila la aplicación para producción.
- **`npm start`**: Inicia el servidor de producción.



