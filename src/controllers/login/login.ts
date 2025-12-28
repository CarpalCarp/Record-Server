import { Body, Controller, Post, Response, Route, SuccessResponse, Tags } from 'tsoa';
import { UnreachableCaseError } from '../../util/UnreachableCaseError.ts';
import { ILoginStorage } from '../../storage/ILoginStorage.ts';
import { LoginStorage } from '../../storage/LoginStorage.ts';

type Exits = { type: 'ok' } | { type: 'Unauthorized', message: string };

@Route('/login')
export class LoginController extends Controller {
  /**
   * Add a patient record
   * @param body The patient record to add
   */
  @Post()
  @Tags('Login')
  @SuccessResponse(
    200,
    'OK'
  )
  @Response(
    401,
    'Unauthorized',
    'Invalid Credentials'
  )
  public async loginController(
    @Body() body: { username: string, password: string }
  ): Promise<Exits> {
    const deps = {
      loginStorage: new LoginStorage()
    };
    const result = await login(deps, body);
    if (result.type === 'ok') {
      this.setStatus(200);
      return result;
    } else if (result.type === 'Unauthorized') {
      this.setStatus(404);
      return result;
    } else {
      throw new UnreachableCaseError();
    }
  }
}

interface Dependencies {
  loginStorage: ILoginStorage
}

export const login = async (deps: Dependencies, body: { username: string, password: string }): Promise<Exits> => {
  return await deps.loginStorage.setLogin(body.username, body.password);
}
