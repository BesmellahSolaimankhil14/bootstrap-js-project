let saveDataArray = JSON.parse(localStorage.getItem('carData')) || [];

function btnsave() {
    const saveButton = document.getElementById('btn-save');
    saveButton.disabled = true;

    const carName = document.getElementById('carname').value;
    const carColor = document.getElementById('carcolor').value;
    const carEngine = document.getElementById('carengine').value;
    const carModel = document.getElementById('carmodel').value;
    const fuelType = document.getElementById('fueltype').value;
    const transmissionType = document.getElementById('Transmissiontype').value;
    const steeringType = document.getElementById('steeringtype').value;
    const carImage = document.getElementById('carImage').files[0]; 

    if (!carName || !carColor || !carEngine || !carModel || !fuelType || !transmissionType || !steeringType || !carImage) {
        alert("Please fill in all fields and upload a car image.");
        saveButton.disabled = false; 
        return;
    }

    const imageUrl = URL.createObjectURL(carImage);

    const saveData = {
        carname: carName,
        carcolor: carColor,
        carengine: carEngine,
        carmodel: carModel,
        fueltype: fuelType,
        Transmissiontype: transmissionType,
        steeringtype: steeringType,
        carImage: imageUrl
    };

    saveDataArray.push(saveData);
    localStorage.setItem('carData', JSON.stringify(saveDataArray));

    displayCars();

    const modal1 = new bootstrap.Modal(document.getElementById('myModal'));
    modal1.hide();

    document.getElementById('form').reset();

    alert("Car data has been saved successfully!");
    saveButton.disabled = false;
}

function displayCars() {
    let parentCard = document.getElementById('div0');
    parentCard.innerHTML = '';

    if (saveDataArray.length === 0) {
        parentCard.innerHTML = '<p>No cars available. Please add some cars!</p>';
        return;
    }

    saveDataArray.forEach((data, index) => {
        let child = `
            <div class="card col-sm-12 col-md-6 col-lg-3 mb-4 mx-3">
                <img src="${data.carImage}" class="card-img-top" alt="Car image">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Car name => ${data.carname}</li>
                    <li class="list-group-item">Car Color => ${data.carcolor}</li>
                    <li class="list-group-item">Car engine => ${data.carengine}</li>
                    <li class="list-group-item">Car model => ${data.carmodel}</li>
                    <li class="list-group-item">Fuel type => ${data.fueltype}</li>
                    <li class="list-group-item">Transmission type => ${data.Transmissiontype}</li>
                    <li class="list-group-item">Steering => ${data.steeringtype}</li>
                </ul>
                <div class="card-body mx-auto">
                    <button class="btn btn-success" onclick="editCar(${index})" id="btn-edit">Edit</button>
                    <button class="btn btn-danger" onclick="deleteCar(${index})" id="btn-delete">Delete</button>
                </div>
            </div>`;
        parentCard.innerHTML += child;
    });
}

function deleteCar(index) {
    if (confirm("Are you sure you want to delete this car? This action cannot be undone.")) {
        saveDataArray.splice(index, 1);
        localStorage.setItem('carData', JSON.stringify(saveDataArray));
        displayCars();
        alert("Car has been deleted successfully.");
    } else {
        alert("Delete action canceled.");
    }
}

function editCar(index) {
    const car = saveDataArray[index];
    document.getElementById('carname').value = car.carname;
    document.getElementById('carcolor').value = car.carcolor;
    document.getElementById('carengine').value = car.carengine;
    document.getElementById('carmodel').value = car.carmodel;
    document.getElementById("fueltype").value = car.fueltype;
    document.getElementById("Transmissiontype").value = car.Transmissiontype;
    document.getElementById("steeringtype").value = car.steeringtype;

    const imagePreview = document.getElementById('image-preview');
    imagePreview.src = car.carImage;

    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();

    document.getElementById('btn-save').onclick = function() {
        updateCar(index);
    };
}

function updateCar(index) {
    const updatedData = {
        carname: document.getElementById('carname').value,
        carcolor: document.getElementById('carcolor').value,
        carengine: document.getElementById("carengine").value,
        carmodel: document.getElementById("carmodel").value,
        fueltype: document.getElementById("fueltype").value,
        Transmissiontype: document.getElementById("Transmissiontype").value,
        steeringtype: document.getElementById("steeringtype").value,
    };

    // Get the new image if the user selects one
    const carImageFile = document.getElementById('carImage').files[0];
    let carImageUrl = saveDataArray[index].carImage;
    if (carImageFile) {
        carImageUrl = URL.createObjectURL(carImageFile);
    }

    saveDataArray[index] = { ...updatedData, carImage: carImageUrl };
    localStorage.setItem('carData', JSON.stringify(saveDataArray));
    displayCars();

    const modal = new bootstrap.Modal(document.getElementById("myModal"));
    modal.hide();

    alert("Car data has been updated successfully!");
}

window.onload = displayCars;
