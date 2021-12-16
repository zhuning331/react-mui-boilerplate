import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';

import TemplateList from '../pages/template/TemplateList';
import TemplateUpdate from '../pages/template/TemplateUpdate';

const Content: React.FC = () => {

  return (
    <Box sx={{ flexGrow: 1, padding: 1 }}>
      <Routes>
        <Route path="/AAA" element={<TemplateList />} />
        <Route path="/CCC" element={<TemplateUpdate />} />
        <Route path="/" element={<Navigate to="/AAA" />} />
      </Routes>
    </Box>
  )
}

export default Content;