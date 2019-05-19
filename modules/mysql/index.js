
'use strict'

class Mysql {

  constructor(options) {

    this.request = {
      client: options.client,
      table: 'A5',
      request: 'init'
    }

    this.data = []

  } // constructor

  async init() {

    this.request.data = []

    this.data = await this.get(this.request)

    const fire = await this.event()

    return true

  } // init

  // async getRequest(request) {
  //   const header = await {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     credentials: 'omit',
  //     body: JSON.stringify(request)
  //   }
  //   const response = await fetch('http://debruen.com/request/', header)
  //   console.log(response)
  // }

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
