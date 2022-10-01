import { CompanyController } from './company.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { DeleteResult } from 'typeorm';

const entityId = 1;

const entity = {
  name: 'Company 1',
  address: 'Street 1',
};

const deleteResult: DeleteResult = {
  raw: [],
  affected: 1,
};

const mockCompanyService = {
  create: jest.fn((dto) => {
    return {
      id: entityId,
      ...dto,
    };
  }),
  getOne: jest.fn((id) => {
    return {
      id: id,
      ...entity,
    };
  }),
  getAll: jest.fn(() => {
    return [
      {
        id: entityId,
        ...entity,
      },
    ];
  }),
  update: jest.fn((id, dto) => {
    return {
      id: id,
      ...dto,
    };
  }),
  delete: jest.fn(() => {
    return deleteResult;
  }),
};

describe('CompanyController', () => {
  let controller: CompanyController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [CompanyService],
    })
      .overrideProvider(CompanyService)
      .useValue(mockCompanyService)
      .compile();

    controller = await module.get<CompanyController>(CompanyController);
  });

  it('Controller defined', () => {
    expect(controller).toBeDefined();
  });

  it('Create', () => {
    expect(controller.create(entity)).toEqual({
      id: expect.any(Number),
      ...entity,
    });
    expect(mockCompanyService.create).toHaveBeenCalledWith(entity);
  });

  it('Get one', async () => {
    expect(await controller.getOne(entityId)).toEqual({
      id: entityId,
      ...entity,
    });
    expect(await mockCompanyService.getOne).toHaveBeenCalledWith(entityId);
  });

  it('Get all', async () => {
    expect(await controller.getAll()).toEqual([
      {
        id: entityId,
        ...entity,
      },
    ]);
    expect(await mockCompanyService.getAll).toHaveBeenCalledWith();
  });

  it('Update', () => {
    expect(controller.update(entityId, entity)).toEqual({
      id: entityId,
      ...entity,
    });
    expect(mockCompanyService.update).toHaveBeenCalledWith(entityId, entity);
  });

  it('Delete', () => {
    expect(controller.delete(entityId)).toBe(deleteResult);
    expect(mockCompanyService.delete).toHaveBeenCalledWith(entityId);
  });
});
