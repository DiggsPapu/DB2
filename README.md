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