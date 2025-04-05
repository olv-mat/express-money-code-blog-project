const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const posts = {
    "teste-1": "artigo-teste-1.html",
    "teste-2": "artigo-teste-2.html"
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'))
})

app.get('/artigo/:slug', (req, res) => {

    let slug = req.params.slug
    let template = posts[slug]

    if (!template) {
        res.status(404).sendFile(path.join(__dirname, 'public', '404.html'))
        return
    }

    res.sendFile(path.join(__dirname, 'public', 'articles', template))
})

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'))
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})