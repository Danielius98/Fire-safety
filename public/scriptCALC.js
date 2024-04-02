function check(box){
	if(box){
		return 1
	}else{
		return 0
	}
}

function checkStatus(box){
	if(box){
		return "С проверкой"
	}else{
		return "Без проверки"
	}
}

function checkStatus_materials(box){
	if(box){
		return "С установкой"
	}else{
		return "Без установки"
	}
}


function calculateTotal() {
	var m_area = document.getElementById('measured_area').value

	var wrks = document.getElementById('workers').value
	var hrs = document.getElementById('hours').value

	var snsrs = document.getElementById('sensors').value
	var CheckBox = document.getElementById('CheckBox')
	var CheckBox_materials = document.getElementById('CheckBox_materials')



	localStorage.setItem('CheckBoxStatus_materials', checkStatus_materials(CheckBox_materials.checked))
	localStorage.setItem('CheckBoxStatus', checkStatus(CheckBox.checked))
	

	localStorage.setItem('m_area_value', document.getElementById('measured_area').value)

	localStorage.setItem('wrks_value', document.getElementById('workers').value)
	localStorage.setItem('hrs_value', document.getElementById('hours').value)
	localStorage.setItem('snsrs_value', document.getElementById('sensors').value)



	var total =
		parseFloat(m_area) * 200 +
		parseFloat(wrks) * parseFloat(hrs) * 1000 +
		parseFloat(snsrs) * 250.5 + check(CheckBox.checked) * 1000 + check(CheckBox_materials.checked) * 1500 
		
		localStorage.setItem('total_value', total)
		//parseFloat(CheckBox.checked) * 100

	if (total >= 0) {
		document
			.getElementById('total')
			.getElementsByTagName('span')[0].textContent = total.toFixed(2) + ' руб'
	} else {
		document
			.getElementById('total')
			.getElementsByTagName('span')[0].textContent = 'Заполните все поля!'
	}
}
