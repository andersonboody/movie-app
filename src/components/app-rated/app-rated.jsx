import { Component } from 'react'

import AppList from '../app-list/app-list.jsx'
import MovieServer from '../../services/movie-services.js'
import { loadingMovie } from '../../utils/utils.js'

export default class AppRated extends Component {
  movieServer = new MovieServer()
  state = {
    films: [],
    total: 1,
  }
  componentDidMount() {
    this.movieServer.getMovieRating().then((data) => {
      const resolve = loadingMovie(data.results)
      this.setState({ films: resolve, total: data.total_pages })
    })
  }

  render() {
    const { currentPage, onPageChange, onAddRatingMovie } = this.props
    const { films, total } = this.state
    return (
      <AppList
        movie={films}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onAddRatingMovie={onAddRatingMovie}
        total={total}
      />
    )
  }
}
