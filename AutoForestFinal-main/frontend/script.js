let map;
let markers = [];// Array to store the markers (waypoints)
let waypoints = [];// Array to store the coordinates of the waypoints
let polyline = null;// To store the polyline (path between waypoints)

// Map initialization function
function initMap() {
    const defaultLocation = { lat: 18.5200, lng: 73.8550 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: defaultLocation,
        zoom: 10
    });

    map.addListener('click', event => {
        addWaypoint(event.latLng);
    });

    document.getElementById('drawPathButton').onclick = drawPath;
    document.getElementById('sendCoordinatesButton').onclick = sendCoordinatesToServer;
    document.getElementById('viewWaypointsButton').onclick = openWaypointsModal;
    document.getElementById('closeModal').onclick = closeWaypointsModal;
}

// Function to add a waypoint
function addWaypoint(location) {
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        label: (markers.length + 1).toString()
    });
    markers.push(marker);
    waypoints.push({ lat: location.lat(), lng: location.lng() });
}

// Function to draw a path between all waypoints
function drawPath() {
    if (waypoints.length < 2) {
        alert("At least two waypoints are needed to draw a path.");
        return;
    }

    if (polyline) {
        polyline.setMap(null);// Remove previous path if it exists
    }

    polyline = new google.maps.Polyline({
        path: waypoints,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    polyline.setMap(map);// Draw the path on the map
}

// Function to send the coordinates to the backend server
function sendCoordinatesToServer() {
    if (waypoints.length > 0) {
        fetch('http://127.0.0.1:5001/set-waypoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ waypoints: waypoints }),
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));
    } else {
        alert("Please add at least one waypoint.");
    }
}

// Function to open the modal
function openWaypointsModal() {
    updateWaypointList();
    document.getElementById('waypointsModal').style.display = "block";
}

// Function to close the modal
function closeWaypointsModal() {
    document.getElementById('waypointsModal').style.display = "none";
}

// Function to update the list of waypoints
function updateWaypointList() {
    const waypointList = document.getElementById('waypoint-list');
    waypointList.innerHTML = '';// Clear the list

    waypoints.forEach((waypoint, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Waypoint ${index + 1}: (${waypoint.lat.toFixed(4)}, ${waypoint.lng.toFixed(4)})`;

        const deleteButton = document.createElement('button1');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            deleteWaypoint(index);
        };

        listItem.appendChild(deleteButton);
        waypointList.appendChild(listItem);
    });
}

// Function to delete a specific waypoint
function deleteWaypoint(index) {
    markers[index].setMap(null); // Remove marker from the map
    markers.splice(index, 1); // Remove marker from array
    waypoints.splice(index, 1); // Remove waypoint from array

    // Renumber the remaining markers
    markers.forEach((marker, i) => {
        marker.setLabel((i + 1).toString());
    });

    updateWaypointList();
    
    // Check if waypoints are empty and remove the path
    if (waypoints.length === 0) {
        if (polyline) {
            polyline.setMap(null); // Remove the polyline from the map
            polyline = null; // Clear the polyline variable
        }
    } else {
        drawPath(); // Redraw the path if there are remaining waypoints
    }
}


// Close modal if the user clicks anywhere outside of it
window.onclick = function(event) {
    const modal = document.getElementById('waypointsModal');
    if (event.target === modal) {
        closeWaypointsModal();
    }
};
