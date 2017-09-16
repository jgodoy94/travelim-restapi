var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://publico:publico@ds137464.mlab.com:37464/travelimtest',['locations']);

//Obtener todas las locaciones
router.get(
    '/locations', function(req, res, next){
        db.locations.find(
            function(err, locations){
                if(err){
                    res.send(err);
                }
                res.json(locations);
            }
        );
    }
);

//Obtener una locacion
router.get(
    '/locations/:id', function(req, res, next){
        db.locations.findOne(
            {_id: req.params.id},
            function(err, location){
                if(err){
                    res.send(err);
                }
                res.json(location);
            }
        );
    }
);

//Guardar una locacion
router.post(
    '/location', function(req, res, next){
        var location = req.body;
        if(!location.mena || !location.tila || !location.longi){
            res.status(400);
            res.json(
                {"error":"Bad Data"}
            );
        } else {
            db.locations.save(
                location,
                function(){}
            );
        }
    }
);

//Borrar una locacion
router.delete(
    '/locations/:id', function(req, res, next){
        db.locations.remove(
            {_id: req.params.id}, function(err, location){
                if(err){
                    res.send(err);
                }
                res.json(location);
            }
        );
    }
);

//actualizar una locacion
router.put(
    '/locations/:id', function(req, res, next){
        var location = req.body;
        var updLocation = {};

        if(location.mena){
            updLocation.mena = location.mena;

        }

        if(location.crides){
            updLocation.crides = location.crides;

        }

        if(location.tila){
            updLocation.tila = location.tilaa;

        }

        if(location.longi){
            updLocation.longi = location.longi;

        }

        if(location.ubic){
            updLocation.ubic = location.ubic;

        }

        if(location.geima){
            updLocation.geima = location.geima;

        }

        if(!updLocation){
            res.status(400);
            res.json({
                "error":"Bad Data"
            });
        } else {
            db.locations.update(
                {_id: req.params.id},updLocation, {}, function(err, location){
                    if(err){
                        res.send(err);
                    }
                    res.json(location);
                }
            );
        }

    }
);

module.exports = router;