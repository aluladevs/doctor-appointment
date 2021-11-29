import SelectInput from "../SelectInput";
import Select from "../Select";
import Gender from "../../constants/gender";
import Input from "../Input";
import {Country} from "country-state-city";
import Datepicker from "../Datepicker";

export default function InformationForm({ formik }) {
    const countries = Country.getAllCountries();

    return (
        <div>
            <hr className="mt-10"/>
            <h1 className="mt-5 mb-5 text-xl font-medium">Basic Information</h1>
            <div className="grid grid-cols-2 gap-4">
                <Datepicker
                    label="Birthday"
                    name="birthday"
                    value={formik.values.birthday}
                    onChange={formik.handleChange}/>
                <SelectInput
                    label="Contact"
                    name="contact"
                    selected={formik.values.phoneCode}
                    value={formik.values.contact}
                    onChange={formik.handleChange}
                    onSelectChange={(value) => formik.setFieldValue("phoneCode", value)}
                    options={countries.map(e => ({...e, value: e.phonecode}))}/>
                <Select
                    label="Gender"
                    name="gender"
                    value={formik.values.gender}
                    options={Gender}
                    onChange={formik.handleChange}/>
                <Select
                    useSearch
                    label="Country"
                    name="country"
                    value={formik.values.country}
                    options={countries.map(e => ({...e, value: e.name}))}
                    onChange={formik.handleChange}/>
                <Input
                    label="City"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}/>
                <Input
                    label="Address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}/>
            </div>
        </div>
    )
}