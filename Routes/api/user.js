const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const jwtSecret= require('../../config/jwtconfig');

//product db
const Userr = require('../../models/Userr');

module.exports = router;//acces



//-------Registration--of--Chef----------------
router.post('/signup/chef',(req,res)=>{
    
    const {name,email,password}=req.body;

    //simple validation 
    if(!name|| !email || !password) return res.status(400).json({msg:"Please enter all fields"});

    Userr.findOne({ email })
         .then(userr => {
            if(userr) return res.status(400).json({msg:"User already exists"});

            const newChef = new Chef(
                {
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password
                }
            );
       
            // salt & hash             
            bcrypt.genSalt(10,(err,salt) =>
            {
                bcrypt.hash(newChef.password, salt,(err,hash)=>
                {
                    if(err)throw err ;
                    newChef.password=hash;

                    newChef.save()
                            .then (userr =>
                                {
                                jwt.sign(
                                    
                                       {id: userr.id},
                                        jwtSecret,
                                        {expiresIn:3600},
                                        (err,token) => 
                                        {

                                        if (err) throw err;
                                        res.json({
                                             token,
                                                userr
                                                })

                                        }
                                        )
                               
                                });
                
                })
            });
        
     
        })
});


//-------Registration--of--Employee----------------
router.post('/signup/employee',(req,res)=>{
    
    const {name,email,password,solde,tag_id}=req.body;

    //simple validation 
    if(!name|| !email || !password || !solde ||!tag_id) return res.status(400).json({msg:"Please enter all fields"});

    Userr.findOne({ email })
         .then(userr => {
            if(userr) return res.status(400).json({msg:"User already exists"});

            const newEmployee = new Employee(
                {
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                    solde:req.body.solde,
                    tag_id:req.body.tag_id
                }
            );
       
            // salt & hash             
            bcrypt.genSalt(10,(err,salt) =>
            {
                bcrypt.hash(newEmployee.password, salt,(err,hash)=>
                {
                    if(err)throw err ;
                    newEmployee.password=hash;

                    newEmployee.save()
                            .then (userr =>
                                {
                                jwt.sign(
                                    
                                       {id: userr.id},
                                        jwtSecret,
                                        {expiresIn:3600},
                                        (err,token) => 
                                        {

                                        if (err) throw err;
                                        res.json({
                                             token,
                                                userr
                                                })

                                        }
                                        )
                               
                                });
                
                })
            });
        
     
        })
});

//-------Registration--of--Rh----------------

router.post('/signup/rh',(req,res)=>{
    
    const {name,email,password}=req.body;
    console.log(Admin.codeAdmin);

    //simple validation 
    if(!name|| !email || !password ) return res.status(400).json({msg:"Please enter all fields"});

    Userr.findOne({ email })
         .then(userr => {
            if(userr) return res.status(400).json({msg:"User already exists"});
            const newRh = new Rh(
                {
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password
                }
            );
       
            // salt & hash             
            bcrypt.genSalt(10,(err,salt) =>
            {
                bcrypt.hash(newRh.password, salt,(err,hash)=>
                {
                    if(err)throw err ;
                    newRh.password=hash;

                    newRh.save()
                            .then (userr =>
                                {
                                jwt.sign(
                                    
                                       {id: userr.id},
                                        jwtSecret,
                                        {expiresIn:3600},
                                        (err,token) => 
                                        {

                                        if (err) throw err;
                                        res.json({
                                             token,
                                                userr
                                                })

                                        }
                                        )
                               
                                });
                
                })
            });
        
     
        })
});

//-------Registration--of--Admin----------------

router.post('/signup/admin',(req,res)=>{
    
    const {name,email,password,codeAdmin}=req.body;
console.log(Admin.codeAdmin);
    //simple validation 
    if(!name|| !email || !password || !codeAdmin) return res.status(400).json({msg:"Please enter all fields"});

    Userr.findOne({ email })
         .then(userr => {
            if(userr) return res.status(400).json({msg:"User already exists"});
           // if(Admin.codeAdmin != codeAdmin) return res.status(400).json({msg:"Invalide code Admine "});
            const newAdmin = new Admin(
                {
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password
                }
            );
       
            // salt & hash             
            bcrypt.genSalt(10,(err,salt) =>
            {
                bcrypt.hash(newAdmin.password, salt,(err,hash)=>
                {
                    if(err)throw err ;
                    newAdmin.password=hash;

                    newAdmin.save()
                            .then (userr =>
                                {
                                jwt.sign(
                                    
                                       {id: userr.id},
                                        jwtSecret,
                                        {expiresIn:3600},
                                        (err,token) => 
                                        {

                                        if (err) throw err;
                                        res.json({
                                             token,
                                                userr
                                                })

                                        }
                                        )
                               
                                });
                
                })
            });
        
            localStorage.setItem("id", userr.id);

        })
        
});

//-------Login--------------------
router.post('/login',(req,res)=>{

    const { email , password} = req.body;

    if(!email || !password) return res.status(400).json({msg:"Please enter all fields"});

    Userr.findOne({email})
        .then(userr => 
        {
            if(!userr) return res.status(400).json({msg:"User not already exists"});
            console.log(userr.usertype);
            bcrypt.compare(password,userr.password)
                  .then(isMatch => {
                      if(!isMatch) return res.status(400).json({msg:"invalid password"});
                      
                      jwt.sign(
                                    
                        {id: userr.id},
                         jwtSecret,
                         {expiresIn:3600},
                         (err,token) => 
                         {

                         if (err) throw err;
                         res.json({
                              token,
                              userr,
                              "type of user":userr.usertype
                                 })

                         }
                         )

                  })
                  localStorage.setItem("id", userr.id);

        })

});
//------------END-LOGIN----------------------------------


//-----------GET / UPDATE / DELETE /----->>> EMPLOYEE----------------------------

//------GET-ALL-EMPLOYEE------------
router.get('/employe',(req,res) =>{
    
    Userr.find({ "usertype" : "Employee"})
    .then(userr => res.json(userr));
    
  });

//------GET--EMPLOYEE--SOLDE-------------
router.get('/employe/solde/:id',(req,res) =>{
    Userr.findOne({_id:req.params.id})
      .then(userr => res.json({"name":userr.name,"Email":userr.email,"Tag":userr.tag_id,"SOLDE":userr.solde,}));
  });


//------Update--Employee--(solde / tag_id)-------
router.put('/update/employee/:id', (req, res) => {
    const newEmployee1={solde: req.body.solde ,tag_id: req.body.tag_id};
    Employee.findById(req.params.id)
    .then(userr => userr.update({ $set: newEmployee1})
    .then(()=> res.json({succes:true})))
    .catch(err => res.status(404).json({succes:false}));
    
  }); 


//----------DELETE--Employee----------

router.delete('/delete/employee/:id', (req, res) => {
    Employee.findById(req.params.id)
    .then(userr => userr.remove().then(() => res.json({succes: true})))
    .catch(err => res.status(404).json({succes:false}));
  }); 
  

//-----------GET / UPDATE / DELETE /----->>> CHEF----------------------------

//------GET--CHEF------------
router.get('/chef',(req,res) =>{
    Userr.find({ "usertype" : "Chef"})
      .then(userr => res.json(userr));
  });

//-------DELETE--CHEF----------
router.delete('/delete/chef/:id', (req, res) => {
    Chef.findById(req.params.id)
    .then(userr => userr.remove().then(() => res.json({succes: true})))
    .catch(err => res.status(404).json({succes:false}));
  }); 



//-----------GET / UPDATE / DELETE /----->>> RH----------------------------

//------GET--RH------------
router.get('/rh',(req,res) =>{
    Userr.find({ "usertype" : "RH"})
      .then(userr => res.json(userr));
  });

//-------DELETE--CHEF----------
router.delete('/delete/rh/:id', (req, res) => {
    Rh.findById(req.params.id)
    .then(userr => userr.remove().then(() => res.json({succes: true})))
    .catch(err => res.status(404).json({succes:false}));
  }); 


//-----------GET / UPDATE / DELETE /----->>> ADMIN----------------------------

//------GET--ADMIN------------
router.get('/admin',(req,res) =>{
    Userr.find({ "usertype" : "Admin"})
      .then(userr => res.json(userr));
  });

//-------DELETE--ADMIN----------
router.delete('/delete/admin/:id', (req, res) => {
    Admin.findById(req.params.id)
    .then(userr => userr.remove().then(() => res.json({succes: true})))
    .catch(err => res.status(404).json({succes:false}));
  }); 



