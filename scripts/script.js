document.getElementById('input-btn').addEventListener('click',function(){
 const InputUser= document.getElementById('input-user');
 const inputValue=InputUser.value;
 const InputPass= document.getElementById('input-passward');
 const inputPassValue=InputPass.value;

 if(inputValue=='admin' && inputPassValue=='admin123'){
    window.location.assign('./main.html');
 }
 else{
   alert('login failed');
    return;
 }
 
})