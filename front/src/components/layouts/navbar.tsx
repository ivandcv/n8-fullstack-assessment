import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  MenuItem,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import reactLogo from '../../assets/react.svg';
import { useRouteInfo } from '@hooks/useRouteInfo';
import { useUIContext } from '@hooks/useUIContext';

const pages = [
  { id: 'employeesList', link: 'employees', title: 'Employees' },
  { id: 'departmentsList', link: 'departments', title: 'Departments' },
];

export const Navbar: React.FC = () => {
  const { navbarInteractiveElementRef, onNavInitialized: _nav_initialize } =
    useUIContext();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const activeRoute = useRouteInfo();
  const navigate = useNavigate();

  useEffect(() => {
    _nav_initialize();
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link to="/employees">
              <img src={reactLogo} className="logo" alt="React logo" />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.id}
                  onClick={() => navigate(`/${page.link}`)}
                >
                  <Typography
                    textAlign="center"
                    style={{
                      color:
                        activeRoute.id === page.id
                          ? 'rgb(102, 179, 255)'
                          : 'rgb(182, 190, 201)',
                    }}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={() => navigate(`/${page.link}`)}
                sx={{ my: 2, display: 'block' }}
                style={{
                  color:
                    activeRoute.id === page.id
                      ? 'rgb(102, 179, 255)'
                      : 'rgb(182, 190, 201)',
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1 }} ref={navbarInteractiveElementRef}></Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
