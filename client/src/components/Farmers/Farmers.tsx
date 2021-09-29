import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress, Grow, Paper, Button } from '@material-ui/core';
import FarmerModel from '../../models/Farmer';
import Farmer from './Farmer/Farmer';
import useStyles from './styles';
import { Alert } from '@material-ui/lab';


const Farmers = () => {
    const { farmers, isLoading } = useSelector((state: any) => state.farmers);
    const classes = useStyles();

    if (!farmers.length && !isLoading) return (
        <Grid container spacing={3}>
            <Alert severity="error" style={{ width: "100%" }}>No farmers found</Alert>
        </Grid>)

    return (
        isLoading ?
            <Grid container spacing={3}>
                <Paper elevation={6} className={classes.loadingPaper}>
                    <CircularProgress size="7em" color="secondary" value={100} />
                </Paper>
            </Grid>
            :
            <Grow in={true} timeout={{ enter: 1500 }}>
                <Grid container spacing={3}>
                    {farmers?.map((farmer: FarmerModel, index: number) => (
                        <Farmer farmer={farmer} key={index} />
                    ))}
                </Grid>
            </Grow>
    )
}

export default Farmers;