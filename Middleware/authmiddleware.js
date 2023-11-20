
const authmiddleware = async (req, res,next) =>{

    const token = req.cookies.token;

    if (!token)  { 
        res.send("Unauthorizes") 
    }
    else{

        
req.token= token
next()
    }
    


}

module.exports = authmiddleware