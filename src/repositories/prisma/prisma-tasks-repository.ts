import { prisma } from '../../lib/prisma'
import { Prisma } from '@prisma/client'
import { ITasksRepository } from '../tasks-repository'

export class PrismaTasksRepository implements ITasksRepository {
  async create(data: Prisma.TaskUncheckedCreateInput) {
    const task = await prisma.task.create({
      data,
    })

    return task
  }

  async delete(id: string) {
    await prisma.task.delete({
      where: {
        id,
      },
    })
  }

  async findById(id: string) {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    })

    return task
  }

  async findManyByUserId(
    user_id: string,
    id?: string,
    title?: string,
    description?: string,
  ) {
    const tasks = await prisma.task.findMany({
      where: {
        user_id,
        id,
        title: {
          contains: title,
        },
        description: {
          contains: description,
        },
      },
    })

    return tasks
  }

  async update(data: { id: string; title?: string; description?: string }) {
    const { id } = data

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        description: data.description,
        updated_at: new Date(),
      },
    })

    return task
  }

  async complete(id: string) {
    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        completed_at: new Date(),
      },
    })

    return task
  }
}
