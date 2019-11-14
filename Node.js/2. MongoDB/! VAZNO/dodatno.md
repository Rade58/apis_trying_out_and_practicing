# NEKE DODATN STVARI, VEZANE ZA DATA MODDELING

## UVEK MODEL YOUR DDATA PO TOME STA TVOJ APPLICATION NEEDS

>> you have a screen on your app that's got the user profile, it's got  information about settings to the side, and it's got all the posts. Maybe you should put that all in one thing, so you just hit it once and grab it all

>> That way we can just hit one route, do one database call and get everything we need for that page, and then we're done

## market service architecture (NEKO I TO KORISTI)

REC JE O MULTIPLE SERVERIMA

>> TADA MORAS IMATI queueing system. MOZES TREBATI I a gateway that is a proxy that sits in front of it

JEDAN SERVER HANDLE-UJE USERE, DRUGI NEKE ITEME

UOBICJAN PATTERN

>> ALI  it can get pretty crazy cuz now you gotta figure out a way to communicate between those different architectures

## NEM NISTA LOSE U KORISCENJU DVA DATBASE

NA PRIMER POSTGRESQL MOZES KORISTITI ZA ANALITIKU, A MONGO KA APPLICATION DATBASE