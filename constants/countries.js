import {Country} from "country-state-city";

const countries = Country.getAllCountries().map(e => ({ isoCode: e.isoCode, name: e.name, phonecode: e.phonecode, flag: e.flag }));

export default countries;