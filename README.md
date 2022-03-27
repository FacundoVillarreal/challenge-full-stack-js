# OperationsApp


Este es el proyecto inicial de una aplicacion para el registro de finanzas personales.

### Notas :
Recuerden reconstruir los modulos de node para la api rest de nodejs
```
backend / npm install 
```
Recuerden reconstruir los modulos del front end 
```
frontend / npm install 
```
Recuerden que para que la aplicación pueda almacenar los registros, deben crear una base de datos de PostgreSQL llamada administracion,
pueden crearla manualmente desde la interfaz pgAdmin o desde la consola SQL: 

```
CREATE DATABASE administracion;
\c administracion 
```
Para conectar el backend a la base de datos debe dirigirse a la siguiente ruta: backend/db/database.js y 
remplazar las variables de entorno por los datos de su base de datos:
```
const sequelize = new Sequelize(
    process.env.DATABASE_NAME = dbname,
    process.env.DATABASE_USER_NAME = username,
    process.env.DATABASE_PASS = password,
    {
        host: process.env.POSTGRES_HOST = host,
        dialect: 'postgres',
        pool: {
            max: 6,
            min: 0,
            require: 30000,
            idle: 10000
        },
        loggin: false
    }
)

```
Y para iniciar la app de manera local, recuerden
```
backend / npm run dev
frontend / npm start  
```
