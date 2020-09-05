import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://europe-west1-game-portal-1be63.cloudfunctions.net/api'
})