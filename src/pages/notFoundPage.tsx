import React from "react";

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "70vh",
  background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
  backgroundImage:
    "url('https://assets.pokemon.com/static2/_ui/img/chrome/container_bg.png')",
  backgroundRepeat: "repeat",
};

const pokeballStyle: React.CSSProperties = {
  width: "110px",
  height: "110px",
  borderRadius: "50%",
  border: "5px solid #222",
  background:
    "linear-gradient(to bottom, #fff 50%, #ee1515 50%)",
  marginBottom: "24px",
  position: "relative",
  boxShadow: "0 4px 20px 0 rgba(0,0,0,0.19)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const pokeballCenterStyle: React.CSSProperties = {
  width: "40px",
  height: "40px",
  backgroundColor: "#fff",
  border: "5px solid #333",
  borderRadius: "50%",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1,
};

const pokeballLineStyle: React.CSSProperties = {
  content: "''",
  display: "block",
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "101%",
  transform: "translate(-50%, -50%)",
  height: "10px",
  background: "#222",
  zIndex: 0,
};

const headingStyle: React.CSSProperties = {
  color: "#ee1515",
  fontFamily: "'Kanit', 'Arial', sans-serif",
  fontWeight: 700,
  fontSize: "2.6rem",
  textShadow: "2px 2px 0 #ffe600, 0 0 10px #f4f4f4",
  marginBottom: "6px",
  letterSpacing: "1px",
  textAlign: "center",
};

const subheadingStyle: React.CSSProperties = {
  color: "#2F4550",
  fontFamily: "'Kanit', 'Arial', sans-serif",
  fontSize: "1.2rem",
  marginBottom: "16px",
  textAlign: "center",
};

const linkStyle: React.CSSProperties = {
  marginTop: "24px",
  padding: "8px 28px",
  background: "#ffcb05",
  color: "#2e3156",
  borderRadius: "30px",
  textDecoration: "none",
  fontWeight: 600,
  fontFamily: "'Kanit', 'Arial', sans-serif",
  boxShadow: "0 2px 8px 0 rgba(0,0,0,0.12)"
};

export default function NotFoundPage() {
  return (
    <div style={containerStyle}>
      <div style={pokeballStyle}>
        <span style={pokeballLineStyle}></span>
        <span style={pokeballCenterStyle}></span>
      </div>
      <h1 style={headingStyle}>404 - Pokémon Not Found!</h1>
      <div style={subheadingStyle}>
        Oops! Looks like you blacked out!<br />The page you seek cannot be found.
      </div>
      <a style={linkStyle} href="/">
        Return to the Pokédex
      </a>
    </div>
  );
}