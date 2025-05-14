# API de Gestión de Servicios para PYMEs

Esta API permite gestionar usuarios, servicios y productos a través de un conjunto de endpoints RESTful. Fue desarrollada usando **Fastify** como framework backend y **MongoDB (vía Mongoose)** como base de datos.

---

## 🚀 Tecnologías usadas

- [Fastify](https://www.fastify.io/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [Node.js](https://nodejs.org/)
- [BCriptJS (para encriptar contraseñas)](https://www.npmjs.com/package/bcryptjs)
- [Cloudflare Tunnels (para exponer servicios locales)](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)

---

## 📦 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/darkmoon1411z/simpleapis.git
cd simpleapis
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

```env
PORT=9600
MONGO_URI=https://MONGO_URI
MONGO_PWD=SUPER-SECRET-HERE
```

### 4. Ejecutar el servidor

```bash
npm start
```

---

# Documentación del servicio API

En esta sección estarán documentadas todas las acciones y rutas del servicio API, basado en el formato de `x-www-form-urlencoded` para un mejor retorno de datos

## URL Base

URL de donde se realizarán las operaciones

```bash
https://example.xaneez.com/
```

---

# Endpoints

| Nombre         | Ruta            | Métodos                                                  | Retorno                                 |
| -------------- | --------------- | -------------------------------------------------------- | --------------------------------------- |
| Autenticación  | `/auth/oid`     | [`POST`](#-autenticación)                                | `{ user: "object" } `                   |
| Usuarios       | `/users`        | [`GET`](#petición-get), [`POST`](#petición-post)         | Listado y creación de usuarios          |
| Usuarios (ID)  | `/users/:id`    | [`PUT`](#petición-put), [`DELETE`](#petición-delete)     | Modificación y eliminación de usuarios  |
| Productos      | `/products`     | [`GET`](#petición-get-1), [`POST`](#petición-post-1)     | Lisado y creación de productos          |
| Productos (ID) | `/products:/id` | [`PUT`](#petición-put-1), [`DELETE`](#petición-delete-1) | Modificación y eliminación de productos |
| Servicios      | `/services`     | [`GET`](#petición-get-2), [`POST`](#petición-post-2)     | Listado y creación de servicios         |
| Servicios (ID) | `/services/:id` | [`PUT`](#petición-put), [`DELETE`](#petición-delete-2)   | Modificación y eliminación de servicios |

---

# 🔐 Autenticación

Inicios de sesión según el correo y contraseñas proporcionados en el body

#### Petición

```bash
POST /auth/oid
```

#### Cuerpo

Estos parámetros deberían ser proporcionados ya que son requeridos por el servidor

```json
{
  "email": "someone@example.com",
  "password": "password"
}
```

## Respuestas posibles del servidor

#### 1. Contraseña incorrecta

```json
{
  "statusCode": "401",
  "msg": "Password is incorrect"
}
```

#### 2. Usuario no encontrado

```json
{
  "statusCode": 404,
  "msg": "User not found"
}
```

#### 3. Petición erronea (Parámetros requeridos)

```json
{
  "statusCode": 400,
  "msg": "The email and password fields are required"
}
```

#### 4. Petición erronea (Cuerpo faltante)

```json
{
  "statusCode": 400,
  "msg": "Invalid or missing request body"
}
```

#### 5. Inicio de sesión correcto

```json
{
  "statusCode": 200,
  "msg": "OK",
  "user": {...}
}
```

---

# 👤 Usuarios

Gestión de usuarios en la base de datos, ejemplos petición **CRUD**

### Petición (GET)

Listado de usuarios

```bash
GET /users
```

ó

```bash
GET /users/:id
```

## Respuestas posibles del servidor

#### 1. Listado de usuarios

```json
[
  {
    "_id": "string",
    "name": "User",
    "email": "user@example.com",
    "age": 18,
    "createdAt": {
      "date": "2025-05-11T05:33:18.245Z",
      "timestamp": 1746941598
    }
  },
  {
    "_id": "string",
    "name": "User",
    "email": "user@example.com",
    "age": 18,
    "createdAt": {
      "date": "2025-05-11T05:33:18.245Z",
      "timestamp": 1746941598
    }
  }
]
```

#### 2. Única entrada

```json
{
  "_id": "string",
  "name": "User",
  "email": "user@example.com",
  "age": 18,
  "createdAt": {
    "date": "2025-05-11T05:33:18.245Z",
    "timestamp": 1746941598
  }
}
```

#### 3. No hay usuarios almacenados

```json
{
  "statusCode": 404,
  "msg": "No users stored in the database have been found"
}
```

### Petición (POST)

Creación de usuarios

```bash
POST /users
```

#### Cuerpo

Estos parámetros deberían ser proporcionados ya que son requeridos por el servidor

```json
{
  "name": "Jhon Doe",
  "email": "jhon@example.com",
  "password": "your-password-here",
  "age": 35
}
```

## Respuestas posibles del servidor

#### 1. Usuario creado

```json
{
  "statusCode": 200,
  "msg": "The user has been successfully stored",
  "date": "2025-05-11T05:33:18.245Z"
}
```

#### 2. Parámetros faltantes

```json
{
  "statusCode": 400,
  "msg": "Missing required fields: name, email, password, age"
}
```

### Petición (PUT)

Modificación de usuarios

```bash
PUT /users/:id
```

#### Cuerpo

Parámetro a modificar, solo pueden ser modificados las siguientes llaves: `name`, `email`, `password` y `age`

```json
{
  "age": 20
}
```

## Respuestas posibles del servidor

#### 1. Cambio exitoso

```json
{
  "statusCode": 200,
  "msg": "User updated",
  "data": {
    "age": 20
  }
}
```

#### 2. Parámetros no válidos

```json
{
  "statusCode": 400,
  "msg": "The user could not be updated due to invalid fields provided."
}
```

### Petición (DELETE)

```bash
DELETE /users/:id
```

### Respuestas posibles del servidor

#### 1. Borrado exitoso

```json
{
  "statusCode": 200,
  "msg": "User id has been deleted."
}
```

#### 2. Usuario no encontrado

```json
{
  "statusCode": 404,
  "msg": "User not found"
}
```

# 📦 Productos

Gestión de productos en la base de datos, ejemplos de petición CRUD

### Petición (GET)

Listado de productos

```bash
GET /products
```

ó

```bash
GET /products/:id
```

## Respuestas posibles del servidor

#### 1. Listado de productos

```json
[
  {
    "_id": "string",
    "name": "Producto 1",
    "description": "Descripción del producto",
    "features": ["Característica 1", "Característica 2"],
    "price": 100,
    "stock": 5
  },
  ...
]
```

#### 2. Única entrada

```json
{
  "_id": "string",
  "name": "Producto 1",
  "description": "Descripción del producto",
  "features": ["Característica 1", "Característica 2"],
  "price": 100,
  "stock": 5
}
```

#### 3. No hay productos almacenados

```json
{
  "statusCode": 404,
  "msg": "No products stored in the database have been found"
}
```

### Petición (POST)

Creación de productos

```bash
POST /products
```

#### Cuerpo

```json
{
  "name": "Producto 1",
  "description": "Descripción del producto",
  "features": ["Feature 1", "Feature 2"],
  "price": 150,
  "stock": 10
}
```

## Respuestas posibles del servidor

#### 1. Producto creado

```json
{
  "statusCode": 200,
  "msg": "The product has been successfully stored"
}
```

#### 2. Parámetros faltantes

```json
{
  "statusCode": 400,
  "msg": "Missing required fields: name, description"
}
```

### Petición (PUT)

Modificar productos existentes

```bash
PUT /products/:id
```

#### Cuerpo

```json
{
  "price": 120
}
```

## Respuestas posibles del servidor

#### 1. Cambio exitoso

```json
{
  "statusCode": 200,
  "msg": "Product updated",
  "data": {
    "price": 120
  }
}
```

#### 2. Parámetros no válidos

```json
{
  "statusCode": 400,
  "msg": "The product could not be updated due to invalid fields provided."
}
```

### Petición (DELETE)

```bash
DELETE /products/:id
```

## Respuestas posibles del servidor

#### 1. Borrado exitoso

```json
{
  "statusCode": 200,
  "msg": "Product id has been deleted."
}
```

#### 2. Producto no encontrado

```json
{
  "statusCode": 404,
  "msg": "Product not found"
}
```

# 🛠 Servicios

Gestión de servicios para la empresa

### Petición (GET)

Listado de servicios

```bash
GET /services
```

ó

```bash
GET /services/:id
```

## Respuestas posibles del servidor

#### 1. Listado de servicios

```json
[
  {
    "_id": "string",
    "name": "Servicio 1",
    "description": "Descripción del servicio",
    "price": 200,
    "active": true,
    "createdAt": {
      "date": "2025-05-13T00:00:00.000Z",
      "timestamp": 1747094400
    }
  },
  ...
]
```

#### 2. Servicio único

```json
{
  "_id": "string",
  "name": "Servicio 1",
  "description": "Descripción del servicio",
  "price": 200,
  "active": true,
  "createdAt": {
    "date": "2025-05-13T00:00:00.000Z",
    "timestamp": 1747094400
  }
}
```

#### 3. No hay servicios almacenados

```json
{
  "statusCode": 404,
  "msg": "No services stored in the database have been found"
}
```

### Petición (POST)

Creación de servicios

```bash
POST /services
```

#### Cuerpo

```json
{
  "name": "Servicio 1",
  "description": "Descripción del servicio",
  "price": 300,
  "active": true
}
```

## Respuestas posibles del servidor

#### 1. Servicio creado

```json
{
  "statusCode": 200,
  "msg": "The service has been successfully stored"
}
```

#### 2. Parámetros faltantes

```json
{
  "statusCode": 400,
  "msg": "Missing required fields: name, description"
}
```

### Petición (PUT)

Modificar servicios existentes

```bash
PUT /services/:id
```

#### Cuerpo

```json
{
  "price": 350,
  "active": false
}
```

## Respuestas posibles del servidor

#### 1. Cambio exitoso

```json
{
  "statusCode": 200,
  "msg": "Service updated",
  "data": {
    "price": 350,
    "active": false
  }
}
```

#### 2. Parámetros no válidos

```json
{
  "statusCode": 400,
  "msg": "The service could not be updated due to invalid fields provided."
}
```

### Petición (DELETE)

```bash
DELETE /services/:id
```

### Respuestas posibles del servidor

#### 1. Borrado exitoso

```json
{
  "statusCode": 200,
  "msg": "Service id has been deleted."
}
```

#### 2. Servicio no encontrado

```json
{
  "statusCode": 404,
  "msg": "Service not found"
}
```
