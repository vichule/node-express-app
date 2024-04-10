import request from 'supertest'
import { app } from '../app'
import { roomModel } from '../schemas/RoomSchema'
import mongoose from 'mongoose'

const apitoken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJBZG1pbiIsImlhdCI6MTcxMjA2ODM0OCwiZXhwIjoxODY3NTg4MzQ4fQ.K9dEnxfqpjRkDAF7IPbFktOYBv88h1XszGhPtV4XzEA'

describe('Delete booking Endpoints', () => {
  it('should delete a booking', async () => {
    const res = await request(app)
      .delete('/bookings/19')
      .set({ authorization: apitoken })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual('Booking with id: 19 has been deleted');
  })

  it('should not delete a booking and send error with status 404', async () => {
    const res = await request(app)
      .delete('/bookings/6615742675136ee36030f515')
      .set({ authorization: apitoken })
    expect(res.statusCode).toEqual(404)
  })
})


describe('Post room Endpoints', () => {
  const room = {"__v": 0,
     "_id": "661673156475f0f65b8b1d61",
     "amenities":  [
       "Air conditioner",
       "Breakfast",
       "Cleaning",
       "Grocery",
       "Shop near",
       "Smart Security",
       "Kitchen",
       "Shower",
       "Towels",
     ],
     "cancellation": "Lorem ipsum dolor sit amet.",
     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
     "discount": 20,
     "offer": true,
     "photos": [
       "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI0fHxzaW5nbGUlMjByb29tJTIwaG90ZWx8ZW58MHx8MHx8fDA%3D",
       "https://images.unsplash.com/photo-1576354302919-96748cb8299e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNpbmdsZSUyMHJvb20lMjBob3RlbHxlbnwwfHwwfHx8MA%3D%3D",
       "https://images.unsplash.com/photo-1619128395560-8a749ac9926d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHNpbmdsZSUyMGJlZCUyMGhvdGVsfGVufDB8fDB8fHww",
     ],
     "price": 200,
     "room_number": 304,
     "room_type": "Double Bed",
     "status": "available",
    }

  it('should add a new room', async () => {
    const res = await request(app)
      .post('/rooms')
      .set({ authorization: apitoken })
      .send({

        _id: "661673156475f0f65b8b1d61",
        room_type: "Double Bed",
        room_number: 304,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: 200,
        offer: true,
        discount: 20,
        cancellation: "Lorem ipsum dolor sit amet.",
        photos: [
          "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI0fHxzaW5nbGUlMjByb29tJTIwaG90ZWx8ZW58MHx8MHx8fDA%3D",
          "https://images.unsplash.com/photo-1576354302919-96748cb8299e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNpbmdsZSUyMHJvb20lMjBob3RlbHxlbnwwfHwwfHx8MA%3D%3D",
          "https://images.unsplash.com/photo-1619128395560-8a749ac9926d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHNpbmdsZSUyMGJlZCUyMGhvdGVsfGVufDB8fDB8fHww"
        ],
        amenities: [
          "Air conditioner",
          "Breakfast",
          "Cleaning",
          "Grocery",
          "Shop near",
          "Smart Security",
          "Kitchen",
          "Shower",
          "Towels"
        ],
        status: "available"

      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject(room);
  })


  it('should not add a new room and send error with status 401', async () => {
    const res = await request(app)
      .post('/rooms')
      .send({

        id: 50,
        room_type: "Double Bed",
        room_number: 304,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: 200,
        offer: true,
        discount: 20,
        cancellation: "Lorem ipsum dolor sit amet.",
        photos: [
          "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI0fHxzaW5nbGUlMjByb29tJTIwaG90ZWx8ZW58MHx8MHx8fDA%3D",
          "https://images.unsplash.com/photo-1576354302919-96748cb8299e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNpbmdsZSUyMHJvb20lMjBob3RlbHxlbnwwfHwwfHx8MA%3D%3D",
          "https://images.unsplash.com/photo-1619128395560-8a749ac9926d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHNpbmdsZSUyMGJlZCUyMGhvdGVsfGVufDB8fDB8fHww"
        ],
        amenities: [
          "Air conditioner",
          "Breakfast",
          "Cleaning",
          "Grocery",
          "Shop near",
          "Smart Security",
          "Kitchen",
          "Shower",
          "Towels"
        ],
        status: "available"

      })
    expect(res.statusCode).toEqual(401)
  })
})

describe('Delete room Endpoints', () => {
  it('should delete a room', async () => {
    const res = await request(app)
      .delete('/rooms/66169d9b5ed7f99442e7c6b9')
      .set({ authorization: apitoken })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual('room with id: 66169d9b5ed7f99442e7c6b9 has been deleted');
  })

  it('should not delete a room and send error with status 404', async () => {
    const res = await request(app)
      .delete('/rooms/66169d9b5ed7f99442e7c6b9')
      .set({ authorization: apitoken })
    expect(res.statusCode).toEqual(404)
  })
})


describe('Put users Endpoints', () => {
  const user = { "_id": "6615742675136ee36030f52d", "description": "Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.", "email": "lphittiplace1@vistaprint.com", "first_name": "Manolo", "job": "Recepcionist", "last_name": "puroLado", "password": "$2a$05$Hk4BVkjxwpq1mkxm79026O2cLmfXljErfdS7tp/0VRM5uDoqH.pGK", "phone": "530-636-5717", "photo": "http://dummyimage.com/148x100.png/dddddd/000000", "start_date": "2024-01-20", "status": "Inactive" }
  it('should edit the user with id 6615742675136ee36030f52d and send 200 status', async () => {
    const res = await request(app)
      .put('/users/6615742675136ee36030f52d')
      .set({ authorization: apitoken })
      .send({

        "first_name": "Manolo",
        "last_name": "puroLado",
        "email": "lphittiplace1@vistaprint.com",
        "start_date": "2024-01-20",
        "description": "Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.",
        "photo": "http://dummyimage.com/148x100.png/dddddd/000000",
        "phone": "530-636-5717",
        "status": "Inactive"

      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(user);
  })


  it('should not edit the user and send error with status 404', async () => {
    const res = await request(app)
      .put('/users/112')
      .set({ authorization: apitoken })
      .send({

        "id": 2,
        "first_name": "Lidio",
        "last_name": "Pitilugar",
        "email": "lphittiplace1@vistaprint.com",
        "start_date": "2024-01-20",
        "description": "Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.",
        "photo": "http://dummyimage.com/148x100.png/dddddd/000000",
        "phone": "530-636-5717",
        "status": "Active"

      })
    expect(res.statusCode).toEqual(500)
  })

  it('should not edit the user and send error with status 401', async () => {
    const res = await request(app)
      .put('/users/2')
      .send({

        "id": 2,
        "first_name": "Lidio",
        "last_name": "Pitilugar",
        "email": "lphittiplace1@vistaprint.com",
        "start_date": "2024-01-20",
        "description": "Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.",
        "photo": "http://dummyimage.com/148x100.png/dddddd/000000",
        "phone": "530-636-5717",
        "status": "Active"

      })
    expect(res.statusCode).toEqual(401)
  })
})

describe('Get contacts endpoints', () => {
  it('should get and show contacts data, with status 200', async () => {
    const res = await request(app)
      .get('/contacts')
      .set({ authorization: apitoken })
    expect(res.statusCode).toEqual(200)
  })
})

afterAll(() => mongoose.connection.close())