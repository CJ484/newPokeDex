import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Limit({setPageLimit, pageLimit}) {
    const setLimit = (s) => {
        setPageLimit(s);
    }

    const displayLimit = `${pageLimit}`

    return (
        <DropdownButton size="sm" onSelect={setLimit} valule={20} id="Search Limit" title={displayLimit}>
            <Dropdown.Item eventKey="20">20</Dropdown.Item>
            <Dropdown.Item eventKey="25">25</Dropdown.Item>
            <Dropdown.Item eventKey="30">30</Dropdown.Item>
            <Dropdown.Item eventKey="50">50</Dropdown.Item>
        </DropdownButton>
        
    )
}