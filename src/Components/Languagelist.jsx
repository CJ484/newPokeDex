import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import locales from '../consts/locales';

export default function Languagelist() {
  const { i18n } = useTranslation();

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
