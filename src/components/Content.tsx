import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';

import MockUserList from '../pages/mock-user/MockUserList';
import TemplateUpdate from '../pages/mock-user/TemplateUpdate';

const Content: React.FC = () => {

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Routes>
        <Route path="/mock-user/*" element={<MockUserList />} />
        <Route path="/CCC" element={<TemplateUpdate />} />
        <Route path="/" element={<Navigate to="/mock-user" />} />
      </Routes>
    </Box>
  )
}

export default Content;