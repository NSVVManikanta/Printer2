const Joi = require("joi");
//create printer validations
const schema = Joi.object({
  title: Joi.string().alphanum().min(0).max(250).required(),
  description: Joi.string().required(),
  printType: Joi.number().integer().required(),
  activeStatus: Joi.boolean().required(),
  triggers: Joi.array().items(
    Joi.object({
      trigger: Joi.number().integer().required(),
      orderType: Joi.number().integer().required(),
    })
  ),
});
function create(req, res, next) {
  const dataToValidate = {
    title: req.body.title,
    description: req.body.description,
    printType: req.body.printType,
    activeStatus: req.body.activeStatus,
    triggers: req.body.triggers,
  };
  const schemaerr = schema.validate(dataToValidate);
  if (schemaerr.error) {
    return res.status(404).send(schemaerr.error.message);
  }
  next();
};

//update printer validations
const schema1 = Joi.object({
    title: Joi.string().alphanum().min(2).max(250).required(),
    description: Joi.string(),
    printType: Joi.number().valid(1,2),
    activeStatus: Joi.boolean(),
  });
function updatePrinter(req, res, next) {
  const dataToValidate1 = [{
    title: req.body.title,
    description: req.body.description,
    printType: req.body.printType,
    activeStatus: req.body.activeStatus,
  }];
  const schemaerr1 = schema1.validate(dataToValidate1);
  if (schemaerr1.error) {
    return res.send(schemaerr1.error.message);
  }
  next();
};

//update printertrigger validations
const schema2 = Joi.object({
    trigger:  Joi.number(),
    orderType: Joi.number(),
  });
function updateTrigger(req, res, next) {
  const dataToValidate2 = [{
    trigger: req.body.trigger,
    orderType: req.body.orderType,
  }];
  const schemaerr2 = schema2.validate(dataToValidate2);
  if (schemaerr2.error) {
    return res.send(schemaerr2.error.message);
  }
  next();
};

module.exports = {
  create,
  updatePrinter,
  updateTrigger,
};
