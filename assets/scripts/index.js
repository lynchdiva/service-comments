'use strict';

makeChoosingSingleCheckbox();

const btn = document.querySelector('.comments-service__btn');
const checkboxNoName = document.querySelector(
  '.comments-service__checkbox[value="no"]'
);
const checkboxYesName = document.querySelector(
  '.comments-service__checkbox[value="yes"]'
);

btn.addEventListener('click', addComment);

checkboxNoName.addEventListener('change', () => {
  const label = document.querySelector('[for="name"]');
  const input = document.querySelector('#name');

  label.classList.add('hidden');
  input.classList.add('hidden');

  input.classList.remove('required');
});

checkboxYesName.addEventListener('change', () => {
  const label = document.querySelector('[for="name"]');
  const input = document.querySelector('#name');

  label.classList.remove('hidden');
  input.classList.remove('hidden');

  input.classList.add('required');
});

function addComment() {
  if (checkEmptyField()) {
    showTooltip();
    return;
  }

  const templateComment = document.querySelector(
    '.comments-service__comment-box'
  );

  if (templateComment.classList.contains('hidden')) {
    fillInfo(templateComment);
    templateComment.classList.remove('hidden');

    return;
  }

  const newComment = templateComment.cloneNode(true);
  const chat = document.querySelector('.comments-service__chat');

  fillInfo(newComment);

  chat.append(newComment);
}

function checkEmptyField() {
  const requiredFields = document.querySelectorAll('.required');
  let anyEmpty = false;

  requiredFields.forEach(field => {
    if (!field.value) {
      addWarningClass(field);
      anyEmpty = true;
    }
  });

  return anyEmpty;
}

function addWarningClass(elem) {
  elem.classList.add('warning');

  elem.addEventListener('focus', function handler() {
    elem.classList.remove('warning');
    elem.removeEventListener('focus', handler);
  });
}

function showTooltip() {
  const tooltip = document.querySelector('.comments-service__tooltip');

  tooltip.classList.add('visible');

  setTimeout(() => tooltip.classList.remove('visible'), 1500);
}

function fillInfo(elem) {
  addCommentTextTo(elem);
  addNameTo(elem);
  addDateTo(elem);
  addAvatarTo(elem);
}

function addCommentTextTo(elem) {
  const commentTextarea = document.querySelector('#comment');
  const commentText = commentTextarea.value;
  const filteredCommentText = getFilteredComment(commentText);

  elem.querySelector('.comments-service__comment').textContent =
    filteredCommentText;

  commentTextarea.value = '';
}

function getFilteredComment(comment) {
  return comment
    .replace(/viagra/gi, '***')
    .replace(/xxx/gi, '***')
    .replace(/виагра/gi, '***');
}

function addNameTo(elem) {
  const nameInput = document.querySelector('#name');

  let name = '';

  if (nameInput.classList.contains('hidden')) {
    name = 'Username';
  } else {
    name = getReformedName(nameInput.value);
  }

  elem.querySelector('.comments-service__nickname').textContent = name;

  nameInput.value = '';
}

function getReformedName(name) {
  let formattedName = name.replace(/\s/g, '');
  formattedName =
    formattedName[0].toUpperCase() + formattedName.slice(1).toLowerCase();

  return formattedName;
}

function addDateTo(elem) {
  const time = elem.querySelector('.comments-service__comment-time');

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const monthNames = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
  ];
  const monthName = monthNames[month];

  time.textContent = `${day} ${monthName} ${year} ${addZero(hours)}:${addZero(
    minutes
  )}`;

  time.setAttribute(
    'datetime',
    `${year}-${addZero(month + 1)}-${addZero(day)}T${addZero(hours)}:${addZero(
      minutes
    )}`
  );

  function addZero(num) {
    return String(num).length > 1 ? num : '0' + num;
  }
}

function addAvatarTo(elem) {
  const avatarInput = document.querySelector('#url-avatar');
  const avatar = elem.querySelector('.comments-service__avatar');
  const defaultAvatarPath = './assets/icons/avatar-default.svg';

  avatar.src = avatarInput.value.trim() || defaultAvatarPath;

  avatarInput.value = '';

  avatar.addEventListener('error', function handler() {
    console.log('Ошибка при загрузке изображения.');
    avatar.src = defaultAvatarPath;
    avatar.removeEventListener('focus', handler);
  });
}

function makeChoosingSingleCheckbox() {
  const checkboxes = document.querySelectorAll('.comments-service__checkbox');

  checkboxes.forEach(checkbox =>
    checkbox.addEventListener('change', () => {
      checkboxes.forEach(cb => {
        if (cb !== checkbox) {
          cb.checked = false;
        }
        if (cb === checkbox && !cb.checked) {
          cb.checked = true;
        }
      });
    })
  );
}
