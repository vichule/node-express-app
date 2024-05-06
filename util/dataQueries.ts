

export const amenitiesQuery = `
CREATE TABLE IF NOT EXISTS amenities
(id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
PRIMARY KEY (id));
`

export const photosQuery = `
CREATE TABLE IF NOT EXISTS photos
(id INT NOT NULL AUTO_INCREMENT,
photo VARCHAR(255) NOT NULL,
PRIMARY KEY (id));
`

export const roomsQuery = `
CREATE TABLE IF NOT EXISTS rooms 
(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
room_type ENUM('Suite', 'Single Bed', 'Double Bed', 'Double Superior') NOT NULL,
room_number INT NOT NULL,
description TEXT,
price INT NOT NULL,
offer BOOLEAN NOT NULL,
discount TINYINT NOT NULL,
cancellation TEXT,
status ENUM('Available', 'Booked') default 'Available');
`

export const roomPicsQuery = `
CREATE TABLE IF NOT EXISTS room_photos
(room_id INT NOT NULL,
photo_id INT NOT NULL,
CONSTRAINT room_key FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
CONSTRAINT photo_key FOREIGN KEY (photo_id) REFERENCES photos(id) ON DELETE CASCADE);
`

export const roomAmenitiesQuery = `
CREATE TABLE IF NOT EXISTS room_amenities
(room_id INT NOT NULL,
amenities_id INT NOT NULL,
FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
FOREIGN KEY (amenities_id) REFERENCES amenities(id) ON DELETE CASCADE);
`

export const usersQuery = `
CREATE TABLE IF NOT EXISTS users
(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
start_date DATE NOT NULL,
job ENUM('Room Service', 'Recepcionist', 'Manager') default 'Room Service' NOT NULL,
description TEXT,
photo VARCHAR(255),
phone VARCHAR(255) NOT NULL,
status ENUM('Active','Inactive') default 'Active' NOT NULL,
password VARCHAR(255) NOT NULL);
`

export const contactsQuery = `
CREATE TABLE IF NOT EXISTS contacts
(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
phone VARCHAR(255) NOT NULL,
subject VARCHAR(255),
message TEXT,
date DATE NOT NULL,
photo VARCHAR(255),
status BOOLEAN NOT NULL default FALSE);
`

export const bookingsQuery = `
CREATE TABLE IF NOT EXISTS bookings
(id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
order_date DATE NOT NULL,
check_in DATE NOT NULL,
check_out DATE NOT NULL,
notes VARCHAR(255),
status ENUM('Check-in', 'Check-out', 'In progress', 'Cancelled') default 'In Progress',
discount TINYINT NOT NULL default 0,
room_id INT NOT NULL,
FOREIGN KEY (room_id) REFERENCES rooms(id)ON DELETE CASCADE);
`