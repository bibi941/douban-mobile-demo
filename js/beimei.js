{
    let view = {}

    let model = {}

    let controller = {
        init() {
            this.view = view
            this.model = model
            this.isLoading = false
            this.keyword=('.')
            this.getdata()
        },
        getdata() {
            if (this.isLoading) {
                return
            }
            this.isLoading = true
            $('.loading').show()
            $.ajax({
                type: 'GET',
                url: 'http://api.douban.com/v2/movie/us_box',
 
                dataType: 'jsonp'
            })
                .done(data => {
                    this.setdata(data)
                })
                .fail(() => {
                    console.log('没错，北美接口又挂了')
                })
                .always(() => {

                })
        },
        setdata(data) {
            data.subjects.forEach(movie=> {
                let tpl = ` <div class="item">
                <a href="#">
                    <div class="cover">
                        <img src="./img/flex-justify-content.png" alt="">
                    </div>
                    <div class="detail">
                        <h2>海贼王</h2>
                        <div class="extra">
                            <span class="score">3.4分</span>
                            <span class="collect"></span>
                            收藏
                        </div>
                        <div class="extra"><span class='year'>2008</span>/<span class='type'>动画</span></div>
                        <div class="extra">导演:<span class='director'></span></div>
                        <div class="extra">主演:<span class='actor'></span></div>
                    </div>
                </a>
            </div>`   
                let $node = $(tpl)
                $node.find('a').attr('href', movie.subject.alt)
                $node.find('.cover img').attr('src', movie.subject.images.medium)
                $node.find('.detail h2').text(movie.subject.title)
                $node.find('.score').text(movie.subject.rating.average)
                $node.find('.collect').text(movie.subject.collect_count)
                $node.find('.year').text(movie.subject.year)
                $node.find('.type').text(movie.subject.genres.join('/'))
                $node.find('.director').text(function() {
                    let directorArr = []
                    movie.subject.directors.forEach(item => {
                        directorArr.push(item.name)
                    })
                    return directorArr.join('、')
                })
                $node.find('.actor').text(function() {
                    let actorArr = []
                    movie.subject.casts.forEach(item => {
                        actorArr.push(item.name)
                    })
                    return actorArr.join('、')
                })

                $('#beimei').append($node)
            })
        },
    }
    controller.init(view, model)
}
