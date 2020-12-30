import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-cbaaf.firebaseio.com/'
});

export default instance;