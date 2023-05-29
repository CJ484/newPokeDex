import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';

export default function Languagelist() {
  const { i18n } = useTranslation();

  // Create folder src/consts/locales.js and put this in it:
  const locales = {
    en: { title: 'English' },
    es: { title: 'Español' },
    po: { title: 'Polski' },
  };

  return (
    <Dropdown>
      <Dropdown.Toggle>
        <FontAwesomeIcon icon={faEarthAmericas} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {Object.keys(locales).map((locale) => (
          <Dropdown.Item key={locale} onClick={() => i18n.changeLanguage(locale)}>
            {locales[locale].title}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>

    </Dropdown>
  );
}
