import { Test, TestingModule } from '@nestjs/testing'
import { MiniocloudController } from './miniocloud.controller'

describe('MiniocloudController', () => {
  let controller: MiniocloudController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiniocloudController],
    }).compile()

    controller = module.get<MiniocloudController>(MiniocloudController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
