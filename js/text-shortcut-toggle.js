document.getElementById('toggleTextShortcutBox3').addEventListener('change', function () {

    const box3 = document.getElementById('expandableBox3');
    const elements = box3.querySelectorAll('.sentence, .word, .letter');
    console.log(elements);


    if (this.checked) {
        elements.forEach(element => {
            element.classList.add('hidden');
        });
    } else {
        elements.forEach(element => {
            element.classList.remove('hidden');
        });
    }

});
