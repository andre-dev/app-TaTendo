<?php
$data = json_decode(file_get_contents("php://input"));
$filter = filter_input(INPUT_SERVER,'REQUEST_METHOD');
require ('./_app/Config.php');

if($filter === 'POST'){
    switch ($data->parametros) {
        //============================================ cadastro ======================================================= ======
        case "cadastro":
            $senha2 = md5($data->senha);
            $Dados = [
                'nome'=> $data->nome,
                'sobrenome'=> $data->sobrenome,
                'email'=> $data->email,
                'senha'=> $senha2
            ];
            $cadastra = new Create();
            $cadastra->ExeCreate('cadastro', $Dados);
            //Leitura no Banco
            $read = new Read;
            $read->FullRead("SELECT * FROM cadastro WHERE email = '".$data->email."'");
            echo json_encode($read->getResult());
            break;
            
        case "cadastroEmpresa":
            $senha2 = md5($data->senha);
            $Dados = [
                'cnpj'=> $data->cnpj,
                'email'=> $data->email,
                'senha'=> $senha2
            ];
            $cadastra = new Create();
            $cadastra->ExeCreate('cadastroEmpresa', $Dados);
            //Leitura no Banco
            $read = new Read;
            $read->FullRead("SELECT * FROM cadastroEmpresa WHERE email = '".$data->email."'");
            echo json_encode($read->getResult());
            break;
            
        case "cadastroOferta":
            //$senha2 = md5($data->senha);
            $Dados = [
                'nomeEmpresa'=> $data->nomeEmpresa,
                'localidadeOferta'=> $data->localidadeOferta,
                'validadeOferta'=> $data->validadeOferta,
                'descricaoOferta'=> $data->descricaoOferta,
                'cidadeEmpresa'=> $data->cidadeEmpresa,
                'telefoneEmpresa'=> $data->telefoneEmpresa,
                'tipoOferta'=> $data->tipoOferta
            ];
            $cadastra = new Create();
            $cadastra->ExeCreate('cadastroOferta', $Dados);
            //Leitura no Banco
            $read = new Read;
            $read->FullRead("SELECT * FROM cadastroOferta  WHERE nomeEmpresa = '".$data->nomeEmpresa."'");
            echo json_encode($read->getResult());
            break;       
        //============================================= Leitura ======================================================= ======
        case "leitura":
            $read = new Read;
            $read->ExeRead('cadastroOferta');
            //$read->FullRead("");
            echo json_encode($read->getResult());
            break;

        //============================================= atualizar ===========================================
        case "atualizar":
            $Dados = [
                'nome'=> $data->nome,
                'sobrenome' => $data->sobrenome
            ];
            $update = new Update;
            $update->ExeUpdate('cadastro', $Dados, "WHERE id=:cod", "cod={$data->id}");
            echo json_encode($update->getResult());

            break;
        //============================================= Delete ===============================================
        case "deletar":
            $delete = new Delete;
            $delete->ExeDelete('cadastro', "WHERE  id = :cod", "cod={$data->id}");
            $read = new Read;
            $read->ExeRead('cadastro',"WHERE id ={$data->id}");
            echo json_encode($read->getResult());
            break;
        default:
            break;
    }
}else{

    /*$read = new Read;
         $read->ExeRead('cadastroOferta');
         echo json_encode($read->getResult());*/
}