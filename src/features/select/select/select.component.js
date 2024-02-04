import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuProps } from "../../../constants/selectMenuProp.const";

export default function SelectBox({
  items,
  label,
  multiple,
  require,
  onChange,
  value,
}) {
  const [data, setData] = React.useState(multiple ? [] : "");

  const handleChange = (event) => {
    setData(event.target.value);
    onChange(event.target.value);
  };

  React.useEffect(() => {
    if (value == null) {
      setData(multiple ? [] : "");
    }
  }, [value]);

  return (
    <div className="my-4">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            {label}
            {require ? "*" : ""}
          </InputLabel>
          <Select
            multiple={multiple != null ? multiple : false}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={data}
            label={label}
            onChange={handleChange}
            MenuProps={MenuProps}
          >
            {items.map((item) => (
              <MenuItem key={item.id} value={item}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
