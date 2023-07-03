import { ITasksRepository } from '../repositories/tasks-repository'
import { Task } from '@prisma/client'

interface CreateTaskUseCaseRequest {
  title: string
  description?: string
  user_id: string
}

interface CreateTaskUseCaseResponse {
  task: Task
}

export class CreateTaskUseCase {
  constructor(private taskRepository: ITasksRepository) {}

  async execute({
    title,
    description,
    user_id,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const task = await this.taskRepository.create({
      title,
      description,
      user_id,
    })

    return {
      task,
    }
  }
}
