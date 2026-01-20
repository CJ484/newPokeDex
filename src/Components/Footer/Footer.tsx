import { useTranslation } from 'react-i18next';
import './footer.scss';

export default function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="footer">
            <p> {t('main.footer')} -Carlos C.</p>
        </footer>
    )
}