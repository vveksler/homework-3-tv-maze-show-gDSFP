import React, { Component } from 'react';
import { getShowInfo } from '../../api';
import './Show.css';

export default class Show extends Component {
  state = {
    data: null,
    showId: ''
  };

  static getDerivedStateFromProps(props, state) {
    if (props.showId !== state.showId) {
      return {
        showId: props.showId
      };
    }

    return null;
  }

  async componentDidUpdate(prevProps) {
    if (this.state.showId !== prevProps.showId) {
      this.setState({
        data: await getShowInfo(this.state.showId)
      });
    }
  }

  createMarkup = text => {
    return { __html: text };
  };

  render() {
    const { data } = this.state;

    if (!data)
      return <p className="show-inforation t-show-info">Шоу не выбрано</p>;
    return (
      <div className="show">
        <img alt={data.name} className="show-image" src={data.image.medium} />
        <h2 className="show-label t-show-name">{data.name}</h2>
        <p className="show-text t-show-genre">
          <b>Жанр:</b>
          {data.genres.map(item => item)}
        </p>
        <p
          className="show-text t-show-summary"
          dangerouslySetInnerHTML={this.createMarkup(data.summary)}
        />
      </div>
    );
  }
}
