import { PrismaTasksRepository } from '../../repositories/prisma/prisma-tasks-repository'
import { GetTaskUseCase } from '../get-task'

export function makeGetTaskUseCase() {
  const prismaTasksRepository = new PrismaTasksRepository()
  const getTaskUseCase = new GetTaskUseCase(prismaTasksRepository)

  return getTaskUseCase
}
