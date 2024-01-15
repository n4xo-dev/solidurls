export const getUrlRequest = {
  schema: {
    params: {
      type: 'object',
      properties: {
        urlId: { type: 'string' }
      }
    }
  }
};

export const postUrlRequest = {
  schema: {
    body: {
      type: 'object',
      properties: {
        url: { type: 'string' }
      }
    }
  }
};