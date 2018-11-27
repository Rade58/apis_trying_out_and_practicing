console.log('************************************************');
console.log('************************************************');
console.log('************************************************');
console.log('************************************************');
console.log('************************************************');
console.log('************************************************');

console.log(document.forms);
console.log(document.forms.formular_8);
console.log(document.forms.osmi_formular);
console.log(document.forms[5]);

console.log(document.forms.osmi_formular.elements);
console.log(document.forms.osmi_formular.elements.one);
console.log(document.forms.osmi_formular.elements[1]);

console.log(document.forms.osmi_formular.elements[1].value);

console.log(document.forms.radios);
console.log(document.forms.radios.elements.radios.value);



console.log(document.forms.some_form_user);
console.log(document.forms.some_form_user.elements);
console.log(document.forms.some_form_user.elements.user_data.elements);

console.log(document.forms.some_form_user.logovanje);
console.log(document.forms.some_form_user.logovanje.form);
console.log(document.forms.some_form_user.user_data.form);
console.log(document.forms.some_form_user.user_data.name);
document.forms.some_form_user.user_data.name = "data_of_user";

console.log('************************************************');
console.log(document.forms.some_form_user.user_data);
console.log(document.forms.some_form_user.data_of_user);
console.log('************************************************');

console.log(document.forms.opet_formular.elements[0]);
console.log(document.forms.opet_formular.elements[1]);
console.log(document.forms.opet_formular.tekst_oblast);
console.log('************************************************');
console.log(document.forms.opet_formular.for_cola.checked);
console.log(document.forms.opet_formular.for_cola.value);
console.log('************************************************');
console.log(document.forms.opet_formular.tekst_oblast.value);
console.log('************************************************');

console.log(document.forms.radios.elements.radios.value);
console.log('************************************************');
console.log('************************************************');

console.log(window.selekcija);
console.log(selekcija);
console.log(selekcija.options);
console.log(selekcija.value);
console.log(selekcija.selectedIndex);

selekcija.selectedIndex = 3;

console.log(selekcija.value)
console.log(selekcija.selectedIndex);

selekcija.value = 'kruska';

console.log(selekcija.selectedIndex);

console.log('************************************************');
console.log('************************************************');

selekcija_vise.options[0].selected = true;
selekcija_vise.options[3].selected = true;

console.log(
    Array.from(selekcija_vise.options).filter(option => option.selected).map(option => option.value)
);


console.log('************************************************');
console.log('************************************************');
console.log('************************************************');
console.log('************************************************');
console.log('************************************************');
console.log('************************************************');





