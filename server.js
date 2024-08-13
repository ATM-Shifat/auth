
import pkg from 'json-server'
import  bodyParser  from 'body-parser'
import jwt from 'jsonwebtoken'



const server = pkg.create();
const middlewares = pkg.defaults();
const router = pkg.router('db.json');

const secrete = process.env.SECRETE_KEY

server.use(middlewares);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use((req, res, next) =>{
    //console.log(req)
    if(req.path !== '/log-in' && req.path !== '/sign-up'){
        
        const token = req.headers['authorization']
        //console.log(token)
        if(token){
            jwt.verify(token, secrete, (err, decoded)=>{
                if(err){
                    return res.status(401).json({error: "Invalid Token"})
                }else{
                    req.user = decoded
                    next()
                }
            })
        }else{
            res.status(403).json({error: "No Token Provided"})
        }
    }else{
        next()
    }
})

server.get('/check-user', (req, res) =>{
    try{
        const {userName} = req.query;
        const db = router.db;
        const user = db.get("users").find({userName}).value();

        if(user){
            res.status(200).json({exists: true});
        }else{
            res.status(200).json({exists: false});
        }

    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to check user'});
    }
})


server.post('/sign-up', (req, res)=> {
    
    try{
        const {userName, password, fullName} = req.body;
        const role = 'user'
        const db = router.db;
        const id = (parseInt((new Date().getTime()/1000).toFixed(0))).toString(16)
        db.get("users").push({id, userName, password, fullName, role}).write()
        
        res.status(201).json({message: 'User created successfully'});

    }catch(error){
        console.error(error);
        res.status(400).json({error: 'Failed to create user'});

    }
    

})


server.post('/log-in', (req, res)=>{
    try{
        const {userName, password} = req.body;
        const db = router.db;
        const user = db.get("users").find({userName, password}).value();

        if(user){
            const token = jwt.sign({
                id: user.id,
                userName: user.userName,
                role: 'user'
            }, secrete)
            res.status(200).json({token, userName: user.userName});
        }else{
            res.status(401).json({error: 'Invalid credentials'});
        }

    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Server error'});
    }
})


server.get('/get-posts', (req, res)=>{

    const db = router.db;
    const posts = db.get("posts").value();

    if(posts && posts.length > 0){
        res.status(200).json({posts});
    }else{
        res.status(404).json({error: 'Could not find posts'});
    }
})

server.post('/create-posts', (req, res)=>{
    const {title, content, author} = req.body
    
    try{
        const db = router.db;
        const id =(parseInt((new Date().getTime()/1000).toFixed(0))).toString(16)
        const response =  db.get("posts").unshift({id, title, content, author}).write();
        

        res.status(201).json({message: "Post successfully created"})

    }catch(error){
        console.error(error);
        res.status(400).json({error: 'Failed to create post'});
    }
})

server.delete('/delete-posts', (req, res) =>{
    
    try{
      const {id} = req.body;
      //console.log(id)
      const db = router.db
      db.get('posts').remove({id}).write()
      

      res.status(200).json({message: "Post deleted successfully"})

    }catch(error){
      console.error(error)
      res.status(400).json({error: 'Failed to delete post'});
    }
})

server.use(router);
server.listen(5000, ()=>{
    console.log('JSON Server is running on port 5000')
});
