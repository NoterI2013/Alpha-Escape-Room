const problemKey  = "ProblemE";
const numDisplay  = document.getElementById('numDisplay');
const judgeResult = document.getElementById('judge-result');

document.querySelectorAll('.num-btn').forEach(button => {
    button.addEventListener('click', function() {
        numDisplay.value += this.textContent;
    })
});

document.querySelector('.num-clear').addEventListener('click', function() {
    numDisplay.value = "";
});

document.querySelector('.num-backspace').addEventListener('click', function() {
    numDisplay.value = numDisplay.value.slice(0, -1);
});

document.querySelector('.num-enter').addEventListener('click', function() {
    judgeResult.innerHTML = "";
    if(numDisplay.value === "")
        return;

    axios.post('/axios/test', {
        problem: problemKey,
        encrypt: numDisplay.value
    })
    .then(function (response) {
        if(response.data.accept === true){
            judgeResult.innerHTML = generate("success");
            judgeResult.children[0].innerHTML += `<hr> <a href="/certificate?arg=${response.data.secret}&p=${problemKey}" class="alert-link">Click here to download the certificate</a>`
        }else if(response.data.accept === false){
            judgeResult.innerHTML = generate("danger");
        }
        
    })
    .catch(function (err) {
        console.error(err);
        judgeResult.innerHTML = generate("warning");
    })
    numDisplay.value = "";

});

const coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

const judgeTable = {
    info : "Judging...",
    success: "Accepted!!",
    danger: "Wrong Password",
    warning: "Error! Please retry or ask the administrator"
};

function generate(property){
    const resultDisplay = `
        <div class="alert alert-${property}" role="alert">
            ${judgeTable[property]}
        </div>
    `;
    return resultDisplay;
}