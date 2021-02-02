const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
  // TODO
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };
  repositories.push(repository);
  return response.status(201).json(repository);
  // TODO
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repositoriesIndex = repositories.findIndex(repositories => repositories.id == id);
  if (repositoriesIndex === -1) {
    return response.status(400).json({ error: 'Respository does not exists.' });
  }
  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoriesIndex].likes
  }
  repositories[repositoriesIndex] = repository;
  return response.json(repository);

});


app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoriesIndex = repositories.findIndex(repositories => repositories.id == id);
  if (repositoriesIndex >= 0) {
    repositories.splice(repositoriesIndex, 1)
  } else {
    return response.status(400).json({ error: 'Respository does not exists.' });
  }
  return response.status(204).send();
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositoriesIndex = repositories.findIndex(repository =>
    repository.id === id);
  if (repositoriesIndex === -1) {
    return response.status(400).json({ error: 'Respository does not exists.' });

  }
  repositories[repositoriesIndex].likes++;
  return response.json(repositories[repositoriesIndex]);
  // TODO
});

module.exports = app;
