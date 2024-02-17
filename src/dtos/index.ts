export const getUrlSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        urlId: { type: 'string' }
      }
    }
  }
};

export const postUrlSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        url: { type: 'string' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          shortUrl: { type: 'string' }
        }
      }
    }
  }
};