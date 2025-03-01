function validateInputs() {
    let hour = parseInt(document.getElementById("hour").value);
    let minute = parseInt(document.getElementById("minute").value);
    let lunch = parseInt(document.getElementById("lunch").value);
    let workHours = parseInt(document.getElementById("workHours").value);
    let workMinutes = parseInt(document.getElementById("workMinutes").value);

    let isValid = true;

    // Controllo orario di ingresso
    if (hour < 8 || hour > 18) {
        document.getElementById("hourError").textContent = "L'orario deve essere tra le 8:00 e le 18:00";
        isValid = false;
    } else {
        document.getElementById("hourError").textContent = "";
    }

    // Controllo durata del pranzo
    if (lunch < 30 || lunch > 90) {
        document.getElementById("lunchError").textContent = "La pausa pranzo deve essere tra 30 e 90 minuti";
        isValid = false;
    } else {
        document.getElementById("lunchError").textContent = "";
    }

    // Controllo durata giornata lavorativa
    if (workHours < 2 || workHours > 12) {
        document.getElementById("workError").textContent = "Le ore di lavoro devono essere tra 2 e 12";
        isValid = false;
    } else {
        document.getElementById("workError").textContent = "";
    }

    return isValid;
}

document.getElementById("calculate").addEventListener("click", function() {
    if (!validateInputs()) return;

    let hour = parseInt(document.getElementById("hour").value);
    let minute = parseInt(document.getElementById("minute").value);
    let lunch = parseInt(document.getElementById("lunch").value);
    let workHours = parseInt(document.getElementById("workHours").value);
    let workMinutes = parseInt(document.getElementById("workMinutes").value);

    let totalMinutes = (hour * 60 + minute) + (workHours * 60 + workMinutes) + lunch;
    let exitHour = Math.floor(totalMinutes / 60) % 24;
    let exitMinute = totalMinutes % 60;

    let result = `Orario di uscita: ${exitHour.toString().padStart(2, '0')}:${exitMinute.toString().padStart(2, '0')}`;
    document.getElementById("result").textContent = result;
});

document.getElementById("now").addEventListener("click", function() {
    let now = new Date();
    document.getElementById("hour").value = Math.max(8, Math.min(18, now.getHours()));
    document.getElementById("minute").value = now.getMinutes();
});

document.querySelectorAll(".preset").forEach(button => {
    button.addEventListener("click", function() {
        document.getElementById("workHours").value = this.getAttribute("data-hours");
        document.getElementById("workMinutes").value = this.getAttribute("data-minutes");
    });
});

document.getElementById("toggleTheme").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});
