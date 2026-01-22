import { useState } from "react";
import { useTranslation } from "react-i18next";
import './PokemonCardLayout.scss';
import { PokemonExtendedData } from '@/types/pokemonTypes';

export default function PokemonCardLayout({ data }: { data: PokemonExtendedData }) {
  const { t } = useTranslation();
  const images = [data.sprites.front_default, data.sprites.back_default, data.sprites.front_shiny, data.sprites.back_shiny];

  const [currentImage, setCurrentImage] = useState<number>(0);

  const handleMouseEnter = () => {
    setCurrentImage(currentImage + 1);
  }

  const handleMouseLeave = () => {
    setCurrentImage(0);
  }
  
  return (
    <div className="card">
      <h3 className="card_title">{data.id} - {data.name}</h3>
      <img className="card_image" src={images[currentImage]} alt={data.name} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
      <div className="card_body">
        <h5 className="card_text">
          {t('main.weight')}{': '}{data.weight}{' kg'}
        </h5>
        <h5 className="card_text">
          {t('main.height')}{': '}{data.height}{' m'}
        </h5>
        <h5 className="card_text">
          {t('main.type')}{': '}
          <span className="card_types">
            {data.types.map((type: PokemonExtendedData['types'][number]) => type.type.name).join(', ')}
          </span>
        </h5>
      </div>
    </div>
  );
}