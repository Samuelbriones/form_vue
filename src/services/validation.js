export function validateForm(form, usuarios, editId = null) {
  const errors = [];

  if (!form.dni) {
    errors.push("El DNI es obligatorio");
  } else if (!/^[0-9]{8,10}$/.test(form.dni)) {
    errors.push("El DNI debe ser numérico y tener entre 8 y 10 dígitos");
  } else if (usuarios.some(u => u.dni === form.dni && u.id !== editId)) {
    errors.push("El DNI ya está registrado");
  }

  if (!form.nombres || form.nombres.length < 2) {
    errors.push("El nombre debe tener al menos 2 caracteres");
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.nombres)) {
    errors.push("El nombre no debe contener números ni caracteres especiales");
  }

  if (!form.apellidos || form.apellidos.length < 2) {
    errors.push("El apellido debe tener al menos 2 caracteres");
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.apellidos)) {
    errors.push("El apellido no debe contener números ni caracteres especiales");
  }

  if (!form.fechaNacimiento) {
    errors.push("Debe ingresar una fecha de nacimiento");
  } else if (new Date(form.fechaNacimiento) > new Date()) {
    errors.push("La fecha de nacimiento no puede ser futura");
  }

  if (!form.genero) errors.push("Debe seleccionar un género");
  if (!form.ciudad) errors.push("Debe seleccionar una ciudad");

  return errors;
}
