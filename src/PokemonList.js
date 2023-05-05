import React from "react";

export default function PokemonList({ data }) {
  return (
    <div className="cardGrid">
      {data.map((d) => (
        <div key={d.id} className="card" style={{width: '18rem'}}>
          <h6>{d.id}</h6>
          <img className="card-img-top" src={d.sprite} alt={d.name}/>
          <div className="card-body">
            <h4 className="card-title">{d.name}</h4>
            <h5 className="card-text">Weight: {d.weight}</h5>
            <h5 className="card-text">Height: {d.height}</h5>
            <h5 className="card-text">Type: {d.type[0]} {d.type[1]}</h5>
          </div>
          </div>
      ))}
    </div>
  );
}
