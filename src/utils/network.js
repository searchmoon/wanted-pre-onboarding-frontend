import axios from "axios";
import {SIGN_URL} from "../common/apiUrl";


export const centralAxiosPost = async (url, data) => {
    try {
        return await axios.post(`${SIGN_URL}${url}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch {
        console.log('통신 error');
    }
}