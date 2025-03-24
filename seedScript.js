import "dotenv/config";
import mongoose from "mongoose";
import { Category, Product } from './src/models/index.js';
import { categories, products } from "./seedData.js";


async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await Category.deleteMany({});
        await Product.deleteMany({});

        const categoryDocs = await Category.insertMany(categories);

        const categoryMap = categoryDocs.reduce((acc, category) => {
            acc[category.name] = category._id;
            return acc;
        }, {});


        const productDocs = products.map(product => {
            return { ...product, category: categoryMap[product.category] };
        });


        await Product.insertMany(productDocs);

        console.log("Data seeded successfully");
    } catch (error) {
        console.log("Error in Data seeding: ", error.message);

    } finally {
        mongoose.connection.close();
    }
}

await seedDatabase();

