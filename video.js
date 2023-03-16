
import {navbar,before_navbar} from './components/navbar.js'

document.getElementById('navbar').innerHTML=navbar()



let userflag=JSON.parse(localStorage.getItem('userflag'))

let flag6=true;





//Userflow and click

if(userflag==true ){
   document.getElementById('navbar').innerHTML=navbar()
   let userdata=JSON.parse(localStorage.getItem('userdata'))
   console.log(userdata)
   let mydata=document.getElementById('mydata')
   mydata.innerText=userdata.name
 
 
   let signout=document.getElementById('signout')
 signout.addEventListener('click',()=>{
   //  flag4=false
   userflag=false
   localStorage.setItem('userflag',userflag)
 
   window.open('index.html')
 })
 
 
 
   let userimg=document.getElementById('userimg')
   userimg.addEventListener('click',()=>{
     if(flag6==false){
       let dropc2=document.querySelector('.dropdown-content3')
       dropc2.style.display='block'
       flag6=true
 
     }
     else{
       let dropc2=document.querySelector('.dropdown-content3')
       dropc2.style.display='none'
       flag6=false
 
     }
   })
 
 
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
 
 
 }
 else{
   document.getElementById('navbar').innerHTML=before_navbar()
 
   let signin=document.getElementById('signin')
   signin.addEventListener('click',()=>{
 
 
     window.open('./components/auth.html')
     
   })
     let flag5=false
   let option=document.getElementById('opt')
   option.addEventListener('click',()=>{
     if(flag5==false){
       let dropc=document.querySelector('#dc2')
       dropc.style.display='block'
       flag5=true
 
     }
     else{
       let dropc=document.querySelector('#dc2')
       dropc.style.display='none'
       flag5=false
 
     }
 
    
     
   })
 
 }
 
 
 
 
let relateddata=JSON.parse(localStorage.getItem('relateddata')) 
console.log(relateddata)

relateddata.forEach(({snippet,id:{videoId}})=>{

   let div=document.createElement('div')
   div.setAttribute('class','tdiv')

   let img=document.createElement('img')
   img.src=snippet.thumbnails.high.url
   img.setAttribute('class','thumbn')

   let p_title = document.createElement("p");
    p_title.innerText = snippet.title;

    let channel_name = document.createElement("p");
    channel_name.innerText = snippet.channelTitle;

    div.append(img,p_title,channel_name)

    let recom=document.getElementById('recom')
    recom.append(div)
   
  

})


















  
  
    
    
     const showvideo = () =>{

        let {videoId}=JSON.parse(localStorage.getItem("data"))
        console.log(videoId)
        
     
        let iframe=document.createElement("iframe")
     
        let url=`https://www.youtube.com/embed/${videoId}`
        iframe.src=url
     
        iframe.width='80%'
        iframe.height='90%'
        iframe.setAttribute('allowfullscreen',true)
     
        let video_div=document.getElementById("video")
        video_div.append(iframe)
        document.addEventListener('touchstart', {passive: true});
     
     
     }
     showvideo()

        let flag3=false
     let ham=document.getElementById('exp')
     ham.addEventListener('click',()=>{
      if(flag3==false){

         let sidenav=document.getElementById('sidenav')
         sidenav.style.display='block'
         flag3=true

      }
      else{
         let sidenav=document.getElementById('sidenav')
         sidenav.style.display='none'
         flag3=false
      }

     
     })

  
  

  