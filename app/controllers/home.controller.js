let News = require('../models/news.model')
exports.news = function (req, res) {
    News.getAllNews((data) => {
        res.send(data)
    })
    
}

exports.detail = function (req, res) {
    let data = News.Detail(req.params.id, (response) => {
        res.send({ result: data })
    })
    
}
exports.inputNews = function (req, res) {

}
exports.updateNews = function (req, res) {

}
exports.delete = function (req, res) {

}