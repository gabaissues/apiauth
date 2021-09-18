import UserModal from "../../schema/user";

import * as crypto from "../../config/crypto";

import { sign } from "../../config/jwt";
import { IUser, ILogin } from "../../interfaces/user";

import UserServices from "./Users.services";

export default class User extends UserServices {
  public async create(options: IUser) {

    //Validando se existe uma conta registrada nesse email
    await this.validateEmail(options.email);

    //Salvando o USUÁRIO na DATABASE
    const user = await new UserModal({
      name: options.name,
      email: options.email,
      password: crypto.encrypt(options.password),
    }).save();

    //Registrando um TOKEN para o usuário
    const token = sign({ user: user.id });

    //Retornando o USER e TOKEN para o CONTROLLER
    return { user, token };

  }

  public async login(options: ILogin) {

    //Verificando se a conta do usuário existe, e caso existir, retornando os dados dele
    const account = await this.getRegisterByEmail(options.email);

    //Verificando se o PASSWORD é o mesmo que o esperado
    await this.verifyPassword(account.password, options.password);

    //Registrando o usuário com o ID da conta dele
    const token = sign({ user: account.id });

    //Retornando o TOKEN para o CONTROLLER
    return token;

  }
}
