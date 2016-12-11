<?php
/**
 * Description of Create
 *
 * @author Maycon Rocha
 */
class Create extends Conn{
    private $Tabela;
    private $Dados;
    private $Result;
    //PDO Statement---------
    private $Create;
    //PDO-------------------
    private $Conn;
    
    public function ExeCreate($Tabela, array $Dados){
        $this->Tabela = $Tabela;
        $this->Dados = $Dados;
        $this->getSyntax();
        $this->Execute();
    }
    public function getResult(){
        return $this->Result;
    }
    
    //Metod Privados
    private function Connect() {
        $this->Conn = parent::getConn();
        $this->Create = $this->Conn->prepare($this->Create);
    }

    private function getSyntax() {
        $Fileds = implode(', ', array_keys($this->Dados));
        $Places = ':' . implode(', :', array_keys($this->Dados));
        $this->Create = "INSERT INTO {$this->Tabela} ({$Fileds})VALUES({$Places})";
    }

    private function Execute() {
        $this->Connect();
        try {
            $this->Create->execute($this->Dados);
            $this->Result = $this->Conn->lastInsertId();
            
        } catch (PDOException $e) {
            $this->Result = null;
            echo"Erro ao cadastrar".$e->getMessage(), $e->getLine(), $e->getFile(), $e->getCode();
        }
    }
}
