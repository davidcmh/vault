function getNotes(page) {
  return {
    type: 'GET_NOTES',
    payload: {
      request: {
        method: 'post',
        url: '/v1/notes',
        data: {
          page,
          pageSize: 25}
      },
    }
  };
}

module.exports = { getNotes };
