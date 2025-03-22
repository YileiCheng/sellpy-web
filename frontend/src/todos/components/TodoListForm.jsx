import React, { useState, useEffect } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)

  const debounce = (func, delay) => {
    let debounceTimer
    return function (...args) {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => func.apply(this, args), delay)
    }
  }

  const autosave = debounce(() => {
    saveTodoList(todoList.id, { todos })
  }, 1000)

  useEffect(() => {
    autosave()
  }, [todos, autosave])

  const handleChange = (event, index) => {
    const newTodos = [...todos]
    newTodos[index] = event.target.value
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
          {todos.map((name, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={name}
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
                setTodos([...todos, ''])
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
