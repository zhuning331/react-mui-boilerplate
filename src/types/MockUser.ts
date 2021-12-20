export default interface IMockUser {
  id?: number,
  lastName: string,
  firstName: string,
  age: number
}

export const initialMockUser: IMockUser = {
  id: undefined,
  lastName: '',
  firstName: '',
  age: 0
} 