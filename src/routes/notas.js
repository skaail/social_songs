const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Nota = require('../models/Notas');
const albumArt = require( 'album-art' )


router.post('/notas', 
    [auth, [check('album', 'O Album é obrigatório').not().isEmpty(), check('nota', 'A nota é obrigatória').not().isEmpty()]],

    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(422).json({message: "Campos inválidos"})
        }

        try{
            const nota = new Nota({
                album: req.body.album,
                nota: req.body.nota,
                band: req.body.band,
                art: await albumArt(req.body.band, {album: req.body.album}),
                author: req.user.id
            })

            await nota.save()

            res.json({
                id: nota.id,
                album: nota.album,
                band: nota.band,
                nota: nota.nota,
                art: nota.art,
                createdAt: nota.createdAt
            })
        } catch (err) {
            console.log(err.message)
            res.status(500).send("Server Error")
        }
    }

)
router.get('/notas', async (req, res) => {
    try {
        
        const filter = {};
        const all = await Nota.find(filter);
        res.json({notas: all})

    } catch (err) {
        
        console.error(err.message);
        res.status(500).send('Server Error');

    }
  });


module.exports = router