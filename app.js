const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 3000

const postsDir = path.join(__dirname, 'posts')

const posts = {
    'fundos-imobiliarios-como-gerar-renda-passiva-atraves-do-mercado-imobiliario': '0106042025.json',
    'como-se-organizar-financeiramente-antes-de-investir': '0206042025.json',
    'bitcoin-o-futuro-das-financas-digitais': '0127042025.json',
}

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    res.locals.year = new Date().getFullYear();
    next();
});

app.get('/', (req, res) => {

    const files = fs.readdirSync(postsDir)
    const title = 'Home - Money & Code'
    const description = 'Money & Code: artigos sobre carreira, programação e finanças para transformar conhecimento em liberdade financeira.'

    const posts = files
        .filter(file => file !== 'post.json')
        .map((file) => {
            const { content, ...postData } = JSON.parse(fs.readFileSync(path.join(postsDir, file), 'utf-8'))
            return postData
        })
        .sort((a, b) => b.id - a.id)

    res.render('index', { 
        title,
        description,
        posts,
    })
})

app.get('/sobre', (req, res) => {
    const title = 'Sobre - Money & Code'
    const description = 'Saiba mais sobre o Money & Code: uma plataforma que une finanças e tecnologia para ajudar você a melhorar sua vida financeira e profissional.'
    res.render('about', {
        title,
        description,
    })
})

app.get('/privacidade', (req, res) => {
    const title = 'Privacidade - Money & Code'
    const description = 'Veja como protegemos seus dados: nossa política de privacidade explica a coleta, uso e segurança das suas informações pessoais.'
    res.render('privacy', {
        title,
        description,
    })
})

app.get('/contato', (req, res) => {
    const title = 'Contato - Money & Code'
    const description = 'Fale com o Money & Code: envie dúvidas, ideias ou propostas e ajude a construir uma plataforma ainda melhor.'
    res.render('contact', {
        title,
        description,
    })
})

app.get('/artigo/:slug', (req, res) => {

    let slug = req.params.slug
    let file = posts[slug]
    
    if (!file) {
        const title = 'Oops - Money & Code'
        const description = 'Nada encontrado nessa página.'
        res.status(404).render('404', {
            title,
            description,
        })
        return
    }
    
    let post = JSON.parse(fs.readFileSync(path.join(postsDir, file), 'utf-8'))

    const title = `${post.title} - Money & Code`;
    const description = `Leia o artigo: ${post.title}.`

    res.render('post', {
        title,
        description,
        post,
    })
})

app.use((req, res) => {
    const title = 'Oops - Money & Code'
    const description = 'Nada encontrado nessa página.'
    res.status(404).render('404', {
        title,
        description,
    })
})

app.listen(port, () => {
  console.log(`App runnig on port ${port}`)
})