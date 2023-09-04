import "../styles/Typeahead.css";
import React from "react";
import Select from "react-select";

export interface BirdOption {
  value: string;
  labelEN: string;
  labelFI: string;
  audio: string;
  image: string; // Path to the bird image
}

interface TypeaheadProps {
  options: BirdOption[];
  onSelect: (option: BirdOption | null) => void;
}

const Typeahead: React.FC<TypeaheadProps> = ({ options, onSelect }) => {
  const handleChange = (selectedOption: BirdOption | null) => {
    console.log("in handlechange", selectedOption, onSelect);
    onSelect(selectedOption);
  };
  // @ts-ignore
  const CustomOption = ({ data, innerProps }) => {
    // You can access the option data using the 'data' prop
    const { value, customProperty } = data;

    return (
      <div {...innerProps}>
        {/* <img src={data.image} alt={data.label} className="bird-image" /> */}
        <span className="bird-label">{data.labelEN}</span>
        {/* <span style={{ marginLeft: "8px" }}>{customProperty}</span> */}
      </div>
    );
  };

  return (
    <div className="typeahead">
      <Select
        options={options}
        onChange={handleChange}
        //onselect={handleChange}
        placeholder="Select a bird..."
        value={null}
        isClearable={true}
        components={{ Option: CustomOption }}
      />
    </div>
  );
};

export default Typeahead;
