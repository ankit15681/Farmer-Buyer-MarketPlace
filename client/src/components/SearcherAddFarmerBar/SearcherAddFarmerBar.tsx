import React, { useState } from "react";
import { Button, Grid } from "@material-ui/core";
import Searcher from "./Searcher";
import { useHistory } from "react-router";

const SearcherAddFarmerBar = () => {
    const history = useHistory();
    const profile = localStorage.getItem('profile')!;
    const [user, setUser] = useState(JSON.parse(profile));

    return (
        <Grid container spacing={3} alignItems="center" style={{marginBottom: "20px", marginTop: "80px"}}>
            {user?.result ?
                <Grid item xs={12} sm={4}>
                    <Button onClick={() => history.push('/addFarmer')} color="secondary" variant="contained">Add Prices</Button>
                </Grid>
                :
                <Grid item xs={12} sm={6}></Grid>}
            <Grid item xs={12} sm={8}><Searcher /></Grid>
        </Grid>
    )
}

export default SearcherAddFarmerBar;