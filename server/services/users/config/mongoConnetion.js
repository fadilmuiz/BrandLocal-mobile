const { MongoClient } = require("mongodb");
require("dotenv").config();
// const connectionString = "mongodb://127.0.0.1:27017";
const connectionString = process.env.MONGODB_URL
let db = null;

// Fungsi untuk koneksi ke db
const mongoConnect = async () => {
  const client = new MongoClient(connectionString);

  try {
    // client.db("nama-database-yang-akan-digunakan")
    const database = client.db("3second");

    // Nilai variable global yang akan diset
    db = database;

    return database;
  } catch (err) {
    await client.close();
  }
};

// Fungsi untuk mengambil db
// Wajib dibuat, karena mongoConnect bersifat async
// Jadi tidak diketahui kapan selesainya
// (Itu juga alasannya kita menggunakan variable global "db")
const getDatabase = () => db;

module.exports = {
  mongoConnect,
  // Export getDatabase-nya
  getDatabase,
};
