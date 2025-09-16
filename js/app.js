const endDate = "25 Sep 2025 03:00 PM"

document.getElementById("end-date").innerText = endDate;
const inputs = document.querySelectorAll("input")

function clock(){
    const end = new Date(endDate)
    const now = new Date()
    const diff = (end-now) / 1000;

    if(diff < 0) {
        return;
    }

    // console.log(diff); 
    inputs[0].value = Math.floor(diff / 3600 / 24);
    // console.log(Math.floor(diff / 3600) % 24); this is for hours
    inputs[1].value = Math.floor((diff / 3600) % 24);
    // console.log(Math.floor(diff / 60) % 60);this for minutes
    inputs[2].value = Math.floor((diff / 60) % 60);
    // console.log(Math.floor(diff % 60)); this is for seconds
    inputs[3].value = Math.floor(diff % 60);
}

clock()


setInterval(() => {
    clock()
},
1000
)


