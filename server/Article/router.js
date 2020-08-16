const express = require("express");
const router = express.Router();
// server/article/router.js

const Article = require("./article.model");

router.get("/:articleId", (request, response) => {
  Article.findById(request.params.articleId, (error, article) => {
    if (error) {
      console.log(error);
      response.status(400).json(error);
    } else {
      if (!article) {
        response.sendStatus(410);
      } else {
        response.status(200).json(article);
      }
    }
  });
});

router.post("/", (req, res) => {
  Article.create(req.body, (error, article) => {
    if (error) {
      console.log(`Error creating Article, ${new Date()}: ${error}`);
      res.status(400).json(error);
    } else {
      res.status(201).json(article);
    }
  });
});

module.exports = router;
