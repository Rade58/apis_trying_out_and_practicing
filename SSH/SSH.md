# OBJASNJNJE AKO TI NIJE INSTALIRAN SSH

- `sudo apt update`
- `sudo apt install openssh-server`
- `sudo systemctl status ssh.service`

AKO JE AKTIVNO NE DIRAM, A AKO NIJE

***
`sudo systemctl enable ssh`
`sudo systemctl start ssh`
***

AKO NEMA `~/.ssh`

- `cd ~`
- `mkdir .ssh`

## GITHUB RELATED

- `cd ~/.ssh`
- `ssh-keygen t rsa -b 4096 -C "your_email@example.com"`

AKO SI ZADO IME KOJE **NIJE** `id_rsa`, ONDA URADI I OVO

- `ssh-add ~/.ssh/neko_ime`

