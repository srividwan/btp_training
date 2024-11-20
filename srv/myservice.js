module.exports = async(srv) => {
    //implementation code
    srv.on('greetings', (req,res)=> {
        return "Good Morning " + req.data.name ;}
)
   srv.on('product',(req,res)=> {
    return "product value = " + req.data.a * req.data.b;
   })

}