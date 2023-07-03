import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCompleteTaskUseCase } from '../../../use-cases/factories/make-complete-task-use-case'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'

export async function complete(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const validateTaskParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = validateTaskParamsSchema.parse(request.params)

  try {
    const completeTaskUseCase = makeCompleteTaskUseCase()

    await completeTaskUseCase.execute({
      id,
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
