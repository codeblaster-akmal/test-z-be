# Send Mail

#### _JavaScript, 06.07.2020_

## Description

* _This program asks user to enter a from email and password in object form like ==> {from:'string@example.com', password: 'string'}_
* _This program returns an error message if user enters anything other than a actual format._
* _See specs below for more detail._

## Installation and Setup
* `npm i git+"git clone http url"` This will clone the repository to your local machine.

## Specifications
* _require file with package.json dependencies file name like ==> const sendMail = require('send-mail');_

* _const mailConfig = {_
* _from: 'string@example.com',  <!-- Mandatory -->_
* _password: 'string'  <!-- Mandatory -->_
* _host: 'string'  <!-- Not mandatory -->_
* _port: 'number'  <!-- Not mandatory -->_
* _secure: 'boolean'  <!-- Mandatory @ if port define -->_
* _};_

* _const mailOption = {_
* _title: 'string',  <!-- To pass from mail title || Not mandatory it take default from mailConfig from email-id -->_
* _to: 'string@example.com' || ['string@example1.com', 'string@example2.com'] ,  <!-- Mandatory @single 'string@example.com' || @multiple ['string@example1.com', 'string@example2.com'] -->_
* _subject: 'string',  <!-- Not mandatory -->_
* _content: '<!-- <h1>Welocome to Iwayy</h1> -->' || 'Simple text',  <!-- Not mandatory if pass along with contentType -->_
* _contentType: 'html' || 'text',  <!-- Mandatory @ if pass html contentType must pass as html -->_
* _cc: 'string@example.com' || ['string@example1.com', 'string@example2.com'] ,  <!-- Not mandatory @single 'string@example.com' || @multiple ['string@example1.com', 'string@example2.com'] -->_
* _bcc: 'string@example.com' || ['string@example1.com', 'string@example2.com'] ,  <!-- Not mandatory @single 'string@example.com' || @multiple ['string@example1.com', 'string@example2.com'] -->_
* _attachments: ['/dir/path.jpg,png,pdf,..', '/dir/path.jpg,png,pdf,..'],  <!-- Not mandatory -->_
* _};_

* _Create object of new class and pass mailConfig object like ==> const config = new sendMail(mailConfig);_
* _And then pass mailOption with object method(parameter) like ==> const option = config.sendEmail(mailOption);_


## Known Bugs
There are no known bugs as of last update.

## Support and contact details
_Please contact me at iwayytechnologytest@gmail.com if you run into any issues or have questions, ideas or feedback._

## Technologies Used
This application was built using JavaScript and Nodemailer-NPM.

### License

*This software is licensed under MIT license.*

Copyright (c) 2020 **_Iwayy Technology_**
