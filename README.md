[![SVG Banners](https://svg-banners.vercel.app/api?type=typeWriter&text1=PROYECTO%20FORMATIVO%20👨‍💻&width=800&height=150)](https://github.com/Akshay090/svg-banners)

<H4 align="center">⚙️🔧TALLER MECÁNICO🔧⚙️</H4> 

<H6>Proyecto Final del Bootcamp Full Stack Developer de Geekshubs Academy</H6>


** Creamos un proyecto de backend para la gestín de del backend de un Taller Mecánico utilizando Node.js, TypeScript, Express, TypeORM y MySQL. Emplea una base de datos relacional para almacenar datos de citas, vehículos, y usuarios,con roles de trabajador, cliente y administrador entre otros elementos relevantes para el funcionamiento del negocio.

** Dentro de esta aplicación, hemos implementado diversos puntos de acceso (endpoints) que permiten a los usuarios registrarse, iniciar sesión, acceder y gestionar información de las tablas de la base de datos. Estos endpoints facilitan la creación, actualización y eliminación de registros, proporcionando así una interfaz de programación robusta y completa para la gestión de datos del taller.


## 📋 Contenido 



  <summary>📋Contenido📋</summary>
<ol>
    <li><a href="#tecnologías-utilizadas">Tecnologías Utilizadas</a></li>
    <li><a href="#diagrama-bd">Diagrama BD</a></li>
    <li><a href="#instrucciones">Instrucciones</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#contribuciones">Contribuciones</a></li>
    <li><a href="/LICENSE">Licencia</a></li>
</ol>



## Tecnologías


<summary>➿Tecnologías➿</summary>

<div align="center">

   <a href="https://www.expressjs.com/">
      <img src= "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
   </a>
   <a href="https://nodejs.org/en">
      <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
   </a>
   <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/typescript-blue?style=for-the-badge&logo=typescript&logoColor=white">
   </a>
   <a href="https://www.mysql.com/">
    <img src= "https://img.shields.io/badge/-MySQL-000?&logo=mysql&logoColor=FFFFFF"/>
    </a>
    <a href="https://jwt.io/">
    <img src= "https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens"/>
    </a>
    <a href="https://git-scm.com/">
    <img src= "https://img.shields.io/badge/-Git-000?&logo=git"/>
</a>
<a href="https://www.github.com/">
    <img src= "https://img.shields.io/badge/-GitHub-05122A?style=flat&logo=github"/>
</a>

</div>


## Diagrama Base de Datos

<p>
   <div align="center">
      <img src="/src/img/diagramaER.jpg" style="max-width: 100%">
   </div>    
</p>


<details>
<summary>⚙ Configuración ⚙</summary>

1. Clona este repositorio: `git clone [URL del repositorio]` 📥
2. Instalar las dependencias: `npm install ` 💾
3. Conectar repositorio con la base de datos mediante  variables de entorno que se encuentran en el archivo .env 📡

    ``` js
    // Environment 
	NODE_ENV= 

   // Server 
	PORT=

   // Database 
    	DB_HOST=
    	DB_PORT=
    	DB_USER=
    	DB_PASSWORD=
    	DB_DATABASE=  

   // Token
    	JWT_SECRET= ""
    ```  

4. Ejecutar las migraciones `npx typeorm-ts-node-commonjs migration:run -d ./src/database/data-source.ts` o `npm run db:migrate` ✈️
5. Para rellenar las tabla de datos ficticios `npx ts-node ./src/database/seeders/dbSeeder.ts` o `npm run db:seed` 📑
6. Lo hacemos funcionar con `npm run dev` 🚀
7. Utilizamos los endpoints en Insomnia o Postman para probar y validar las diversas funcionalidades implementadas 🎯

</details>

## Endpoints

<details>

<summary>🎯Endpoints🎯</summary>

<details>
<summary>🔒 Registro/Login 🔒</summary>

- ✅ **Registrar usuario/cliente**
    - `POST {{BASE_URL}}/api/auth/register`
    - ![Register](/src/img/register.jpg)

- ✅ **Login usuarios**
    - `POST {{BASE_URL}}/api/auth/login`
    - ![Login](/src/img/Login1.jpg)
    - ![Token](/src/img/LoginToken.jpg)

</details>
<details>
<summary>👨‍👨‍👧‍👧 Usuarios 👨‍👨‍👧‍👧</summary>

- ✅ **Ver perfil de usuario (Introducir Token de Login)**
    - `GET {{BASE_URL}}/api/users/profile/profile`
    - ![Perfil](/src/img/VerPerfil.jpg)

- ✅ **Mostrar todos los usuarios (ADMIN o MANAGER)**
    - `GET {{BASE_URL}}/api/users/`

- ✅ **Mostrar todos los trabajadores (ADMIN)**
    - `GET {{BASE_URL}}/api/users/role/managers`

- ✅ **Mostrar todos los clientes (ADMIN o MANAGER)**
    - `GET {{BASE_URL}}/api/users/role/clients`

- ✅ **Mostrar usuarios por ID (ADMIN o MANAGER)**
    - `GET {{BASE_URL}}/api/users/:id`

- ✅ **Crear nuevo usuario (ADMIN)**
    - `POST {{BASE_URL}}/api/users/`
    - ![CrearUsuario](/src/img/CreateUser.jpg)
    - ![UsuarioCreado](/src/img/CreateUser2.jpg)
  
- ✅ **Actualizar perfil propio de usurio**
    - `PUT {{BASE_URL}}/api/users/profile/profile`

- ✅ **Actualizar perfil de usurio como ADMIN**
    - `PUT {{BASE_URL}}/api/users/:id`

- ✅ **Eliminar usuario (ADMIN)**
    - `DELETE {{BASE_URL}}/api/users/:id`

</details>
<details>
<summary>📅 Citas 📅</summary>

- ✅ **Crear Nueva Cita**
    - `POST {{BASE_URL}}/api/appointments`
    - ![CrearCita](/src/img/CrearCita1.jpg)
    - ![CitaCreada](/src/img/CrearCita2.jpg)

- ✅ **Actualizar una cita por ID de cita (introducir Token login)**
    - `PUT {{BASE_URL}}/api/appointments/:appointmentId`

- ✅ **Eliminar cita (ADMIN o MANAGER)**
    - `DELETE {{BASE_URL}}/api/appointments/:appointmentId`

- ✅ **Citas de un cliente (introducir Token cliente o Id Cliente (para ADMIN))**
    - `GET {{BASE_URL}}/api/appointments/client/`
    - `GET {{BASE_URL}}/api/appointments/client/clientId`

- ✅ **Citas de un trabajador (introducir Token trabajador)**
    - `GET {{BASE_URL}}/api/appointments/worker/`
</details>
<details>
<summary>🏎️ Vehículos 🏎️</summary>

- ✅ **Añadir vehículo a un usuario (introducir Token login)**
    - `POST {{BASE_URL}}/api/cars/userCars`
    - ![Añadir Vehículo](/src/img/añadircar.jpg)

- ✅ **Eliminar vehículo (ADMIN o MANAGER)**
    - `DELETE {{BASE_URL}}/api/cars/userCars/:carId`

- ✅ **Ver todos los vehículos (ADMIN o MANAGER)**
    - `GET {{BASE_URL}}/api/cars`

- ✅ **Ver vehículos de un usuario (introducir Token)**
    - `GET {{BASE_URL}}/api/cars/userCars`
    - ![Mostrar Vehículo](/src/img/vercar.jpg)

</details>


