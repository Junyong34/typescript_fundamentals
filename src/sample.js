import axios from "axios";
import qs from "qs";
// import moment from "moment";

axios.defaults.timeout = 1000 * 60 * 5;
// axios.defaults.headers.common.Authorization = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTU2MjY0ODQ4OCwiZXhwIjoxNDk3NDQzNDA4OH0.GY0HpRi3xLmfb5pzQvnZdHCmQ2Xn7iXcwFBnLyWMa0OZuzRDTw7P1X417zTRAZHIafAOMgrUqjUhjzFqho-4uQ";

const reqHandleSuccess = config =>
    // debugger;
    // loading
    config
;

const reqHandleError = error => Promise.reject(error);

const resHandleSuccess = response =>
    // loading
    response;

const resHandleError = error => Promise.reject(error);

axios.interceptors.request.use(reqHandleSuccess, reqHandleError);

axios.interceptors.response.use(resHandleSuccess, resHandleError);

function checkStatus(response) {
    // debugger;
    // loading
    if (response && (response.status === 200 ||
        response.status === 304 ||
        response.status === 400)) {
        return response;
    }
    return {
        status: -404,
        msg: "error",
    };
}

function checkCode(res) {
    // debugger;
    if (res.status === -404) {
        console.log(res.msg);
    }
    res.data.callType = "call";
    return res;
}

export default {
    isNewToken: true,
    TokenType: "",
    TokenKey: "",
    baseURL: "",
    post(url, data, contentType = "application/json", responseType = "json", baseURL = this.baseURL) {
        return axios({
            method: "post",
            baseURL,
            url,
            responseType,
            data,
            headers: {
                "Content-Type": contentType,
                ...this.isNewToken && {Authorization: `${this.TokenType} ${this.TokenKey}`},

            },
        }).then(
            response => checkStatus(response),
        )
            .then(
                res => checkCode(res),
            );
    },
    patch(url, data, contentType = "application/json", responseType = "json", baseURL = this.baseURL) {
        return axios({
            method: "patch",
            baseURL,
            url,
            responseType,
            data,
            headers: {
                "Content-Type": contentType,
                ...this.isNewToken && {Authorization: `${this.TokenType} ${this.TokenKey}`},

            },
        }).then(
            response => checkStatus(response),
        )
            .then(
                res => checkCode(res),
            );
    },
    put(url, data, contentType = "application/json", responseType = "json", baseURL = this.baseURL) {
        return axios({
            method: "put",
            baseURL,
            url,
            responseType,
            data,
            headers: {
                "Content-Type": contentType,
                ...this.isNewToken && {Authorization: `${this.TokenType} ${this.TokenKey}`},

            },
        }).then(
            response => checkStatus(response),
        )
            .then(
                res => checkCode(res),
            );
    },
    delete(url, data, contentType = "application/json", responseType = "json", baseURL = this.baseURL) {
        return axios({
            method: "delete",
            baseURL,
            url,
            responseType,
            data,
            headers: {
                "Content-Type": contentType,
                ...this.isNewToken && {Authorization: `${this.TokenType} ${this.TokenKey}`},

            },
        }).then(
            response => checkStatus(response),
        )
            .then(
                res => checkCode(res),
            );
    },
    get(url, data, contentType = "application/json", responseType = "json", baseURL = this.baseURL) {
        return axios({
            method: "get",
            baseURL,
            url,
            responseType,
            params: qs.stringify(data),
            headers: {
                "Content-Type": contentType,
                ...this.isNewToken && {Authorization: `${this.TokenType} ${this.TokenKey}`},
            },
        }).then(
            response => checkStatus(response),
        )
            .then(
                res => checkCode(res),
            );
    },
};
