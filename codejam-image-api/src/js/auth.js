import Netlify from 'netlify-auth-providers';

export default function trackAuthentication() {
  const anchorTag = document.getElementById('auth');
  const outputText = document.getElementById('auth-output');
  anchorTag.addEventListener('click', (e) => {
    e.preventDefault();
    const authenticator = new Netlify({});
    authenticator.authenticate({ provider: 'github', scope: 'user' }, async (err, data) => {
      if (err) throw new Error(`Error: ${err}`);
      try {
        const response = await fetch('https://api.github.com/user', {
          method: 'GET',
          withCredentials: true,

          headers: {
            Authorization: `token ${data.token}`,
          },

        });
        const userData = await response.json();
        const avatar = new Image();
        const nickname = document.createElement('span');
        const loginBtn = document.querySelector('#auth');
        nickname.textContent = userData.login;
        avatar.classList.add('main-header__avatar');
        avatar.onload = () => {
          outputText.appendChild(avatar);
        };
        avatar.src = userData.avatar_url;
        loginBtn.style.display = 'none';
        outputText.appendChild(nickname);
      } catch (evt) {
        throw new Error(`Error: ${evt}`);
      }
    });
  });
}
