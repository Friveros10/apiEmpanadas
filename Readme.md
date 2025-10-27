# Proyecto Empanadas

Este proyecto es una API construida en Node.js con Sequelize para interactuar con una base de datos MySQL. A continuación, se detallan las instrucciones para instalar, ejecutar y realizar migraciones y pruebas.

## Requisitos previos

- Tener Docker instalado en tu máquina.

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/Friveros10/apiEmpanadas.git

2.  Crear archivo .env:

    En el directorio raíz del proyecto, crea un archivo .env con las siguientes variables de entorno:

    MYSQLDB_HOST=mysqldb
    MYSQLDB_ROOT_PASSWORD=rootpass
    MYSQLDB_PORT=3306
    MYSQLDB_DATABASE=empanadasdb

    MYSQLDB_LOCAL_PORT=3307
    MYSQLDB_DOCKER_PORT=3306

3. Construir las imágenes de Docker:

   Para construir las imágenes de Docker y levantar los contenedores, ejecuta el siguiente comando
   
   docker-compose up --build

----Ejecutar migraciones-----

1.  Entrar al contenedor de la aplicación:

    Primero, accede al contenedor de la aplicación:

    docker exec -it proyecto_empanadas_app /bin/bash

2.  Ejecutar las migraciones:

    Dependiendo de cómo esté configurado tu proyecto,
    probablemente uses Sequelize para las migraciones. Ejecuta las migraciones con el siguiente comando:

    npx sequelize-cli db:migrate

-----Ejecutar pruebas -----

1.  Para ejecutar las pruebas de tu API, sigue estos pasos:

    Entrar al contenedor de la aplicación (si aún no estás dentro):

    docker exec -it proyecto_empanadas_app /bin/bash

2.  Ejecutar las pruebas:

    Con las dependencias instaladas, ejecuta las pruebas con Jest utilizando el siguiente comando:

    npm test



