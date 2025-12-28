export interface ILoginStorage {
  setLogin(username: string, password: string): Promise<{ type: 'ok' } | { type: 'Unauthorized', message: string }>
}
