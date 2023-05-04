import React from "react";

export default function PokemonList({ data }) {
  return (
    <div>
      {data.map((d) => (
        <div key={d.id}>{d.name}</div>
      ))}
    </div>
  );
}
