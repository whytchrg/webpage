
'use strict'

class Navigation {

  constructor(options) {

    this.activ = 'activ'
    this.deact = Navigation.key(4, 'css')

    this.name = options.name
    this.elements = document.getElementsByClassName(options.elements)
    this.init = options.init
    this.initState() // this.state
    this.target = options.target
    this.sendIO()
    this.setStyle()
    this.click()
  }

  initState() {

    const length = this.elements.length
    let a = []
    let b = []
    let c = 0

    if(this.init == 'off') {
      for (let i = 0; i < length; i++) // create ooo
        a[i] = 'o'
      this.state = a.join('') // return ooo
    }

    if(this.init == 'random') {
      for (let i = 0; i < length; i++) { // create random ioo
        a[i] = Math.round(Math.random()) == 1 ? 'i' : 'o'
        if (a[i] == 'i') c++
      }
      for (let i = 0; i < length; i++) // create iii
        b[i] = 'i'
      this.state = c == 0 ? b.join('') : a.join('') // return iii if ooo
    }

  } // initState END !!

  sendIO(data = 'init') {

    const name   = this.name
    const state  = this.state
    const date = Date.now()
    if(data != 'init')
      data = JSON.stringify(data)

    const json = JSON.stringify({
      name: name,
      url: window.location.href,
      date: date,
      state: state,
      data: data
    })

    const target = this.target
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        target.insertAdjacentHTML('beforeend', this.responseText)
        let eventDetail
        let event = new CustomEvent('navi', { 'detail': eventDetail })
        document.dispatchEvent(event)
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
      element[i].addEventListener('click', function() {

        // O state
        if (this.state.charAt(i) == 'o') {

          if(this.init == 'off') {
            this.state = this.replaceCharAt(this.state, i, 'i')
            for (let j = 0; j < element.length; j++)
              if (j != i && this.state.charAt(j) == 'i')
                this.state = this.replaceCharAt(this.state, j, 'o')
          }

          if(this.init == 'random') {
            this.state = this.replaceCharAt(this.state, i, 'i')
          }

        // I state
        } else if (this.state.charAt(i) == 'i') {

          if(this.init == 'off') {
            this.state = this.replaceCharAt(this.state, i, 'o')
            for (let j = 0; j < element.length; j++)
              if (j != i && this.state.charAt(j) == 'i')
                this.state = this.replaceCharAt(this.state, j, 'o')
          }

          if(this.init == 'random') {
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

        console.log(this.name + ': ' + this.state);
        this.sendIO(element[i].dataset)
        this.setStyle()
      }.bind(this)); // EventListener END !!
    }

  } // click END !!

  replaceCharAt(str, i, replace) {
    return str.substring(0, i) + replace + str.substring(i + 1)
  } // replaceCharAt END !!

  static key(length, type, test) {
    let key   = ''
    let cssFirst = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let space = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-_'
    for(var i = 0; i < length; i++) {
      let array = space
      if(type == 'css' && i == 0)
        array = cssFirst
      key += array.charAt( Math.floor( Math.random() * array.length ) )
    }

    // check against test
    if(key == test)
      Navigation.key(length, test)

    return key
  } // key END !!

}
