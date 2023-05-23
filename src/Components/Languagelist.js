import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons'

export default function Languagelist() {
    const { i18n } = useTranslation();
    const locales = {
      en: { title: "English" },
      es: { title: "Español" },
      po: { title: "Polski" },
    };

    return(
        <Dropdown  style={{background: "#d9d9d9",display: "flex", justifyContent: "flex-end", paddingRight: "10px", paddingTop: "10px" }} >
            <Dropdown.Toggle>
                <FontAwesomeIcon icon={faEarthAmericas}/>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {Object.keys(locales).map((locale)=> (
                    <Dropdown.Item key={locale} onClick={() => i18n.changeLanguage(locale)}> {locales[locale].title} </Dropdown.Item>
                ))}
            </Dropdown.Menu>
            
        </Dropdown>
    );
}