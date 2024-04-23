import mysql from 'mysql2/promise'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs';

export const createTableQuery = async (conn: mysql.PoolConnection, query: string) => {
  await conn.execute(query);
}


export const deleteTableQuery = async (conn: mysql.PoolConnection, name: string) => {
  await conn.execute(`DROP TABLE IF EXISTS ${name}`);
}

// export const insertDataQuery = async (conn: mysql.PoolConnection, name: string, field: string, value: string | boolean | number | Date) => {
//   await conn.execute(`USE mirandab;INSERT INTO ${name}(${field}) VALUES('${value}');`)
// }

export const insertAmenitiesQuery = async (conn: mysql.PoolConnection) => {
  const amenities = ["Air conditioner", "Breakfast", "Cleaning", "Grocery", "Shop near",
    "24/7 Online Support", "Smart Security", "High-speed WiFi", "Kitchen", "Shower",
    "Towels", "Strong Locker", "Expert Team"]


  for (let i = 0; i < amenities.length; i++) {
    conn.execute(`INSERT INTO amenities(name) VALUES("${amenities[i]}")`)

  }
}

export const insertPhotosQuery = async (conn: mysql.PoolConnection) => {
  const photos = [
    faker.image.urlLoremFlickr({ category: 'hotel,bedroom' }),
    faker.image.urlLoremFlickr({ category: 'hotel,bedroom' }),
    faker.image.urlLoremFlickr({ category: 'hotel,bedroom' }),
    faker.image.urlLoremFlickr({ category: 'hotel,bedroom' }),
    faker.image.urlLoremFlickr({ category: 'hotel,bedroom' }),
    faker.image.urlLoremFlickr({ category: 'hotel,bedroom' }),
    faker.image.urlLoremFlickr({ category: 'hotel,bedroom' })
  ]

  for (let i = 0; i < photos.length; i++) {
    conn.execute(`INSERT INTO photos(photo) VALUES("${photos[i]}")`)

  }
}

export const insertUserQuery = async (conn: mysql.PoolConnection) => {

  for (let i = 0; i < 15; i++) {
    const rawPassword = faker.string.alphanumeric(10)
    const userEmail = faker.internet.email()
    console.log(`user: ${userEmail} with password: ${rawPassword}`)
    const hashPassword = bcrypt.hashSync(rawPassword, 5)
    const job = faker.helpers.arrayElement(['Room Service', 'Recepcionist', 'Manager'])
    const photo = faker.image.urlLoremFlickr({ category: 'people' })
    const status = faker.helpers.arrayElement(['Active', 'Inactive'])

    conn.execute(`INSERT INTO users(first_name, last_name, email, start_date,job,
       description, photo, status, phone, password) VALUES(
      '${faker.person.firstName()}',
      '${faker.person.lastName()}',
      '${userEmail}',
      '${faker.date.past().toISOString().slice(0, 10)}',
      '${job}',
      '${faker.lorem.sentence({ min: 1, max: 5 })}',
      '${photo}',
      '${status}',
      '${faker.phone.number()}',
      '${hashPassword}')`)
  }
}

export const insertContactQuery = async(conn: mysql.PoolConnection) =>{
  for (let i = 0; i < 15; i++){
    conn.execute(`INSERT INTO contacts(
      first_name, last_name, email,phone,subject,message,date,photo,status) 
      VALUES(
      '${faker.person.firstName()}',
      '${faker.person.lastName()}',
      '${faker.internet.email()}',
      '${faker.phone.number()}',
      '${faker.lorem.sentence({ min: 1, max: 5 })}',
      '${faker.lorem.text()}',
      '${faker.date.recent().toISOString().slice(0, 10)}',
      '${faker.image.urlLoremFlickr({ category: 'people' })}',
      ${faker.datatype.boolean(0.5)}
      )`)
  }
}