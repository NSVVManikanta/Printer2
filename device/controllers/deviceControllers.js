// const printerGroups = require('../models/PrinterGroups');
// const triggers = require('../models/triggers');
const db = require("../../util/database");
const commonHelper = require("../../Helper");

/**
 * create
 * @param {*} title
 * @param {*} description
 * @param {*} printType
 * @param {*} activeStatus
 * @param {*} triggers array
 * @param {*} trigger
 * @param {*} orderType
 * @returns
 */
//Create Printer Group
const createPrinterGroups = async (req, res) => {
  let t;
  try {
    // t = await db.sequelize.transaction();
    // console.log("entered", t);
    // console.log( "date",commonHelper.getTimeStamp())
    const printer = await db.PrinterGroups.create(
      {
        title: req.body.title,
        description: req.body.description,
        printType: req.body.printType,
        activeStatus: req.body.activeStatus,
      }
      // { transaction: t }
    );
    const triggers = req.body.triggers;
    const triggerArr = triggers.map((trigger) => {
      trigger.printerGroupId = printer.id;
      // trigger.createdAt = commonHelper.getTimeStamp();
      return trigger;
    });
    console.log(triggerArr);
    await db.PrinterGroupTriggers.bulkCreate(triggerArr, {
      individualHooks: true,
      // transaction: t,
    });
    // await t.commit();
    res.status(200).send({
      title: printer.title,
      description: printer.description,
      printType: printer.printType,
      activeStatus: printer.activeStatus,
    });
  } catch (error) {
    // await t.rollback();
    console.log(error);
    res.status(404).send({ error: "The Printer Does not Created!" });
  }
};

/**
 * list
 * @param {*} req
 * @param {*} res
 */
//PrinterGroup List
const printerGroupsList = async (req, res) => {
  try {
    const printerList = await db.PrinterGroups.findAll({
      include: [
        {
          model: db.PrinterGroupTriggers,
        },
      ],
    });
    res.status(200).send(printerList);
  } catch (err) {
    console.log(err);
    res.status(404).send({ error: "The Printers does not Display!" });
  }
};

/**
 * update printergroup
 * @param {*} title
 * @param {*} description
 * @param {*} printType
 * @param {*} activeStatus
 * @returns String
 */
//Update PrinterGroup
const updatePrinterGroups = async (req, res) => {
  try {
    const { printerId } = req.params;
    await db.PrinterGroups.update(
      {
        title: req.body.title,
        description: req.body.description,
        printType: req.body.printType,
        activeStatus: req.body.activeStatus,
      },
      { where: { id: printerId }, individualHooks: true }
    );
    res.status(200).send("Printers Updated Successfully");
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "The Printer does not update." });
  }
};

/**
 * update printertrigger
 * @param {*} trigger
 * @param {*} orderType
 * @returns string
 */
//update printeGroupTrigger
const updatePrinterTriggers = async (req, res) => {
  try {
    const { triggerId } = req.params;
    await db.PrinterGroupTriggers.update(
      {
        trigger: req.body.trigger,
        orderType: req.body.orderType,
      },
      { where: { id: triggerId }, individualHooks: true }
    );
    res.status(200).send("Triggers Updated Successfully!");
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "The Trigger does not update." });
  }
};
module.exports = {
  createPrinterGroups,
  printerGroupsList,
  updatePrinterGroups,
  updatePrinterTriggers,
};

