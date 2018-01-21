const tokenStore = {};

function generateToken(length) {
  let text = "";
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=_|!@#";

  for (let numChar = 0; numChar < length; numChar += 1) {
    text += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }

  return text;
}

function login(credentials) {
  return new Promise((resolve, reject) => {
    try {
      console.log("Making mock login request with credentials:", credentials);
      const { username, password } = credentials;
      setTimeout(() => {
        const token = {
          accessToken: generateToken(8),
          expiresIn: 10,
          refreshToken: generateToken(25)
        };

        if (username && password && typeof tokenStore[refreshToken] === "undefined") {
          Object.assign(tokenStore, { [token.refreshToken]: token });
          console.log("Respond mock login request successful with token:", token);
          resolve(token);
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

function refreshToken(token) {
  return new Promise((resolve, reject) => {
    try {
      console.log("Making mock refreshToken request with token:", token);
      setTimeout(() => {
        if (tokenStore[token]) {
          const newAccessToken = generateToken(8);
          const newToken = { ...tokenStore[token], accessToken: newAccessToken };
          Object.assign(tokenStore, { [newToken.token]: newToken });
          console.log("Respond successful mock refreshToken request with token:", newToken);
          resolve(newToken);
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
    return refreshToken(credentialsOrToken);
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
        resolve();
      }
    }, 1000);
  });
}
