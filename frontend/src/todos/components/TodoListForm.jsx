import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
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
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

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
    newTodos[index] = { ...newTodos[index], title: event.target.value }
    setTodos(newTodos)
  }

  const handleCompleteStatusChange = (event, index) => {
    const newTodos = [...todos]
    newTodos[index] = { ...newTodos[index], completed: event.target.checked }
    setTodos(newTodos)
  }

  const handleDateChange = (date, index) => {
    const newTodos = [...todos]
    newTodos[index] = { ...newTodos[index], dueDate: date }
    setTodos(newTodos)
  }

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index)
    setTodos(newTodos)
  }

  const getDaysLeft = (dueDate) => {
    const today = dayjs()
    const due = dayjs(dueDate)
    return due.diff(today, 'day')
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card sx={{ margin: '0 1rem' }}>
        <CardContent>
          <Typography component='h2'>{todoList.title}</Typography>
          <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            {todos.map((todo, index) => (
              <div
                key={index}
                style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}
              >
                <Checkbox
                  checked={todo.completed}
                  onChange={(event) => handleCompleteStatusChange(event, index)}
                  size='large'
                />
                <Typography sx={{ margin: '8px' }} variant='h6'>
                  {index + 1}
                </Typography>
                <TextField
                  sx={{ flexGrow: 1, marginTop: '1rem', marginRight: '1rem' }}
                  label='What to do?'
                  value={todo.title}
                  disabled={todo.completed}
                  onChange={(event) => handleChange(event, index)}
                />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <DatePicker
                    label='Due Date'
                    value={todo.dueDate ? dayjs(todo.dueDate) : dayjs()}
                    onChange={(date) => handleDateChange(date, index)}
                    sx={{ marginTop: '3rem' }}
                  />
                  <Typography
                    sx={{
                      color: getDaysLeft(todo.dueDate) < 0 ? 'red' : 'green',
                      marginTop: '0.5rem',
                    }}
                  >
                    {getDaysLeft(todo.dueDate) < 0
                      ? `${Math.abs(getDaysLeft(todo.dueDate))} days overdue`
                      : `${getDaysLeft(todo.dueDate)} days left`}
                  </Typography>
                </div>
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
                  setTodos([...todos, { title: '', completed: false, dueDate: dayjs() }])
                }}
              >
                Add Todo <AddIcon />
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </LocalizationProvider>
  )
}
