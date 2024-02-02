// SCRIPT Diego Andres Alonzo Medinilla 20172 
// 1.3 Crear la coleccion de usuarios
db.createCollection('usuarios');
// 2.1 Buscar las recetas
db.recetas.find({});
// 2.2 Buscar los usuarios
db.usuarios.find({});
// 2.3 Insertar nuevo documento de recetas
db.recetas.insertOne({"title": "Pepian", "cook_time":500, "desc":"Comida tipica guatemalteca"});
// 2.4 Buscar el nuevo documento de recetas creado
db.recetas.find({title:"Pepian"});
// 2.5 Buscar titulo y tiempo de coccion
db.recetas.find({},{'_id':0, 'title':1, 'cook_time':1});
db.recetas.find({}).projection({'_id':0, 'title':1, 'cook_time':1});
// 2.6 Buscar recetas y ordenar por mayor tiempo de coccion
db.recetas.find({}).sort({'cook_time':-1});
db.recetas.find({}).sort({'cook_time':-1}).projection({_id:0, title:1, cook_time:1});
// 2.7 Investigue la instrucción update() para poder agregar un rating más a una receta y actualizar el rating promedio.
db.recetas.updateOne({'title':'Pepian'}, {$set:{'rating':100}});
db.recetas.updateOne({'title': 'Pepian'},{$set:{'rating': [100, 99, 98, 90, 91]}});
db.recetas.find({title:'Pepian'});
db.recetas.updateOne(
   { 'title': 'Pepian'},
   { $push: { 'rating': 97 } }
);
db.recetas.updateMany({title:'Pepian'},[{$set:{rating_avg:{$avg:'$rating'}}}]);
db.recetas.find({title:'Pepian'});
// 2.8 Cree una consulta en la que elimine un ingrediente de la lista de ingredientes de una receta en específico
db.recetas.updateOne(
    {title:"Pepian"}, 
    {$set: {
        ingredients:[
        { name:'Meat',amount:{ quantity:1, unit:"lbs"} },
        { name:'Tomato',amount:{ quantity:5, unit:"lbs"} },
        { name:'Water',amount:{ quantity:30, unit:"oz"} },
        { name:'Pepper Waque', amount:{ quantity:1, unit:"unit"} },
        ]
    }
    }
);
db.recetas.updateOne({title:'Pepian'},{$pull:{ingredients:{name:'Tomato'}}});
db.recetas.find({title: 'Pepian'});
// 2.9 Investigue la opción skip de la instrucción find() y cree una consulta en la que obtenga la tercera receta con mejor rating promedio
db.recetas.aggregate(
    {$sort: { rating_avg:-1 } },
    { $skip : 3 }
).limit(1);
// 2.10 Cree una consulta que busque las recetas que tienen comentarios
db.recetas.find({ comments:{$exists: true } }).projection({_id:0, title:1, comments:1});
// 2.11 Cree una consulta en la que liste las recetas que son de postres
db.recetas.find({ type: "Dessert" }).projection({_id:0, title:1, type:1} );
// 2.12 Cree una consulta en la que elimine las recetas que sean difíciles de cocinar
db.recetas.find({tags:'easy'}).projection({_id:0,title:1,tags:1});
db.recetas.deleteMany({ tags:'easy' });
db.recetas.find({});
// 2.13 Con base a la estructura observada en la colección de usuarios, cree 3 nuevos documentos de usuarios en una sola instrucción, que contenga los siguientes campos: nombre, apellido, correo electrónico y contraseña.
db.usuarios.find();
db.usuarios.insertMany([
        {firstName:'Diggs', lastName:'Papu', email:'diggs.papu@gmail.com', password: 'Manager123'},
        {firstName:'Lionel', lastName:'Messi', email:'messi.d10s@gmail.com', password: 'copa2022#'},
        {firstName:'Diego Armando', lastName:'Maradona', email:'elpelusa@gmail.com', password: 'ElDiegote'},
    ]
);
// 2.14 Cree las consultas para agregarle la receta favorita a cada uno de los usuarios creados anteriormente
db.usuarios.find({});
db.usuarios.updateOne({firstName:'Lionel', lastName:'Messi'}, {$set:{'favorite_recipe':'Milanesas a la napolitana'}});
db.usuarios.updateOne({firstName:'Diego Armando', lastName:'Maradona'}, {$set:{'favorite_recipe':'Ranas Ranas'}});
db.usuarios.updateOne({$and:[{firstName:'Diggs'}, {lastName:'Papu'}]}, {$set:{'favorite_recipe':'Pepian'}});
db.usuarios.find().projection({_id:0, firstName:1, lastName:1,lastname:1, favorite_recipe:1});
// 2.15 Cree una consulta para consultar los distintos nombres de usuarios
db.usuarios.distinct("firstName", {"lastName": {"$exists": true}});
// 2.16 Investigue el uso de expresiones regulares en la instrucción find() y cree una consulta para buscar todos los usuarios que tengan correo electrónico con dominio de Gmail
db.usuarios.find({email:{$regex:'gmail'}});
// 2.17 Agregar un campo de actividad a los usuarios, para indicar si están activos o inactivos con un valor booleano
db.usuarios.updateMany({}, {$set: {"activity":false}});
db.usuarios.find();
//2.18 Cree una consulta en la que inactive a 2 usuarios
db.usuarios.updateMany({$or:[{firstName:"Diggs"}, {firstName:"Lionel"}]}, {$set:{'activity':true}});
db.usuarios.find().projection({_id:0, firstName:1, activity:1});
db.usuarios.updateMany({$or:[{firstName:"Diggs"}, {firstName:"Lionel"}]}, {$set:{'activity':false}});
db.usuarios.find().projection({_id:0, firstName:1, activity:1});
// 2.19 Cree una consulta en la que cambie la unidad de medida de todas las recetas que tienen lb a kg.
db.recetas.find({'ingredients.amount.unit':'lbs'}).projection({_id:0, title:1, ingredients:1});
db.recetas.updateMany({'ingredients.amount.unit':'lbs'},{$set:{'ingredients.$[elem].amount.unit':'kg'}},{arrayFilters:[{'elem.amount.unit':'lbs'}]});
db.recetas.find({'ingredients.amount.unit':'lbs'}).projection({_id:0, title:1, ingredients:1});
db.recetas.find({'ingredients.amount.unit':'kg'}).projection({_id:0, title:1, ingredients:1});
db.recetas.find({'ingredients.amount.unit':'kg'}).projection({_id:0, title:1, ingredients:1});
// 2.20 Cree una consulta en la que elimine a los usuarios inactivos.
db.usuarios.updateMany({$or:[{firstName:"Diggs"}, {firstName:"Lionel"}]}, {$set:{'activity':true}});
db.usuarios.find({'activity':true});
db.usuarios.deleteMany({'activity':false});
db.usuarios.find();

db.recetas.deleteMany({});
db.usuarios.deleteMany({});
