
'use strict'

class Mysql { // aka mysql

  constructor(options) {

    this.init({
      table: 'A5',
      client: 'homepage',
      request: 'init'
    })

  }

  init(request) {

    const data = []
    request.data = JSON.stringify(data)
    const json = JSON.stringify(request)

    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4) {
        const responseText = JSON.parse(xhttp.responseText).data
        // console.log(responseText)

        const event = new CustomEvent('mysql', { 'detail': responseText })
        document.dispatchEvent(event)
      }
    }
    xhttp.open("POST", "../request/", true)
    xhttp.setRequestHeader("Content-Type", "application/json")
    xhttp.send(json)
  } // init

}
