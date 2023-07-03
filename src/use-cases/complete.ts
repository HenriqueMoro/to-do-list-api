import { Task } from '@prisma/client'
import { ITasksRepository } from '../repositories/tasks-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CompleteTaskUseCaseRequest {
  id: string
  user_id: string
}

export class CompleteTaskUseCase {
  constructor(private taskRepository: ITasksRepository) {}

  async execute({ id, user_id }: CompleteTaskUseCaseRequest): Promise<Task> {
    const task = await this.taskRepository.findById(id)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    if (task.user_id !== user_id) {
      throw new ResourceNotFoundError()
    }

    const completedTask = await this.taskRepository.complete(id)

    return completedTask
  }
}
