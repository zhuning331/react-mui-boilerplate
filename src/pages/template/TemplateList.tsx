import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: any) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 10, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 11, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 12, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 13, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 14, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 15, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 16, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 17, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 18, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const TemplateList: React.FC = () => {
  const [pageSize, setPageSize] = React.useState<number>(20);

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[10, 15, 20]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        density='compact'
        checkboxSelection
        autoHeight={true}
      />
    </div>
  )
}

export default TemplateList;
