import cron from "node-cron";



cron.schedule('0 0 1 * *',async()=>{
    console.log('Running monthly summer job');

    
})