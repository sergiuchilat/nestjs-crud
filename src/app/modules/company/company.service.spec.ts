import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { DeleteResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CompanyEntity } from './company.entity';

const entityId = 1;

const entity = {
  name: 'Company 1',
  address: 'Street 1',
};

const deleteResult: DeleteResult = {
  raw: [],
  affected: 1,
};

const mockCompanyRepository = {
  save: jest.fn(async (dto) => {
    return {
      id: entityId,
      ...dto,
    };
  }),
  findOneOrFail: jest.fn(async (id) => {
    return {
      id: id,
      ...entity,
    };
  }),
  find: jest.fn(() => {
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

describe('CompanyService', () => {
  let service: CompanyService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(CompanyEntity),
          useValue: mockCompanyRepository,
        },
      ],
    }).compile();

    service = await module.get<CompanyService>(CompanyService);
  });

  it('Service defined', () => {
    expect(service).toBeDefined();
  });

  it('Create', async () => {
    expect(await service.create(entity)).toEqual({
      id: expect.any(Number),
      ...entity,
    });
    expect(mockCompanyRepository.save).toHaveBeenCalledWith(entity);
  });

  it('Get one', async () => {
    expect(await service.getOne(entityId)).not.toBe(null);
    expect(await mockCompanyRepository.findOneOrFail).toHaveBeenCalled();
  });

  it('Get all', async () => {
    expect(await service.getAll()).toEqual([
      {
        id: entityId,
        ...entity,
      },
    ]);
    expect(await mockCompanyRepository.find).toHaveBeenCalledWith();
  });

  it('Update', async () => {
    expect(await service.update(entityId, entity)).not.toBe(null);
    expect(mockCompanyRepository.update).toHaveBeenCalledWith(entityId, entity);
    expect(mockCompanyRepository.findOneOrFail).toHaveBeenCalled();
  });

  it('Delete', async () => {
    expect(await service.delete(entityId)).toBe(deleteResult);
    expect(mockCompanyRepository.delete).toHaveBeenCalledWith(entityId);
  });
});
