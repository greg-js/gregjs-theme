import { h, render, Component } from 'preact';

const ArchivedPost = ({ postData, setFilter }) => {

  const { url, title, date, category, tags } = postData;

  function formatDate(ISOdate) {
    const date = new Date(ISOdate);
    const unpaddedMonth = date.getMonth() + 1;
    const month = (unpaddedMonth < 10) ? `0${unpaddedMonth}` : unpaddedMonth;
    const unpaddedDay = date.getDate();
    const day = (unpaddedDay < 10) ? `0${unpaddedDay}` : unpaddedDay;

    return `${date.getFullYear()}-${month}-${day}`;
  }

  return (
    <div class='archived-post'>
      <h2><a href={url}>{title}</a></h2>
      <div class='archived-post-metadata'>
        <div class='archived-post-metadata-date'>
          {formatDate(date)}
        </div>
        <div class='archived-post-metadata-category-div'>
          Category: <a class='archived-post-metadata-category-item' onClick={ () => setFilter({category}) }>{category}</a>
        </div>
        <div class='archived-post-metadata-tags-div'>
        Tags: {tags.map(tag => (
          <span>#<a class='archived-post-metadata-tags-item' onClick={ () => setFilter({tag}) }>{tag}</a> </span>
        ))}
        </div>
      </div>
    </div>
  );
};

export default ArchivedPost;
