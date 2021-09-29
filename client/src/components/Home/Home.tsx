import React, { useEffect, useState } from 'react';
import { Container, Snackbar } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import Farmers from '../Farmers/Farmers';
import Paginate from '../Pagination/Paginate';
import { useDispatch, useSelector } from 'react-redux';
import { getFarmers } from '../../actions/farmers';
import SearchAddFarmerBar from '../SearcherAddFarmerBar/SearcherAddFarmerBar';
import Alert from '../Helpers/Alert';
import { DELETE_SUCCESSFUL } from '../../constants/actionTypes';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const query = useQuery();
    const page = query.get('page') || 1;
    const dispatch = useDispatch();
    const { deleteSuccessful } = useSelector((state: any) => state.farmers);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    const searchQuery = query.get('searchQuery');

    useEffect(() => {
        if (page) {
            dispatch(getFarmers(Number(page)));
        }
    }, [dispatch, page]);

    useEffect(() => {
        if (deleteSuccessful) {
            setShowDeleteSuccess(deleteSuccessful);
        }
    }, [deleteSuccessful]);

    const handleCloseDeleteSuccess = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch({ type: DELETE_SUCCESSFUL, payload: false });
        setShowDeleteSuccess(false);
    }

    return (
        <Container maxWidth="lg">
            <SearchAddFarmerBar />
            {!searchQuery && <Paginate page={page} />}
            <Farmers />
            {!searchQuery && <Paginate page={page} />}

            <Snackbar open={showDeleteSuccess} autoHideDuration={6000} onClose={handleCloseDeleteSuccess}>
                <Alert onClose={handleCloseDeleteSuccess} severity="success">Delete successful</Alert>
            </Snackbar>
        </Container>
    )
}

export default Home;