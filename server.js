var express = require('express');
var file= require("fs");
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app=express();
var cors=require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"employee"
    
  });
  
  con.connect((err)=> {
      if (err){console.log("Error: Database not connected"); } 
      else{console.log("Database connected!");} 
     }  );




    app.post('/post',function(req,res){
        var name =req.body.name;
        var mail =req.body.mail;
        var pass =req.body.pass;
      
       var sql= "INSERT INTO list(name,mail,password) VALUES(?,?,?)";
       var inss= [name,mail,pass];
       sql=mysql.format(sql,inss);
       con.query(sql,(err,result,fields)=>{
           if(!err) {
               res.json(result);
              console.log("success");
           }
           else{
               console.log("error");
           }
        })
       
       });

       app.get('/val/:id/:pas',function(req,res){
        var id =req.params.id;
        var pas =req.params.pas;
        var sql= "SELECT mail FROM list WHERE password= ? AND mail= ? ";
        var ins=[pas,id];
        sql=mysql.format(sql,ins);
            con.query(sql,(err,result,fields)=>{
                if(result.length!=0) {
                    res.json(result);
                   console.log("success");
                }
                else{
                    console.log("Please register");
                }
             })
       });
       var array=[];
       app.post("/datasend",function(req,res){
           var sname=req.body.name;
           var sage=req.body.age;
           var sdob=req.body.dob;
           var sgender=req.body.gender;
           var smobile=req.body.mobile;
           var semail=req.body.email;
           var sdegree=req.body.degree;
           array.push(req.body);
           var obj=JSON.stringify(array);           
           file.writeFile("localdata.json",obj,(err)=>{if(err){console.log("error:failed to save in JSON file")}else{console.log("successfully written")}})

                
            
       
           var sql= "INSERT INTO studentdata(name,gender,age,dob,degree,email,mobile) VALUES(?,?,?,?,?,?,?)";
          var insert=[sname,sgender,sage,sdob,sdegree,semail,smobile];
          sql=mysql.format(sql,insert);
           con.query(sql,(err,result,feilds)=>{
               if(!err){
                   res.json(result);
                   console.log("data inserted")
                }
               else{
                   console.log("error: data not inserted")
               }
           })
        });


        app.get("/getallinfo",function(req,res){
            
            file.readFile("localdata.json",(err,read)=>{if(err){
                console.log("error: failed to read")}
                else{
                    console.log("JSON data fetched succesfuly")
                   res.json(JSON.parse(read));
                }
            })
           
            // var sql="SELECT * FROM studentdata";
            // con.query(sql,(err,result,fields)=>{
            //     if(!err){
            //        console.log("successfuly fetched data")
            //     }
            //     else{
            //         console.log("error: failed to get data")
            //     }
            // });
        });

       app.listen(3000,()=>console.log("listening port 3000"));
