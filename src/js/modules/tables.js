import IMask from 'imask';

//Фиксирование данных строки таблицы
if(document.querySelector('.table-permission__row')) {
    let rowsTable = document.querySelectorAll('.table-permission__row');
    let colsTable = document.querySelectorAll('.table-permission__col');
    let activeRowTable = 'table-content__row_active';

    colsTable.forEach((e) => {
        e.addEventListener('click', () => {
            let idPermission = e.parentElement.lastElementChild.value;
            let inputsProcess = document.querySelectorAll('.row-id-process');

            if(document.querySelector('.table-content__row_active')) {
                rowsTable.forEach((e) => {
                    e.classList.remove(activeRowTable);
                });
            }

            inputsProcess.forEach((e) => {
                e.value = idPermission;
            });

            e.parentElement.classList.add(activeRowTable);
        });
    });
}

//Вставка новой строки в таблицу
if(document.querySelector('.button-add-row')) {
    let buttonAdd = document.querySelector('.button-add-row');
    let table = document.querySelector('.table-content');
    let namesCols = getNamesCols();
    
    buttonAdd.addEventListener('click', () => {
        addRow();   
    })

    //Функция добавления строки
    function addRow() {
        let tableRow = document.querySelector('.table-row');
        let addRow = tableRow.cloneNode(true);

        processRow(addRow);
        fixRow();
        setMasks();
    }

    function getNamesCols() {
        let inputs = getInputs();
        let result = [];
        
        for (let input of inputs) {
            result.push(input.name.slice(0, -1));
        }

        return result;
    }
    /* Вставил пока свой инпут, надо будет как-то объеденить */
    function getInputs() {
        let input = document.querySelectorAll('.input-row');
        let result = [];

        for (let child of input) {
            result.push(child);
        }

        return result;
    }

    function getInputs1() {
        let row = document.querySelector('.table-row');
        let result = [];

        for (let child of row.children) {
            result.push(child.firstElementChild);
        }

        return result;
    }

//Функция обработки добавляемой строки
function processRow(addRow) {
    let activeRowTable = 'table-content__row_active';

    table.appendChild(addRow);
    
    if(addRow.classList.contains(activeRowTable)) {
        addRow.classList.remove(activeRowTable); 
    } 

    setNamesRows(addRow);
}

function setNamesRows() {
    let rows = document.querySelectorAll('.table-row');
    let id = 1;

    rows.forEach(e => {
        for (let i = 0; i < e.children.length; i++) {
            let name = namesCols[i] + id;
            e.children[i].firstElementChild.name = name; 
        }
        id++;
    });
}

//Фиксирование строки 
let delRow;
fixRow();

function fixRow() {
    let rowsTable = document.querySelectorAll('.table-row');
    let activeRowTable = 'table-content__row_active';
    
    rowsTable.forEach((e) => {
        e.addEventListener('click', () => {
            rowsTable.forEach((e) => {
                e.classList.remove(activeRowTable);  
            });

            e.classList.add(activeRowTable);  
            delRow = e;   
       });
    });

}

//Удаление строки
let delButton = document.querySelector('.button-del-row');
if (delButton) {
    delButton.addEventListener('click', () => {
        let countRows = document.querySelectorAll('.table-row').length;
    
        if(countRows === 1 && delRow) {
            cleanRow();
            setMasks();
        } else if(delRow) {
            delRow.remove();
        } else {
            return;
        }
    
        setNamesRows();
    });

}

function cleanRow() {
    for (let children of delRow.children) {
        children.firstElementChild.value = '';
    }
}

//Сохранение дат
let saveButton = document.querySelector('.save-dates');
let submitSaveDates = document.querySelector('.submit-save-dates');
if (saveButton){
    saveButton.addEventListener('click', () => {
        let timesFrom = document.querySelectorAll('.time-from');
        let timesTo = document.querySelectorAll('.time-to');
    
        if(checkTimes(timesFrom, timesTo) ) {
            submitSaveDates.click();
        }
    });

}


//Проверка времени начала и окончания работ (нужно, чтобы время окончания было больше, чем время начала)
function checkTimes(timesFrom, timesTo) {
    let reg = '^([0-1][0-9]|2[0-4]):[0-5][0-9]$';
    let fl = true;

    timesFrom.forEach((e,i) => {
        if(timesFrom[i].value.search(reg) + 1 && timesTo[i].value.search(reg) + 1) {
            let objDateFrom = new Date();
            let objDateTo = new Date();
    
            objDateFrom.setHours(timesFrom[i].value.slice(0,2));
            objDateFrom.setMinutes(timesFrom[i].value.slice(3,5));
            objDateTo.setHours(timesTo[i].value.slice(0,2));
            objDateTo.setMinutes(timesTo[i].value.slice(3,5));
    
            if(objDateFrom >= objDateTo) {
                fl = false;
                timesFrom[i].classList.add('error-animation');
                timesTo[i].classList.add('error-animation');
            }
        } 
        else {
            timesFrom[i].classList.add('error-animation');
            timesTo[i].classList.add('error-animation');
            fl = false;
        }

        setTimeout(() => {
            if(document.querySelector('.error-animation')) {
                let errorAnimation = document.querySelectorAll('.error-animation');

                errorAnimation.forEach(e => {
                    e.classList.remove('error-animation');
                });
            }
        }, 1000);
    })

    return fl;
}

//Функция установки масок
function setMasks() {
    if(document.querySelector('.date-mask')) {
        setMaskDate();
    }

    if(document.querySelector('.time-mask')) {
        setMaskTime();
    }
}
}

//Вызов функции установки маски даты
if(document.querySelector('.date-mask')) {
    setMaskDate();
}

//Функция установки маски даты
function setMaskDate() {
    let dates = document.querySelectorAll('.date-mask');
    let dateOptions = {
        mask: '00.00.0000',
        lazy: false
    };

    dates.forEach(e => {
        new IMask(e, dateOptions);
    });
}


//Вызов функции установки маски времени
if(document.querySelector('.time-mask')) {
    setMaskTime();
}

//Функция установки маски времени
function setMaskTime() {
    let dates = document.querySelectorAll('.time-mask');
    let dateOptions = {
        mask: '00:00',
        lazy: false
    };

    dates.forEach(e => {
        new IMask(e, dateOptions);
    });
}

/*----------------------------------------------------------------------*/

let saveButtonProtection = document.querySelector('.save-protection');
let submitSaveProtection = document.querySelector('.submit-save-protections');

/* Кнопка сохранить */
if(saveButtonProtection){
    saveButtonProtection.addEventListener('click', () => {
        let protections = document.querySelectorAll('.protection');
        let entrances = document.querySelectorAll('.entrance');
        let exits = document.querySelectorAll('.exit');
        let vtors = document.querySelectorAll('.vtor');

        if(checkEmptyProtection(protections) ) {
            submitSaveProtection.click();
        }
    });
}

/* проверка на заполненность input */
function checkEmptyProtection(protections){
    let flag = false;

    protections.forEach((e,i) => {
        if(!(protections[i].value)){
            protections[i].classList.add('error-animation');
        }
        else(
            console.log(protections[i].value)
        )
        setTimeout(() => {
            if(document.querySelector('.error-animation')) {
                let errorAnimation = document.querySelectorAll('.error-animation');

                errorAnimation.forEach(e => {
                    e.classList.remove('error-animation');
                });
            }
        }, 1000);
    });    
}



// Нажатие на radio button

let countRows = document.querySelectorAll('.table-row').length;
const radioEntrance = document.querySelector('.entrance');
const radioExit = document.querySelector('.exit');

const changeToEntrance = () => {
    let parent = radioEntrance.closest('.table-row');
    let entrances = parent.querySelector('.entrance-on');
    let locations = parent.querySelector('.location');
    console.log(locations);
    locations.placeholder = 'Введите локацию';
    locations.value = '';
    locations.readOnly = false;
    let vtor = parent.querySelector('.vtor');
    vtor.disabled = false;
}

const changeToExit = () => {
    let parent = radioEntrance.closest('.table-row');
    let entrances = parent.querySelector('.entrance-on');
    let locations = entrances.querySelector('.location');
    console.log(locations);
    locations.value = '-';
    locations.readOnly = true;
    let vtor = parent.querySelector('.vtor');
    vtor.disabled = true;
    vtor.checked = false;

}

radioEntrance.addEventListener('change', changeToEntrance);
radioExit.addEventListener('change', changeToExit);


