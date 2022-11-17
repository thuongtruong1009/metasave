const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

import seedRoles from "./role.seeder";
import seedTags from "./tag.seeder";
import seedUsers from "./user.seeder";
import seedProjects from "./project.seeder";
import seedColumns from "./column.seeder";
import seedCards from "./card.seeder";

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
    await cls.collection("roles").insertMany(seedRoles);

    console.log("-> Seeding tag");
    await cls.collection("tags").insertMany(seedTags);

    console.log("-> Seeding user");
    await cls.collection("users").insertMany(seedUsers);

    console.log("-> Seeding project");
    await cls.collection("projects").insertMany(seedProjects);

    console.log("-> Seeding column");
    await cls.collection("columns").insertMany(seedColumns);

    console.log("-> Seeding card");
    await cls.collection("cards").insertMany(seedCards);

    console.log("Database seeded!");
    await client.close();
  } catch (err) {
    console.log(err);
  }
}

seedDB();
