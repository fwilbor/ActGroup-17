import mongoose from "mongoose";
import multer from "multer";
import PostImage from "../models/Images"
import express from "express";
import dotenv from "dotenv";
//import bodyParser from "body-parser";
//import path from "path";
//import ejs from "ejs";
import GridFsStorage from "multer-gridfs-storage";

dotenv.config()
const app = express()

// Step 4 - set up EJS
  
//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())
  
// Set EJS as templating engine 
//app.set("view engine", "ejs");


// Youtube test code
// const Storage = multer.diskStorage({
//     destination: "uploads",
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     },
// });

// const upload = multer({
//     storage:Storage
// }).single('imgUpload')
// Youtube test code

// Set up multer for storing uploaded files diskStorage
mongoose.connect(process.env.MONGO_URI)

const Storage = multer.memoryStorage();
  
const upload = multer({
    storage:Storage
}).single('testImage')

// Create storage engine
// const storage = new GridFsStorage({
//     url: mongoURI,
//     file: (req, file) => {
//       return new Promise((resolve, reject) => {
//         crypto.randomBytes(16, (err, buf) => {
//           if (err) {
//             return reject(err);
//           }
//           const filename = file.originalname;
//           const fileInfo = {
//             filename: filename,
//             bucketName: "uploads"
//           };
//           resolve(fileInfo);
//         });
//       });
//     }
//   });
  
//   const upload = multer({ storage });

// get all images
// const getImage = app.get('/', (req, res) => {
//     PostImage.find({}, (err, items) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send('An error occurred', err);
//         }
//         else {
//             res.render('imagesPage', { items: items });
//         }
//     });
// });

// get image from name
const getImage = async (req, res) => {
    // const {name} = req.params

    // if (!mongoose.Types.ObjectId.isValid(name)) {
    //     return res.status(404).json({error: "invalid username"})

    // }

    // const message = await PostImage.findById(name)

    // if (!message) {
    //     return res.status(404).json({error: "Message not found"})
    // }

    const imageData = await PostImage.find()
    res.json(imageData)

}
  



// get a single message(this works)

// const getImage = async (req, res) => {
//     //res.json({msg: "Get Image route"})

//     try{
//         const messages = await PostImage.find({}).sort({createdAt: -1})
//         res.status(200).json(messages)
// } catch (error){
//     res.status(404).json({ message: error.message});
// }
    
    // const {id} = req.params

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(404).json({error: "invalid message id"})

    // }

    // const message = await PostImage.findById(id)

    // if (!message) {
    //     return res.status(404).json({error: "Message not found"})
    // }

    // res.status(200).json(message)
//}


// create a new message

// Youtube test video
// const createImage = app.post('/api/images',(req,res)=> {
//     upload(req,res,(err)=>{
//         if(err){
//             console.log(err)
//         }
//         else{
//             const imageUpload = new PostImage({
//                 title: req.body.title,
//                 image:{
//                     data:req.file.filename,
//                     contentType:'image/png'
//                 }
//             })
//             imageUpload
//             .save()
//             .then(()=>res.send("successful image upload"))
//             .catch((err) => console.log(err));
//         }
//     })
// })

// Youtube test video

// app.post("/", upload.single("img"), (req, res, err) => {
//     res.send(req.files);
//   });

const createImage = app.post = async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            //res.send(req.files);
            const newImage = new PostImage({
                name: req.body.name,
                image: {
                    data:req.file.buffer,
                    contentType: "image/png",
                },
            });
            newImage
                .save()
                .then(() => res.send("successfully uploaded"))
                .catch((err) => console.log(err));
        }
    });
};
//}

// GeekbyGeek tutorial
// const createImage = async (req, res) => {
//     app.post('/uploads', upload.single('image'), (req, res, next) => {
//         res.send("Image Upload");
  
//         const obj = {
//             name: req.body.name,
//             desc: req.body.desc,
//             img: {
//                 data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//                 contentType: 'image/png'
//             }
//         }
//         PostImage.create(obj, (err, item) => {
//             if (err) {
//                 console.log(err);
//                 res.status(404).json({ message: "It mess up here"});
//             }
//             else {
//                 // item.save();
//                 res.redirect('/');
//             }
//         });
//     });
// }
//GeekbyBeek tutorial

//     const {title, creator, img, selectedFile} = req.body
// // *adds message to data-base
//     try {
//         const newMessage = await PostImage.create({title, creator, img, selectedFile})
//         res.status(200).json(newMessage)
//     } catch (error) {
//         res.status(400).json({error: error.message})

//     }


// This works POST connection
//const createImage = async (req, res) => {
    //const {title, creator} = req.body
// *adds message to data-base
//     try {
//         const newMessage = await PostImage.create({title, creator})
//         res.status(200).json(newMessage)
//     } catch (error) {
//         res.status(400).json({error: error.message})

//     }
// }

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