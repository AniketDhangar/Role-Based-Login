import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { extendTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import Person2Icon from '@mui/icons-material/Person2';
import ArticleIcon from '@mui/icons-material/Article';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useAuth } from '../Context/AuthContext';  // Assuming you have a context for auth
import Routing from '../Routing/Routing';
import { Suspense } from 'react';


export default function DashboardLayoutBasic({ window }) {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Custom hook to access the logout function

  const NAVIGATION = [
    { kind: 'header', title: 'Menus' },
    { segment: 'main/dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
    { segment: 'main/services', title: 'Services', icon: <DesignServicesIcon /> },
    { segment: 'main/appointments', title: 'Appointments', icon: <EventNoteIcon /> },
    { segment: 'main/users', title: 'Clients', icon: <Person2Icon /> },
    { segment: 'main/blogs', title: 'Blogs', icon: <ArticleIcon /> },
    { segment: 'main/contacts', title: 'Contacted Users', icon: <ContactMailIcon /> },
    { segment: 'profile', title: 'Profile', icon: <ContactMailIcon /> },
  ];

  const demoTheme = extendTheme({
    title: 'Admin Dashboard',
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    breakpoints: { values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1536 } },
  });

  const handleLogout = () => {
    logout();  // Clear the user's session or token
    navigate('/login'); // Redirect to login page
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
      branding={{ title: 'HVAC Admin Panel', homeUrl: '' }}
      window={window}
    >
      <DashboardLayout>
        {/* Render the routes */}
        <Suspense fallback={<div>Loading Nested Route...</div>}>
            <Outlet />
        </Suspense>

        {/* <Routing /> */}

        {/* Logout Button */}
        <Button
          sx={{ width: 50, alignSelf: 'center', justifySelf: 'center' }}
          onClick={handleLogout}
          variant="contained"
          color="primary"
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </DashboardLayout>
    </AppProvider>
  );
}
