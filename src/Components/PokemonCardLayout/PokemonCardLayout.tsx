import { useState } from "react";
import { useTranslation } from "react-i18next";
import './PokemonCardLayout.scss';

type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  }
};

type PokemonCardLayoutProps = {
  data: {
    name: string;
    id: number;
    weight: string;
    height: string;
    sprites: {
      front_default: string;
      back_default: string;
      front_shiny: string;
      back_shiny: string;

    };
    types: PokemonType[];
  }
}

export default function PokemonCardLayout({ data }: PokemonCardLayoutProps) {
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
          {t('main.weight')}{': '}{data.weight}{' lbs'}
        </h5>
        <h5 className="card_text">
          {t('main.height')}{': '}{data.height}{' Feet'}
        </h5>
        <h5 className="card_text">
          {t('main.type')}{': '}
          <span className="card_types">
            {data.types.map((type: PokemonType) => type.type.name).join(', ')}
          </span>
        </h5>
      </div>
    </div>
  );
}