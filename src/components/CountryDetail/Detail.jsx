import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useCountryStore from '../../store/store';

export const Detail = () => {
  const { country, setCountry } = useCountryStore();
  const [ languagesText, setLanguagesText ] = useState([]);
  const navigate = useNavigate();

  const handleCountryClick = (name) => {
    setCountry(name);
    navigate(`/country/${name}`);
  }

  useEffect(() => {
    if (country.languages) {
      const languages = Object.values(country.languages);
      const formatLanguages = languages.length
        ? languages.length > 1
          ? `${languages.slice(0, -1).join(', ')} y ${languages.slice(-1)}`
          : languages[0]
        : null
      setLanguagesText(formatLanguages)
    }
  }, [country.languages]);

  return (
    <>
      <h2>{country.flag} Descubre {country.name}</h2>
      <p>
        {country.flagImg && <img src={country.flagImg} alt={country.name} />}
        {country.flagDescription && <i>{country.flagDescription}</i>}
      </p>
      <p>
        {country.continents ? (<>Dentro de <b>{country.continents}</b>, </>) : null}
        {country.region && <>{country.name} se encuentra ubicada en la región de <b>{country.region}</b> </>}
        {country.subregion && <>y subregión de <b>{country.subregion}</b>. </>}
        {country.area && <>Es un país que abarca una superficie de <b>{country.area.toLocaleString("es-ES")} km²</b> y </>}
        {country.population && <>alberga una población aproximada de <b>{country.population.toLocaleString("es-ES")} habitantes</b>. </>}
        {country.capital && <>Su capital es <b>{country.capital}</b>.</>}
      </p>
      <p>
        {languagesText && <>En {country.name} se habla en <b>{languagesText}</b>. </>}
        {country.currency
            && <>Su moneda de curso legal es el <b>{country.currency} </b>
                {country.currencySymbol && <><i>({country.currencySymbol})</i>. </>}
              </>}
        {country.phoneCode && <>Para las comunicaciones internacionales, el país utiliza el código telefónico <b>{country.phoneCode}</b>, y </>}
        {country.drivingSide && <>el tráfico circula por el lado <b>{country.drivingSide === 'left' ? 'izquierdo' : 'derecho'}</b> de la carretera.</>}
      </p>
      <p>
        {country.name}
        {country.independent && <> es un país <b>independiente</b></> || <><b> NO</b> es un país <b>independiente</b></>} y
        {country.independent && <> forma parte de la <b>ONU</b>. </> || <> <b>NO</b> es miembro de la <b>ONU</b>. </>}
        {country.domain && <>Su dominio de internet está representado por <b>[{country.domain}]</b>, y </>}
        {country.timezones && <>su huso horario es <b>{country.timezones}</b>. </>}
        {country.latlng && <>El país se extiende entre las coordenadas geográficas <b>[{country.latlng.join(', ')}]</b></>}
        {country.capitalInfo && <> con su capital ubicada en <b>[{country.capitalInfo?.join(', ')}]</b></>}.
      </p>
      {country.borders.length > 0 ? (
        <>
          <p>Comparte frontera con:</p>
          <ul>
            {country.borders.map((neighbor, index) => (
              <li key={index} onClick={() => handleCountryClick(neighbor)}>{neighbor}</li>
            ))}
          </ul>
        </>
      ) : null}
      {(country.mapGoogle || country.mapOSM) 
        ? (<>
            <p>Si deseas explorar más sobre {country.name}, puedes visitar su ubicación en:</p>
            <ul>
              {country.mapGoogle && <li><a href={country.mapGoogle} target='_blank'>Google Maps</a></li>}
              {country.mapOSM && <li><a href={country.mapOSM} target='_blank'>OpenStreetMap</a></li>}
            </ul>
          </>)
        : null}
    </>
  );
}
