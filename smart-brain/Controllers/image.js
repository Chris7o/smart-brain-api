const Clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: '52de227ee79f4425b6d5fa3aaed6437f'
});
const handleApiCall = (req, res) =>{
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
  .then(data => {
  	res.json(data) 
  })
  .catch(err => res.status(400).json('unable to work with API'))
}
const handleImage = (req, res, db)=> {
	const{id} = req.body;
db('users').where('id', '=', id)
  .increment('enteries',1)
  .returning('enteries')
  .then(enteries => {
  	res.json(enteries[0])
  } )
  .catch(err => res.status(400).json('unable to get enteries'))
}

module.exports = {
	handleImage,
	handleApiCall
}