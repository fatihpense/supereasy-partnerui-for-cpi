import { observable, decorate, action } from "mobx"
import axios from 'axios';
import PartnersStore from './PartnersStore.js';
import LoginStore from './LoginStore';
import StringParametersStore from './StringParametersStore';

export default class RootStore {

  constructor() {
    this.partnersStore = new PartnersStore(this)
    this.loginStore = new LoginStore(this)
    this.stringParametersStore = new StringParametersStore(this)
  }

}