import { Prisma, Task } from '@prisma/client'
import { randomUUID } from 'crypto'
import { ITasksRepository } from '../tasks-repository'

export class InMemoryTasksRepository implements ITasksRepository {
  public tasks: Task[] = []

  async create(data: Prisma.TaskUncheckedCreateInput) {
    const task = {
      id: randomUUID(),
      title: data.title,
      description: data.description || null,
      completed_at: null,
      user_id: data.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    }
    this.tasks.push(task)
    return task
  }

  async findById(id: string) {
    const task = this.tasks.find((task) => task.id === id)
    return task || null
  }

  async findManyByUserId(
    user_id: string,
    id?: string,
    title?: string,
    description?: string,
  ) {
    let filteredTasks = this.tasks.filter((task) => task.user_id === user_id)

    if (id) {
      filteredTasks = filteredTasks.filter((task) => task.id === id)
    }

    if (title) {
      filteredTasks = filteredTasks.filter((task) => task.title.includes(title))
    }

    if (description) {
      filteredTasks = filteredTasks.filter(
        (task) => task.description && task.description.includes(description),
      )
    }

    return filteredTasks
  }

  async update(data: { id: string; title?: string; description?: string }) {
    const { id } = data

    const taskIndex = this.tasks.findIndex((task) => task.id === id)
    if (taskIndex === -1) {
      throw new Error('Task not found')
    }

    const updatedTask = {
      ...this.tasks[taskIndex],
      title:
        data.title !== undefined ? data.title : this.tasks[taskIndex].title,
      description:
        data.description !== undefined
          ? data.description
          : this.tasks[taskIndex].description,
      updated_at: new Date(),
    }

    this.tasks[taskIndex] = updatedTask

    return updatedTask
  }

  async delete(id: string): Promise<void> {
    const index = this.tasks.findIndex((task) => task.id === id)
    if (index !== -1) {
      this.tasks.splice(index, 1)
    }
  }

  async complete(id: string): Promise<Task> {
    const taskIndex = this.tasks.findIndex((task) => task.id === id)

    const completedTask = { ...this.tasks[taskIndex], completed_at: new Date() }
    this.tasks[taskIndex] = completedTask

    return completedTask
  }
}
