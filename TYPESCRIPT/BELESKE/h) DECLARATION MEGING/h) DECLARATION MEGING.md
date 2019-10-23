# DECLARATION MERGING

OVO JE JEDAN VARY VARY IMPORTANT SECTION, U POGLEDUM FORMIRANJA PRAVOG MENTALNOG MODELA, KAKO TYPESCRIPT FUNKCIONISE

OVAJ NASLOV JE POJEDNOSTAVLJEN, A ONO USTVARI STA JA ZELIM DA IZVUCEM I OVOGA, JESTE SAZNANJE KAKO TO TYPESCRIPT, ODNOSNO VS CODE FORMIRA TOOLTIPS U KOJIM MI POKAZUJE STA JE DOZVOLJENO, A STA NIJE; I KOJE MI POMAZU DA SAZNAM KADA JE NEKA STVAR VALUE, A KADA JE U PITANJU TYPE

UZ TO, OVO NAM POMAŽE DA SHVATIMO KAKO MOŽEMO STAVITI MALE ISPRAVKE NA VRH BIBLIOTEKA ILI INFORMACIJE O NESAVRŠENIM TIPOVIMA, ILI MOŽDA ŽELITE DA PROTOTIPIRATE NEŠTO, A TIPOVI ZA TO JOŠ NE POSTOJE. OVO VAM POMAŽE DA POVEĆATE NEKE OD POSTOJEĆIH INFORMACIJA O TIPU U VAŠOJ APLIKACIJI

**U NAREDNO MDELU CU SE DOTACI I *namespace*-OVA (SA NJIMA SE PRVI PUT SUSRECE, ALI BICE MI ODMAH JASNO CEMU SLUZE)**

**MIKE NORTH KAZE DA SU ONI LES AND LESS POPULAR, I DA NISU VREDNI DA BIH IH POSEBNO COVER-OVAO, ODNOSNO NE TREBAM SE BAVITI NJIMA POSEBNO, A OVDE CES VIDETI STA ONI PREDSTAVLJAJU**

## :one: IDETFIERS

NA PRIMER, TO SU: *VARIJABLA*, *KLASA*, *FUNKCIJA*, *INTERFACE*

**O NJIMA MOGU RAZMISLJATI KAO *STVARIMA KOJE MOGU EXPORT-OVATI***

**INTERNALY TYPESCRIPT IDETIFIKATORE USTVARI NAZIVA *`SYMBOLS`***

```typescript
function foo(){}

interface Bar {}

namespace baz {

    let priv = "nesto"

    export const blah = priv + "drugacije";

}


//////////////// SVE OVE GORNJE STVARI SU IMPORTABLE I EXPORTABLE

export {foo, Bar, baz}

```

IDENTIFIKATORI MOGU BITI ASSOCIATED SA TRI STVARI:

- VALUE

- TYPE

- NAMESPACE

**NAMESPACE JE ABSTRAKCIJA, ALI U SUSTINI ON JE OBJEKAT KOJI IMA TYPE I IMA VALUE**

```typescript
//  U SLUCAJU GORNJEG namespace-A, MOZES RADITI SLEDECE

baz.blah       // PRISTUPIO SI VARIJABLI TOG NAMESPACE-A (ALI SAMO AKO SE KORISTIO export NA NJOJ)

// DAKLE NAMESPACE JE USTVARI KOLEKCIJA STVARI, ALL MERGED TOGETHER

baz.priv    // **  error  (ZATO STO NIJE KORISCENO SA export)
```

### JA USTVARI MOGU TESTIRATI DA LI JE NESTO VALUE, DALI JE NESTO TYPE, I DA LI JE NESTO NAMESPACE

- AKO MOZE DA BUDE ASSIGNED, ONDA JE TO VALUE, JER AKO NIJE VALUE TYPESCRIPT CE TO PODVUCI I RECI DA JE ERROR

```typescript
const x = foo
```

- DA POSTAVIM TO NA TEST POZICIJU (SINTAKSA SA *COLON*), I ISTO TAKO AKO NIJE TYPE, TYPESCRIPT WILL 'YELL AT ME'

```typescript
const y: Bar = {}
```

- DA PROVERIM DA LI JE NESTO NAMESPACE, HOVERUJEM PREKO NJEGA; DAKLE MORAM SE POUZDATI SAMO U TOOLTIPS

## :two: FUNKCIJE I VARIAJBLE, DAKLE PURELY JESU VALUES

KAO STO ZNAS, *NJIHOVI TYPE-OVI MOGU BITI EXTRACTED, KORISCENJEM SAMO [TYPE QUERIES](https://github.com/Rade58/apis_trying_out_and_practicing/blob/master/TYPESCRIPT/BELESKE/g%29%20ADVANCED%20TYPE-OVI/3.%20TYPE%20QUERIES.md#type-queries)*


```typescript

```



```typescript

```


[00:01:01]
>> Mike North: In TypeScript app, identifiers and just think of these as things that you could export, internally types script to call these symbols. Identifiers can be associated with up to three things. A value, a type or namespace. A namespace we haven't talked about yet, but it's pretty simple in that it's sort of like an object in that it has a type and it has a value.

[00:01:28] So in this situation we could do baz.biz. It's just sort of a collection of stuff all merged together. Not really worth covering on its own, and increasingly less popular as a tool to describe things. So I'm gonna show you how, given a symbol, you can test whether it can be used as a type.

[00:01:56] And we've already been doing this. Sorry, we're gonna test for a value first, and this is very intuitive. You should be able to complete an assignment of some sort. If it's a value, a variable should be able to hold it. If you get a type error here, something is wrong.

[00:02:16] Let's try it with the interface.
>> Mike North: No good. Bar only refers to a type but it's used as a value here, so this is an effective test to see if something is a value. How to test if something is a type? Try to use it as a type, try to use it on the left-hand side of an equals, or if it's a left you don't even have to do that

[00:02:42]
>> Mike North: So if you can do that successfully, bar can be regarded as type. To test whether something is associated with a namespace, you're gonna have to rely on ToolTips for that.
>> Mike North: And just note that all three of these things are importable and exportable. There's our interface. There's our value,

[00:03:07]
>> Mike North: And there's our namespace. So now, we kind of have the tests we can apply to things, to figure out what's going on. So functions and variables, they are purely values. You can only extract the type of a value using a type query.
>> Mike North: Interfaces are only types.

[00:03:32] If we try to complete an assignment here, we get the same error we were seeing above. Address only refers to a type, and is being used as a value here. Classes, this is where things get interesting, they pass both the value and the type tests, and here's what is going on.

[00:03:54] On one hand, a class is a factory to produce instances, right? It has a constructor. It has a prototype. Recently I think JavaScript, you can even do this now.
>> Mike North: We can have static members, right? Where we can access this right off of the class.
>> Mike North: So this is all associated with the factory of instances.

[00:04:30] On the other hand, using this as a type describes the instances themselves. It can be used as almost like an interface for the instance. So we can see this symbol contact works in both positions. Up here we can capture the class itself. Down here we can use it as a type.

[00:04:57] So it kind of occupies both slots.
>> Mike North: When declarations have the same name they kinda all stack on top of each other, and if you arrange things just the right way, mainly you don't have values that collide with other values. You can end up with something that looks like this, where when we export album, and look at this tool tip, this is a value, a type, and a namespace, all stacked on top of each other, all riding along on the same symbol.

[00:05:38] This is where, like I don't want you to gloss over the information in your ToolTips. This tells you a lot, this tells you, it's a class, there's an interface of the same name that augments that class and there's a namespace. So we could pass the type test here and that is to, we wouldn't even need the interface in order to do that cuz the class has a type in and of itself.

[00:06:01] The interface just merges on top of the class, and that means that if we had another album here, a new album, and then al2 dot, we can see that the interface has added this property artist. This is what you do is if someone has forgotten t add something in type information for a library.

[00:06:27] You could through an interface kind of stack on top of that, and it applies globally through your entire app. So there's only sort of one scope for where type information is held. It's not on a per module basis, it is holistically throughout the app.
>> Speaker 2: Even without importing or exporting it?

[00:06:46]
>> Mike North: Even without importing or exporting, what is that?
>> Speaker 2: If you do an override in your level, but you imported from outside somewhere, you're saying it's still appwide?
>> Mike North: Yes, the modification you make will happen appwide. And this is important because you might wanna make all of your modifications in one file, and then have that, take a fact elsewhere.

[00:07:14] There are certain things like types for globals, that would be really inconvenient to try to import and re-export because there's no concept of that. Good examples that would jQuery or Mocha, which it makes describe in it, those are global functions that you don't have to exclusively import.
>> Mike North: So namespaces, they have kind of their own spot in that we can see on this ToolTip a namespace is neither a class nor an interface, right?

[00:07:49] It's its own thing and it's part of this thing being exported. They can be merged with classes or functions. So here's an example of a class where we can see we've got address book. And what we're doing here, this is equivalent to what some languages would call an inner class where you've got sort of, you have a class that is namespace with respect to a parent class.

[00:08:17] So when we call our new, we're having to say addressBook.ABContact.
>> Mike North: The reason that this is allowed is because a namespace serves to sort of tack things onto something, right? It's just tacking AB contact onto address book. And there's not ambiguous syntax here. Address book is only something that can be invoked, right?

[00:08:45] Cuz the constructor is a function. So if we were to introduce a collision, we'd run into problems like this. So now we've got two things. Like addressbook.ABContact. Is it a string? Is it a class? Something's got to get resolved here. But it like, it is largely the static side of this class.

[00:09:17]
>> Mike North: Similarly, because it works with classes, we can expect that it will work for functions and classes are just functions, right? They're factories. We invoke classes by using the new keyword. And so similarly we can use format this way. But we've also stored this currency which is used inside format, right?.

[00:09:41] So it can kind of reference the namespace here. And there is no collision here. We either invoke the function or we use some of these things that we've tacked onto the function.
>> Mike North: In terms of the things I want you to takeaway with from my mental model perspective, knowing what's the type and knowing what's the value, will take you a long way.

[00:10:05] And knowing what can be augmented interfaces versus knowing what you kinda have to leave alone when their defined in types, values. So once you have a value like it's hard, you can't overwrite that because that would conflict with the way JavaScript behaves, when interfaces are fair game.