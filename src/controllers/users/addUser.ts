import { Controller, Post, Route, SuccessResponse, Tags, Response, Body } from 'tsoa';
import { User } from '../../types/User';
import { UnreachableCaseError } from '../../util/UnreachableCaseError';
import { UserStorage } from '../../storage/UserStorage';
import { IUserStorage } from '../../storage/IUserStorage';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

@Route('/users')
export class AddUserController extends Controller {
  /**
   * Add a user
   * @param body The user to add
   */
  @Post()
  @Tags('Users')
  @SuccessResponse(
    200,
    'OK'
  )
  @Response(
    400,
    'badRequest',
    'Invalid user submitted'
  )
  public async addUserController(
    @Body() body: { user: User }
  ): Promise<{ message: User | string }> {
    const deps = {
      userStorage: new UserStorage()
    };

    const hashedPassword = await bcrypt.hash(body.user.password, SALT_ROUNDS);
    const user = {
      ...body.user,
      password: hashedPassword
    }
    const result = addUser(deps, user);

    if (result.type === 'ok') {
      this.setStatus(200);
      return { message: user };
    } else {
      throw new UnreachableCaseError();
    }
  }
}

interface Dependencies {
  userStorage: IUserStorage
}

type Exits = { type: 'ok', message: string };

export const addUser = (deps: Dependencies, user: User): Exits => {
  return deps.userStorage.addUser(user);
}
