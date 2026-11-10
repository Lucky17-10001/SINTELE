const express = require("express");
const cors = require("cors");
const routes = require("./src/routes");

require("./src/database");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", routes);

const porta = 3000;

app.listen(porta, () => {
    console.log(`Servidor respondendo em: http://localhost:${porta}`);
});