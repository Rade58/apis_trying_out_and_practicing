# OVDE ZELIM DA SE PODSETIM TOGA DA JE MOGUCE I TYPE ANNOTATION ZA this U NEKOJ FUNKCIJI

## ONO STO TAKODJE ZELIM DA PRIKAZEM JESTE DA JE MOGUCE CITATI TYPE-OVE ZA this, I TYPE-OVE ZA PARAMETRE, I NJIH ONDA MOGU KORISTITI ZA TYPE POVRATNE VREDNOSTI, ILI IH MOGU KORISTITI U OBIMU FUNKCIJE

NAIME, MOGU PROCITATI SA KEYWORD-OM **typeof** I ONDA IH MOGU KORISTITI NESMETANO

EVO POGLEDAJ PRIMER

```typescript
function foo(
  this: {kakano: boolean},          // TYPE ANNOTATION ZA this
  param: string
) : [typeof this, typeof param] {   // KORISCENJE     typeof    OPERATORA NA PRIKAZANI NACIN

  // KAO STO VIDIS GORE
  // PROCITAO SAM TYPE-OVE ZA this I ZA PARAMETAR, KAKO BIH IH ZADAO ZA TYPE-OVE, KOJI FIGURISU U POVRATNOJ VREDNOSTI

  return [this, param]

}
```