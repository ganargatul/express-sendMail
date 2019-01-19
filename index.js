var express = require('express');
var app = express();
var nodemailer = require("nodemailer");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Content-Type', 'application/json');
    next();
});
app.post('/send',(req,ress)=>{
        const {from,fromname,to,subject,text} = req.body;
            // create transporter
        let transporter = nodemailer.createTransport({
            host: "mail.yoursmtp.host",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "yoursmtpemail", // your SMTP Email
                pass: "yoursmtppassword" // your SMTP password
            },
            tls:{
                rejectUnathorized:false
            }
        });
        //custom from 
        let fromCustom={
            name: from,
            address: fromname     
        }
        let mailOptions = {
            from: fromCustom , // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            //you can custom html body, with your html message template
            html: "<b>Hello Dev</b>" // html body
        };
        
        transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                console.log("ERROR MAIL!");
            }
            console.log("Message sent: %s", info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

            ress.json({"Message":"Your Mail Has Been Send"})
        })
    })
app.listen(process.env.PORT || 3005)