import { ITasksRepository } from '../repositories/tasks-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteTaskUseCaseRequest {
  id: string
  user_id: string
}

export class DeleteTaskUseCase {
  constructor(private taskRepository: ITasksRepository) {}

  async execute({ id, user_id }: DeleteTaskUseCaseRequest): Promise<void> {
    const task = await this.taskRepository.findById(id)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    if (task.user_id !== user_id) {
      throw new ResourceNotFoundError()
    }

    await this.taskRepository.delete(id)
  }
}
