import path from 'path';
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const server_dir = path.join(__dirname, 'public');
const view_dir = path.join(__dirname, 'view');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.sendFile(path.join(view_dir, 'wanands_way.html'));
})

app.use(express.static(server_dir));

server.listen(port, () => console.log(`Server started on port ${port}`));
