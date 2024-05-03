const express = require("express");

const { sequelize, User } = require("./models");

const app = express();
app.use(express.json());

app.post("/users", async (req, resp) => {
  const { name, email, role } = req.body;

  try {
    const user = await User.create({ name, email, role });
    return resp.status(201).json();
  } catch (err) {
    console.log(err);
    return resp.status(500).json(err);
  }
});

app.listen({ port: 5000 }, async () => {
  console.log("Listening to Port http://localhost:5000");
  await sequelize.sync();
  console.log("Database Synced");
});
