import { expect, describe, it, beforeEach } from 'vitest'
import { randomUUID } from 'crypto'
import { InMemoryTasksRepository } from '../repositories/in-memory/in-memory-tasks-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { CompleteTaskUseCase } from './complete'

let taskRepository: InMemoryTasksRepository
let completeTaskUseCase: CompleteTaskUseCase

describe('Complete Task Use Case', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTasksRepository()
    completeTaskUseCase = new CompleteTaskUseCase(taskRepository)
  })

  it('should be able to complete a task', async () => {
    const createdTask = await taskRepository.create({
      title: 'Preparar o almoço',
      description: 'Descongelar a carne e temperar a mesma',
      user_id: randomUUID(),
    })

    const task = await completeTaskUseCase.execute({
      user_id: createdTask.user_id,
      id: createdTask.id,
    })

    expect(task.completed_at).toBeTypeOf('object')
  })

  it('should not be able to completed an inexistent task', async () => {
    const createdTask = await taskRepository.create({
      title: 'Preparar o almoço',
      description: 'Descongelar a carne e temperar a mesma',
      user_id: randomUUID(),
    })

    await expect(() =>
      completeTaskUseCase.execute({
        user_id: createdTask.user_id,
        id: 'inexistent-task-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to completed a task of other users', async () => {
    const createdTask = await taskRepository.create({
      title: 'Preparar o almoço',
      description: 'Descongelar a carne e temperar a mesma',
      user_id: randomUUID(),
    })

    await expect(() =>
      completeTaskUseCase.execute({
        user_id: 'invalid-task-id',
        id: createdTask.id,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
