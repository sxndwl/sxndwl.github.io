let base = document.location.search
let type = (base.slice(6,13))
let id = (base.slice(17))
var AcToken = localStorage.getItem('auth')
var RefToken = localStorage.getItem('refresh')
let kind
window.onload = function(){
  if(AcToken != undefined){
    userImg()
  }
if(type === 'dropped'){
  kind = 'dropped'
}
if(type === 'vieweds'){
  kind = 'completed'
}
if(type === 'watchin'){
  kind = 'watching'
}
if(type === 'planned'){
  kind = 'planned'
}
getAnimes()
}
function userImg(){
  if(((AcToken != null) || (AcToken != undefined))) {
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
        function getAnimes(){
          const whoAmiURL = `https://shikimori.one/api/users/${id}/anime_rates?status=${kind}&limit=5000`
                function sendAuth(method, url, WhoAmiData = null) {
                  return new Promise((resolve, reject) => {
                    const xhrwhoami = new XMLHttpRequest()
                    xhrwhoami.open(method, url)
                    xhrwhoami.responseType = 'json'
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
                   console.log(data)
                   for (let i = 0; i < data.length; i++) { // выведет 0, затем 1, затем 2
                    let test = document.getElementById('test')
                    let div = document.createElement('div');
                    div.className = "alert";
                    div.innerHTML = `
                    <div id="1_cars" class="anime_card">
                    <div id="ims1" class="cover"><a class='name_anime' href="/more/?id=${data[i].anime.id}"><img id='li1' class="cover" src="https://shikimori.one${data[i].anime.image.original}"></a></div>
                    <div class="name_score_wrapper">
                        <p id="nams1" class="name_anime">${data[i].anime.russian}</p>
                        <button class="score_main">
                            <img src="/img/Vector.svg" alt="">
                            <p class="score" id="scors1">${data[i].anime.score}</p>
                        </button>
                        </div>
                </div>
                    `;
                    test.append(div);
                  }
                })}                        