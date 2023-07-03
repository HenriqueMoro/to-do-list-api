import { Task } from '@prisma/client'
import { ITasksRepository } from '../repositories/tasks-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetSnackUseCaseRequest {
  id?: string
  title?: string
  description?: string
  user_id: string
}

export class GetTaskUseCase {
  constructor(private taskRepository: ITasksRepository) {}

  async execute({
    user_id,
    id,
    title,
    description,
  }: GetSnackUseCaseRequest): Promise<Task[]> {
    const tasks = await this.taskRepository.findManyByUserId(
      user_id,
      id,
      title,
      description,
    )

    if (!tasks) {
      throw new ResourceNotFoundError()
    }

    return tasks
  }
}
