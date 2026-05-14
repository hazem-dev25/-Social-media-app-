  export interface userCreateDto {
 username: string;
 age: number;
image?: Express.Multer.File | undefined;
about?: string;
gender?: string;
id: string;
}