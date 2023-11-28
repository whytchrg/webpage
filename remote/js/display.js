
'use strict'

class Display extends Extend {

    constructor(options) {
        super()

        this.size   = options.size
        this.table  = options.table
        this.gap    = options.gap
        this.shorts = []

        this.active = options.active
    }

    check_template(data, colums, x, y, width, height) {
        let test = true
        if(x + width > colums) {
            test = false
        } else {
            for(let y1 = 0; y1 < height; y1++) {
                for(let x1 = 0; x1 < width; x1++) {
                    if(data[y + y1][x + x1] != 'X') {
                        test = false
                    }
                }
            }
        }
        return test
    }

    get_item_settings(data, columns) {
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

        for(let y = 0; y < template_rows.length; y++) {
            for(let x = 0; x < columns; x++) {
                if(template_rows[y][x] == 'X') {
                    for(let i = 0; i < data.length; i++) {
                        if(media_item_number[i] != 'X') {
                            let width = 0
                            let height = 0
                            if(data[media_item_number[i]].size == 'C') {
                                if(data[media_item_number[i]].orientation == 'portrait') {
                                    width = 4
                                    height = 4
                                } else {
                                    width = 4
                                    height = 2
                                }
                            }
                            else if(data[media_item_number[i]].size == 'B') {
                                if(data[media_item_number[i]].orientation == 'portrait') {
                                    width = 2
                                    height = 2
                                } else {
                                    width = 2
                                    height = 1
                                }
                            }
                            else if(data[media_item_number[i]].size == 'A') {
                                if(data[media_item_number[i]].orientation == 'portrait') {
                                    width = 1
                                    height = 1
                                } else {
                                    width = 2
                                    height = 1
                                }
                            }
                            if(this.check_template(template_rows, columns, x, y, width, height)) {
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

    play(data) {

        // get container
        const container = document.querySelector('body main')
  
        // clear grid container
        const past_articles = container.querySelectorAll('article')
        for(let i = 0; i < past_articles.length; i++)
            past_articles[i].parentNode.removeChild(past_articles[i])

        const container_width = container.clientWidth

        let columns = Math.floor(container_width / this.size)

        if(columns < 4)
            columns = 4

        const column_width = container_width / (columns)

        const row_height = column_width * Math.SQRT2
    
        const media_item_pos = this.get_item_settings(data, columns)

        let rows = 0
        for (let i = 0; i < media_item_pos.length; i++) {
            if (media_item_pos[i][2] + media_item_pos[i][3] - 1 > rows) {
                rows = media_item_pos[i][2] + media_item_pos[i][3] - 1
            }
        }

        // set container styles
        container.style.display = 'grid'
        container.style.gap = this.gap + 'px'
        const column_width_percent = column_width / container_width * 100
        let colums_to_css = ''
        for(let i = 0; i < columns; i++) {
            if(i == 0) {
                colums_to_css = colums_to_css + (column_width - this.gap) + 'px'
            } else {
                colums_to_css = colums_to_css + ' ' + (column_width - this.gap) + 'px'
            }
        }
        
        console.log(colums_to_css)

        container.style.gridTemplateColumns = colums_to_css

        const row_height_percent = column_width_percent * Math.SQRT2
        let rows_to_css = ''
        for(let i = 0; i < rows; i++) {
            if(i == 0) {
                rows_to_css = rows_to_css + (row_height - this.gap) + 'px'
            } else {
                rows_to_css = rows_to_css + ' ' + (row_height - this.gap) + 'px'
            }
        }

        console.log(rows_to_css)

        container.style.gridTemplateRows = rows_to_css

        // itterate over the grid
        for(let i = 0; i < data.length; i++) {
            let media

            if(data[i].size == 'A' || data[i].size == 'B' || data[i].size == 'C') {
                media = new Image()
            }

            if(data[i].size == 'A' || data[i].size == 'B') {
                media.src = './' + this.table + '/' + data[i].medium
            } else {
                media.src = './' + this.table + '/' + data[i].display
            }

            const figure = document.createElement("figure")
            figure.appendChild(media)

            const article = document.createElement("article")
            article.style.gridColumnStart = media_item_pos[i][0]
            article.style.gridColumnEnd = media_item_pos[i][0] + media_item_pos[i][1]
            article.style.gridRowStart = media_item_pos[i][2]
            article.style.gridRowEnd = media_item_pos[i][2] + media_item_pos[i][3]
            article.appendChild(figure)

            container.appendChild(article)

            media.style.width = '100%'
            media.style.height = '100%'
            
        }

    }

}
