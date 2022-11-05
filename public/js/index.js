let nameDOM = document.getElementById('flowername')
let familyDOM = document.getElementById('flowerfamily')
let colourDOM = document.getElementById('flowercolour')
let actionButtonDOM = document.getElementsByClassName('actionbutton')
let transferenceButtonDOM = document.getElementById('transferencebutton')
let formTitleDOM = document.querySelector('.formtitle > h3')
let FlowerList = []

const ShowFlowers = async () => {
    FlowerList = []
    $(".flowers tbody").empty()

    let { data } = await axios.get('/api/flowers')
    data.forEach((item, index) => {
        let fila = `
        <tr>
            <td>${item.FlowerID}</td>
            <td>${item.FlowerName}</td>
            <td>${item.FamilyName}</td>
            <td>${item.ColourName}</td>
            <td><button onclick="DeleteFlower(${index})">Eliminar</button></td>
            <td><button value="${index}" class="actionbutton">Editar</button></td>
        </tr>`
        $(".flowers > tbody").append(fila)
        FlowerList.push(item)
    })
}

const ShowHiddenForm = () => {
    const showdiv = document.querySelector('.flowerform')
    showdiv.classList.replace('hiddenclass', 'showclass')
}

const HideForm = () => {
    const hidediv = document.querySelector('.flowerform')
    hidediv.classList.replace('showclass', 'hiddenclass')
    nameDOM.value = ''
    familyDOM.value = ''
    colourDOM.value = ''
}

const AddActionEvent = () => {
    setTimeout(() => {
        //extenso for que toma cada uno de los eventos con el classname 'actionbutton', esto
        //para poder diferenciar si el evento es aa;adir o editar una planta y utilizar un solo
        //form como resultado.
        for (let i = 0; i < actionButtonDOM.length; i++) {
            console.log(actionButtonDOM[i])
            if (actionButtonDOM[i].value == 'add') {
                actionButtonDOM[i].addEventListener('click', () => {
                    formTitleDOM.innerHTML = 'Agregar nueva planta!'
                    transferenceButtonDOM.addEventListener('click', async () => await CreateFlower())
                    ShowHiddenForm()
                })
            } 
            if(!isNaN(actionButtonDOM[i].value)){
                actionButtonDOM[i].addEventListener('click', function(e) {
                    formTitleDOM.innerHTML = 'Editar la planta!'
                    transferenceButtonDOM.addEventListener('click', async () => await EditFlower(e.target.value))
                    ShowHiddenForm()
                })
            }
        }
    }, 600)
}

/*CRUD ACTIONS */
const CreateFlower = async () => {
    const body = {
        ColourName: colourDOM.value,
        FamilyName: familyDOM.value,
        FlowerName: nameDOM.value
    }
    await axios.post('/api/flowers', body, {
        "Content-Type": "application/json",
        "Accept": "application/json"
    })
    HideForm()
    await ShowFlowers()
    AddActionEvent()
}

const EditFlower = async (index) => {
    const flower = FlowerList[index]
    const body = {
        ColourName: colourDOM.value,
        FamilyName: familyDOM.value,
        FlowerName: nameDOM.value
    }
    await axios.put(`/api/flowers/${flower.FlowerID}`, body, {
        'Accept': 'application/json',
        'Content-type': 'applicaton/json'
    })
    
    HideForm()
    await ShowFlowers()
    AddActionEvent()
}

const DeleteFlower = async (index) => {
    const flower = FlowerList[index]
    const { data } = await axios.delete(`/api/flowers/${flower.FlowerID}`)
    await ShowFlowers()
    AddActionEvent()
}
/*END CRUD ACTIONS. */

ShowFlowers()
AddActionEvent()


