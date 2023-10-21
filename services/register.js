const fs = require('fs');
const uuid = require('uuid');

function registerUser(login, password) {
    const usersFile = 'users.json';
    const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));

    const existingUser = users.find(user => user.login === login);
    if (existingUser) {
        return {status: 400, message: 'Пользователь с таким логином уже существует'};
    }

    const token = uuid.v4();
    const newUser = {
        login, password, avatar: '', userName: login, about: '', birthday: '', token
    };
    users.push(newUser);

    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    return {
        status: 201, message: 'Пользователь успешно зарегистрирован', user: {
            login, avatar: '', userName: login, about: '', birthday: '', token
        },
    };
}

module.exports = {registerUser};
