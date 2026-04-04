import { loginDTO, signupDTO} from "./auth.dto";


class Authservice {
    constructor(){

    }
    signup(data: signupDTO): signupDTO{
        const { name, email, age, gender, password } = data;
        return data
    }

    login(data: loginDTO) : loginDTO{
        const { email, password } = data;
        return data
    }
}

export default new Authservice