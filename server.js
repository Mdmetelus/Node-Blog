// implement your API here
const express = require('express');
const dbU = require('./data/helpers/userDb');
const morgan = require('morgan');
const helmet = require('helmet');
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

//   server.get("/api/users/:id/:userId", async (req, res) => {

//       const userId = req.params.userId;
//       console.log(userId);
//       try {
//         const eachUser = await dbU.getUserPosts(userId);
//         console.log(eachUser);
    
//         if ( eachUser.length === 0 ) {
//           res.status(404).json({ message: `User does not exist.`});
//         }
  
//         res.status(200).json(post);
  
//       } catch (error) {
//         res.status(500).json({ message: `We can't find the hommie, please try again later!`});
//       }
//   });


    server.get('/api/users/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const eachUser = await dbU.get(id);
            console.log(eachUser);
            res.status(200).json({eachUser});
        } catch (error) {
            res.status(500).json({message: `failed to get user`});
        }
       });

    server.get('/api/users', async (req, res) => {
        try {
            const all = await dbU.get();
            console.log(all);
            res.status(200).json(all);
        } catch (error) {
            res.status(500).json({message: `failed to get All the users`});
        }
    });

server.get("/", (req, res) => {
    res.status(200)
        .send("<h1> Hello World! Welcome To My APP</h1>");
  });

//++++++++++++++++++++++++++++++++++++++++
// - post stuff here
//++++++++++++++++++++++++++++++++++++++++

const goodName = (req, res, next) => {
    const { name } = req.body;

    if(!name) {
        res.status(400).json({error: 'You do not have not entered a valid name', err});
        console.log("++++ERROR missing name!! +++");

        next();
    } else {
        next();
    }
}

server.post('/api/users', goodName, async (req, res) => {
    const newUser = req.body;

    try {
        const id = await dbU.insert(newUser);
        console.log(newUser);
        const userIn = await dbU.get(id);
        console.log(userIn, id);
        res.status(201).json(id);

    } catch (error) {
        res.status(500).json({ message: 'the Post Attempt failed, No  Name added', error: err});

    }

});

//++++++++++++++++++++++++++++++++++++++++
// - update  stuff here
//++++++++++++++++++++++++++++++++++++++++


// server.update('/api/users', goodName, async (req, res) => {
//     const { id } = req.params;
//     const changes = req.body;
//     const him = res.body.id;

//     try {
//         const changer = await dbU.update({ id, changes })

//     } catch (error) {

//     }
// });



//++++++++++++++++++++++++++++++++++++++++
// - delete stuff here
//++++++++++++++++++++++++++++++++++++++++

server.delete("/api/users/:id", async (req, res) => {
    const id = req.params.id;

});



//++++++++++++++++++++++++++++++++++++
//++++++Listener      +++++++++++
//++++++++++++++++++++++++++++++++++++

server.listen(PORT, () => console.log(`The Server is listening on port ${PORT}`));

// module.exports = server;