# Lab 7
Inicializar

![alt text](image.png)
![alt text](image-1.png)

## EJERCICIO 01
hdfs dfs

![alt text](image-2.png)

hdfs dfs --help

![alt text](image-3.png)
![alt text](image-4.png)

hdfs dfs --help ls

![alt text](image-5.png)

hdfs dfs -ls file:///usr

![alt text](image-6.png)

hdfs dfs -ls hdfs:///user

![alt text](image-7.png)

hdfs dfs -ls /user

![alt text](image-8.png)

## EJERCICIO 02

hdfs dfs -ls /

![alt text](image-9.png)

hdfs dfs -ls

![alt text](image-10.png)

hdfs dfs -mkdir -p dir1/dir2/dir3

![alt text](image-11.png)

hdfs dfs -ls dir1

![alt text](image-12.png)

hdfs dfs -ls /user/cloudera/dir1

![alt text](image-13.png)

hdfs dfs -ls -R

![alt text](image-14.png)

## EJERCICIO 03


Ejercicio 3:
Copiar el archivo (constitution.txt) del file system local hacia el home directory del usuario cloudera dentro de HDFS. Liste el directorio destino evidenciando que se haya copiado el archivo.
















Despliegue el contenido del archivo constitution.txt que se encuentra en HDFS

























Despliegue únicamente el final del archivo (1 KB). Use la función tail.






















Mueva el archivo desde su ubicación actual al dir3 que se creó previamente.






Liste el directorio padre de forma recursiva para evidenciar esto






















Ahora, traiga el archivo de regreso al file system local (el origen debería ser el directorio del paso anterior) bajo el nombre de constitution_download.txt




Copie a HDFS el archivo /etc/passwd en la carpeta del directorio home del usuario cloudera.
Copie a HDFS el archivo /etc/hosts en la carpeta del directorio home del usuario cloudera
Utilice el comando -getmerge para copiarlos de vuelta al file system como un único archivo en la carpeta Documents bajo el nombrepasswd_hosts
















Despliegue el contenido del archivo en cuestión en el sistema operativo



Ahora borremos el archivo passwd del directorio home del usuario cloudera dentro de Cloudera Express, luego listemos el directorio para verificar que se ha eliminado.


¿Qué mensaje recibió cuando eliminó el archivo passwd?, y cuando se listó el contenido del directorio home en HDFS ¿notó que ahora hay un nuevo directorio .Trash? Investigue qué significa este directorio y lo que almacena.
Cuando eliminas un archivo en HDFS, recibirás un mensaje indicando que el archivo fue eliminado exitosamente. La aparición de un nuevo directorio .Trash en el directorio home en HDFS significa que se ha habilitado la papelera de reciclaje y que los archivos eliminados se mueven a este directorio en lugar de ser eliminados permanentemente. Puedes restaurar archivos eliminados de la papelera de reciclaje si es necesario.
