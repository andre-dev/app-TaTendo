<?php
/**
 * Description of Create
 *
 * @author Maycon Rocha
 */
class Delete extends Conn{
    private $Tabela;
    private $Termos;
    private $Places;
    private $Result;
    //PDO Statement---------
    private $Delete;
    //PDO-------------------
    private $Conn;
    
    public function ExeDelete($Tabela, $Temos, $ParseString){
        $this->Tabela = (string) $Tabela;
        $this->Termos = (string) $Temos;
        parse_str($ParseString, $this->Places);
        $this->getSyntax();
        $this->Execute();
    }
    public function getResult(){
        return $this->Result;
    }
    public function getRowCount(){
        return $this->Delete->rowCount();
    }
 
    public function setPlaces($ParseString){
        parse_str($ParseString, $this->Places);
        $this->Execute();
        $this->getSyntax();
    }

    //Metod Privados
    private function Connect() {
        $this->Conn = parent::getConn();
        $this->Delete = $this->Conn->prepare($this->Delete);
    }

    private function getSyntax() {
    $this->Delete = "DELETE FROM {$this->Tabela} {$this->Termos}";
      
    }

    private function Execute() {
        $this->Connect();
        try {
            $this->Delete->execute($this->Places);
            $this->Result = true;
        } catch (Exception $ex) {
             $this->Result = null;
            echo"Erro ao cadastrar".$e->getMessage(), $e->getLine(), $e->getFile(), $e->getCode();
        }
    }
}
