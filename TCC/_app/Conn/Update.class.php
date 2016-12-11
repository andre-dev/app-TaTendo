<?php
/**
 * Description of Create
 *
 * @author Maycon Rocha
 */
class Update extends Conn{
    private $Tabela;
    private $Dados;
    private $Termos;
    private $Places;
    private $Result;
    //PDO Statement---------
    private $Update;
    //PDO-------------------
    private $Conn;
    
    public function ExeUpdate($Tabela, array $Dados, $Temos, $ParseString){
        $this->Tabela = (string) $Tabela;
        $this->Dados = $Dados;
        $this->Termos = (string) $Temos;
        parse_str($ParseString, $this->Places);
        $this->getSyntax();
        $this->Execute();
 
    }
    public function getResult(){
        return $this->Result;
    }
    public function getRowCount(){
        return $this->Update->rowCount();
    }
 
    public function setPlaces($ParseString){
        parse_str($ParseString, $this->Places);
        $this->Execute();
        $this->getSyntax();
    }

    //Metod Privados
    private function Connect() {
        $this->Conn = parent::getConn();
        $this->Update = $this->Conn->prepare($this->Update); 
    }

    private function getSyntax() {
        foreach($this->Dados as $Key => $Value):
           $Places[] = $Key .  '=:'.$Key;
        endforeach;
        $Places = implode(', ', $Places);
        $this->Update = "UPDATE {$this->Tabela} SET {$Places} {$this->Termos}";
      
    }

    private function Execute() {
        $this->Connect();
        try {
            $this->Update->execute(array_merge($this->Dados, $this->Places));
            $this->Result = true;
        } catch (PDOException $e) {
            $this->Result = null;
            echo"Erro ao cadastrar".$e->getMessage(), $e->getLine(), $e->getFile(), $e->getCode();
        }
    }
}
