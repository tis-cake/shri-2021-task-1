const getSelectedUserIndex = (selectedUserId, users) => {
  let selectedUserIndex;

  if (selectedUserId !== null && selectedUserId !== undefined) {
    selectedUserIndex = users.findIndex((user) => user.id === selectedUserId);
  }

  return selectedUserIndex;
};

const getIntegerNumber = (string) => {
  return parseInt(string.match(/\d+/), 10);
};

const cropExtension = (el) => {
  return el.replace(/\.[^/.]+$/, '');
};

export { getSelectedUserIndex, getIntegerNumber, cropExtension };
