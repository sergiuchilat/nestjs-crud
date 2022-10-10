import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CompanyModule } from '../src/app/modules/company/company.module';
import { DeleteResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CompanyEntity } from '../src/app/modules/company/company.entity';

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
      id: entityId,
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

describe('CompanyController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CompanyModule],
    })
      .overrideProvider(getRepositoryToken(CompanyEntity))
      .useValue(mockCompanyRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/companies (GET)', () => {
    return request(app.getHttpServer())
      .get('/companies')
      .expect(200)
      .expect([
        {
          id: entityId,
          ...entity,
        },
      ]);
  });

  it('/companies/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/companies/${entityId}`)
      .expect(200)
      .expect({
        id: entityId,
        ...entity,
      });
  });
});
