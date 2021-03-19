/* eslint-disable no-console */

const express = require('express');
const morgan = require('morgan');
const { resolve } = require('path');
const { readFile, writeFile } = require('fs').promises;

const PORT = process.env.PORT || 5500;
const app = express();

// middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));

// helper to format call stack
const sendServerError = (res, error) => {
  res.status(500).send({
    message: error.message,
    stack: error.stack.split('\n').reduce((acc, cur) => {
      if (cur.trim()) {
        acc.push(cur.trim());
      }
      return acc;
    }, [])
  });
};

// ENDPOINTS
// log erors
app.post('/logger/error', async (req, res) => {
  try {
    // write file
    await writeFile(
      resolve(__dirname, '../logs/errors.txt'),
      `${JSON.stringify(req.body, null, 2)},\n`,
      {
        flag: 'a'
      }
    );
    // send JSON (frontend expects to parse JSON)
    res.send({});
  } catch (error) {
    sendServerError(res, error);
  }
});

// log analytics
app.post('/logger/analytics', async (req, res) => {
  try {
    // write file
    await writeFile(
      resolve(__dirname, '../logs/analytics.txt'),
      `${JSON.stringify(req.body, null, 2)},\n`,
      {
        flag: 'a'
      }
    );
    // send JSON (frontend expects to parse JSON)
    res.send({});
  } catch (error) {
    sendServerError(res, error);
  }
});

// get errors
app.get('/logger/errors', async (req, res) => {
  try {
    // read file
    const errorsString = await readFile(
      resolve(__dirname, '../logs/errors.txt'),
      'utf8'
    );

    // send it as a nested array
    res.send({ data: JSON.parse(`[${errorsString.trim().slice(0, -1)}]`) });
  } catch (error) {
    sendServerError(res, error);
  }
});

// get analytics
app.get('/logger/analytics', async (req, res) => {
  try {
    // read file
    const analyticsString = await readFile(
      resolve(__dirname, '../logs/analytics.txt'),
      'utf8'
    );

    // send it as a nested array
    res.send({ data: JSON.parse(`[${analyticsString.trim().slice(0, -1)}]`) });
  } catch (error) {
    sendServerError(res, error);
  }
});

// listen
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
