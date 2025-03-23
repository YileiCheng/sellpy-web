import React, { useState, useEffect } from 'react'
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Checkbox,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)

  useEffect(() => {
    const autosave = () => {
      saveTodoList(todoList.id, { todos })
    }
    autosave()
  }, [todos])

  const handleChange = (event, index) => {
    const newTodos = [...todos]
    newTodos[index] = { title: event.target.value, completed: false }
    setTodos(newTodos)
  }

  const handleCompleteStatusChange = (event, index) => {
    const newTodos = [...todos]
    newTodos[index] = { title: todos[index].title, completed: event.target.checked }
    setTodos(newTodos)
  }

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index)
    setTodos(newTodos)
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {todos.map((todo, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={todo.completed}
                onChange={(event) => handleCompleteStatusChange(event, index)}
                size='large'
              />
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={todo.title}
                disabled={todo.completed}
                onChange={(event) => handleChange(event, index)}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => handleDelete(index)}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([...todos, { title: '', completed: false }])
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
