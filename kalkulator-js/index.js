const readline = require("readline-sync");

let ulangi = true;
let history = []; // To store calculation history
let previousResult = null; // To store the last calculation result

while (ulangi) {
    let angkaPertama = previousResult !== null ? previousResult : readline.question("Masukkan Angka Pertama: ");
    
    // Check if the previous result is used
    if (previousResult !== null) {
        const usePrevious = readline.question("Gunakan hasil sebelumnya? (y/n): ");
        if (usePrevious.toLowerCase() === "y") {
            angkaPertama = previousResult;
        } else {
            angkaPertama = readline.question("Masukkan Angka Pertama: ");
        }
    }

    const operator = readline.question("Pilih operator (+, -, *, /, %): ");
    const angkaKedua = readline.question("Masukkan Angka Kedua: ");

    const requiredOperator = ["+", "-", "*", "/", "%"];

    if (isNaN(angkaPertama) || isNaN(angkaKedua)) {
        console.log("Inputan anda tidak valid");
    } else if (!requiredOperator.includes(operator)) {
        console.log("Pilih sesuai operator yang tersedia");
    } else {
        const hasil = processHasil(parseFloat(angkaPertama), operator, parseFloat(angkaKedua));
        if (typeof hasil === "string") {
            console.log(hasil); // Display error message if applicable
        } else {
            console.log(`Hasil: ${hasil}`);
            previousResult = hasil; // Store the result for future calculations
            history.push(`${angkaPertama} ${operator} ${angkaKedua} = ${hasil}`); // Save history
        }
    }

    const ulang = readline.question("Apakah ingin mengulang? (y/n): ");
    if (ulang.toLowerCase() === "n") {
        ulangi = false;
        console.log("Riwayat Kalkulasi:");
        showHistory();
    }
}

function processHasil(angkaPertama, operator, angkaKedua) {
    switch (operator) {
        case "+":
            return angkaPertama + angkaKedua;
        case "-":
            return angkaPertama - angkaKedua;
        case "*":
            return angkaPertama * angkaKedua;
        case "/":
            if (angkaKedua === 0) {
                return "Error: Angka kedua tidak boleh 0.";
            }
            return angkaPertama / angkaKedua;
        case "%":
            return angkaPertama % angkaKedua;
        default:
            return "Operator tidak dikenali.";
    }
}

function showHistory() {
    if (history.length === 0) {
        console.log("Tidak ada riwayat kalkulasi.");
    } else {
        history.forEach((entry, index) => {
            console.log(`${index + 1}: ${entry}`);
        });
    }
}
