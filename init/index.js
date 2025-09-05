// seeds.js
const mongoose = require("mongoose");
const initData = require("./data.js"); // your listings data
const Listing = require("../models/listing.js"); // adjust path if needed

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to database");

        // Clear existing listings
        await Listing.deleteMany({});
        console.log("Cleared existing listings");

        // Add owner field to all listings
        const listingsWithOwner = initData.data.map(listing => ({
            ...listing,
            owner: new mongoose.Types.ObjectId("68add018955ea4cf0e6cc460"),
        }));

        // Insert new listings
        await Listing.insertMany(listingsWithOwner);
        console.log("Database has been seeded with new listings");

        // Close connection
        await mongoose.connection.close();
        console.log("Database connection closed");
    } catch (err) {
        console.error("Error seeding database:", err);
    }
}

main();
