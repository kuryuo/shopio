export interface Image {
    id: string;
    url: string;
}

export interface Tag {
    uuid: string;
    name: string;
    description: string;
}

export interface ProductResponse {
    uuid: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    image: Image;
    tags: Tag[];
}

export interface ProductPayload {
    name: string;
    description: string;
    price: number;
    imageId: string;
    currency: string;
    tagUuids: string[];
}
