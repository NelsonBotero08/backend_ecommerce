const sequelize = require("../utils/connection");
const request = require("supertest");
const app = require("../app");

const main = async () => {
  try {
    sequelize.sync();

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

main();
