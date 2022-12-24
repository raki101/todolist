const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine","ejs");
const date = require(__dirname+"/date.js");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
const mongoose= require("mongoose");
mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemSchema = 
{
    name:String
};

const item = mongoose.model("item",itemSchema);

const item1 = new item({
    name:"welcome to your todolist"
})

const item2 = new item({
    name:"hit the + button to add a new item"
})

const item3 = new item({
    name:"<-- hit this to delete an item"
})

const defaultItems = [item1,item2,item3];



app.get("/",function(req,res){
    var day = date();
    item.find({},function(err,found){
        if(found.length === 0)
        {

            
item.insertMany(defaultItems,function(err)
{
    if(err) console.log("error");
    else console.log("success");
});
    res.redirect("/");
        }
        else{
        res.render("list",{today:day,newitem:found});
        }
    })
})
app.post("/",function(req,res){
    const itemName=req.body.newItem;
    
    const it = new item({
        name:itemName
    })
    it.save();
    res.redirect("/");
 });
 app.post("/delete",function(req,res){
    const checkeditem = req.body.checkbox;
    item.findByIdAndRemove(checkeditem,function(err){
        if(!err){
             console.log("successfully deleted"+checkeditem);
            res.redirect("/");
            }
    })
 })
app.get("/work",function(req,res){
    res.render("list",{today:"work",newitem:workitems});
})

app.get("/about",function(req,res){
    res.render("about");
})

app.post("/work",function(req,res){
    var item = req.body.newItem;
    workitems.push(item);
    res.redirect("/work");
})

app.listen(3000,function(){
    console.log("server started at port 3000");
})