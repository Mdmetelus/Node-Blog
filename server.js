const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const server = express();
const PORT = 5050;

server.listen(PORT, () => console.log(`The Server is listening on port ${PORT}`));