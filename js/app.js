document.addEventListener('DOMContentLoaded', function () {

  const newUserBtn = document.querySelector('#newUser');
  const titles = document.querySelectorAll('.title');
  const details = document.querySelectorAll('.detail');
  const arrow = document.querySelector('.arrow');

  titles.forEach(title => {
    title.addEventListener('mouseenter', () => {
      detailSelect(title, details);
    });
  })

  // get new user
  newUserBtn.addEventListener('click', function () {
    getPerson(getData);
  });

  function getPerson(cb) {
    const url = 'https://randomuser.me/api/';
    const ajax = new XMLHttpRequest();
    ajax.open('GET', url, true);
    ajax.onload = () => {
      if (ajax.status === 200) {
        cb(ajax.responseText, showData);
      } else {
        ajax.onerror();
      }
    }
    ajax.onerror = () => {
      console.log('There was an error');
    }
    ajax.send();
  }

  function getData(response, cb) {
    const data = JSON.parse(response);
    const {
      name: {
        first
      },
      name: {
        last
      },
      picture: {
        large
      },
      email,
      dob: {
        age
      },
      location: {
        street
      },
      phone,
      login: {
        username
      }
    } = data.results[0];
    cb(first, last, large, email, age, street, phone, username);
  }

  function showData(...data) {
    const name = document.querySelector('#name');
    const userImg = document.querySelector('#userImg');
    const email = document.querySelector('#email');
    const age = document.querySelector('#age');
    const address = document.querySelector('#address');
    const phone = document.querySelector('#phone');
    const username = document.querySelector('#username');

    name.textContent = `${data[0]} ${data[1]}`;
    userImg.src = data[2];
    email.textContent = data[3];
    age.textContent = data[4];
    address.textContent = data[5];
    phone.textContent = data[6];
    username.textContent = data[7];
  }

  // details select
  function detailSelect(title, details) {
    details.forEach(detail => detail.classList.remove('select'));

    let selectDetail = [...details].filter(detail => {
      return title.dataset.target === detail.id;
    })
    selectDetail[0].classList.add('select');

    // arrow centering
    let titleCenter = title.offsetTop + (title.offsetHeight / 2);
    arrow.style.top = `${titleCenter - (arrow.offsetHeight/2)}px`;
  }
});