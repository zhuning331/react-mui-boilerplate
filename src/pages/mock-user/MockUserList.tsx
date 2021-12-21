/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, ChangeEvent } from 'react';
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid, GridColumns, GridActionsCellItem, GridRowId, GridOverlay } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { AxiosResponse } from 'axios';
import { debounce } from 'lodash';

import MockUserUpdate from './MockUserUpdate';
import MockUserDelete from './MockUserDelete';
import MockUserService from '../../services/MockUserService';
import IRowsState from '../../types/RowsState';
import SearchBar from '../../components/SearchBar';

const MockUserList: React.FC = () => {
  const [rowsState, setRowsState] = useState<IRowsState>({
    page: 0,
    pageSize: 20,
    rowCount: 0,
    rows: [],
    loading: false,
    searchTerm: ''
  });
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getPagedMockUsers(rowsState.page, rowsState.pageSize, rowsState.searchTerm);
  }, [rowsState.page, rowsState.pageSize]) 

  const getPagedMockUsers = (page: number, pageSize: number, firstName?: string) => {
    setRowsState((prev: IRowsState) => ({ ...prev, loading: true }));
    MockUserService.getPagedMockUsers(page + 1, pageSize, firstName)
      .then((res: AxiosResponse) => {
        setRowsState((prev: IRowsState) => ({ ...prev, rowCount: +res.headers['x-total-count'], rows: res.data, loading: false }));
      })
      .catch((e: Error) => {
        console.error(e);
        setRowsState((prev: IRowsState) => ({ ...prev, loading: false }));
      });
  }

  const columns: GridColumns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      flex: 1 
    },
    { 
      field: 'firstName', 
      headerName: t('entity.mockUser.column.firstName'), 
      flex: 1 
    },
    { 
      field: 'lastName', 
      headerName: t('entity.mockUser.column.lastName'), 
      flex: 1 
    },
    {
      field: 'age',
      headerName: t('entity.mockUser.column.age'),
      type: 'number',
      flex: 1,
    },
    {
      field: 'fullName',
      headerName: t('entity.mockUser.column.fullName'),
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
      headerName: t('global.action.title'),
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
    setRowsState((prev: IRowsState) => ({ ...prev, searchTerm: evt.target.value }));
    getPagedMockUsers(rowsState.page, rowsState.pageSize, evt.target.value);
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
          {t('entity.mockUser.action.add')}
        </Button>
      </Stack>
      <DataGrid
        {...rowsState}
        onPageChange={(page: number) => setRowsState((prev: IRowsState) => ({ ...prev, page }))}
        paginationMode="server"
        columns={columns}
        rowsPerPageOptions={[20]}
        density='compact'
        autoHeight={true}
        hideFooterSelectedRowCount={true}
        sx={{
          '& .MuiDataGrid-footerContainer': {
            justifyContent: 'center'
          }
        }}
        components={{
          NoRowsOverlay: () => (
            <GridOverlay>{t('global.message.noRows')}</GridOverlay>
          ),
        }}
      />
      <Routes>
        <Route path="add" element={<MockUserUpdate onRefreshList={() => getPagedMockUsers(rowsState.page, rowsState.pageSize, rowsState.searchTerm)} />} />
        <Route path=":id" element={<MockUserUpdate onRefreshList={() => getPagedMockUsers(rowsState.page, rowsState.pageSize, rowsState.searchTerm)} />} />
        <Route path=":id/delete" element={<MockUserDelete onRefreshList={() => getPagedMockUsers(rowsState.page, rowsState.pageSize, rowsState.searchTerm)} />} />
      </Routes>
    </div>
  )
}

export default MockUserList;
