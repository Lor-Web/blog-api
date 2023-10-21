const fs = require('fs');

function getUser(userToken) {
    const usersFile = 'users.json';

    try {
        const data = fs.readFileSync(usersFile, 'utf8');
        const users = JSON.parse(data);

        const user = users.find(u => u.token === userToken);

        if (!user) {
            return {status: 404, message: 'Пользователь не найден'};
        } else {
            const userData = {
                token: user.token,
                login: user.login,
                avatar: user.avatar,
                userName: user.userName,
                about: user.about,
                birthday: user.birthday,
            };

            const userPosts = getUserPosts(userToken);

            return {status: 200, message: 'Данные пользователя получены', user: userData, posts: userPosts};
        }
    } catch (error) {
        return {status: 500, message: 'Ошибка при чтении файла пользователей'};
    }
}

// Функция для получения постов пользователя по его токену
function getUserPosts(userToken) {
    const postsFile = 'db.json';

    // Прочитайте данные о постах из файла db.json
    const data = fs.readFileSync(postsFile, 'utf8');
    const postsData = JSON.parse(data);

    // Фильтруйте посты, чтобы найти те, которые принадлежат пользователю с данным токеном
    const userPosts = postsData.filter(postEntry => postEntry.user.token === userToken);

    // Возвращаем только информацию о самих постах, без информации о пользователе
    const posts = userPosts.map(postEntry => postEntry.post);

    return posts;
}


module.exports = {getUser};
