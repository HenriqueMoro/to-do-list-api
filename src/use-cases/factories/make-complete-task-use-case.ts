import { PrismaTasksRepository } from '../../repositories/prisma/prisma-tasks-repository'
import { CompleteTaskUseCase } from '../complete'

export function makeCompleteTaskUseCase() {
  const prismaTasksRepository = new PrismaTasksRepository()
  const completeTaskUseCase = new CompleteTaskUseCase(prismaTasksRepository)

  return completeTaskUseCase
}
