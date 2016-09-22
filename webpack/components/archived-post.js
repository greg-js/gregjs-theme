import { h, render, Component } from 'preact';
import formatDate from '../helpers/format-date';

const ArchivedPost = ({ postData, setFilter }) => {

  const { url, title, date, category, tags } = postData;

  return (
    <div class='archived-post'>
      <div class='archived-post-content'>
        <h2><a href={url}>{title}</a></h2>
        <div class='archived-post-metadata'>
          <div class='archived-post-metadata-category-div'>
            Category: <a class='archived-post-metadata-category-item' onClick={ () => setFilter({category}) }>{category}</a>
          </div>
          <div class='archived-post-metadata-tags-div'>
            Tags: {tags.map(tag => (
              <span>#<a class='archived-post-metadata-tags-item' onClick={ () => setFilter({tag}) }>{tag}</a> </span>
            ))}
          </div>
          <div class='archived-post-metadata-date'>
            {formatDate(date)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchivedPost;
