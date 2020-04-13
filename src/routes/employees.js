const express = require('express')
const router = express.Router()

const mysqlConnection = require('../database')

router.get('/',(req,res)=>{
   mysqlConnection.query('SELECT * FROM employees',(err,data,field)=>{
      if(!err){
         res.json(data)
      } else {
         console.log(err);
      }
   })
})

router.get('/:id',(req,res)=>{
   const { id } = req.params
   mysqlConnection.query('SELECT * FROM employees WHERE id = ?',[id], (err,data,field)=>{
      if(!err){
         console.log(data)
         res.json(data[0])
      }else{
         res.send("Error....")
      }
   })

})

router.post('/add', (req,res)=>{
   const { name, salary } = req.body
   mysqlConnection.query('CALL employeeAddOrEdit(?, ?, ?)', [0,name, salary], (err, data, fild) => {

      if(!err){
         console.log(data);
         res.json({
            status: "ok",
            // de esta forma accedemos al id que nos devuelve el procedimiento almacenada
            new_id: data[0][0].id
         })
      }
      else{
         console.log(err);
         res.send("Erro....")
      }

   })

})

router.put('/update/:id',(req,res)=>{

   const { name, salary } = req.body
   const id = req.params.id

   mysqlConnection.query('CALL employeeAddOrEdit(?,?,?)', [id, name, salary], (err, data, fild) => {
      if(!err){
         console.log(fild);
         res.json({status:"ok", id_update:data[0][0].id})
      }
      else{
         res.send("Error")
         console.log(err);
      }
   })
})

router.delete('/delete/:id',(req,res)=>{
   const { id } = req.params
   mysqlConnection.query('DELETE FROM employees WHERE id = ?', [id], (err,data,fild)=>{
      if(!err){
       console.log(data);
       console.log(fild);
       res.json({status:"ok", id_delete:data})
      }
      else{
         console.log(err);
         res.json({status:"error"})
      }
   }) 
})


module.exports = router