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

export class UserRequest {
    username: string;
    email: string;

    constructor(username: string, email: string) {
        this.username = username;
        this.email = email;
    }
}

export const userLogin = (username: string, password: string) => {
    return axios.post(`${baseUrl}/users/login`, { username: username, password: password })
        .then((response: AxiosResponse<User>) => response.data)
        .catch((err) => console.log(`Error logging in: ${err}`));
};

export const getUser = (userId: string) => {
    return axios.get(`${baseUrl}/users/${userId}`)
        .then((response: AxiosResponse<User>) => response.data)
        .catch((err) => console.log(`Error retrieving user: ${err}`));
};

export const updateUser = (userId: string, request: UserRequest) => {
    return axios.patch(`${baseUrl}/users/${userId}`, request)
        .then((response: AxiosResponse<User>) => response.data)
        .catch((err) => console.log(`Error updating user: ${err}`));
};

export const createUser = (request: UserRequest) => {
    return axios.post(`${baseUrl}/users`, request)
        .then((response: AxiosResponse<User>) => response.data)
        .catch((err) => console.log(`Error creating user: ${err}`));
};

// Household List Screen

export class Households {
    id: string;
    name: string;
    image?: string;

    constructor(id: string, name: string, image?: string) {
        this.id = id;
        this.name = name;
        this.image = image;
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


const createHousehold = (name: string, image: string, userId: string) => {
    return axios.post(`${baseUrl}/households`, { name: name, image: image }, { params: { 'user-id': userId } })
        .then((response: AxiosResponse<Households>) => response.data)
        .catch((err) => console.log(`Error creating household: ${err}`));
}

export default createHousehold;

export const editHousehold = (name: string, image: string, householdId: string) => {
    return axios.patch(`${baseUrl}/households/${householdId}`, { name: name, image: image })
        .then((response: AxiosResponse<Households>) => response.data)
        .catch((err) => console.log(`Error updating household: ${err}`));
}

export const deleteHousehold = (householdId: string) => {
    return axios.delete(`${baseUrl}/households/${householdId}`)
        .catch(((err) => console.log(`Error deleting household: ${err}`)))
}

export const getItemsByHousehold = (householdId: string, action: string) => {
    return axios.get(`${baseUrl}/households/${householdId}/items`, { params: { 'action': action } })
        .then((response: AxiosResponse<Items[]>) => response.data)
        .catch((err) => {
            console.log(`Error retrieving items for household: ${err}`);
            return [] as Items[]
        })
}

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
};

// Create Category Screen

export const createCategory = (categoryName: string, householdId: string) => {
    return axios.post(`${baseUrl}/categories`, { name: categoryName }, { params: { 'household-id': householdId } })
        .then((response: AxiosResponse<Categories>) => response.data)
        .catch((err) => console.log(`Error creating category: ${err}`));
}

// Edit Category

export const editCategory = (categoryName: string, categoryId: string) => {
    return axios.patch(`${baseUrl}/categories/${categoryId}`, { 'name': categoryName })
        .then((response: AxiosResponse<Categories>) => response.data)
        .catch((err) => console.log(`Error updating category: ${err}`));
}

export const deleteCategory = (categoryId: string) => {

    return axios.delete(`${baseUrl}/categories/${categoryId}`)
        .catch((err) => console.log(`Error deleting category: ${err}`));
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
    liked: boolean;
    purchase: boolean;

    constructor(id: string, name: string, measurement: string, brand: string, addInfo: string, expiration: string, unit: number, liked: boolean, purchase: boolean) {
        this.id = id;
        this.name = name;
        this.measurement = measurement;
        this.brand = brand;
        this.addInfo = addInfo;
        this.expiration = expiration;
        this.unit = unit;
        this.liked = liked;
        this.purchase = purchase;
    }
}

export const getItems = (categoryId: string) => {
    return axios.get(`${baseUrl}/categories/${categoryId}/items`)
        .then((response: AxiosResponse<Items[]>) => response.data)
        .catch((err) => {
            console.log(`Error fetching items: ${err}`);
            return [] as Items[];
        });
};

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

export const updateItem = (categoryId: string, itemId: string, itemRequest: ItemRequest) => {
    return axios.put(`${baseUrl}/categories/${categoryId}/items/${itemId}`, itemRequest)
        .then((response: AxiosResponse<Items>) => response.data)
        .catch((err) => console.log(`Error updating item: ${err}`));
};

export const deleteItem = (categoryId: string, itemId: string) => {
    return axios.delete(`${baseUrl}/categories/${categoryId}/items/${itemId}`)
        .catch((err) => console.log(`Error deleting item: ${err}`))
}

export const toggleLikeItem = (itemId: string) => {
    return axios.patch(`${baseUrl}/categories/${itemId}/items/${itemId}/like`)
        .catch((err) => console.log(`Error liking item: ${err}`))
}

export const togglePurchaseItem = (itemId: string) => {
    return axios.patch(`${baseUrl}/categories/${itemId}/items/${itemId}/purchase`)
        .catch((err) => console.log(`Error purchasing item: ${err}`))
}
