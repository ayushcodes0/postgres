import {Client} from 'pg';

const client = new Client({
    
    // This works fine
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "mysecretpassword"
    
    // This also works fine
    // connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres"
})




async function createUserTable(){
    await client.connect();
    const result = await client.query(`

        CREATE TABLE users(
            id serial primary key,
            username varchar(10) unique not null,
            email varchar(100) unique not null,
            password varchar(100) not null,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    
    `)
    console.log(result);
}

// createUserTable();   // already executed (users table is created)

async function insertInUserTable(){
    await client.connect();
    const result = await client.query(`
    
        INSERT INTO users(username, email, password) VALUES('ayush3', 'ayush3@ayush.com', 'password');   
    `)
    // make sure that the values you are providing is in single quotes not in double quotes
    console.log(result)
}

// insertInUserTable(); 


async function getUsers() {
    await client.connect(); // optional if already connected
    const result = await client.query(`SELECT * FROM users;`);
    console.log('Users:', result.rows);
}


getUsers();