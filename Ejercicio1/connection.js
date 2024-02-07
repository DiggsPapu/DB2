const { MongoClient } = require('mongodb');
function getRandomDate(startDate, endDate) {
    // Convert input dates to timestamps
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
  
    // Generate a random timestamp within the range
    const randomTimestamp = Math.floor(Math.random() * (endTimestamp - startTimestamp + 1)) + startTimestamp;
  
    // Create a new Date object using the random timestamp
    const randomDate = new Date(randomTimestamp);
  
    return randomDate;
  }

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
async function createUser(client, user) {
    const result = await client.db("lab2").collection("usuarios").insertOne(user);
};
async function countUsuarioDocuments(client) {
    const result = await client.db("lab2").collection("usuarios").countDocuments();
    return result;
};
function generateRandomArray(length) {
    const randomArray = [];
    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * 100001);
      randomArray.push(randomNumber);
    }
    return randomArray;
  }
async function main(){
    const uri = "mongodb+srv://alo20172:Manager123@cluster0.sabth1r.mongodb.net";
    const client = new MongoClient(uri);
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2024-12-31');
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        // await  listDatabases(client);
        posible_products = ["Producto 1", "Producto 2", "Producto 3", "Producto 4", "Producto 5", "Producto 6", "Producto 7", "Producto 8", "Producto 9", "Producto 10"]
        posible_colors = ["azul", "rojo", "verde", "morado", "naranja"]
        posible_idiomas = ["spanish", "english", "german", "italian"]
        // console.log( countUsuarioDocuments(client))
        for (let k =0; k < 150000; k++){
            await createUser(client, {
                "nombre": "nombre"+k, 
                "email": "nombre"+k+"@gmail.com", 
                "fecha_registro":getRandomDate(startDate, endDate), 
                "puntos": Math.floor(Math.random() * 10001), 
                "historial_compras":[{"producto":posible_products[Math.floor(Math.random()*10)], "fecha": getRandomDate(startDate, endDate)},{"producto":posible_products[Math.floor(Math.random()*10)], "fecha": getRandomDate(startDate, endDate)},{"producto":posible_products[Math.floor(Math.random()*10)], "fecha": getRandomDate(startDate, endDate)}], 
                "direccion":{"calle":"calle"+k%15, "ciudad":"ciudad"+k%7, "codigo_postal":k%150}, 
                "tags":"tag"+k%5, 
                "archivo":Math.random()<0.5, 
                "notas":"nota"+k%8, 
                "visitas":Math.floor(Math.random() * 10001),
                "amigos":generateRandomArray(Math.floor(Math.random()*1002)), 
                "preferencias": [{"color":posible_colors[Math.floor(Math.random()*6)],"idioma":posible_idiomas[Math.floor(Math.random()*5)], "tema":"tema"+(k*3)%3},
                {"color":posible_colors[Math.floor(Math.random()*6)],"idioma":posible_idiomas[Math.floor(Math.random()*5)], "tema":"tema"+(k*3)%5}]
            })
        };
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);