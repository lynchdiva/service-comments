'use strict';

const btn = document.querySelector('.comments-service__btn');
btn.addEventListener('click', showComment);

function showComment() {
  if (hasEmptyField()) {
    showTooltip();
    return;
  }

  const commentBox = document.querySelector('.comments-service__comment-box');
  const chat = document.querySelector('.comments-service__chat');

  if (commentBox.classList.contains('hidden')) {
    addCommentTo(commentBox);

    commentBox.classList.remove('hidden');
  } else {
    const newCommentBox = commentBox.cloneNode(true);

    addCommentTo(newCommentBox);

    chat.append(newCommentBox);
  }
}

function hasEmptyField() {
  const requiredFields = document.querySelectorAll('.required');
  let anyEmpty;

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
    this.classList.remove('warning');
    this.removeEventListener('focus', handler);
  });
}

function showTooltip() {
  const tooltip = document.querySelector('.comments-service__tooltip');
  tooltip.classList.add('visible');

  setTimeout(() => tooltip.classList.remove('visible'), 1500);
}

function addCommentTo(elem) {
  const commentTextarea = document.querySelector('#comment');
  const commentText = commentTextarea.value;
  const filteredCommentText = getFilteredComment(commentText);

  addNameTo(elem);
  addAvatarTo(elem);

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
  const name = nameInput.value;
  const reformedName = getReformedName(name);

  elem.querySelector('.comments-service__nickname').textContent = reformedName;

  nameInput.value = '';
}

function getReformedName(name) {
  let formattedName = name.replace(/\s/g, '');
  formattedName =
    formattedName[0].toUpperCase() + formattedName.slice(1).toLowerCase();

  return formattedName;
}

function addAvatarTo(elem) {
  const avatarInput = document.querySelector('#url-avatar');
  const avatar = elem.querySelector('.comments-service__avatar');
  const defaultAvatarPath = './assets/icons/avatar-default.svg';

  avatar.src = avatarInput.value.trim() || defaultAvatarPath;

  avatarInput.value = '';

  avatar.addEventListener('error', function handler() {
    console.log('Ошибка при загрузке изображения.');
    this.src = defaultAvatarPath;
    avatar.removeEventListener('focus', handler);
  });
}
