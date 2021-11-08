const router = require('express').Router();

router.get('/' , (req , res)=>{
    res.status(201).json({bienvenida:"Hola internauta!"});
});

router.get('/suma/' , (req , res)=>{
    const {ope1,ope2} = req.query;
	console.log("llega acá");
    res.status(201).json({result:(Number.parseInt(ope1)+Number.parseInt(ope2))});
 });

 router.get('/resta/' , (req , res)=>{
    const {ope1,ope2} = req.query;     
     res.status(201).json({result:(Number.parseInt(ope1)-Number.parseInt(ope2))});
 });

 router.get('/multiplicacion/' , (req , res)=>{
    const {ope1,ope2} = req.query;     
     res.status(201).json({result:(Number.parseInt(ope1)*Number.parseInt(ope2))});
 });

 router.get('/division/' , (req , res)=>{
    const {ope1,ope2} = req.query;     
     res.status(201).json({result:(Number.parseInt(ope1)/Number.parseInt(ope2))});
 });

 router.get('/potencia/' , (req , res)=>{
    const {ope1,ope2} = req.query;     
     res.status(201).json({result:(Math.pow(Number.parseInt(ope1),Number.parseInt(ope2)))});
 });

module.exports  = router;