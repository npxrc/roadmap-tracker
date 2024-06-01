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
    let previousAttempts = localStorage.getItem('attempts');

    // Parse existing data as JSON or initialize an empty array
    previousAttempts = previousAttempts ? JSON.parse(previousAttempts) : [];

    // Create a new attempt object
    const newAttempt = {
        name: input1Value,
        trim: input2Value,
        colour: input3Value,
        rims: input4Value
    };

    // Add the new attempt to the array
    previousAttempts.push(newAttempt);

    // Save the updated array back to local storage
    localStorage.setItem('attempts', JSON.stringify(previousAttempts));

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
    let previousAttempts = localStorage.getItem('attempts');
    previousAttempts = previousAttempts ? JSON.parse(previousAttempts) : [];
    console.log(previousAttempts);
    if (previousAttempts.length > 0) {
        $('listOCars').innerHTML = "";
        for (let i = 0; i < previousAttempts.length; i++) {
            let toPush = {
                "name": previousAttempts[i].name,
                "trim": previousAttempts[i].trim,
                "colour": previousAttempts[i].colour,
                "rims": previousAttempts[i].rims
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
    let previousAttempts = localStorage.getItem('attempts');
    previousAttempts = previousAttempts ? JSON.parse(previousAttempts) : [];
    
    // Remove the attempt at the specified index
    previousAttempts.splice(index, 1);

    // Save the updated array back to local storage
    localStorage.setItem('attempts', JSON.stringify(previousAttempts));

    // Update the displayed attempts
    localStorage.setItem('toRemove','yes')
    location.reload()
}