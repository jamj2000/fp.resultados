#!/bin/bash


if     [ $OPENSHIFT_APP_DNS ] ;then
    HOST=$OPENSHIFT_MYSQL_DB_HOST
  PUERTO=$OPENSHIFT_MYSQL_DB_PORT
 USUARIO=$OPENSHIFT_MYSQL_DB_USERNAME
   CLAVE=$OPENSHIFT_MYSQL_DB_PASSWORD
else
    HOST="localhost"
  PUERTO="27017"
 USUARIO=""
   CLAVE=""
fi

BASEDATOS="fp"
ALUMNOS="alumnos.csv"
PROFESORES="profesores.csv"
MODULOS="modulos.csv"
MODULOS_ALUMNOS="modulos_alumnos.csv"


echo "Eliminando datos previos de $BASEDATOS"
echo "db.dropDatabase()" | mongo $BASEDATOS

# echo "Creando base de datos $BASEDATOS y creando colecciones"
# echo "db.createCollection('profesores'); db.createCollection('alumnos'); db.createCollection('modulos') " | mongo $BASEDATOS


echo "Importando datos desde archivo $PROFESORES"
mongoimport  -d $BASEDATOS -c profesores --type csv --file $PROFESORES  \
             --headerline --fields='id,apellido1,apellido2,nombre,tutoria,email,alias,password,admin'


echo "Importando datos desde archivo $ALUMNOS"
mongoimport  -d $BASEDATOS -c alumnos --type csv --file $ALUMNOS  \
             --headerline --fields='id,apellido1,apellido2,nombre,curso,fecha_nac,email,id_escolar'

echo "Importando datos desde archivo $MODULOS"
mongoimport  -d $BASEDATOS -c modulos --type csv --file $MODULOS  \
             --headerline --fields='id,profesor_id,siglas,nombre,curso,ciclo,horas_totales,horas_semanales,num_resultados,r1_peso,r2_peso,r3_peso,r4_peso,r5_peso,r6_peso,r7_peso,r8_peso,r9_peso' 

echo "Importando datos desde archivo $MODULOS_ALUMNOS"
mongoimport  -d $BASEDATOS -c modulos_alumnos --type csv --file $MODULOS_ALUMNOS  \
             --headerline --fields='modulo_id,alumno_id,r1,r2,r3,r4,r5,r6,r7,r8,r9' 



