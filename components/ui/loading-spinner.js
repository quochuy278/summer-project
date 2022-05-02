import styles from './loadingspinner.module.css'
import CircularProgress from '@mui/material/CircularProgress';
import  Box from '@mui/system/Box';

const LoadingSpinner = () => {
    return (
        <Box className={styles.container}>
      <CircularProgress size={'70px'}/>
        </Box>
  
    )
}

export default LoadingSpinner