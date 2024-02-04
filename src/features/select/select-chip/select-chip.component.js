import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { MenuProps } from "../../../constants/selectMenuProp.const";

export default function SelectBoxChip({
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
      <FormControl sx={{ m: 0, width: "100%" }}>
        <InputLabel id="demo-multiple-chip-label">
          {label}
          {require ? "*" : ""}
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple={multiple != null ? multiple : false}
          value={data}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={label} />}
          renderValue={(selected) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
              }}
            >
              {selected.map((value) => (
                <Chip key={value.id} label={value.name} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {items.map((item) => (
            <MenuItem key={item.id} value={item}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
