import { Request, Response, Router} from 'express';
import { asyncRequestHandler } from '../../interface/controllers/ControllerUtil';
import { IUserUsecase } from '../../application/usecase/interfaces/IUserUsecase';


export class UserController {

  private userUsecase: IUserUsecase;
  public router: Router;

  constructor(userUsecase: IUserUsecase){
    this.userUsecase = userUsecase;
    this.router = Router();

    this.router.get('/users', asyncRequestHandler(this.getAll.bind(this)));
    this.router.get('/users/:id', asyncRequestHandler(this.getById.bind(this)));
    this.router.post('/users', asyncRequestHandler(this.create.bind(this)));
    this.router.put('/users', asyncRequestHandler(this.update.bind(this)));
    this.router.delete('/users/:id', asyncRequestHandler(this.delete.bind(this)));
  }

  private async getAll(req: Request, res: Response): Promise<void> {
    const users = await this.userUsecase.getAll()
      .catch((err: string) => { 
        res.status(500).send(err);
        return;
      });
    res.status(200).send(users);
  }

  private async getById(req: Request, res: Response) {
    const user = await this.userUsecase.getById(req.params.id)
      .catch((err: string) => {
        res.status(500).send(err);
        return;
      });
    res.status(200).json(user);
  }

  private async create(req: Request, res: Response) {
    const results = await this.userUsecase.create(req.body)
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
        return;
      });
    res.status(201).json(results);
  }

  private async update(req: Request, res: Response) {
    await this.userUsecase.update(req.body)
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
        return;
      });
    res.status(200).send();
  }

  private async delete(req: Request, res: Response) {
    await this.userUsecase.delete(req.params.id)
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
        return;
      });
    res.status(204).send();
  }
}
