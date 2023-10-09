// Fully working scripts.js file

import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

let page = 1;
let matches = books

function createBookPreview({ author, id, image, title }) {
  const element = document.createElement('button')
  element.classList = 'preview'
  element.setAttribute('data-preview', id)

  element.innerHTML = `
    <img
      class="preview__image"
      src="${image}"
    />
    
    <div class="preview__info">
      <h3 class="preview__title">${title}</h3>
      <div class="preview__author">${authors[author]}</div>
    </div>
  `

  return element;
}

function updateListButtonState() {
  const listButton = document.querySelector('[data-list-button]');
  const remaining = matches.length - (page * BOOKS_PER_PAGE);
  listButton.innerText = `Show more (${remaining})`;
  listButton.disabled = remaining <= 0;
}

function renderBookPreviews(start, end) {
  const newItems = document.createDocumentFragment();

  for (const book of matches.slice(start, end)) {
    const element = createBookPreview(book);
    newItems.appendChild(element);
  }

  document.querySelector('[data-list-items]').appendChild(newItems);
}

function searchBooks(filters) {
  const result = [];

  for (const book of books) {
    let genreMatch = filters.genre === 'any';

    for (const singleGenre of book.genres) {
      if (genreMatch) break;
      if (singleGenre === filters.genre) { genreMatch = true; }
    }

    if (
      (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === 'any' || book.author === filters.author) &&
      genreMatch
    ) {
      result.push(book);
    }
  }

  return result;
}

function updateList() {
  page = 1;
  const filters = {
    genre: document.querySelector('[data-search-genres]').value,
    title: document.querySelector('[data-search-title]').value,
    author: document.querySelector('[data-search-authors]').value,
  };

  matches = searchBooks(filters);

  if (matches.length < 1) {
    document.querySelector('[data-list-message]').classList.add('list__message_show');
  } else {
    document.querySelector('[data-list-message]').classList.remove('list__message_show');
  }

  document.querySelector('[data-list-items]').innerHTML = '';
  renderBookPreviews(0, BOOKS_PER_PAGE);
  updateListButtonState();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.querySelector('[data-search-overlay]').open = false;
}

function loadMoreBooks() {
  const start = page * BOOKS_PER_PAGE;
  const end = (page + 1) * BOOKS_PER_PAGE;
  renderBookPreviews(start, end);
  page += 1;
  updateListButtonState();
}

function openBookDetails(event) {
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  for (const node of pathArray) {
    if (active) break;

    if (node?.dataset?.preview) {
      let result = null;

      for (const singleBook of books) {
        if (result) break;
        if (singleBook.id === node?.dataset?.preview) result = singleBook;
      }

      active = result;
    }
  }

  if (active) {
    document.querySelector('[data-list-active]').open = true;
    document.querySelector('[data-list-blur]').src = active.image;
    document.querySelector('[data-list-image]').src = active.image;
    document.querySelector('[data-list-title]').innerText = active.title;
    document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
    document.querySelector('[data-list-description]').innerText = active.description;
  }
}

document.querySelector('[data-list-items]').addEventListener('click', openBookDetails);

document.querySelector('[data-list-button]').addEventListener('click', loadMoreBooks);

document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
  event.preventDefault();
  updateList();
});

document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);

  if (theme === 'night') {
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
  } else {
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
  }

  document.querySelector('[data-settings-overlay]').open = false;
});

document.querySelector('[data-header-settings]').addEventListener('click', () => {
  document.querySelector('[data-settings-overlay]').open = true;
});

document.querySelector('[data-header-search]').addEventListener('click', () => {
  document.querySelector('[data-search-overlay]').open = true;
  document.querySelector('[data-search-title]').focus();
});

document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
  document.querySelector('[data-settings-overlay]').open = false;
});

document.querySelector('[data-search-cancel]').addEventListener('click', () => {
  document.querySelector('[data-search-overlay]').open = false;
});

// Initial setup
const genreHtml = document.createDocumentFragment();
const firstGenreElement = document.createElement('option');
firstGenreElement.value = 'any';
firstGenreElement.innerText = 'All Genres';
genreHtml.appendChild(firstGenreElement);

for (const [id, name] of Object.entries(genres)) {
  const element = document.createElement('option');
  element.value = id;
  element.innerText = name;
  genreHtml.appendChild(element);
}

document.querySelector('[data-search-genres]').appendChild(genreHtml);

const authorsHtml = document.createDocumentFragment();
const firstAuthorElement = document.createElement('option');
firstAuthorElement.value = 'any';
firstAuthorElement.innerText = 'All Authors';
authorsHtml.appendChild(firstAuthorElement);

for (const [id, name] of Object.entries(authors)) {
  const element = document.createElement('option');
  element.value = id;
  element.innerText = name;
  authorsHtml.appendChild(element);
}

document.querySelector('[data-search-authors]').appendChild(authorsHtml);

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.querySelector('[data-settings-theme]').value = 'night';
  document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
  document.documentElement.style.setProperty('--color-light', '10, 10, 20');
} else {
  document.querySelector('[data-settings-theme]').value = 'day';
  document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
  document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}

updateList();