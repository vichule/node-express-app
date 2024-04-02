import request from 'supertest'
import {app} from '../app'

const apitoken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJBZG1pbiIsImlhdCI6MTcxMjA2ODM0OCwiZXhwIjoxODY3NTg4MzQ4fQ.K9dEnxfqpjRkDAF7IPbFktOYBv88h1XszGhPtV4XzEA'

describe('Post Endpoints', () => {
  it('should delete a booking', async () => {
    const res = await request(app)
      .delete('/bookings/28')
      .set({authorization: apitoken})
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual('Booking with id: 28 has been deleted');
  })
})

describe('Post Endpoints', () => {
  it('should not delete a booking and send error', async () => {
    const res = await request(app)
      .delete('/bookings/40')
      .set({authorization: apitoken})
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual('Error, the booking doesnt exist');
  })
})