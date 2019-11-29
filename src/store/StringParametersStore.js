import { observable, decorate, action } from "mobx"
import axios from 'axios';


class StringParametersStore {

    constructor(rootStore) {
        this.rootStore = rootStore
    }
    all = [

    ]

    getAll() {
        let self = this;
        let axios = this.rootStore.loginStore.axios;
        axios.get('/api/v1/StringParameters')
            .then(function (response) {
                // handle success

                self.all = response.data.d.results;

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });




    }
}


decorate(StringParametersStore, {
    all: observable,
    getAll: action
})

export default StringParametersStore;
