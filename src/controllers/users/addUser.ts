import { Controller, Post, Route, SuccessResponse, Tags, Response, Body } from 'tsoa';
import { User } from '../../types/User';
import { UnreachableCaseError } from '../../util/UnreachableCaseError';

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
    const result = { type: 'ok', message: body };

    if (result.type === 'ok') {
      this.setStatus(200);
      return { message: body.user };
    } else {
      throw new UnreachableCaseError();
    }
  }
}
