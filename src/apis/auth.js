import localforage from "localforage";

const tokenDb = {};

export function restoreTokenDb() {
  return new Promise((resolve, reject) => {
    localforage
      .getItem("tokenDb")
      .then(value => {
        Object.assign(tokenDb, value);
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
}

function storeTokenInDb(token) {
  return new Promise((resolve, reject) => {
    Object.assign(tokenDb, { [token.refreshToken]: token });
    localforage
      .setItem("tokenDb", tokenDb)
      .then(() => resolve())
      .catch(error => reject(error));
  });
}

function deleteTokenDb() {
  return new Promise((resolve, reject) => {
    localforage
      .removeItem("tokenDb")
      .then(() => resolve())
      .catch(error => reject(error));
  });
}

function generateToken(length) {
  let text = "";
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=_|!@#";

  for (let numChar = 0; numChar < length; numChar += 1) {
    text += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }

  return text;
}

function storeToken(token) {
  return new Promise((resolve, reject) => {
    const instantToken = Object.assign({}, token, { expiresIn: 0 });

    localforage
      .setItem("token", instantToken)
      .then(() => resolve())
      .catch(error => reject(error));
  });
}

function deleteToken() {
  return new Promise((resolve, reject) => {
    localforage
      .removeItem("token")
      .then(() => resolve())
      .catch(error => reject(error));
  });
}

export function getStoredToken() {
  return new Promise((resolve, reject) => {
    localforage
      .getItem("token")
      .then(token => {
        if (token) {
          resolve(token);
        } else {
          reject();
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function login(credentials) {
  return new Promise((resolve, reject) => {
    try {
      console.log("Making mock login request with credentials:", credentials);
      const { username, password } = credentials;
      setTimeout(() => {
        const token = {
          accessToken: generateToken(8),
          expiresIn: 15,
          refreshToken: generateToken(25)
        };

        if (username && password && typeof tokenDb[token.refreshToken] === "undefined") {
          storeTokenInDb(token)
            .then(() => {
              console.log("Respond mock login request successful with token:", token);
              storeToken(token)
                .then(() => resolve(token))
                .catch(error => reject(error));
            })
            .catch(error => reject(error));
        } else {
          console.error("Respond mock login request error");
          const error = new Error("Duplicate token generated.");
          reject(error);
        }
      }, 1000);
    } catch (e) {
      console.error("Respond mock login request error:", e);
      reject(e);
    }
  });
}

function renewToken(refreshToken) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        console.log("Making mock renewToken request with token:", refreshToken);
        if (tokenDb[refreshToken]) {
          const newToken = {
            accessToken: generateToken(8),
            expiresIn: 15,
            refreshToken
          };

          storeTokenInDb(newToken)
            .then(() => {
              console.log("Respond successful mock refreshToken request with token:", newToken);
              storeToken(newToken)
                .then(() => resolve(newToken))
                .catch(error => reject(error));
            })
            .catch(error => reject(error));
        } else {
          const error = new Error("Invalid refresh token.");
          console.error(error);
          reject(error);
        }
      }, 1000);
    } catch (e) {
      reject(e);
    }
  });
}

export function authService(credentialsOrToken) {
  if (typeof credentialsOrToken === "string") {
    return renewToken(credentialsOrToken);
  }
  return login(credentialsOrToken);
}

export function deauthService(failIt) {
  return new Promise((resolve, reject) => {
    console.log("Deleting token");
    setTimeout(() => {
      if (failIt) {
        reject();
      } else {
        deleteToken()
          .then(() => {
            deleteTokenDb()
              .then(() => resolve())
              .catch(error => reject(error));
          })
          .catch(error => reject(error));
      }
    }, 1000);
  });
}
