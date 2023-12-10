
'use strict'

class Grid {

    constructor(options) {
        this.size   = options.size
        this.table  = options.table
        this.gap    = options.gap
        this.shorts = []

        this.active = options.active

        this.container = document.querySelector('body main')
        this.container.style.display = 'grid'
        this.container.style.gap = this.gap + 'px'

        this.select = ''

        this.data = []

        this.touchstartX = 0
        this.touchendX = 0
        this.swipeDetection()
    }

    play(data, select) {

        this.data = data

        // clear the grid
        const past_articles = this.container.querySelectorAll('article')
        for(let i = 0; i < past_articles.length; i++) {
            past_articles[i].parentNode.removeChild(past_articles[i])
        }

        const container_width = this.container.clientWidth

        let columns = Math.floor(container_width / this.size)
        if(columns % 2 != 0) columns = columns - 1
        if(columns < 4) columns = 4

        const column_width = container_width / (columns)
        const row_height = column_width * Math.SQRT2
        const media_item_pos = this.get_item_area(data, columns, row_height, select)

        let rows = 0
        for (let i = 0; i < media_item_pos.length; i++) {
            if (media_item_pos[i][2] + media_item_pos[i][3] - 1 > rows) {
                rows = media_item_pos[i][2] + media_item_pos[i][3] - 1
            }
        }

        // set container styles
        this.container.style.display = 'grid'

        const column_width_percent = column_width / container_width * 100
        let colums_to_css = ''
        for(let i = 0; i < columns; i++) {
            if(i == 0) {
                colums_to_css = colums_to_css + (column_width - this.gap) + 'px'
            } else {
                colums_to_css = colums_to_css + ' ' + (column_width - this.gap) + 'px'
            }
        }

        this.container.style.gridTemplateColumns = colums_to_css

        let rows_to_css = ''
        for(let i = 0; i < rows; i++) {
            if(i == 0) {
                rows_to_css = rows_to_css + (row_height - this.gap) + 'px'
            } else {
                rows_to_css = rows_to_css + ' ' + (row_height - this.gap) + 'px'
            }
        }

        this.container.style.gridTemplateRows = rows_to_css

        let movie = ''
        // itterate over the grid
        for(let i = 0; i < data.length; i++) {

            // article
            const article = document.createElement("article")

            article.dataset.name = data[i].name
            article.dataset.type = data[i].type

            article.style.gridColumnStart = media_item_pos[i][0]
            article.style.gridColumnEnd = media_item_pos[i][0] + media_item_pos[i][1]
            article.style.gridRowStart = media_item_pos[i][2]
            article.style.gridRowEnd = media_item_pos[i][2] + media_item_pos[i][3]

            if(data[i].name == select)
                article.classList.add('display')

            // figure
            const figure = document.createElement("figure")
 
            // media
            let media = ''
            if(data[i].name == select) {
                if (data[i].type == 'video/mp4') {
                    media = document.createElement("video")
                    media.playsInline = true
                    media.src = './' + this.table + '/' + data[i].name
                    media.load()
                    var playPromise = media.play()

                    if (playPromise !== undefined) {
                        playPromise.then(_ => {
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    }
                    movie = media
                } else {
                    media = new Image()
                    media.src = './' + this.table + '/' + data[i].name
                }
            } else {
                media = new Image()
                if(data[i].size == 'A' || data[i].size == 'B') {
                    media.src = './' + this.table + '/' + data[i].medium
                } else {
                    media.src = './' + this.table + '/' + data[i].display
                }
            }
            figure.appendChild(media)

            // figcaption
            if(data[i].name == select) {
                const figcaption = document.createElement("figcaption")
                const italic = document.createElement("i")

                const date_created = new Date(parseInt(data[i].created * 1000))
                italic.innerHTML = data[i].title + ' &#160;' + this.plusNull(date_created.getDate()) + '.' + this.plusNull(date_created.getMonth() + 1) + '.' + date_created.getFullYear() + ', ' + this.plusNull(date_created.getHours()) + ':' + this.plusNull(date_created.getMinutes()) + ':' + this.plusNull(date_created.getSeconds())

                figcaption.append(italic)

                let description = this.htmlToElements(data[i].description.replace(/"/g, '').replace(/\\/g, ''))
                let des = Array.from(description);

                if(des.length > 0) {
                    let br = document.createElement('br')
                    figcaption.append(br)
                }

                for (let j = 0; j < des.length; j++) {
                    if(des[j].constructor.name == 'HTMLAnchorElement') des[j].setAttribute('target', 'a')
                    figcaption.append(des[j])
                }

                figure.appendChild(figcaption)
            }

            article.appendChild(figure)

            this.container.appendChild(article)

            media.style.width = '100%'
            media.style.height = '100%'
        }

        const articles = this.container.querySelectorAll('article')
        for(let i = 0; i < articles.length; i++)
            if(articles[i].dataset.name == select)
                articles[i].scrollIntoView({ behavior: "smooth", block: "center"})

        // setTimeout(() => {
        //     if (movie != '') {
        //         var playPromise = movie.play()
    
        //         if (playPromise !== undefined) {
        //             playPromise.then(_ => {
        //             })
        //             .catch(error => {
        //                 console.log(error)
        //             })
        //         }
        //     }            
        // }, 50);
        this.click()
    }

    click() {
        // const video = document.querySelector('video')

        // if (video) {
        //     video.oncanplaythrough = (event) => {
        //         video.play()
        //         console.log(event)
        //         console.log("I think I can play through the entire video without having to stop to buffer.")
        //     }
        // }

        const articles = this.container.querySelectorAll('article')

        for (let i = 0; i < articles.length; i++) {
            articles[i].addEventListener('click', () => {
                let select = ''
                if(articles[i].classList.contains('display')) {
                    articles[i].classList.remove('display')
                    this.stop_video(articles[i])
                } else {
                    for(let j = 0; j < articles.length; j++) {
                        if(articles[j].classList.contains('display')) {
                            articles[j].classList.remove('display')
                            this.stop_video(articles[j])
                        }
                    }
                    articles[i].classList.add('display')
                    select = articles[i].dataset.name
                }

                this.select = select
                let event = new CustomEvent('display', { 'detail': select})
                document.dispatchEvent(event)

            }, false)
        }
    }

    get_item_area(data, columns, row_height, select) {
        // create template grid
        const template_rows = []
        const media_item_number = []
        const media_item_pos = []
        for(let i = 0; i < data.length; i++) {
            const template_row = []
            for(let j = 0; j < columns; j++)
                template_row.push('X')

            template_rows.push(template_row)
            media_item_number.push(i)
            media_item_pos.push(0)
        }

        const visible_rows = Math.floor(window.innerHeight / row_height)

        let screen_relation = ''
        if(visible_rows * 2 >= columns) {
            screen_relation = 'narrow'
        } else {
            screen_relation = 'wide'
        }

        let screen_aspect = ''
        if(visible_rows >= columns) {
            screen_aspect = 'vertical'
        } else {
            screen_aspect = 'horizontal'
        }

        let columns_even = false
        if(columns % 2 == 0) {
            columns_even = true
        } 

        let rows_even = false
        if(rows_even % 2 == 0) {
            rows_even = true
        } 

        for(let y = 0; y < template_rows.length; y++) {
            for(let x = 0; x < columns; x++) {
                if(template_rows[y][x] == 'X') {
                    for(let i = 0; i < media_item_number.length; i++) {
                        if(media_item_number[i] != 'X') {
                            let width = 0
                            let height = 0
                            if(data[media_item_number[i]].name == select) {

                                if(screen_relation == 'narrow') {
                                    if (columns_even) {
                                        width = columns
                                        height = columns
                                    } else {
                                        width = columns - 1
                                        height = columns -1  
                                    }
                                    if(data[media_item_number[i]].orientation == 'landscape') {
                                        height = height / 2
                                    }
                                } else {
                                    if (rows_even) {
                                        width = visible_rows
                                        height = visible_rows
                                    } else {
                                        width = visible_rows - 1
                                        height = visible_rows -1  
                                    }
                                    if(data[media_item_number[i]].orientation == 'landscape') {
                                        width = width * 2
                                    }       
                                }  

                            }
                            else if(data[media_item_number[i]].size == 'C') {
                                if(columns > 5 && visible_rows > 5) {
                                    width = 4
                                    height = 4
                                    if(data[media_item_number[i]].orientation == 'landscape') {
                                        if(screen_relation == 'narrow') {
                                            height = 2
                                        } else {
                                            width = 8
                                        }     
                                    }
                                } else {
                                    width = 2
                                    height = 2
                                    if(data[media_item_number[i]].orientation == 'landscape') {
                                        if(screen_relation == 'narrow') {
                                            height = 1
                                        }
                                    }
                                }
                            }
                            else if(data[media_item_number[i]].size == 'B') {
                                width = 2
                                height = 2
                                if(data[media_item_number[i]].orientation == 'landscape') {
                                    if(screen_relation == 'narrow' || columns <= 5) {
                                        height = 1
                                    } else {
                                        width = 4
                                    }
                                }
                            }
                            else if(data[media_item_number[i]].size == 'A') {
                                width = 1
                                height = 1
                                if(data[media_item_number[i]].orientation == 'landscape')
                                    width = 2
                            }
                            let test = true
                            if(x + width > columns) {
                                test = false
                            } else {
                                for(let y1 = 0; y1 < height; y1++) {
                                    for(let x1 = 0; x1 < width; x1++) {
                                        if(template_rows[y + y1][x + x1] != 'X') {
                                            test = false
                                        }
                                    }
                                }
                            }
                            if(test) {
                                for(let y1 = 0; y1 < height; y1++) {
                                    for(let x1 = 0; x1 < width; x1++) {
                                        template_rows[y + y1][x + x1] = media_item_number[i]
                                    }
                                }
                                media_item_pos[media_item_number[i]] = [x + 1, width, y + 1, height]
                                media_item_number[i] = 'X'
                                break
                            }
                        }
                    }
                }
            }
        }
        return media_item_pos
    }

    checkDirection() {

        if (this.select != '') {
                
            let swipe = ''

            if (this.touchendX < this.touchstartX - 20) {
                swipe = 'right'
            } else if (this.touchendX > this.touchstartX + 20) {
                swipe = 'left'
            }

            if (swipe == 'right' || swipe == 'left') {     
                let index = -1
                for (let i = 0; i < this.data.length; i++) {
                    if (this.data[i].name == this.select) {
                        index = i
                        break;
                    }
                }

                let next_index = -1
                if (swipe == 'right') {
                    next_index = index + 1
                } else if (swipe == 'left') {
                    next_index = index - 1
                }

                if (next_index >= this.data.length) {
                    next_index = 0
                }

                if (next_index < 0) {
                    next_index = this.data.length - 1
                }

                console.log('next index: ' + this.data[next_index].name)
                this.select = this.data[next_index].name
                let event = new CustomEvent('display', { 'detail': this.select})
                document.dispatchEvent(event)
            }
        }

    }
    
    swipeDetection() {
        document.addEventListener('touchstart', e => {
            this.touchstartX = e.changedTouches[0].screenX
        })
          
        document.addEventListener('touchend', e => {
            this.touchendX = e.changedTouches[0].screenX
            this.checkDirection()
        })
    }

    stop_video(article) {
        if(article.dataset.type == 'video/mp4' && article.classList.contains('display')) {
            article.querySelector('video').pause()
        }

    }

    plusNull(a) {
        let b = a
        if(a < 10) b = '0' + a

        return b
    }

    htmlToElements(html) {
        var template = document.createElement('template')
        template.innerHTML = html
 
        return template.content.childNodes
    }

}
