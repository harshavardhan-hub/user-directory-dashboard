import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { initializeTheme } from '@/store/slices/themeSlice';
import { Layout } from '@/components/Layout';
import { UsersPage } from '@/pages/UsersPage';
import { UserDetailPage } from '@/pages/UserDetailPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
