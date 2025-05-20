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



async function insertInUserTable(username: string, email: string, password: string){
    await client.connect();
    const insertQuery = "INSERT INTO users (username, email, password) VALUES($1, $2, $3)";
    const values = [username, email, password];
    // better way to insert instead of directly providing complete query
    const result = await client.query(insertQuery, values);
    // make sure that the values you are providing is in single quotes not in double quotes
    console.log(result)
}
// insertInUserTable("ayush4", "ayush4@ayush.com", "password"); 


async function getUsers(email: string) {
    try {
        await client.connect(); // optional if already connected
        const query = "SELECT * FROM users WHERE email = $1;";   // $1 is nothing but the first argument expected inside the function.
        const values = [email];
        const result = await client.query(query, values);
        console.log('Users:', result.rows);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}
// getUsers("ayush333@ayush.com");


async function getAllUsers() {
    try {
        await client.connect(); // optional if already connected
        const query = "SELECT * FROM users;";   // $1 is nothing but the first argument expected inside the function.
        const result = await client.query(query);
        console.log('Users:', result.rows);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}
// getAllUsers();


async function updateUserEmail(id: number){
    try{
        await client.connect();
        const query = "UPDATE users SET email = 'ayushhhhhhh@ayush.com' WHERE id = $1 ";
        const values = [id];
        const result = await client.query(query,values);
        console.log('user updated successfully', result);
    }
    catch(err){
        console.log(err);
    }
}
// updateUserEmail(1);


async function createAddressTable() {
    await client.connect();
    const result = await client.query(`

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
    console.log("address table is created\n",result);
}
// createAddressTable();

async function insertInAddressTable(
    user_id: number,
    street: string,
    city: string,
    state: string,
    country: string,
    zip_code: string
) {
    await client.connect();
    const insertQuery = `
        INSERT INTO address (user_id, street, city, state, country, zip_code)
        VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values = [user_id, street, city, state, country, zip_code];
    const result = await client.query(insertQuery, values);
    console.log(result);
}
// insertInAddressTable(1,"Taktakpur","Varanasi","Uttarpradesh","India","221007");


async function getAllAddress() {
    try {
        await client.connect(); // optional if already connected
        const query = "SELECT * FROM address;";   // $1 is nothing but the first argument expected inside the function.
        const result = await client.query(query);
        console.log('Users:', result.rows);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}
getAllAddress();