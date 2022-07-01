let id = document.location.search.slice(4)
window.onload = function onload(){
  if(AcToken != undefined){
      userImg()
    }
    getScreens()
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
function getScreens(){
const authURL = `https://shikimori.one/api/animes/${id}/screenshots?limit=10`
function sendAuth(method, url, authData = null){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.responseType = 'json'
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onload = () => {
            if(xhr.status >= 400){
                resolve(xhr.response)
                alert('Error, code error >= 400(')
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
  sessionStorage.setItem('screen', JSON.stringify(data));
    for (let i = 0; i < data.length; i++) { // выведет 0, затем 1, затем 2
      let test = document.getElementById('screenshots_wrapper')
      let div = document.createElement('div');
      div.className = 'statya'
      div.innerHTML = `<button onclick="popscreen(${i})"><img class="movie_big" src="https://shikimori.one${data[i].original}"></button>`;
      test.append(div);
  }
}
)
}
let oopenPopupButtons = document.querySelectorAll('.open-popup'); // Кнопки для показа окна
let oclosePopupButton = document.querySelector('.close-popup'); // Кнопка для скрытия окна
function popscreen(i){
  var screen = sessionStorage.getItem('screen')
  var json = JSON.parse(screen)
  document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
    if(e.target === opopupBg) { // Если цель клика - фот, то:
        opopupBg.classList.remove('active'); // Убираем активный класс с фона
    }
});
let opopupBg = document.querySelector('.screen__bg'); // Фон попап окна
opopupBg.classList.add('active'); // Добавляем класс 'active' для фона
document.querySelector('.img').innerHTML = `<img class="screen_big" src="https://shikimori.one${json[i].original}"></img>`
}