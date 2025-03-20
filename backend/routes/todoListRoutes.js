import express from 'express'
import { getTodoList, updateTodoList } from '../controllers/todoListController.js'

const router = express.Router()

router.get('/', getTodoList)
router.post('/:id', updateTodoList)

export default router
