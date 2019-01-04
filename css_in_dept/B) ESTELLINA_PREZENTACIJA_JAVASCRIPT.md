```JAVASCRIPT

function hasaclass(slctr){
  var i = j = 0,
      elements = document.querySelectorAll('.cur .ex li'),
      cur = document.querySelectorAll('.cur .ex ' + slctr);

  for (; i < elements.length; i++){
    elements[i].classList.remove('active');
  }

  for (; j < cur.length; j++){
    cur[j].classList.add('active');
  }
}  

```

PREDPOSTAVLJAM DA JE OVO EVENT HANDLER KOJI SE KORISTI PRI SCROLLING-U, ODNOSN OTRIGGERING-U 'scroll' EVENTA (PROVERICU SOURCE CODE PA MOZDE MOGU DA RECREATE PREZENTACIJU, SLICNI NJENOJ)

A PORED TOGA MI JE JAKO INTERESANTNO, KAKO OVA FUNKCIJA KORISTI VARIJABLE PETLJI