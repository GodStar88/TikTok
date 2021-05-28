const Rembrandt = require('rembrandt')
const Jimp = require('jimp')
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/data/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})
var upload = multer({
    storage: storage
})


app.post('/tiktok', upload.array('file'), async (req, res) => {

    var difference = 1.00;
    var postion;

    for (let index = 1; index < req.files.length; index++) {
        
        const currentImage = await _getCurrentImage(req.files[index].path)

        const rembrandt = new Rembrandt({
            imageA: req.files[0].path,
            imageB: currentImage,
            thresholdType: Rembrandt.THRESHOLD_PIXELS
        })
        const result = await rembrandt.compare();

        console.log(index, result.percentageDifference);

        if (difference >= result.percentageDifference) {
            difference = result.percentageDifference;
            postion = index;
        }
    }
    console.log(postion, difference);
    return res.send(postion + "");
});

async function _getCurrentImage(image) {
    return Jimp.read(image)
        .then((lenna) => lenna.resize(276, 172))
        .then((jimp) => jimp.getBufferAsync(Jimp.MIME_JPEG))
}

app.listen(8080, () => console.log(`Started server at http://localhost:8080!`));