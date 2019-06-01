import express from 'express';
import database from '../data/database';
import hashCode from '../config/hash'


const router = express.Router();

router.post('/add', (req, res) => {

    if (req.body.nomeEmpresa && req.body.cnpj && req.body.nomeFuncionario && req.body.email && req.body.senha && req.body.phone) {

        let nomeEmpresa = req.body.nomeEmpresa, 
        cnpj = req.body.cnpj, 
        nomeFuncionario = req.body.nomeFuncionario, 
        email = req.body.email, 
        nomeSenha = hashCode(req.body.senha),
        numeroTelefoneFuncionario = req.body.phone

        database.CreateCompany(nomeEmpresa, cnpj, nomeFuncionario, email, nomeSenha, numeroTelefoneFuncionario, res)

    } else {
        res.json({ "message": 'Preencha todos os campos obrigatórios!' })
    }
});

router.get('/get/:id', (req, res) => {
    console.log(req.params)
    if (req.params.id) {
    let id = req.params.id;

        database.queryFromRoute(`select * from tb_funcionario where 
            idempresa = ${id} and idtipo != 3`, res)

    } else {
        res.json({ "message": 'Erro ao retornar funcionarios!!' })
    }
});

export default router;