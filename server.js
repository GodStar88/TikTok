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

app.post('/post-test', upload.array('file'), async (req, res) => {
    // console.log('Got body:', req.files);

    var difference = 1.00;
    var postion;
    console.log(req.files[0].path);
    for (let index = 1; index < req.files.length; index++) {
        const rembrandt = new Rembrandt({
            imageA: req.files[0].path,
            imageB: req.files[index].path,
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


app.listen(8080, () => console.log(`Started server at http://localhost:8080!`));