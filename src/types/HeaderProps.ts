import { ITab } from '../types/Tab';

export default interface IHeaderProps {
  projectName?: string,
  version?: string,
  tabs: ITab[],
  setTabs: React.Dispatch<React.SetStateAction<ITab[]>>
}