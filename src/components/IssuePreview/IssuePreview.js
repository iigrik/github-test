import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const IssuePreview = ({ id, title, url, date }) => {
  return (
    <article className="issue-preview">
      <h3 className="issue-preview__title">
        <a className="issue-preview__title-link" href={url}>
          {title}
        </a>
      </h3>
      <div className="issue-preview__id">Номер: {id}</div>
      <div className="issue-preview__date">Дата открытия: {date}</div>
    </article>
  );
};

export default IssuePreview;

IssuePreview.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
