const express = require('express');
const app = express();
const port = 3000;
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("postgres://misternuks:'I like big butt5'@localhost:5432/beer_site_dev");
const Beer = require('./models').Beer;

app.use(express.json());

// Create a beer
app.post('/beers', async (req, res) => {
  try {
    const beer = await Beer.create(req.body);
    res.status(201).json(beer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all beers
app.get('/beers', async (req, res) => {
  try {
    const beers = await Beer.findAll();
    res.status(200).json(beers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a single beer
app.get('/beers/:id', async (req, res) => {
  try {
    const beer = await Beer.findByPk(req.params.id);
    if (beer) {
      res.status(200).json(beer);
    } else {
      res.status(404).json({ error: 'Beer not found'});
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a beer
app.put('beers/:id', async (req, res) => {
  try {
    const [updated] = await Beer.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedBeer = await Beer.findByPk(req.params.id);
      res.status(200).json(updatedBeer);
    } else {
      res.status(404).json({ error: error.message });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a beer
app.delete('/beers/:id', async (req, res) => {
  try {
    const deleted = await Beer.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Beer not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
