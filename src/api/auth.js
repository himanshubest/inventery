
export default class auth {
    setApiKey = (apiKey, token) => {
        sessionStorage.setItem('apiKey', apiKey);
        sessionStorage.setItem('token', token);
    };
    setUserData = (apiUserData) => {

        sessionStorage.setItem('userData', apiUserData);

    };
    getApiKey = () => {
        return sessionStorage.getItem('apiKey');
    };
    getToken = () => {
        return sessionStorage.getItem('token');
    };
    isUserLoggedIn = () => {
        return this.getApiKey() != null;
    };
    getUser = () => {
        const data = sessionStorage.getItem('userData');
        return data ? JSON.parse(data) : null;  // Parse JSON string back to object
    };
    removeData = () => {

        sessionStorage.removeItem('apiKey');
        sessionStorage.removeItem('userData');
        sessionStorage.removeItem('token');
    };

}
