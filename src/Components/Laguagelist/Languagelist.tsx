import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';
import { useTranslation } from 'react-i18next';
import { FaEarthAmericas, FaCaretDown } from 'react-icons/fa6';
import { localesList } from '@/consts/locales.ts';
import './languageList.scss';

export default function Languagelist() {
  const { i18n } = useTranslation();

  return (
    <div className="language__list">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="language__list-trigger">
          <FaEarthAmericas />
          <FaCaretDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="language__list-content">
            {Object.keys(localesList).map((locale) => (
              <DropdownMenuItem key={locale} className="language__list-item" onClick={() => i18n.changeLanguage(locale)}>
                <img className="language__list-item-flag" src={localesList[locale].flag} alt={localesList[locale].title} />
                <span className="language__list-item-title">{localesList[locale].title}</span>
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>

      </DropdownMenu>
    </div>
  );
}
