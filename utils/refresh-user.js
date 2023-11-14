const fs = require('fs');

function getRefreshUser(token = '') {
    const usersFile = 'users.json';

    const data = fs.readFileSync(usersFile, 'utf8');
    const users = JSON.parse(data);

    const user = users.find(u => u.token === token);

    return user
}

module.exports = {getRefreshUser};
