const contenedorBotones = document.getElementById('contenedor-botones')
const contenedorToast = document.getElementById('contenedor-toast')

//Event Listener para detectar el click en los botones
contenedorBotones.addEventListener('click', (e) => {
  e.preventDefault()
  const tipo = e.target.dataset.tipo

  if (tipo === 'exito') {
    mostrarToast({
      tipo: 'exito',
      titulo: 'Exito!',
      descipcion: 'Operación exitosa',
      autoCierre: true
    })
  }
  if (tipo === 'error') {
    mostrarToast({
      tipo: 'error',
      titulo: 'Error',
      descipcion: 'Operación fallida',
      autoCierre: true
    })
  }
  if (tipo === 'info') {
    mostrarToast({
      tipo: 'info',
      titulo: 'Info',
      descipcion: 'Operación informativa'
    })
  }
  if (tipo === 'warning') {
    mostrarToast({
      tipo: 'warning',
      titulo: 'Warning',
      descipcion: 'Operación de advertencia'
    })
  }
})

//Event Listener para detectar el click en el botón de cerrar
contenedorToast.addEventListener('click', (e) => {
  const toastId = e.target.closest('div.toast').id
  const btnCerrar = e.target.closest('button.btn-cerrar')
  if (btnCerrar) {
    cerrarToast(toastId)
  }
})

//Funcion para cerrar el toast
const cerrarToast = (id) => {
  document.getElementById(id)?.classList.add('cerrando')
}
//Función para agregar la clase de cerrando al toast
const mostrarToast = (datos) => {
  const { tipo, titulo, descipcion, autoCierre } = datos
  const nuevoToast = document.createElement('div')
  nuevoToast.classList.add('toast')
  nuevoToast.classList.add(tipo)
  if (autoCierre) nuevoToast.classList.add('autoCierre')

  const numeroAlazar = Math.floor(Math.random() * 100)
  const fecha = Date.now()
  const toastId = fecha + numeroAlazar
  nuevoToast.id = toastId

  //Iconos
  const iconos = {
    exito: `<i class="bi bi-check-circle-fill"></i>`,
    error: `<i class="bi bi-exclamation-octagon-fill"></i>`,
    info: `<i class="bi bi-info-circle-fill"></i>`,
    warning: `<i class="bi bi-exclamation-triangle-fill"></i>`
  }
  //Plantilla del toast
  const toast = `
                <div class="contenido">
                    <div class="icono">
					${iconos[tipo]}
                    </div>
					<div class="texto">
						<p class="titulo">${titulo}</p>
						<p class="description">${descipcion}</p>
					</div>
				</div>
				<button class="btn-cerrar">
					<div class="icono">
						<i class="bi bi-x-lg"></i>
					</div>
				</button>
  `
  //Agregar la plantilla al nuevo toast
  nuevoToast.innerHTML = toast

  //Agregar el nuevo toast al contenedor
  contenedorToast.appendChild(nuevoToast)

  //Dunción para manejar el cierre del toast
  const handleAnimacionCierre = (e) => {
    if (e.animationName === 'cierre') {
      nuevoToast.removeEventListener('animationend', handleAnimacionCierre)
      nuevoToast.remove()
    }
  }

  //Condición para cerrar cuando tiene la clase autoCierre
  if (autoCierre) {
    setTimeout(() => cerrarToast(toastId), 5000)
  }

  //Agregar ecent Listener para detectar cuando termine la animación
  nuevoToast.addEventListener('animationend', handleAnimacionCierre)
}
