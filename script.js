const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

const rotationValues = [
    { minDegree: 0, maxDegree: 30, value: "Tony" },
    { minDegree: 31, maxDegree: 90, value: "Steve" },
    { minDegree: 91, maxDegree: 150, value: "Chris" },
    { minDegree: 151, maxDegree: 210, value: "Tom" },
    { minDegree: 211, maxDegree: 270, value: "Natasha" },
    { minDegree: 271, maxDegree: 330, value: "Jack" },
    { minDegree: 331, maxDegree: 360, value: "Tony" },
];

const data = [16, 16, 16, 16, 16, 16];

var pieColors = [
    "#8b35bc",
    "#b163da",
    "#8b35bc",
    "#b163da",
    "#8b35bc",
    "#b163da",
];

let myChart = new Chart(wheel, {

    plugins: [ChartDataLabels],

    type: "pie",
    data: {

        labels: ["Steve", "Tony", "Jack", "Natasha", "Tom", "Chris"],

        datasets: [
            {
                backgroundColor: pieColors,
                data: data,
            },
        ],
    },
    options: {

        responsive: true,
        animation: { duration: 0 },
        plugins: {

            tooltip: false,
            legend: {
                display: false,
            },

            datalabels: {
                color: "#ffffff",
                formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                font: { size: 24 },
            },
        },
    },
});

const valueGenerator = (angleValue) => {
    for (let i of rotationValues) {

        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
            finalValue.innerHTML = `<p>Winner: ${i.value}</p>`;
            spinBtn.disabled = false;
            break;
        }
    }
};

let count = 0;

let resultValue = 101;

spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;

    finalValue.innerHTML = `<p>Good Luck!</p>`;

    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);

    let rotationInterval = window.setInterval(() => {

        myChart.options.rotation = myChart.options.rotation + resultValue;

        myChart.update();

        if (myChart.options.rotation >= 360) {
            count += 1;
            resultValue -= 5;
            myChart.options.rotation = 0;
        } else if (count > 15 && myChart.options.rotation == randomDegree) {
            valueGenerator(randomDegree);
            clearInterval(rotationInterval);
            count = 0;
            resultValue = 101;
        }
    }, 10);
});



// Customize Button
const settingsModal = document.getElementById("settings-modal");

const customizeBtn = document.getElementById("customize-btn");

const cancelBtn = document.getElementById("cancel-btn");
const okBtn = document.getElementById("ok-btn");

customizeBtn.onclick = function () {
    settingsModal.style.display = "block";
}

cancelBtn.onclick = function () {
    settingsModal.style.display = "none";
}

okBtn.onclick = function () {

    settingsModal.style.display = "none";
}

const tabBtns = document.querySelectorAll(".tab-btn");

tabBtns.forEach(button => {
    button.addEventListener("click", () => {

        tabBtns.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

    });
});

// Open Button

const openModal = document.getElementById("open-modal");
const openBtn = document.getElementById("open-btn");
const openCancelBtn = document.getElementById("open-cancel-btn");
const openSelectBtn = document.getElementById("open-select-btn");
const savedWheelItems = document.querySelectorAll(".saved-wheel-item");

openBtn.onclick = function () {
    openModal.style.display = "block";
}

openCancelBtn.onclick = function () {
    openModal.style.display = "none";
    savedWheelItems.forEach(item => {
        item.classList.remove("selected");
    });
    openSelectBtn.disabled = true;
}

openSelectBtn.onclick = function () {
    openModal.style.display = "none";
}

savedWheelItems.forEach(item => {
    item.addEventListener("click", () => {

        savedWheelItems.forEach(i => i.classList.remove("selected"));

        item.classList.add("selected");

        openSelectBtn.disabled = false;
    });
});

// Save button
const saveModal = document.getElementById("save-modal");
const saveBtn = document.getElementById("save-btn");
const saveCancelBtn = document.getElementById("save-cancel-btn");
const saveConfirmBtn = document.getElementById("save-confirm-btn");
const saveNewRadio = document.getElementById("save-new");
const saveOverwriteRadio = document.getElementById("save-overwrite");
const existingWheelsDiv = document.getElementById("existing-wheels");

saveBtn.onclick = function () {
    saveModal.style.display = "block";
}

saveCancelBtn.onclick = function () {
    saveModal.style.display = "none";
    document.getElementById("wheel-name").value = "";
    saveNewRadio.checked = true;
    saveOverwriteRadio.checked = false;
    existingWheelsDiv.style.display = "none";
}

saveConfirmBtn.onclick = function () {
    saveModal.style.display = "none";
}

saveNewRadio.addEventListener("change", function () {
    if (this.checked) {
        existingWheelsDiv.style.display = "none";
    }
});

saveOverwriteRadio.addEventListener("change", function () {
    if (this.checked) {
        existingWheelsDiv.style.display = "block";
    }
});