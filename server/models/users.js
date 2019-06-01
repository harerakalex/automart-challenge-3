const users = [];

const admin = {
	"id": 1,
    "email": "admin@gmail.com",
    "first_name": "admin",
    "last_name": "admin",
    "password": "$2b$10$x2bBvBiguEwWj3XTmfSX/.KSbEuU2cXxxupumWTjnb3kNi1UM5IvK",
    "address": "Kigali, Rwanda",
    "is_admin": true
};

const user1 = {
    "id": 2,
    "first_name": "carlos",
    "last_name": "harera",
    "email": "harera@gmail.com",
    "address": "kigali",
    "password": "$2b$10$x2bBvBiguEwWj3XTmfSX/.KSbEuU2cXxxupumWTjnb3kNi1UM5IvK",
    "is_admin": false
};

const user2 = {
	"id": 3,
    "first_name": "ishimwe",
    "last_name": "yves",
    "email": "ishimwe@gmail.com",
    "address": "kigali",
    "password": "$2b$10$hHI7EAoi5j64OAq.U3/qnuRczSxiFS4p/i1c2FQ6srVeSZCmHYJUq",
    "is_admin": false	
};

users.push(admin,user1,user2);
export default users;