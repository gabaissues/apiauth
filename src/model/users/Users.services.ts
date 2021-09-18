import { encrypt, decrypt } from "../../config/crypto";

import { verify } from "../../config/jwt";
import UserModal from "../../schema/user";

export default class UserServices {
  public async getAll() {
    return UserModal.find();
  }

  public async getRegisterByEmail(email: string) {

    const user = await UserModal.findOne({ email });
    if (!user) {
      throw "O usuário não existe.";
    }

    return user;

  }

  public async getRegisterByToken(token: string) {

    const account = verify(token);
    if (!account.user) {
      throw "Esse TOKEN é inválido.";
    }

    return this.getRegisterById(account.user);

  }

  public async getRegisterById(id: string) {

    const user = await UserModal.findOne({ id });
    if (!user) {
      throw "O usuário não existe";
    }

    return user;

  }

  public async delete(id: string) {

    return await UserModal.findOneAndDelete({ id });

  }

  public async verifyPassword(password: string, expected: string) {

    const passwordDecrypted = decrypt(password);
    if (passwordDecrypted != expected) {
      throw "A senha esperada não coincide com a registrada.";
    }

    return passwordDecrypted;

  }

  public async validateEmail(email: string) {
      
    const account = await UserModal.findOne({ email });
    if (account) throw "Já existe um usuário cadastrado com este e-mail.";

  }
}
