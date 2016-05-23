<h1>Guitar Bazaar</h1>

I've always wanted to own a guitar shop that allowed me to buy and sell new guitars, service/repair guitars, offer guitar lessons and record music in a studio.  I built this website as my personal project for DevMountain based off of that dream.

The admin portion of this site can be found if you put /login at the end of the url.  Login with kk as the username and kkkkkk as the password.  Feel free to mess around with the data :)  I trust you.

<h3>Optimization Using Gulp</h3>
I really wanted to focus on keeping the site optimal at every step.  I made sure to use the minified version of all CDN's which I know can make an small difference but really it is all those small differences
that can really add up and make a great fluid experience for the user.  I used gulp to minify all my js files and I minified all images using gulp-imagemin(next time i'm going to look into using <a href="https://aws.amazon.com/s3/">Amason S3</a> to host my images).  I feel like I just touched the surface with what gulp can do but I really enjoyed working with it.



<h3>Tech I used</h3>
<img src="http://dev.bowdenweb.com/a/i/js/icons/javascript-icon-128.png"><span></span>
<img src="https://cdn0.iconfinder.com/data/icons/long-shadow-web-icons/512/boostrap-128.png"><span></span>
<img src="https://cdn3.iconfinder.com/data/icons/logos-3/250/angular-128.png">
<img src="https://cdn4.iconfinder.com/data/icons/logos-3/456/nodejs-new-pantone-black-128.png">
<img src="http://nodejs-cloud.com/img/128px/expressjs.png">
<img src="http://pixxstudios.com/wp-content/uploads/2015/03/gulp-mygulpfile_s.png">
<img src="http://perlmaven.com/img/mongodb-logo.png">
<img src="http://plainicon.com/dboard/userprod/2800_a1826/prod_thumb/plainicon.com-50292-128px-812.png">
<img src="https://raygun.com/blog/wp-content/uploads/2013/12/bower1.png">

<h3>Libraries I used</h3>
<hr>
<h5>Angular-UI-Calendar</h5> - http://angular-ui.github.io/ui-calendar/
This awesome library made it real simple to get a fully functional calendar on my site.  It was very intuitive setting it all up.  I have it connected with my database so that once a studio session is added,
it will show up and persist on the calendar.  Eventually I will add the functionality of having the guitar lessons appointments on this calendar as well.  

<h5>Toaster Confirmation Alerts</h5> - https://github.com/jirikavi/AngularJS-Toaster
Often times, I will be at a website and I will click a button and won't really notice anything happen because it happened so fast.  I really enjoy how Toaster alerts gives you a pretty pop up confirmation
that can be linked with events and other things.  I have used this alert on the admin section, confirming to the admin when a CRUD function was successfully executed.

<h5>Passport Local</h5> - https://github.com/jaredhanson/passport-local
I used passport local auth to allow the admin user to login securely.  I learned a lot about what it takes to keep confidential information hidden from the client side.  Processes like salt and hashing is crucial
when using local authorization.  I was very please with how easy Passport Local made this for me.

<h5>ngAnimate</h5> - https://docs.angularjs.org/api/ngAnimate
I didn't get to dig into ngAnimate as much as i'd like but I did accomplish adding a neat animation to every route change which I though was pretty cool.  ngAnimate made it real simple to do this and I think it's
subtle animations like these that really make all the difference the the user experience.
