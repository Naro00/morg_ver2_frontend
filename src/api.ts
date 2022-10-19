import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";


const instance = axios.create({
    baseURL:"http://127.0.0.1:8000/api/v1/"
})

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