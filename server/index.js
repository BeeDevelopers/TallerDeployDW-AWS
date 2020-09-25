const express = require('express')
const bodyParse = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');


const app = express()
const port = 3000

app.use(bodyParse.json());
app.use(cors());
app.use(morgan('dev'));


let messages = []

app.get('/messages', (req, res) => {
  res.status(200).send(messages)
})

app.post('/message', (req, res) => {
  try {
    if (req.body.content) {
      messages = [...messages, {content: req.body.content}]
      res.status(200).send(messages)
    } else {
      console.log("Content cannot be empty")
      console.log(req.body.content)
      res.status(400).send("Content cannot be empty")
    }
  } catch (error) {
    res.status(401).send(error.message)
  }

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})