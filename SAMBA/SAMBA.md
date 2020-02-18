# KAKO INSTALIRATI I KORISTITI SAMBU

SERVICE KOJI OMOGUCAVA SHARING ZELJENIH FOLDERA

- sudo apt update

- sudo apt install samba

- whereis samba

- sudo vi /etc/samba/smb.conf

UNUTAR FAJLA DODAJEM OVO (U VIMU U INSERT MODE ULAZIS SA `i` , A U COMMAND MODE SA `esc`)

```bash
[sambashare]
    comment = Samba on Ubuntu
    path = /home/username/neki_tvoj_path
    read only = no
    browsable = yes
```

KAO STO VIDIS GORE TU TI JE PATH DO FOLDERA KOJEG SHARE-UJES (TIP: KUCAJ `pwd` U FOLDERU I KOPIRAJ PATH U GORNJI FAJL)

IZADJES IZ VIMA (`esc` `:wq` `enter`)

RESTARTUJ

- `sudo service smbd restart`

DOZVOLI U FIREWALL SETTINGS-U

- `sudo ufw allow samba`

AKO TI NE RADI FIREWALL

- `sudo ufw status`
- `sudo ufw enable`

