import { LoginGateway } from "@/app/gateways/LoginGateway";

export const firebaseLoginAdapter: LoginGateway = {
    login: (email: string, password: string) => {
        return {
            email: email
        }
    }
}