import { Button, CircularProgress, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import FileBase from 'react-file-base64';
import { getFarmer } from '../../actions/farmers';
import DateFnsUtils from '@date-io/date-fns';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from './styles'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Autocomplete } from '@material-ui/lab';
import { actors, countries, directors, genres, languages, writers } from '../../constants/dummyData';
import { updateFarmer } from '../../actions/farmers'
import Alert from '../Helpers/Alert';
import { ERROR } from '../../constants/actionTypes';

const EditFarmer = () => {
    const { id } = useParams<any>();
    const classes = useStyles();
    const { farmer, isLoading } = useSelector((state: any) => state.farmers);
    const { error } = useSelector((state: any) => state.error);
    const dispatch = useDispatch();
    const [showError, setShowError] = useState(false);
    const profile = JSON.parse(localStorage.getItem('profile')!);
    const [userId, setUserId] = useState(profile?.result?._id);
    const history = useHistory();

    const [farmerId, setFarmerId] = useState('')
    const [title, setTitle] = useState('');
    const [year, setYear] = useState(1900);
    const [releasedDate, setReleasedDate] = useState<Date | null>(null);
    const [selectedLanguages, setSelectedLanguages] = useState<any>([]);
    const [selectedActors, setSelectedActors] = useState<any>([]);
    const [selectedGenres, setSelectedGenres] = useState<any>([]);
    const [selectedCountries, setSelectedCountries] = useState<any>([]);
    const [fullPlot, setFullPlot] = useState('');
    const [selectedDirectors, setSelectedDirectors] = useState<any>([]);
    const [selectedWriters, setSelectedWriters] = useState<any>([]);
    const [runtime, setRuntime] = useState(null);
    const [type, setType] = useState('');
    const [awards, setAwards] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (error) {
            setShowError(true);
        }
    }, [error]);

    useEffect(() => {
        dispatch(getFarmer(id));
    }, [id]);

    useEffect(() => {
        if (farmer) {
            setFarmerId(farmer?._id);
            setTitle(farmer?.title);
            setYear(farmer?.year);
            setReleasedDate(new Date(farmer?.released));
            setSelectedLanguages(farmer?.languages);
            setSelectedActors(farmer?.cast);
            setSelectedGenres(farmer?.genres);
            setSelectedCountries(farmer?.countries);
            setFullPlot(farmer?.plot);
            setSelectedDirectors(farmer?.directors);
            setSelectedWriters(farmer?.writers);
            setRuntime(farmer?.runtime);
            setType(farmer?.type);
            setAwards(farmer?.awards?.wins);
            setFile(farmer?.poster);
        }
    }, [isLoading]);

    const handleClear = () => {
        setFarmerId('');
        setTitle('');
        setYear(1900);
        setReleasedDate(null);
        setSelectedLanguages([]);
        setSelectedActors([]);
        setSelectedGenres([]);
        setSelectedCountries([]);
        setFullPlot('');
        setSelectedDirectors([]);
        setSelectedWriters([]);
        setRuntime(1);
        setType('');
        setAwards(0);
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch({ type: ERROR, data: null });
        setShowError(false);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();


        if (title.trim().length === 0) {
            return dispatch({ type: ERROR, data: { error: "No title given" } });
        }
        if (year === 0) {
            return dispatch({ type: ERROR, data: { error: "No year given" } });
        }
        else if (!releasedDate) {
            return dispatch({ type: ERROR, data: { error: "No release date given" } });
        }
        else if (selectedLanguages.length === 0) {
            return dispatch({ type: ERROR, data: { error: "No languages given" } });
        }
        else if (selectedActors.length === 0) {
            return dispatch({ type: ERROR, data: { error: "No actors given" } });
        }
        else if (selectedGenres.length === 0) {
            return dispatch({ type: ERROR, data: { error: "No genres given" } });
        }
        else if (selectedCountries.length === 0) {
            return dispatch({ type: ERROR, data: { error: "No countries given" } });
        }
        else if (fullPlot.trim().length === 0) {
            return dispatch({ type: ERROR, data: { error: "No plot given" } });
        }
        else if (selectedDirectors.length === 0) {
            return dispatch({ type: ERROR, data: { error: "No directors given" } });
        }
        else if (selectedWriters.length === 0) {
            return dispatch({ type: ERROR, data: { error: "No writers given" } });
        }
        else if (!runtime) {
            return dispatch({ type: ERROR, data: { error: "No runtime given" } });
        }
        else if (type.trim().length === 0) {
            return dispatch({ type: ERROR, data: { error: "No type given" } });
        }

        dispatch(updateFarmer({ farmerId, title, year, releasedDate, selectedLanguages, selectedActors, selectedGenres, selectedCountries, fullPlot, selectedDirectors, selectedWriters, runtime, type, awards, file, userId }, history));
    }

    const getDatesToSelect = () => {
        const start = 1900;
        const end = new Date().getFullYear();
        const items = [];

        for (let i = start; i <= end; i++) {
            items.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
        }
        return items;
    }

    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper} style={{marginTop: "80px"}}>
                <CircularProgress size="7em" color="secondary" />
            </Paper>
        );
    }

    return (
        <Container component="main" maxWidth="md" style={{ marginTop: "80px" }}>
            <Paper className={classes.paper} elevation={6}>
                <Typography component="h1" variant="h5">Edit Farmer</Typography>
                <EditIcon fontSize="large" color="secondary" className={classes.icon} />
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField value={title} label="Title" variant="outlined" color="secondary" fullWidth onChange={(e: any) => { setTitle(e.target.value) }} />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <TextField value={fullPlot} fullWidth color="secondary" label="Prices" multiline rows={4} variant="outlined" onChange={(e: any) => { setFullPlot(e.target.value) }} />
                        </Grid>
                        
                        
                        <Grid item xs={12}>
                            <Typography style={{ marginBottom: "10px" }}>Add poster</Typography>
                            <FileBase value={file} type="file" multiple={false} onDone={({ base64 }) => setFile(base64)} />
                        </Grid>
                    </Grid>
                    <Button style={{ marginTop: "20px" }} fullWidth variant="contained" color="secondary" onClick={handleClear}>Clear form</Button>
                    <Button style={{ marginTop: "10px" }} type="submit" fullWidth variant="contained" color="secondary">Edit</Button>
                </form>
            </Paper>
            <Snackbar open={showError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" className={classes.alert}>{error}</Alert>
            </Snackbar>
        </Container>
    )
}


export default EditFarmer;