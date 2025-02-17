import axios from "axios";

export const requestNomal = axios.create({
    url: "https://movienew.cybersoft.edu.vn/api/",
    withCredentials: true,
    cyberToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OSIsIkhldEhhblN0cmluZyI6IjAzLzA5LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1Njg1NzYwMDAwMCIsIm5iZiI6MTcyOTcwMjgwMCwiZXhwIjoxNzU3MDA1MjAwfQ.nPo29RkxTkE_C16RhJnxw90M3v3cu3Ur91a47F5epxA",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "",
        "Access-Control-Allow-Credentials": true,
    },
});
