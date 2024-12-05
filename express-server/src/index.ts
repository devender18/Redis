import express from 'express';
import { createClient } from 'redis';


const client = createClient();
const app = express();
app.use(express.json());

app.post('/submit', async (req, res)=>{
    const { problemID, userId, code, language } = req.body;

    // ideally you should push in the DB here like - prisma.submissions.create({})

    await client.lPush("submissions", JSON.stringify({problemID, userId, code, language}));
    res.json({
        msg : "Submission Recieved!"
    })
})

async function startServer(){
    try{
        await client.connect();
        console.log("connected to redis")

        app.listen(3000, ()=>{
            console.log('server is running on port: 3000')
        })
    }catch(err){
        console.log("error while connecting to redis")
    }
}

startServer();