'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SchoolIcon from '@mui/icons-material/School';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import Link from 'next/link';

const pages = [
  { title: '首页', href: '/' },
  { title: '企业服务', href: '/enterprise' },
  { title: '校友圈', href: '/alumni-network', icon: 'people' },
  { title: '企业招聘直通车', href: '/career', icon: 'work' },
  { title: '企业大模型', href: '/enterprise-ai', icon: 'smartToy' },
  { title: '个人中心', href: '/profile' },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            校友宝
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
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
                  key={page.title} 
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href={page.href}
                >
                  <Typography textAlign="center" sx={{ display: 'flex', alignItems: 'center' }}>
                    {page.icon === 'smartToy' && (
                      <SmartToyIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                    )}
                    {page.icon === 'people' && (
                      <PeopleIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                    )}
                    {page.icon === 'work' && (
                      <WorkIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                    )}
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <SchoolIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            校友宝
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                component={Link}
                href={page.href}
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  color: (page.title === '企业大模型' || page.title === '校友圈') ? 'primary.main' : 'inherit', 
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: (page.title === '企业大模型' || page.title === '校友圈') ? 'bold' : 'normal',
                }}
              >
                {page.icon === 'smartToy' && (
                  <SmartToyIcon fontSize="small" sx={{ mr: 0.5 }} />
                )}
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href="/login"
              sx={{ ml: 2 }}
            >
              登录
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 
