const problemKey  = "ProblemA";
const alphDisplay = document.getElementById('alphDisplay');
const judgeResult = document.getElementById('judge-result');

document.querySelectorAll('.alph-btn').forEach(button => {
    button.addEventListener('click', function() {
        alphDisplay.value += this.textContent;
    });
});

document.querySelector('.alph-send').addEventListener('click', function() {
    judgeResult.innerHTML = "";
    if(alphDisplay.value === "")
        return;

    judgeResult.innerHTML = generate("info");
    axios.post('/axios/test', {
        problem: problemKey,
        encrypt: alphDisplay.value
    })
    .then(function (response) {
        if(response.data.accept === true){
            judgeResult.innerHTML = generate("success");
            judgeResult.children[0].innerHTML += `<hr> <a href="/certificate?arg=${response.data.secret}&p=${problemKey}" class="alert-link">將成果帶回指揮部</a>`
        }else{
            judgeResult.innerHTML = generate("danger");
        }
    })
    .catch(function (err) {
        console.error(err);
        judgeResult.innerHTML = generate('warning');
    });
    alphDisplay.value = "";
});

document.querySelectorAll('.alph-backspace').forEach(button => {
    button.addEventListener('click', function() {
        alphDisplay.value = alphDisplay.value.slice(0, -1);
    });
});

document.querySelectorAll('.alph-clear').forEach(button => {
    button.addEventListener('click', function() {
        alphDisplay.value = "";
    });
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
    info : "等待系統回應...",
    success: "你有種預感，這組密碼與遺跡完美契合",
    danger: "這組密碼好像沒太大反應...",
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