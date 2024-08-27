const formulario = document.querySelector('form')
const nombreInput = document.getElementById('nombre')
const paises = document.getElementById('pais')
const tablausuario = document.getElementById('tablausuario')

const consultaUsuario = async (e) => {
    e.preventDefault();
    let nombre = nombreInput.value.trim()
    if (!nombre) {
        alert('Por favor ingrese un nombre de usuario de GitHub')
        return
    }
    console.log(nombre)

    try {
        const consulta = await fetch(`https://api.github.com/users/${nombre}`, { method: 'GET' })
       console.log(consulta);

        if (consulta.status == 200) {
            const datos = await consulta.json()
            console.log(datos);

            document.getElementById('usu_nombre').value = datos.name
        } else {
            alert('Datos vacíos')
        }

    } catch (error) {
        console.log(error)
    }
}

const consultaPaises = async () => {
    try {
        const consulta = await fetch(`https://restcountries.com/v3.1/all`)
        //console.log(consulta);

        if (consulta.status == 200) {
            const datos = await consulta.json()
            console.log(datos);

            datos.forEach(pais => {
                const option = document.createElement('option');
                //option.value = pais.cca2
                option.dataset.root = pais.idd ? pais.idd.root : ''
                option.dataset.suffixes = pais.idd ? pais.idd.suffixes.join(', ') : ''
                option.textContent = pais.name.common
                paises.appendChild(option)
            });
        } else {
            alert('Datos vacíos')
        }

    } catch (error) {
        console.log(error)
    }
}


const codigopais = (e) => {
    const selectedOption = e.target.selectedOptions[0]
    //console.log(selectedOption)
    const root = selectedOption.dataset.root || 'Datos no disponibles'
    const suffixes = selectedOption.dataset.suffixes || ''
    document.getElementById('usu_add').value = `${root}${suffixes}`
}

const getUsuarios = async (alerta='si') => {
    const nombre = formulario.usu_nombre.value;
    const codigo = formulario.usu_add.value;
    const telefono = formulario.usu_telefono.value;
    const correo = formulario.usu_correo.value;

    const url = `/examen_final_cuxumr1/controllers/usuario/index.php?usu_nombre=${nombre}&usu_add=${codigo}&usu_telefono=${telefono}&usu_correo=${correo}`;
    const config = {
        method: 'GET'
    }

    try {
        const respuesta = await fetch(url, config);
        console.log(respuesta)
        const data = await respuesta.json();
        tablausuario.tBodies[0].innerHTML = ''
        const fragment = document.createDocumentFragment();
        let contador = 1;
        console.log(data);
        if (respuesta.status == 200 ) {
            if(alerta=='si'){
                Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    icon: "success",
                    title: 'Datos encontrados',
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                }).fire();
            }

            if (data.length > 0) {
                data.forEach(usuario => {
                    const tr = document.createElement('tr')
                    const celda1 = document.createElement('td')
                    const celda2 = document.createElement('td')
                    const celda3 = document.createElement('td')
                    const celda4 = document.createElement('td')
                    const celda5 = document.createElement('td')

                    celda1.innerText = contador;
                    celda2.innerText = usuario.usu_nombre;
                    celda3.innerText = usuario.usu_add;
                    celda4.innerText = usuario.usu_telefono;
                    celda5.innerText = usuario.usu_correo;

                    tr.appendChild(celda1)
                    tr.appendChild(celda2)
                    tr.appendChild(celda3)
                    tr.appendChild(celda4)
                    tr.appendChild(celda5)

                    fragment.appendChild(tr);
                    contador++;
                });
            } else {
                const tr = document.createElement('tr')
                const td = document.createElement('td')
                td.innerText = 'No hay puestos disponibles'
                td.colSpan = 5;
                tr.appendChild(td)
                fragment.appendChild(tr)
            }
        } else {
            console.log('hola');
        }

        tablausuario.tBodies[0].appendChild(fragment)
    } catch (error) {
        console.log(error);
    }
}

getUsuarios();

const guardarUsuario = async (e) => {
    e.preventDefault();
    btnGuardar.disabled = true;

    const url = '/examen_final_cuxumr1/controllers/usuario/index.php'
    const formData = new FormData(formulario)

    formData.append('tipo', 1)
    formData.delete('usu_codigo')

    const config = {
        method: 'POST',
        body: formData
    }

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        console.log(data)
        const { mensaje, codigo, detalle } = data
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "success",
            title: mensaje,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        }).fire();

        if (codigo == 1 && respuesta.status == 200) {
            getUsuarios(alerta='no');
            formulario.reset();
        } else {
            console.log(detalle);
        }
    } catch (error) {
        console.log(error);
    }
    btnGuardar.disabled = false;
}

consultaPaises();

nombreInput.addEventListener('blur', consultaUsuario);
paises.addEventListener('change', codigopais);
formulario.addEventListener('submit', guardarUsuario);
