// console.log(document.querySelector('.hierarchy-content__item').firstElementChild.getAttribute('idDivWithChild'))

function getHierarchyLevel(hierarchy) {
    let result;

    hierarchy.forEach(e => {
        let num = +(e.getAttribute('parent'));

        if(num === 0) {
            result = e;
        }
    })

    return result;
}

if(document.querySelector('.hierarchy-content')) {
    let hierarchy = document.querySelectorAll('.hierarchy-content__list');
    let selectFirtshLevel = document.getElementsByClassName("custom-select")[0];
    let hierarchyFirstLevel = getHierarchyLevel(hierarchy);
    let hierarchyFirstLevelChildren = hierarchyFirstLevel.children;
    let select = document.querySelector('.responsible-content__select');

    for (let child of hierarchyFirstLevelChildren) {
        let insertOption = selectFirtshLevel.firstElementChild.firstElementChild.cloneNode(true);
        insertOption.innerHTML = child.innerHTML;
        insertOption.setAttribute('idDivWithChild', child.getAttribute('idDivWithChild'));
        select.appendChild(insertOption);
    }
}