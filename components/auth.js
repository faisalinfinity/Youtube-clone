class User {
  constructor() {}

  validateUsername(username) {
    return username.includes("@") ? false : true;
  }

  validatePassword(password) {
    return password.length < 8 ? false : true;
  }

  async signUP(n, e, u, p, m, d) {
    let isValidated = this.validateUsername(u) && this.validatePassword(p);

    if (isValidated) {
      this.name = n;
      this.email = e;
      this.username = u;
      this.password = p;
      this.mobile = m;
      this.description = d;

      const register_api = `https://masai-api-mocker.herokuapp.com/auth/register`;
      const response = await fetch(register_api, {
        method: "POST",
        body: JSON.stringify(this),

        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log("data:", data);
    }
  }

  async Login(u,p){
    const login_data={
      username:u,
      password:p,
    }

    this.username=u;
    this.password=p;

    const Login_api='https://masai-api-mocker.herokuapp.com/auth/login'

    const res=await fetch(Login_api,{
      method:'POST',
      body:JSON.stringify(this),
      headers:{
        'Content-Type':'application/json',
      },

      
    })
    // const data1=await res.json();
    let {token}=await res.json()
    getUserdata(this.username,token)


  }
}

// https://masai-api-mocker.herokuapp.com/auth/register

let user=new User()

const Register=()=>{

   

    const reg_form=document.querySelector('form')

    const name = reg_form.name.value;

    const email=reg_form.email.value;
    const username=reg_form.username.value;
    const password=reg_form.password.value;
    const mobile=reg_form.mobile.value;
    const description=reg_form.description.value
  

    user.signUP(name,email,username,password,mobile,description)
    console.log('user:',user)

    alert('Successfully Registered ')




};

const Login=()=>{
  const username=document.getElementById('login-username').value
  const password=document.getElementById('login-password').value
  
  user.Login(username,password)
  console.log('user:',user)



}

const getUserdata=async (username,token)=>{

  let get_api=`https://masai-api-mocker.herokuapp.com/user/${username}`


  try{
    let res1=await fetch(get_api,{

      headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type':'application/json',
      }
  
  
    })
  
    let data =await res1.json()
    console.log("data:",data)

  

      if(data.message=='Invalid token for user'){
        alert("Invalid username or Password")
        let userflag=false
        localStorage.setItem('userflag',userflag)
        
        return false
      }
      else{
        alert('Login Success')
        localStorage.setItem('userdata',JSON.stringify(data))
        let userflag=true
        localStorage.setItem('userflag',userflag)

        window.open('../index.html')
       
        return true
      }



    

   


  }
  catch(err){

    console.log("error")


  }
 
  

}

let regdiv=document.getElementById('register')
regdiv.addEventListener('click',()=>{
  
  Register()
})

let logdiv=document.getElementById('login')
logdiv.addEventListener('click',()=>{
  Login()
})
