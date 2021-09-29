import { Button, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getFarmersBySearch } from "../../actions/farmers";
import { genres } from "../../constants/dummyData";

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
const Searcher = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [selectedGenres, setSelectedGenres] = useState<any>([]);
    const [title, setTitle] = useState('');
    const query = useQuery();

    useEffect(() => {
        const searchQuery = query.get('searchQuery');
        const genres = query.get('genres')?.split(',');

        if(searchQuery?.trim()?.length > 0) {
            setTitle(searchQuery);
        }
        if(genres?.length > 0) {
            setSelectedGenres(genres);
        }
    }, []);

    const searchPost = () => {
        const finalSearch = title.trim(); 
        if (finalSearch.length > 0 || selectedGenres.length > 0) {
            dispatch(getFarmersBySearch({ search : finalSearch, genres: selectedGenres.join(',') }));
            history.push(`/farmers/search?searchQuery=${finalSearch || 'none'}&genres=${selectedGenres.join(',')}`);
        }
        else {
            history.push('/');
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Autocomplete fullWidth value={selectedGenres} onChange={(event: any, value: string | string[]) => setSelectedGenres(value)} multiple options={genres} getOptionLabel={(option: any) => option} filterSelectedOptions
                renderInput={(params) => <TextField {...params} color="secondary" variant="outlined" label="Choose genre" placeholder="Genre" />}
            />
            <TextField value={title} fullWidth id="standard-search" label="Search field" type="search" variant="outlined" color="secondary" onChange={(e: any) => setTitle(e.target.value)} />
            <Button variant="contained" color="secondary" onClick={searchPost}>Search</Button>
        </div>
    )
}

export default Searcher;