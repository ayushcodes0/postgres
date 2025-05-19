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
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "mysecretpassword"
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
function insertInUserTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const result = yield client.query(`
    
        INSERT INTO users(username, email, password) VALUES('ayush3', 'ayush3@ayush.com', 'password');
    `);
        console.log(result);
    });
}
// insertInUserTable(); 
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect(); // optional if already connected
        const result = yield client.query(`SELECT * FROM users;`);
        console.log('Users:', result.rows);
    });
}
getUsers();
