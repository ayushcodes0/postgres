"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    // This works fine
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "mysecretpassword"
    // This also works fine
    // connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres"
});
function createUserTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const result = yield client.query(`

        CREATE TABLE users(
            id serial primary key,
            username varchar(10) unique not null,
            email varchar(100) unique not null,
            password varchar(100) not null,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    
    `);
        console.log(result);
    });
}
// createUserTable();   // already executed (users table is created)
function insertInUserTable(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const insertQuery = "INSERT INTO users (username, email, password) VALUES($1, $2, $3)";
        const values = [username, email, password];
        // better way to insert instead of directly providing complete query
        const result = yield client.query(insertQuery, values);
        // make sure that the values you are providing is in single quotes not in double quotes
        console.log(result);
    });
}
// insertInUserTable("ayush4", "ayush4@ayush.com", "password"); 
function getUsers(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect(); // optional if already connected
            const query = "SELECT * FROM users WHERE email = $1;"; // $1 is nothing but the first argument expected inside the function.
            const values = [email];
            const result = yield client.query(query, values);
            console.log('Users:', result.rows);
        }
        catch (error) {
            console.error("Error fetching users:", error);
        }
    });
}
// getUsers("ayush333@ayush.com");
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect(); // optional if already connected
            const query = "SELECT * FROM users;"; // $1 is nothing but the first argument expected inside the function.
            const result = yield client.query(query);
            console.log('Users:', result.rows);
        }
        catch (error) {
            console.error("Error fetching users:", error);
        }
    });
}
// getAllUsers();
function updateUserEmail(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const query = "UPDATE users SET email = 'ayushhhhhhh@ayush.com' WHERE id = $1 ";
            const values = [id];
            const result = yield client.query(query, values);
            console.log('user updated successfully', result);
        }
        catch (err) {
            console.log(err);
        }
    });
}
// updateUserEmail(1);
function createAddressTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const result = yield client.query(`

        CREATE TABLE address (
            id serial PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            street VARCHAR(100) NOT NULL,
            city VARCHAR(50) NOT NULL,
            state VARCHAR(50),
            country VARCHAR(50) NOT NULL,
            zip_code VARCHAR(20),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        
    `);
        console.log("address table is created\n", result);
    });
}
// createAddressTable();
function insertInAddressTable(user_id, street, city, state, country, zip_code) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const insertQuery = `
        INSERT INTO address (user_id, street, city, state, country, zip_code)
        VALUES ($1, $2, $3, $4, $5, $6)
    `;
        const values = [user_id, street, city, state, country, zip_code];
        const result = yield client.query(insertQuery, values);
        console.log(result);
    });
}
// insertInAddressTable(1,"Taktakpur","Varanasi","Uttarpradesh","India","221007");
function getAllAddress() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect(); // optional if already connected
            const query = "SELECT * FROM address;"; // $1 is nothing but the first argument expected inside the function.
            const result = yield client.query(query);
            console.log('Users:', result.rows);
        }
        catch (error) {
            console.error("Error fetching users:", error);
        }
    });
}
getAllAddress();
