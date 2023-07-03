import { PrismaTasksRepository } from '../../repositories/prisma/prisma-tasks-repository'
import { CreateTaskUseCase } from '../create-task'

export function makeCreateTaskUseCase() {
  const prismaTasksRepository = new PrismaTasksRepository()
  const createTaskUseCase = new CreateTaskUseCase(prismaTasksRepository)

  return createTaskUseCase
}
