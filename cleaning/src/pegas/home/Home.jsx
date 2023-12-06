import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import {Checkbox,ListItemText,Grid} from '@mui/material';

import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import DetailsBar from './DetailsBar';

const Home = () => {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:7000/fetchData');
        setDatas(res.data.datas);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const categories = ['Home services', 'Deep Cleaning', 'Car Wash'];
  const [selectedItems, setSelectedItems] = useState({
    'Home services': [],
    'Deep Cleaning': [],
    'Car Wash': [],
  });

  const handleCategoryChange = (category, itemName) => {
    setSelectedItems((prevSelected) => {
      const categorySelection = { ...prevSelected };
      if (categorySelection[category].includes(itemName)) {
        categorySelection[category] = categorySelection[category].filter(
          (item) => item !== itemName
        );
      } else {
        categorySelection[category] = [...categorySelection[category], itemName];
      }
      return categorySelection;
    });
  };

  const [openDropdown, setOpenDropdown] = useState(null);
    const handleToggleDropdown = (dropdownName) => {
        setOpenDropdown((prevOpen) => (prevOpen === dropdownName ? null : dropdownName));
    };
  return (
    <>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Grid container display={'flex'} justifyContent={'space-evenly'} sx={{padding:'50px 100px 50px 100px'}}>
            {categories.map((category) => (
              <Grid item key={category}>
                <Dropdown
                  open={openDropdown === category}
                  onClose={() => setOpenDropdown(null)}
                >
                  <MenuButton
                    onClick={() => handleToggleDropdown(category)}
                  >
                    {category}
                  </MenuButton>
                  <Menu>
                    {datas
                      .filter((item) => item.category === category)
                      .map((item) => (
                        <MenuItem key={item.name} value={item.name}>
                          <Checkbox
                            checked={selectedItems[category].includes(item)}
                            onChange={() => handleCategoryChange(category, item)}
                          />
                          <ListItemText primary={item.name} />
                        </MenuItem>
                      ))}
                  </Menu>
                </Dropdown>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <DetailsBar data={selectedItems}/>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
