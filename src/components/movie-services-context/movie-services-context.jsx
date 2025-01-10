import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MovieServer from '../../services/movie-services'

const { Provider, Consumer } = React.createContext()

class MovieServicesProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  movieServer = new MovieServer()
  state = {
    genre: [],
  }
  componentDidMount() {
    this.movieServer.getGenres().then((data) => {
      this.setState({ genre: data })
    })
  }
  render() {
    return <Provider value={this.state.genre}>{this.props.children}</Provider>
  }
}
export { MovieServicesProvider, Consumer as MovieServerConsumer }
