"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/submit', (req, res) => {
    const { problemID, userId, code, language } = req.body;
    // ideally you should push in the DB here like - prisma.submissions.create({})
    client.lPush("submissions", JSON.stringify({ problemID, userId, code, language }));
    res.json({
        msg: "Submission Recieved!"
    });
});
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("connected to redis");
            app.listen(3000, () => {
                console.log('server is running on port: 3000');
            });
        }
        catch (err) {
            console.log("error while connecting to redis");
        }
    });
}
startServer();
