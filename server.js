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

//++++++++++++++++++++++++++++++++++++
//++++++Listener      +++++++++++
//++++++++++++++++++++++++++++++++++++

server.listen(PORT, () => console.log(`The Server is listening on port ${PORT}`));

// module.exports = server;