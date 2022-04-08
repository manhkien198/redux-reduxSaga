import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import * as React from 'react';
export interface StatisticItemProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
  },
}));
export default function StatisticItem({ icon, label, value }: StatisticItemProps) {
  const classess = useStyles();
  return (
    <Paper className={classess.root}>
      <Box>{icon}</Box>
      <Box>
        <Typography variant="h5" align="right">
          {value}
        </Typography>
        <Typography variant="caption" align="right">
          {label}
        </Typography>
      </Box>
    </Paper>
  );
}
