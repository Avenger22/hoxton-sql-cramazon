import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})

const users = [
  {
    id: 1,
    email: 'person1@email.com',
    name: 'Person1'
  },
  {
    id: 2,
    email: 'person2@email.com',
    name: 'Person2'
  },
  {
    id: 3,
    email: 'person3@email.com',
    name: 'Person3'
  }
]

const userItems = [
  {
    id: 1,
    userId: 1,
    itemId: 2
  },
  {
    id: 2,
    userId: 1,
    itemId: 3
  },
  {
    id: 3,
    userId: 3,
    itemId: 1
  },
  {
    id: 4,
    userId: 3,
    itemId: 2
  },
  {
    id: 5,
    userId: 2,
    itemId: 2
  },
  {
    id: 6,
    userId: 2,
    itemId: 3
  }
]

const items = [
  {
    id: 1,
    title: 'item1',
    image: "item1.jpg"
  },
  {
    id: 2,
    title: 'item2',
    image: "item2.jpg"
  },
  {
    id: 3,
    title: 'item3',
    image: "item3.jpg"
  }
]

const orders = [
    {
        id: 1,
        quantity: 14,
        userId: 1
    },
    {
        id: 2,
        quantity: 3,
        userId: 2
    },
    {
        id: 3,
        quantity: 6,
        userId: 3
    }
]

async function createStuff () {

  await prisma.userItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.user.deleteMany()
  await prisma.item.deleteMany()

  for (const user of users) {
    await prisma.user.create({ data: user })
  }

  for (const item of items) {
    await prisma.item.create({ data: item })
  }

  for (const userItem of userItems) {
    await prisma.userItem.create({ data: userItem })
  }

  for (const order of orders) {
    await prisma.order.create({ data: order })
  }

}

createStuff()