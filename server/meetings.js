const meetingsRouter = require('express').Router();
const { getAllFromDatabase, deleteAllFromDatabase } = require('./db');

meetingsRouter.get('/', (req, res, next) => {
  return res.status(200).send(getAllFromDatabase('meetings'));
})


meetingsRouter.post('/', (req, res, next) => {

  const newMeeting = addToDatabase('meetings', req.body)
  res.status(201).send(newMeeting)
})

meetingsRouter.delete('/', (req, res, next) => {

  return res.send(deleteAllFromDatabase('meetings'));
})

module.exports = meetingsRouter;