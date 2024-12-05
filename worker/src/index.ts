import { createClient } from 'redis';


const client = createClient();

async function main(){
    while(true){
        const response = await client.brPop('submissions', 0);
        console.log(response)

        await new Promise((resolve)=> setTimeout(resolve, 1000))

        // sent to pub sub
        console.log('Processed user submission')
    }

}

async function startServer(){
    try{
        await client.connect();
        console.log("connected to redis")

    }catch(err){
        console.log("error while connecting to redis")
    }
}

startServer();
main();