const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb')
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId

// port
const port = process.env.PORT || 5000

// main app
const app = express()

// middleware
app.use(cors())
app.use(express.json())

// route
app.get('/', (req, res) => {
  res.send('all ok')
})

// dataBase
// user name: mongodbUser1;
// pass: rrTiOMc4i3ONEhd6
const uri =
  'mongodb+srv://mongodbUser1:rrTiOMc4i3ONEhd6@cluster0.g65yn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

const serverRunning = async () => {
  try {
    await client.connect()
    const userCollection = client.db('foodExpress').collection('user')

    // get api
    app.get('/user', async (req, res) => {
      try {
        const query = {}
        const cursor = userCollection.find(query)
        const allUsers = await cursor.toArray()
        res.send(allUsers)
      } finally {
      }
    })

    app.get('/user/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }
      const result = await userCollection.findOne(query)
      // console.log(result)
      res.send(result)
    })

    // post api
    app.post('/user', async (req, res) => {
      const newUser = req.body
      const result = await userCollection.insertOne(newUser)
      res.send(result)
    })

    // put
    app.put('/user/:id', async (req, res) => {
      const { id } = req.params
      const { name, email } = req.body

      const filter = { _id: ObjectId(id) }
      const options = { upsert: true }
      const updateUserDoc = {
        $set: {
          name,
          email,
        },
      }

      const result = await userCollection.updateOne(
        filter,
        updateUserDoc,
        options,
      )

      res.send(result)
    })

    // delete api
    app.delete('/user/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }
      const result = await userCollection.deleteOne(query)

      res.send(result)
    })
  } finally {
    console.log('db connected')
  }
}

serverRunning().catch(console.dir)

// server start
app.listen(port, () => {
  console.log(`the server is runing on port ${port}`)
})
