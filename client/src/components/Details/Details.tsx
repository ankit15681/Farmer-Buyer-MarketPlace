import React, { useEffect, useRef, useState } from 'react';
import { CircularProgress, Paper, Grow, Grid, Container, Card, CardContent, Typography, CardMedia, Divider, TextField, Button, Accordion, AccordionSummary, AccordionDetails, Tabs, Tab, Snackbar } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { a11yProps } from './TabPanel';
import { useHistory, useParams } from 'react-router-dom';
import { deleteFarmer, getFarmer } from '../../actions/farmers';
import moment from 'moment';
import PhotoOutlinedIcon from '@material-ui/icons/PhotoOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TabPanel from './TabPanel';
import EventNoteIcon from '@material-ui/icons/EventNote';
import Alert from '../Helpers/Alert';
import { UPDATE_SUCCESSFUL } from '../../constants/actionTypes';

const Details = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    
    const { farmer, isLoading } = useSelector((state: any) => state.farmers);
    const { updateSuccessful } = useSelector((state: any) => state.farmers);
    const { id } = useParams<any>();
    const profile = localStorage.getItem('profile')!;
    const loggedUser = JSON.parse(profile);
    
    const [showEditSuccess, setShowEditSuccess] = useState(false);
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (updateSuccessful) {
            setShowEditSuccess(true);
        }
    }, [updateSuccessful]);

    useEffect(() => {
        const getData = async () => {
            await dispatch(getFarmer(id));
            
        }
        getData();
    }, [id]);
    

    if (!farmer) return null;
    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper} style={{marginTop: "80px"}}>
                <CircularProgress size="7em" color="secondary" />
            </Paper>
        );
    }

    const handleCloseEditSuccess = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch({ type: UPDATE_SUCCESSFUL, payload: false });
        setShowEditSuccess(false);
    }

    const posterSection =
        <Card raised>
            <CardContent style={{ padding: '0' }}>
                {farmer?.poster ?
                    <CardMedia className={classes.media} image={farmer?.poster} title={farmer?.poster}></CardMedia>
                    :
                    <div style={{ height: '500px' }}><PhotoOutlinedIcon style={{ width: "100%", height: "100%" }} /></div>}
            </CardContent>
        </Card>

    const contentSection =
        <Card raised>
            <CardContent>
                <Typography variant="h4" align="center">{farmer?.title}</Typography>
        
                <Typography>{farmer?.plot}</Typography>
                {loggedUser && Object.keys(loggedUser).length !== 0 && loggedUser?.result?._id === farmer?.userId &&
                    <div style={{ display: "flex", marginTop: '10px', justifyContent: 'space-between' }}>
                        <Button color="secondary" variant="outlined" onClick={() => dispatch(deleteFarmer(farmer._id, history))} >DELETE</Button>
                        <Button color="secondary" variant="outlined" onClick={() => history.push(`/editFarmer/${farmer?._id}`)} >EDIT</Button>
                    </div>
                }
            </CardContent>
        </Card >

    const commentsSection =
        <Card raised style={{ height: '500px' }}>
            <CardContent>
                <div className={classes.commentsUpperContainer} style={loggedUser && Object.keys(loggedUser).length !== 0 ? {height: "200px"} : {height: "400px"}}>
                </div>
                <div style={{margin: "15px"}}></div>
            </CardContent>
        </Card>

    const lastActionDiv =
        <div className={classes.updateOrCreateDiv}>
            <div>Created: {moment(farmer?.lastupdated).fromNow()}</div>
            <div>Last action: {moment(farmer?.lastUpdated).fromNow()}</div>
        </div>

    return (
        <Container style={{marginTop: "80px"}}>
            {lastActionDiv}
            <Grow in timeout={{ enter: 1500 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>{posterSection}</Grid>
                    <Grid item xs={12} sm={6}>{contentSection}</Grid>
                </Grid>
            </Grow>

            <Snackbar open={showEditSuccess} autoHideDuration={6000} onClose={handleCloseEditSuccess}>
                <Alert onClose={handleCloseEditSuccess} severity="success">Edit successful</Alert>
            </Snackbar>
        </Container>
    )
}

export default Details;