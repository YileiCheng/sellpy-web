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
  Dialog,
  DialogContent,
  Divider,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)
  const [showDatePicker, setShowDatePicker] = useState(null)

  useEffect(() => {
    saveTodoList(todoList.id, { todos })
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setShowDatePicker(null)
  }

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index)
    setTodos(newTodos)
  }

  const getDaysLeft = (dueDate) => {
    const today = dayjs().startOf('day')
    const due = dayjs(dueDate).startOf('day')
    return due.diff(today, 'day')
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card sx={{ margin: '0 1rem' }}>
        <CardContent>
          <Typography component='h2'>{todoList.title}</Typography>
          <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            {todos.map((todo, index) => (
              <div key={index} style={{ marginBottom: '1rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: todo.completed ? '2rem' : '1rem',
                  }}
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
                  <Button
                    sx={{ margin: '8px' }}
                    aria-label='delete todo'
                    size='small'
                    color='secondary'
                    onClick={() => handleDelete(index)}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
                {!todo.completed && (
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <Button
                      onClick={() => setShowDatePicker(index)}
                      sx={{
                        marginRight: '1rem',
                        backgroundColor: todo.dueDate ? 'inherit' : '#e6e9ed',
                      }}
                    >
                      {todo.dueDate ? dayjs(todo.dueDate).format('DD/MM/YYYY') : 'Add Date'}
                    </Button>
                    {todo.dueDate && (
                      <Typography
                        variant='body2'
                        sx={{
                          color: getDaysLeft(todo.dueDate) < 0 ? 'red' : 'green',
                          visibility: todo.completed ? 'hidden' : 'visible',
                        }}
                      >
                        {getDaysLeft(todo.dueDate) < 0 &&
                          `${Math.abs(getDaysLeft(todo.dueDate))} days overdue`}
                        {getDaysLeft(todo.dueDate) === 0 && 'Due today'}
                        {getDaysLeft(todo.dueDate) === 1 && 'Due tomorrow'}
                        {getDaysLeft(todo.dueDate) > 1 && `${getDaysLeft(todo.dueDate)} days left`}
                      </Typography>
                    )}
                  </div>
                )}
                <Dialog open={showDatePicker === index} onClose={() => setShowDatePicker(null)}>
                  <DialogContent>
                    <StaticDatePicker
                      sx={{
                        '& .MuiPickersLayout-actionBar': {
                          visibility: 'hidden',
                        },
                      }}
                      orientation='landscape'
                      openTo='day'
                      value={dayjs(todo.dueDate)}
                      onChange={(date) => handleDateChange(date, index)}
                    />
                  </DialogContent>
                </Dialog>
                <Divider />
              </div>
            ))}
            <CardActions>
              <Button
                type='button'
                color='primary'
                onClick={() => {
                  setTodos([...todos, { title: '', completed: false, dueDate: null }])
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
