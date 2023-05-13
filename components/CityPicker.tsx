"use client";

import { RefreshIcon } from "@heroicons/react/outline";
import { GlobeIcon } from "@heroicons/react/solid";
import { City, Country, State } from "country-state-city";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";

type CountryOptionType = {
  value: {
    latitude: string;
    longitude: string;
    isoCode: string;
  };
  label: string;
} | null;

type StateOptionType = {
  value: {
    latitude: string;
    longitude: string;
    isoCode: string;
    countryCode: string;
  };
  label: string;
} | null;

type CityOptionType = {
  value: {
    latitude: string;
    longitude: string;
    countryCode: string;
    name: string;
    stateCode: string;
  };
  label: string;
} | null;

const countryOptions = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}));

const CityPicker = () => {
  const [selectedCountry, setSelectedCountry] =
    useState<CountryOptionType>(null);

  const [selectedState, setSelectedState] = useState<StateOptionType>(null);
  const [selectedCity, setSelectedCity] = useState<CityOptionType>(null);
  const router = useRouter();

  // Get options for state dropdown
  const stateOptions = useMemo(() => {
    if (!selectedCountry?.value.isoCode) return [];

    return State.getStatesOfCountry(selectedCountry?.value.isoCode)?.map(
      (state) => ({
        value: {
          latitude: state.latitude!,
          longitude: state.longitude!,
          countryCode: state.countryCode,
          isoCode: state.isoCode,
        },
        label: state.name,
      })
    );
  }, [selectedCountry]);

  // Get options for city dropdown
  const cityOptions = useMemo(() => {
    if (!selectedCountry?.value.isoCode) return [];
    if (!selectedState?.value.isoCode) return [];

    return City.getCitiesOfState(
      selectedCountry?.value.isoCode,
      selectedState?.value.isoCode
    )?.map((city) => ({
      value: {
        latitude: city.latitude!,
        longitude: city.longitude!,
        countryCode: city.countryCode,
        stateCode: city.stateCode,
        name: city.name,
      },
      label: city.name,
    }));
  }, [selectedCountry, selectedState]);

  // Selection Handlers
  const handleSelectedCountry = (option: CountryOptionType) => {
    setSelectedCountry(option);
    setSelectedState(null);
    setSelectedCity(null);
  };

  const handleSelectedState = (option: StateOptionType) => {
    setSelectedState(option);
    setSelectedCity(null);
  };

  const handleSelectedCity = (option: CityOptionType) => {
    setSelectedCity(option);
  };

  // Submit Data
  const getWeather = () => {
    if (!selectedCountry) {
      toast.error("Please select a country at minimum");
    } else if (selectedCountry && !selectedState && !selectedCity) {
      router.push(
        `/location/${selectedCountry?.label}/${selectedCountry?.value.latitude}/${selectedCountry?.value.longitude}`
      );
    } else if (selectedCountry && selectedState && !selectedCity) {
      router.push(
        `/location/${selectedState?.label}/${selectedState?.value.latitude}/${selectedState?.value.longitude}`
      );
    } else if (selectedCountry && selectedState && selectedCity) {
      router.push(
        `/location/${selectedCity?.label}/${selectedCity?.value.latitude}/${selectedCity?.value.longitude}`
      );
    }
  };

  const resetInputs = () => {
    setSelectedCountry(null);
    setSelectedState(null);
    setSelectedCity(null);
  };

  return (
    <div>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-white opacity-80">
            <GlobeIcon className="h-5 w-5 text-white" />
            <label htmlFor="country">Country</label>
          </div>
          <Select
            className="text-black"
            value={selectedCountry}
            onChange={handleSelectedCountry}
            options={countryOptions}
          />
        </div>

        {/* Some countries do not have states */}
        {selectedCountry && stateOptions.length != 0 && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-white opacity-80">
              <GlobeIcon className="h-5 w-5 text-white" />
              <label htmlFor="country">State</label>
            </div>
            <Select
              className="text-black"
              value={selectedState}
              onChange={handleSelectedState}
              options={stateOptions}
            />
          </div>
        )}

        {/* Some states do not have cities */}
        {selectedState && cityOptions.length != 0 && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-white opacity-80">
              <GlobeIcon className="h-5 w-5 text-white" />
              <label htmlFor="country">City</label>
            </div>
            <Select
              className="text-black"
              value={selectedCity}
              onChange={handleSelectedCity}
              options={cityOptions}
            />
          </div>
        )}
      </div>
      <div className="pt-5 flex items-center justify-between">
        <button
          onClick={getWeather}
          className="text-gray-300 bg-gray-900 p-3 rounded-lg"
        >
          Get Weather
        </button>
        <button
          onClick={resetInputs}
          className="flex text-gray-300 bg-gray-900 p-3 rounded-lg"
        >
          <RefreshIcon className="h-5 w-5 mr-1" /> Reset Inputs
        </button>
      </div>
    </div>
  );
};

export default CityPicker;
