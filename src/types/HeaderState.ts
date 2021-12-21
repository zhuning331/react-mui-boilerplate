export default interface IHeaderState {
  tabValue: number,
  accountAnchorEl: HTMLElement | null,
  languageAnchorEl: HTMLElement | null
}
  
export const initialHeaderState: IHeaderState = {
  tabValue: 0,
  accountAnchorEl: null,
  languageAnchorEl: null
}