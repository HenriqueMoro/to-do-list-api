import { expect, describe, it, beforeEach } from 'vitest'
import { randomUUID } from 'crypto'
import { InMemoryTasksRepository } from '../repositories/in-memory/in-memory-tasks-repository'
import { UpdateTaskUseCase } from './update-task'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let taskRepository: InMemoryTasksRepository
let updateTaskUseCase: UpdateTaskUseCase

describe('Update Task Use Case', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTasksRepository()
    updateTaskUseCase = new UpdateTaskUseCase(taskRepository)
  })

  it('should be able to update a task', async () => {
    const createdTask = await taskRepository.create({
      title: 'Preparar o almoço',
      description: 'Descongelar a carne e temperar a mesma',
      user_id: randomUUID(),
    })

    const task = await updateTaskUseCase.execute({
      id: createdTask.id,
      user_id: createdTask.user_id,
      title: 'Lavar a louça',
    })

    expect(task.title).toEqual('Lavar a louça')
  })

  it('should not be able to updated an inexistent task', async () => {
    const createdTask = await taskRepository.create({
      title: 'Preparar o almoço',
      description: 'Descongelar a carne e temperar a mesma',
      user_id: randomUUID(),
    })

    await expect(() =>
      updateTaskUseCase.execute({
        user_id: createdTask.user_id,
        id: 'inexistent-task-id',
        title: 'Sair na rua',
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
      updateTaskUseCase.execute({
        user_id: 'invalid-task-id',
        id: createdTask.id,
        title: 'Sair na rua',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
