import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeGetTaskUseCase } from '../../../use-cases/factories/make-get-task-use-case'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const validateTaskQueryParamsSchema = z.object({
    id: z.string().uuid().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
  })

  const { id, title, description } = validateTaskQueryParamsSchema.parse(
    request.query,
  )

  try {
    const getTaskUseCase = makeGetTaskUseCase()

    const task = await getTaskUseCase.execute({
      user_id: request.user.sub,
      id,
      title,
      description,
    })

    return reply.status(200).send({
      task,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
