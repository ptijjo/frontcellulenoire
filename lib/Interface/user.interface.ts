export interface User{
    id: string;
    email: string;
    pseudo: string;
    avatar: string;
    role: string;
    download: number;
    downloaded: Download[];

}


export interface Download{
    id: string;
    userId: string;
    bookId: string;
    createdAt: string;
}