import { useTranslation } from 'react-i18next';
import './header.scss';

export default function Header() {
    const { t } = useTranslation();
    return (
        <div className="header">
            <div className="logo">
                <img className="accent" src="/images/pokeBall.png" alt="poke ball" />
                <img className="title-image" src='https://fontmeme.com/permalink/230526/d083300c65e36ad9bccd252b935590d8.png'
                    alt="pokedex-font" />
                <img className="accent" src="/images/pokeBall.png" alt="poke ball" />
            </div>
            <h1 className="title">{t('main.header')}</h1>
        </div>
    )
}
