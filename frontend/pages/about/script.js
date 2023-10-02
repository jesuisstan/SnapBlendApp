const btnBack = document.querySelector('.btn--back');

function backToHome() {
  console.log('back');
  window.location.href = '/';
}

btnBack.addEventListener('click', backToHome);
