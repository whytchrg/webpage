
class Commissioned {

  constructor(options) {

    this.link

  }

  init() {

    this.link = document.getElementById('commissioned')

    return true
  } // evaluate

  click(article) {

    this.link.addEventListener('click', () => {

      let event = new CustomEvent('commissioned')
      document.dispatchEvent(event)
    })

  } // click


} // Display

module.exports = Commissioned
