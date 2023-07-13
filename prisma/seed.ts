import { prisma } from './db';

const seed = async () => {
  try {
    // Create records using Prisma client
    const user1 = await prisma.user.create({
      data: {
        username: 'John Doe',
        email: 'john@example.com',
      },
    });

    const user2 = await prisma.user.create({
      data: {
        username: 'Jane Smith',
        email: 'jane@example.com',
      },
    });

    console.log('Created records:', {
      user1,
      user2,
    });

    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
