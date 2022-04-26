const express = require("express");
const app = express();

const printerControllers = require("../controllers/deviceControllers");
const validation = require("../validations/validation")

app.use(express.json());


// Printer

app.post("/createPrinter",validation.create,printerControllers.createPrinter);

app.get("/printerList",printerControllers.printerList);

app.put("/printer/:printerId",validation.updatePrinter,printerControllers.updatePrinters);

app.put("/printerTrigger/:printerId",validation.updateTrigger,printerControllers.updateTriggers);

module.exports = app;