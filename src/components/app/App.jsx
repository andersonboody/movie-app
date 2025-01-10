import { Component } from 'react'
import './App.css'
import debounce from 'lodash.debounce'
import { Tabs } from 'antd'

import MovieServer from '../../services/movie-services.js'
import AppList from '../app-list/app-list.jsx'
import AppSearch from '../app-search/app-search.jsx'
import AppRated from '../app-rated/app-rated.jsx'
import { MovieServicesProvider } from '../movie-services-context/movie-services-context.jsx'
import { reductionStr } from '../../utils/utils.js'

export default class App extends Component {
  movieServer = new MovieServer()

  state = {
    activeTabKey: 'search',
    tabs: [
      { key: 'search', label: 'Search' },
      { key: 'rated', label: 'Rated' },
    ],
    data: [],
    title: '',
    loading: false,
    empty: false,
    error: false,
    errorMassage: null,
    currentPage: 1,
    total: 1,
  }

  onTabChange = (activeTab) => {
    this.setState({ activeTabKey: activeTab })
  }
  componentDidMount() {
    this.movieServer.guestSession()
  }

  componentWillUnmount() {
    this.debounceMovie.cancel()
  }

  fetchMovie = async (newTitle, page = 1) => {
    try {
      this.setState({ loading: true, empty: false })
      const results = await this.movieServer.getData(newTitle, page)
      this.loadingMovie(results)
    } catch (err) {
      this.errorMovie(err)
    }
  }

  loadingMovie = (data) => {
    if (data.results.length === 0) {
      this.setState({ empty: true })
    }
    const arrFilms = data.results.map((film) => {
      return {
        id: film.id,
        title: film.original_title,
        description: reductionStr(film.overview),
        date: film.release_date,
        rating: film.vote_average.toFixed(1),
        poster: film.poster_path,
        star: 0,
        genres: film.genre_ids,
      }
    })
    this.setState({
      data: arrFilms,
      loading: false,
      errorMassage: null,
      total: data.total_pages,
    })
  }

  errorMovie = (err) => {
    let message = err.message
    if (message.includes('Failed to fetch')) {
      message = 'Отсутствует VPN. Пожалуйста проверьте ваше подключение.'
    }
    this.setState({
      error: true,
      errorMassage: message,
      loading: false,
    })
  }
  onChangeTitle = (e) => {
    const newTitle = e.target.value
    this.setState({ title: newTitle })
    this.debounceMovie(newTitle)
  }
  debounceMovie = debounce(this.fetchMovie, 500)
  onPageChange = (page) => {
    this.setState({ currentPage: page }, () => this.fetchMovie(this.state.title, this.state.currentPage))
  }
  onAddRatingMovie = (id, rate) => {
    this.movieServer.addMovieRating(id, rate)
    this.setState(({ data }) => {
      const newData = data.map((film) => {
        if (film.id === id) {
          return { ...film, star: rate }
        }
        return film
      })
      return {
        data: newData,
      }
    })
  }

  render() {
    const { title, data, loading, empty, error, errorMassage, currentPage, tabs, activeTabKey, total } = this.state
    return (
      <MovieServicesProvider>
        <div className="container">
          <Tabs centered activeKey={activeTabKey} items={tabs} onChange={this.onTabChange} />
          {activeTabKey === 'search' ? (
            <>
              <AppSearch onChangeTitle={this.onChangeTitle} value={title} />
              <AppList
                movie={data}
                loading={loading}
                empty={empty}
                error={error}
                errorMassage={errorMassage}
                currentPage={currentPage}
                onPageChange={this.onPageChange}
                onAddRatingMovie={this.onAddRatingMovie}
                total={total}
              />
            </>
          ) : (
            <AppRated
              currentPage={currentPage}
              onPageChange={this.onPageChange}
              onAddRatingMovie={this.onAddRatingMovie}
              total={total}
            />
          )}
        </div>
      </MovieServicesProvider>
    )
  }
}
