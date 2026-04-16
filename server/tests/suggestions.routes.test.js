const request = require('supertest')

describe('PATCH /api/suggestions/:id', () => {
  let app

  beforeEach(() => {
    jest.resetModules()
    app = require('../app')
  })

  test('returns 400 when status is missing', async () => {
    const res = await request(app)
      .patch('/api/suggestions/550e8400-e29b-41d4-a716-446655440001')
      .send({})

    expect(res.status).toBe(400)
    expect(res.body.error).toMatch(/Status is required/i)
  })

  test('returns 400 when status is invalid', async () => {
    const res = await request(app)
      .patch('/api/suggestions/550e8400-e29b-41d4-a716-446655440001')
      .send({ status: 'bad_status' })

    expect(res.status).toBe(400)
    expect(res.body.error).toMatch(/Status must be one of/i)
  })

  test('returns 404 when suggestion is not found', async () => {
    const res = await request(app)
      .patch('/api/suggestions/not-real-id')
      .send({ status: 'pending' })

    expect(res.status).toBe(404)
    expect(res.body.error).toMatch(/Suggestion not found/i)
  })

  test('returns 200 and updated payload for valid request', async () => {
    const res = await request(app)
      .patch('/api/suggestions/550e8400-e29b-41d4-a716-446655440001')
      .send({ status: 'completed' })

    expect(res.status).toBe(200)
    expect(res.body.status).toBe('completed')
    expect(res.body.dateUpdated).toBeDefined()
    expect(res.body.dateCompleted).toBeDefined()
  })
})