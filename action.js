var x=document.getElementById("login");
var y=document.getElementById("register");
var z=document.getElementById("btn");
function register(){
x.style.left="-400px";
y.style.left="50px";
z.style.left="110px";
}
function login(){
x.style.left="50px";
y.style.left="450px";
z.style.left="0";
}


function feed(){
    var data={ name:document.getElementById("name").value,
               pass:document.getElementById("pass").value
            }
    var mail=document.getElementById("mail").value;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(mail)) {
    alert('Please provide a valid email address');}
    else{
        data.mail=document.getElementById("mail").value;
        var xhttp= new XMLHttpRequest();
xhttp.onreadystatechange=function(){
    if(this.readyState == 4 && this.status==200){
        alert("Registered Successfully");
    }
    else{console.log("error1");
    }
}
xhttp.open("POST","http://localhost:3000/post",true);
xhttp.setRequestHeader("Content-Type","application/json;charset=UTF8");
xhttp.send(JSON.stringify(data));
    }
console.log(data);

}



function validate(){
    var pas = document.getElementById("pas").value;
   var id = document.getElementById("id").value;
   var xhttp= new XMLHttpRequest();
xhttp.onreadystatechange=function(){
    if(this.readyState == 4 && this.status==200){
       
      alert("success");
      window.location="../Login/data.html";
    }
    else{console.log("please register");
    }
}
xhttp.open("GET","http://localhost:3000/val/"+id+"/"+pas,true);
xhttp.setRequestHeader("Content-Type","application/json;charset=UTF8");
xhttp.send();

}


function info(){
   
    var info= { name:document.getElementById("Sname").value,
                
                age:document.getElementById("Sage").value,
                dob:document.getElementById("Sdob").value,
                degree:document.getElementById("Sdegree").value,
                email:document.getElementById("Semail").value,
                mobile:document.getElementById("Smobile").value    
        }  
        if(document.getElementById("Sgender").checked){
            info.gender= "male";
        }
        else{
            info.gender= "Female";
        }
       

   var xhttp= new XMLHttpRequest();
   xhttp.onreadystatechange=function(){
       if(this.readyState==4 && this.status==200){
           alert("Data saved successfully");
       }
       else{
           console.log("error: data sending failed")
       }

   }
   xhttp.open("POST","http://localhost:3000/datasend",true);
   xhttp.setRequestHeader("Content-Type","application/json;charset=UTF8");
   xhttp.send(JSON.stringify(info));

}

function viewall(){
    console.log("hello")
    var xhttp= new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
           console.log(this.responseText);
           var sdata=JSON.parse(this.responseText);
           var data_length= sdata.length;
           console.log(sdata[0].name);
           var display= document.getElementById("table");
           display.innerHTML=" <tr><th >S.no</th><th>Student Name</th><th>Gender</th><th>Age</th><th>D.O.B</th><th>Degree</th><th>Email</th><th>Mobile</th></tr>";        
       
           for(var i=0;i<data_length;i++){
           var j=i+1;
            display.innerHTML+="<tr><td>"+j+"</td><td>"+sdata[i].name+"</td><td>"+sdata[i].gender+"</td><td>"+sdata[i].age+"</td><td>"+sdata[i].dob+"</td><td>"+sdata[i].degree+"</td><td>"+sdata[i].email+"</td><td>"+sdata[i].mobile+"</td></tr>";
           }
        }
        else{
            console.log("error: data failed to receive")
        }
    }
    xhttp.open("GET","http://localhost:3000/getallinfo",true);
    xhttp.setRequestHeader("Content-Type","application/json;charset=UTF8");
    xhttp.send();
}