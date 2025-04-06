const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 3000

const postsDir = path.join(__dirname, 'posts')

const posts = {
    'fundos-imobiliarios-como-gerar-renda-passiva-atraves-do-mercado-imobiliario': '0106042025.json',
    'como-se-organizar-financeiramente-antes-de-investir': '0206042025.json',
}

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {

    const files = fs.readdirSync(postsDir)

    const posts = files
        .filter(file => file !== 'post.json')
        .map((file) => {
            const { content, ...postData } = JSON.parse(fs.readFileSync(path.join(postsDir, file), 'utf-8'))
            return postData
        })
        .sort((a, b) => b.id - a.id)

    res.render('index', { 
        posts
    })
})

app.get('/sobre', (req, res) => {
    res.render('about')
})

app.get('/artigo/:slug', (req, res) => {

    let slug = req.params.slug
    let file = posts[slug]

    if (!file) {
        res.status(404).render('404')
        return
    }

    let post = JSON.parse(fs.readFileSync(path.join(postsDir, file), 'utf-8'))
    
    res.render('post', {
        post
    })
})

app.use((req, res) => {
    res.status(404).render('404')
})

app.listen(port, () => {
  console.log(`App runnig on port ${port}`)
})