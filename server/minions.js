const minionsRouter = require('express').Router();
const { getAllFromDatabase } = require('./db');

minionsRouter.get('/', (req, res, next) => {
  return res.status(200).send(getAllFromDatabase('minions'));
})

module.exports = minionsRouter;