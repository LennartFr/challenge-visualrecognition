# Code Challenge: Visual Recognition

This challenge shows you how to deploy a Bluemix application, use IBM Bluemix DevOps Services, and use the IBM Watson Visual Recognition service in Node.js.

## Running the app on Bluemix

1. Deploy the challenge application

 [![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/bluemix-code-challenge/challenge-visualrecognition.git)

2. Enter an application name. The host you choose will determinate the subdomain of your application's URL: `<host>.mybluemix.net`.

  [![Deploy challenge application to IBM Bluemix](./img/deploy.png)](./img/deploy.png)

3. Wait for the deployment to complete. Click on Edit Code.

  [![Deployment summary](./img/deploymentsummary.png)](./img/deploymentsummary.png)

4. The IBM Bluemix DevOps Services tools allow you to edit code in the browser, configure a pipeline of processes to execute when new code is committed, and deploy applications automatically to IBM Bluemix.

  Select `app.js` to edit the application source code.

  [![IBM Bluemix DevOps Services](./img/devops.png)](./img/devops.png)

5. In this challenge, we’ll classify an image.

  [![IBM Bluemix DevOps Editor](./img/editor.png)](./img/editor.png)

6. Replace the image name `dog.png` on line 42 with the image name `car.png` as shown below.

  ```
  ...
  var params = {
    images_file: fs.createReadStream('./public/images/dog.png')
  };
  ...
  ```

  The change should look as shown below.

  ```
  ...
  var params = {
    images_file: fs.createReadStream('./public/images/car.png')
  };
  ...
  ```

7. Replace the value for the `email` property on line 52 with your email address.
  ```
  ...
    // Change only the email address.
    var submission = {
      email: 'you@youremailaddress.com',
      data: JSON.stringify(result),
  ...
  ```

8. Lastly, uncomment lines 65 – 67 so the application can be verified.

  ```
  ...  
  // Uncomment
  //request.post('https://svcctracker.mybluemix.net/check/challengevisualrecognition', {form: submission}, function(err, response, body) {
  //  res.send(body);
  //});
  ...
  ```

  The change should look as shown below.

  ```
  ...  
  // Uncomment
  request.post('https://svcctracker.mybluemix.net/check/challengevisualrecognition', {form: submission}, function(err, response, body) {
    res.send(body);
  });
  ...
  ```

9. Now that changes have been made, the following steps will commit the changes to the attached Git repo. Click on the Git icon on the left side.

  [![Git icon](./img/giticon.png)](./img/giticon.png)

10. Enter a commit message. Click on Commit.

  [![Enter commit message](./img/commit.png)](./img/commit.png)

11. In the left column, click on Push in the Outgoing section. This will push the changes to the remote branch.

  [![Push changes](./img/push.png)](./img/push.png)

12. You can see the progress of the application deployment by clicking on the Build & Deploy button in the top-right corner of the page.

  [![DevOps Pipeline](./img/pipeline.png)](./img/pipeline.png)

13. When the application has finished deploying to your IBM Bluemix account, visit your application’s URL, appended with `/classify`.

  [![Result](./img/result.png)](./img/result.png)

  If you see a Fantastic page, you've completed this challenge successfully. If the page doesn't return a message, or it says Uh Oh!, please check the previous steps.
