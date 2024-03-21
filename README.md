# Lab 5 - Cypher Neo4j
Este es la branch en la cuál se realizó el laboratorio 5 de Neo4j.

## Ejercicio 1 - Análisis General
* ¿Qué opiniones tiene sobre este grafo?
    Parece ser un grafo conexo de manera que todos los nodos están conectados y no hay nodos sueltos. Hay más nodos persona que nodos de películas lo que tiene sentido dado que existen más actores por cada película generada.![alt text](image.png)
* ¿Considera que puede sacar algunas conclusiones sobre las relaciones que encuentra visualizadas? En caso contrario, ¿por qué? ¿qué necesitaría para sacar conclusiones?
    Considero que una conclusión que puedo obtener es que es un grafo dirigido ya que la relación es la siguiente. 
    ![alt text](image-1.png) 
    Así mismo, otra conclusión que puedo sacar es que basado en teoría de grafos que no tiene un paseo euleriano (_Un circuito hamilton en un grafo es un circuito que pasa a través de cada vértice del grafo una y sólo una vez_) debido a que múltiples personas trabajan en una misma película y en múltiples películas hay personas que solo han trabajado en esa película. Por ello es casi imposible que haya un circuito hamilton.
* Analice el propósito de explorar información de esta manera.
    Es importante analizar la información de esta manera por varias razones, entre las que están:
    * Ver una  aproximación de cómo es que está conectada la data.
    * Visualizar patrones sobre la data que podríamos analizar ya en código.

## Ejercicio 2 - Interacciones con Cypher
* Cree un nodo nuevo de tipo persona con el nombre del actor Michael Caine. Utilice la sentencia MERGE para evitar crear nodos duplicados.
![alt text](image-2.png)
* Verifique que se haya creado el nodo con la sentencia MATCH.
![alt text](image-3.png)
* También puede utilizar muchas sentencias merge dentro de un mismo query de cypher. Ejecute la siguiente sentencia: 
    _MERGE (p:Person {name: 'Katie Holmes'})
    MERGE (m:Movie {title: 'The Dark Knight'})
    RETURN p, m_
![alt text](image-4.png)
* Como se revisó en la sesión, se podrá utilizar la sentencia MERGE también para crear relaciones. Cree una relación ACTED_IN para el actor Michael Caine y la película The Dark Night.
![alt text](image-5.png)
* Verifique que esa relación existe.
![alt text](image-6.png)
* Ahora, unifique los conocimientos del paso 3 y resto de pasos para que, con una misma sentencia, utilice una cadena de comandos MERGE
para crear un nodo persona con el nombre Chadwick Boseman, un nodo de tipo película con el título Black Panther y la relación ACTED_IN.
![alt text](image-7.png)
* Confirme que la relación haya funcionado.
![alt text](image-8.png)
* Ahora, con el resultado del comando anterior (paso 6), modifique el query para que en una misma consulta MERGE cree un nodo persona (Emily Blunt), un nodo película (A Quiet Place) y la relación ACTED_IN.
![alt text](image-9.png)
Verificando la creación del nodo.
![alt text](image-10.png)
