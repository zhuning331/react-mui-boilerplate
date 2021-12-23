export default interface ISignInState {
  username: string,
  password: string,
  rememberMe: boolean
}

export const initialSignInState: ISignInState = {
  username: '',
  password: '',
  rememberMe: false
}