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

  if (currentUser) {
    if (currentUser.favoritesIds.indexOf(story.storyId) > -1) {
      favoriteHtml = `<span class="story-favorite-btn is-favorite"><i class="fas fa-star"></i></span>`
    } else {
      favoriteHtml = `<span class="story-favorite-btn"><i class="far fa-star"></i></span>`
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
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function submitNewStory(e) {
  e.preventDefault()

  console.debug("submitNewStory")

  try {
    const title = $('#new-story-title').val()
    const author = $('#new-story-author').val()
    const url = $('#new-story-url').val()

    const story = await storyList.addStory(currentUser, { title, author, url })
    storyList.stories = [story, ...storyList.stories]
    putStoriesOnPage()
  } catch (error) {
    console.error(error)
  }
}
$newStoryForm.on('submit', submitNewStory)

function favoriteStoryClick(e) {
  const $btn = $(this)
  const $storyLI = $btn.parent()
  const storyId = $storyLI.attr('id')

  if (this.classList.contains('is-favorite')) {
    currentUser.removeFavoriteStory(storyId)

    this.classList.remove('is-favorite')
    $btn.children().first()[0].classList.replace('fas', 'far')
  } else {
    currentUser.addFavoriteStory(storyId)

    this.classList.add('is-favorite')
    $btn.children().first()[0].classList.replace('far', 'fas')
  }
}
$(document.body).on('click', '.story-favorite-btn', favoriteStoryClick)

$(document.body).on('mouseover', '.story-favorite-btn', function(e) {
  $(this).children().first()[0].classList.replace('far', 'fas')
})
$(document.body).on('mouseout', '.story-favorite-btn', function(e) {
  if (!this.classList.contains('is-favorite'))
    $(this).children().first()[0].classList.replace('fas', 'far')
})