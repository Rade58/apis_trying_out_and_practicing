# box-sizing

Još jedan properti koju imamo u CSS-u. I koristio sam ga mnogo puta. Prvobitno je box-sizing, za sve druge browsere, osim IE bio content-box. A to je model kutije. To u osnovi znaci, da ja deklarišem širinu koja će biti širina sadržaja. A ako proglasite padding, kutija će biti veća. I tako kad bih deklarisao sirinu od 100%, kao što biste izjavili sa 100%,odjednom bih imao kutiju siroku 120%. Dakle, box-sizing: border-box replicira stari IE model i kaže: uključi tu padding na toj širini, tako da ne prelaziš preko sto posto.

NEKADA LJUDI STAVE ZVEZDICU PA DEFINISU border-box

Ali ne radite to zato što ne želite da koristite globalni selektor

Jer će I button-i i input-i i replaced elementi takođe dobiti ono što definisete

A TO NIJE DOBRO JER želite punu kontrolu, I POMENUTO BI BIO OVERKILL