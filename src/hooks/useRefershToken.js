import axios from '../api/axios';

const useRefershToken = () => {
    const refresh = async () => {
        const response = await axios.get(`/refresh`, {
            withCredentials: true
        });
        localStorage.setItem('accessToken', response?.data?.accessToken);

        return response?.data?.accessToken;
    }
    return refresh;
}

export default useRefershToken;