
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";


const Error = ({ error }) => {
    const handleClose = (event ) => {
    
    }
  return (
    <Stack sx={{ width: "100%", mb: 5 }} spacing={2}>
      <Alert severity="error" onClose={handleClose}>
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>{error}</strong>
      </Alert>
    </Stack>
  );
};

export default Error;
