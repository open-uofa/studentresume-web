import React, { useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { Country, State, City } from "country-state-city";

// generate a location picker field textbox on the from on the right side
const LocationPicker = (props) => {

    const countries = Country.getAllCountries();
    const { id, title, index, onUpdateChange, locationData } = props;

    const { countryCode, region, city } = locationData;

    const update = (countryCode, regionCode, city) => {

        const locationState = {
            countryCode: countryCode,
            region: regionCode,
            city: city,
            postalCode: ' ',
            address: ' ',
        }
        onUpdateChange(title, index, id, locationState);
    }


    return (
        <div className="LocationPicker">
            <FormControl sx={{ m: 1, width: 140 }}>
                <InputLabel>Country</InputLabel>
                <Select
                    label="Country"
                    value={countryCode}
                    onChange={(e) => {
                        update(e.target.value, '', '');
                    }}
                    id='country'
                >
                    {countries.map((item) => (
                        <MenuItem key={item.isoCode} value={item.isoCode} id={item.isoCode}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: 140 }}>
                <InputLabel>State</InputLabel>
                <Select
                    value={region}
                    label="State"
                    id="state"
                    onChange={(e) => {
                        update(countryCode, e.target.value, '');
                    }}
                >
                    {countryCode ? (State.getStatesOfCountry(countryCode).map((item) => (
                        <MenuItem key={item.isoCode} value={item.isoCode} id={item.isoCode}>
                            {item.name}
                        </MenuItem>
                    ))) : null}
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: 140 }}>
                <InputLabel>City</InputLabel>
                <Select
                    value={city}
                    label="City"
                    id="city"
                    onChange={(e) => {
                        update(countryCode, region, e.target.value);
                    }}
                >
                    {region ? (City.getCitiesOfState(countryCode, region).map((item) => (
                        <MenuItem key={item.name} value={item.name} id={item.name}>
                            {item.name}
                        </MenuItem>
                    ))) : null}
                </Select>
            </FormControl>
        </div>
    );
}

export default LocationPicker;