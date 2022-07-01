let id = document.location.search.slice(8)
window.onload = function onload(){
    if(AcToken != undefined){
        userImg()
      }
    getAnime()
    getSearch()
}  
function userImg(){
    if(AcToken != null){
        document.getElementById('sign_in').style.display = 'none'
    }
    const whoAmiURL = 'https://shikimori.one/api/users/whoami'
        function sendAuth(method, url, WhoAmiData = null) {
          return new Promise((resolve, reject) => {
            const xhrwhoami = new XMLHttpRequest()
            xhrwhoami.open(method, url)
            xhrwhoami.responseType = 'json'
            var parseAcToken = JSON.parse(AcToken);
            xhrwhoami.setRequestHeader('Authorization', `Bearer ${parseAcToken}`)
            xhrwhoami.onload = () => {
              if (xhrwhoami.status >= 400) {
                resolve(xhrwhoami.response)
                alert('Упс... чет не так пошло, сейчас попробую получить новый токен')
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
            document.getElementById('profile_img').style.display = 'block'
            document.getElementById('profile_img').innerHTML = `<a href="/user/?id=${data.id}"><img class="user_avatar" src="${data.image.x160}"></a>`
        })}
function getAnime(){
    const authURL = `https://shikimori.one/api/animes/?limit=8&search=${id}`
    function sendAuth(method, url, authData = null){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open(method, url)
            xhr.responseType = 'json'
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onload = () => {
                if(xhr.status >= 400){
                    resolve(xhr.response)
                    alert('error, code er >= 400))))')
                }
               else {
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
        if(data != ''){
        for (let i = 0; i < data.length; i++) { // выведет 0, затем 1, затем 2
            let test = document.getElementById('animes')
            let div = document.createElement('div');
            div.className = "alert";
            div.innerHTML = `
            <div class="anime_card">
            <div class="cover"><a class='name_anime' href="/more/?id=${data[i].id}"><img id='li1' class="cover" src="https://shikimori.one${data[i].image.original}"></a></div>
            <div class="name_score_wrapper">
            <p class="name_anime">${data[i].russian}</p>
            <button class="score_main">
                <img src="/img/Vector.svg" alt="">
                <p class="score">${data[i].score}</p>
            </button>
            </div>
        </div>
            `;
            test.append(div);
        }}else{
            document.querySelector('.no_results').style.display = 'flex'
        }
    })
}
function getSearch(){
    const authURL = `https://shikimori.one/api/characters/search?search=${id}`
    function sendAuth(method, url, authData = null){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open(method, url)
            xhr.responseType = 'json'
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onload = () => {
                if(xhr.status >= 400){
                    resolve(xhr.response)
                    alert('error, code er >= 400))))')
                }
               else {
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

        for (let i = 0; i < data.length; i++) { // выведет 0, затем 1, затем 2
            let test = document.getElementById('search')
            let div = document.createElement('div');
            div.className = "alert";
            div.innerHTML = `
            <div id="1_cards" class="anime_card">
            <div id="imgs1" class="cover"><a class='name_anime' href="/more/?type=person&id=${data[i].id}"><img id='li1' class="cover" src="https://shikimori.one${data[i].image.original}"></a></div>
            <div class="name_score_wrapper">
                <p id="names1" class="name_anime">${data[i].russian}</p>
                </div>
        </div>
            `;
            test.append(div);
        }
    
    }
    )
}