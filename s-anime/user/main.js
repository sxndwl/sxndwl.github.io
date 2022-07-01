let id = document.location.search.slice(4)
window.onload = function onload(){
    userImg()
    userPl()
    userWatchi()
    userViewed()
    userDr()
}  
function getNoun(number, one, two, five) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}
var AcToken = localStorage.getItem('auth')
var RefToken = localStorage.getItem('refresh')
function userImg(){
    if(AcToken != null){
        document.getElementById('sign_in').style.display = 'none'
    }
    if(AcToken != null){
      document.getElementById('profile_img').style.display = 'block'
  }
    const whoAmiURL = `https://shikimori.one/api/users/${id}`
        function sendAuth(method, url, WhoAmiData = null) {
          return new Promise((resolve, reject) => {
            const xhrwhoami = new XMLHttpRequest()
            xhrwhoami.open(method, url)
            xhrwhoami.responseType = 'json'
            xhrwhoami.onload = () => {
              if (xhrwhoami.status >= 400) {
                resolve(xhrwhoami.response)
                alert('code er>=400')
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
            rand()
            document.querySelector('.user_img').innerHTML = `<img class="user_avatar_img" src="${data.image.x160}">`
            document.getElementById('profile_img').innerHTML = `<a href="/user/?id=${data.id}"><img title="Да, я знаю что здесь может быть не твоя ава, считай это пасхалкой (:" class="user_avatar" src="${data.image.x160}"></a>`
            document.getElementById('name_user').innerHTML = (data.nickname)
            if(data.website != ""){
                document.getElementById('web').style.display = 'block'
                document.getElementById('web').innerHTML = `<a target='_blank' style='text-decoration: underline;' class='about center' href="https://${data.website}">${data.website}</a>`
            }
            document.getElementById('planned').innerHTML = (data.stats.full_statuses.anime[0].size)
            document.getElementById('watching').innerHTML = (data.stats.full_statuses.anime[1].size)
            document.getElementById('rewatching').innerHTML = (data.stats.full_statuses.anime[2].size)
            document.getElementById('completed').innerHTML = (data.stats.full_statuses.anime[3].size)
            document.getElementById('drop').innerHTML = (data.stats.full_statuses.anime[4].size)
        })}
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
function userWatchi(){
  const whoAmiURL = `https://shikimori.one/api/users/${id}/anime_rates?status=watching&limit=3`
  function sendAuth(method, url, WhoAmiData = null) {
    return new Promise((resolve, reject) => {
      const xhrwhoami = new XMLHttpRequest()
      xhrwhoami.open(method, url)
      xhrwhoami.responseType = 'json'
      xhrwhoami.onload = () => {
        if (xhrwhoami.status >= 400) {
          resolve(xhrwhoami.response)
          alert('code er>=400')
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
      if(data[0] === undefined){
        document.getElementById('viewid').style.display = 'none'
        document.getElementById('linewatchi').style.display = 'none'
      }
      if(data[0] != undefined){
      document.getElementById("imgs1").innerHTML = `<a class='name_anime' href="/more/?id=${data[0].anime.id}"><img id='li1' class="cover" src="https://shikimori.one${data[0].anime.image.original}"></a>`
      document.getElementById("names1").innerHTML =  `<a class='name_anime' href="/more/?id=${data[0].anime.id}">${data[0].anime.russian}</a>`    
      document.getElementById("scores1").textContent = (data[0].anime.score)
      document.getElementById('status1').textContent = getNoun(data[0].episodes, 'Просмотрена', 'Просмотрено', 'Просмотрено') + ' ' + (data[0].episodes + ' ' + getNoun(data[0].episodes, 'серия', 'серии', 'серий'));
    }else{
      document.getElementById('1_cards').style.display = 'none'
    }
    if(data[1] != undefined){
      document.getElementById("imgs2").innerHTML = `<a class='name_anime' href="/more/?id=${data[1].anime.id}"><img id='li1' class="cover" src="https://shikimori.one${data[1].anime.image.original}"></a>`
      document.getElementById("names2").innerHTML =  `<a class='name_anime' href="/more/?id=${data[1].anime.id}">${data[1].anime.russian}</a>`    
      document.getElementById("scores2").textContent = (data[1].anime.score)
      document.getElementById('status2').textContent = getNoun(data[1].episodes, 'Просмотрена', 'Просмотрено', 'Просмотрено') + ' ' + (data[1].episodes + ' ' + getNoun(data[1].episodes, 'серия', 'серии', 'серий'));
    }else{
      document.getElementById('2_cards').style.display = 'none'
    }
    if(data[2] != undefined){
      document.getElementById("imgs3").innerHTML = `<a class='name_anime' href="/more/?id=${data[2].anime.id}"><img id='li1' class="cover" src="https://shikimori.one${data[2].anime.image.original}"></a>`
      document.getElementById("names3").innerHTML =  `<a class='name_anime' href="/more/?id=${data[2].anime.id}">${data[2].anime.russian}</a>`    
      document.getElementById("scores3").textContent = (data[2].anime.score)
      document.getElementById('status3').textContent = getNoun(data[2].episodes, 'Просмотрена', 'Просмотрено', 'Просмотрено') + ' ' + (data[2].episodes + ' ' + getNoun(data[2].episodes, 'серия', 'серии', 'серий'));
    }else{
      document.getElementById('3_cards').style.display = 'none'
    }
    if(data[3] != undefined){
      document.getElementById("imgs4").innerHTML = `<a class='name_anime' href="/more/?id=${data[3].anime.id}"><img id='li1' class="cover" src="https://shikimori.one${data[3].anime.image.original}"></a>`
      document.getElementById("names4").innerHTML =  `<a class='name_anime' href="/more/?id=${data[3].anime.id}">${data[3].anime.russian}</a>`    
      document.getElementById("scores4").textContent = (data[3].anime.score)
      document.getElementById('status4').textContent = getNoun(data[3].episodes, 'Просмотрена', 'Просмотрено', 'Просмотрено') + ' ' + (data[3].episodes + ' ' + getNoun(data[3].episodes, 'серия', 'серии', 'серий'));
    }else{
      document.getElementById('4_cards').style.display = 'none'
    }
      document.getElementById("wat").innerHTML =  `<a href="/stats/?type=watchin%id=${id}">View</a>`    
  })}
  function userViewed(){
    const whoAmiURL = `https://shikimori.one/api/users/${id}/anime_rates?status=completed&limit=20`
    function sendAuth(method, url, WhoAmiData = null) {
      return new Promise((resolve, reject) => {
        const xhrwhoami = new XMLHttpRequest()
        xhrwhoami.open(method, url)
        xhrwhoami.responseType = 'json'
        xhrwhoami.onload = () => {
          if (xhrwhoami.status >= 400) {
            resolve(xhrwhoami.response)
            alert('code er>=400')
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

        if(data[0] === undefined){
          document.getElementById('vieLine').style.display = 'none'
          document.getElementById('vieC').style.display = 'none'
          document.getElementById('viewWR').style.display = 'none'
        }
        // var arr = data.anime.;
        // var result = {};
        // arr.forEach(function(a){
        // result[a] = result[a] + 1 || 1;
        // });
        // for (var key in result)
        // document.write('число ' + key + ' == ' + result[key] + ' раз(а) <br>');
        for (let i = 0; i < 4; i++) { // выведет 0, затем 1, затем 2
          let test = document.getElementById('viewWR')
          let div = document.createElement('div');
          div.innerHTML = `
          <div class="anime_card">
          <div class="cover"><a class='name_anime' href="/more/?id=${data[i].anime.id}"><img id='li1' class="cover" src="https://shikimori.one${data[i].anime.image.original}"></a></div>
          <div class="name_score_wrapper">
          <p class="name_anime">${data[i].anime.russian}</p>
          <button class="score_main">
              <img src="/img/Vector.svg" alt="">
              <p class="score">${data[i].anime.score}</p>
          </button>
          </div>
      </div>
          `;
          test.append(div);
        }
        console.log(data)
        document.getElementById("vie").innerHTML =  `<a href="/stats/?type=vieweds%id=${id}">View</a>`    
    })}
    function userDr(){
      const whoAmiURL = `https://shikimori.one/api/users/${id}/anime_rates?status=dropped&limit=3`
      function sendAuth(method, url, WhoAmiData = null) {
        return new Promise((resolve, reject) => {
          const xhrwhoami = new XMLHttpRequest()
          xhrwhoami.open(method, url)
          xhrwhoami.responseType = 'json'
          xhrwhoami.onload = () => {
            if (xhrwhoami.status >= 400) {
              resolve(xhrwhoami.response)
              alert('code er>=400')
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
          if(data[0] === undefined){
            document.getElementById('drW').style.display = 'none'
            document.getElementById('drC').style.display = 'none'
            document.getElementById('drLine').style.display = 'none'
          }
          if(data[0] != undefined){
          document.getElementById("is1").innerHTML = `<a class='name_anime' href="/more/?id=${data[0].anime.id}"><img id='li1' class="cover" src="https://shikimori.one${data[0].anime.image.original}"></a>`
          document.getElementById("nas1").innerHTML =  `<a class='name_anime' href="/more/?id=${data[0].anime.id}">${data[0].anime.russian}</a>`    
          document.getElementById("scrs1").textContent = (data[0].anime.score)
          document.getElementById('descriptio1').textContent = getNoun(data[0].episodes, 'Просмотрена', 'Просмотрено', 'Просмотрено') + ' ' + (data[0].episodes + ' ' + getNoun(data[0].episodes, 'серия', 'серии', 'серий'));
        }else{
          document.getElementById('1_cas').style.display = 'none'
        }
        if(data[1] != undefined){
          document.getElementById("is2").innerHTML = `<a class='name_anime' href="/more/?id=${data[1].anime.id}"><img id='li1' class="cover" src="https://shikimori.one${data[1].anime.image.original}"></a>`
          document.getElementById("nas2").innerHTML =  `<a class='name_anime' href="/more/?id=${data[1].anime.id}">${data[1].anime.russian}</a>`    
          document.getElementById("scrs2").textContent = (data[1].anime.score)
          document.getElementById('descriptio2').textContent = getNoun(data[1].episodes, 'Просмотрена', 'Просмотрено', 'Просмотрено') + ' ' + (data[1].episodes + ' ' + getNoun(data[1].episodes, 'серия', 'серии', 'серий'));
        }else{
          document.getElementById('2_cas').style.display = 'none'
        }
        if(data[2] != undefined){
          document.getElementById("is3").innerHTML = `<a class='name_anime' href="/more/?id=${data[2].anime.id}"><img id='li1' class="cover" src="https://shikimori.one${data[2].anime.image.original}"></a>`
          document.getElementById("nas3").innerHTML =  `<a class='name_anime' href="/more/?id=${data[2].anime.id}">${data[2].anime.russian}</a>`    
          document.getElementById("scrs3").textContent = (data[2].anime.score)
          document.getElementById('descriptio3').textContent = getNoun(data[2].episodes, 'Просмотрена', 'Просмотрено', 'Просмотрено') + ' ' + (data[2].episodes + ' ' + getNoun(data[2].episodes, 'серия', 'серии', 'серий'));
        }else{
          document.getElementById('3_cas').style.display = 'none'
        }
        if(data[3] != undefined){
          document.getElementById("is4").innerHTML = `<a class='name_anime' href="/more/?id=${data[3].anime.id}"><img id='li1' class="cover" src="https://shikimori.one${data[3].anime.image.original}"></a>`
          document.getElementById("nas4").innerHTML =  `<a class='name_anime' href="/more/?id=${data[3].anime.id}">${data[3].anime.russian}</a>`    
          document.getElementById("scrs4").textContent = (data[3].anime.score)
          document.getElementById('descriptio4').textContent = getNoun(data[3].episodes, 'Просмотрена', 'Просмотрено', 'Просмотрено') + ' ' + (data[3].episodes + ' ' + getNoun(data[3].episodes, 'серия', 'серии', 'серий'));
        }else{
          document.getElementById('4_cas').style.display = 'none'
        }
        document.getElementById("dr").innerHTML =  `<a href="/stats/?type=dropped%id=${id}">View</a>`    
      })}
      function userPl(){
        const whoAmiURL = `https://shikimori.one/api/users/${id}/anime_rates?status=planned&limit=3`
        function sendAuth(method, url, WhoAmiData = null) {
          return new Promise((resolve, reject) => {
            const xhrwhoami = new XMLHttpRequest()
            xhrwhoami.open(method, url)
            xhrwhoami.responseType = 'json'
            xhrwhoami.onload = () => {
              if (xhrwhoami.status >= 400) {
                resolve(xhrwhoami.response)
                alert('code er>=400')
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
            if(data[0] === undefined){
              document.getElementById('plW').style.display = 'none'
              document.getElementById('plC').style.display = 'none'
              document.getElementById('plLine').style.display = 'none'
            }
            if(data[0] != undefined){
            document.getElementById("i1").innerHTML = `<a class='name_anime' href="/more/?id=${data[0].anime.id}"><img id='li1' class="cover" src="https://shikimori.one${data[0].anime.image.original}"></a>`
            document.getElementById("na1").innerHTML =  `<a class='name_anime' href="/more/?id=${data[0].anime.id}">${data[0].anime.russian}</a>`    
            document.getElementById("scr1").textContent = (data[0].anime.score)
          }else{
            document.getElementById('1_cs').style.display = 'none'
          }
          if(data[1] != undefined){
            document.getElementById("i2").innerHTML = `<a class='name_anime' href="/more/?id=${data[1].anime.id}"><img id='li1' class="cover" src="https://shikimori.one${data[1].anime.image.original}"></a>`
            document.getElementById("na2").innerHTML =  `<a class='name_anime' href="/more/?id=${data[1].anime.id}">${data[1].anime.russian}</a>`    
            document.getElementById("scr2").textContent = (data[1].anime.score)
          }else{
            document.getElementById('2_cs').style.display = 'none'
          }
          if(data[2] != undefined){
            document.getElementById("i3").innerHTML = `<a class='name_anime' href="/more/?id=${data[2].anime.id}"><img id='li1' class="cover" src="https://shikimori.one${data[2].anime.image.original}"></a>`
            document.getElementById("na3").innerHTML =  `<a class='name_anime' href="/more/?id=${data[2].anime.id}">${data[2].anime.russian}</a>`    
            document.getElementById("scr3").textContent = (data[2].anime.score)
          }else{
            document.getElementById('3_cs').style.display = 'none'
          }
          if(data[3] != undefined){
            document.getElementById("i4").innerHTML = `<a class='name_anime' href="/more/?id=${data[3].anime.id}"><img id='li1' class="cover" src="https://shikimori.one${data[3].anime.image.original}"></a>`
            document.getElementById("na4").innerHTML =  `<a class='name_anime' href="/more/?id=${data[3].anime.id}">${data[3].anime.russian}</a>`    
            document.getElementById("scr4").textContent = (data[3].anime.score)

          }else{
            document.getElementById('4_cs').style.display = 'none'
          }
          document.getElementById("pl").innerHTML =  `<a href="/stats/?type=planned%id=${id}">View</a>`    
        })}
        