import UserService from "../services/UserService.js";

class UserController{
    static async getAllUsers(_req, res){
        const result = await UserService.getUsers()
        res.status(201).json(result)
    }

    static async createUser(req, res, next) {
        const { name, pass_word, role, email } = req.body;
        try {
            await UserService.createUser(name, pass_word, role, email);
            // res.status(201).json({message:"user has been created"});
            res.status(201).json({ message: req.t('message.createUser') });
        } catch (error) {
            throw error
            
        }
        next()
    }

    static async updateUser(req, res, next) {
        const id = Number(req.params.id);
        if(id){
            const { name, pass_word, role, email } = req.body;
            try {
                await UserService.updateUser(id, name, pass_word, role, email)
                // res.status(201).json({message:"user has been update"});
                res.status(201).json({ message: req.t('message.updateUser') });
            } catch (error) {
                throw error
            }
        }
        next()
    }

    static async deleteUser(req, res, next) {
        const {id} = req.params; 
        try {
            await UserService.deleteUser(parseInt(id));
            // res.status(200).json({ message: 'user has been deleted'});
            res.status(200).json({ message: req.t('message.deleteUser') });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
        next()
    }
}
export default UserController