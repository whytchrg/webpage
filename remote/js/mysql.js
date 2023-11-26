
'use strict'

class Mysql {

    constructor(options) {
        this.message = {
            client: options.client,
            table: options.table,
        }
    } // constructor

    async init() {
        this.message.request = 'init'
        const data = await this.request(this.message)
        // const data = await this.process(request)
        data.sort((x,y) => (x.created > y.created) ? -1 : ((x.created < y.created) ? 1 : 0))
        return data
    } // init

    async views(name) {
        this.message.request = 'views'
        this.message.name    = name
        this.message.cTime   = new Date().getTime()

        return await this.request(this.message) // = true
    }

    async seen(names) {
        this.message.request = 'seen'
        this.message.names = JSON.stringify(names)
        this.message.cTime = new Date().getTime()

        return await this.request(this.message) // = true
    }

    // async process(data) {
    //     data.sort((x,y) => (x.created > y.created) ? -1 : ((x.created < y.created) ? 1 : 0))
    //     return data
    // } // process

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
            xhttp.open("POST", "./request.php", true)
            xhttp.setRequestHeader("Content-Type", "application/json")
            xhttp.send(json)
        })
    } // request

    // event() {
    //     const event = new CustomEvent('mysql')
    //     document.dispatchEvent(event)
    //     return true
    // }

}
