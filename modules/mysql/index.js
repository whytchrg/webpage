
'use strict'

class Mysql {

  constructor(options) {

    this.init({
      table: 'A5',
      client: 'homepage',
      request: 'init'
    })
  }

  init(request) {

    const data = []
    request.data = data
    const json = JSON.stringify(request)

    // console.log(json)

    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        const responseText = JSON.parse(JSON.parse(xhttp.responseText).data)

        const event = new CustomEvent('mysql', { 'detail': responseText })
        document.dispatchEvent(event)
      }
    }
    xhttp.open("POST", "../request/", true)
    xhttp.setRequestHeader("Content-Type", "application/json")
    xhttp.send(json)
  } // init

}
