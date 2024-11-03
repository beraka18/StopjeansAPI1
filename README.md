# API de Stop Jeans
## Descripción
Esta API permite gestionar los usuarios, productos y órdenes en la tienda Stop Jeans.

## Endpoints

### 1. Iniciar sesión
- **Método**: `POST`
- **URL**: `/Login`
- **Cuerpo de la solicitud**:
  ```json
  {
    "nombre": "Nombre del usuario",
    "correo": "Correo electrónico",
    "contraseña": "Contraseña",
    "direccion": "Dirección del usuario"
  }
  Respuesta exitosa :

Código :200
Cuerpo :
{
  "mensaje": "Inicio de sesión exitoso para: Nombre del usuario"
}
Respuesta de error :

Código :401
Cuerpo :
{
  "mensaje": "Credenciales incorrectas"
}
Validar sesión
Método :GET
URL :/Validar
Respuesta :
Código :200
Cuerpo :
{
  "mensaje": "Sesión validada!"
}
Configuración
Asegúrese de que la base de datos esté configurada correctamente. La API utiliza una conexión a MySQL, donde se debe definir el usuario, contraseña y nombre de la base de datos en el archivo app.js.
Uso
Puedes interactuar con la API utilizando herramientas como Postman o mediante comandos curl. Por ejemplo, para iniciar sesión:
curl -X POST http://localhost:3000/Login -H "Content-Type: application/json" -d '{
  "nombre": "Nombre del usuario",
  "correo": "correo@example.com",
  "contraseña": "contraseña123",
  "direccion": "Dirección del usuario"
}'
Requisitos
Node.js (v14 o superior)
MySQL
Dependencias necesarias:
Expresar
MySQL2

