const fs = require("fs");
const path = require("path");

const jsonFilePath = "./productsData.json"; // Update with the actual path

function updateJsonFile() {
  try {
    const jsonData = require(jsonFilePath);
    const updatedData = {};
    const categories = [
      "Téléphone & Tablette",
      "Informatique",
      "Maison, cuisine & bureau",
      "Vêtements & Chaussures",
      "Supermarché",
      "Électroménager",
      "Beauté & Santé",
      "Jeux vidéos & Consoles",
      "Sports & Loisirs",
      "Bébé & Jouets",
      "TV & Hi Tech",
    ];
    const products = Object.values(jsonData);

    // Group products by category
    const productsByCategory = {};
    categories.forEach((category) => {
      productsByCategory[category] = products.filter(
        (product) => product.category === category
      );
    });

    // Assign image URLs with counts
    for (const category of categories) {
      const categoryProducts = productsByCategory[category];
      const categoryCount = categoryProducts.length;

      categoryProducts.forEach((product, index) => {
        const imageCount = index + 1;
        product.image = `/images/${category}/${imageCount}.jpg`;
        updatedData[product.id] = product;
      });
    }

    // Sort the products to show each category's records together
    const sortedProducts = categories.flatMap(
      (category) => productsByCategory[category]
    );

    const updatedJson = JSON.stringify(sortedProducts, null, 2);

    fs.writeFileSync(jsonFilePath, updatedJson);
    console.log("JSON file updated successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

updateJsonFile();
