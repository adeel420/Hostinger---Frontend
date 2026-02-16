export const initGoogleAuth = () => {
  return new Promise((resolve) => {
    window.google.accounts.id.initialize({
      client_id: "YOUR_GOOGLE_CLIENT_ID",
      callback: resolve,
    });
  });
};

export const handleGoogleLogin = () => {
  return new Promise((resolve, reject) => {
    window.google.accounts.id.initialize({
      client_id: "YOUR_GOOGLE_CLIENT_ID",
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
  const clientId = "YOUR_GITHUB_CLIENT_ID";
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
