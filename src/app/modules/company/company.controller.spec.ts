import { CompanyController } from './company.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';

describe('CompanyController', () => {
  let controller: CompanyController;
  let service: CompanyService;
  const entity = {
    name: 'Company 1',
    address: 'Street 1',
  };

  const mockCompanyService = {
    create: jest.fn((dto) => {
      return {
        id: 1,
        ...dto,
      };
    }),
    getOne: jest.fn(async (id) => {
      return {
        id: id,
        ...entity,
      };
    }),
    getAll: jest.fn(async () => {
      return [
        {
          id: 1,
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
    delete: jest.fn((id) => {
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [CompanyService],
    })
      .overrideProvider(CompanyService)
      .useValue(mockCompanyService)
      .compile();

    controller = await module.get<CompanyController>(CompanyController);
    service = await module.get<CompanyService>(CompanyService);
  });

  it('Controller defined', () => {
    expect(controller).toBeDefined();
  });

  it('Create', () => {
    expect(controller.create(entity)).toEqual({
      id: expect.any(Number),
      name: entity.name,
      address: entity.address,
    });
    expect(mockCompanyService.create).toHaveBeenCalledWith(entity);
  });

  it('Get one', async () => {
    const entityId = 1;
    expect(await controller.getOne(entityId)).toEqual({
      id: entityId,
      ...entity,
    });
    expect(await mockCompanyService.getOne).toHaveBeenCalledWith(entityId);
  });

  it('Get all', async () => {
    const entityId = 1;
    expect(await controller.getAll()).toEqual([
      {
        id: entityId,
        ...entity,
      },
    ]);
    expect(await mockCompanyService.getAll).toHaveBeenCalledWith();
  });

  it('Update', () => {
    const entityId = 1;
    expect(controller.update(entityId, entity)).toEqual({
      id: entityId,
      name: entity.name,
      address: entity.address,
    });
    expect(mockCompanyService.update).toHaveBeenCalledWith(entityId, entity);
  });

  it('Delete', () => {
    const entityId = 1;
    expect(controller.delete(entityId)).toBe(null);
    expect(mockCompanyService.delete).toHaveBeenCalledWith(entityId);
  });
});
