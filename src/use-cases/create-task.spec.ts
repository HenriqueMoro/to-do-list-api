import { expect, describe, it, beforeEach } from 'vitest'
import { randomUUID } from 'crypto'
import { CreateTaskUseCase } from './create-task'
import { InMemoryTasksRepository } from '../repositories/in-memory/in-memory-tasks-repository'

let taskRepository: InMemoryTasksRepository
let taskUseCase: CreateTaskUseCase

describe('Create Task Use Case', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTasksRepository()
    taskUseCase = new CreateTaskUseCase(taskRepository)
  })

  it('should be able create task', async () => {
    const { task } = await taskUseCase.execute({
      title: 'Almoço',
      description: 'Necessário almoçar',
      user_id: randomUUID(),
    })

    expect(task.id).toEqual(expect.any(String))
  })
})
