const tokenStore = {};

function generateToken(length) {
  let text = "";
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=_|!@#";

  for (let numChar = 0; numChar < length; numChar++) {
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
          reject({ message: "Duplicate token generated." });
        }
      }, 1000);
    } catch (e) {
      console.error("Respond mock login request error:", e);
      reject(e);
    }
  });
}

function refreshToken(refreshToken) {
  return new Promise((resolve, reject) => {
    try {
      console.log("Making mock refreshToken request with token:", refreshToken);
      setTimeout(() => {
        if (tokenStore[refreshToken]) {
          const newAccessToken = generateToken(8);
          const newToken = { ...tokenStore[refreshToken], accessToken: newAccessToken };
          Object.assign(tokenStore, { [newToken.refreshToken]: newToken });
          console.log("Respond successful mock refreshToken request with token:", newToken);
          resolve(newToken);
        } else {
          console.error();
          reject({ message: "Invalid refresh token." });
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
  } else {
    return login(credentialsOrToken);
  }
}

export function deauthService() {
  return new Promise((resolve, reject) => {
    console.log("Deleting token");
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}
