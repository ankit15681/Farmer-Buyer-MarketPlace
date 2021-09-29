import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    media: {
        height: '500px',
    },

    loadingPaper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '15px',
        height: '39vh',
        marginTop: '1rem'
    },
    commentsUpperContainer: {
        overflowY: 'auto',
    },
    commentsLowerContainer: {
        display: 'flex',
        flexDirection: 'column',
        placeContent: 'flex-end'
    },

    noCommentsTypography: {
        fontStyle: 'italic'
    },

    accordionActive: {
        background: red[50],
        
    },
    accordionHover: {
        '&:hover': {
            background: red[50]
        }
    },
    updateOrCreateDiv: {
        display: 'flex',
        justifyContent: 'space-between',
        fontStyle: 'italic'
    },

    starsDiv: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: '10px',
        marginBottom: '10px',
    },
    
    votes: {
        fontSize: '11px',
        marginTop: '2px',
        marginLeft: '15px'
    }
}));
