import { registerFormInputs } from "../components/templates/register/RegisterPageContent";

interface user {
    data: registerFormInputs
    id: number
    urlPath: string
    userId: string
}

export type usersTpye = user[] 