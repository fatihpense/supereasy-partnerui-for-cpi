import { observable, decorate, action } from "mobx";
import axios from 'axios';


class LoginStore {

    constructor(rootStore) {
        this.rootStore = rootStore
    }

    tenantUrl = "";
    username = "";
    password = "";

    isLoggedIn = false;
    csrfToken = "";
    errorText = "";


    //https://github.com/axios/axios/issues/1664#issuecomment-415492981
    axios = axios.create({
        withCredentials: true,
        headers: {
            common: {},
        }
    });

    clearTenantUrl(tenantUrl) {
        if (!tenantUrl.startsWith('https://')) {
            tenantUrl = 'https://' + tenantUrl;
        }
        // console.log(tenantUrl)
        const tenantUrlURL = new URL(tenantUrl);
        tenantUrl = 'https://' + tenantUrlURL.hostname;
        return tenantUrl;
    }

    basicAuthString(username, password) {
        let data = username + ':' + password;
        let buff = new Buffer.from(data);
        let base64data = buff.toString('base64');
        return base64data;
    }

    tryLogin(tenantUrl, username, password) {
        let axios = this.axios;
        let self = this;

        return new Promise(function (resolve, reject) {

            axios.get('/logged_in')
                .then(function (response) {
                    // console.log(response.data)
                    if (response.data.logged_in) {
                        self.isLoggedIn = true;
                        resolve();
                    } else {


                        tenantUrl = self.clearTenantUrl(tenantUrl)

                        axios.post('/set', { "url": tenantUrl })
                            .then(function (response) {

                                axios.defaults.headers.common['Authorization'] = "Basic " + self.basicAuthString(username, password);

                                axios.get('/api/v1/', { headers: { 'X-CSRF-Token': 'Fetch' } })
                                    .then(function (response) {
                                        // console.log(response.headers)
                                        if ('x-csrf-token' in response.headers) {
                                            
                                            //successful
                                            axios.defaults.headers.common['X-CSRF-Token'] = response.headers['x-csrf-token'];
                                            self.isLoggedIn = true;
                                            resolve();
                                        } else {
                                            console.log("no csrf")
                                        }

                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                        reject(error);

                                    })
                                    .finally(function () {

                                    });

                            })
                            .catch(function (error) {
                                console.log(error);
                                reject(error);
                            })
                            .finally(function () {
                                // always executed

                            });
                    }

                });
        });

    }

}


decorate(LoginStore, {
    isLoggedIn: observable,
    getAll: action,
    pushEmployee: action
})

export default LoginStore;
