import axios from "axios";
import { appendFileSync, readFileSync } from "fs";


const extract = async () => {
    let malas = [];
    for (let i = 1; i < 206; i++) {
        let token = await readFileSync("./token.txt");
        const extract_options = {
            method: 'POST',
            url: 'https://orcrim.mj.gov.br/backend-orcrim/orcrim-rest/pessoa/buscarPaginadoOrdenado',
            params: { '': '' },
            headers: {
                Authorization: 'Bearer  ' + token,
                'Content-Type': 'application/json'
            },
            data: {
                idSituacaoEntidade: 1,
                meusCadastros: false,
                cadastrosDaMinhaUnidade: false,
                ordenacaoPaginacao: { pageNumber: i, pageSize: 100 },
                semFiltro: true
            }
        };
        await axios.request(extract_options).then(function (resp) {
            for (let n = 0; n < resp.data.length; n++) {
                let vulgo = '';
                let organizacaoCriminosa = '';
                if(resp.data[n].listaVulgo && resp.data[n].listaVulgo.length > 0){
                    for (let v = 0; v < resp.data[n].listaVulgo.length; v++) {
                        vulgo = vulgo + resp.data[n].listaVulgo[v].nomeVulgo + ',';
                    }
                }
                if(resp.data[n].listaDadosPessoaisOrcrim && resp.data[n].listaDadosPessoaisOrcrim.length > 0){
                    for (let v = 0; v < resp.data[n].listaDadosPessoaisOrcrim.length; v++) {
                        organizacaoCriminosa = organizacaoCriminosa + resp.data[n].listaDadosPessoaisOrcrim[v].organizacaoCriminosa.nome + ',';
                    }
                }
                let mala =  resp.data[n].nome + ';'
                            + resp.data[n].cpf + ';'
                            + resp.data[n].dataNascimentoFormatoString + ';'
                            + resp.data[n].nomeMae + ';'
                            + resp.data[n].descricao + ';'
                            + resp.data[n].ufCadastrante + ';'
                            + organizacaoCriminosa + ';'
                            + vulgo;

                appendFileSync('nome.txt', mala + '\n'); 
                
            }
        }).catch(function (error) {
            console.error(error);
        });
        console.log(i + " / 206");
    }
}

extract();