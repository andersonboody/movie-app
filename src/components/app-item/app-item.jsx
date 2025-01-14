import { Component } from 'react'
import './app-item.css'
import { Rate } from 'antd'
import { parseISO, format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import PropTypes from 'prop-types'

import MovieServer from '../../services/movie-services'

import icon from './icon.png'

export default class AppItem extends Component {
  static propTypes = {
    data: PropTypes.array,
    onAddRatingMovie: PropTypes.func,
    genre: PropTypes.array,
  }
  getRatingStyle = (rating) => {
    if (rating < 3) {
      return 'film-content__rating-red'
    } else if (rating >= 3 && rating < 5) {
      return 'film-content__rating-orange'
    } else if (rating >= 5 && rating < 7) {
      return 'film-content__rating-yellow'
    } else {
      return 'film-content__rating-green'
    }
  }
  getGenreName = (genres) => {
    if (genres.length === 0) return ['Жанр отсутствет']
    const { genre } = this.props

    const nameGenre = genres.map((id) => {
      if (genre.find((g) => g.id === id)) {
        return genre.find((g) => g.id === id).name
      }
    })
    return nameGenre
  }

  render() {
    const { data, onAddRatingMovie } = this.props
    return (
      <div className="films-list">
        {data.map((film) => {
          return (
            <article className="film" key={film.id}>
              {film.poster === null ? (
                <img src={icon} alt="image" className="films__image" />
              ) : (
                <img src={`${MovieServer.pathPoster}${film.poster}`} alt="image" className="films__image" />
              )}
              <div className="film-content">
                <div className="film-content__header">
                  <h3 className="film-content__title">{film.title}</h3>
                  <p className={`film-content__rating ${this.getRatingStyle(film.rating)}`}>{film.rating}</p>
                </div>
                <p className="film-content__date">
                  {film.date ? format(parseISO(film.date), 'LLLL d, yyyy', { locale: enUS }) : 'Дата не указана'}
                </p>
                <div className="film-content__genre-list">
                  {this.getGenreName(film.genres).map((el) => {
                    return (
                      <a className="film-content__genre-item" key={el}>
                        {el}
                      </a>
                    )
                  })}
                </div>
                <p className="film-content__description">{film.description}</p>
                <Rate
                  className="film-content__star"
                  allowHalf
                  defaultValue={0}
                  count={10}
                  value={film.star || 0}
                  onChange={(rate) => onAddRatingMovie(film.id, rate)}
                />
              </div>
            </article>
          )
        })}
      </div>
    )
  }
}
