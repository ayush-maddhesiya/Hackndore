import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import avatar from '../assets/avatar.jpg';

export default function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button className='rounded-full' aria-describedby={id} variant="contained" onClick={handleClick}>
       <img src={avatar} className='h-20 w-20 rounded-full ' alt="" />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>welcome user.</Typography>
        <Typography sx={{ p: 2 }}>AADHAR no 6464431684.</Typography>
      </Popover>
    </div>
  );
}