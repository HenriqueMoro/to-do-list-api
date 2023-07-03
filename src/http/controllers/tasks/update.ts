import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeUpdateTaskUseCase } from '../../../use-cases/factories/make-update-task-use-case'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const taskUpdateBodySchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  })

  const validateTaskParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = validateTaskParamsSchema.parse(request.params)

  const { title, description } = taskUpdateBodySchema.parse(request.body)

  try {
    const updateTaskUseCase = makeUpdateTaskUseCase()

    await updateTaskUseCase.execute({
      id,
      title,
      description,
      user_id: request.user.sub,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
