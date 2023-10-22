import Dashboard from './views/Dashboard.js';
import Posts from './views/Posts.js';
import PostView from './views/PostView.js';
import Settings from './views/Settings.js';
import SignIn from './views/SignIn.js';
import SignUp from './views/SignUp.js';

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

    function signIn(e) {
      e.preventDefault(); // Prevent default form submission behavior
      console.log('signIn');

      const email = 'test@test.com';
      const password = 'qqq1!';
      console.log(email, password);
      try {
        const response = fetch(`/api/auth/signin`, {
          method: 'POST', // Set the method to POST
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include', // Use 'include' to send cookies along with the request
          body: JSON.stringify({ email, password }) // Convert the data to a JSON string
        });
        console.log('user signed in');
        console.log(response);
      } catch (error) {
        console.log('error sign in');
      }
    }

    btnSubmit.addEventListener('click', signIn);
  }

  if (match.route.path === '/sign-up') {
    const btnSubmit = document.querySelector('.sign-up-btn');

    function signUp(e) {
      e.preventDefault(); // Prevent default form submission behavior
      console.log('signUUUUUUp');
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
