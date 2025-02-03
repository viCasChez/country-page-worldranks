import { create } from 'zustand';

const useCountryStore = create((set, get) => ({
  countries: [],
  filteredCountries: [],
  isLoading: true,
  error: null,
  sortSelected: 'population',
  numResults: 0,
  allRegions: ['Americas', 'Antarctic', 'Africa', 'Asia', 'Europe', 'Oceania'],
  filterRegions: [],
  filterStatus: [],

  setCountries: (data) =>
    set({
      countries: data,
      numResults: data.length,
      filteredCountries: get()._sortData(get()._mapToListCountries(data), get().sortSelected),
      isLoading: false,
    }),

  setError: (error) => set({ error, isLoading: false }),

  _applyFilters: () => {
    const { countries, filterRegions, filterStatus, sortSelected } = get();

    let filtered = filterRegions.length
      ? countries.filter((country) => filterRegions.includes(country.region))
      : countries;

    if (filterStatus.length) {
      filtered = filtered.filter((country) =>
        filterStatus.some((key) => {
          if (key === 'independent') return country.independent;
          if (key === 'unitedNation') return country.unMember;
          return false;
        })
      );
    }

    set({
      filteredCountries: get()._sortData(filtered, sortSelected),
      numResults: filtered.length,
    });
  },

  _mapToListCountries: (countries) => {
    const mapListContries = countries.map((country) => ({
      flag: country.flags?.png ?? '',
      name: country.translations?.spa?.common ?? country.name?.common ?? '',
      population: country.population ?? 0,
      area: country.area ?? 0,
      region: country.region ?? '',
      independent: country.independent ?? false,
      unMember: country.unMember ?? false,
    }));
    return mapListContries;
  },

  filterByRegion: (regions) => {
    set({ filterRegions: regions });
    get()._applyFilters();
  },

  filterByStatus: (status) => {
    set({ filterStatus: status });
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
