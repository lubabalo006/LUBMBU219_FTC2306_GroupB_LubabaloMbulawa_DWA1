const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State'];
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie'];

// 1. Console log each name.
names.forEach((name) => {
  console.log(name);
});

// 2. Console log each name with a matching province.
names.forEach((name, index) => {
  console.log(`${name} (${provinces[index]})`);
});

// 3. Map to uppercase province names.
const uppercaseProvinces = provinces.map((province) => province.toUpperCase());
console.log(uppercaseProvinces);

// 4. Map to the number of characters in each name.
const nameLengths = names.map((name) => name.length);
console.log(nameLengths);

// 5. Sort provinces alphabetically.
const sortedProvinces = provinces.sort();
console.log(sortedProvinces);

// 6. Filter and count provinces without the word "Cape".
const filteredProvinces = provinces.filter((province) => !province.includes("Cape"));
console.log(filteredProvinces.length);

// 7. Map and use some to determine if a name contains 'S'.
const nameContainsS = names.map((name) => name.includes('S'));
console.log(nameContainsS);

// 8. Reduce to create an object indicating the province of an individual.
const provinceObject = names.reduce((result, name, index) => {
    result[name] = provinces[index];
    return result;
  }, {});

  console.log(provinceObject);



const products = [
  { product: 'banana', price: "2" },
  { product: 'mango', price: 6 },
  { product: 'potato', price: ' ' },
  { product: 'avocado', price: "8" },
  { product: 'coffee', price: 10 },
  { product: 'tea', price: '' },
];

// 1. Console log each product name.
products.forEach((product) => {
  console.log(product.product);
});

// 2. Filter products with a name longer than 5 characters.
const filteredProducts = products.filter((product) => product.product.length < 5);
console.log(filteredProducts);

// 3. Filter, map prices to numbers, and calculate the combined price of remaining products.
const validProducts = products.filter(product => !isNaN(product.price) && product.price !== '');
const prices = validProducts.map(product => Number(product.price));
const combinedPrice = prices.reduce((total, price) => total + price, 0);

console.log(combinedPrice);

// 4. Reduce to concatenate all product names.
const productNames = products.reduce((result, product, index, array) => {
  result += product.product;
  if (index < array.length - 1) {
    result += ', ';
  }
  return result;
}, '');
console.log(productNames);


// 5. Reduce to calculate the highest and lowest-priced items.
const highestPrice = Math.max(...prices);
const lowestPrice = Math.min(...prices);

const highestProduct = validProducts.find(product => Number(product.price) === highestPrice);
const lowestProduct = validProducts.find(product => Number(product.price) === lowestPrice);

const resultString = `Highest: ${highestProduct.product}. Lowest: ${lowestProduct.product}.`;
console.log(resultString);

// 6. Recreate an object with modified keys using Object.entries and reduce.
const modifiedProducts = products.reduce((result, product) => {
    
    result[product.product === 'product' ? 'name' : 'cost'] = product.price;
    return result;
  }, {});
  
  console.log(modifiedProducts);
