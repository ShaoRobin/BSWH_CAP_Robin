export interface User {
    id: number,
    name: string,
    username: string,
    email: string,
    address: Address,
    phone: string,
    website: string,
    company: Company,
    albums?: Album[]
}

export interface Address {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: Geolocation,
}

export interface Geolocation {
    lat: string,
    lng: string,
}

export interface Company {
    name: string,
    catchPhrase: string,
    bs: string,
}

export interface Album {
    userId: number
    id: number
    title: string
}

export interface Photos {
    albumId: number
    id: number
    title: string
    url: string
    thumbnailUrl: string
}