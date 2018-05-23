/**
 * Use this class to make a wrapper over your request library
 * By default it uses a mock to post a login request
 * based on the respose given by firebase 
 */
class RequestService {
  static localDB = JSON.parse(localStorage.getItem('boilerplate-db') || `{"test@test.com": "qweasdzx"}`)

  static post(url, data) {
    return new Promise((resolve, reject) => {
      const fakeLatency = Math.floor(Math.random() * 300) + 1;
      setTimeout(() => {
        switch (url) {
          case 'signIn':
            const passwordInDB = RequestService.localDB[data.email];
            if (passwordInDB && passwordInDB === data.password) {
              // Success
              resolve({
                localId: 'qwlkjeqlkwjelkqjwe' + data.email,
                email: data.email,
                idToken: 'ALEJKDHLAJEFHLKAJBDLKAJBELFKEQI#UEQ*#&#(Q^RQ(#' + data.email,
                registered: true,
                expiresIn: '3600',
                code: 200
              });
            }
            else {
              // Fail
              reject({
                error: {
                  errors: [
                    {
                      domain: 'global',
                      reason: 'invalid',
                      message: 'EMAIL_NOT_FOUND'
                    }
                  ],
                  code: 400,
                  message: "EMAIL_NOT_FOUND"
                }
              });
            }
            break;
          case 'signUp':
            const isRegistered = RequestService.localDB[data.email] !== undefined;
            if (!isRegistered) {
              RequestService.localDB[data.email] = data.password;
              localStorage.setItem('boilerplate-db', JSON.stringify(RequestService.localDB));
              // Success
              resolve({
                localId: 'qlkjwelqkjwelkqjqlwejk' + data.email,
                email: data.email,
                idToken: 'ALEJKDHLAJEFHLKAJBDLKAJBELFKEQI#UEQ*#&#(Q^RQ(#' + data.email,
                registered: true,
                expiresIn: '3600',
                code: 200
              });
            }
            else {
              // Fail
              reject({
                error: {
                  errors: [
                    {
                      domain: 'global',
                      reason: 'invalid',
                      message: 'EMAIL_EXISTS'
                    }
                  ],
                  code: 400,
                  message: 'EMAIL_EXISTS'
                }
              });
            }
            break;
          default:
            reject({ status: "404", error: "page not found" });
        }
        
      }, fakeLatency);
    });
  }
}

export default RequestService;