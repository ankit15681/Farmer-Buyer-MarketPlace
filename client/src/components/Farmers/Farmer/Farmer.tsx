import React, { useState } from 'react';
import { Button, Grid, Card, CardContent, CardActions, Typography, CardMedia, IconButton } from '@material-ui/core';
import useStyles from './styles';
import FarmerModel from '../../../models/Farmer';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import noImage from '../../../images/no-image.png';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteFarmer } from '../../../actions/farmers';

interface props {
    farmer: FarmerModel,
}

const Farmer = ({ farmer }: props) => {    
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const charsInPlot = 200;
    // const directors = farmer?.directors && farmer.directors.length > 0 ? farmer.directors.join(', ') : 'Director unknown';
    // const genres = farmer?.genres && farmer?.genres.length > 0 ? farmer?.genres.join(', ') : 'Genre unknown';
    const plot = farmer?.plot && farmer?.plot.length > charsInPlot ? `${farmer?.plot.substring(0, charsInPlot)}...` : farmer?.plot === undefined ? 'No plot given' : farmer?.plot;
    const image = farmer?.poster ? farmer?.poster?.toString() : noImage;
    const profile = localStorage.getItem('profile')!;
    const loggedUser = JSON.parse(profile);

    return (
        <Grid item xs={12} md={6} lg={3}>
            <Card className={classes.root} raised>
                <CardContent>
                    <Typography variant="h6" component="h2" noWrap>{farmer.title}</Typography>
                    <CardMedia className={classes.media} image={image} title={image} />
                    <Typography component="p" variant="caption" style={{ marginTop: "10px" }}>{plot}</Typography>
                </CardContent>
                <CardActions>
                    {loggedUser && Object.keys(loggedUser).length !== 0 && loggedUser?.result?._id === farmer?.userId &&
                        <>
                            <IconButton aria-label="delete" style={{ position: "absolute", left: "170px", bottom: "2px" }} onClick={() => dispatch(deleteFarmer(farmer._id, history))}>
                                <DeleteIcon fontSize="large" color="secondary" />
                            </IconButton>
                            <IconButton aria-label="edit" style={{ position: "absolute", left: "220px", bottom: "2px" }} onClick={() => history.push(`/editFarmer/${farmer._id}`)}>
                                <EditRoundedIcon fontSize="large" color="secondary" />
                            </IconButton>
                        </>
                    }
                    <Button size="large" color="secondary" variant="contained" className={classes.button} onClick={() => history.push(`/farmers/${farmer._id}`)}>Details</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default Farmer;