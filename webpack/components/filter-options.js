import { h, render, Component } from 'preact';
import SearchBar from './search-bar';
import formatDate from '../helpers/format-date';

const FilterOptions = ({ setFilter, tags, categories, activeFilters }) => {

  function renderActiveFilters(filters) {
    const activeTags = filters.tags.map(tag => (
      <span class='active-tag' onClick={ () => setFilter({tag}) }>{tag}</span>
    ));

    const activeCategories = filters.categories.map(category => (
      <span class='active-category' onClick={ () => setFilter({category}) }>{category}</span>
    ));

    const activeSearch = filters.searchTerms.map(searchTerm => (
      <span class='active-search' onClick={ () => setFilter({ searchTerm })}>{searchTerm}</span>
    ));

    const activeDate = <span class='active-date'>{filters.minDate.length ? formatDate(filters.minDate) : '2015-10-26'} -- {filters.maxDate.length ? formatDate(filters.maxDate) : 'now'} <small class='removeDateFilter' onClick={ () => setFilter({minDate: '', maxDate: ''}) }>clear</small></span>;


    return (!activeTags.length && !activeCategories.length && !filters.minDate.length && !filters.maxDate.length && !filters.searchTerms.length) ? null : (
      <div class='active-filters-div'>
        {!filters.searchTerms.length ? '' : <div class='active-search-div'>{activeSearch}</div>}
        {!filters.categories.length ? '' : <div class='active-cats-div'>{activeCategories}</div>}
        {!filters.tags.length ? '' : <div class='active-tags-div'>{activeTags}</div>}
        {!filters.minDate.length && !filters.maxDate.length ? '' : <div class='active-date-div'>{activeDate}</div>}
      </div>
    );
  }

  return (
    <div class='filter-options'>
      <SearchBar
        setFilter={setFilter}
        tags={tags}
        categories={categories}
        activeFilters={activeFilters}
      />
      {renderActiveFilters(activeFilters)}
    </div>
  );
};

export default FilterOptions;
