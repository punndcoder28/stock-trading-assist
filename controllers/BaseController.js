class Controller {
  /**
   * @param  {string} url
   * @param  {string} requestType
   * @param  {json} requestBody
   * @param  {boolean} isAuthenticated
   * @param  {string} authToken
   * @param  {Function} success
   * @param  {Function} failure
   * @public
   */
  sendRequest(url, requestType, requestBody, success, failure) {
    let body = {};
    body.header = {
      'content-type': 'application/json',
    };
    if (
      requestType.toLowerCase() === 'post' ||
      requestType.toLowerCase() === 'put'
    ) {
      body.body = JSON.stringify(requestBody);
    }
    body.method = requestType;
    console.log(url, body);
    fetch(url, body)
      .then(function (response) {
        if (response.ok) {
          response.json().then(data => {
            success(data);
          });
        } else {
          response
            .text()
            .then(data => {
              data.status = response.status;
              failure(data);
            })
            .catch(e => {
              failure({error: 'Incorrect response from server.', msg: e});
            });
        }
      })
      .catch(function (error) {
        console.log('error');
        failure(error);
      });
  }
}

export default new Controller();
