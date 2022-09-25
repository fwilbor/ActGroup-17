import mongoose from "mongoose";
import multer from "multer";
import PostImage from "../models/Images"

// Step 4 - set up EJS
  
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
  
// Set EJS as templating engine 
app.set("view engine", "ejs");

// Step 5 - set up multer for storing uploaded files
  
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
  
// var upload = multer({ storage: storage })

// get all images
// app.get('/', (req, res) => {
//     imgModel.find({}, (err, items) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send('An error occurred', err);
//         }
//         else {
//             res.render('imagesPage', { items: items });
//         }
//     });
// });

// Step 8 - the POST handler for processing the uploaded file
  
// app.post('/', upload.single('image'), (req, res, next) => {
  
//     var obj = {
//         name: req.body.name,
//         desc: req.body.desc,
//         img: {
//             data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//             contentType: 'image/png'
//         }
//     }
//     imgModel.create(obj, (err, item) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             // item.save();
//             res.redirect('/');
//         }
//     });
// });


// get a single message

const getImage = async (req, res) => {
    //res.json({msg: "Get Image route"})

    try{
        const messages = await PostImage.find({}).sort({createdAt: -1})
        res.status(200).json(messages)
} catch (error){
    res.status(404).json({ message: error.message});
}
    
    // const {id} = req.params

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(404).json({error: "invalid message id"})

    // }

    // const message = await PostImage.findById(id)

    // if (!message) {
    //     return res.status(404).json({error: "Message not found"})
    // }

    // res.status(200).json(message)
}


// create a new message

const createImage = async (req, res) => {
    //res.json({msg: "Get Image route"})

    const {title, creator} = req.body
// *adds message to data-base
    try {
        const newMessage = await PostImage.create({title, creator})
        res.status(200).json(newMessage)
    } catch (error) {
        res.status(400).json({error: error.message})

    }


    //const {id, title, creator} = req.body
// *adds message to data-base
    // try {
    //     const newMessage = await PostImage.create({id, title, creator})
    //     res.status(200).json(newMessage)
    // } catch (error) {
    //     res.status(400).json({error: error.message})

    // }
}

// delete a message

// const deleteMessage = async (req, res) => {
//     const {id} = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: "invalid message id"})

//     }

//     const message = await PostImage.findOneAndDelete({_id: id})

//     if (!message) {
//         return res.status(404).json({error: "Message not found"})
//     }

//     res.status(200).json(message)


// }

export  {createImage, getImage} 