// #region 'Importing and configuration of Prisma'
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})

const app = express()
app.use(cors())
app.use(express.json())
// #endregion

// #region "REST API end points"

// #region 'users endpoints'
app.get('/users', async (req, res) => {

  try {

    const users = await prisma.user.findMany({
      include: { 
        items: { include : { item: true } } , orders: true 
      }
    })

    res.send(users)

  }

  catch(error) {
    //@ts-ignore
    res.status(400).send(`<pre>${error.message}</pre>`)
  }

})

app.get('/users/:id', async (req, res) => {

  const idParam = Number(req.params.id)

  try {

    const user = await prisma.user.findFirst({
      where: { id: idParam },
      include: { 
        items: { include : { item: true } } , orders: true }
    })

    if (user) {
      res.send(user)
    } 
    
    else {
      res.status(404).send({ error: 'User not found.' })
    }

  }

  catch(error) {
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.post('/users', async (req, res) => {
    
  const { email, name } = req.body
  
  const newUser = {
    email: email, 
    name: name
  }

  try {

    const userCheck = await prisma.user.findFirst({ where: { email: newUser.email } })
    
    if (userCheck) {
      res.status(404).send({ error: 'User has an already registered email try different email.' })
    }

    else {

      try {
        const createdUser = await prisma.user.create({data: newUser})
        res.send(createdUser)
      }

      catch(error) {
        //@ts-ignore
        res.status(400).send(`<prev>${error.message}</prev>`)
      }

    }

  }

  catch(error) {
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.delete('/users/:id', async (req, res) => {

  const idParam = req.params.id

  try {

    const user = await prisma.user.findFirst({
      where: {
        id: Number(idParam)
      }
    })

    if (user) {

      await prisma.user.delete({ 
        where: { id: Number(idParam) }
      })

      res.send({ message: 'user deleted.' })

    }

    else {
      res.status(404).send({ error: 'user not found.' })
    }

  }

  catch(error) {
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.patch('/users/:id', async (req, res) => {

  const idParam = req.params.id;
  const { email, name } = req.body

  const userData = {
    email: email,
    name: name
  }

  try {

    const user = await prisma.user.update({
      where: {
        id: Number(idParam),
      },
      data: userData
    })

    res.send(user)

  } 
  
  catch(error) {
    res.status(404).send({message: error})
  }

})
// #endregion

// #region 'userItems endpoints'
app.get('/userItems', async (req, res) => {

  try {
    const userItems = await prisma.userItem.findMany()
    res.send(userItems)
  }

  catch(error) {
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.get('/userItems/:id', async (req, res) => {

  const idParam = Number(req.params.id)

  try {

    const userItem = await prisma.userItem.findFirst({
      where: { id: idParam }
    })

    if (userItem) {
      res.send(userItem)
    } 
    
    else {
      res.status(404).send({ error: 'userItem not found.' })
    }

  }

  catch(error){
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.post('/userItems', async (req, res) => {
    
  const { userId, itemId } = req.body
  
  const newUserItem = {
    userId: userId,
    itemId: itemId
  }

  try {

    const userItemCheck = await prisma.userItem.findFirst({ where: { userId: newUserItem.userId, itemId: newUserItem.itemId } })
    
    if (userItemCheck) {
      res.status(404).send({ error: 'UserItem has an already registered id combination try different combination.' })
    }

    else {

      try {
        const createdUserItem = await prisma.userItem.create({data: newUserItem})
        res.send(createdUserItem)
      }

      catch(error) {
        //@ts-ignore
        res.status(400).send(`<prev>${error.message}</prev>`)
      }

    }

  }

  catch(error) {
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.delete('/userItems/:id', async (req, res) => {

  const idParam = req.params.id

  try {

    const userItem = await prisma.userItem.findFirst({
      where: {
        id: Number(idParam)
      }
    })

    if (userItem) {

      await prisma.userItem.delete({ 
        where: { id: Number(idParam) }
      })

      res.send({ message: 'userItem deleted.' })

    }

    else {
      res.status(404).send({ error: 'userItem not found.' })
    }

  }

  catch(error) {
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.patch('/userHobbys/:id', async (req, res) => {

  const idParam = req.params.id;
  const { userId, itemId } = req.body

  const userItemData = {
    userId: userId,
    itemId: itemId
  }

  try {

    const userItem = await prisma.userItem.update({
      where: {
        id: Number(idParam),
      },
      data: userItemData
    })

    res.send(userItem)

  } 
  
  catch(error) {
    res.status(404).send({message: error})
  }

})
// #endregion

// #region "items endpoints"
app.get('/items', async (req, res) => {

  try {

    const items = await prisma.item.findMany({
      include: { 
        users: { include : { user: true } } 
      }
    })

    res.send(items)

  }

  catch(error) {
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.get('/items/:id', async (req, res) => {

  const idParam = Number(req.params.id)

  try {

    const item = await prisma.item.findFirst({
      where: { id: idParam },
      include: { users: { include : { user: true } } }
    })

    if (item) {
      res.send(item)
    } 
    
    else {
      res.status(404).send({ error: 'item not found.' })
    }

  }

  catch(error){
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.post('/items', async (req, res) => {
    
  const { title, image } = req.body
  
  const newItem = {
    title: title, 
    image: image
  }

  try {

    const itemCheck = await prisma.item.findFirst({ where: { title: newItem.title } })
    
    if (itemCheck) {
      res.status(404).send({ error: 'item has an already registered name try different name.' })
    }

    else {

      try {
        const createdItem = await prisma.item.create({data: newItem})
        res.send(createdItem)
      }

      catch(error) {
        //@ts-ignore
        res.status(400).send(`<prev>${error.message}</prev>`)
      }

    }

  }

  catch(error) {
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.delete('/items/:id', async (req, res) => {

  const idParam = req.params.id
  
  try {

    const item = await prisma.item.findFirst({
      where: {
        id: Number(idParam)
      }
    })

    if (item) {

      await prisma.item.delete({ 
        where: { id: Number(idParam) }
      })

      res.send({ message: 'item deleted.' })

    }

    else {
      res.status(404).send({ error: 'item not found.' })
    }

  }

  catch(error) {
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.patch('/items/:id', async (req, res) => {

  const idParam = req.params.id;
  const { title, image} = req.body
  
  const itemData = {
    title: title,
    image: image
  }

  try {

    const item = await prisma.item.update({
      where: {
        id: Number(idParam),
      },
      data: itemData
    })

    res.send(item)

  } 
  
  catch(error) {
    res.status(404).send({message: error})
  }

})
// #endregion

// #region "orders endpoints"
app.get('/orders', async (req, res) => {

  try {

    const orders = await prisma.order.findMany({
      include: { user: true }
    })

    res.send(orders)

  }

  catch(error) {
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.get('/orders/:id', async (req, res) => {

  const idParam = Number(req.params.id)

  try {

    const order = await prisma.order.findFirst({
      where: { id: idParam },
      include: { user: true}
    })

    if (order) {
      res.send(order)
    } 
    
    else {
      res.status(404).send({ error: 'order not found.' })
    }

  }

  catch(error){
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.post('/orders', async (req, res) => {
    
  const { quantity, userId } = req.body
  
  const newOrder = {
    quantity: quantity,
    userId: userId
  }

  try {
    const createdItem = await prisma.order.create({data: newOrder})
    res.send(createdItem) 
  }

  catch(error) {
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.delete('/orders/:id', async (req, res) => {

  const idParam = req.params.id
  
  try {

    const order = await prisma.order.findFirst({
      where: {
        id: Number(idParam)
      }
    })

    if (order) {

      await prisma.order.delete({ 
        where: { id: Number(idParam) }
      })

      res.send({ message: 'order deleted.' })

    }

    else {
      res.status(404).send({ error: 'order not found.' })
    }

  }

  catch(error) {
    //@ts-ignore
    res.status(400).send(`<prev>${error.message}</prev>`)
  }

})

app.patch('/orders/:id', async (req, res) => {

  const idParam = req.params.id;
  const { quantity, userId } = req.body
  
  const orderData = {
    quantity: quantity,
    userId: userId
  }

  try {

    const order = await prisma.order.update({
      where: {
        id: Number(idParam),
      },
      data: orderData
    })

    res.send(order)

  } 
  
  catch(error) {
    res.status(404).send({message: error})
  }

})
// #endregion

// #endregion

app.listen(4000, () => {
  console.log(`Server up: http://localhost:4000`)
})