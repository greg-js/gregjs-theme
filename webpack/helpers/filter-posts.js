export default (filters, items) => {
  return items.filter(item => {
    // tags
    if (filters.tags.length) {
      return filters.tags.every(tag => {
        return item.tags.includes(tag);
      });
    }
    return items;
  }).filter(item => {
    // categories
    if (filters.categories.length) {
      return filters.categories.some(category => {
        return item.category == category;
      });
    }
    return items;
  }).filter(item => {
    // minDate
    if (filters.minDate.length) {
      return (new Date(item.date)).getTime() >= (new Date(filters.minDate)).getTime();
    }
    return item;
  }).filter(item => {
    // maxDate
    if (filters.maxDate.length) {
      return (new Date(item.date)).getTime() <= (new Date(filters.maxDate)).getTime();
    }
    return item;
  }).filter(item => {
    // searchTerm
    if (filters.searchTerms.length) {
      return filters.searchTerms.every(term => {
        return (new RegExp(term, 'gi')).test(item.title);
      });
    }
    return item;
  });
};
