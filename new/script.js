function $(e){return document.getElementById(e)}
function saveToLocalStorage() {
    // Get values from input fields
    const input1Value = $('input1').value;
    const input2Value = $('input2').value;
    const input3Value = $('input3').value;
    const input4Value = $('input4').value;
    if (
        (input1Value.trim()==""||input1Value==""||input1Value.trim().length<5)||
        (input2Value.trim()==""||input2Value=="")||
        (input3Value.trim()==""||input3Value==""||input3Value.trim().length<3)||
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
        name: input1Value,
        trim: input2Value,
        rims: input3Value,
        colour: input4Value
    };

    // Add the new attempt to the array
    previouscars.push(newcar);

    // Save the updated array back to local storage
    localStorage.setItem('cars', JSON.stringify(previouscars));

    alert('Saved Vehicle locally!');
    $('input1').value='';
    $('input2').value='';
    $('input4').value='';
    $('input3').value='';
    location.reload()
}
function back(){
    let toGo = document.createElement('a');
	toGo.href = "../"
	toGo.click()
}

$('createCar').style.display="block";
$('removeCar').style.display="none";
let visible='create'
function switchMode(){    
    if (visible=='create'){
        $('createCar').style.display="none";
        $('removeCar').style.display="block";
        visible='remove'
    } else if (visible=='remove'){
        $('createCar').style.display="block";
        $('removeCar').style.display="none";
        visible='create'
    }
}
let removable = [];

function setRemovable() {
    let previouscars = localStorage.getItem('cars');
    previouscars = previouscars ? JSON.parse(previouscars) : [];
    console.log(previouscars);
    if (previouscars.length > 0) {
        $('listOCars').innerHTML = "";
        for (let i = 0; i < previouscars.length; i++) {
            let toPush = {
                "name": previouscars[i].name,
                "trim": previouscars[i].trim,
                "colour": previouscars[i].colour,
                "rims": previouscars[i].rims
            };

            let page = document.createElement('div');
            page.innerHTML = `<p>${toPush.name} - ${toPush.trim} - ${toPush.colour} - ${toPush.rims}</p><hr>`;
            
            // Add a button to remove the specific attempt
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('remove')
            deleteButton.addEventListener('click', function() {
                removeAttempt(i);
            });

            // Append the delete button to the page
            page.appendChild(deleteButton);

            $('listOCars').appendChild(page);
        }
    }
}
setRemovable()
function removeAttempt(index) {
    let previouscars = localStorage.getItem('cars');
    previouscars = previouscars ? JSON.parse(previouscars) : [];
    
    // Remove the attempt at the specified index
    previouscars.splice(index, 1);

    // Save the updated array back to local storage
    localStorage.setItem('cars', JSON.stringify(previouscars));

    // Update the displayed cars
    localStorage.setItem('toRemove','yes')
    location.reload()
}