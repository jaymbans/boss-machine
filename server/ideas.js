const ideasRouter = require('express').Router();
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, deleteFromDatabasebyId } = require('./db');

ideasRouter.param('ideaId', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);

  if (!idea) {
    return res.status(400).send('idea not found')
  }

  req.idea = idea;
  req.ideaId = id;
  next();
})

ideasRouter.get('/', (req, res, next) => {
  return res.status(200).send(getAllFromDatabase('ideas'));
})

ideasRouter.post('/', (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body)
  res.status(201).send(newIdea)
})

ideasRouter.get('/:ideaId', (req, res, next) => {
  return res.send(req.idea);
})

ideasRouter.put('/:ideaId', (req, res, next) => {
  const newIdea = req.body;
  req.idea = newIdea;

  return res.status(201).send(newIdea)
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
  return res.status(201).send(deleteFromDatabasebyId('ideas', req.ideaId))
})

module.exports = ideasRouter;