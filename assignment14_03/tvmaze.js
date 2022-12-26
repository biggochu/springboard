"use strict";

const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $episodesList = $('#episodes-list')
const $searchForm = $("#search-form");


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.

  try {
    const response = await axios({
      url: 'http://api.tvmaze.com/search/shows',
      method: 'get',
      params: {
        q: term
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList
    .empty()
    .append(shows.map(showHtml))
}

/**
 * Generate show html element
 * @param  {Object} options.show The show object
 * @return {jQuery}              
 */
function showHtml({ show }) {
  return $(`
    <div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
      <div class="media">
        <img 
          src="${show.image.medium}" 
          alt="${show.name}" 
          class="w-25 mr-3">
        <div class="media-body">
          <h5 class="text-primary">${show.name}</h5>
          <div><small>${show.summary}</small></div>
          <button class="btn btn-outline-light btn-sm btn-primary Show-getEpisodes">
            Episodes
          </button>
        </div>
      </div>  
    </div>
  `)
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#search-query").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function(evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {
  try {
    const response = await axios({
      url: `http://api.tvmaze.com/shows/${id}/episodes`,
      method: 'get'
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

/** Write a clear docstring for this function... */

function populateEpisodes(episodes) {
  $episodesList
    .empty()
    // .append(episodes.map(episode => episodeHtml(episode)))
    .append(episodes.map(episodeHtml))

  $episodesArea.show()
}

/**
 * Generate episode html element
 * @param  {Object} episode Object describing an episode
 * @return {jQuery}         jQuery element
 */
function episodeHtml(episode) {
  return $(`
    <li>
      <div><span class="season-episode">S${padLeftZero(episode.season)}E${padLeftZero(episode.number)}</span> ${episode.name}</div>
    </li>
 `)
}

/**
 * Gather episodes data then populate episode list for specified show
 * @param  {Number} showId ID of show
 */
async function getAndDisplayEpisodes(showId) {
  const episodes = await getEpisodesOfShow(showId)
  populateEpisodes(episodes)
}

$showsList.on('click', '.Show-getEpisodes', async function(e) {
  e.preventDefault()
  const showId = e.target.parentNode.parentNode.parentNode.getAttribute('data-show-id')
  console.log(showId)

  await getAndDisplayEpisodes(showId)
})

/**
 * Pad numbers less than 10 with '0'
 * @param  {Number} n Any given number
 * @return {String}   String representation of number
 */
function padLeftZero(n) {
  if (n < 10) {
    return String(n).padStart(2, '0')
  }
  return String(n)
}