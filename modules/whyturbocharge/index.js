
'use strict'

class Whyturbocharge { // aka mysql

  constructor(options) {

    this.data = []

    this.init({
      table: 'A5',
      client: 'homepage',
      request: 'init'
    })

  }

  init(request) {

    const data = JSON.stringify(this.data)
    request.data = data
    const json = JSON.stringify(request)

    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        console.log(this.responseText)
        // const responseText = JSON.parse(this.responseText)
        //
        // const event = new CustomEvent('whyturbocharge', { 'detail': responseText })
        // document.dispatchEvent(event)
      }
    }
    xhttp.open("POST", "http://debruen.com/request/", true)
    xhttp.setRequestHeader("Content-Type", "application/json")
    xhttp.send(json)
  } // init

}
