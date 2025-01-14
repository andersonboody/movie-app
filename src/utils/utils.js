const reductionStr = (str) => {
  let newStr = ''
  const arrStr = str.split(' ')
  if (arrStr.length <= 22) {
    return str
  } else {
    newStr = arrStr.slice(0, 22).join(' ')
  }
  return `${newStr} ... `
}
const loadingMovie = (data) => {
  const arrFilms = data.map((film) => {
    return {
      id: film.id,
      title: film.original_title,
      description: reductionStr(film.overview),
      date: film.release_date,
      rating: film.vote_average.toFixed(1),
      poster: film.poster_path,
      star: film.rating,
      genres: film.genre_ids,
    }
  })
  return arrFilms
}
export { loadingMovie }
