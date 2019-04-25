
'use strict'

class Mysql { // aka mysql

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
        this.data = JSON.parse(this.responseText).data
        console.log(this.data[0])
        // const responseText = JSON.parse(this.responseText)
        //
        // const event = new CustomEvent('mysql', { 'detail': responseText })
        // document.dispatchEvent(event)
      }
    }
    xhttp.open("POST", "../request/", true)
    xhttp.setRequestHeader("Content-Type", "application/json")
    xhttp.send(json)
  } // init

}
