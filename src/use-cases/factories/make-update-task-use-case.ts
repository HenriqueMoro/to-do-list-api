import { PrismaTasksRepository } from '../../repositories/prisma/prisma-tasks-repository'
import { UpdateTaskUseCase } from '../update-task'

export function makeUpdateTaskUseCase() {
  const prismaTasksRepository = new PrismaTasksRepository()
  const updateTaskUseCase = new UpdateTaskUseCase(prismaTasksRepository)

  return updateTaskUseCase
}
