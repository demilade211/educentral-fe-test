import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";

interface City {
  latitude: number;
  longitude: number;
  name: string;
  countryCode: string;
}

interface SearchResult {
  value: string;
  label: string;
}

interface SearchProps {
  onSearchChange: (searchData: SearchResult) => void;
}

const Search: React.FC<any> = ({ onSearchChange }) => {
  const [search, setSearch] = useState<SearchResult | null>(null);

  const loadOptions = async (inputValue: string) => {
    // Add a delay of 4 seconds (4000 milliseconds) before making the request
    await new Promise(resolve => setTimeout(resolve, 4000));

    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    );
    const response_1 = await response.json();
    return {
      options: response_1.data.map((city: City) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      })),
    };
  };

  const handleOnChange = (searchData: any) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <div className="search">
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>
  );
};

export default Search;
