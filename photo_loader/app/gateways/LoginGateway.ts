
export interface User {
    email: string
}

export interface LoginGateway {
    login: (email: string, password: string) => User
}