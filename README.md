# fp.resultados

[![Build Status](https://travis-ci.org/jamj2000/fp.resultados.svg?branch=master)](https://travis-ci.org/jamj2000/fp.resultados) 

Aplicación web para la calificación de Resultados de Aprendizaje en la FP

## Introducción

Aplicación web realizada en Javascript (ES6). 

Los componentes utilizados han sido:

- Node
- Express
- MongoDB y Mongoose
- Passport
- Plantillas Pug (anteriormente Jade)


## Importación a MongoDB de datos en archivo CSV

```bash
mongoimport -d nombredb -c nombrecoleccion --type csv --file datos.csv --headerline

mongoimport -d nombredb -c nombrecoleccion --type csv --file datos.csv --fields campo1,campo2,...
```

## Ejecución en Docker

```bash
git clone https://github.com/jamj2000/fp.resultados.git
cd fp.resultados

docker  build  -t  app-image  .
docker  run    -p  5000:3000  --name app  app-image
```

## Recursos

- https://github.com/madhums/node-express-mongoose
- https://github.com/madhums/node-express-mongoose/wiki
- https://medium.com/@patriciolpezjuri/empezando-con-docker-86f388316551


## Nota

En un primer momento intenté hacer el desplige en https://fp-resultados.herokuapp.com/ , pero la base de datos MongoDB que proporciona, aunque gratis, pide dar datos de tarjeta de crédito. Y como que no me gusta mucho ir dando por ahí los datos de mi tarjeta de crédito ...
