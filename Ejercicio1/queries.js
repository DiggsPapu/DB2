// 1.2.a Usuarios activos con más de 500 puntos
db.usuarios.find({"puntos":{$gt:500}});
db.usuarios.find({"puntos":{$gt:500}}).count();
// 1.2.b Usuarios que han comprado el producto 1 en la última semana
db.usuarios.find({ "historial_compras": { $elemMatch: { "fecha": { $gt: ISODate("2024-01-31T16:00:00Z"), $lt: ISODate("2024-02-07T16:00:00Z") }, "producto": "Producto 1" } } }).projection({"_id":1, "historial_compras":1})
db.usuarios.find({ "historial_compras": { $elemMatch: { "fecha": { $gt: ISODate("2024-01-31T16:00:00Z"), $lt: ISODate("2024-02-07T16:00:00Z") }, "producto": "Producto 1" } } }).projection({"_id":1, "historial_compras":1}).count()
// 1.2.c Usuarios con la etiqueta tag 2 y que tienen más de 100 visitas
db.usuarios.find({"tags":"tag2", "visitas":{$gt:100}});
db.usuarios.find({"tags":"tag2", "visitas":{$gt:100}}).count();
// 1.2.d Usuarios con preferencias de color azul y que tienen entre 1000 y 2000 amigos.
db.usuarios.find({ "preferencias": { $elemMatch: { "color": "azul" } }, $expr: { $gt: [{ $size: "$amigos" }, 999] } });
db.usuarios.find({ "preferencias": { $elemMatch: { "color": "azul" } }, $expr: { $gt: [{ $size: "$amigos" }, 999] } }).count();
