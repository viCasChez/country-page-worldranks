import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Detail } from './Detail';

const country = {
  name: 'Spain',
  flag: '🇪🇸',
  flagImg: 'https://flagcdn.com/w320/es.png',
  flagDescription: 'Bandera de España',
  continents: 'Europe',
  region: 'Southern Europe',
  subregion: 'Iberian Peninsula',
  area: 505992,
  population: 47450795,
  capital: 'Madrid',
  languages: { spa: 'Spanish', cat: 'Catalan' },
  currency: 'Euro',
  currencySymbol: '€',
  phoneCode: '+34',
  drivingSide: 'right',
  independent: true,
  unMember: true,
  domain: '.es',
  timezones: 'UTC+1',
  latlng: [40.4637, -3.7492],
  capitalInfo: [40.4168, -3.7038],
  borders: ['France', 'Portugal'],
  mapGoogle: 'https://goo.gl/maps/Spain',
  mapOSM: 'https://www.openstreetmap.org/relation/1311341',
};

vi.mock('../../store/store', () => ({
  default: () => ({
    country,
    setCountry: vi.fn(),
  }),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

describe('Detail Component', () => {

  let containerDetail;  // Variable para almacenar el contenedor del renderizado

  beforeEach(() => {
    // const renderResult = render(React.createElement(Detail)); // Usar React.createElement en lugar de JSX
    const renderResult = render(<Detail />);
    containerDetail = renderResult.container;  // Guarda el contenedor para uso en las pruebas
  });

  const expectToContain = (text) => {
    return expect(containerDetail.innerHTML).toContain(text);
  }

  it('renders country name, flag correctly and description', () => {
    const { flag, name, flagDescription } = country;

    expectToContain(`<h2>${flag} Descubre ${name}</h2>`);
    expectToContain(`<i>${flagDescription}</i>`);
  });

  it('Render paragraph <p>continent, region, subregion, area, population and capital</p>', () => {
    const { continents, name, region, subregion, area, population, capital} = country;
    const areaLocale = area.toLocaleString("es-ES");
    const populationLocale = population.toLocaleString("es-ES");

    expectToContain(`Dentro de <b>${continents}</b>,`);
    expectToContain(`${name} se encuentra ubicada en la región de <b>${region}</b> `);
    expectToContain(`y subregión de <b>${subregion}</b>. `);
    expectToContain(`Es un país que abarca una superficie de <b>${areaLocale} km²</b> y `);
    expectToContain(`alberga una población aproximada de <b>${populationLocale} habitantes</b>. `);
    expectToContain(`Su capital es <b>${capital}</b>.`);
  });

  it('Render paragraph <p>languages, currency, currencySymbol, phoneCode and drivingSide</p>', () => {
    const { languages, name, currency, currencySymbol, phoneCode, drivingSide} = country;
    const languagesArray = Object.values(languages);
    const languagesText = `${languagesArray.slice(0, -1).join(', ')} y ${languagesArray.slice(-1)}`

    expectToContain(`En ${name} se habla en <b>${languagesText}</b>. `);
    expectToContain(`Su moneda de curso legal es el <b>${currency} </b>`);
    expectToContain(`<i>(${currencySymbol})</i>.`);
    expectToContain(`Para las comunicaciones internacionales, el país utiliza el código telefónico <b>${phoneCode}</b>, y `);
    expectToContain(`el tráfico circula por el lado <b>${drivingSide === 'left' ? 'izquierdo' : 'derecho'}</b> de la carretera.`);
  });

  it('Render paragraph <p>independent, unMember, domain, timezones, latlng and capitalInfo</p>', () => {
    const { independent, unMember, domain, timezones, latlng, capitalInfo} = country;
    const independentText = `${independent ? '' : `<b> NO</b>`} es un país <b>independiente</b>`;
    const unMemberText = `${unMember ? '' : `<b> NO</b>`} forma parte de la <b>ONU</b>`;

    expectToContain(independentText);
    expectToContain(unMemberText);
    expectToContain(`Su dominio de internet está representado por <b>[${domain}]</b>, y `);
    expectToContain(`su huso horario es <b>${timezones}</b>. `);
    expectToContain(`El país se extiende entre las coordenadas geográficas <b>[${latlng.join(', ')}]</b>`);
    expectToContain(`con su capital ubicada en <b>[${capitalInfo?.join(', ')}]</b>`);
  });
  
  it('Render list borders', () => {
    const { borders } = country;
    borders.map((neighbor => expectToContain(neighbor)));
  });
  
  it('Render paragraph <p>mapGoogle and mapOSM</p>', () => {
    const { mapGoogle, mapOSM } = country;
    
    expectToContain(`<li><a href="${mapGoogle}" target="_blank">Google Maps</a></li>`);
    expectToContain(`<li><a href="${mapOSM}" target="_blank">OpenStreetMap</a></li>`);
  });

});