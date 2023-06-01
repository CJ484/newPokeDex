import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './PokemonList.styles.scss';

export default function PokemonList({ data }) {
  const { t } = useTranslation();
  return (
    <div className="cardGrid">
      {data.map((d) => (
        <div key={d.id} className="card">
          <h6>{d.id}</h6>
          <img className="card-img-top" src={d.sprite} alt={d.name} />
          <div className="card-body">
            <h4 className="card-title">{d.name}</h4>
            <h5 className="card-text">
              {t('main.weight')}
              {': '}
              {d.weight}
            </h5>
            <h5 className="card-text">
              {t('main.height')}
              {': '}
              {d.height}
            </h5>
            <h5 className="card-text">
              {t('main.type')}
              {': '}
              {d.type[0]}
              {' '}
              {d.type[1]}
            </h5>
          </div>
        </div>
      ))}
    </div>
  );
}

PokemonList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      weight: PropTypes.string.isRequired,
      height: PropTypes.string.isRequired,
      sprite: PropTypes.string.isRequired,
      type: PropTypes.arrayOf(
        PropTypes.string.isRequired,
      ),
    }),
  ).isRequired,
};
