import express from 'express'
import cors from 'cors'
import todoListRoutes from '../routes/todoListRoutes.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.use('/api/todoList', todoListRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
