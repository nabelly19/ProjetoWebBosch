const colaborador = require('../model/colaborador')
const candidato = require('../model/candidato')
const processo = require('../model/processo')

// const edv = '1'
// const senha = '1'

// var session;

module.exports = {
    async getLoginCand(req, res) {
        res.render('LoginCand')
    },

    async loginCand(req, res){
        const IDCandidato = Number(req.body.IDCandidato);

        const processocand = await candidato.findByPk(IDCandidato,{
            raw: true,
            attributes: ['IDProcesso']
        })

        if (!processocand){
            res.redirect('/LoginCand');
            return;
        }
        console.log(processocand)

        const processos = await processo.findAll({
            raw: true,
            attributes: ['IDProcesso','Nome', 'Etapa', 'Situacao'],
            where: { IDProcesso: 1 }
        });

        res.redirect('/HomeCand')
    },

    async getLoginCol(req, res) {
        if (req.session.edv) {
            res.redirect('HomeCol');
            return;
        }
        res.render('LoginCol')
    },

    async loginCol(req, res) {
        const dados = req.body;
        dados.edv = Number(dados.edv)
        if(isNaN(dados.edv)){
            res.redirect('/')
            return
        }

        const login = await colaborador.findByPk(dados.edv, {
            raw: true
        })

        if(!login){
            res.redirect('/')
            return
        }
        
        // if (dados.edv == edv && dados.senha == senha) {
        //     session = req.session;
        //     session.edv = dados.edv;
        //     console.log(req.session)
        //     res.redirect('/HomeCol')
        // }
        // else {
        //     res.redirect('/')
        // }

        if (dados.edv == login.EDV && dados.senha == login.Senha) {
            session = req.session;
            session.edv = dados.edv;
            // console.log(req.session)
            res.redirect('/HomeCol')
        }
        else {
            res.redirect('/')
        }
    },
    async tryLoginCol(req, res){
        const dados = req.body;
        dados.edv = Number(dados.edv)
        console.log(dados)

        if(isNaN(dados.edv)){
            res.status(401).send({error : 'Login invalido'})
            return
        }

        const login = await colaborador.findByPk(dados.edv, {
            raw: true
        })

        if(!login){
            res.status(401).send({error : 'Login invalido'})
            return
        }

        if (dados.edv == login.EDV && dados.senha == login.Senha) {
            res.status(200).send({success : 'Login valido'})
        }
        else {
            res.status(401).send({error : 'Login invalido'})
            return
        }
    }
    ,

    async logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
}