# TRACE ROUTES VEZBA

MOZDA OVO MOGU DA RADIM SA POWERSHELLOM, JER ZELIM DA UZ POMOC **man** KOMANDE PRVO VIDIM STA JE TO **traceroute** KOMANDA

- man traceroute

NE RADI U POWERSHEL-U OVAKO, A NI U GIT BASH

*DOSAO SAM NA IDEIJU DA KORISTIM NEKI OD ONLINE TERMINALA*, DAKLE FROM BROWSER ([OVDE SAM PRONASAO LISTU RAZLICITIH](https://itsfoss.com/online-linux-terminals/))

IZABRAO SAM [OVAJ](https://codeanywhere.com/) (OVO JE SJAJNO) [mozda je ovaj bolji](https://paiza.io/projects/gP064H2ihSyvhSAHXrXU6w?language=bash) (MISLIM DA JE OVAJ DRUGI BOLJI (RADI man KOMAND, RADI I traceroute))

OVO SAMO RADIM DA BIH MOGAO KORITITI **man** KOMANDU KOJA MI DAJE MOGUCNOST DA IMAM ODMAH OBJASNJNJE O KOMANDI KOJU ZELIM KORISITTI

## DAKLE MOGU POKRENUTI

- man traceroute

VIDEO SAM NEKO OBJASNJENJE

```linux
traceroute  tracks  the route packets taken from an IP network on their
       way to a given host. It utilizes the IP protocol's time to  live  (TTL)
       field  and  attempts to elicit an ICMP TIME_EXCEEDED response from each
       gateway along the path to the host.

       traceroute6 is equivalent to traceroute -6

       tcptraceroute is equivalent to traceroute -T

       lft , the Layer  Four  Traceroute,  performs  a  TCP  traceroute,  like
       traceroute -T , but attempts to provide compatibility with the original
       such implementation, also called "lft".

       The only required parameter is the name or IP address of  the  destina‐
       tion host .  The optional packet_len`gth is the total size of the prob‐
       ing packet (default 60 bytes for IPv4 and 80 for IPv6).  The  specified
       size  can  be  ignored  in some situations or increased up to a minimal
       value.

       This program attempts to trace the route an IP packet would  follow  to
       some internet host by launching probe packets with a small ttl (time to
       live) then listening for an ICMP "time exceeded" reply from a  gateway.
       We  start our probes with a ttl of one and increase by one until we get
       an ICMP "port unreachable" (or TCP reset), which means we  got  to  the
       "host",  or  hit  a  max  (which defaults to 30 hops). Three probes (by
       default) are sent at each ttl setting and a line is printed showing the
       ttl,  address  of  the  gateway  and round trip time of each probe. The
       address can be followed by additional information  when  requested.  If
       the  probe  answers  come  from different gateways, the address of each
       responding system will be printed.  If there is no  response  within  a
       certain timeout, an "*" (asterisk) is printed for that probe.

       After the trip time, some additional annotation can be printed: !H, !N,
       or !P  (host,  network  or  protocol  unreachable),  !S  (source  route
       failed),  !F (fragmentation needed), !X (communication administratively
       prohibited), !V (host precedence violation), !C (precedence  cutoff  in
       effect),  or  !<num>  (ICMP unreachable code <num>).  If almost all the
       probes result in some kind of unreachable, traceroute will give up  and
       exit.

       We don't want the destination host to process the UDP probe packets, so
       the destination port is set to an unlikely value  (you  can  change  it
       with  the  -p flag). There is no such a problem for ICMP or TCP tracer‐
       outing (for TCP we use half-open technique, which prevents  our  probes
       to be seen by applications on the destination host).

       In  the  modern  network environment the traditional traceroute methods
       can not be always applicable, because of widespread use  of  firewalls.
       Such  firewalls  filter  the "unlikely" UDP ports, or even ICMP echoes.
       To solve this, some additional  tracerouting  methods  are  implemented
       (including  tcp), see LIST OF AVAILABLE METHODS below. Such methods try
       to use particular protocol and source/destination  port,  in  order  to
       bypass  firewalls  (to  be seen by firewalls just as a start of allowed
       type of a network session).
```

SADA MOGU POKRENUTUTI TRACEROUTE

- traceroute google.com

```linux
traceroute to google.com (172.217.26.14), 30 hops max, 60 byte packets
 1  172.17.0.1 (172.17.0.1)  0.032 ms  0.005 ms  0.006 ms
 2  ec2-54-150-128-17.ap-northeast-1.compute.amazonaws.com (54.150.128.17)  4.737 ms *  4.706 ms
 3  100.65.24.176 (100.65.24.176)  4.842 ms 100.65.25.48 (100.65.25.48)  6.845 ms 100.64.2.142 (100.64.2.142)  6.422 ms
 4  100.66.12.26 (100.66.12.26)  7.769 ms * 100.66.12.70 (100.66.12.70)  4.414 ms
 5  100.66.15.196 (100.66.15.196)  12.127 ms 100.66.6.71 (100.66.6.71)  13.842 ms 100.66.6.133 (100.66.6.133)  14.519 ms
 6  100.66.7.175 (100.66.7.175)  17.332 ms 100.66.6.103 (100.66.6.103)  20.526 ms 100.66.4.65 (100.66.4.65)  21.100 ms
 7  100.65.10.1 (100.65.10.1)  0.427 ms 100.66.4.151 (100.66.4.151)  26.121 ms 100.66.4.235 (100.66.4.235)  24.481 ms
 8  52.95.30.217 (52.95.30.217)  2.925 ms 100.65.9.33 (100.65.9.33)  0.245 ms 52.95.30.209 (52.95.30.209)  2.845 ms
 9  52.95.30.221 (52.95.30.221)  2.740 ms 52.93.72.171 (52.93.72.171)  1.079 ms 52.95.30.209 (52.95.30.209)  2.935 ms
10  52.93.72.140 (52.93.72.140)  0.997 ms 52.95.31.131 (52.95.31.131)  4.166 ms 52.95.31.14 (52.95.31.14)  2.784 ms
11  100.91.137.2 (100.91.137.2)  3.197 ms 52.93.72.140 (52.93.72.140)  0.590 ms 100.91.137.66 (100.91.137.66)  3.162 ms
12  54.239.53.27 (54.239.53.27)  9.509 ms 100.91.137.96 (100.91.137.96)  5.997 ms 52.93.73.245 (52.93.73.245)  8.885 ms
13  100.91.147.37 (100.91.147.37)  2.613 ms 52.93.250.238 (52.93.250.238)  9.436 ms 52.93.250.236 (52.93.250.236)  8.552 ms
14  52.93.250.230 (52.93.250.230)  8.916 ms 52.95.30.11 (52.95.30.11)  5.165 ms 52.95.30.53 (52.95.30.53)  4.713 ms
15  52.95.30.19 (52.95.30.19)  8.943 ms
```

(GORE IMAM 16 HOP-OVA (OBICNO JE TO RELLY REALY FAST INACE))

IZLISTACE SE MNOGO STVARI (AUTOR WORKSHOPA KAZE DA JE OVO KOMANDA KOJU POKRECEM KADA ZELIM DA ISPADNEM COOL PRED DRUGIM-A; JER NA EKRANU SE NESTO DESAVA KADA POKRENEM OVO)

## ONO STO SE USTVARI RADI SA OVOM KOMANDOM

UMESTO ping-A, KOJEG SAM JEDNOM RANIJE POKRENU, A KOJI HITS THE SERVER, AND THAN COMES BACK AND SAyS 'I'M ALIVE';traceroute MI DAJE MAPU OF EVRY SINGLE HOP ALONG THAT POINT

SECAS SE KAD JE RECEN ODA JE INTERNET IZGRADJEN NA TRUST-U, SERVERIMA, NODES, SWITCHES

UPRAVO SE TO RADI

**MAPIRA SE DAKLE PATH OF EVRY SINGLE SERVER I HIT ALONG THE WAY**

SVAKI PUT KADA VIDIS ANOTHER HOP (HOP PREDSTAVLJA KADA SE ID OD 1 DO 2, OD 2 D O3, OD 3 DO 4 I TAK ODALJE), KAZE USTVARI: JA SAM NA JEDNOM IP, I POKUSAVAM DA DODJEM DO DRUGOG (POGLEDAJ GORNJE BROJEVE)

ONO STO SU SERVERI SASDA GOVORILI 'I DON'T KNOW BUT THIS PERSON KNOWS, I DON'T KNOW BUT THIS PERSON KNOWS, I DON'T KNOW BUT THIS PERSON KNOWS...'

I TAKO SE PASS-UJE ALONGE, PASSUJE ALONG DOK NE END-UJEM UP NA ACTUAL GOOGLE SERVER-U

**TRACEROUTE POMAZE DA SE DIJAGNOSTIFIKUJU NETWORK PROBLEMI**

## AKO IMAM WEBSITE, A CLIENT KAZE: 'I CAN'T REACH YOUR WEBSITE', MOGU POKRENUTI traceroute

**ON CE MI RECI GDE SE HOPS BREAK-UJU DOWN**, AKO S I JA NE MOGU KONEKTOVATI NA SAJT

>> let's say the hops died here at number two. That means the ISP is not resolving, and you know something's just out in general. Versus if we get further down, we get closer to the Google resolver, as we get closer and closer to the actual server, and it dies out. We know that it could be a load balancer that's out, it's probably Google itself

DAKLE TRACEROUTE JE VEOMA KORISTAN ZA TO

VEOMA DOBRA STVAR KOJU TREBAM IMATI U MOM BACKPOCKET-U

## KADA SE POKTENE traceroute, DESAVA SE TAJ HOPING, AONO STA SE USTVARI DESAVA JESTE

I **traceroute** I **ping** RUNN-UJU STVAR KOJA SE ZOVE **ICMP** *REQUEST*

ICMP JE USTVARI [Internet Control Message Protocol](https://en.wikipedia.org/wiki/Internet_Control_Message_Protocol)

ZA RAZLIKU OD TCP-JA(TRANSM,ITION CONTROL PROTOCOL-A) OVO SU DAKLE NEKI HEALTH CHECK-OVI

ping JE NA PRIMER 'ARE YOU ALIVE HEALTH CHECK'

traceroute GLEDA KOLIKO JE HOP-OVA POTREBNO DA SE DODJE DO SERVER-A

## SERVER SE MOZE KONFIGURIRATI DA NE RESPOND-UJE NA *ICMP* REQUEST-OVE

AKO NEMAS RESPONSE-A, KADA POKRENES ping ZA NEKI SITE, TO SE ZOVE **BLACKHOLEING**

TO JE RAZLICITO U ODNOSU KADA SE EKSPLICITNO DENY-UJE REQUEST

*BLACKHOLING* ZNACI **'UOPSTE NECEMO ODGOVARATI NA TVOJ REQUEST'**

## IN THE OLD DAYS OF INTERNET, MOGAO SE TAKE-OVATI DOWN WEBSITE, TAKO STO GA ping-UJES

PODESE SE NA PRIMER FIVE TO SIX SERVERA, I SAMO PING-UJES NA ZELJENU ADRESU, ODNSONO DOMEN

NA PING JE KOMPJUTER OBLIGATED BIO DA RESPOND-UJE, I TAKO SE BACK IN OLD DAYS, MOGAO TAKEOVATI DOWN WEBSITE

DAKLE OVERLOAD-UJE SE SERVER SA REQUEST-OVIMA

*TO DANAS NECE RADITI*

## MOZES DAKLE DA DISABLE-UJES ICMP ZA TVOJ SERVER

AUTOR WORKSHOPA GA OBICNO KEEP-UJE ALIVE, DAKLE NE DISABLE-UJE POMENUTO, JER JE DOBRO ZA DEBUGGING

DAKLE MOGU DA ODLUCIM
