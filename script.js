"use strict";

const form = document.getElementById("user-form");
const tbody = document.getElementById("user-tbody");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("input-username").value.trim();
    const email = document.getElementById("input-email").value.trim();
    const isAdmin = document.getElementById("input-admin").checked;
    const imageInput = document.getElementById("input-image");
    const file = imageInput.files[0];

    function createImageCell(src) {
        const imgCell = document.createElement("td");
        if (src) {
            const img = document.createElement("img");
            img.src = src;
            img.width = 64;
            img.height = 64;
            imgCell.appendChild(img);
        }
        return imgCell;
    }

    function handleRow(imageSrc) {
        let found = false;
        for (const row of tbody.rows) {
            if (row.cells[0].textContent === username) {
                row.cells[1].textContent = email;
                row.cells[2].textContent = isAdmin ? "X" : "-";
                if (imageSrc) {
                    if (row.cells[3].firstChild) {
                        row.cells[3].firstChild.src = imageSrc;
                    } else {
                        const img = document.createElement("img");
                        img.src = imageSrc;
                        img.width = 64;
                        img.height = 64;
                        row.cells[3].appendChild(img);
                    }
                }
                found = true;
                break;
            }
        }

        if (!found) {
            const row = document.createElement("tr");

            const userCell = document.createElement("td");
            userCell.textContent = username;

            const emailCell = document.createElement("td");
            emailCell.textContent = email;

            const adminCell = document.createElement("td");
            adminCell.textContent = isAdmin ? "X" : "-";

            // Image cell
            const imgCell = createImageCell(imageSrc);

            row.appendChild(userCell);
            row.appendChild(emailCell);
            row.appendChild(adminCell);
            row.appendChild(imgCell);

            tbody.appendChild(row);
        }

        form.reset();
    }
    // Handle image file if provided
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            handleRow(e.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        handleRow(null);
    }
});

document.getElementById("empty-table").addEventListener("click", function() {
    tbody.innerHTML = "";
});