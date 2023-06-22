const minionsRouter = require('express').Router();
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, deleteFromDatabasebyId } = require('./db');


minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);

  if (!minion) {
    return res.status(400).send('minion not found')
  }

  req.minion = minion;
  req.minionId = id;
  next();
})

minionsRouter.get('/', (req, res, next) => {
  return res.status(200).send(getAllFromDatabase('minions'));
})


minionsRouter.post('/', (req, res, next) => {

  const newMinion = addToDatabase('minions', req.body)
  res.status(201).send(newMinion)
})

minionsRouter.get('/:minionId', (req, res, next) => {
  return res.send(req.minion);
})

minionsRouter.put('/:minionId', (req, res, next) => {
  const newMinion = req.body;
  req.minion = newMinion;

  return res.status(201).send(newMinion)
})

minionsRouter.delete('/:minionId', (req, res, next) => {

  return res.status(201).send(deleteFromDatabasebyId('minions', req.minionId))
})



module.exports = minionsRouter;