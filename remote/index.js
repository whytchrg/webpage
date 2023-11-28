window.onload = async (event) => {

    const options = {
        client: 'homepage',
        table: 'A5',
        size: 80,
        gap: 2,
        limit: 36
    }

    const html = new Html()
    await html.init()

    const mysql = new Mysql({
        client: options.client,
        table:  options.table
    })

    const data = await mysql.init()
    console.log(data)

    const category = new Navigation({
        selector: 'category',
        rule:     'random',
        url:      true,
        active:   html.active
    })

    const color = new Navigation({
        selector: 'color',
        rule:     'random',
        url:      true,
        active:   html.active
    })

    const display = new Display({
        table:  options.table,
        size:   options.size,
        gap:    options.gap,
        active: html.active
    })

    // let category_state = category.init()
    // let color_state    = color.init()

    await Promise.all([category.init(), color.init()])

    const algorithm = new Algorithm({
        limit: options.limit
    })

    const overview = async () => {
        const filtered_data = await algorithm.evaluate(data, category.state, color.state)

        console.log(category.state)
        console.log(color.state)

        console.log(filtered_data)
        display.play(filtered_data)

        return true
    }

    listener = () => {

        document.addEventListener('navigation', (event) => {
            if(event.detail === 'category' || event.detail === 'color') {
                // this.block.state = false
                overview()
            }
        })

        // document.addEventListener('mysql', (event) => {
        //     this.overview()
        // })

        // document.addEventListener('views', (event) => {
        //     if(!event.detail.active) {
        //         this.mysql.views(event.detail.name)
        //     }
        // })

        // document.addEventListener('seen', (event) => {
        //     console.log(event.detail.names)
        //     this.mysql.seen(event.detail.names)
        // })

        document.addEventListener('address', (event) => {
            if(event.detail === false) {
                overview()
            } else {
                category.recieveHistory(html.navigationState)
                color.recieveHistory(html.navigationState)
            }
        })

        window.addEventListener('popstate', (event) => {
            // The popstate event is fired each time when the current history entry changes.
            category_state = category.init()
            color_state    = color.init()
            overview()
        }, false)

        return true
    } // listener

    overview()

    listener()

}