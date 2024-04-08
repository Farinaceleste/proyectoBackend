import { usersModelo } from "./models/users.models.js";

export class UsuariosManagerMongo {

    async create(user) { // crear un nuevo usuario
        let newUser = await usersModelo.create(user)
        return  newUser.toJSON()

    }

    async getBy (filter) { // buscar usuario en particular, segun un filtro
        return await usersModelo.findOne(filter).lean()
    }


}