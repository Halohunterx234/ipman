import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import '../styles/filter.css';

const options = [
    'Filter By...',
  'First Created',
  'Last Created',
  'Name (A-Z)',
  'Name (Z-A)',
  'IP (Ascending)',
    'IP (Descending)',
];

enum FilterOptions {
    FirstCreated = 'First Created',
    LastCreated = 'Last Created',
    NameAsc = 'Name (A-Z)',
    NameDesc = 'Name (Z-A)',
    IpAsc = 'IP (Ascending)',
    IpDesc = 'IP (Descending)',
    }

export default function SimpleListMenu(props: { handleChange: (newFilter: FilterOptions) => void  }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    props.handleChange(options[index] as FilterOptions);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="filter-menu">
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: 'black', borderRadius: '10%'}}
      >
        <ListItemButton
            className="lock-button"
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            // primary="When device is locked"
            primary={options[selectedIndex]}
          />
        </ListItemButton>
      </List>
      <Menu
      className='filter-menu'
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'lock-button',
            role: 'listbox',
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export { FilterOptions };