import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '300px',
  position: 'center-top',
  distance: '100px',
  opacity: 1,
  fontSize: '16px',
  warning: {
    background: '#F0F0F0',
    textColor: '#3f51b5',
    notiflixIconColor: '#3f51b5',
  },
});

function warningMessage() {
  Notiflix.Notify.warning("Oops... We didn't find anything. Let's try again");
}

function errorMessage(error) {
  Notiflix.Notify.warning(
    `Oops... Something's gone wrong. Let's try again...  ` + error
  );
}

export { warningMessage, errorMessage };
