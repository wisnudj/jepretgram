const Foto = require('../models/foto')

class fotoController {

  static createfoto(req, res) {
    Foto.create({
      caption: req.body.caption,
      urlimg: req.body.urlimg,
      by: req.header.decoded._id
    }).then((hasilfoto) => {
      res.send(hasilfoto)
    }).catch((err) => {
      res.send(err)
    })
  }

  static read(req, res) {
    Foto.find().populate('by').populate('like').exec((err, hasilfoto) => {
      res.status(200).send(hasil)
    }).catch((err) => {
      res.status(400).send(err)
    })
  }

  static delete(req, res) {
    Foto.findOne({_id: req.params.id}).then((hasilfoto) => {
      if(!hasilfoto) {
        res.status(404).send({})
      }
      else {
        Foto.deleteOne({_id: req.params.id}).then((hasilhapus) => {
          res.status(200).send(hasilhapus)
        }).catch((err) => {
          res.status(404).send(err)
        })
      }
    })
  },

  static votelike(req, res) {
    Foto.findOne({_id: req.params.id}).then((hasilfoto) => {
      if(!hasilfoto) {
        res.status(404).send({})
      } else {
        if(req.header.decoded._id == hasilfoto.by) {
          res.status(404).send({'msg': 'tidak boleh like foto sendiri'})
        }
        else {
          if(hasilfoto.like.indexOf(req.header.decoded._id) == -1) {
            hasilfoto.like.push(req.header.decoded._id)
            hasilfoto.save(function (err) {
              if(err) {
                res.status(400).send(err)
              }
              else {
                Foto.findOne({_id: req.params.id}).populate('by').populate('like').exec((err, hasilpopulate) => {
                  res.status(200).send(hasilpopulate)
                })
              }
            })
          } else {
            hasilfoto.like.forEach((hasil, index) => {
              if(hasil == req.header.decoded._id) {
                hasilfoto.like.splice(index, 1)
                return
              }
            })
            hasilfoto.save(function(err) {
              if(err) {
                res.status(404).send(err)
              } else {
                Foto.findOne({_id: req.params.id}).populate('by').populate('like').exec((err, hasilpopulate) => {
                  res.status(200).send(hasilpopulate)
                }).catch((err) => {
                  res.status(404).send(err)
                })
              }
            })
          }
        }
      }
    }).catch()
  }

}
