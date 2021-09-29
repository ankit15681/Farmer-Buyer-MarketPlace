import * as api from '../api';
import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_FARMER, CREATE, ERROR, FETCH_BY_SEARCH, UPDATE, DELETE, DELETE_SUCCESSFUL, UPDATE_SUCCESSFUL, COMMENT } from '../constants/actionTypes';

export const getFarmers = (page: number) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchFarmers(page);
    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  }
  catch (error) {
    console.log(error);
  }
}

export const getFarmer = (id: any) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchFarmer(id);

    dispatch({ type: FETCH_FARMER, payload: { farmer: data } });
    dispatch({ type: END_LOADING });
  }
  catch (error) {
    console.log(error);
  }
}

export const getFarmersBySearch = (searchQuery: any) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchFarmersBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createFarmer = (farmer, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createFarmer(farmer);

    if (data?.error) {
      dispatch({ type: ERROR, data });
      return history.push('/addFarmer');
    }

    dispatch({ type: END_LOADING });
    dispatch({ type: CREATE, payload: data });
    history.push(`/farmers/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateFarmer = (farmer, history) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateFarmer(farmer.farmerId, farmer);

    if (data?.error) {
      dispatch({ type: ERROR, data });
      return history.push('/editFarmer');
    }

    dispatch({ type: UPDATE, payload: data });
    dispatch({ type: UPDATE_SUCCESSFUL, payload: true});
    dispatch({ type: END_LOADING });
    return history.push(`/farmers/${data._id}`);
  } catch (error) {
    console.log(error);
  }
}

export const deleteFarmer = (id, history) => async (dispatch : any) => {
  try {
    dispatch({ type: START_LOADING });
    await api.deleteFarmer(id);

    dispatch({ type: DELETE, payload: id });
    dispatch({ type: DELETE_SUCCESSFUL, payload: true});
    dispatch({ type: END_LOADING });
    return history.push(`/farmers`); 
  } catch (error) {
    console.log(error);
  }
};

