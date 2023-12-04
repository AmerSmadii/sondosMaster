const express = require('express');
const cors = require("cors");
const session = require('express-session');
const passport = require('passport');
// const multer = require('multer');
const db = require("./db");
const path = require("path");
require('./auth');
require("dotenv").config();
const app = express();
const paymentRoute = require('./Route/paymentRoute');
const PORT = process.env.PORT || 3000;
const router = express.Router();
// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS
const authController = require("./controllers/authControllers");
const userController = require('./controllers/usercontrllers');
const foundControllers = require('./controllers/foundControllers');
const retreveControllers = require('./controllers/retrevControllers');
const lostControllers = require('./controllers/lostControllers');
const idUserControllers = require('./controllers/idUserControllers');
const idUserControllers2 = require('./controllers/idUserControllers2');
const commentController = require('./controllers/commentControllers');
const contactusControllers = require('./controllers/contactusControlletr');
const ProfileControllers = require('./controllers/profileControllers');
const allUserControllers = require('./controllers/allUserControllers');





const AllUserModel = require('./models/allUserModel');
const foundModel = require('./models/foundModels');
const idUserModel = require('./models/idUserModel');
const idUserModel2 = require('./models/idUserModel2');
const lostModel = require('./models/lostModels');
const authenticateToken = require('./middleware/jwt'); // Adjust the path accordingly
const profileController = require('./controllers/profileControllers');
// const multer = require('./middleware/multer')
// Routes
app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);
app.get('/found', foundControllers.getAllProducts);
app.get('/retreve', retreveControllers.getAllProductss);
app.get('/retreve2', retreveControllers.getAllProducts);
app.post('/itemfound',foundControllers.additem);
app.get('/lost', lostControllers.getAllProducts);
app.get('/iduser', idUserControllers.getAll);
app.get('/idforuser', idUserControllers2.getAll);
app.post('/itemlost',lostControllers.addItem);
app.post('/addComment',commentController.addComment);
app.get('/getAllComments',commentController.getAllComments);
app.post('/contactus',contactusControllers.addMessage);
app.get('/profile', authenticateToken, profileController.getProfilePage);
app.get('/getAllUser',allUserControllers.getAllUser);
app.put('/user',authenticateToken, profileController.updateUser);
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.get('/signinbygoogle', (req, res) => {
  res.send('<a href="/google">Authenticate with Google</a>');
});

app.get('/google', passport.authenticate('google', { scope: [ 'email', 'profile' ] }));

app.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/protected',
  failureRedirect: '/google/failure'
}));

app.get('/protected', authController.isLoggedIn, authController.handleProtectedRoute);

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

























const { upload, uploadMultiple } = require('./middleware/multer')
const { getStorage, ref ,uploadBytesResumable } = require('firebase/storage')
const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = require("firebase/auth");
const { auth } = require('./config/firebase.config')



async function uploadImage(file, quantity) {
    const storageFB = getStorage();

    await signInWithEmailAndPassword(auth, process.env.FIREBASE_USER, process.env.FIREBASE_AUTH)

    if (quantity === 'single') {
        const dateTime = Date.now();
        const fileName = `images/${dateTime}`
        const storageRef = ref(storageFB, fileName)
        const metadata = {
            contentType: file.type,
        }
        await uploadBytesResumable(storageRef, file.buffer, metadata);
        return fileName
    }

    if (quantity === 'multiple') {
        for(let i=0; i < file.images.length; i++) {
            const dateTime = Date.now();
            const fileName = `images/${dateTime}`
            const storageRef = ref(storageFB, fileName)
            const metadata = {
                contentType: file.images[i].mimetype,
            }

            const saveImage = await Image.create({imageurl: fileName});
            file.item.imageId.push({_id: saveImage._id});
            await file.item.save();

            await uploadBytesResumable(storageRef, file.images[i].buffer, metadata);

        }
        return
    }

}
// Import necessary Firebase Storage functions
const { getDownloadURL} = require('firebase/storage');

// Function to get the download URL of an image
async function getImageURL(imagePath) {
    const storageFB = getStorage();
    const storageRef = ref(storageFB, imagePath);

    try {
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        // Handle any potential errors
        console.error("Error getting download URL:", error);
        throw error;
    }
}





// Your Express route

app.post('/test-upload', upload, async (req, res) => {
    console.log('file in backend',req.file); 
    const file = {
        type: req.file.mimetype,
        buffer: req.file.buffer
    }

    try {
        // Upload image to Firebase Storage and get the URL
        const imagename = await uploadImage(file, 'single');

        // Get the download URL of the uploaded image
        const imageurl = await getImageURL(imagename);

        // Add item details to PostgreSQL including the image URL
        const foundItem = await foundModel.additem(
            req.body.title,
            req.body.description,
            req.body.category,
            req.body.country,
            req.body.city,
            req.body.date_found,
            req.body.contact_name,
            req.body.contact_email,
            req.body.contact_phone,
            imagename,  // Assuming 'buildImage' is the image name
            imageurl
        );
      
        res.send({
            status: "SUCCESS",
            imageName: imagename,
            imageurl: imageurl
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Failed to upload image and store in the database' });
    }
});
app.post('/upload_id', upload, async (req, res) => {
    console.log('file in backend',req.file); 
    const file = {
        type: req.file.mimetype,
        buffer: req.file.buffer
    }

    try {
        // Upload image to Firebase Storage and get the URL
        const imagename = await uploadImage(file, 'single');

        // Get the download URL of the uploaded image
        const imageurl = await getImageURL(imagename);

        // Add item details to PostgreSQL including the image URL
        const idUser = await idUserModel.addid(
            imagename,  // Assuming 'buildImage' is the image name
            imageurl
        );
      
        res.send({
            status: "SUCCESS",
            imageName: imagename,
            imageurl: imageurl
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Failed to upload image and store in the database' });
    }
});

app.post('/upload_id2', upload, async (req, res) => {
    console.log('file in backend',req.file); 
    const file = {
        type: req.file.mimetype,
        buffer: req.file.buffer
    }

    try {
        // Upload image to Firebase Storage and get the URL
        const imagename = await uploadImage(file, 'single');

        // Get the download URL of the uploaded image
        const imageurl = await getImageURL(imagename);

        // Add item details to PostgreSQL including the image URL
        const idUser = await idUserModel2.addid(
            imagename,  // Assuming 'buildImage' is the image name
            imageurl
        );
      
        res.send({
            status: "SUCCESS",
            imageName: imagename,
            imageurl: imageurl
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Failed to upload image and store in the database' });
    }
});


app.post('/test-uploaded', upload, async (req, res) => {
    const file = {
        type: req.file.mimetype,
        buffer: req.file.buffer
    }


    try {
        // Upload image to Firebase Storage and get the URL
        const imagename = await uploadImage(file, 'single');

        // Get the download URL of the uploaded image
        const imageurl = await getImageURL(imagename);

        // Add item details to PostgreSQL including the image URL
        const lostitem = await lostModel.addItem(
            req.body.title,
            req.body.description,
            req.body.category,
            req.body.country,
            req.body.city,
            req.body.date_lost,
            req.body.contact_name,
            req.body.contact_email,
            req.body.contact_phone,
            imagename,  // Assuming 'buildImage' is the image name
            imageurl
        );
        console.log(123);
        res.status(200).json({
            status: "SUCCESS",
            imageName: imagename,
            imageUrl: imageurl
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Failed to upload image and store in the database' });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});