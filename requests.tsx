import axios, { AxiosResponse } from "axios";
import {BACKEND_URL} from "react-native-dotenv";

const baseUrl = BACKEND_URL;


export class Household {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}

const createHousehold = (name: string, userId: string) => {
    return axios.post(`${baseUrl}/households`, {name: name}, {params: {'user-id': userId}})
        .then((response: AxiosResponse<Household>) => response.data)
        .catch((err) => console.log(`Error creating household: ${err}`))
}

export default createHousehold;
