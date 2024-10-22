import UserService from "../services/UserService.js";



class Login {
    static async login(req, res) {
        const { email, pass_word } = req.body;
        try {
            const { token, user } = await UserService.authenticate(email, pass_word);
            res.status(200).json({ token, user });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default Login;
