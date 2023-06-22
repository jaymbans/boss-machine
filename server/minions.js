const minionsRouter = require('express').Router();
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, deleteFromDatabasebyId, updateInstanceInDatabase } = require('./db');


minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);

  if (!minion) {
    return res.status(400).send('minion not found')
  }

  req.minion = minion;
  req.minionId = id;
  next();
})

minionsRouter.param('workId', (req, res, next, id) => {
  const work = getFromDatabaseById('work', id);

  if (!work) {
    return res.status(400).send('work not found')
  }

  req.work = work;
  req.workId = id;
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

  updateInstanceInDatabase('minions', newMinion)

  return res.status(201).send(newMinion)
})

minionsRouter.delete('/:minionId', (req, res, next) => {

  return res.status(201).send(deleteFromDatabasebyId('minions', req.minionId))
})

// work bonus section
minionsRouter.get('/:minionId/work', (req, res) => {
  return res.send(getAllFromDatabase('work'))
})

minionsRouter.post('/:minionId/work', (req, res) => {
  return res.send(addToDatabase('work', req.body))
})

minionsRouter.put('/:minionId/work/:workId', (req, res) => {
  const newWork = req.body;
  req.work = newWork;

  updateInstanceInDatabase('work', newWork)

  return res.send(req.work)
})



module.exports = minionsRouter;