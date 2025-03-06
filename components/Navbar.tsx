'use client';

<<<<<<< HEAD
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
=======
import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '@/app/providers';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const pages = [
  { title: '首页', path: '/dashboard' },
  { title: '企业服务', path: '/enterprise' },
  { title: '就业支持', path: '/career' },
  { title: '资源中心', path: '/resources' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
>>>>>>> upstream

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
<<<<<<< HEAD
=======
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
>>>>>>> upstream

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

<<<<<<< HEAD
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
=======
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    handleCloseUserMenu();
    await logout();
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo - Desktop */}
>>>>>>> upstream
          <Typography
            variant="h6"
            noWrap
            component={Link}
<<<<<<< HEAD
            href="/"
=======
            href="/dashboard"
>>>>>>> upstream
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

<<<<<<< HEAD
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
=======
          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
>>>>>>> upstream
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
<<<<<<< HEAD
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
=======
                <MenuItem
                  key={page.path}
                  onClick={() => {
                    handleCloseNavMenu();
                    router.push(page.path);
                  }}
                >
                  <Typography textAlign="center">{page.title}</Typography>
>>>>>>> upstream
                </MenuItem>
              ))}
            </Menu>
          </Box>
<<<<<<< HEAD
          
          <SchoolIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
=======

          {/* Logo - Mobile */}
>>>>>>> upstream
          <Typography
            variant="h5"
            noWrap
            component={Link}
<<<<<<< HEAD
            href="/"
=======
            href="/dashboard"
>>>>>>> upstream
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
<<<<<<< HEAD
          
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
<<<<<<< HEAD
=======

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.path}
                onClick={() => router.push(page.path)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
>>>>>>> upstream
=======
                {page.icon === 'people' && (
                  <PeopleIcon fontSize="small" sx={{ mr: 0.5 }} />
                )}
                {page.icon === 'work' && (
                  <WorkIcon fontSize="small" sx={{ mr: 0.5 }} />
                )}
>>>>>>> f894c1c (增加了校友圈功能版块)
                {page.title}
              </Button>
            ))}
          </Box>

<<<<<<< HEAD
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
=======
          {/* User menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="打开设置">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.name} src="/avatar.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => {
                handleCloseUserMenu();
                router.push('/profile');
              }}>
                <Typography textAlign="center">个人资料</Typography>
              </MenuItem>
              <MenuItem onClick={() => {
                handleCloseUserMenu();
                router.push('/settings');
              }}>
                <Typography textAlign="center">设置</Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center" color="error">
                  退出登录
                </Typography>
              </MenuItem>
            </Menu>
>>>>>>> upstream
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
<<<<<<< HEAD
}

export default Navbar; 
=======
} 
>>>>>>> upstream
