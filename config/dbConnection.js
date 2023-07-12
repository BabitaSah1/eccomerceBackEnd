const knex = require("knex")({
    client : "mysql2",
    connection:{
        host : "localhost",
        user : "root",
        password : "Neetu@#123",
        database : "ecommercewebsite"
    }
});

knex.schema.createTable("salers", (table)=>{
    table.increments("id");
    table.string("salerName");
    table.string("email");
    table.string("password");
    table.string("phoneNo");
    table.timestamp("createAt").defaultTo(knex.fn.now());

}).then((result) => {
    console.log("salers table has created successfully!");
}).catch((err) => {
    // console.log(err);
});

knex.schema.createTable("buyers", (table)=>{
    table.increments("buyersId");
    table.string("nameOfCustomer");
    table.string("email");
    table.string("password");
    table.timestamp("createAt").defaultTo(knex.fn.now());

}).then((result) => {
    console.log("buyers table has created successfully!");
}).catch((err) => {
    // console.log(err);
});

knex.schema.createTable("addtocart", (table)=>{
    table.increments("addtocartId");
    table.string("buyerId");
    table.string("product_id");
    table.string("saler_id");
    table.string("status");
    table.timestamp("createAt").defaultTo(knex.fn.now());

}).then((result) => {
    console.log("addToCart table has created successfully!");
}).catch((err) => {
    // console.log(err);
});

knex.schema.createTable("selectedProducts", (table)=>{
    table.increments("id");
    table.string("productsName");
    table.string("productQuantity");
    table.string("salerId");
    table.string("productPrice");
    table.string("quality");
    table.timestamp("createAt").defaultTo(knex.fn.now());

}).then((result) => {
    console.log("selectedProducts table has created successfully!");
}).catch((err) => {
    // console.log(err);
});

module.exports = knex;