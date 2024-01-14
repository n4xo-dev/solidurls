import { FastifyPluginCallback } from 'fastify'
import { decode } from '../services/idEncoding';
import { getUrlRequest, postUrlRequest } from '../schemas';

const root: FastifyPluginCallback =  (fastify, opts, done) => {
  fastify.get<{
    Params: { urlId: string };
  }>('/s/:urlId', getUrlRequest, (request, reply) => {
    const { urlId } = request.params;
    request.log.info(`Received id: ${urlId}`);
    const id = decode(urlId);
    request.log.info(`Decoded id: ${id}`);
    reply.send({ id });
  })

  fastify.post<{
    Body: { url: string };
  }>('/s', postUrlRequest, (request, reply) => {
    const { url } = request.body;
    request.log.info(`Received url: ${url}`);
    const id = 123456789;
    request.log.info(`Encoded id: ${id}`);
    reply.send({ id });
  })
  
  done();
}

export default root;
