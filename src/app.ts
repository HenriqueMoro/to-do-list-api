import fastify from 'fastify'
import { userRoutes } from './http/controllers/users/routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { taskRoutes } from './http/controllers/tasks/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(userRoutes)
app.register(taskRoutes)
