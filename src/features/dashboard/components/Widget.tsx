import { Box, makeStyles, Paper, Typography } from '@material-ui/core';

export interface WidgetProps {
  title: string;
  children: any;
}
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
  },
}));

export default function Widget({ title, children }: WidgetProps) {
  const classess = useStyles();
  return (
    <Paper className={classess.root}>
      <Typography variant="button">{title}</Typography>
      <Box mt={2}>{children}</Box>
    </Paper>
  );
}
