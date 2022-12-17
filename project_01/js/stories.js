"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  let favoriteHtml = ``
  let deleteHtml = ``

  if (currentUser) {
    if (currentUser.favoritesIds.indexOf(story.storyId) > -1) {
      favoriteHtml = `<span class="story-favorite-btn is-favorite"><i class="fas fa-star"></i></span>`
    } else {
      favoriteHtml = `<span class="story-favorite-btn"><i class="far fa-star"></i></span>`
    }

    if (currentUser.ownStoriesIds.indexOf(story.storyId) > -1) {
      deleteHtml = `<span class="story-delete-btn"><i class="fas fa-trash"></i></span>`
    }
  }

  return $(`
      <li id="${story.storyId}">
        ${favoriteHtml}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        ${deleteHtml}
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */
function putStoriesOnPage(show = true) {
  console.debug("putStoriesOnPage");

  putStoriesInList(storyList.stories, $allStoriesList, show)
}

/** Renders current user's favorite stories. */
function putFavoritesOnPage(show = true) {
  console.debug("putFavoritesOnPage")
  if (currentUser.favorites.length) {
    putStoriesInList(currentUser.favorites, $favoritesList, show)
  } else {
    $favoritesList.empty()
      .append('Apparently you have no favorite stories')
      .show()
  }
}

/**
 * Appends stories as list items to specified list element.
 * @param {Array} stories
 * @param {jQuery} $list
 */
function putStoriesInList(stories, $list, show = true) {
  console.debug("putStoriesInList")

  $list.empty()
    .append(...stories.map(story => generateStoryMarkup(story)))

  if (show)
    $list.show()
}

/**
 * Reads new story form and submits new story.
 * @param {EventObject} e
 */
async function submitNewStory(e) {
  e.preventDefault()

  console.debug("submitNewStory")

  try {
    const title = $('#new-story-title').val()
    const author = $('#new-story-author').val()
    const url = $('#new-story-url').val()

    const story = await StoryList.addStory(currentUser, { title, author, url })
    storyList.stories = [story, ...storyList.stories]
    currentUser.ownStories.push(story)
    currentUser.ownStoriesIds.push(story.storyId)
    putStoriesOnPage()
  } catch (error) {
    console.error(error)
  }
}
$newStoryForm.on('submit', submitNewStory)

/**
 * Add story to or remove story from favorites for current user.
 * @param {EventObject} e
 */
async function favoriteStoryClick(e) {
  const $btn = $(this)
  const $storyLI = $btn.parent()
  const storyId = $storyLI.attr('id')

  if (this.classList.contains('is-favorite')) {
    await currentUser.removeFavoriteStory(storyId)

    this.classList.remove('is-favorite')
    $btn.children().first()[0].classList.replace('fas', 'far')

    putFavoritesOnPage()
  } else {
    currentUser.addFavoriteStory(storyId)

    this.classList.add('is-favorite')
    $btn.children().first()[0].classList.replace('far', 'fas')
  }
}
$(document.body)
  .on('click', '.story-favorite-btn', favoriteStoryClick)
  .on('mouseover', '.story-favorite-btn', function(e) {
    this.children[0].classList.replace('far', 'fas')
  })
  .on('mouseout', '.story-favorite-btn', function(e) {
    if (!this.classList.contains('is-favorite'))
      this.children[0].classList.replace('fas', 'far')
  })

/**
 * Handle user click to delete a story
 * @param {EventObject} e
 */
async function deleteStoryClick(e) {
  const $btn = $(this)
  const $storyLI = $btn.parent()
  const storyId = $storyLI.attr('id')

  await currentUser.deleteStory(storyId)

  storyList.removeStory(storyId)

  putStoriesOnPage(false)
  putFavoritesOnPage(false)
}
$(document.body)
  .on('click', '.story-delete-btn', deleteStoryClick)