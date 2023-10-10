// Fully working scripts.js file


import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

let page = 1;
let matches = books

const createBookPreview = () => {
    const starting = document.createDocumentFragment()

    for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
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

        starting.appendChild(element)
    }
    return starting;
}


document.querySelector('[data-list-items]').appendChild(createBookPreview())

const createGenreOptions = () => {
    const genreHtml = document.createDocumentFragment()
    const firstGenreElement = document.createElement('option')
    firstGenreElement.value = 'any'
    firstGenreElement.innerText = 'All Genres'
    genreHtml.appendChild(firstGenreElement)

    for (const [id, name] of Object.entries(genres)) {
        const element = document.createElement('option')
        element.value = id
        element.innerText = name
        genreHtml.appendChild(element)
    }
    return genreHtml;
};

document.querySelector('[data-search-genres]').appendChild(createGenreOptions())

const createAuthorOptions = () => {
    const authorsHtml = document.createDocumentFragment()
    const firstAuthorElement = document.createElement('option')
    firstAuthorElement.value = 'any'
    firstAuthorElement.innerText = 'All Authors'
    authorsHtml.appendChild(firstAuthorElement)

    for (const [id, name] of Object.entries(authors)) {
        const element = document.createElement('option')
        element.value = id
        element.innerText = name
        authorsHtml.appendChild(element)
    }
    return authorsHtml;
};

document.querySelector('[data-search-authors]').appendChild(createAuthorOptions())

const eventHandlers = {
    setTheme: () => {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.querySelector('[data-settings-theme]').value = 'night';
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
      } else {
        document.querySelector('[data-settings-theme]').value = 'day';
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
      }
    },
  
    updateListButton: () => {
      const remainingBooks = matches.length - (page * BOOKS_PER_PAGE);
      document.querySelector('[data-list-button]').innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;
      document.querySelector('[data-list-button]').disabled = remainingBooks > 0;
      document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
      `;
    },
  
    toggleSearchOverlay: () => {
      document.querySelector('[data-search-overlay]').open = !document.querySelector('[data-search-overlay]').open;
      if (document.querySelector('[data-search-overlay]').open) {
        document.querySelector('[data-search-title]').focus();
      }
    },
  
    toggleSettingsOverlay: () => {
      document.querySelector('[data-settings-overlay]').open = !document.querySelector('[data-settings-overlay]').open;
    },
  
    toggleListActive: () => {
      document.querySelector('[data-list-active]').open = !document.querySelector('[data-list-active]').open;
    },
  
    submitSettingsForm: (event) => {
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
    },
  
    submitSearchForm: (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const filters = Object.fromEntries(formData);
      const result = [];
  
      for (const book of books) {
        let genreMatch = filters.genre === 'any';
  
        for (const singleGenre of book.genres) {
          if (genreMatch) break;
          if (singleGenre === filters.genre) {
            genreMatch = true;
          }
        }
  
        if (
          (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
          (filters.author === 'any' || book.author === filters.author) &&
          genreMatch
        ) {
          result.push(book);
        }
      }
  
      page = 1;
      matches = result;
  
      if (result.length < 1) {
        document.querySelector('[data-list-message]').classList.add('list__message_show');
      } else {
        document.querySelector('[data-list-message]').classList.remove('list__message_show');
      }
  
      document.querySelector('[data-list-items]').innerHTML = '';
      const newItems = document.createDocumentFragment();
  
      for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
        const element = document.createElement('button');
        element.classList = 'preview';
        element.setAttribute('data-preview', id);
  
        element.innerHTML = `
          <img
              class="preview__image"
              src="${image}"
          />
          
          <div class="preview__info">
              <h3 class="preview__title">${title}</h3>
              <div class="preview__author">${authors[author]}</div>
          </div>
        `;
  
        newItems.appendChild(element);
      }
  
      document.querySelector('[data-list-items]').appendChild(newItems);
      eventHandlers.updateListButton();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.querySelector('[data-search-overlay]').open = false;
    },
  
    showMore: () => {
      const fragment = document.createDocumentFragment();
  
      for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        const element = document.createElement('button');
        element.classList = 'preview';
        element.setAttribute('data-preview', id);
  
        element.innerHTML = `
          <img
              class="preview__image"
              src="${image}"
          />
          
          <div class="preview__info">
              <h3 class="preview__title">${title}</h3>
              <div class="preview__author">${authors[author]}</div>
          </div>
        `;
  
        fragment.appendChild(element);
      }
  
      document.querySelector('[data-list-items]').appendChild(fragment);
      page += 1;
    },
  
    handleItemClick: (event) => {
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
    },
  };
  
  // Initial setup
  eventHandlers.setTheme();
  eventHandlers.updateListButton();
  
  // Event listeners
  document.querySelector('[data-settings-theme]').addEventListener('click', eventHandlers.setTheme);
  document.querySelector('[data-list-button]').addEventListener('click', eventHandlers.showMore);
  document.querySelector('[data-search-cancel]').addEventListener('click', eventHandlers.toggleSearchOverlay);
  document.querySelector('[data-settings-cancel]').addEventListener('click', eventHandlers.toggleSettingsOverlay);
  document.querySelector('[data-header-search]').addEventListener('click', eventHandlers.toggleSearchOverlay);
  document.querySelector('[data-header-settings]').addEventListener('click', eventHandlers.toggleSettingsOverlay);
  document.querySelector('[data-list-close]').addEventListener('click', eventHandlers.toggleListActive);
  document.querySelector('[data-settings-form]').addEventListener('submit', eventHandlers.submitSettingsForm);
  document.querySelector('[data-search-form]').addEventListener('submit', eventHandlers.submitSearchForm);
  document.querySelector('[data-list-items]').addEventListener('click', eventHandlers.handleItemClick);