import { FastifyInstance } from 'fastify'
import { create } from './create'
import { get } from './get'
import { update } from './update'
import { deleteTask } from './delete'
import { complete } from './complete'

export async function taskRoutes(app: FastifyInstance) {
  app.post('/tasks', create)
  app.get('/tasks', get)
  app.put('/tasks/:id', update)
  app.delete('/tasks/:id', deleteTask)
  app.patch('/tasks/:id/complete', complete)
}
