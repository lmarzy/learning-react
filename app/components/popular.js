import React, { Component } from 'react';
import { fetchPopularRepos } from '../utils/api';

const SelectLanguage = ({ selectedLanguage, updateLanguage }) => {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  const langItems = languages.map(lang => 
    <li 
      key={lang}
      className={lang === selectedLanguage ? 'selected' : null}
      onClick={()=>{updateLanguage(lang)}}>{lang}
    </li>
  );

  return(
    <ul className='languages'>
      {langItems}
    </ul>
  )
};

const ReposGrid = props => (
  <ul className='popular-list'>
    {props.repos.map(function (repo, index) {
      return (
        <li key={repo.name} className='popular-item'>
          <div className='popular-rank'>#{index + 1}</div>
          <ul className='space-list-items'>
            <li>
              <img
                className='avatar'
                src={repo.owner.avatar_url}
                alt={'Avatar for ' + repo.owner.login}
              />
            </li>
            <li><a href={repo.html_url}>{repo.name}</a></li>
            <li>@{repo.owner.login}</li>
            <li>{repo.stargazers_count} stars</li>
          </ul>
        </li>
      )
    })}
  </ul>
);

class Popular extends Component {
  state = {
    selectedLanguages: 'Javascript',
    repos: null
  };

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguages);
  }

  updateLanguage = lang => {
    this.setState({
      selectedLanguages: lang,
      repos: null,
    });

    fetchPopularRepos(lang)
      .then(repos => this.setState({
        repos: repos
      }));
  }

  render() {
    return (
      <div>
        <SelectLanguage selectedLanguage={this.state.selectedLanguages} updateLanguage={this.updateLanguage}/>
        {/* {JSON.stringify(this.state.repos, null, 2)} */}
        {!this.state.repos
          ? <p>Loading</p>
          : <ReposGrid repos={this.state.repos} />
        }
      </div>
    )
  }
}

export default Popular;