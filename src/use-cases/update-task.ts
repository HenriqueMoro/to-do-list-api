// import { Snack } from '@prisma/client'
import { Task } from '@prisma/client'
import { ITasksRepository } from '../repositories/tasks-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateTaskUseCaseRequest {
  id: string
  title?: string
  description?: string
  user_id: string
}

export class UpdateTaskUseCase {
  constructor(private taskRepository: ITasksRepository) {}

  async execute({
    id,
    title,
    description,
    user_id,
  }: UpdateTaskUseCaseRequest): Promise<Task> {
    const task = await this.taskRepository.findById(id)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    if (task.user_id !== user_id) {
      throw new ResourceNotFoundError()
    }

    const updatedTask = await this.taskRepository.update({
      id,
      title,
      description,
    })

    return updatedTask
  }
}
