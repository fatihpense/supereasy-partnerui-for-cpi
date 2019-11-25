import { observable, decorate, action } from "mobx"


class PartnersStore {


    constructor(rootStore) {
        this.rootStore = rootStore
    }

    partnersList = [
    ]

    getAll() {
        let self = this;
        let axios = this.rootStore.loginStore.axios;

        axios.get('/api/v1/AlternativePartners',
        )
            .then(function (response) {

                self.partnersList = response.data.d.results;

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



decorate(PartnersStore, {
    partnersList: observable,
    getAll: action,
    pushEmployee: action
})

export default PartnersStore;
