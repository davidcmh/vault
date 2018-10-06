function getNotes(user) {
  return {
    type: 'GET_NOTES',
    payload: {
      request: {
        method: 'post',
        url: '/v1/notes',
        data: {page: 3, pagesize: 15}
      },
    }
  };
}

module.exports = { getNotes };
