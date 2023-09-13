import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './searchLimit.styles.scss';

export default function Limit({ setPageLimit, pageLimit }) {
  const setLimit = (s) => {
    setPageLimit(s);
  };
  const displayLimit = `${pageLimit}`;
  const limitRanges = [20, 25, 30, 50];
  return (
    <DropdownButton size="md" onSelect={(e) => setLimit(e)} id="Search Limit" title={displayLimit}>
      {limitRanges.map((numbers) => (
        <Dropdown.Item eventKey={numbers} key={numbers}>{numbers}</Dropdown.Item>
      ))}
    </DropdownButton>

  );
}

Limit.propTypes = {
  setPageLimit: PropTypes.func.isRequired,
  pageLimit: PropTypes.number.isRequired,
};
