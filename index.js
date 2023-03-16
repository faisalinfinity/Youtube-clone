import { navbar, before_navbar } from "./components/navbar.js";

// let flag4=JSON.parse(localStorage.getItem('flag4'))
let userflag = JSON.parse(localStorage.getItem("userflag"));

let flag6 = true;

if (userflag == true) {
  document.getElementById("navbar").innerHTML = navbar();
  let userdata = JSON.parse(localStorage.getItem("userdata"));
  console.log(userdata);
  let mydata = document.getElementById("mydata");
  mydata.innerText = userdata.name;

  let signout = document.getElementById("signout");
  signout.addEventListener("click", () => {
    //  flag4=false
    userflag = false;
    localStorage.setItem("userflag", userflag);

    window.open("index.html");
  });

  let userimg = document.getElementById("userimg");
  userimg.addEventListener("click", () => {
    if (flag6 == false) {
      let dropc2 = document.querySelector(".dropdown-content3");
      dropc2.style.display = "block";
      flag6 = true;
    } else {
      let dropc2 = document.querySelector(".dropdown-content3");
      dropc2.style.display = "none";
      flag6 = false;
    }
  });

  // let flag7=false
  // let ham=document.getElementById('exp')
  // ham.addEventListener('click',()=>{
  //   if(flag7==false){
  //     let sidenav=document.querySelector('#sidenav>a')
  //     sidenav.style.display='flex'
  //     sidenav.style.width='250px'
  //     flag7=true

  //   }
  //   else{
  //     let sidenav=document.querySelector('#sidenav>a')
  //     sidenav.style.display='block'

  //     flag7=false

  //   }
  // })
} else {
  document.getElementById("navbar").innerHTML = before_navbar();

  let signin = document.getElementById("signin");
  signin.addEventListener("click", () => {
    window.open("./components/auth.html");
  });
  let flag5 = false;
  let option = document.getElementById("opt");
  option.addEventListener("click", () => {
    if (flag5 == false) {
      let dropc = document.querySelector("#dc2");
      dropc.style.display = "block";
      flag5 = true;
    } else {
      let dropc = document.querySelector("#dc2");
      dropc.style.display = "none";
      flag5 = false;
    }
  });
}

const API_KEY = "AIzaSyB5ZR7ph5KZ5vj2kurM1ABAkMxOLoKlYLI";

const searchVideos = async (api_url, flag2) => {
  try {
    // const API_KEY = "AIzaSyCgjRouJYBdBi-_9THEJE6puQ9Tuga2udI";
    // let search_term = document.getElementById("search").value;

    let response = await fetch(api_url);
    // https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${search_term}&key=${API_KEY}
    let data = await response.json(); //collecting data

    console.log("data:", data);

    let actual_data = data.items;
    appendVideos(actual_data, flag2);
    // let result_div = document.getElementById("result");
    // result_div.style.flexDirection='rows'

    console.log("actual_data:", actual_data);
  } catch (err) {
    console.log("err:", err);
  }
};

function appendVideos(data, flag2) {
  console.log("hiiii");
  localStorage.setItem("relateddata", JSON.stringify(data));

  document.getElementById("result").innerHTML = null;

  data.forEach(({ snippet, id: { videoId } }) => {
    console.log("hiiii");
    let div1 = document.createElement("div");
    div1.setAttribute("class", "imgdiv");
    let p_title = document.createElement("p");
    p_title.innerText = snippet.title;

    let channel_name = document.createElement("p");
    channel_name.innerText = snippet.channelTitle;

    let thumbnail = document.createElement("img");
    thumbnail.setAttribute("class", "thumbimg");

    thumbnail.src = snippet.thumbnails.high.url;
    //    console.log(snippet)
    div1.append(thumbnail, p_title, channel_name);

    if (flag2) {
      document.getElementById("default").append(div1);
    } else {
      document.getElementById("result").append(div1);
    }

    div1.onclick = () => {
      let obj = {
        snippet,
        videoId,
      };
      console.log("ok");

      localStorage.setItem("data", JSON.stringify(obj));
      window.location.href = "video.html";
    };
  });
  // let result_div=document.getElementById('result')
  // result_div.style.display='grid'
  // let result_childdiv=document.querySelector('.imgdiv')
  // result_childdiv.style.display='grid'
  // let result_img=document.querySelector('.thumbimg')
  // result_img.style.width='80%'
}

let btn = document.getElementById("sbtn").addEventListener("click", () => {
  let flag2 = false;
  let sdiv = document.getElementById("suggestion");
  sdiv.style.display = "none";
  let fdiv = document.getElementById("fdiv");
  fdiv.style.display = "block";
  // const API_KEY = "AIzaSyCgjRouJYBdBi-_9THEJE6puQ9Tuga2udI";
  let search_term = document.getElementById("search").value;

  let api_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${search_term}&key=${API_KEY}`;
  searchVideos(api_url);
});

const slider = document.querySelector("#suggestion");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
  console.log(walk);
});

let p = document.querySelectorAll("#filter p");

p.forEach((el) => {
  el.addEventListener("click", () => {
    // const API_KEY = "AIzaSyCgjRouJYBdBi-_9THEJE6puQ9Tuga2udI";
    let search_term = document.getElementById("search").value;
    let result_div = document.getElementById("result");
    console.log(el.innerText);
    if (el.innerText == "Title") {
      result_div.innerHTML = null;

      let api_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${search_term}&order=title&key=${API_KEY}`;

      searchVideos(api_url);
      // https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=title&key=[YOUR_API_KEY]
    } else if (el.innerText == "Upload date") {
      result_div.innerHTML = null;

      let api_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${search_term}&order=date&key=${API_KEY}`;

      searchVideos(api_url);
    } else if (el.innerText == "Relevance") {
      result_div.innerHTML = null;

      let api_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${search_term}&order=relevance&key=${API_KEY}`;

      searchVideos(api_url);
    } else if (el.innerText == "View Count") {
      result_div.innerHTML = null;

      let api_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${search_term}&order=videoCount&key=${API_KEY}`;

      searchVideos(api_url);
    } else if (el.innerText == "Rating") {
      result_div.innerHTML = null;

      let api_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${search_term}&order=rating&key=${API_KEY}`;

      searchVideos(api_url);
    } else if (el.innerText == "Under 4 minutes") {
      result_div.innerHTML = null;

      let api_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${search_term}&videoDuration=short&key=${API_KEY}`;

      searchVideos(api_url);
    } else if (el.innerText == "4-20 minutes") {
      result_div.innerHTML = null;

      let api_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${search_term}&videoDuration=medium&key=${API_KEY}`;

      searchVideos(api_url);
    } else if (el.innerText == "Over 20 Minutes") {
      result_div.innerHTML = null;

      let api_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${search_term}&videoDuration=long&key=${API_KEY}`;

      searchVideos(api_url);
    } else if (el.innerText == "Channel") {
      result_div.innerHTML = null;

      let api_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${search_term}&type=channel&key=${API_KEY}`;

      searchVideos(api_url);
    } else if (el.innerText == "Video") {
      result_div.innerHTML = null;

      let api_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${search_term}&type=video&key=${API_KEY}`;

      searchVideos(api_url);
    } else if (el.innerText == "Playlist") {
      result_div.innerHTML = null;

      let api_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${search_term}&type=playlist&key=${API_KEY}`;

      searchVideos(api_url);
    } else if (el.innerText == "Movie") {
      result_div.innerHTML = null;

      let api_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${search_term}&videoType=movie&key=${API_KEY}`;

      searchVideos(api_url);
    }
  });
});

let flogo = document.getElementById("flogo");
let flag = false;
flogo.addEventListener("click", () => {
  if (flag == false) {
    let filterdiv = document.getElementById("filter");
    filterdiv.style.display = "flex";
    flag = true;
  } else {
    let filterdiv = document.getElementById("filter");
    filterdiv.style.display = "none";
    flag = false;
  }
});

const showsuggestion = () => {
  let sdiv = document.getElementById("suggestion");
  sdiv.style.display = "flex";
  let fdiv = document.getElementById("fdiv");
  fdiv.style.display = "block";
};

let logo = document.getElementById("logo");
logo.addEventListener("click", () => {
  showsuggestion();
  load();
});

const load = () => {
  let flag2 = true;
  let api_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=Marvel&key=${API_KEY}`;

  searchVideos(api_url, flag2);

  let sdiv = document.getElementById("suggestion");
  sdiv.style.display = "flex";
  let fdiv = document.getElementById("fdiv");
  fdiv.style.display = "block";
};
window.addEventListener("load", () => {
  load();
});

let suggestion_div = document.querySelectorAll("#suggestion div");
suggestion_div.forEach((el) => {
  el.addEventListener("click", function () {
    let search_term = el.innerText;
    el.style.backgroundColor = "black";
    el.style.color = "white";

    let api_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${search_term}&key=${API_KEY}`;
    searchVideos(api_url);
  });
});
