import prisma from "../config/prisma.js";
import UserService from "../services/UserService.js";

class UserController{
    static async getAllUsers(_req, res){
        const result = await UserService.getUsers()
        res.status(201).json(result)
    }

    static async createUser(req, res, next) {
        const { name, password, role, email, status } = req.body;
        try {
            await UserService.createUser(name, password, role, email, status);
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
            const { name, role, email } = req.body;
            try {
                await UserService.updateUser(id, name, role, email)
                // res.status(201).json({message:"user has been update"});
                res.status(201).json({ message: req.t('message.updateUser') });
            } catch (error) {
                throw error
            }
        }
        next()
    }

    static async updateUserStatus(req, res){
        const userId = parseInt(req.params.id, 10); // Récupérer l'ID depuis les paramètres de la requête
        const { status } = req.body; // Récupérer le statut depuis le corps de la requête
      
        try {
          const user = await prisma.user.update({
            where: { id: userId },
            data: { status: status },
          });
          res.status(200).json({ message: 'User status updated successfully', user });
        } catch (error) {
          res.status(500).json({ message: 'Error updating user status', error });
        }
      };
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

    static async getCurrentUser(req, res) {
        try {
          const userId = req.user.id;
          const user = await prisma.user.findUnique({
            where: { id: userId },
          });
    
          if (user) {
            res.json({ user });
          } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
          }
        } catch (error) {
          res.status(500).json({ error: "Erreur serveur" });
        }
      }
}
export default UserController