import { UnreachableCaseError } from '../../util/UnreachableCaseError.ts';
import { Controller, Delete, Route, SuccessResponse, Tags, Response, Path } from 'tsoa';
import { UserStorage } from '../../storage/UserStorage.ts';
import { IUserStorage } from '../../storage/IUserStorage.ts';

@Route('/users/:id')
export class DeleteUserController extends Controller {
  /**
   * Removes a user
   * @param id The ID of the user to remove
   */
  @Delete()
  @Tags('Users')
  @SuccessResponse(
    200,
    'OK'
  )
  @Response(
    404,
    'User not found'
  )
  public async deleteUserController(
    @Path() id: string
  ): Promise<{ message: string }> {
    const deps = {
      userStorage: new UserStorage()
    };

    const result = deleteUser(deps, id);
    if (result.type === 'ok') {
      this.setStatus(200);
      return { message: result.message };
    } if (result.type === 'notFound') {
      this.setStatus(404);
      return { message: result.message };
    } else {
      throw new UnreachableCaseError();
    }

  }
}

interface Dependencies {
  userStorage: IUserStorage
}

type Exits = { type: 'ok', message: string } |
{ type: 'notFound', message: string };

export const deleteUser = (deps: Dependencies, id: string): Exits => {
  return deps.userStorage.deleteUser(id);
}
