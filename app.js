const express = require("express");

const { sequelize, User } = require("./models");

const app = express();
app.use(express.json());

app.post("/user", async (req, resp) => {
  const { name, email, mobile } = req.body;

  try {
    const user = await User.create({ name, email, mobile });
    return resp.json(user);
  } catch (err) {
    console.log(err);
    return resp.status(500).json(err);
  }
});

app.get("/users", async (req, resp) => {
  try {
    const users = await User.findAll();

    return resp.status(200).json(users);
  } catch (err) {
    console.log(err);
    return resp.status(500).json(err);
  }
});

app.get("/user/:uuid", async (req, resp) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid },
    });
    return resp.status(200).json(user);
  } catch (err) {
    console.log(err);
    return resp.status(500).json({
      msg: "Internal Server Error!",
    });
  }
});

app.listen({ port: 5000 }, async () => {
  console.log("Listening to Port http://localhost:5000");
  await sequelize.authenticate();
  console.log("Database Connected successfully!");
});
