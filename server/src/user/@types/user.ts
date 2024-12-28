export type CreateUserResponse = {
    access_token: string;
    userId: string;
    username: string;
    balance: number;
};

export type UserResponse = {
    id: string;
    name: string;
    balance: number;
}