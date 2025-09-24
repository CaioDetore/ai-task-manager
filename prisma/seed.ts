import { faker } from '@faker-js/faker';
import prisma from './prisma';

async function main() {
  // Deletar dados antigos
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  await prisma.task.deleteMany();

  // Criar 20 usuários
  const users = [];
  for (let i = 0; i < 20; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email().toLowerCase(),
        name: faker.person.fullName(),
        age: faker.number.int({ min: 18, max: 70 }),
      },
    });
    users.push(user);
  }

  // Criar 60 posts
  for (let i = 0; i < 60; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    await prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs({ min: 1, max: 3 }),
        published: faker.datatype.boolean(),
        author_id: randomUser.id,
      },
    });
  }

  // Criar 20 tarefas
  for (let i = 0; i < 20; i++) {
    const steps = [
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
    ];
    const acceptanceCriteria = [
      faker.lorem.sentence(),
      faker.lorem.sentence(),
    ];
    const suggestedTests = [
      `it('${faker.lorem.words(5)}')`,
      `it('${faker.lorem.words(5)}')`,
    ];
    const chatHistory = [
      { role: 'user', content: faker.lorem.sentence() },
      { role: 'assistant', content: faker.lorem.sentence() },
    ];
    await prisma.task.create({
      data: {
        title: faker.hacker.phrase(),
        description: faker.lorem.paragraph(),
        estimated_time: `${faker.number.int({ min: 1, max: 5 })} dias`,
        steps: JSON.stringify(steps),
        acceptance_criteria: JSON.stringify(acceptanceCriteria),
        suggested_tests: JSON.stringify(suggestedTests),
        implementation_suggestion: faker.lorem.sentences(2),
        content: `# ${faker.hacker.phrase()}\n${faker.lorem.paragraph()}`,
        chat_history: JSON.stringify(chatHistory),
      },
    });
  }

  console.log('Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
