$('footer>div').on('click', function() {
    let index = $(this).index()
    $('section')
        .hide()
        .eq(index)
        .fadeIn()
    $(this)
        .addClass('active')
        .siblings()
        .removeClass('active')
})
let index = 0

ajax()

$('main').scroll(function () { 
    if ($('section').eq(0).height()-10<=$('main').scrollTop()+$('main').height()) {
    ajax()
    }
 })

function ajax() {
    $.ajax({
        type: 'GET',
        url: 'http://api.douban.com/v2/movie/top250',
        data: {
            start: index,
            count:  20
        },
        dataType: 'jsonp'
    })
        .done(function (ret) {
            console.dir(ret);
            setData(ret);
            index += 20;
        })
        .fail(function () {
            console.log('error');
        });
}

function setData(data) {
    data.subjects.forEach(movie => {
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
        $node.find('.cover img').attr('src', movie.images.medium)
        $node.find('.detail h2').text(movie.title)
        $node.find('.score').text(movie.rating.average)
        $node.find('.collect').text(movie.collect_count)
        $node.find('.year').text(movie.year)
        $node.find('.type').text(movie.genres.join('/'))
        $node.find('.director').text(movie.directors[0].name)
        $node.find('.director').text(function() {
            let directorArr = []
            movie.directors.forEach(item => {
                directorArr.push(item.name)
            })
            return directorArr.join('、')
        })
        $node.find('.actor').text(function() {
            let actorArr = []
            movie.casts.forEach(item => {
                actorArr.push(item.name)
            })
            return actorArr.join('、')
        })

        $('section')
            .eq(0)
            .append($node)
    })
}
