const express = require('express')
const app= express()
const mysql = require('mysql');
const cors = require('cors');
app.use(cors());
app.use(express.json());
const multer = require("multer")
const nodemailer = require('nodemailer');

let today=new Date();
dd=today.getDate();
mm=today.getMonth()+1
yy=today.getFullYear()
let cdate=yy+"-"+mm+"-"+dd;
let ctime=today.toLocaleTimeString();


app.listen(3001, () => {
    console.log("running on port 3001");
});

app.get("/",(req,res) => {
    res.send("Hello World React..!");
});

const dbcon = mysql.createConnection({
    host: "localhost",
    "user":"root",
    "password": "",
    "database": "react_ecommerce",
})
// end database connection code

dbcon.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


// Login Authentication code
app.post('/login',(req,res) => {
    logdata=req.body.logindata
    username=logdata.username
    password=logdata.password
    dbcon.query("SELECT * from login where username =? AND password = ?",[username,password],
    (err,result)=> {
        if(err){
            console.log(err);}
        else{
           res.send(result); }     
    }
    );
});

// Signup Insert Code
app.post('/signup',(req,res) => {
    signupdata=req.body.signupdata
    fullname=signupdata.fullname
    city=signupdata.city
    address=signupdata.address
    pincode=signupdata.pincode
    email=signupdata.email
    contact=signupdata.contact
    password=signupdata.password
    utype="user"
    //const sql="insert into login(username,password,utype)values(?,?,?)";
    dbcon.query("insert into register(fullname,city,address,pincode,email,contact)values(?,?,?,?,?,?)",
    [fullname,city,address,pincode,email,contact],

    (err,result)=> {
        if(err){console.log(err);}
        else{
            dbcon.query("insert into login(username,password,utype)values(?,?,?)",
            [email,password,utype])
            res.send(result); 
        }     
    });

    
});


// Food Item Insertion
// image storage config
let imgconfig = multer.diskStorage({
    destination:(req,file,callback) =>{
        callback(null,"../client/public/upload/"); 
        //callback(null,"./client/public/");       
    },
    filename:(req,file,callback) =>{
        callback(null,`image-${Date.now()}.${file.originalname}`)
    }
 })

 // image filter
 const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)}
    else{
        callback(null,Error("only image is allowed"))}
 }

 let upload = multer({
    storage:imgconfig,
    fileFilter:isImage
 })

 app.post("/fooditem",upload.single("file"),(req,res)=> {
    console.log("Hey Food Item");
    //fdata=req.formValues
    category=req.body.category
    item_name=req.body.item_name
    qty=req.body.qty
    price=req.body.price
    const {filename}=req.file
    console.log(req.file)
    const sql="insert into agro_products(category,product_name,uom,qty,price,image,description) values(?,?,?,?,?)";
        dbcon.query(sql,[category,item_name,qty,price,filename],(err,result)=>{
            if(err){
                console.log(err);}
            else{
                res.send(result);}
        });
    });




//Email configuration
const transporter = nodemailer.createTransport({

})

// Signup Insert Code
app.post('/sendmail',(req,res) => {
    emaildata=req.body.emaildata
    email=emaildata.fullname
    subject=emaildata.subject
    message=emaildata.message

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'gurusirsi25@gmail.com',
          pass: 'Guru@Shweta0925',
        }
        });

        var mailOptions={
            from: 'gurusirsi25@gmail.com',
            to: email,
            subject: subject,
            text: message,
        }

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              res.json({status:true,respMesg:'Error in the Code'});
            } else {
                res.json({status:true,respMesg:'Email sent successfully'});
            }
          });

      });


// Add Category
app.post('/addcat',(req,res) => {
    cat=req.body.cat
    dbcon.query("insert into category(category)values(?)",
    [cat],
    (err,result)=> {
        if(err){console.log(err);}
        else{
            res.send(result); 
        }     
    });  
});


// Fetching List of Category
app.get('/catview',(req,res) => {
    dbcon.query("select * from category",(err,result) => {
        if(err){
        console.log(err);}
        else{
            res.send(result);}
    });
});

// Delete Category
app.delete('/delcat/:id',(req,res)=> {
    const id=req.params.id
     //console.log("hey"+id);
     dbcon.query("delete from agro_products where id = ?",id,(err,result)=>{
         if(err){console.log(err)}
         else{res.send(result);}
     });
 });

// Delete Product
app.delete('/deleteproduct/:id',(req,res)=> {
    const id=req.params.id
     //console.log("hey"+id);
     dbcon.query("delete from agro_products where id = ?",id,(err,result)=>{
         if(err){console.log(err)}
         else{res.send(result);}
     });
 });

 

 // Delete Order
app.delete('/deleteorder/:id',(req,res)=> {
    const id=req.params.id
     console.log("hey"+id);
     dbcon.query("delete from customer_orders where id = ?",id,(err,result)=>{
         if(err){console.log(err)}
         else{res.send(result);}
     });
 });




// Fetching Products
app.get('/productview',(req,res) => {
    dbcon.query("select * from products",(err,result) => {
        if(err){
        console.log(err);}
        else{
            res.send(result);}
    });
}); 

// Add Product
app.post("/addproduct",upload.single("file"),(req,res)=> {
    console.log("Hey Food Item");
    //fdata=req.formValues
    category=req.body.category
    product_name=req.body.product_name
    uom=req.body.uom
    qty=req.body.qty
    price=req.body.price
    description=req.body.description
    stock=req.body.stock
    const {filename}=req.file
    console.log(req.file)
    const sql="insert into products(category,product_name,uom,qty,price,image,description,stock) values(?,?,?,?,?,?,?,?)";
        dbcon.query(sql,[category,product_name,uom,qty,price,filename,description,stock],(err,result)=>{
            if(err){
                console.log(err);}
            else{
                res.send(result);}
        });
    });


// Send Order
app.post('/addcart/:id/:uid',(req,res) => {
    console.log("Order Sent")
    const qty=1
    const id=req.params.id
    console.log("Hey"+id)
    const uid=req.params.uid
    const q="select * from products where id=?";
    dbcon.query(q,[id],(err,result) => {
        if(err){
        console.log(err);}
        else{
            const price=result[0].price
            const total=price
            dbcon.query("insert into customer_orders(user_id,price,qty,total,order_date,order_time,order_status,payment_status,pid)values(?,?,?,?,?,?,?,?,?)",
            [uid,qty,price,total,cdate,ctime,'pending','pending',id])
            //console.log(result[0].price)
            res.send(result);
            console.log(result)
        }
    });
});


// get user order list by user id
app.get('/myorder/:id',(req,res) => {
    const uid=req.params.id;
    const q="select a.id,a.pid,a.user_id,a.qty,a.price,a.total,a.order_date,a.order_time,a.order_status,a.payment_status,b.product_name from customer_orders as a join products as b on a.user_id=? and a.pid=b.id and a.order_status=?";
    dbcon.query(q,[uid,'Confirmed'],(err,result) => {
        if(err){
        console.log(err);}
        else{
            res.send(result);}
    });
});


// Do Payment through razorpay  
app.post('/paybill/:id',(req,res) => {
    console.log("Payment Inserted")
    const id=req.params.id
    price=req.body.price,
    payment_id=req.body.payment_id
    uid=req.body.uid
    const status='Paid'
    const q="update customer_orders set payment_status=? where id=?";
    dbcon.query(q,[status,id],(err,result) => {
        if(err){
        console.log(err);}
        else{ 
            dbcon.query("insert into payment(order_id,order_amount,payment_date,user_id,transaction_no)values(?,?,?,?,?)",
            [id,price,cdate,uid,payment_id])
            //console.log(result[0].price)
            res.send(result);
        }
    });
});



// Send Order
app.post('/buyorder/:id',(req,res) => {
    console.log("Order Sent")
    qty=req.body.qty,
    id=req.body.id
    uid=req.body.uid
    const q="select * from products where id=?";
    dbcon.query(q,[id],(err,result) => {
        if(err){
        console.log(err);}
        else{
            const price=result[0].price
            const total=price*qty
            
            dbcon.query("insert into customer_orders(user_id,qty,price,total,order_date,order_time,order_status,payment_status,pid)values(?,?,?,?,?,?,?,?,?)",
            [uid,qty,price,total,cdate,ctime,'Confirmed','pending',id])
            //console.log(result[0].price)
            res.send(result);

        }
    });
});



// Get Category Wise Products
app.get('/cat_wise/:cat',(req,res) => {
    const cat=req.params.cat;
    const q="select * from products where category=?";
    dbcon.query(q,cat,(err,result) => {
        if(err){
        console.log(err);}
        else{
            //console.log(result)
            res.send(result);}
    });
});



// Cart Count
app.get('/cartcount/:uid',(req,res) => {
    const uid=req.params.uid;
    const status='pending'
    console.log(uid)
    dbcon.query("select count(*) as count from customer_orders where user_id = ? and order_status=?",[uid,status],(err,rows)=> {
        if(err){
        console.log(err);}
        else{
            const count=2//rows[0].count
            //res.sendStatus(rows.length);
            res.send(count)
            //console.log(rows[0].count)
            //console.log(result[0])
        }
    });
});


// get user order list by user id
app.get('/mycart/:id',(req,res) => {
    const uid=req.params.id;
    const status='pending'
    const q="select a.id,a.pid,a.user_id,a.qty,a.price,a.total,a.order_date,a.order_time,a.order_status,a.payment_status,b.product_name from customer_orders as a join products as b on a.user_id=? and a.pid=b.id and a.order_status=?";
    dbcon.query(q,[uid,status],(err,result) => {
        if(err){
        console.log(err);}
        else{
            res.send(result);
            //console.log(q)
           }
    });
});


// Do Payment through razorpay  
app.post('/paybillnext/:price',(req,res) => {
    console.log("Payment Inserted")
    price=req.body.price,
    payment_id=req.body.payment_id
    uid=req.body.uid
    const status='Paid'
    const id=Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
    const q="update customer_orders set payment_status=?,order_status=? where user_id=?";
    dbcon.query(q,[status,'Confirmed',uid],(err,result) => {
        if(err){
        console.log(err);}
        else{ 
            dbcon.query("insert into payment(order_id,order_amount,payment_date,user_id,transaction_no)values(?,?,?,?,?)",
            [id,price,cdate,uid,payment_id])
            //console.log(result[0].price)
            res.send(result);
        }
    });
});


// Forgot Password
app.post('/forgotpass',(req,res) => {
    const otp=Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
    username=req.body.email
    console.log(username)
    dbcon.query("SELECT * from login where username =?",[username],
    (err,result)=> {
        if(err){
            console.log(err);}
        else{
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                auth: {
                  user: "gurusirsi25@gmail.com",
                  pass: "deevawzolibybpol",
                },
              });
            
              let info = transporter.sendMail({
                from: '"Gururaj" <gurusirsi25@gmail.com>', // sender address
                to: username, // list of receivers
                subject: "ONE TIME PASSWORD", // Subject line
                text: "Your OTP:", // plain text body
                html: "<b>OTP: </b>"+otp, // html body
              }); 
              console.log("Message sent: %s", info.messageId);
            dbcon.query("insert into otp(otp,status)values(?,?)",
            [otp,'active'])
           res.send(result); }     
    }
    );
});


// Otp Verification
app.post('/otp',(req,res) => {
    otp=req.body.otp
    console.log(otp)
    dbcon.query("SELECT * from otp where otp =?",[otp],
    (err,result)=> {
        if(err){
            console.log(err);}
        else{
            
           res.send(result); }     
    }
    );
});


// Reset Password Code

app.post('/resetpass',(req,res) => {
    newpass=req.body.newpass
    confirmpass=req.body.confirmpass
    uid=req.body.uid

        dbcon.query("update login set password=? where username =?",[newpass,uid],
    (err,result)=> {
        if(err){
            console.log(err);}
        else{
           res.send(result); }     
    }
    ); 
   
});


// Give Feedback
app.post('/feedback',(req,res) => {
    feeddata=req.body.feeddata
    uid=req.body.uid
    about_product=feeddata.about_product
    about_service=feeddata.about_service
    comments=feeddata.comments

    dbcon.query("insert into feedback(about_product,about_service,comments)values(?,?,?)",
    [about_product,about_service,comments],
    (err,result)=> {
        if(err){console.log(err);}
        else{
            res.send(result); 
        }     
    });  
});


// View Feedback Details

app.get('/viewfeedback/',(req,res) => {
    const q="select * from feedback";
    dbcon.query(q,(err,result) => {
        if(err){
        console.log(err);}
        else{
            //console.log(result)
            res.send(result);}
    });
});


// view all old and new orders
app.get('/customerordersall/',(req,res) => {
    const uid=req.params.id;
    const status='Paid'
    const q="select a.id,a.pid,a.user_id,a.qty,a.price,a.total,a.order_date,a.order_time,a.order_status,a.payment_status,b.product_name from customer_orders as a join products as b on a.pid=b.id and payment_status=?";
    dbcon.query(q,status,(err,result) => {
        if(err){
        console.log(err);}
        else{
            //console.log(result)
            res.send(result);}
    });
});


// Get Individual Customer Data
app.get('/viewcustomers/:user_id',(req,res) => {
    const uid=req.params.user_id;
    console.log(uid)
    const q="select * from register where email=?";
    dbcon.query(q,[uid],(err,result) => {
        if(err){
        console.log(err);}
        else{
            //console.log(result)
            res.send(result);}
    });
});




