import { Request, Response } from "express";
import { HttpStatus } from "../errors/error.handler.enum";
import User from "../model/users/User.modal";

const user = new User();

export default class Auth {
  public async users(req: Request, res: Response) {

    const users = await user.getAll();
    res.json(users);

  }

  public async create(req: Request, res: Response) {

    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(HttpStatus.NO_CONTENT).send({ message: "Falta conteúdo no body..." });
    }

    const options = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    try {

      const response = await user.create(options);
      res.status(HttpStatus.CREATED).json({ user: response.user, token: response.token });

    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e });
    }

  }

  public async delete(req: Request, res: Response) {

    if (!req.headers.id) {
      return res.status(HttpStatus.NO_CONTENT).send({ message: "Falta conteúdo no HEADER..." });
    }

    await user.delete(`${req.headers.id}`);
    res.status(HttpStatus.OK).send({ message: "Usuário deletado com sucesso" });
    
  }

  public async token(req: Request, res: Response) {

    if (!req.headers.token) {
      return res.status(HttpStatus.NO_CONTENT).send({ message: "Falta contéudo no HEADER..." });
    }

    const response = await user.getRegisterByToken(`${req.headers.token}`);
    res.status(HttpStatus.OK).send({ user: response });

  }

  public async login(req: Request, res: Response) {

    if (!req.body.email || !req.body.password) {
      return res.status(HttpStatus.NO_CONTENT).send({ message: "Falta conteúdo no BODY." });
    }

    try {
      
      const response = await user.login({
        email: req.body.email,
        password: req.body.password,
      });

      res.status(HttpStatus.ACCEPTED).json({ token: response });

    } catch (e) {

      res.status(HttpStatus.UNAUTHORIZED).send({ message: e });

    }

  }
}
