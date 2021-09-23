const express = require('express');
const {StatusCodes} = require("http-status-codes");
const router = express.Router();
const Todo = require('../models').Todo;
const {HttpError} = require('http-errors');

router.get('/', async (req, res) => {
  const findTodos = await Todo.findAll();
  res.json(findTodos);
})

router.get('/:id', async (req, res) => {
  const {id} = req.params;
  const findTodo = await Todo.findByPk(id);
  if (!findTodo) {
    throw new Error(`${id}에 해당하는 Todo가 없습니다.`);
  }
  res.json(findTodo);
})


router.post('/', async (req, res) => {
  const {title} = req.body;
  const findTodo = await Todo.findOne({
    where: {title}
  });
  if (findTodo) {
    throw new Error(`이미 존재하는 ${title}입니다.`);
  }
  await Todo.build({
    title
  })
    .save();
  const findTodos = await Todo.findAll();
  res.json(findTodos);
})

router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  const findTodo = await Todo.findByPk(id);
  if (!findTodo) {
    throw new Error(`${id}에 해당하는 Todo가 없습니다.`);
  }
  await Todo.destroy({
    where: {id}
  });
  const findTodos = await Todo.findAll();
  res.json(findTodos);
})

router.patch(`/:id`, async (req, res) => {
  const {id} = req.params;
  const {title} = req.body;
  const findTodo = await Todo.findByPk(id);
  if (!findTodo) {
    throw new Error(`${id}에 해당하는 Todo가 없습니다.`);
  }
  await Todo.update({title},{ where: {id}});
  const findTodos = await Todo.findAll();
  res.json(findTodos);
})

module.exports = router;
