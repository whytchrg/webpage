
'use strict'

class Navigation extends Extend {

  constructor(options) { // name, elements, target, init
    super()

    // options
    this.client   = options.client
    this.table    = options.table
    this.request  = 'navigation'
    this.selector = options.selector
    this.elements
    this.initState = options.init

    // settings
    this.activ = 'activ'
    this.deact = this.key(4, 'css')

    this.state

  }

  init() {

    this.elements = document.getElementsByClassName(this.selector)
    const length = this.elements.length
    let a = []
    let b = []
    let c = 0

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

    // this.sendIO()
    this.setStyle()
    this.click()
  } // Navigation init

  sendIO(data = 'init') {

    const name   = this.selector
    const state  = this.state
    const date = Date.now()
    if(data != 'init')
      data = JSON.stringify(data)

    const json = JSON.stringify({
      client:  this.client,
      table:   this.table,
      request: 'navigation',
      name: name,
      url: window.location.href,
      date: date,
      state: state,
      data: data
    })

    console.log(data)

    // const target = this.target
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // target.insertAdjacentHTML('beforeend', this.responseText)
        //console.log(this.responseText)

      }
    }
    xhttp.open('POST', './request/', true)
    xhttp.setRequestHeader("Content-Type", "application/json")
    xhttp.send( json )
  } // sendIO END !!

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

        console.log(this.selector + ': ' + this.state);
        // this.sendIO(element[i].dataset)
        this.setStyle()
        let event = new CustomEvent('navi', { 'detail': this.selector })
        document.dispatchEvent(event)
      }) // EventListener END !!
    }

  } // click

} // Navigation
