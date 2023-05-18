import Dropdown from 'react-bootstrap/dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Limit({setPageLimit, pageLimit}) {
    const setLimit = (s) => {
        setPageLimit(s);
    }

    const displayLimit = `${pageLimit}`

    return (
        <DropdownButton size="sm" onSelect={setLimit} valule={20} id="Search Limit" title={displayLimit}>
            <Dropdown.Item eventKey="16">16</Dropdown.Item>
            <Dropdown.Item eventKey="20">20</Dropdown.Item>
            <Dropdown.Item eventKey="32">32</Dropdown.Item>
            <Dropdown.Item eventKey="48">48</Dropdown.Item>
        </DropdownButton>
        
    )
}