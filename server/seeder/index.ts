const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

import seedRole from "./role.seeder";
import seedTag from "./tag.seeder";
import seedUser from "./user.seeder";
import seedProject from "./project.seeder";
import seedColumn from "./column.seeder";
import seedCard from "./card.seeder";

async function seedDB() {
  const uri = process.env.MONGO_URL;
  const database = process.env.DB_NAME;
  const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const client = new MongoClient(uri, options);
  const cls = client.db(database);

  try {
    await client.connect();

    console.log("-> Seeding role");
    await cls.collection("role").insertMany(seedRole);

    console.log("-> Seeding tag");
    await cls.collection("tag").insertMany(seedTag);

    console.log("-> Seeding user");
    await cls.collection("user").insertMany(seedUser);

    console.log("-> Seeding project");
    await cls.collection("project").insertMany(seedProject);

    console.log("-> Seeding column");
    await cls.collection("column").insertMany(seedColumn);

    console.log("-> Seeding card");
    await cls.collection("card").insertMany(seedCard);

    console.log("Database seeded!");
    await client.close();
  } catch (err) {
    console.log(err);
  }
}

seedDB();
