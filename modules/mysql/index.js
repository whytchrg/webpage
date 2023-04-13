
'use strict'

class Mysql {

  constructor(options) {

    this.message = {
      client: options.client,
      table: options.table,
      request: 'init'
    }

    this.data = []

  } // constructor

  async init() {

    this.message.data = []

    const request = await this.request(this.message)

    this.data = await this.process(request)

    return true

  } // init

  async views(name) {

    this.message.request  = 'views'
    this.message.name = name
    this.message.cTime    = new Date().getTime()

    const views = await this.request(this.message)

    return views // true
  } // views

  process(request) {

    request.sort((x,y) => (x.created > y.created) ? -1 : ((x.created < y.created) ? 1 : 0))

    for(let i = 0; i < request.length; i++) {

      // Views
      let views = []
      if(typeof request[i].views === 'string') {
        const rawArray = request[i].views.split(';')

        for(let j = 0; j < rawArray.length; j++) {
          if(rawArray[j].includes('server')){
            let view = JSON.parse(rawArray[j])
            view.client = Math.floor(view.client / 1000)
            view.server = parseInt(view.server, 10)
            views.push(view)
          }
        }
      }
      request[i].views = views

    //   // Flickr views
    //   let flickrViews = []
    //   if(typeof request[i].views_flickr === 'string') {
    //     flickrViews = JSON.parse(request[i].views_flickr)
    //   }
    //   request[i].views_flickr = flickrViews

    // //   request[i].created = Math.floor(request[i].created / 1000)
    // //   const str = request[i].keywords.replace(/(^|[^\\])(\\\\)*\\$/, "$&\\");

    // //   request[i].keywords = JSON.parse(str);

    //   // console.log(request[i].filename + '  ' + request[i].views.length)
    //   // for(let j = 0; j < request[i].views.length; j++) {
    //   //   console.log(request[i].views[j])
    //   // }
    }


    return request
  } // process

  request(request) {
    return new Promise((resolve, reject) => {

      const json = JSON.stringify(request)
      let xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

          const response = JSON.parse(JSON.parse(xhttp.responseText).data)

          resolve(response)
        }
      }
      xhttp.open("POST", "./request.php", true) // change url here 
      xhttp.setRequestHeader("Content-Type", "application/json")
      xhttp.send(json)
    })
  } // request

  event() {
    const event = new CustomEvent('mysql')
    document.dispatchEvent(event)
    return true
  } // event

} // Mysql

module.exports = Mysql
