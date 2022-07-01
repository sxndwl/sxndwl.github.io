document.addEventListener("DOMContentLoaded", auth);
function getRandomInt(max) { //random number for gradient (line 77)
  return Math.floor(Math.random() * max);
}
function checkKey(e) {// check enter
        var inp = document.getElementById('auth');
        var value = inp.value
        if(e.keyCode == "13") {
        localStorage.setItem('nickname', value);
        location.reload()
    }
}
function auth(){//popup window
    if (localStorage.getItem('nickname') === null){
            document.addEventListener('click', (e) => {
    });
    let auth = document.querySelector('.auth');
    auth.classList.add('active'); 
    } else{
        get()
    }
}
var nick = localStorage.getItem('nickname')
function get(){
    const authURL = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${nick}&limit=1&nowplaying=true&api_key=066f2e1c3ddd4f67fc2ba634457c2620&format=json`
    function sendAuth(method, url, authData = null){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open(method, url)
            xhr.responseType = 'json'
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onload = () => {
                if(xhr.status >= 400){
                    localStorage.removeItem('nickname')
                    alert('nickname is wrong')
                    auth()
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
        var track = {
			artist: data.recenttracks.track[0].artist['#text'],
			title: data.recenttracks.track[0].name,
            album: "·" + '&nbsp' + data.recenttracks.track[0].album['#text'],
			image: {
				small: data.recenttracks.track[0].image[0]['#text'],
				medium: data.recenttracks.track[0].image[1]['#text'],
				large: data.recenttracks.track[0].image[2]['#text'],
				extralarge: data.recenttracks.track[0].image[3]['#text']
			},
		};
        if (track.image.extralarge === '' || track.image.extralarge === 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png'){
            track.image.extralarge = 'img/404.jpg'
        }
        check()
        sessionStorage.setItem('check', track.title)
        document.querySelector('.img').innerHTML = `<img class="cover" src="${track.image.extralarge}">`
        document.querySelector('.name').innerHTML = track.title
        document.querySelector('.more').innerHTML = track.artist + '&nbsp' + track.album
        var img = track.image.extralarge
        RGBaster.colors(img, {
        exclude: ['rgb(255,255,255)','rgb(0,0,0)','rgb(1,1,1)'],
        success: function(payload) {
        var linear_bg = document.body 
        var color = payload.dominant
        var gradient = `linear-gradient(${(getRandomInt(190))}deg, ${payload.dominant} 0%, ${payload.secondary} 50%, ${payload.palette[9]} 100%)`
        linear_bg.style.background = color
        linear_bg.style.backgroundSize = '100vh'
       }
});
    }
    )
}
function check(){
    setTimeout(check, 30000)
    fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${nick}&limit=1&nowplaying=true&api_key=066f2e1c3ddd4f67fc2ba634457c2620&format=json`)
    .then(function (resp) {return resp.json() })
    .then (function (data){
        if (data.recenttracks.track[0].name != sessionStorage.getItem('check')){
             location.reload()  
        }
    })
}