# $or METODA ODNOSNO MONGO OPERATOR

NAJBOLJE JE OSTAVITI PRIMER

```javascript

Item.find({
  somefield: {$or: [
    'value1',
    'value2',
    'value3'
  ]}
}).exec()
```

JASNO JE DA CE BITI QUERYED ONI DOKUMENTI, KOJI MOGU IMATI BILO KOJU OD VREDNOSTI DEFINISANIH SA $or
