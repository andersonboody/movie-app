import { Component } from 'react'
import PropTypes from 'prop-types'

import AppItem from '../app-item/app-item'
import AppPagination from '../app-pagination/app-pagination'
import { AppError, AppSpin, AppNoFilms } from '../app-common/app-common'
import { MovieServerConsumer } from '../movie-services-context/movie-services-context'

export default class AppList extends Component {
  static propTypes = {
    movie: PropTypes.array,
    loading: PropTypes.bool,
    empty: PropTypes.bool,
    error: PropTypes.bool,
    errorMassage: PropTypes.string,
    currentPage: PropTypes.number,
    onPageChange: PropTypes.func,
    total: PropTypes.number,
    onAddRatingMovie: PropTypes.func,
  }

  render() {
    const { movie, loading, empty, error, errorMassage, currentPage, onPageChange, onAddRatingMovie, total } =
      this.props

    const hasData = !(loading || error) && movie.length > 0

    return (
      <>
        {error && <AppError messageError={errorMassage} />}
        {loading && <AppSpin />}
        {hasData && (
          <>
            <MovieServerConsumer>
              {(genre) => <AppItem data={movie} onAddRatingMovie={onAddRatingMovie} genre={genre} />}
            </MovieServerConsumer>
            <AppPagination currentPage={currentPage} onPageChange={onPageChange} total={total} />
          </>
        )}
        {!(loading || error) && empty && <AppNoFilms />}
      </>
    )
  }
}
