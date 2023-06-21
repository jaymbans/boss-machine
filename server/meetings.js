const meetingsRouter = require('express').Router();
const { getAllFromDatabase } = require('./db');

meetingsRouter.get('/', (req, res, next) => {
  return res.status(200).send(getAllFromDatabase('meetings'));
})

module.exports = meetingsRouter;