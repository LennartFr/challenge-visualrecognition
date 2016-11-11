/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// This application uses request to submit your challenge answer to
// our challenge service checker
var request = require('request');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

app.get('/classify', function(req, res) {
  var vcapServices = require('vcap_services');
  var service = vcapServices.getCredentials('watson_vision_combined');

  if(service && service.api_key) {
    var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

    var visual_recognition = new VisualRecognitionV3({
      api_key: service.api_key,
      version_date: '2016-05-19'
    });

    var fs = require('fs');
    var params = {
      images_file: fs.createReadStream('./public/images/dog.png')
    };

    visual_recognition.classify(params,
      function(err, result) {
        if(err) {
          res.send(err);
        } else {
          // Change only the email address.
          var submission = {
            email: 'you@youremailaddress.com',
            data: JSON.stringify(result),
            app: JSON.stringify({
              services: Object.keys(appEnv.services),
              host: appEnv.app.application_uris,
              space: appEnv.app.space_id,
              started_at: appEnv.app.started_at,
              application_id: appEnv.app.application_id,
              instance_id: appEnv.app.instance_id
            })
          };

          // Uncomment
          //request.post('https://code-checker.mybluemix.net/check/challengevisualrecognition', {form: submission}, function(err, response, body) {
          //  res.send(body);
          //});
        }
      });
    } else {
      res.send('Visual Recognition Service not bound to application.');
    }
});

// Start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // Print a message when the server starts listening
  console.log('server starting on '+appEnv.url);
});
