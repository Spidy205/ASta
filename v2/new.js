// script.js

const form = document.getElementById('review-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const review = document.getElementById('review').value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbyXxXxXxXxXxXxXxXxXxXxXxXx/exec', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.send(`name=${name}&email=${email}&review=${review}`);

    alert('Review submitted successfully!');

});

function doGet(e) {
    var name = e.parameter.name;
    var email = e.parameter.email;
    var review = e.parameter.review;
    
    var subject = 'New Review from ' + name;
    var body = 'Name: ' + name + '\nEmail: ' + email + '\nReview: ' + review;
    
    var adminEmail = 'sb543267@gmail.com';
    MailApp.sendEmail(adminEmail, subject, body);
  }