let openPopupButtons = document.querySelectorAll('.open-popup'); // Кнопки для показа окна
let closePopupButton = document.querySelector('.close-popup'); // Кнопка для скрытия окна
function popup(){
    document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
        if(e.target === popupBg) { // Если цель клика - фот, то:
            popupBg.classList.remove('active'); // Убираем активный класс с фона
        }
    });
    let popupBg = document.querySelector('.popup__bg'); // Фон попап окна
    popupBg.classList.add('active'); // Добавляем класс 'active' для фона
}
var AcToken = localStorage.getItem('auth')
var RefToken = localStorage.getItem('refresh')
function getauth(){
    var Atoken = document.getElementById('authInput').value;
    const authURL = 'https://shikimori.one/oauth/token'
    function sendAuth(method, url, authData = null){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open(method, url)
            xhr.responseType = 'json'
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onload = () => {
                if(xhr.status >= 400){
                    alert('Error, CODE ER >=400')
                    refresh()
                } else {
                    resolve(xhr.response)
                }
            }
            xhr.send(JSON.stringify(authData))
        })
    }
    const authData = {
    "User-Agent": 's’app',
    grant_type: "authorization_code",
    client_id: "yqz2V-vKKE3pNJz2F7s2YYANGgRYfXYh9TlfxlMWcJ4",
    client_secret: "sdQSoHuY4rXrEojlVAY6d6cDdM_QbrDR6wMgcaQoVmE",
    code: Atoken,
    redirect_uri: "urn:ietf:wg:oauth:2.0:oob",
    }
    sendAuth('POST', authURL, authData)
    .then (function (data){
        location.reload()
        var Atoken = document.getElementById('authInput').value = ''
        console.log(data);
        localStorage.setItem('refresh', JSON.stringify(data.refresh_token));
        localStorage.setItem('auth', JSON.stringify(data.access_token));
    }
    )
}
function refresh(){
    const authURL = 'https://shikimori.one/oauth/token'
    function sendAuth(method, url, authData = null){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open(method, url)
            xhr.responseType = 'json'
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onload = () => {
                if(xhr.status >= 400){
                    resolve(xhr.response)
                    alert('Error ):')
                    location.reload()
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
    var parseRefToken = JSON.parse(RefToken);
    const authData = {
    "User-Agent": 's’app',
    grant_type: "refresh_token",
    client_id: "yqz2V-vKKE3pNJz2F7s2YYANGgRYfXYh9TlfxlMWcJ4",
    client_secret: "sdQSoHuY4rXrEojlVAY6d6cDdM_QbrDR6wMgcaQoVmE",
    refresh_token:parseRefToken,
    }
    sendAuth('POST', authURL, authData)
    .then (function (data){
        console.log(data);
        location.reload()
        localStorage.setItem('refresh', JSON.stringify(data.refresh_token));
        localStorage.setItem('auth', JSON.stringify(data.access_token));
    }
    )
}
function search() {
    var val = document.getElementById('searchInput').value
    window.location=`/search/?search=${val}`
}