import axios, { AxiosResponse } from "axios";
// @ts-ignore
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
        .catch((err) => console.log(`Error logging in: ${err}`));
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
        .then((response: AxiosResponse<Households[]>) => response.data)
        .catch((err) => {
            console.log(`Error fetching households: ${err}`);
            return [] as Households[];
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
    return axios.get(`${baseUrl}/categories`, { params: { 'household-id': householdId } })
        .then((response: AxiosResponse<Categories[]>) => response.data)
        .catch((err) => {
            console.log(`Error fetching categories: ${err}`);
            return [] as Categories[];
        });
}

// Create Category Screen

export const createCategory = (categoryName: string, householdId: string) => {
    return axios.post(`${baseUrl}/categories`, {name: categoryName}, {params: {'household-id': householdId}})
        .then((response: AxiosResponse<Categories>) => response.data)
        .catch((err) => console.log(`Error creating category: ${err}`));
}

// Items List Screen

export class Items {
    id: string;
    name: string;
    measurement: string;
    brand: string;
    addInfo: string;
    expiration: string;
    unit: number;

    constructor(id: string, name: string, measurement: string, brand: string, addInfo: string, expiration: string, unit: number) {
        this.id = id;
        this.name = name;
        this.measurement = measurement;
        this.brand = brand;
        this.addInfo = addInfo;
        this.expiration = expiration;
        this.unit = unit;
    }
}

export const getItems = (categoryId: string) => {
    return axios.get(`${baseUrl}/categories/${categoryId}/items`)
        .then((response: AxiosResponse<Items[]>) => response.data)
        .catch((err) => {
            console.log(`Error fetching items: ${err}`);
            return [] as Items[];
        });
}

// Add Item Screen

export class ItemRequest {
    name: string;
    measurement: string;
    brand: string;
    addInfo: string;
    expiration: string;
    unit: number;

    constructor(name: string, measurement: string, brand: string, addInfo: string, expiration: string, unit: number) {
        this.name = name;
        this.measurement = measurement;
        this.brand = brand;
        this.addInfo = addInfo;
        this.expiration = expiration;
        this.unit = unit;
    }
}

export const addItem = (categoryId: string, itemRequest: ItemRequest) => {
    return axios.post(`${baseUrl}/categories/${categoryId}/items`, itemRequest)
        .then((response: AxiosResponse<Items>) => response.data)
        .catch((err) => console.log(`Error creating category: ${err}`));
};
