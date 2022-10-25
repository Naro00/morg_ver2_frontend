import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";


const instance = axios.create({
    baseURL:"http://127.0.0.1:8000/api/v1/",
    withCredentials: true,
});

export const getClubs = () =>
    instance.get("clubs/").then((response) => response.data);

export const getClub = ({ queryKey }: QueryFunctionContext) => {
    const [_, clubPk] = queryKey;
    return instance.get(`clubs/${clubPk}`).then((response) => response.data);
};

export const getClubReivews = ({ queryKey }: QueryFunctionContext) => {
    const [_, clubPk] = queryKey;
    return instance.get(`clubs/${clubPk}/reviews`).then((response) => response.data);
};

export const getMe = () =>
    instance.get(`users/me/`).then((response) => response.data);

export const LogOut = () => instance.post(`users/log-out`, null, {headers: {"X-CSRFToken": Cookie.get("csrftoken") || "",},}).then((response) => response.data);

export const kakaoLogin = (code: string) =>
    instance.post(
        `users/kakao`,
        { code },
        {
            headers: {"X-CSRFToken": Cookie.get("csrftoken") || "",},
        }
    ).then((response) => response.status);

export interface IUsernameLoginVariables{
    username: string;
    password: string;
}

export interface IUsernameLoginSuccess{
    ok: string;
}

export interface IUsernameLoginError{
    error: string;
}

export const usernameLogIn = ({username, password,}: IUsernameLoginVariables) =>
    instance.post(
        `users/log-in`,
        { username, password },
        {
            headers: {"X-CSRFToken": Cookie.get("csrftoken") || "",},
        }
    ).then((response) => response.data);

export interface IUsernameSignupVariables{
        username: string;
        password: string;
        password1: string;
        name: string;
        email: string;
    }

export const userSignUp = ({username, password, password1, name, email }: IUsernameSignupVariables) =>
    instance.post(
        `users/`,
        { username, password, password1, name, email },
        {
            headers: {"X-CSRFToken": Cookie.get("csrftoken") || "",},
        }
    ).then((response) => response.data);

export const getAmenities = () =>
instance.get(`clubs/amenities`).then((response) => response.data);

export const getCategories = () =>
instance.get(`categories/`).then((response) => response.data);

export interface IUploadClubVariables {
name: string;
  city: string;
  gu: string;
  price: number;
  locker_room: number;
  toilets: number;
  description: string;
  address: string;
  kind: string;
  amenities: number[];
  category: number;
}

export const uploadClub = (variables: IUploadClubVariables) =>
    instance.post(
        `clubs/`,
        variables,
        {
            headers: {"X-CSRFToken": Cookie.get("csrftoken") || "",},
        }
    ).then((response) => response.data);