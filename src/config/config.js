const path =require('path')
const config ={
    app:{
        port: process.env.PORT || 3000
    },
    static: path.join(__dirname,'/src/public'),
    
}

module.exports=config;