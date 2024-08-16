import supertest from 'supertest';
import web from '../application/web.js';
import { prismaClient } from '../application/database.js';

describe('POST /api/users/register', function () {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        email: 'admin@gmail.com',
      },
    });
  });

  it('should can register new user', async () => {
    const result = await supertest(web)
    .post('/api/users/register')
    .send({
      email: 'admin@gmail.com',
      password: '123',
      nama: 'admin',
      role: 'super_admin',
      id_lembaga: 1,
      createdAt: '2024-04-04 12:52:25',
      updatedAt: '2024-04-04 12:52:25'
    });

    expect(result.status).toBe(200);
    expect(result.body.data.email).toBe('admin@gmail.com');
    expect(result.body.data.name).toBe('admin');
  });

//   it('should reject if request is invalid', async () => {
//     const result = await supertest(web).post('api/users').send({
//       email: '',
//       password: '',
//       nama: '',
//       id_lembaga: null,
//       role: '',
//     });

//     expect(result.status).toBe(400);
//     expect(result.body.errors).toBeDefined()
//   });
});
