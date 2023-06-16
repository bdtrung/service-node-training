import fetch from 'node-fetch';

const getUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    return await response.json();
}

getUsers().then(data => console.log(data));
