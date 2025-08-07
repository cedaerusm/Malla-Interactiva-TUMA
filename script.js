const anos = [
  {
    nombre: "Año 1",
    semestres: [
      ["CAE012-A","EFI100-T","MAT001-A","CAE013-A","FIS004-A","CAE011-A"],
      ["CAE022-A","CAE024-A","CAE021-A","CAE025-A","MAT002-A","CAE023-A"]
    ]
  },
  {
    nombre: "Año 2",
    semestres: [
      ["CAE033-A","CAE036-A","CAE034-A","CAE032-A","CAE031-A","CAE035-A"],
      ["CAE042-A","CAE043-A","CAE045-A","CAE041-A","CAE044-A"]
    ]
  },
];
// Definición de ramos y requisitos
const ramos = {
  "CAE012-A": {nombre:"DIBUJO TÉCNICO",requisitos:[]},
  "EFI100-T": {nombre:"EDUCACIÓN FÍSICA",requisitos:[]},
  "MAT001-A": {nombre:"ELEMENTOS DE LA MATEMATICA	",requisitos:[]},
  "CAE013-A": {nombre:"INGLÉS TÉCNICO I",requisitos:[]},
  "FIS004-A": {nombre:"INTRODUCCIÓN A LA FÍSICA APLICADA A LA AERONÁUTICA",requisitos:[]},
  "CAE011-A": {nombre:"TECNOLOGIA DE LOS MATERIALES AERONÁUTICOS",requisitos:[]},
  "CAE022-A": {nombre:"AERODINÁMICA",requisitos:["FIS004-A","CAE013-A"]},
  "CAE024-A": {nombre:"ESTRUCTURAS Y SISTEMAS	",requisitos:["CAE013-A"]},
  "CAE021-A": {nombre:"GESTIÓN DEL MANTENIMIENTO AERONÁUTICO",requisitos:["CAE012-A"]},
  "CAE025-A": {nombre:"INGLÉS TÉCNICO II ",requisitos:["CAE013-A"]},
  "MAT002-A": {nombre:"MATEMATICA APLICADA",requisitos:["MAT001-A"]},
  "CAE023-A": {nombre:"SISTEMAS ELÉCTRICOS",requisitos:["MAT001-A"]},
  "CAE033-A": {nombre:"HIDRONEUMÁTICA",requisitos:["FIS004-A","MAT001-A"]},
  "CAE036-A": {nombre:"INGLÉS TÉCNICO III",requisitos:["CAE025-A"]},
  "CAE034-A": {nombre:"MOTORES RECÍPROCOS Y HÉLICES ",requisitos:["CAE025-A","CAE021-A"]},
  "CAE032-A": {nombre:"SEGURIDAD OPERACIONAL Y SMS",requisitos:["CAE021-A"]},
  "CAE031-A": {nombre:"SISTEMAS DIGITALES",requisitos:["MAT002-A"]},
  "CAE035-A": {nombre:"SISTEMAS ELECTRÓNICOS",requisitos:["MAT002-A","CAE023-A"]},
  "CAE042-A": {nombre:"ALA ROTATORIA ",requisitos:["CAE034-A"]},
  "CAE043-A": {nombre:"AVIÓNICA",requisitos:["CAE035-A","CAE031-A"]},
  "CAE045-A": {nombre:"INGLÉS CONVERSACIONAL",requisitos:["CAE013-A","CAE036-A","CAE025-A"]},
  "CAE041-A": {nombre:"MICROPROCESADORES",requisitos:["CAE031-A","CAE023-A"]},
  "CAE044-A": {nombre:"MOTORES A TURBINA ",requisitos:["CAE034-A"]}
};

const contenedor = document.getElementById("malla");
const aprobados = new Set();

anos.forEach(ano => {
  const col = document.createElement("div");
  col.classList.add("columna-ano");
  const titulo = document.createElement("h2");
  titulo.textContent = ano.nombre;
  col.appendChild(titulo);

  const semestresWrapper = document.createElement("div");
  semestresWrapper.classList.add("semestres-paralelos");

  ano.semestres.forEach((semestre, i) => {
    const semestreDiv = document.createElement("div");
    semestreDiv.classList.add("semestre");
    semestreDiv.innerHTML = `<h3>Semestre ${i + 1}</h3>`;

    semestre.forEach(cod => {
      const div = document.createElement("div");
      div.classList.add("ramo");
      if (ramos[cod].requisitos.length > 0) div.classList.add("bloqueado");
      div.id = cod;
      div.innerHTML = `<strong>${cod}</strong><br>${ramos[cod].nombre}`;
      div.addEventListener("click", () => toggleRamo(cod, div));
      semestreDiv.appendChild(div);
    });

    semestresWrapper.appendChild(semestreDiv);
  });

  col.appendChild(semestresWrapper);
  contenedor.appendChild(col);
});

function toggleRamo(cod, div) {
  if (div.classList.contains("bloqueado")) return;

  if (div.classList.contains("aprobado")) {
    div.classList.remove("aprobado");
    aprobados.delete(cod);
  } else {
    div.classList.add("aprobado");
    aprobados.add(cod);
  }

  actualizarBloqueos();
}

function actualizarBloqueos() {
  Object.keys(ramos).forEach(cod => {
    const div = document.getElementById(cod);
    if (!div) return;
    if (div.classList.contains("aprobado")) return;
    const reqs = ramos[cod].requisitos;
    const desbloqueado = reqs.every(r => aprobados.has(r));
    if (desbloqueado) {
      div.classList.remove("bloqueado");
    } else {
      div.classList.add("bloqueado");
    }
  });
}
