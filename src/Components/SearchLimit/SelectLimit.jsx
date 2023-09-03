import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './searchLimit.styles.scss';

export default function Limit({ setPageLimit, pageLimit }) {
  const limitRanges = [20, 25, 30, 50];

  const handleClick = (e) => {
    setPageLimit(e.target.innerText);
  };

  return (
    <DropdownButton size="md" id="Search Limit" title={`${pageLimit}`}>
      {limitRanges.map((numbers) => (
        <Dropdown.Item key={numbers} onClick={(e) => handleClick(e)}>
          {numbers}
        </Dropdown.Item>
      ))}
    </DropdownButton>

  );
}

Limit.propTypes = {
  setPageLimit: PropTypes.func.isRequired,
  pageLimit: PropTypes.number.isRequired,
};
