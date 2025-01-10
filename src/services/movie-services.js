export default class MovieServer {
  static pathPoster = 'https://image.tmdb.org/t/p/w300/'
  baseUrl = 'https://api.themoviedb.org/3/'
  sessionId = localStorage.getItem('sessionId')
  apiKey = '513bb2185a96d5b7e5709e20e5395b5a'

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTNiYjIxODVhOTZkNWI3ZTU3MDllMjBlNTM5NWI1YSIsIm5iZiI6MTczNTg0MjMwNS43MSwic3ViIjoiNjc3NmRhMDEwYTAwN2Q4ZWYwMTI4N2Y4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.EXalhczi09xX87pEyFniu3bZ3dbVHWV11c2mBjf8c3Q',
    },
  }

  async getData(value, page) {
    const response = await fetch(
      `${this.baseUrl}search/movie?query=${value}&include_adult=false&language=en-US&page=${page}`,
      this.options
    )
    const resolve = await response.json()
    return resolve
  }

  async guestSession() {
    const response = await fetch(`${this.baseUrl}authentication/guest_session/new`, this.options)
    const resolve = await response.json()
    localStorage.setItem('sessionId', resolve.guest_session_id)
    return resolve
  }

  async addMovieRating(id, rate) {
    const response = await fetch(
      `${this.baseUrl}movie/${id}/rating?guest_session_id=${this.sessionId}&api_key=${this.apiKey}`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: `{"value":${rate}}`,
      }
    )
    const resolve = await response.json()
    return resolve
  }

  async getMovieRating(page = 1) {
    const response = await fetch(
      `${this.baseUrl}guest_session/${this.sessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&page=${page}&sort_by=created_at.asc`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      }
    )
    const resolve = await response.json()
    return resolve
  }

  async getGenres() {
    const response = await fetch(`${this.baseUrl}genre/movie/list?language=en`, this.options)
    const resolve = await response.json()
    return resolve.genres
  }
}
