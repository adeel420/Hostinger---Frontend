export const initGoogleAuth = () => {
  return new Promise((resolve) => {
    window.google.accounts.id.initialize({
      client_id:
        "104183537537-5jtaef1c2od1v1im2jq8nhdmfke30s87.apps.googleusercontent.com",
      callback: resolve,
    });
  });
};

export const handleGoogleLogin = () => {
  return new Promise((resolve, reject) => {
    window.google.accounts.id.initialize({
      client_id:
        "104183537537-5jtaef1c2od1v1im2jq8nhdmfke30s87.apps.googleusercontent.com",
      callback: (response) => {
        const decoded = JSON.parse(atob(response.credential.split(".")[1]));
        resolve({
          name: decoded.name,
          email: decoded.email,
          avatar: decoded.picture,
          providerId: decoded.sub,
        });
      },
    });
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        reject(new Error("Google Sign-In was closed"));
      }
    });
  });
};

export const handleGithubLogin = () => {
  const clientId = "Ov23lipHurAPy9dlruxi";
  const redirectUri =
    "https://hostinger-backend.onrender.comauth/github/callback";
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
};

export const handleFacebookLogin = () => {
  return new Promise((resolve, reject) => {
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          window.FB.api("/me", { fields: "name,email,picture" }, (userInfo) => {
            resolve({
              name: userInfo.name,
              email: userInfo.email,
              avatar: userInfo.picture?.data?.url,
              providerId: userInfo.id,
            });
          });
        } else {
          reject(new Error("Facebook login failed"));
        }
      },
      { scope: "public_profile,email" },
    );
  });
};
