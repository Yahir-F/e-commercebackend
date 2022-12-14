const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');



router.get('/', (req, res) => {

    Tag.findAll({
        attributes: ['id', 'tag_name'],
        include: [
            {
                model: Product,
                attributes: ['id', 'product_name', 'price', 'category_id']
            }
        ]
    })
        .then(TagData => res.json(TagData))
        .catch(err => {
            console.log(err);

            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Tag.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'tag_name'],

        include: [
            {
                model: Product,
                attributes: ['id', 'product_name', 'price', 'category_id']
            }
        ]
    })
        .then(TagData => {

            if (!TagData) {

                res.status(404).json({ message: 'Incorrect Tag or it does notexist' });
                return;
            }
            res.json(TagData);
        })
        .catch(err => {
            console.log(err);

            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    Tag.create({
        tag_name: req.body.tag_name
    })
        .then(TagData => res.json(TagData))

        .catch(err => {

            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    
    Tag.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(TagData => {
            if (!TagData[0]) {
          
              res.status(404).json({ message: 'No Data or Incorrect Tag' });
                return;
            }
            res.json(TagData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    
    Tag.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(TagData => {
        
          if (!TagData) {
                res.status(404).json({ message: 'No Data or Incorrect Tag' });
                return;
            }
            res.json(TagData);
        })
        .catch(err => {
            console.log(err);
        
            res.status(500).json(err);
        });
});

module.exports = router;