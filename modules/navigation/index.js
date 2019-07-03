
'use strict'

class Navigation extends Extend {

  constructor(options) {
    super()

    this.active   = options.active || 'active'
    this.selector = options.selector
    this.rule     = options.rule || 'random'
    this.url      = options.url || false

    this.history

    this.elements
    this.state

  } // constructor

  init(state) {

    this.elements = this.getElements(this.selector)

    this.state = this.getState(this.elements.length, this.rule)

    this.setStyle()
    this.click()
  } // Navigation init

  setStyle() {
    const state   = this.state
    const element = this.elements

    for(let i = 0; i < element.length; i++) {
      if (element[i].style.cursor != 'pointer')
        element[i].style.cursor = 'pointer'
      if (state.charAt(i)  == 'i' && !element[i].classList.contains(this.active)) {
        element[i].classList.add(this.active)
      }
      if (state.charAt(i) == 'o' && element[i].classList.contains(this.active)) {
        element[i].classList.remove(this.active)
      }
    }
  } // setStyle END !!

  click() {
    // const state = this.state
    const element = this.elements

    for (let i = 0; i < element.length; i++) {
      element[i].addEventListener('click', () => {

        // O state
        if (this.state.charAt(i) == 'o') {

          if(this.rule == 'off') {
            this.state = this.replaceCharAt(this.state, i, 'i')
            for (let j = 0; j < element.length; j++)
              if (j != i && this.state.charAt(j) == 'i')
                this.state = this.replaceCharAt(this.state, j, 'o')
          }

          if(this.rule == 'random') {
            this.state = this.replaceCharAt(this.state, i, 'i')
          }

        // I state
        } else if (this.state.charAt(i) == 'i') {

          if(this.rule == 'off') {
            this.state = this.replaceCharAt(this.state, i, 'o')
            for (let j = 0; j < element.length; j++)
              if (j != i && this.state.charAt(j) == 'i')
                this.state = this.replaceCharAt(this.state, j, 'o')
          }

          if(this.rule == 'random') {
            let oc = 0; // count amount of o 's
            for (let j = 0; j < element.length; j++)
              if (j != i && this.state.charAt(j) == 'o')  oc++
            for (let j = 0; j < element.length; j++) {
              if (oc == 0 ) { // If all chars i
                if (j != i && this.state.charAt(j) == 'i') this.state = this.replaceCharAt(this.state, j, 'o')
              } else if (oc == element.length-1) { // If all chars o
                if (this.state.charAt(j) == 'i') {
                  this.state = this.replaceCharAt(this.state, j, 'o')
                } else {
                  this.state = this.replaceCharAt(this.state, j, 'i')
                }
              } else {
                if (j != i) this.state = this.replaceCharAt(this.state, j, 'o')
              }
            }
          }
        }

        if(this.url) {
          let past = window.location.pathname
          if(past.includes('contact')) {
            past = this.history
          }
          let pathPart = past.split('/')
          let test = false

          for (let i = 0; i < pathPart.length; i++) {
            if(this.isState(pathPart[i], this.state.length)) {
              pathPart[i] = this.state
              test = true
            }
            if(pathPart[i] == 'contact' || pathPart[i] == '') {
              pathPart.splice(i, 1)
              i--
            }
          }
          if(!test) pathPart.push(this.state)
          const path = pathPart.join('/')
          // console.log(path)
          window.history.pushState('object or string', 'contact', path)
        }

        document.querySelector('body main').style.display = 'block'
        document.querySelector('body address').style.display = 'none'

        this.setStyle()
        let event = new CustomEvent('navigation', { 'detail': this.selector })
        document.dispatchEvent(event)
      }) // EventListener END !!
    }

  } // click

  getElements(selector) {
    return document.getElementsByClassName(selector)
  } // getElements

  getState(length, rule) {

    // get state from url
    const raw = window.location.pathname.split('/')
    let state
    for (let i = 0; i < raw.length; i++) {

      if(this.isState(raw[i],length)) state = raw[i]
    }

    // create state from rule
    if(!state) {

      if(rule === 'off') { // ooo
        state = 'o'.repeat(length)
      }

      if(rule === 'random') {
        let a = []
        let c = 0
        for (let i = 0; i < length; i++) { // create random ioo
          a[i] = Math.round(Math.random()) === 1 ? 'i' : 'o'
          if (a[i] === 'i') c++
        }
        const b = 'i'.repeat(length)
        state = c === 0 ? b : a.join('') // return iii if ooo
      }

    }

    return state
  } // getState

  isState(str, length) {
    let test = false
    if(str.length === length) {
      test = true
      for (let i = 0; i < length; i++) {
        if(str.charAt(i) !== 'i' && str.charAt(i) !== 'o') {
          test = false
        }
      }
    }
    return test
  }

  recieveHistory(path) {
    this.history = path
  } // recieveHistory

} // Navigation
