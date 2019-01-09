// implement your API here
const express = require('express');
const dbU = require('./data/helpers/userDb');
const morgan = require('morgan');
// const helmet = require('helmet');
// const cors = require('cors');
const server = express();

//++++++++++++++++++++++++ 
// server port

const PORT = 5050;


//++++++++++++++++++++++++ 
// golbal middleware and addins
//+++++++++++++++++++++++


// server.use(helmet()); // provides basic security

server.use(express.json()); // json bdy parser

server.use(morgan('short')); // logger/tracer of activity

// server.use(cors()); //cross domain issues


//++++++++++++++++++++++++++++++++++++++++++
// get endpoints
//++++++++++++++++++++++++++++++++++++++++++++

//   server.get("/api/posts/:userId", async (req, res) => {
//     const userId = req.params.id;
//     console.log(userId);
//     try {
//       const eachUser = await dbU.getUserPosts(userId);
//       console.log(eachUser);
  
//       if ( eachUser.length === 0 ) {
//         res.status(404).json({ message: `User does not exist.`});
//       }
//       res.status(200).json(post);
//     } catch (error) {
//       res.status(500).json({ message: `We can't find the hommie, please try again later!` });
//     }
  
  

server.get("/", (req, res) => {
    res.status(200)
        .send("<h1> Hello World! Welcome To My APP</h1>");
  });

//++++++++++++++++++++++++++++++++++++
//++++++Listener      +++++++++++
//++++++++++++++++++++++++++++++++++++

// server.listen(PORT, () => console.log(`The Server is listening on port ${PORT}`));

module.exports = server;