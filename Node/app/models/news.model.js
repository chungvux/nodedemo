const db = require('../connect/connect')

News = (news) => {
    this.id = news.id;
    this.title_rendered = news.title_rendered;
    this.content_rendered = news.content_rendered;
    this.excerpt_rendered = news.excerpt_rendered;
    this.head_json_title = news.head_json_title;
    this.thumbnail_url = news.thumbnail_url;
}

News.getAllNews = (result) => {
    let sql = "SELECT * FROM node"
    db.query(sql, (err, news) => {
        if (err) {
            result(null)
        } else {
            result(news)
        }
    })
}

News.Detail = (id, result) => {
    db.query('SELECT * FROM node WHERE id=' + id, (err, news) => {
        if (err) {
            result(err)
        } else {
            result(news)
        }
    })
}


News.addNews = (news, result) => {
    let sql = 'INSERT INTO news SET ?'
    db.query(sql, news, (err, news) => {
        if (err) {
            result(null)
        } else {
            result({ id: news.insertId, ...news })
        }
    })
}


module.exports = News