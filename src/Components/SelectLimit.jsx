import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Limit({ setPageLimit, pageLimit }) {
  const setLimit = (s) => {
    setPageLimit(s);
  };

  const displayLimit = `${pageLimit}`;
  // you can render <Dropdown.Item /> from the list [20, 25, 30, 50]
  // It is more likely the format you will see
  return (
    <DropdownButton size="md" onSelect={setLimit} id="Search Limit" title={displayLimit}>
      <Dropdown.Item eventKey="20">20</Dropdown.Item>
      <Dropdown.Item eventKey="25">25</Dropdown.Item>
      <Dropdown.Item eventKey="30">30</Dropdown.Item>
      <Dropdown.Item eventKey="50">50</Dropdown.Item>
    </DropdownButton>

  );
}

Limit.propTypes = {
  setPageLimit: PropTypes.number.isRequired,
  pageLimit: PropTypes.number.isRequired,
};
