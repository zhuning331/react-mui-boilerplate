import React, { useState, useEffect, useMemo, ChangeEvent } from 'react';
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid, GridColumns, GridActionsCellItem, GridRowId } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { AxiosResponse } from 'axios';
import { debounce } from 'lodash';

import MockUserUpdate from './MockUserUpdate';
import MockUserDelete from './MockUserDelete';
import MockUserService from '../../services/MockUserService';
import IMockUser from '../../types/MockUser';
import SearchBar from '../../components/SearchBar';

const MockUserList: React.FC = () => {
  const [mockUsers, setMockUsers] = useState<IMockUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => getMockUsers(), []);

  const getMockUsers = () => {
    setLoading(true);
    MockUserService.getMockUsers()
      .then((res: AxiosResponse) => {
        setMockUsers(res.data);
        setLoading(false);
      })
      .catch((e: Error) => {
        console.error(e);
        setLoading(false);
      });
  }

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'firstName', headerName: 'First name', flex: 1 },
    { field: 'lastName', headerName: 'Last name', flex: 1 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      flex: 1,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex: 2,
      valueGetter: (params: any) =>
        `${params.getValue(params.id, 'firstName') || ''} ${
          params.getValue(params.id, 'lastName') || ''
        }`,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      cellClassName: 'actions',
      getActions: ({id}) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      }
    }
  ];

  const handleAddClick = () => {
    navigate(`${pathname}/add`);
  }

  const handleEditClick = (id: GridRowId) => {
    navigate(`${pathname}/${id}`);
  }

  const handleDeleteClick = (id: GridRowId) => {
    navigate(`${pathname}/${id}/delete`);
  }

  const searchTermChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    MockUserService.searchMockUser(evt.target.value)
      .then((res: AxiosResponse) => {
        setMockUsers(res.data);
        setLoading(false);
      })
      .catch((e: Error) => {
        console.error(e);
        setLoading(false);
      });
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(searchTermChangeHandler, 500)
  , []);

  return (
    <div style={{ width: '100%' }}>
      <Stack 
        direction="row" 
        spacing={2}
        sx={{
          marginBottom: 2,
          justifyContent: 'right'
        }}
      >
        <SearchBar 
          onSearchTermChange={debouncedChangeHandler} />
        <Button
          variant="contained" 
          startIcon={<AddIcon />} 
          sx={{textTransform: 'none'}}
          onClick={handleAddClick}
        >
          Add Mock User
        </Button>
      </Stack>
      <DataGrid
        rows={mockUsers}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
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
      <Routes>
        <Route path="add" element={<MockUserUpdate onRefreshList={getMockUsers} />} />
        <Route path=":id" element={<MockUserUpdate onRefreshList={getMockUsers} />} />
        <Route path=":id/delete" element={<MockUserDelete onRefreshList={getMockUsers} />} />
      </Routes>
    </div>
  )
}

export default MockUserList;
