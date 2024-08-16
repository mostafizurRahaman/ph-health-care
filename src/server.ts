
import express, {Request, Response} from 'express';


// Create Express App **
const app = express()
const port = process.env.PORT || 3000;


app.get('/', (req : Request , res: Response) => {
    res.json({
         message: "Yeah!! Our Server Health is Good !!!"
    })
})

app.listen(port, ()=>{
     console.log(`Server Is Running On Port ${port}`);
})


