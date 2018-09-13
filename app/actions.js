function getNotes(user) {
  return {
    type: 'GET_NOTES',
    payload: {
      request: {
        url: '/v1/notes'
      }
    }
  };
}

module.exports = { getNotes };
