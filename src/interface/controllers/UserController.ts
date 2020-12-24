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

    // this.router.get('/users/:id', async (req, res) => 
    //   await this.get(req, res)
    // );

    // this.router.post('/users', async (req, res) => 
    //   await this.create(req, res)
    // );

    // this.router.put('/users', async (req, res) => 
    //   await this.update(req, res)
    // );

    // this.router.delete('/users/:id', async (req, res) => 
    //   await this.delete(req, res)
    // );
  }

  private async getAll(req: Request, res: Response): Promise<void> {
    const users = await this.userUsecase.getAll().catch((err: string) => err);
    res.send(users);
  }

  // private async getAll(req: Request, res: Response): void {
  //   const results = await this.userUsecase.getAll()
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).send(err);
  //       return;
  //     });
  //   res.status(200).json(results);
  // }

  // async get(req, res) {
  //   const results = await this.userUsecase.get(req.params.id)
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).send(err);
  //       return;
  //     });
  //   res.status(200).json(results);
  // }

  // async create(req, res) {
  //   const results = await this.userUsecase.create(req.body)
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(400).send(err);
  //       return;
  //     });
  //   res.status(201).json(results);
  // }

  // async update(req, res) {
  //   await this.userUsecase.update(req.body)
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(400).send(err);
  //       return;
  //     });
  //   res.status(200).send();
  // }

  // async delete(req, res) {
  //   await this.userUsecase.delete(req.params.id)
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).send(err);
  //       return;
  //     });
  //   res.status(204).send();
  // }
}
