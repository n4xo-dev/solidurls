import { FastifyPluginCallback } from 'fastify'
import { decode, encode } from '../services/idEncoding';
import { getUrlSchema, postUrlSchema } from '../dtos';
import { db } from '../db/planetscale';
import { shortURLsTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import { isValidUrl } from '../services/urlValidation';

const root: FastifyPluginCallback =  (fastify, opts, done) => {
  fastify.get<{
    Params: { urlId: string };
  }>('/s/:urlId', getUrlSchema, async (request, reply) => {
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
  }>('/s', postUrlSchema, async (request, reply) => {
    const { url } = request.body;
    if(!isValidUrl(url)) {
      return reply.badRequest('Invalid URL');
    }
    const rows = await db.select({ id: shortURLsTable.id }).from(shortURLsTable).where(eq(shortURLsTable.url, url));
    if (rows.length > 0) {
      const { id } = rows[0];
      const encodedId = encode(id);
      return reply.send({ shortUrl: `${request.hostname}/s/${encodedId}` });
    }
    await db.insert(shortURLsTable).values({ url });
    const results = await db.select({ id: shortURLsTable.id }).from(shortURLsTable).where(eq(shortURLsTable.url, url));
    const { id } = results[0];
    const encodedId = encode(id);
    reply.code(200).send({ shortUrl: `${request.hostname}/s/${encodedId}`});
  })
  
  done();
}

export default root;
