import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Box, Typography, IconButton, Button, Snackbar, Slide } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './FloatingActionButton.css';

const actions = [
  { name: 'Email: yourmail@example.com', icon: <MailIcon />, href: 'mailto:yourmail@example.com', isCopy: true },
  { name: 'Phone: +123456789', icon: <PhoneIcon />, href: 'tel:+123456789', isCopy: true },
  { name: 'LinkedIn', icon: <LinkedInIcon />, href: 'https://linkedin.com' },
  { name: 'Instagram', icon: <InstagramIcon />, href: 'https://instagram.com' },
  { name: 'Facebook', icon: <FacebookIcon />, href: 'https://facebook.com' },
];

const FloatingActionButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isButtonZoomed, setButtonZoomed] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setButtonZoomed(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMouseLeave = () => {
    if (!open) {
      setButtonZoomed(false);
    }
  };

  const handleActionClick = async (action) => {
    handleClose();
    if (action.isCopy) {
      const valueToCopy = action.href.replace(/mailto:|tel:/, '');
      try {
        await navigator.clipboard.writeText(valueToCopy);
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Failed to copy: ', error);
      }
    }
  };


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="floating-button-container">
      <Button aria-label="more" aria-controls="long-menu" aria-haspopup="true"
        onClick={handleClick}
        onMouseLeave={handleMouseLeave}
        className={isButtonZoomed ? "Mui-focusVisible" : ""}
      >
        {open ? <MenuOpenIcon /> : <MenuIcon />}
        <Typography sx={{ ml: 1 }}>me joindre</Typography>
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} PaperProps={{
        style: {
          marginTop: '15px',
          marginRight: '20px',
          minWidth: '20ch',
          backgroundColor: 'rgba(245, 245, 245, 0.8)', // off-white with slight opacity
          borderRadius: '15px',
          transition: '0.3s',
          boxShadow: '0px 3px 5px 2px rgba(0, 0, 0, 0.2)',
        },
      }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        {actions.map((action) => (
          <MenuItem onClick={() => handleActionClick(action)} key={action.name} component="a" href={action.isCopy ? null : action.href} target="_blank" rel="noopener noreferrer">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {action.icon}
              <Typography sx={{ ml: 1 }}>{action.name}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message="Copié dans le presse-papiers"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={Slide}
      />
    </div>
  );
};

export default FloatingActionButton;
