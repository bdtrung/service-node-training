import fetch from 'node-fetch';

const getData = async (type) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${type}`);

    return response.json();
}

export default getData;