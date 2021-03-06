<h1>Guitar Bazaar - http://guitarbazaar.trade/#/</h1>
<hr>

<img src="/public/images/screenshot.png"></img>

I've always wanted to own a guitar shop that allowed me to buy and sell used guitars, service/repair guitars, offer guitar lessons and record music in a studio.  I built this website as my personal project for DevMountain based off of that dream.

The admin portion of this site can be accessed if you put <pre>/login</pre> at the end of the url.  Login with kk as the username and kkkkkk as the password.  Feel free to mess around with the data :)  I trust you.

<h3>Optimization</h3>
<hr>
I really wanted to focus on keeping the site optimal at every step.  I made sure to use the minified version of all CDN's which I know can make an small difference. Really, it is all those small differences
that can really add up and make a great fluid experience for the user.  I used gulp to minify all my js files and I minified all images using <a href="https://github.com/sindresorhus/gulp-imagemin>gulp-imagemin</a>(next time i'm going to look into using <a href="https://aws.amazon.com/s3/">Amason S3</a> to host my images).  I feel like I just touched the surface with what gulp can do but I really enjoyed working with it.

I've combed over the entire project multiple times looking for needless divs, classes, id's and white space.  It is easy to add a class or a div with intentions of using it but then forgetting about it.  Again, these seem pretty miniscule but they can add up.  I pride myself with clean code as well.  Readability is HUGE to me.....Before I can even start debugging I have to clean up the code indentation and spacing.  This is something I feel I am OCD about but I get a strange satisfaction from looking at a perfectly indented and symmetrical piece of code.  It is almost art to me, in a really nerdy way.  This site was hosted using <a href="https://mlab.com/"> MongoLabs</a> and <a href="https://www.digitalocean.com/">DigitalOcean</a>



<h3>Techs I used</h3>
<hr>
<img src="http://dev.bowdenweb.com/a/i/js/icons/javascript-icon-128.png"><span></span>
<img src="https://cdn0.iconfinder.com/data/icons/HTML5/128/HTML_Logo.png">
<img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/badge-css-3-128.png">
<img src="https://cdn0.iconfinder.com/data/icons/long-shadow-web-icons/512/boostrap-128.png"><span></span>
<img src="https://cdn3.iconfinder.com/data/icons/logos-3/250/angular-128.png">
<img src="https://cdn4.iconfinder.com/data/icons/logos-3/456/nodejs-new-pantone-black-128.png">
<img src="http://nodejs-cloud.com/img/128px/expressjs.png">
<img src="http://pixxstudios.com/wp-content/uploads/2015/03/gulp-mygulpfile_s.png">
<img src="http://perlmaven.com/img/mongodb-logo.png">
<img src="http://plainicon.com/dboard/userprod/2800_a1826/prod_thumb/plainicon.com-50292-128px-812.png">
<img src="https://raygun.com/blog/wp-content/uploads/2013/12/bower1.png">
<img src="https://cdn4.iconfinder.com/data/icons/azure-blue-icons/128/git_repository.png">

<h3>Libraries I used</h3>
<hr>

<h5>Angular-UI-Calendar - http://angular-ui.github.io/ui-calendar/</h5>
This awesome library made it really simple to get a fully functional calendar implemented on my site.  It was very intuitive setting it all up.  I have it connected with my database so that once a studio session is added, it will show up and persist on the calendar.  

<h5>Toaster Confirmation Alerts - https://github.com/jirikavi/AngularJS-Toaster</h5>
Often times, I will be at a website and I will click a button and won't really notice anything happen because it happened so fast.  I really enjoy how Toaster alerts gives you an aesthetically pleasing pop up confirmation.  I have used this alert on the admin section, confirming to the admin when a CRUD function was successfully executed.

<h5>Passport Local - https://github.com/jaredhanson/passport-local</h5>
I used passport local auth to allow the admin user to login securely.  I learned a lot about what it takes to keep confidential information hidden from the client side.  Processes like salt and hashing is crucial
when using local authorization.  I was very pleased with how easy Passport Local made this for me.

<h5>ngAnimate - https://docs.angularjs.org/api/ngAnimate</h5>
I didn't get to dig into ngAnimate as much as i'd like but I did accomplish adding a neat animation to every route change which I though was pretty cool.  ngAnimate made it real simple to do this and I think it's
subtle animations like these that really make the difference for the users experience.


We had 2 weeks to finish our personal project and I feel I easily put in over 100 hours on this one in that span.  I take a lot of pride in it. Thanks for taking the time to look at my work :) Feel free to reach out to me about this project or about anything else really.

<b>Twitter</b>: https://twitter.com/KyleBarl0w<br>
<b>Email</b>: kylebarlow@musician.com<br>
<b>Github</b>: https://github.com/kbazl3<br>
<b>LinkedIn</b>: https://www.linkedin.com/in/kylebarl0w
