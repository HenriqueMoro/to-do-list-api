import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateTaskUseCase } from '../../../use-cases/factories/make-create-task-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const taskCreateBodySchema = z.object({
    title: z.string(),
    description: z.string().optional(),
  })

  const { title, description } = taskCreateBodySchema.parse(request.body)

  const createTaskUseCase = makeCreateTaskUseCase()

  await createTaskUseCase.execute({
    title,
    description,
    user_id: request.user.sub,
  })

  return reply.status(201).send()
}
