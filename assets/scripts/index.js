const btn = document.querySelector('.comments-service__btn');
btn.addEventListener('click', addNewComment);

function addNewComment() {
  if (hasEmptyField()) {
    const tooltip = document.querySelector('.comments-service__tooltip');

    tooltip.classList.add('visible');
    setTimeout(() => tooltip.classList.remove('visible'), 1500);

    return;
  }

  const commentBox = document.querySelector('.comments-service__comment-box');
  const chat = document.querySelector('.comments-service__chat');

  if (commentBox.classList.contains('hidden')) {
    createComment(commentBox);

    commentBox.classList.remove('hidden');
  } else {
    const newCommentBox = commentBox.cloneNode(true);

    createComment(newCommentBox);

    chat.append(newCommentBox);
  }
}

function hasEmptyField() {
  const nameInput = document.querySelector('#name');
  const commentTextarea = document.querySelector('#comment');

  if (nameInput.value && commentTextarea.value) {
    return false;
  }

  return true;
}

function createComment(elem) {
  const commentTextarea = document.querySelector('#comment');
  const commentText = commentTextarea.value;
  const filteredCommentText = filterSpam(commentText);

  addName(elem);
  addAvatar(elem);

  elem.querySelector('.comments-service__comment').textContent =
    filteredCommentText;

  commentTextarea.value = '';
}

function addName(elem) {
  const nameInput = document.querySelector('#name');
  const name = nameInput.value;
  const reformedName = reformName(name);

  elem.querySelector('.comments-service__nickname').textContent = reformedName;

  nameInput.value = '';
}

function reformName(name) {
  let formattedName = name.replace(/\s/g, '');
  formattedName =
    formattedName[0].toUpperCase() + formattedName.slice(1).toLowerCase();

  return formattedName;
}

function addAvatar(elem) {
  const avatarInput = document.querySelector('#url-avatar');
  const avatar = elem.querySelector('img');

  avatar.src = avatarInput.value.trim() || './assets/icons/avatar-default.svg';

  avatarInput.value = '';
}

function filterSpam(comment) {
  return comment
    .replace(/viagra/gi, '***')
    .replace(/xxx/gi, '***')
    .replace(/виагра/gi, '***');
}
