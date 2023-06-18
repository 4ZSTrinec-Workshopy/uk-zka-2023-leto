import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'

const fastify = Fastify({ logger: true });

await fastify.register(cors, { })

const prisma = new PrismaClient();

fastify.get('/tasks', async (request, response) => {
  const tasks = await prisma.task.findMany();
  response.send(tasks);
});

fastify.post('/tasks', async(request, response) => {
  const task = await prisma.task.create({
    data: request.body,
  });
  response.code(201).send(task);
})

fastify.delete('/tasks/:id', async(request, response) => {
  const task = await prisma.task.delete({
    where: {
      id: Number(request.params.id)
    }
  });

  response.send(task);
});

fastify.listen({ port: 5000 }, (err, address) => {
  if(err) throw err;
});
