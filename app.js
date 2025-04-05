const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const posts = {
    'fundos-imobiliarios-como-viver-de-aluguel-dos-outros': 'fundos-imobiliarios-como-viver-de-aluguel-dos-outros.html',
}

app.use(express.static(path.join(__dirname, 'public')));

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
  console.log(`app runnig on port ${port}`)
})