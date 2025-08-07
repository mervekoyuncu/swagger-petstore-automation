const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

// Backend URL (örnek)
const api = request('http://localhost:3000'); 

describe('API Tests', () => {
  let authToken;
  let createdItemId;

  // --- POST /login ---
  describe('POST /login', () => {
    it('should login successfully with valid credentials', async () => {
      const res = await api.post('/login')
        .send({ username: 'validUser', password: 'validPass123' })
        .expect(200);
      
      expect(res.body).to.have.property('token');
      authToken = res.body.token;  // sonraki isteklerde kullanmak için
    });

    it('should fail login with invalid credentials', async () => {
      const res = await api.post('/login')
        .send({ username: 'wrongUser', password: 'wrongPass' })
        .expect(401);
      
      expect(res.body).to.have.property('error');
    });
  });

  // --- GET /items ---
  describe('GET /items', () => {
    it('should get list of items when authorized', async () => {
      const res = await api.get('/items')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body).to.be.an('array');
    });

    it('should fail to get items when unauthorized', async () => {
      await api.get('/items')
        .expect(401);
    });
  });

  // --- POST /items ---
  describe('POST /items', () => {
    it('should create a new item with valid data', async () => {
      const newItem = { name: 'Test Item', description: 'Test description' };
      
      const res = await api.post('/items')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newItem)
        .expect(201);

      expect(res.body).to.have.property('id');
      expect(res.body.name).to.equal(newItem.name);
      createdItemId = res.body.id;
    });

    it('should fail to create item with missing fields', async () => {
      const invalidItem = { description: 'No name provided' };

      const res = await api.post('/items')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidItem)
        .expect(400);

      expect(res.body).to.have.property('error');
    });
  });

  // --- PUT /items/:id ---
  describe('PUT /items/:id', () => {
    it('should update existing item with valid data', async () => {
      const updatedData = { name: 'Updated Item', description: 'Updated description' };

      const res = await api.put(`/items/${createdItemId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updatedData)
        .expect(200);

      expect(res.body.name).to.equal(updatedData.name);
    });

    it('should fail to update with invalid id', async () => {
      await api.put('/items/invalidId')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Test' })
        .expect(400);
    });
  });

  // --- DELETE /items/:id ---
  describe('DELETE /items/:id', () => {
    it('should delete existing item successfully', async () => {
      await api.delete(`/items/${createdItemId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(204);
    });

    it('should fail to delete non-existing item', async () => {
      await api.delete(`/items/${createdItemId}`) // aynı idyi tekrar silmeye çalışıyoruz
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });
});
