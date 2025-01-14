import { Component } from 'react'

import AppList from '../app-list/app-list.jsx'
import MovieServer from '../../services/movie-services.js'
import { loadingMovie } from '../../utils/utils.js'
import { AppError } from '../app-common/app-common.jsx'

export default class AppRated extends Component {
  movieServer = new MovieServer()
  state = {
    films: [],
    total: 1,
    currentPage: 1,
    loading: false,
    error: false,
    messageError: null,
  }
  movieRating = async (page = 1) => {
    try {
      const data = await this.movieServer.getMovieRating(page)
      const resolve = loadingMovie(data.results)
      this.setState({ films: resolve, total: data.total_pages, loading: false })
    } catch (err) {
      this.setState({ loading: false, error: true })
      if (err.message === '404') {
        this.setState({ messageError: 'У вас нет оценненых фильмов' })
      } else {
        this.setState({ messageError: err.message })
      }
    }
  }

  componentDidMount() {
    this.setState({ loading: true, error: false })
    this.movieRating()
  }

  onPageChange = (page) => {
    this.setState({ currentPage: page, loading: true }, () => this.movieRating(this.state.currentPage))
  }

  render() {
    const { onAddRatingMovie } = this.props
    const { films, total, currentPage, loading, error, messageError } = this.state
    return (
      <>
        {error && <AppError messageError={messageError} />}
        <AppList
          movie={films}
          loading={loading}
          currentPage={currentPage}
          onPageChange={this.onPageChange}
          onAddRatingMovie={onAddRatingMovie}
          total={total}
        />
      </>
    )
  }
}
