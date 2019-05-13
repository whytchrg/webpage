
'use strict'

class Mysql {

  constructor(options) {

    this.request = {
      table: 'A5',
      client: 'homepage',
      request: 'init'
    }

    this.data = []

  } // constructor

  async init() {

    this.request.data = []

    this.data = await this.get(this.request)

    const event = await this.event()

    return true

  } // init

  get(request) {
    return new Promise((resolve, reject) => {

      const json = JSON.stringify(request)
      let xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

          const response = JSON.parse(JSON.parse(xhttp.responseText).data)

          resolve(response)
        }
      }
      xhttp.open("POST", "./request/", true)
      xhttp.setRequestHeader("Content-Type", "application/json")
      xhttp.send(json)

    })
  } // get

  event() {
    const event = new CustomEvent('mysql')
    document.dispatchEvent(event)
    return true
  } // event

} // Mysql
