const faker = require('faker');
const fs = require('fs');

var products = [];

for (var i = 50; i >= 0; i--) {
    products.push( { type : faker.commerce.product(), name : faker.commerce.productName(), price : faker.commerce.price()  });
};

fs.writeFile(__dirname + '/.data/product50.json', JSON.stringify(products), function () {
    console.log("bigDataSet generated successfully!");
});