const search = document.getElementById('search');

const button_encriptar = document.querySelector('#button_encriptar');
const button_desencriptar = document.querySelector('#button_desencriptar');

const container_result = document.querySelector('#container_result2');
const muñeco = document.querySelector('#muñeco2');
const mensaje_vacio = document.getElementById('mensaje_vacio2');
const mensaje_respuesta = document.getElementById('mensaje_respuesta2');

const vocales_cambiar = ['e', 'i', 'a', 'o', 'u'];
const cambio = ['enter', 'imes', 'ai', 'ober', 'ufat'];

let encrypted;
let result = '';
let newStr = '';
let idContainer = [];

//TODO donde se muestra el resultado
const div = (result) => {
	let id = uuid.v4();

	let div = document.createElement('div');
	div.classList.add('div');

	idContainer.push({ div: id });
	div.setAttribute('id', id);
	div.innerHTML = `<p class="div_p">${result}</p> <button class="div-button_delete" >X</button> <button class="div-button_copy">copy</button> `;

	return div;
};

const see = (result) => {
	if (result > 0) {
		htmlDiv = div(result);
	}

	htmlDiv = div(result);

	if (div.length > 0) {
		mensaje_vacio.classList.add('deactivate');
		mensaje_respuesta.classList.add('deactivate');
		muñeco.classList.add('deactivate');
		container_result.style.paddingTop = '10px';

		container_result.appendChild(htmlDiv);
		search.value = '';
	}
};

//TODO donde se muestra el resultado
/********************************************************************************************************************************/
//! funciones de los botones
const deleteDiv = (e) => {
	let id = e.target.parentNode.id;
	let div = document.getElementById(id);
	div.remove();

	if (container_result.childElementCount === 3) {
		mensaje_vacio.classList.remove('deactivate');
		mensaje_respuesta.classList.remove('deactivate');
		muñeco.classList.remove('deactivate');
		container_result.style.paddingTop = '60%';
	}
};

const copyDiv = (e) => {
	let id = e.target.parentNode.id;
	let div = document.getElementById(id);
	let text = div.querySelector('.div_p');
	let result = text.textContent;
	// copyText.setSelectionRange(0, 99999); /*For mobile devices*/
	navigator.clipboard.writeText(result);
};

const encriptar = () => {
	encrypted = Array.from(search.value);
	let accents = ['é', 'í', 'á', 'ó', 'ú'];

	let uppercase = encrypted.some((element) => {
		if (
			element === element.toUpperCase() &&
			element != ' ' &&
			element != '\n'
		) {
			console.log(element === element.toUpperCase());
			return true;
		}
	});

	let number = encrypted.some((element) => {
		!isNaN(element);
	});

	let accent = encrypted.some((element) => {
		for (let index = 0; index < accents.length; index++) {
			if (element.toLowerCase() == accents[index]) {
				console.log(element);

				return true;
			}
		}
	});

	console.log(uppercase, number, accent);

	if (
		search.value != '' &&
		uppercase === false &&
		number === false &&
		accent === false
	) {
		encrypted = Array.from(search.value);

		for (let i = 0; i < encrypted.length; i++) {
			for (let j = 0; j < vocales_cambiar.length; j++) {
				if (encrypted[i] === vocales_cambiar[j]) {
					encrypted[i] = cambio[j];
				}
			}
		}

		result = encrypted.join('');

		see(result);
	}
	return;
};

const desencriptar = () => {
	encrypted = Array.from(search.value);
	let accents = ['é', 'í', 'á', 'ó', 'ú'];

	let uppercase = encrypted.some((element) => {
		if (
			element === element.toUpperCase() &&
			element != ' ' &&
			element != '\n'
		) {
			console.log(element === element.toUpperCase());
			return true;
		}
	});

	let number = encrypted.some((element) => {
		!isNaN(element);
	});

	let accent = encrypted.some((element) => {
		for (let index = 0; index < accents.length; index++) {
			if (element.toLowerCase() == accents[index]) {
				console.log(element);

				return true;
			}
		}
	});

	console.log(uppercase, number, accent);

	if (
		search.value != '' &&
		uppercase === false &&
		number === false &&
		accent === false
	) {
		encrypted = search.value;

		for (let i = 0; i < encrypted.length; i++) {
			if (encrypted[i] === 'e' && encrypted[i + 4] === 'r') {
				// si el caracter es 'e' y 4 caracteres despues encontramos 'r'
				newStr += 'e'; // agregamos 'e' a newStr
				i += 4; // siguente
			} else if (encrypted[i] === 'i' && encrypted[i + 3] === 's') {
				// si el caracter es 'i' y 3 caracteres despues encontramos 's'
				newStr += 'i'; // agregamos 'i' a newStr
				i += 3;
			} else if (encrypted[i] === 'a' && encrypted[i + 1] === 'i') {
				newStr += 'a';
				i += 1;
			} else if (encrypted[i] === 'o' && encrypted[i + 3] === 'r') {
				newStr += 'o';
				i += 3;
			} else if (encrypted[i] === 'u' && encrypted[i + 3] === 't') {
				newStr += 'u';
				i += 3;
			} else {
				// si no se cumple ninguna de las condiciones anteriores
				newStr += encrypted[i]; // volvemos a agregar el caracter a newStr
			}
		}

		see(newStr);
		newStr = '';
	}
};
//! funciones de los botones
/********************************************************************************************************************************/

container_result.addEventListener('click', (e) => {
	/*en esta parte lo que hago es que cuando hago click en el boton,
	veo si el boton tiene una clase en especifico, si es asi, ejecuto la funcion*/
	/* la 'e' trae toda la etiqueta por eso busco la clase*/

	if (e.target.className === 'div-button_delete') {
		deleteDiv(e);
	}

	if (e.target.className === 'div-button_copy') {
		copyDiv(e);
	}
});

button_encriptar.onclick = encriptar;

button_desencriptar.onclick = desencriptar;

// div_button_delete.onclick = deleteDiv;

// div_button_copy.onclick = copyDiv;
