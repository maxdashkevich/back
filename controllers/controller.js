import { UsersService } from "../services/service.js";

const service = new UsersService();

export class UsersController {
  add = (req, res) => {
    res.status(200).send(service.addUser(req.body));
  }

  getUser = (req, res) => {
    res.status(200);
    service.getUser(req.params.id).then(result => res.send(result));
  }

  getUsers = (req, res) => {
    res.status(200);
    service.getUsers().then(result => res.send(result));
  }

  update = (req, res) => {
    res.status(200).send(service.updateUser(req.params.id, req.body));
  }

  delete = (req, res) => {
    res.status(200).send(service.deleteUser(req.params.id));
  }

  addAvatar = async (req, res) => {
    res.status(200).send(await service.addAvatar(req.file.path, req.params.id));
  }

  login = async (req, res) => {
    res.status(200).send(await service.login(req.body.login, req.body.password));
  }

  generateToken = async (req, res) => {
    res.status(200).send(await service.generateToken(req.body.refreshToken));
  }
}