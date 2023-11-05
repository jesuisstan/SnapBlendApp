import Dashboard from './views/Dashboard.js';
import Posts from './views/Posts.js';
import PostView from './views/PostView.js';
import Settings from './views/Settings.js';
import SignIn from './views/SignIn.js';
import SignUp from './views/SignUp.js';

//const baseUrl = `http://${process.env.HOST}:${process.env.FRONTEND_PORT}`;
const baseUrl = `http://localhost:3333`;

const pathToRegex = (path) =>
  new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: '/', view: Dashboard },
    { path: '/posts', view: Posts },
    { path: '/posts/:id', view: PostView },
    { path: '/settings', view: Settings },
    { path: '/sign-in', view: SignIn },
    { path: '/sign-up', view: SignUp }
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path))
    };
  });

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname]
    };
  }

  const view = new match.route.view(getParams(match));

  document.querySelector('#app').innerHTML = await view.getHtml();

  if (match.route.path === '/sign-in') {
    const btnSubmit = document.querySelector('.submit-sign-in-btn');

    async function signIn(e) {
      e.preventDefault(); // Prevent default form submission behavior
      console.log('signIn');

      //const email = 'test@test.com';
      //const password = 'qqq1!';
      //console.log(email, password);
      //try {
      //  const response = fetch(`/api/auth/signin`, {
      //    method: 'POST',
      //    headers: {
      //      'Content-Type': 'application/json'
      //    },
      //    credentials: 'include',
      //    body: JSON.stringify({ email, password })
      //  });

      //  console.log(response);
      //} catch (error) {
      //  console.log('error sign in');
      //}

      const email = 'test@test.com';
      const password = 'qqq1!';
    
      if (!email || !password) {
        console.error('Email or password is missing');
        // handle the missing email or password error here
        return;
      }
    
      const values = { email, password };

      try {
        const response = await axios.post(`${baseUrl}/api/auth/signin`, values, {
          withCredentials: true
        });
        console.log('response', response);
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Error request:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
      }
    }

    btnSubmit.addEventListener('click', signIn);
  }

  if (match.route.path === '/sign-up') {
    const btnSubmit = document.querySelector('.submit-sign-up-btn');

    async function signUp(e) {
      e.preventDefault(); // Prevent default form submission behavior
      console.log('signUUUUUUp');
      const values = {
        nickname: 'stan',
        email: 'stan.krivtsov@gmail.com',
        password: 'qqq1!'
      };

      try {
        console.log('signUUUUUUp1');

        const response = await fetch(`/api/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(values)
        });
        console.log('response', response);

        //setOpen(false);
        //setLoad(false);
        //saveAlert();
        //navigate('/login');
      } catch (error) {
        console.error('Error while creating new account');
      }
    }

    btnSubmit.addEventListener('click', signUp);
  }
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});
