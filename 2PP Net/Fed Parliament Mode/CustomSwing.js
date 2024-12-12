function CustomSwingToggle(obj) {
    PollList.forEach(element => {
        eval("HTMLElmnt = document.getElementById('" + element + "Swing')")
        if ($(obj).is(":checked")) {
            PassValue = HTMLElmnt.textContent
            HTMLElmnt.innerHTML = '<input onchange="ChangeCustomSwing(this)" type="number" value="' + PassValue + '" step="0.10"></input>'
            CustomSwing=true;
        } else {
            PassValue = HTMLElmnt.firstChild.value
            HTMLElmnt.innerHTML = PassValue
            CustomSwing=false;
        }
    });
}

function ChangeCustomSwing(object) {
    object.value = Number(object.value).toFixed(2)
    ParentID = object.parentElement.id.split("Swing")[0]
    eval("Swing." + ParentID + "=" + object.value)
    UpdateSwingTotal(Swing);
}