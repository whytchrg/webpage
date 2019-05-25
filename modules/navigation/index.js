
'use strict'

class Navigation extends Extend {

  constructor(options) { // name, elements, target, init
    super()

    // options
    this.selector = options.selector
    this.elements
    this.initState = options.init

    // settings
    this.activ = 'activ'
    this.deact = this.key(4, 'css')

    this.state

  }

  init(state) {

    this.elements = document.getElementsByClassName(this.selector)
    const length = this.elements.length
    let a = []
    let b = []
    let c = 0

    if(!state) {
      if(this.initState == 'off') {
        for (let i = 0; i < this.elements.length; i++) // create ooo
          a[i] = 'o'
        this.state = a.join('') // return ooo
      }

      if(this.initState == 'random') {
        for (let i = 0; i < this.elements.length; i++) { // create random ioo
          a[i] = Math.round(Math.random()) == 1 ? 'i' : 'o'
          if (a[i] == 'i') c++
        }
        for (let i = 0; i < this.elements.length; i++) // create iii
          b[i] = 'i'
        this.state = c == 0 ? b.join('') : a.join('') // return iii if ooo
      }
    } else {
      this.state = state
    }


    this.setStyle()
    this.click()
  } // Navigation init

  setStyle() {
    const state   = this.state
    const element = this.elements

    for(let i = 0; i < element.length; i++) {
      if (element[i].style.cursor != 'pointer')
        element[i].style.cursor = 'pointer'
      if (state.charAt(i)  == 'i' && !element[i].classList.contains(this.activ)) {
        element[i].classList.add(this.activ)
        element[i].classList.remove(this.deact)
      }
      if (state.charAt(i) == 'o' && element[i].classList.contains(this.activ)) {
        element[i].classList.remove(this.activ)
        element[i].classList.add(this.deact)
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

          if(this.initState == 'off') {
            this.state = this.replaceCharAt(this.state, i, 'i')
            for (let j = 0; j < element.length; j++)
              if (j != i && this.state.charAt(j) == 'i')
                this.state = this.replaceCharAt(this.state, j, 'o')
          }

          if(this.initState == 'random') {
            this.state = this.replaceCharAt(this.state, i, 'i')
          }

        // I state
        } else if (this.state.charAt(i) == 'i') {

          if(this.initState == 'off') {
            this.state = this.replaceCharAt(this.state, i, 'o')
            for (let j = 0; j < element.length; j++)
              if (j != i && this.state.charAt(j) == 'i')
                this.state = this.replaceCharAt(this.state, j, 'o')
          }

          if(this.initState == 'random') {
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

        this.setStyle()
        let event = new CustomEvent('navigation', { 'detail': this.selector })
        document.dispatchEvent(event)
      }) // EventListener END !!
    }

  } // click

} // Navigation
