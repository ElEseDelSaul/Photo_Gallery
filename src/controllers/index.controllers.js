const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const { unlink } = require('fs-extra');
//Model
const Photo = require('../models/Photo');


indexCtrl = {};

indexCtrl.listGames = async (req, res) => {
    const photos = await Photo.find().lean();
    console.log(photos);
    res.render('partials/images-list', { photos });
}

indexCtrl.renderFomAdd = async (req, res) => {
    const photos = await Photo.find().lean();
    //photos.createdAt = req.app.locals.format(photos.createdAt)
    photos.forEach(photo => {
        photo.createdAt = res.locals.format(photo.createdAt);
        //console.log(res.locals.format(photo.createdAt))
    })
    res.render('partials/image-form', { photos });
}

indexCtrl.addNewGame = async (req, res) => {
    const { title, description } = req.body;
    const { path } = req.file;
    //Agregar imagen en Cloudinary
    const result = await cloudinary.v2.uploader.upload(path);   //Subir imagen a Cloudinary
    const { url, public_id } = result;
    //Crear objeto y guardar en MongoDB
    const newPhoto = new Photo({ title, description, imageUrl: url, public_id });
    await newPhoto.save();
    //console.log(req.body); desde el body
    //console.log(req.file); desde multer
    //console.log(result);  desde cloudinary

    //Eliminar imagen una ves subida a cloudinary
    await unlink(path);

    res.redirect('/');
}

indexCtrl.deleteGame = async (req, res) => {
    const { id } = req.params;
    //Eliminar photo desde MONGODB   
    const photoD = await Photo.findByIdAndRemove(id);
    //Eliminar photo desde CLOUDINARY
    const result = await cloudinary.v2.uploader.destroy(photoD.public_id);
    console.log(result);
    res.redirect('/');
}

module.exports = indexCtrl;