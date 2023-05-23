import React from "react";
import { useTranslation } from "react-i18next";

export default function PokemonList({ data }) {
  const { t } = useTranslation();
  return (
    <div className="cardGrid">
      {data.map((d) => (
        <div key={d.id} className="card" style={{width: '18rem'}}>
          <h6>{d.id}</h6>
          <img className="card-img-top" src={d.sprite} alt={d.name}/>
          <div className="card-body">
            <h4 className="card-title">{d.name}</h4>
            <h5 className="card-text">{t(`main.weight`)} : {d.weight}</h5>
            <h5 className="card-text">{t(`main.height`)}: {d.height}</h5>
            <h5 className="card-text">{t(`main.type`)}: {d.type[0]} {d.type[1]}</h5>
          </div>
          </div>
      ))}
    </div>
  );
}
