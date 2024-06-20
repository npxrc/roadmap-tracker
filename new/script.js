function $(e){return document.getElementById(e)}

function saveToLocalStorage() {
    // Get values from input fields
    const year = $('year').value;
    const input1Value = $('input1').value;
    const input2Value = $('input2').value;
    const input3Value = $('input3').value;
    const input4Value = $('input4').value;
    if (
        (year.length!==4||isNaN(Math.floor(year)))||
        (input1Value.trim()==""||input1Value=="")||
        (input2Value.trim()==""||input2Value=="")||
        (input3Value.trim()==""||input3Value=="")||
        (input4Value.trim()==""||input4Value=="")
    ){
        alert('enter real shit bro')
        return;
    }

    // Retrieve existing data from local storage
    let previouscars = localStorage.getItem('cars');

    // Parse existing data as JSON or initialize an empty array
    previouscars = previouscars ? JSON.parse(previouscars) : [];

    // Create a new attempt object
    const newcar = {
        name: `${year} ${input1Value}`,
        trim: input2Value,
        rims: input3Value,
        colour: input4Value
    };

    // Add the new attempt to the array
    previouscars.push(newcar);

    // Save the updated array back to local storage
    localStorage.setItem('cars', JSON.stringify(previouscars));

    new notif('Saved','Vehicle saved to local storage!').send()
    $('year').value='';
    $('input1').value='';
    $('input2').value='';
    $('input4').value='';
    $('input3').value='';
    $('year').focus()
}

function back(){
    let toGo = document.createElement('a');
    toGo.href = "../"
    toGo.click()
}

function switchMode() {
    if ($('createCar').style.display !== 'none') {
        $('createCar').style.display = 'none';
        $('removeCar').style.display = 'block';
        displaySavedCars();
    } else {
        $('createCar').style.display = 'block';
        $('removeCar').style.display = 'none';
    }
}

function displaySavedCars() {
    let cars = JSON.parse(localStorage.getItem('cars')) || [];
    let listHtml = cars.length > 0 ? '' : 'No vehicles saved yet.';
    cars.forEach((car, index) => {
        listHtml += `
            <div class="car-item">
                <div class="car-info">
                    <strong>${car.name}</strong> - ${car.trim}
                </div>
                <button class="remove" onclick="removeCar(${index})">Remove</button>
            </div>`;
    });
    $('listOCars').innerHTML = listHtml;
}

function removeCar(index) {
    let cars = JSON.parse(localStorage.getItem('cars')) || [];
    cars.splice(index, 1);
    localStorage.setItem('cars', JSON.stringify(cars));
    displaySavedCars();
}

window.onload = function() {
    if (window.location.hash === '#manage') {
        switchMode();
    }
};

class notif {
    constructor(title, body) {
        this.title = title;
        this.body = body;
        let elem = document.createElement('div');
        elem.classList.add('notif');
        title = document.createElement('h3');
        title.innerHTML = this.title+'<br>';
        body = document.createElement('p');
        body.innerHTML = this.body;
        elem.appendChild(title);
        elem.appendChild(body);

        this.elem = elem;
        this.title = title;
        this.body = body;
    }
    send(timeout) {
        $('notifs').appendChild(this.elem); // Fixed typo: changed "this.elems.notif" to "this.elem"
        setTimeout(() => {
            this.elem.classList.add('fade-out');
            setTimeout(() => {
                $('notifs').removeChild(this.elem);
            }, 1000);
        }, isNaN(timeout)?5000:(timeout*1000));
        $('notifs').scrollTop = $('notifs').scrollHeight;
    }
    edit(newTitle, newMsg) {
        if (newTitle!==null&&newTitle!==undefined){
            this.title.innerHTML=newTitle
        }
        if (newMsg!==null&&newMsg!==undefined){
            this.body.innerHTML=newMsg
        }
        this.elem.innerHTML=''
        this.elem.appendChild(this.title)
        this.elem.appendChild(this.body)
    }
}