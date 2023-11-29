window.onload = () => {

    const options = {
        client: 'homepage',
        table: 'A5',
        size: 80,
        gap: 2,
        limit: 36
    }

    const id = new ID()

    const get = new Get({
        client: options.client,
        table:  options.table
    })

    const category = new Navigation({
        selector: 'category',
        rule:     'random',
        url:      true,
        active:   id.active
    })

    const color = new Navigation({
        selector: 'color',
        rule:     'random',
        url:      true,
        active:   id.active
    })

    const filter = new Filter({
        limit: options.limit
    })

    const grid = new Grid({
        table:  options.table,
        size:   options.size,
        gap:    options.gap,
        active: id.active
    })

    const overview = async () => {
        const filtered_data = await filter.evaluate(get.data, category.state, color.state)

        console.log(get.data)

        console.log(category.state)
        console.log(color.state)

        console.log(filtered_data)
        grid.play(filtered_data)

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
        //         this.get.views(event.detail.name)
        //     }
        // })

        // document.addEventListener('seen', (event) => {
        //     console.log(event.detail.names)
        //     this.get.seen(event.detail.names)
        // })

        document.addEventListener('address', (event) => {
            if(event.detail === false) {
                overview()
            } else {
                category.recieveHistory(id.navigationState)
                color.recieveHistory(id.navigationState)
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

    const main = async () => {

        await id.init()
        await Promise.all([get.init(), category.init(), color.init()])

        overview()

        listener()

    }

    main()
}