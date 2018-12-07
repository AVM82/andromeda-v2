const {Client} = require('pg');
const connectionString = 'postgresql://avm:Pri8va2tE@localhost:5432/andromeda_test';
let client;

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

function saveUser(user) {
    const query = {
        text: 'INSERT INTO users(email, password) VALUES($1, $2) RETURNING id',
        values: [user.email, user.password]
    };
    return getClient().query(query);
}

function findUser(candidate) {
    const query = {
        text: `SELECT * from Users WHERE email = '${candidate.email}'`
    };
    return getClient().query(query);
}

module.exports = {saveUser, findUser};