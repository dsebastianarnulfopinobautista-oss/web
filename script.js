let puntos = 0;

function iniciarSesion() {
  // --- USUARIO Y CONTRASEÑA DEFINIDOS ---
  const usuarioCorrecto = "admin";
  const passCorrecto = "1234";
  // ------------------------------------

  let usuario = document.getElementById("usuario").value;
  let pass = document.getElementById("password").value;

  // Comparamos el usuario y la contraseña ingresados con los correctos
  if (usuario === usuarioCorrecto && pass === passCorrecto) {
    mostrarPantalla("inicio");
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

function cerrarSesion() {
  mostrarPantalla("login");
  document.getElementById("usuario").value = "";
  document.getElementById("password").value = "";
}

function mostrarPantalla(id) {
  document.querySelectorAll(".pantalla").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Completar tarea con foto
function completarTarea(input) {
  if (input.files && input.files[0]) {
    const reto = input.closest(".reto");
    if (!reto.classList.contains("completado")) {
      puntos += 25;
      document.getElementById("contadorPuntos").innerText = puntos;
      reto.classList.add("completado");
      reto.innerHTML = `<span>${reto.innerText}</span> <i class="fas fa-check-circle" style="color:green;"></i>`;
      actualizarPlanta();
    }
  }
}

// Cambiar evolución de planta
function actualizarPlanta() {
  const img = document.getElementById("evolucionSemilla");
  if (puntos < 50) {
    img.src = "https://cdn-icons-png.flaticon.com/512/1346/1346665.png"; // semilla
  } else if (puntos < 100) {
    img.src = "https://cdn-icons-png.flaticon.com/512/4273/4273467.png"; // brote
  } else if (puntos < 200) {
    img.src = "https://cdn-icons-png.flaticon.com/512/766/766040.png"; // planta pequeña
  } else {
    img.src = "https://cdn-icons-png.flaticon.com/512/765/765744.png"; // árbol
  }
}

// Mostrar/Ocultar calendario
function toggleCalendario() {
  let cal = document.getElementById("calendarioContainer");
  if (cal.style.display === "block") {
    cal.style.display = "none";
  } else {
    generarCalendario();
    cal.style.display = "block";
  }
}

function generarCalendario() {
  let hoy = new Date();
  let mes = hoy.getMonth();
  let anio = hoy.getFullYear();
  let primerDia = new Date(anio, mes, 1).getDay();
  let diasMes = new Date(anio, mes + 1, 0).getDate();

  let tabla = "<table><tr>";
  let diasSemana = ["D", "L", "M", "X", "J", "V", "S"];
  diasSemana.forEach(d => tabla += "<td><b>" + d + "</b></td>");
  tabla += "</tr><tr>";

  for (let i = 0; i < primerDia; i++) {
    tabla += "<td></td>";
  }

  for (let d = 1; d <= diasMes; d++) {
    let clase = (d === hoy.getDate()) ? "hoy" : "";
    tabla += `<td class="${clase}">${d}</td>`;
    if ((d + primerDia) % 7 === 0) tabla += "</tr><tr>";
  }

  tabla += "</tr></table>";
  document.getElementById("calendarioContainer").innerHTML = tabla;
}