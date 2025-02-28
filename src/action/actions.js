import { ADD, CLEAR_USER_AUTH, GET, SELECTED_CINEMA, SET_FILM, SET_USER_AUTH } from "./types";

export const addNew = (data) => {
    return {
        type: ADD,
        payload: data,
    };
};

export const getData = (data) => {
    return {
        type: GET,
        payload: data,
    };
};

// auth user

export const setUserAuth = (user) => {
    return {
        type: SET_USER_AUTH,
        payload: user,
    };
};

export const clearUserAuth = () => {
    return {
        type: CLEAR_USER_AUTH,
    };
};

export const setFlimRedux = (f) => {
    return {
        type: SET_FILM,
        payload: f,
    };
};

export const setSelectedCinemaSystem = (maHeThongRap, maCumRap) => {
    return {
        type: SELECTED_CINEMA,
        payload: { maHeThongRap, maCumRap },
    };
};
