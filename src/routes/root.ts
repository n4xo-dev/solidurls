import { FastifyPluginCallback } from 'fastify'
import { decode, encode } from '../services/idEncoding';
import { getUrlRequest, postUrlRequest } from '../dtos';
import { db } from '../db/planetscale';
import { shortURLsTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import { getValidUrl } from '../services/urlValidation';

const root: FastifyPluginCallback =  (fastify, opts, done) => {
  fastify.get<{
    Params: { urlId: string };
  }>('/s/:urlId', getUrlRequest, async (request, reply) => {
    const { urlId } = request.params;
    const id = decode(urlId);
    const rows = await db.select({ url: shortURLsTable.url }).from(shortURLsTable).where(eq(shortURLsTable.id, id));
    if (rows.length <= 0) {
      return reply.notFound();
    }
    const { url } = rows[0];
    reply.redirect(url);
  })

  fastify.post<{
    Body: { url: string };
  }>('/s', postUrlRequest, async (request, reply) => {
    const { url } = request.body;
    const validUrl = getValidUrl(url);
    if(!validUrl) {
      return reply.badRequest('Invalid URL');
    }
    const rows = await db.select({ id: shortURLsTable.id }).from(shortURLsTable).where(eq(shortURLsTable.url, validUrl));
    if (rows.length > 0) {
      const { id } = rows[0];
      const encodedId = encode(id);
      return reply.send({ shortUrl: `${request.hostname}/s/${encodedId}` });
    }
    const res = await db.insert(shortURLsTable).values({ url });
    const { insertId } = res[0];
    const encodedId = encode(insertId);
    reply.send({ shortUrl: `${request.hostname}/s/${encodedId}`});
  })
  
  done();
}

export default root;
