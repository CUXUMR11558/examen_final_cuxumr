<?php
require_once 'Conexion.php';

class usuario extends Conexion
{
    public $usu_codigo;
    public $usu_nombre;
    public $usu_add;
    public $usu_telefono;
    public $usu_correo;
    public $usu_situacion;

    public function __construct($args = [])
    {
        $this->usu_codigo = $args['usu_codigo'] ?? null;
        $this->usu_nombre = $args['usu_nombre'] ?? '';
        $this->usu_add = $args['usu_add'] ?? '';
        $this->usu_telefono = $args['usu_telefono'] ?? '';
        $this->usu_correo = $args['usu_correo'] ?? null;
        $this->usu_situacion = $args['usu_situacion'] ?? 1; 
    }

    public function guardar()
    {
        $sql = "INSERT INTO usuario (usu_nombre, usu_add, usu_telefono, usu_correo) 
                VALUES ('$this->usu_nombre', '$this->usu_add', '$this->usu_telefono', '$this->usu_correo')";

        $resultado = self::ejecutar($sql);
        return $resultado;
    }

    public function buscar()
    {
        $sql = "SELECT * FROM usuario WHERE usu_situacion = 1";

        if ($this->usu_nombre != '') {
            $sql .= " AND usu_nombre LIKE '%$this->usu_nombre%'";
        }
        if ($this->usu_add != '') {
            $sql .= " AND usu_add LIKE '%$this->usu_add%'";
        }
        if ($this->usu_telefono != '') {
            $sql .= " AND usu_telefono LIKE '%$this->usu_telefono%'";
        }
        if ($this->usu_correo != '') {
            $sql .= " AND usu_correo LIKE '%$this->usu_correo%'";
        }
        if ($this->usu_codigo != null) {
            $sql .= " AND usu_codigo = $this->usu_codigo";
        }

        $resultado = self::servir($sql);
        return $resultado;
    }
}
?>
