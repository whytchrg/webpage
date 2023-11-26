
'use strict'

class Display extends Extend {

    constructor(options) {
        super()

        this.size   = options.size
        this.active = options.active
    }

    loadImage(image) {
        return new Promise((res, rej) => {
            if (image.complete) {
                return res()
            }
            image.onload = () => res()
            image.onerror = () => rej(image)
        })
    }

    async getThumbSizes(data) {

        const variations = []

        variations.push(this.source + data[0].thumbnail)
        variations.push(this.source + data[0].medium)
        variations.push(this.source + data[0].display)

        this.shorts = []

        variations.forEach(async element => {
            const img = new Image()
            img.src = element
            await this.loadImage(img) // rejects after some time
            let short = img.naturalWidth
            if (img.naturalHeight < img.naturalWidth) short = img.naturalHeight
            this.shorts.push(short)
        })

        this.shorts.sort((a, b) => a - b)

        // data.forEach(async element => {
        //     data.
        // })
 

        // await this.getMeta(medium, (err, img) => {
        //     this.mediumShort = img.naturalWidth
        //     if (img.naturalHeight < img.naturalWidth) this.mediumShort = img.naturalHeight
        // })

    }

    async play(data, state) {

        data.sort((x,y) => (x.created > y.created) ? -1 : ((x.created < y.created) ? 1 : 0))

        console.log(data[0])

        await this.getThumbSizes(data)

        console.log(this.shorts)


        // console.log(state)
        const main = document.querySelector('body main')

        // console.log(main.clientWidth)

        // console.log(data.length)

        // for(let i = 0; i < data.length; i++) {
        // }

    }

}
