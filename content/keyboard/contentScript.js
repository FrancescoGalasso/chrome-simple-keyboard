import {
  setLanguageLayout,
  setupKeyboard
} from './keyboardScript'

function setup() {
  chrome.storage.sync.get({
    language: 'english',
  }).then(item => {
    setLanguageLayout(item.language)
  });
  setupKeyboard()
}

setup()
