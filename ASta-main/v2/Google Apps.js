function doGet(e) {
    var name = e.parameter.name;
    var email = e.parameter.email;
    var review = e.parameter.review;
    
    var subject = 'New Review from ' + name;
    var body = 'Name: ' + name + '\nEmail: ' + email + '\nReview: ' + review;
    
    var adminEmail = 'sb543267@gmail.com';
    MailApp.sendEmail(adminEmail, subject, body);
  }