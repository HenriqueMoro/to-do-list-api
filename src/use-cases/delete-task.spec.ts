import { expect, describe, it, beforeEach, expectTypeOf } from 'vitest'
import { randomUUID } from 'crypto'
import { InMemoryTasksRepository } from '../repositories/in-memory/in-memory-tasks-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { DeleteTaskUseCase } from './delete-task'

let taskRepository: InMemoryTasksRepository
let deleteTaskUseCase: DeleteTaskUseCase

describe('Delete Task Use Case', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTasksRepository()
    deleteTaskUseCase = new DeleteTaskUseCase(taskRepository)
  })

  it('should be able to delete a task', async () => {
    const createdTask = await taskRepository.create({
      title: 'Preparar o almoço',
      description: 'Descongelar a carne e temperar a mesma',
      user_id: randomUUID(),
    })

    await expectTypeOf(() =>
      deleteTaskUseCase.execute({
        user_id: createdTask.user_id,
        id: createdTask.id,
      }),
    ).toBeVoid
  })

  it('should not be able to updated an inexistent task', async () => {
    const createdTask = await taskRepository.create({
      title: 'Preparar o almoço',
      description: 'Descongelar a carne e temperar a mesma',
      user_id: randomUUID(),
    })

    await expect(() =>
      deleteTaskUseCase.execute({
        user_id: createdTask.user_id,
        id: 'inexistent-task-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to updated a task of other users', async () => {
    const createdTask = await taskRepository.create({
      title: 'Preparar o almoço',
      description: 'Descongelar a carne e temperar a mesma',
      user_id: randomUUID(),
    })

    await expect(() =>
      deleteTaskUseCase.execute({
        user_id: 'invalid-task-id',
        id: createdTask.id,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
