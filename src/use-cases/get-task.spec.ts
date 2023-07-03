import { expect, describe, it, beforeEach } from 'vitest'
import { GetTaskUseCase } from './get-task'
import { randomUUID } from 'crypto'
import { InMemoryTasksRepository } from '../repositories/in-memory/in-memory-tasks-repository'

let taskRepository: InMemoryTasksRepository
let getTaskUseCase: GetTaskUseCase

describe('Get Task Use Case', () => {
  beforeEach(() => {
    taskRepository = new InMemoryTasksRepository()
    getTaskUseCase = new GetTaskUseCase(taskRepository)
  })

  it('should be able to get a task', async () => {
    const createdTask = await taskRepository.create({
      title: 'Preparar o almoço',
      description: 'Descongelar a carne e temperar a mesma',
      user_id: randomUUID(),
    })

    const task = await getTaskUseCase.execute({
      user_id: createdTask.user_id,
    })

    expect(task[0].title).toEqual('Preparar o almoço')
  })
})
