function lol () {
    var vid = document.getElementById("myVideo");
    alert(vid.currentTime);
}
var base = document.location.search
var id = (base.slice(16))
var type = (base.slice(6,12))
if(type != 'person'){
    id = (base.slice(4))
}
function getTimeFromMins(mins) { //конвертируем минуты в часы
    let hours = Math.trunc(mins/60);
	let minutes = mins % 60;
	return hours + 'ч. ' + minutes + 'м.';
};
var AcToken = localStorage.getItem('auth')
var RefToken = localStorage.getItem('refresh')
var idU = localStorage.getItem('id')
window.onload = function onload(){
    if(((AcToken != null) || (AcToken != undefined))) {
        userImg()
      }else{
        document.getElementById("add_w").innerHTML = ' <button id="add" onclick="popup()" class="add">    <img class="search-icon" src="/img/add.svg" alt="Add  to my list">         Add to my list'  
        document.getElementById('del').style.display = 'none'
         
      }
      if(type != 'person'){
          getAnime()
          getRoles()
      }else{
       getPerson()
       document.querySelector('.roles').style.display = 'none'
      }
      rand()
}
function getRoles(){
    const authURL = `https://shikimori.one/api/animes/${id}/roles`
    function sendAuth(method, url, authData = null){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open(method, url)
            xhr.responseType = 'json'
            var parseAcToken = JSON.parse(AcToken);
            if(parseAcToken != null){
                xhr.setRequestHeader('Authorization', `Bearer ${parseAcToken}`)
            }
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onload = () => {
                if(xhr.status >= 400){
                    getPerson()
                } else {
                    resolve(xhr.response)
                }
            }
            xhr.onerror = () => {
                resolve(xhr.response)
            }
            xhr.send(JSON.stringify(authData))
        })
    }
    sendAuth('GET', authURL)
    .then (function (data){  
        console.log(data) 
        var max = Math.max(data.length) 
        var min = max - 4
        if(id === '339'){
            for (let i = min; i < max; i++) {
                let test = document.getElementById('roles')
                let div = document.createElement('div');
                div.innerHTML = `
                <div class="roles_card">
                <a class='name_anime' href="/more/?type=person&id=${data[i].character.id}"><img  class="role_img" src="https://ichip.ru/images/cache/2021/5/5/fit_930_519_false_crop_1031_580_32_0_q90_475142_ff21c95639dc76f6ee0d3eea5.jpeg"></a>
                <a class='name_anime' href='/more/?type=person&id=${data[i].character.id}'>${data[i].character.russian}</a>
                </div>            
                `
                test.append(div)
            }
        }else{
            for (let i = min; i < max; i++) {
                let test = document.getElementById('roles')
                let div = document.createElement('div');
                div.innerHTML = `
                <div class="roles_card">
                <a class='name_anime' href="/more/?type=person&id=${data[i].character.id}"><img  class="role_img" src="https://shikimori.one${data[i].character.image.original}"></a>
                <a class='name_anime' href='/more/?type=person&id=${data[i].character.id}'>${data[i].character.russian}</a>
                </div>            
                `
                test.append(div)
            }
        }
    }
    )
}
function getAnime(){
    const authURL = `https://shikimori.one/api/animes/${id}`
    function sendAuth(method, url, authData = null){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open(method, url)
            xhr.responseType = 'json'
            var parseAcToken = JSON.parse(AcToken);
            if(parseAcToken != null){
                xhr.setRequestHeader('Authorization', `Bearer ${parseAcToken}`)
            }
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onload = () => {
                if(xhr.status >= 400){
                    getPerson()
                } else {
                    resolve(xhr.response)
                }
            }
            xhr.onerror = () => {
                resolve(xhr.response)
            }
            xhr.send(JSON.stringify(authData))
        })
    }
    sendAuth('GET', authURL)
    .then (function (data){  
        document.getElementById("name_anime").innerHTML = (data.russian)
        document.getElementById('movie_cover').innerHTML = `<img class="movie_cover" src="https://shikimori.one${data.image.original}">`
        document.getElementById("syn").innerHTML = (data.russian)
        document.getElementById("desc").innerHTML = (data.description_html)
        document.getElementById("score").innerHTML = (data.score)
        document.getElementById("release").innerHTML = (data.aired_on)
        document.getElementById("screens").innerHTML = `<a href="/screen/?id=${data.id}">View</a>`
        document.getElementById("duration").innerHTML = (data.duration) + ' мин'
        document.getElementById("much").innerHTML = (data.episodes)
        if(data.episodes === 1){
            document.getElementById('time_wrapper').style.display = 'none'
        }else{
        document.getElementById("time").innerHTML = '≈' + '&nbsp' + (getTimeFromMins(data.episodes * data.duration))
        }
        var screen = JSON.stringify(data.screenshots)
        var syn = JSON.stringify(data.synonyms)
        if(data.user_rate != null){
            document.getElementById('add').innerHTML = '<img class="search-icon" src="/img/ed.svg" alt="Editto my list">Edit in my list</button>'
            document.getElementById('del').style.display = 'flex'
        }
        var selected = ''
        var selected2 = ''
        var selected3 = ''
        var selected4 = ''
        var selected5 = ''
        var seriesvalue = 'Просмотрено серий'
        if(data.user_rate === null){
        var selected = 'selected'
        }else{
        seriesvalue = data.user_rate.episodes;
        if(data.user_rate.status === 'watching'){
        var selected2 = 'selected'
        }
        if(data.user_rate.status === 'completed'){
        var selected3 = 'selected'
        }
        if(data.user_rate.status === 'dropped'){
        var selected4 = 'selected'
        }
        if(data.user_rate.status === 'planned'){
        var selected5 = 'selected'
        }}
        let test = document.getElementById('status_wrapper')
            let div = document.createElement('div');
            div.className = "center";
            div.innerHTML = `
            <select id="status" class="select" required>
                <option ${selected} disabled>Статус</option>
                <option ${selected2} id="ids" value="watching">Смотрю</option>
                <option ${selected3} id="ids" value="completed">Просмотрено</option>
                <option ${selected4} id="ids" value="dropped">Брошено</option>
                <option ${selected5} id="ids" value="planned">Запланировано</option>     
            </select>           
            `
            test.append(div)
            let series = document.getElementById('maxlength')
            let input_wrapper = document.createElement('div');
            input_wrapper.className = "search auth_wrapper center";
            input_wrapper.innerHTML = `
            <input required id="serInput" type="text" class="search-field" placeholder="${seriesvalue}">
            <img src="/img/video-tick.svg" alt="" class="search-icon">           
            `
            series.append(input_wrapper)
            for (let i = 0; i < data.genres.length; i++) {
            let test = document.getElementById('genres')
            let div = document.createElement('div');
            let punctuation
            if(i != data.genres.length - 1){
                punctuation = '&#44'
            }else{
                punctuation = '.'
            }
            div.innerHTML = `
            <p class="info_p">${data.genres[i].russian + punctuation + '&nbsp'}</p>            
            `
            test.append(div)
        }
        if(syn === '[]'){
            document.getElementById("syn").innerHTML = (data.russian)
        }else{
            document.getElementById("syn").innerHTML = (data.synonyms[0])
        }
        if(screen === '[]'){
            document.querySelector('.screenshots').style.display = 'none'
        }else{
            document.getElementById('screen1').innerHTML = `<img class="movie_screen" src="https://shikimori.one${data.screenshots[0].original}">`
            document.getElementById('screen2').innerHTML = `<img class="movie_screen" src="https://shikimori.one${data.screenshots[1].original}">`
        }
        localStorage.setItem('aid', JSON.stringify(data.user_rate.id));
        console.log(data.user_rate.id)
        console.log(data)
    }
    )
    rand()
}
function rand(){
    function getRandom(){
    var r = Math.floor(Math.random() * (256)),
    g = Math.floor(Math.random() * (256)),
    b = Math.floor(Math.random() * (256));
    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}
var linear_bg = document.querySelector('.linear_bg')
linear_bg.style.background = `linear-gradient(180deg, ${getRandom()} 0%, pink 100%)`
}
function userImg(){
    if(AcToken != null){
        document.getElementById('sign_in').style.display = 'none'
    }
    const whoAmiURL = 'https://shikimori.one/api/users/whoami'
        function sendAuth(method, url, WhoAmiData = null) {
          return new Promise((resolve, reject) => {
            const xhrwhoami = new XMLHttpRequest()
            var parseAcToken = JSON.parse(AcToken);
            xhrwhoami.open(method, url)
            xhrwhoami.responseType = 'json'
            xhrwhoami.setRequestHeader('Authorization', `Bearer ${parseAcToken}`)
            xhrwhoami.onload = () => {
              if (xhrwhoami.status >= 400) {
                resolve(xhrwhoami.response)
                alert('reload page pls)')
                location.reload()
                refresh()
              } else {
                resolve(xhrwhoami.response)
              }
            }
            xhrwhoami.onerror = () => {
              resolve(xhrwhoami.response)
            }
            xhrwhoami.send()
          })
        }
        sendAuth('GET', whoAmiURL)
          .then(function(data) {
            localStorage.setItem('id', JSON.stringify(data.id));
            document.getElementById('profile_img').style.display = 'block'
            document.getElementById('profile_img').innerHTML = `<a href="/user/?id=${data.id}"><img class="user_avatar" src="${data.image.x160}"></a>`
        })}
function getPerson(){
    const authURL = `https://shikimori.one/api/characters/${id}`
    function sendAuth(method, url, authData = null){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open(method, url)
            xhr.responseType = 'json'
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onload = () => {
                if(xhr.status >= 400){
                    resolve(xhr.response)
                    getPerson()
                } else {
                    resolve(xhr.response)
                }
            }
            xhr.onerror = () => {
                resolve(xhr.response)
            }
            xhr.send(JSON.stringify(authData))
        })
    }
    sendAuth('GET', authURL)
    .then (function (data){   
        for (let i = 0; i < data.animes.length; i++) { // выведет 0, затем 1, затем 2
            let test = document.getElementById('animes')
            let div = document.createElement('div');
            div.innerHTML = `
            <div class="anime_card">
            <div class="cover"><a class='name_anime' href="/more/?id=${data.animes[i].id}"><img id='li1' class="cover" src="https://shikimori.one${data.animes[i].image.original}"></a></div>
            <div class="name_score_wrapper">
            <p id="name8" class="name_anime">${data.animes[i].russian}</p>
            <button id="score_but8" class="score_main">
                <img src="/img/Vector.svg" alt="">
                <p class="score" id="score8">${data.animes[i].score}</p>
            </button>
            </div>
        </div>
            `;
            test.append(div);
        }
        document.getElementById('add').style.display = 'none'  
        document.getElementById("name_anime").innerHTML = (data.russian)
        document.getElementById('movie_cover').innerHTML = `<img class="movie_cover" src="https://shikimori.one${data.image.original}">`
        document.getElementById("syn").innerHTML = (data.russian)
        document.getElementById("desc").innerHTML = (data.description_html)
        document.querySelector(".none").style.display = 'none'
        document.querySelector(".animes_preson_wrapper").style.display = 'block'
})
}        
let open = document.querySelectorAll('.add'); // Кнопки для показа окна
let close = document.querySelector('.score_main'); // Кнопка для скрытия окна
function popupEd(){
    document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
        if(e.target === popupBg) { // Если цель клика - фот, то:
            popupBg.classList.remove('active'); // Убираем активный класс с фона
        }
    });
    let popupBg = document.querySelector('.ed__bg'); // Фон попап окна
    popupBg.classList.add('active'); // Добавляем класс 'active' для фона
}
function check(){
    var status = document.getElementById("status")
    var valueS = status.value;
    var series = document.getElementById("serInput")
    var seriesValue = series.value
    var scoreU = document.getElementById("StInput")
    if(valueS === 'planned'){
        seriesValue = '10000000'
        edit()
    }
    if (valueS === 'completed'){
    seriesValue = '0'
    edit()
    }
    if(valueS === 'dropped'){
        edit()
    }
    if(seriesValue === ''){
        alert('Поле "просмотрено серий" пустое, исправь это!')
    }else{
        edit()
    }
}
function edit(){
    const authURL = 'https://shikimori.one/api/v2/user_rates/'
    function sendAuth(method, url, authData = null){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open(method, url)
            xhr.responseType = 'json'
            var parseAcToken = JSON.parse(AcToken);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.setRequestHeader('Authorization', `Bearer ${parseAcToken}`)
            xhr.onload = () => {
                if(xhr.status >= 400){
                    resolve(xhr.response)

                } else {
                    resolve(xhr.response)
                }
            }
            xhr.onerror = () => {
                reject(xhr.response)
            }
            xhr.send(JSON.stringify(authData))
        })
    }
    var parseAcToken = JSON.parse(AcToken);
    var status = document.getElementById("status")
    var valueS = status.value;
    var series = document.getElementById("serInput")
    var seriesValue = series.value;
    var scoreU = document.getElementById("StInput")
    var scoreValue = scoreU.value;
    var parseid = JSON.parse(idU);
    if(valueS === 'completed'){
        seriesValue = '10000000'
    }
    if(valueS === 'planned'){
        seriesValue = '0'
    }
    const authData = {
    '_method': '_patch',
    "User-Agent": 's’app',
    authenticity_token: `Bearer ${parseAcToken},`,
    'user_rate':{
        "user_id":parseid,
        "target_id":id,
        "target_type":"Anime",
        "chapters": seriesValue,
        "episodes": seriesValue,
        "rewatches": "0",
        "score": scoreValue,
        "status": valueS,
        "text": "",
        "volumes": "1"
    }}
    sendAuth('POST', authURL, authData)
    .then (function (data){
        console.log(data);
        location.reload()
    }
    )
}   
var parseid = localStorage.getItem('aid')   
        function test(){
            const authURL = `https://shikimori.one/api/v2/user_rates/${parseid}`
    function sendAuth(method, url, authData = null){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open(method, url)
            xhr.responseType = 'json'
            var parseAcToken = JSON.parse(AcToken);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.setRequestHeader('Authorization', `Bearer ${parseAcToken}`)
            xhr.onload = () => {
                if(xhr.status >= 400){
                    resolve(xhr.response)

                } else {
                    resolve(xhr.response)
                }
            }
            xhr.onerror = () => {
                reject(xhr.response)
            }
            xhr.send(JSON.stringify(authData))
        })
    }
     const authData = {
    'id':parseid,
     }
    sendAuth('DELETE', authURL, authData)
    .then (function (data){
        console.log(data);
        location.reload()
    }
    )
    }            
