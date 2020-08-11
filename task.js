'use strict';

const checkBoxesArray = Array.from(document.querySelectorAll('input.interest__check'))

// flag checked for children
function setChildrenChecked(node, tagName, isChecked) {
    try {
        node.childNodes.forEach(function (item) {
            if (item.nodeName == tagName.toUpperCase()) {
                item.indeterminate = false;
                isChecked ? item.checked = true : item.checked = false;
            };
            setChildrenChecked(item, tagName, isChecked);
        });
    } catch {};
};

// flag indeterminate for parents
function setParentsChecked(node, tagName, isNeighbourChecked, isChecked) {
    try {
        let condition = false;
        node = node.closest('ul.interests');
        while (!condition) {
            condition = ((node.parentElement.tagName == 'UL') && (node.parentElement.className == ''));
            let tagInput = node.closest('li.interest').querySelector(tagName);
            tagInput.indeterminate = true;
            if (isChecked) {
                tagInput.indeterminate = true;
            } else {
                if (isNeighbourChecked) {
                    tagInput.indeterminate = true;
                } else {
                    tagInput.indeterminate = false;
                    tagInput.checked = false;
                };
            };
            node = node.parentNode;
        };
    } catch {};
};

// fill parents base in children
function setParentFull(array) {
    array.forEach(function (item) {
        let checkBoxList = Array.from(item.closest('li').querySelectorAll('input'));
        for (let checkBox in checkBoxList) {
            if (!(checkBoxList[checkBox].checked ? true : checkBoxList[checkBox].indeterminate ? true : false)) {
                return false;
            };
        };
        item.indeterminate = false;
        item.checked = true;
    });
};

// check neighbours status
function isNeighbourChecked(neighbourArray) {
    for (let neighbour in neighbourArray) {
        if (neighbourArray[neighbour].checked) {
            return true;
        };
    };
    return false;
};

// event function
checkBoxesArray.forEach(function (item) {
    item.addEventListener('change', function (event) {
        let node = item.closest('li');
        setChildrenChecked(node, 'input', item.checked);
        setParentsChecked(node, 'input', isNeighbourChecked(item.closest('ul').querySelectorAll('input')), item.checked);
        setParentFull(checkBoxesArray);
    });
});
