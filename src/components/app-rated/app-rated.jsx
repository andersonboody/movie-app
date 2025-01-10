import { Component } from 'react'

import AppList from '../app-list/app-list.jsx'

export default class AppRated extends Component {
  state = {
    data: [
      {
        genres: [16, 12, 35, 10751],
        id: 1207831,
        title: 'Gracie & Pedro: Pets to the Rescue',
        description:
          'Family frenemies, Gracie and Pedro, must put their differences aside, embarking on a thrilling quest packed with perilous escapades in order to reunite with their owners.',
        rating: 6.7,
        poster: '/wuB4CVY3OgH4yVwj1CrS9hUYEje.jpg',
        date: '2024-05-01',
        star: 0,
      },
      {
        genres: [16, 12, 35, 10751],
        id: 1207830,
        title: 'Gracie & Pedro: Pets to the Rescue',
        description:
          'Family frenemies, Gracie and Pedro, must put their differences aside, embarking on a thrilling quest packed with perilous escapades in order to reunite with their owners.',
        rating: 6.7,
        poster: '/wuB4CVY3OgH4yVwj1CrS9hUYEje.jpg',
        date: '2024-05-01',
        star: 0,
      },
    ],
  }

  render() {
    const { currentPage, onPageChange, onAddRatingMovie, total } = this.props
    return (
      <AppList
        movie={this.state.data}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onAddRatingMovie={onAddRatingMovie}
        total={total}
      />
    )
  }
}
