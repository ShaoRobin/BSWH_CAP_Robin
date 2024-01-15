import axios from "axios";
import { Album, User } from "./interfaces";

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

export const getUsers = () => {
    return axios.get<User[]>(`${BASE_URL}/users`)
}

export const getAlbums = (userId: number) => {
    return axios.get<Album[]>(`${BASE_URL}/albums?userId=${userId}`)
}

export const getAlbumPhotos = (albumId: number) => {
    return axios.get<Album[]>(`${BASE_URL}/photos?albumId=${albumId}`)
}

export const getAllPhotos = () => {
    return axios.get<Album[]>(`${BASE_URL}/photos`)
}
