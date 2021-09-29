import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    loadingPaper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '15px',
        height: '39vh',
        marginTop: '1rem'
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
      },
      icon: {
        margin: theme.spacing(1),
      },
  
      alert: {
        backgroundColor: '#f50057',
      }
}));
