db.ventas.find();

// De las compras realizadas con cupones de descuento, ¿cual es el año de nacimiento mas común de los usuarios que realizan estas compras?
db.ventas.aggregate([
    {
        $match:{"couponUsed":true}
    },
    {
        $group:{_id:"$customer.age", totalCount:{$count:{}}}
    },
    {
        $sort:{totalCount:-1}
    },
    {
        $limit:1
    }
    ])
    // Respuesta 1989 asumiendo que es a partir de este año entonces es 2024-39
   
// ¿Cual es el tercer articulo de oficina mas vendido con precio menor a $15?
db.ventas.aggregate([
    {
        $unwind:
        {
            path:"$items"
        }
    },
    {
        $project:
        {
            _id:1,
            "items.name": 1,
            "items.price":1,
            "items.quantity":1,
            priceLess:{$lt:["$items.price",15]}
        }
    },
    {
        $match:{priceLess:true}
    },
    {
        $group:{_id:"$items.name", totalCount:{$sum:"$items.quantity"}}
    },
    {
        $sort:{totalCount:-1}
    },
    {
        $limit:3
    },
    {
        $sort:{totalCount:1}
    },
    {
        $limit:1
    }
    ]);
    // Fue el notepad con 2430 unidades vendidas
    
// ¿Cual es el artículo que tiene el precio unitario promedio mas caro?
db.ventas.aggregate([
    {
        $unwind:
        {
            path:"$items"
        }
    },
    {
        $group:{_id:"$items.name", totalCount:{$avg:"$items.price"}}
    },
    {
        $sort:{totalCount:-1}
    },
    {
        $limit:1
    }
    ])
    // El articulo con el precio unitario mas caro es la laptop con 983.42
    
// ¿Cual es el id de la factura/venta con mayor monto facturado en 2014?
db.ventas.aggregate([
    {
        $unwind:
        {
            path:"$items"
        }
    },
    {
        $project:
        {
            _id:1,
            is2014:{$eq:[{$year:"$saleDate"},2014]},
            saleDate:1,
            items:1,
            
        }
    },
    {
        $match:{is2014:true}
    },
     {
        $group:{_id:"$_id", totalCount:{$sum:{$multiply: ["$items.quantity", "$items.price"]}}}
    },
    {
        $sort:{totalCount:-1}
    },
    {
        $limit:1
    }
    ])
    // El id de la venta con mayor monto es 5bd761dcae323e45a93cd1dd
    
// ¿En que mes-año (yyyy-mm) se venden mayor cantidad de artículos?
db.ventas.aggregate([
    {
        $unwind:
        {
            path:"$items"
        }
    },
    {
        $group: { _id: [{$year:"$saleDate"},{$month:"$saleDate"}],totalCount:{$sum:"$items.quantity"}}
    },
     {
        $sort:{totalCount:-1}
    },
    {
        $limit:1
    }
    ])
    // En 2016-12 se vendieron 1155 articulos

// ¿Cual es el artículo mas vendido en transacciones con un nivel de satisfacción del cliente de 3?
db.ventas.aggregate([
    {
        $match:{"customer.satisfaction":3}
    },
    {
        $unwind:
        {
            path:"$items"
        }
    },
    {
        $group:{_id:"$items.name", totalCount:{$sum:"$items.quantity"}}
    },
    {
        $sort:{totalCount:-1}
    },
    {
        $limit:1
    },
    ])
    // binder es el articulo mas vendido
    
// // De las compras realizadas con cupones de descuento, ¿cual es el año de nacimiento mas común de los usuarios que realizan estas compras?
db.ventas.aggregate([
    {
        $match:{"couponUsed":true}
    },
    {
         $project:
        {
            _id:1,
            "saleDate":1,
            "items.name": 1,
            "items.price":1,
            "items.quantity":1,
            year:{$subtract:[{$year:"$saleDate"}, "$customer.age"]},
            "customer.age":1
        }
    },
    {
        $group:{_id:"$year", totalCount:{$count:{}}}
    },
    {
        $sort:{totalCount:-1}
    },
    {
        $limit:1
    }
    ])    
    