import {Client} from 'pg';

const client = new Client({
    connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres"
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

createUserTable();