const selectionModal = document.querySelector(".selection-modal");
const modalEnd = document.querySelector(".modal-2");
const selectionModalClose = document.querySelector(".selection-modal-close");
const progressBar = document.querySelector(".progress-fill");


// State management
let state = {
    totalMoney: 89914,
    totalBackers: 5007,
    stands: {
        bamboo: { left: 101, minPledge: 25 },
        black: { left: 64, minPledge: 75 }
    }
};

// Update UI functions
function updateStatistics() {
    const totalMoneyText = document.querySelector('.total-money');
    const totalBackersText = document.querySelector('.total-backers');
    const left25 = document.querySelectorAll('.left-25');
    const left75 = document.querySelectorAll('.left-75');
    
    // Update money and backers display
    totalMoneyText.textContent = `$${state.totalMoney.toLocaleString()}`;
    totalBackersText.textContent = `${state.totalBackers.toLocaleString()}`;
    
    // Update stands count
    left25.forEach(stand => stand.textContent = state.stands.bamboo.left);
    left75.forEach(stand => stand.textContent = state.stands.black.left);
    
    // Update progress bar
    const progress = (state.totalMoney / 100000) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
}






// Ouverture du premier modal
const buttonsStepZero = document.querySelectorAll(".button-step-1");
buttonsStepZero.forEach(button => {
    button.addEventListener("click", () => {
        selectionModal.classList.remove("hidden");
    });
});

// Fermeture du premier modal
selectionModalClose.addEventListener("click", () => {
    selectionModal.classList.add("hidden");
});


// Ouverture du deuxième modal
const buttonsStepOne = document.querySelectorAll(".button-step-2");
buttonsStepOne.forEach(button => {
    button.addEventListener("click", () => {
        // Trouver le conteneur parent pour identifier le type de pledge
        const container = button.closest('.container');
        
        // Trouver l'input de pledge s'il existe
        const pledgeInput = container.querySelector('input[type="number"]');
        const pledgeAmount = pledgeInput ? parseInt(pledgeInput.value) : 0;

        // Cas "no reward"
        if (container.textContent.includes("Pledge with no reward")) {
            state.totalBackers += 1;
            updateStatistics();
            selectionModal.classList.add("hidden");
            modalEnd.classList.remove("hidden");
        }
        // Cas Bamboo Stand
        else if (container.textContent.includes("Bamboo Stand")) {
            if (pledgeAmount < 25) {
                return;
            } else {
                state.stands.bamboo.left -= 1;
                state.totalBackers += 1;
                state.totalMoney += pledgeAmount;
                updateStatistics();
                selectionModal.classList.add("hidden");
                modalEnd.classList.remove("hidden");
            }
        }
        // Cas Black Edition
        else if (container.textContent.includes("Black Edition")) {
            if (pledgeAmount < 75) {
                return;
            } else {
                state.stands.black.left -= 1;
                state.totalBackers += 1;
                state.totalMoney += pledgeAmount;
                updateStatistics();
                selectionModal.classList.add("hidden");
                modalEnd.classList.remove("hidden");
            }
        }
    });
});

// Fermeture du deuxième modal
const gotItButton = modalEnd.querySelector("button");
gotItButton.addEventListener("click", () => {
    modalEnd.classList.add("hidden");
});



const radioInputs = document.querySelectorAll('input[type="radio"]');

radioInputs.forEach(input => {
    input.addEventListener('change', () => {
        // on reset la bordure cyan et le pledger
        const containers = document.querySelectorAll('.container');
        containers.forEach(container => {
            container.classList.remove("border-cyan");
        });
        const pledgers = document.querySelectorAll('.pledger');
        pledgers.forEach(pledger => {
            pledger.classList.add("hidden");
        });

        if (input.checked) {
            // Sélectionner le conteneur parent du bouton radio
            const container = input.closest('.container');
            container.classList.add("border-cyan");

            // Sélectionner le pledger qui suit directement ce conteneur
            const pledger = container.querySelector('.pledger')
                pledger.classList.add("flex");
                pledger.classList.remove("hidden");
        }
    });
});

// Bookmark functionality
const bookmarkBtn = document.querySelector('.back-this-project');
bookmarkBtn.addEventListener('click', () => {
    const circle = bookmarkBtn.querySelector('circle');
    const text = bookmarkBtn.querySelector('path');
    const textSpan = bookmarkBtn.lastChild;
    
    if (circle.getAttribute('fill') === '#2F2F2F') {
        // État bookmarked
        circle.setAttribute('fill', '#147A73');  // Couleur turquoise plus foncée
        text.setAttribute('fill', 'white');      // Icon en blanc
        textSpan.textContent = 'Bookmarked';
        textSpan.style.color = '#147A73';        // Texte en turquoise
    } else if(circle.getAttribute('fill') === '#147A73') {
        // État non bookmarked
        circle.setAttribute('fill', '#2F2F2F');
        text.setAttribute('fill', '#B1B1B1');
        textSpan.textContent = 'Bookmark';
        textSpan.style.color = '';              // Retour à la couleur par défaut
    }
});

updateStatistics()