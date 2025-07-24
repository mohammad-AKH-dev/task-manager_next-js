import React, { useContext } from "react";
import {
  Tabs,
  Tab,
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { themeContext } from "@/app/contexts/ThemeContext";

type TabsComponentPropsType = {
  tabs: string[];
  setMainTab:  React.ActionDispatch<[selectedStatus: string]>;
  mainTab: string;
};

export default function TabsComponent({
  tabs,
  setMainTab,
  mainTab,
}: TabsComponentPropsType) {
  const [value, setValue] = React.useState(0);
  const ThemeContext = useContext(themeContext);

  const handleChangeTabs = (
    event: React.SyntheticEvent | any,
    newValue: number
  ) => {
    setValue(newValue);
    setMainTab(event.target.dataset.task);
  };

  const handleChangeSelect = (value: string) => setMainTab(value);

  return (
    <>
      <div className="tabs-component">
        <Box sx={{ width: "100%", flexWrap: "wrap" }}>
          <Tabs value={value} onChange={handleChangeTabs}>
            {tabs.map((tab) => (
              <Tab
                sx={{ color: `${ThemeContext?.value === "dark" && "#e5e5e5"}` }}
                label={tab}
                data-task={tab}
              />
            ))}
          </Tabs>
        </Box>
      </div>
      <div className="select-component ">
        <FormControl
          sx={{
            m: 1,
            minWidth: 160,
            translate: -10,
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          <InputLabel sx={{ color: `${ThemeContext?.value === "dark" && "#e5e5e5"}`, display: `${ThemeContext?.value === 'dark' && 'none'}` }} id="demo-simple-select-helper-label">Tasks</InputLabel>
          <Select
          sx={{ color: `${ThemeContext?.value === "dark" && "#e5e5e5"}`,border: `${ThemeContext?.value === 'dark' && '1px solid #e5e5e5'}` }}
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={mainTab}
            label="Age"
            onChange={(event) => handleChangeSelect(event.target.value)}
          >
            {tabs.map((tab, index) => (
              <MenuItem className="capitalize" key={index} value={tab}>
                {tab}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
}
