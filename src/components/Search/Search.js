import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../TextField/index';
import './styles.scss';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      repository: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { handleSubmit } = this.props;
    const { user, repository } = this.state;
    handleSubmit(user, repository);
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { user, repository } = this.state;
    return (
      <form className="search" onSubmit={this.handleSubmit}>
        <div className="search__text-field">
          <TextField id="user" name="user" value={user} type="text" label="Имя пользователя" isRequired onChange={this.handleInputChange} />
        </div>
        <div className="search__text-field">
          <TextField id="repository" name="repository" value={repository} type="text" label="Название репозитория" isRequired onChange={this.handleInputChange} />
        </div>
        <button className="search__search-button" type="submit">Поиск</button>
      </form>
    );
  }
}

Search.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
