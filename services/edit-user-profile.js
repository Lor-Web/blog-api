const fs = require('fs');

function editUserProfile(userToken, updatedUserData = {userName: '', about: '', birthday: '', avatar: ''}) {
    const usersFile = 'users.json';

    // Найдите пользователя по токену в файле users.json
    const usersData = fs.readFileSync(usersFile, 'utf8');
    const users = JSON.parse(usersData);


    const userIndex = users.findIndex(u => u.token === userToken);

    if (userIndex === -1) {
        // Если пользователя не найдено, верните ошибку 404
        return {status: 404, message: 'Пользователь не найден'};
    } else {
        // Обновите данные пользователя
        users[userIndex] = {...users[userIndex], ...updatedUserData};

        // Сохраните обновленные данные обратно в файл users.json
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

        // Верните успешный ответ
        return {status: 200, message: 'Профиль пользователя успешно обновлен', updatedUser: users[userIndex]};
    }
}

module.exports = {editUserProfile};
