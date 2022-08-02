const router = require('express').Router();
const { Category, Product } = require('../../models');



router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'catergory_id'],
      }
    ]
  })
    .then((caterData) => res.json(caterData))
    .catch((err) => {
      res.status(500).json(err);
  });

});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'catergory_id'],
      }
    ]
  })
    .then((caterData) => {
      if (!caterData) {
        res.status(404).json({ message: 'Invalid Category or Does not exist' });
        return;
      }
      res.json(caterData);
    }).catch((err) => {
      res.status(500).json(err);
    }
  );
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then((caterData) => res.json(caterData))
        .catch((err) => {
         res.status(500).json(err);
    }
  );
});

router.put('/:id', (req, res) => {
  Category.update(
    req.body, {
      where: {
        id: req.params.id
      }
    }
  )
    .then((caterData) => {
      if (!caterData) {
        res.status(500).json({ message: 'Invalid Category or Does not exist' });
        return;
      }
      res.json(caterData);
});
});
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((caterData) => {
      if (!caterData) {
        res.status(500).json({ message: 'Invalid Category or Does not exist' });
        return;
      }
      res.json(caterData);
    }).catch((err) => {
      res.status(500).json(err);
    });
  });

  // delete a category by its `id` value

module.exports = router;
