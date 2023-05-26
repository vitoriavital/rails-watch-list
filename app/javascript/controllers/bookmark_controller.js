import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="bookmark"
export default class extends Controller {
  static targets = ["movie"]

  connect() {
  }

  fetch() {
    const movieId = event.currentTarget.value
    fetch(`http://localhost:3000/bookmarks/${movieId}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      const title = data.title
      const poster = data.poster_url
      const overview = data.overview
      const rating = data.rating
      this.insertMovie(title, poster, overview, rating)
    })
  }

  insertMovie(title, poster, overview, rating) {
    this.movieTarget.innerHTML = '';
    const movieTag = `<div class="d-flex justify-content-center align-items-center flex-column p-3">
      <img src="${poster}" alt="poster image" width="200">
        <div class="movie-card-infos">
          <div class="d-flex justify-content-between align-items-center w-100 p-2 m-1">
            <p>${title}</p>
            <p>${rating}<i class="fa-solid fa-star" style="color: #fec700;"></i></p>
          </div>
          <p class="p-2 m-1">${overview}</p>
        </div>
    </div>`
    console.log(movieTag)
    this.movieTarget.insertAdjacentHTML("beforeend", movieTag)
    }
  }
