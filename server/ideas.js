const ideasRouter = require('express').Router();
const { getAllFromDatabase } = require('./db');

ideasRouter.get('/', (req, res, next) => {
  return res.status(200).send(getAllFromDatabase('ideas'));
})

module.exports = ideasRouter;