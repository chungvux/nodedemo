const express = require('express')
const newsRoute = express.Router()
const axios = require('axios')
const db = require('../connection/connect')



newsRoute.get('/', async (req, res) => {
    let getAll = 'SELECT * FROM node'
    try {
        db.query(getAll, (err, news) => {
            if (!err) {
                res.render('news', { articles: news })
                // res.send(news)
            } else {
                console.log(err)
            }
        })
    }
    catch (err) {
        if (err.response) {
            res.render('news', { articles: null })
            console.error(err.response.data)
            console.error(err.response.status)
            console.error(err.response.headers)
        } else if (err.request) {
            res.render('news', { articles: null })
            console.log(err.request)
        } else {
            res.render('news', { articles: null })
            console.error(err.message)
        }
    }
})

newsRoute.get('/news/:id', async (req, res) => {
    let articleID = req.params.id
    let getArticle = await axios.get(`https://raddy.co.uk/wp-json/wp/v2/posts/${articleID}`)
    res.render('singleArticle', { article: getArticle.data })
})

newsRoute.post('/news', async (req, res) => {
    req.body.id = Math.floor(Math.random() * (10000 - 1000)) + 1000
    const news = req.body
    let addNews = "INSERT INTO node SET ?"
    try {
        db.query(addNews, news, (err, news) => {
            if (!err) {
                res.redirect('/news')
            } else {
                console.error(err)
            }
        })
    } catch (err) {

    }
})

// update

newsRoute.post('/editnews', async (req, res) => {
    const news = req.body
    let editNews = 'UPDATE node SET title_rendered = ?, content_rendered = ?, excerpt_rendered = ?, head_json_title = ?, thumbnail_url = ? WHERE id=?'
    
    try {
        db.query(editNews, [news.title_rendered, news.content_rendered, news.excerpt_rendered, news.head_json_title, news.thumbnail_url, news.id],(err, news) => {
            if (!err) {
                res.redirect('/news')
            } else {
                console.error(err)
            }
        })
    } catch (err) {

    }
})

newsRoute.get('/delete/:id', async (req, res) => {
    let articleID = req.params.id
    let getNewsByID = 'DELETE FROM node WHERE id = ' + articleID

    try {
        db.query(getNewsByID, (err, news) => {
            if (!err) {
                res.redirect('/news')
            } else {
                console.log(err)
            }
        })
    }
    catch (err) {
        if (err.response) {
            res.render('singleArticle', { article: null })
            console.error(err.response.data)
            console.error(err.response.status)
            console.error(err.response.headers)
        } else if (err.request) {
            res.render('singleArticle', { article: null })
            console.log(err.request)
        } else {
            res.render('singleArticle', { article: null })
            console.error(err.message)
        }
    }
})

newsRoute.post('/search', async (req, res) => {
    let search = req.body.search

    try {
        let sqlSearch = `SELECT * FROM node WHERE title_rendered LIKE '%${search}%'`
        db.query(sqlSearch, (err, news) => {
            if (!err) {
                res.render('searchArticle', { articles: news })
            } else {
                console.log(err)
            }
        })

    }
    catch (err) {
        if (err.response) {
            res.render('searchArticle', { articles: null })
            console.error(err.response.data)
            console.error(err.response.status)
            console.error(err.response.headers)
        } else if (err.request) {
            res.render('searchArticle', { articles: null })
            console.log(err.request)
        } else {
            res.render('searchArticle', { articles: null })
            console.error(err.message)
        }
    }
})


newsRoute.get('/news/json/:id', async (req, res) => {
    let articleID = req.params.id
    let getID = `SELECT * FROM node WHERE id=${articleID}`
    try {
        db.query(getID, (err, news) => {
            if (!err) {
                // res.render('singleArticle', { oneNews: news })
                res.send(news)
            } else {
                console.log(err)
            }
        })
    }
    catch (err) {
        if (err.response) {
            res.render('news', { articles: null })
            console.error(err.response.data)
            console.error(err.response.status)
            console.error(err.response.headers)
        } else if (err.request) {
            res.render('news', { articles: null })
            console.log(err.request)
        } else {
            res.render('news', { articles: null })
            console.error(err.message)
        }
    }
})


module.exports = newsRoute