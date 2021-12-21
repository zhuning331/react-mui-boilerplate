import { GridRowModel } from '@mui/x-data-grid';

export default interface IRowsState {
  page: number,
  pageSize: number,
  rowCount: number,
  rows: GridRowModel[],
  loading: boolean,
  searchTerm: string
}