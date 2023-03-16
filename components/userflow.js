const userflow=()=>{
    return `if(userflag==true ){
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
    `
  }

  export{userflow}