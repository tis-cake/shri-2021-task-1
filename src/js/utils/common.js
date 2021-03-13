const getSelectedUserIndex = (selectedUserId, users) => {
  let selectedUserIndex;

  if (selectedUserId !== null && selectedUserId !== undefined) {
    selectedUserIndex = users.findIndex((user) => user.id === selectedUserId);
  }

  return selectedUserIndex;
};

const cropExtension = (el) => {
  return el.replace(/\.[^/.]+$/, '');
};

export { getSelectedUserIndex, cropExtension };
