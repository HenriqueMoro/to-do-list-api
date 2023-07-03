import { Prisma, Task } from '@prisma/client'

export interface ITasksRepository {
  findById(id: string): Promise<Task | null>
  create(data: Prisma.TaskUncheckedCreateInput): Promise<Task>
  delete(id: string): Promise<void>
  complete(id: string): Promise<Task>
  update(data: {
    id: string
    title?: string
    description?: string
  }): Promise<Task>
  findManyByUserId(
    user_id: string,
    id?: string,
    title?: string,
    description?: string,
  ): Promise<Task[]>
}
