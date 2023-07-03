import { PrismaTasksRepository } from '../../repositories/prisma/prisma-tasks-repository'
import { DeleteTaskUseCase } from '../delete-task'

export function makeDeleteTaskUseCase() {
  const prismaTasksRepository = new PrismaTasksRepository()
  const deleteTaskUseCase = new DeleteTaskUseCase(prismaTasksRepository)

  return deleteTaskUseCase
}
