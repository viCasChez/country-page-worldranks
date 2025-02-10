import { create } from 'zustand';

const useCountryStore = create((set, get) => ({
  countries: [],
  filteredCountries: [],
  currentPage: 1,
  country: {},
  isLoading: true,
  error: null,
  sortSelected: 'population',
  numResults: 0,
  allRegions: ['Americas', 'Antarctic', 'Africa', 'Asia', 'Europe', 'Oceania'],
  filterRegions: [],
  filterStatus: [],
  filterSearch: '',

  setCountries: (data) =>
    set({
      countries: data,
      numResults: data.length,
      filteredCountries: get()._sortData(get()._mapToListCountries(data), get().sortSelected),
      isLoading: false,
    }),

  setError: (error) => set({ error, isLoading: false }),

  setCurrentPage: (page) => {
    set({ currentPage: page })
  },

  setCountry: (name) => {
    const country = get().countries.find(country => country.translations.spa.common === name);
    set({ country: get()._mapCountryDetail(country) });
  },

  _applyFilters: () => {
    const { countries, filterRegions, filterStatus, filterSearch, sortSelected } = get();

    // Aplicamos el filtro por regiones si hubiera alguna marcada
    let filtered = filterRegions.length
      ? countries.filter((country) => filterRegions.includes(country.region))
      : countries;

    // Aplicamos el filtro de status si hubiera alguno marcado
    if (filterStatus.length) {
      const newFiltered = filtered.filter((country) =>
        filterStatus.some((key) => {
          if (key === 'independent') return country.independent;
          if (key === 'unitedNation') return country.unMember;
          return false;
        })
      );
      filtered = newFiltered;
    }

    // Aplicamos el filtro búsqueda por texto si existiera. [Texto > 2 caracteres]
    if(filterSearch.length > 2) {
      const filterText = get().filterSearch.toLowerCase();
      const newFiltered = filtered.filter(country => 
        country.translations?.spa?.common.toLowerCase().includes(filterText) ||
        country.region?.toLowerCase().includes(filterText) ||
        country.subregion?.toLowerCase().includes(filterText)
      )
      filtered = newFiltered;
    } else {
      filtered = filtered;
    }

    set({
      filteredCountries: get()._sortData(get()._mapToListCountries(filtered), sortSelected),
      numResults: filtered.length,
      currentPage: 1,
    });
  },

  _mapToListCountries: (countries) => {
    const mapListContries = countries.map((country) => ({
      flag: country.flags?.png ?? '',
      name: country.translations?.spa?.common ?? country.name?.common ?? '',
      population: country.population ?? 0,
      area: country.area ?? 0,
      region: country.region ?? '',
      subregion: country.subregion ?? '',
      independent: country.independent ?? false,
      unMember: country.unMember ?? false,
    }));
    return mapListContries;
  },

  _mapCountryDetail: (country) => {
    return {
      flag: country.flag ?? '',
      flagImg: country.flags?.png ?? '',
      flagDescription: country.flags?.alt ?? '',
      name: country.translations?.spa?.common ?? country.name?.common ?? '',
      nameOfficial: country.translations?.spa?.official ?? country.name?.official ?? '',
      population: country.population ?? 0,
      area: country.area ?? 0,
      region: country.region ?? '',
      subregion: country.subregion ?? '',
      capital: country.capital?.[0] ?? "N/A",
      continents: country.continents?.[0] ?? '',
      timezones: country.timezones?.[0] ?? '',
      currency: Object.values(country.currencies ?? {})[0]?.name ?? '',
      currencySymbol: Object.values(country.currencies ?? {})[0]?.symbol ?? '',
      drivingSide: country.car?.side ?? '',
      domain: country.tld?.[0] ?? '',
      phoneCode: country.idd?.root + (country.idd?.suffixes?.[0] ?? ''),
      independent: country.independent ?? false,
      unMember: country.unMember ?? false,
      languages: country.languages ?? [],
      latlng: country.latlng,
      capitalInfo: country.capitalInfo.latlng,
      mapGoogle: country.maps?.googleMaps ?? '',
      mapOSM: country.maps?.openStreetMaps ?? '',
      borders: get()._mapBordersCounty(country) ?? [],
    }
  },

  _mapBordersCounty: (country) => {
    return country.borders?.map(borde => get().countries.find(country => country.cca3 === borde).translations?.spa?.common ?? '');
  },

  filterByRegion: (regions) => {
    set({ filterRegions: regions });
    get()._applyFilters();
  },

  filterByStatus: (status) => {
    set({ filterStatus: status });
    get()._applyFilters();
  },

  filterByText: (text) => {
    set({ filterSearch: text });
    get()._applyFilters();
  },

  sortBy: (key) =>
    set((state) => ({
      sortSelected: key,
      filteredCountries: get()._sortData(state.filteredCountries, key),
    })),

  _sortData: (data, key) => {
    return [...data].sort((a, b) => {
      const isName = key === 'name';
      const isRegion = key === 'region';

      const newA = isName ? a.name ?? '' : a[key] ?? '';
      const newB = isName ? b.name ?? '' : b[key] ?? '';
      const isString = typeof newA === 'string' && typeof newB === 'string';

      if(isRegion) {
        const regionComparison = (a.region ?? '').localeCompare(b.region ?? '');
        if (regionComparison !== 0) return regionComparison;

        return (a.name ?? '').localeCompare(b.name ?? '');
      }
      
      return isString ? newA.localeCompare(newB) : (newB || 0) - (newA || 0);
    });
  }
  
}));

export default useCountryStore;
