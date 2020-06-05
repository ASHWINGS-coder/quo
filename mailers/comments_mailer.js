const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    //console.log('inside new comment mailer');
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from:'ashwin1ga14ec041@gmail.com',
        to: comment.user.email,
        subject: " New Comment Published",
        html:htmlString 
    },(err,info) => {
        if(err){
            console.log('Error in Sending Mail',err);
            return;
        }
        console.log('Mail Delivered',info);
        return ;
    });
}