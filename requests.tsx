import axios, { AxiosResponse } from "axios";
import {BACKEND_URL} from "react-native-dotenv";

const baseUrl = BACKEND_URL;

// Login Screen

export class User {
    id: string;
    username: string;
    email: string;

    constructor(id: string, username: string, email: string) {
        this.id = id;
        this.username = username;
        this.email = email;
    }
}

export const userLogin = (username: string, password: string) => {
    return axios.post(`${baseUrl}/users/login`, {username: username, password: password})
        .then((response: AxiosResponse<User>) => response.data)
        .catch((err) => console.log(`Error logging in: ${err}`))
}


// Create Household Screen

export class Household {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}


export const createHousehold = (name: string, userId: string) => {
    return axios.post(`${baseUrl}/households`, {name: name}, {params: {'user-id': userId}})
        .then((response: AxiosResponse<Household>) => response.data)
        .catch((err) => console.log(`Error creating household: ${err}`))
}

