import axios, { AxiosResponse } from "axios";
import { BACKEND_URL } from "react-native-dotenv";

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
    return axios.post(`${baseUrl}/users/login`, { username: username, password: password })
        .then((response: AxiosResponse<User>) => response.data)
        .catch((err) => console.log(`Error logging in: ${err}`))
}

// Household List Screen

export class Households {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}

export const getHouseholds = (userId: string) => {
    return axios.get(`${baseUrl}/households/mappings`, { params: { 'user-id': userId } })
        .then((response: AxiosResponse<[Households]>) => response.data)
        .catch((err) => {
            console.log(`Error fetching households: ${err}`);
            return [];
        });
};

// Create Household Screen


const createHousehold = (name: string, userId: string) => {
    return axios.post(`${baseUrl}/households`, { name: name }, { params: { 'user-id': userId } })
        .then((response: AxiosResponse<Households>) => response.data)
        .catch((err) => console.log(`Error creating household: ${err}`));
}

export default createHousehold;

// Categories List Screen

export class Categories {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}

export const getCategories = (householdId: string) => {
    return axios.get(`${baseUrl}/categories`, { params: { 'household-id' : householdId } })
        .then((response: AxiosResponse<Categories>) => response.data)
        .catch((err) => {
            console.log(`Error fetching categories: ${err}`);
            return [];
        })
}