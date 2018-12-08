const {Pool, Client} = require('pg');
const connectionString = 'postgresql://avm:Pri8va2tE@localhost:5432/andromeda_test';
let client;
let pool;

function getClient() {
    if (client) {// if it is already there, grab it here
        return client;
    } else {
        client = new Client({connectionString: connectionString});
        client.connect().then(() => console.log("PostgreSQL connected..."))
            .catch((error) => console.error('PostgreSQL connection ERROR \n', error.stack));
        return client;
    }

}

function getPool() {
    if (pool) {// if it is already there, grab it here
        return pool;
    } else {
        pool = new Pool({connectionString: connectionString});
        pool.connect().then(() => console.log("PostgreSQL POOL connected..."))
            .catch((error) => console.error('PostgreSQL connection ERROR \n', error.stack));
        return pool;
    }

}

function saveUser(user) {
    const query = {
        text: 'INSERT INTO users(email, password) VALUES($1, $2) RETURNING id',
        values: [user.email, user.password]
    };
    return getClient().query(query);
}

function findUser(candidate) {
    const query = {
        text: `SELECT * FROM users WHERE email = '${candidate.email}'`
    };
    return getClient().query(query);
}

function findUserById(id) {
    const query = {
        rowMode: 'json',
        text: `SELECT id, email FROM users WHERE id = ${id}`
    };
    return getClient().query(query);
}

module.exports = {saveUser, findUser, findUserById};