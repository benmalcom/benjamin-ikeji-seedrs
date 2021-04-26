import React from 'react';
import { Box, Typography } from '@material-ui/core';
import styles from './Message.module.scss';

const Loading = ({ message }) => <Box className={styles.box}>
  <Typography gutterBottom variant='h6' component='h6' align='center' color="textPrimary">
    {message}
  </Typography>
</Box>;

export default Loading;
