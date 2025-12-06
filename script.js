// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue, remove, update } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgyZ2_JDRNjGSQerEWtNXUUtnuPWfqGs4",
    authDomain: "mobile-programming-c855e.firebaseapp.com",
    projectId: "mobile-programming-c855e",
    storageBucket: "mobile-programming-c855e.firebasestorage.app",
    messagingSenderId: "34953012622",
    appId: "1:34953012622:web:5de872f6d0cb59aa7070df",
    measurementId: "G-VSPJQRM5TZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const contactRef = ref(database, "contacts"); 
console.log("Firebase database initialized:", database);

// Form handling
const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");
let editId = null;

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) return;

    if (editId) {
        // Edit existing contact
        update(ref(database, "contacts/" + editId), { name, email, message })
        .then(() => console.log("Edited contact:", { name, email, message }));
        editId = null;
    } else {
        // Add new contact
        const newContactRef = push(contactRef);
        set(newContactRef, { name, email, message })
        .then(() => console.log("Added new contact:", { name, email, message }));

    }

    contactForm.reset();
});

// 5️⃣ Real-time listener for contacts
onValue(contactRef, (snapshot) => {
    contactList.innerHTML = ""; // Clear list

    snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const data = childSnapshot.val();

        // Create card
        const card = document.createElement("div");
        card.style.border = "1px solid #ccc";
        card.style.padding = "15px";
        card.style.marginBottom = "10px";
        card.style.borderRadius = "8px";
        card.style.boxShadow = "2px 2px 8px rgba(0,0,0,0.1)";
        card.style.backgroundColor = "#f9f9f9";

        card.innerHTML = `
            <h3 style="margin:0 0 5px 0;">${data.name}</h3>
            <p style="margin:0 0 5px 0;"><strong>Email:</strong> ${data.email}</p>
            <p style="margin:0 0 10px 0;"><strong>Message:</strong> ${data.message}</p>
            <div>
                <button onclick="editContact('${key}', '${data.name}', '${data.email}', '${data.message}')">Edit</button>
                <button onclick="deleteContact('${key}')">Delete</button>
            </div>
        `;

        // Style buttons inside the same scope
        card.querySelectorAll("button").forEach(btn => {
            btn.style.padding = "5px 10px";
            btn.style.marginRight = "5px";
            btn.style.cursor = "pointer";
            btn.style.border = "none";
            btn.style.borderRadius = "5px";
            btn.style.backgroundColor = btn.textContent === "Edit" ? "#4CAF50" : "#f44336";
            btn.style.color = "white";
        });

        // Add card to the list
        contactList.appendChild(card);
    });
});




// 6️⃣ Edit and Delete functions
window.editContact = (id, name, email, message) => {
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("message").value = message;
    editId = id;
    console.log("Editing contact:", { id, name, email, message });
};

window.deleteContact = (id) => {
    remove(ref(database, "contacts/" + id))
    .then(() => console.log("Deleted contact with ID:", id));
};

