import { Controller, Get, Route, SuccessResponse, Tags } from 'tsoa';
import { UserStorage } from '../../storage/UserStorage';
import { IUserStorage } from '../../storage/IUserStorage';
import { User } from '../../types/User';

@Route('/users')
export class GetUsersController extends Controller {
  /**
   * Get all users
   */
  @Get()
  @Tags('Users')
  @SuccessResponse(
    200,
    'OK',
    'Returns all users')
  public async getUsersController(): Promise<User[]> {
    const deps = {
      userStorage: new UserStorage()
    };

    const result = getUsers(deps);

    this.setStatus(200);
    return result.value;
  }
}

interface Dependencies {
  userStorage: IUserStorage
}

type Exits = { type: 'ok', value: User[] };

export const getUsers = (deps: Dependencies): Exits => {
  return deps.userStorage.getUsers();
}