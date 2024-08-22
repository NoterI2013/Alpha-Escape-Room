const problemKey = "ProblemB"
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
            judgeResult.children[0].innerHTML += `<hr> <a href="/certificate?arg=${response.data.secret}&p=${problemKey}" class="alert-link">領取碎片</a>`
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

const judgeTable = {
    info : "等待系統回應...",
    success: "這次你很篤定，就是它了",
    danger: "不祥的預感讓你猶豫不決，不知是否應該拿去領賞",
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