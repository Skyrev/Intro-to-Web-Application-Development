<h2>SDSU Marathon</h2>
<p>This is part 2 of proj2, i.e. the server-side portion of the application.</p>
<p>Project #3 will add the following features:</p>
<ul>
<li>AJAX to verify that the form to be submitted is not a duplicate.</li>
<li>A php script that reads the parameters from the form and stores them in your MySQL database on opatija.sdsu.edu. We will discuss database design and a sample DB schema will be provided.</li>
<li>You must also upload and store the runner's image on the server. Do not store the actual image in the MySQL database, store only the name and use a folder on the server for the image file.</li>
<li>A report that gives the roster of the runners, grouped by category (teen, adult, senior) and alphabetized by last name. It must be accessible only after a login and should contain the following information:
  <ul>
    <li>Runner's last name, first name.</li>
    <li>The runner's image.</li>
    <li>Runner's age at the time the report is generated.</li>
    <li>Runner's experience level.</li>
  </ul>
</li>
<li>A confirmation page</li>
</ul>

<p>Files</p>
<ul>
  <li>Landing page (index.html) - html part 1 (proj2)</li>
  <li>Enrollment Form - html part 1 (proj2)</li>
  <li>Confirmation page - php part 2</li>
  <li>Error page or message - php part 2</li>
  <li>Login Screen for the report, below</li>
  <li>Roster Report - php part 2</li>
</ul>

<p>Login Screen</p>
<ul>
  <li>The Roster Report must be password protected, and should be accessable at http://jadran.sdsu.edu/~jadrnxxx/proj3/report.php.</li>
  <li>Accessing that URL should bring up a login screen that will have a single field, the password.</li>
  <li>There are no individual users, hence only a password field.</li>
  <li>You must NOT hard the passwords in your php code, but rather store them encrypted in a text file on the server.</li>
  <li>If the user supplies an incorrect password then you should display an error message.</li>
  <li>If the correct password is supplied, then the report should load.</li>
</ul>
