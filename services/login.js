const fs = require('fs');

function loginUser(login, password) {
    const usersFile = 'users.json';
    const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));

    const user = users.find(u => u.login === login && u.password === password);
    if (user) {
        return {user, status: 200, message: 'Авторизация успешна'};
    } else {
        return {status: 404, message: 'Неверные логин или пароль'};
    }
}

module.exports = {loginUser};
