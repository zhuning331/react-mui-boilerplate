import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AxiosResponse } from 'axios';

import MockUserService from '../../services/MockUserService';
import IMockUser from '../../types/MockUser';

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

const TemplateList: React.FC = () => {
  const [mockUsers, setMockUsers] = useState<IMockUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    MockUserService.getMockUsers()
      .then((res: AxiosResponse) => {
        setMockUsers(res.data);
        setLoading(false);
      })
      .catch((e: Error) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={mockUsers}
        columns={columns}
        pageSize={20}
        density='compact'
        autoHeight={true}
        hideFooterSelectedRowCount={true}
        loading={loading}
        sx={{
          '& .MuiDataGrid-footerContainer': {
            justifyContent: 'center'
          }
        }}
      />
    </div>
  )
}

export default TemplateList;
