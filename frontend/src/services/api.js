import axios from 'axios';

// Altere para o IP da sua máquina na rede local (não use localhost)
const API_URL = 'http://192.168.1.100:3000/api'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { api };