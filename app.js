import * as path from 'path';
import * as http from 'http';
import * as express from 'express';
import { Server } from 'socket.io';

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