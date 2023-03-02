import TextField from "@mui/material/TextField";

export const CustomInput = ({ variant, width, name }) => {
  return (
    <TextField
      style={{ width: `${width || 200}px` }}
      id="outlined-basic"
      label={name}
      variant={variant || "outlined"}
    />
  );
};
