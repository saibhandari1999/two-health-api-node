const app =require('./app.js')
const port = process.env.PORT || 3000;

//server listening
var server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

module.exports=server