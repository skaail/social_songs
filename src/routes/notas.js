const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Nota = require('../models/Notas');

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
                author: req.user.id
            })

            await nota.save()

            res.json({
                id: nota.id,
                album: nota.album,
                nota: nota.nota,
                createdAt: nota.createdAt
            })
        } catch (err) {
            console.log(err.message)
            res.status(500).send("Server Error")
        }
    }

)

module.exports = router