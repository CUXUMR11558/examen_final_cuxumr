<?php include_once '../../includes/header.php' ?>

<?php
// $objCliente = new Empleado();
//     $clientes = $objCliente->buscar();

//require '../../models/puesto.php';
//$puesto = new Puesto($_GET);
//$puestos = $puesto->buscar();
?>
<br><br><br><br><br>
<div class="container">
    <h1 class="text-center">BUSQUEDA DE DATOS DE USUARIOS</h1>
    <div class="row justify-content-center mb-3">
        <form class="col-lg-8 border bg-light p-3">
            <input type="hidden" name="emp_codigo" id="emp_codigo">

            <div class="row">
                <div class="col mb-3">
                    <div class="col">
                        <label for="nombre">NOMBRE USUARIO</label>
                        <input type="text" name="nombre" id="nombre" class="form-control" required>
                        <p>NOMBRE REAL</p>
                        <input type="text" name="usu_nombre" id="usu_nombre">
                    </div>
                </div>
                 <div class="col mb-3">
                 <label for="pais">seleccione un pais</label>
                    <select name="pais" id="pais" class="form-control" required>
                        <option value="">Seleccione</option>
                    </select>

                    <p>codigo de area</p>
                    <input type="text" name="usu_add" id="usu_add">
                </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                    <div class="col">
                        <label for="usu_telefono">NUMERO DE TELEFONO</label>
                        <input type="text" name="usu_telefono" id="usu_telefono" class="form-control" required>
                    </div>
                </div>
                <div class="col mb-3">
                    <div class="col">
                        <label for="usu_correo">CORREO ELECTRONICO</label>
                        <input type="text" name="usu_correo" id="usu_correo" class="form-control" required>
                    </div>
                </div> 

               
            </div>

            <div class="row justify-content-center mb-3">
                <div class="col">
                    <button type="submit" id="btnGuardar" class="btn btn-primary w-100">Guardar</button>
                </div>
            </div>
        </form>





    </div>
    <div class="row justify-content-center">
        <div class="col-lg-8 table-responsive">
            <h2 class="text-center">DATOS GUARDADOS EN LA API</h2>
            <table class="table table-bordered table-hover" id="tablaUsuarios">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>nombres del Usuario</th>
                        <th>codigo area</th>
                        <th>telefono</th>
                        <th>Correo electronico</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="4">No hay puestos disponibles</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<script defer src="../../src/js/usuarios/index.js"></script>
<?php include_once '../../includes/footer.php' ?>