export default interface IAuthState {
  isAuthenticated: boolean
}
  
export const initialAuthState: IAuthState = {
  isAuthenticated: false
}