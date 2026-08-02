import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send(`
    <h1>JUMO UEOS</h1>
    <p>Universal Enterprise Operating System</p>
    <br>
    <p>Powered by:</p>
    <p>JUMO DIGITAL ENTERPRISE PLATFORM</p>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
