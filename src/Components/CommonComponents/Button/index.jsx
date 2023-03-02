import Button from "@mui/material/Button";

export const CustomButton = ({ varient, width, name }) => {
  return (
    <Button
      variant={varient || "outlined"}
      style={{ width: `${width || 200}px` }}
    >
      {name || "Button"}
    </Button>
  );
};
