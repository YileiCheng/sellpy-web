import React, { Fragment, useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { TodoListForm } from './TodoListForm'
import { getTodoLists, updateTodoList } from '../api/todoListApi'

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  const loadTodoList = async () => {
    try {
      const todoList = await getTodoLists()
      setTodoLists(todoList)
    } catch (error) {
      console.error('Failed to load todo lists:', error)
    }
  }

  const saveTodoList = async (id, { todos }) => {
    try {
      const listToUpdate = todoLists[id]
      const updatedList = { ...listToUpdate, todos }
      await updateTodoList(id, updatedList)
      setTodoLists((prevTodoLists) => ({
        ...prevTodoLists,
        [id]: updatedList,
      }))
    } catch (error) {
      console.error('Failed to save todo list:', error)
    }
  }

  useEffect(() => {
    loadTodoList()
  }, [])

  if (!Object.keys(todoLists).length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItemButton key={key} onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todoLists[key].title} />
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList={saveTodoList}
        />
      )}
    </Fragment>
  )
}
