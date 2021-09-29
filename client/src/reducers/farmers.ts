import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_FARMER, CREATE, FETCH_BY_SEARCH, UPDATE, DELETE, DELETE_SUCCESSFUL, UPDATE_SUCCESSFUL, COMMENT } from '../constants/actionTypes';

export default (state = { isLoading: true, farmers: [] }, action: any) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                farmers: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_BY_SEARCH:
            return { ...state, farmers: action.payload.data };
        case FETCH_FARMER:
            return { ...state, farmer: action.payload.farmer };
        case CREATE:
            return { ...state, farmers: [...state.farmers, action.payload] };
        case UPDATE:
            return { ...state, farmers: state.farmers.map((farmer) => (farmer._id === action.payload._id ? action.payload : farmer)) };
        case UPDATE_SUCCESSFUL:
            return { ...state, updateSuccessful: action?.payload };
        case DELETE:
            return { ...state, farmers: state.farmers.filter((farmer) => farmer._id !== action.payload) };
        case DELETE_SUCCESSFUL:
            return { ...state, deleteSuccessful: action?.payload };
        case COMMENT:
            return {
                ...state,
                posts: state.farmers.map((farmer) => {
                    if (farmer._id == +action.payload._id) {
                        return action.payload;
                    }
                    return farmer;
                }),
            };
        default:
            return state;
    }
}