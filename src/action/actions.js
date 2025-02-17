import { ADD, GET } from "./types";

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
