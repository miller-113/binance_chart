import { useState } from "react";

const TimeframeSelector = ({ onChange }) => {
  const [selectedValue, setSelectedValue] = useState("1m");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <select value={selectedValue} onChange={handleChange}>
      <option value="1s">1s</option>
      <option value="1m">1m</option>
      <option value="3m">3m</option>
      <option value="5m">5m</option>
      <option value="15m">15m</option>
      <option value="30m">30m</option>
      <option value="1h">1h</option>
      <option value="2h">2h</option>
      <option value="4h">4h</option>
      <option value="6h">6h</option>
      <option value="8h">8h</option>
      <option value="12h">12h</option>
      <option value="1d">1d</option>
      <option value="3d">3d</option>
      <option value="1w">1w</option>
      <option value="1M">1M</option>
    </select>
  );
};

export default TimeframeSelector;
