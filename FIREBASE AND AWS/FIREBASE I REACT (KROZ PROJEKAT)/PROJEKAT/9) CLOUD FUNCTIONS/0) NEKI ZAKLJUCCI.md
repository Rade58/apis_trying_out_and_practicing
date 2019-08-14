# OSTAVLJAM TRANSCRIPTION

What we've seen today is we've got a real time database that is highly scalable. And a lot more. And always like manageable than the real time database was, there was a database is great. Like, I've done a lot of really cool stuff with that. But like cloud firestorm definitely solves a lot. Like you had to be very nuanced with the real time database with caught fire. So you're able to kind of structure stuff in kind of the way you would think about your application and build documents that start from your UI backwards. I think a lot of us as front engineers have gotten API as I like to joke at work that I can take any blueprints at the backend team, mix and build anything off of that. I don't take any designs at the UI UX team mix and build anything based on that. But sometimes when both of those documents cross my desk at the same time, I can't do anything right. And that's where it becomes difficult. And so I think being able to kind of like think about first of all, like the amount of apps that you could build now that you probably wouldn't. This is like that kind of thing that we're talking about the other day as well. But like, there's a lot of times online I want to build this app and I like I sit down. I'm really, really excited. And then I remember I have to implement authentication.

And then all of the joy leaves my body and I do literally anything else.

Now I flip a switch. I've got some authentication. I think the the number apps that you can build and scale now because it's on Google's infrastructure. Right. You can. Like you are using effectively, like should you should you design an architecture system?

Well, there's no reason that you couldn't scale this pretty well. You've got file storage. You've got yeah. You've got database. You've got authentication. We've got the ability to run back end of functions. Right. I think Firebase for me is one of the more exciting platforms to build just web services on. And I have I've had a lot of fun with it and I plan on having a lot more fun with it in the future. Any large questions that I can answer for you?

*I mean, we're all excited, we're all, you know. When is it bad? Like, when did you or someone you knew about regret having gone to Firebase Direction?*

The chances of it going down because you messed up is relatively low, the chances of like your bad architecture decisions are not going to take your application down. They're gonna take your bank account down.

Right. And yes, that is a, you know, a happy problem to have which is, It's gotten so popular that like and you can set it in like both budget alerts and then like also like.
But. Pull the, pull the cord. Alerts. But like a lot of cases like your it might be slow or might be expensive, but like it will scale. And sometimes I can be a problem, right?
It having a back end that you can pull off the shelf does not. In fact, it puts even more onus on you.
The front engineer in this case to make good architecture decisions. Right.

**We saw what that provider pattern before that it basically allows us to get the same data in multiple places in our application. If we just did that with like that state, we would have to like do it in all different components.**

**Right. Or if we just decide I'm going to count all the comments right like that and get out of control. Right. Or if we just decide I'm going to count all the comments right like that and get out of control. Not not only not only on cost. Right. But also like on the fact of like for a mobile device. Right. That is a lot of data that you are sending to that device. And that data comes at the cost of gap baby data plans. But most importantly, battery. Right. Which is a great way to get like your application in a state. I like to call uninstalled. Right. And not used. Right. And so a lot of that performance stuff matters because like, yeah, we'll have like fancy phones and stuff like that. But like that's like a lot of the all the stuff which is like partially like a shared responsibility between the backend engineers and your team in the front engineers on your team is now totally on you.**

Right. And a lot of is a very different set of problems. Like, I think, you know, I like to joke that every back an engineer thinks that the front end, because they wrote jQuery form validation one time in 2007. And every front engineer thinks that they know about scalability cause they like did a join in 2011. Right. But it is like a lot of this stuff is brand new to us. Right. Like a lot of it is like a learning curve. How do you structure a noSql database is like an art in of itself that I think for a lot of us, we don't necessarily have that muscle totally trained. Right. It is very different. It is a lot of ways structure and noSql database is almost counter intuitive to everything you think about structure in a single database. Right.

Like put your data in multiple places is not a thing you do in a sql database. Right. You know, the idea that you would normalize data instead of normalizing it right is a totally different thing.

So it involves like you can make very bad choices because I think for a lot of us, we are by default predisposed to doing it because for like.

Like on mysql database or something like that, I post grass. What our good choices. There are bad choices. Right. So it is totally on you to make those choices. Now, on one hand. Yeah. You don't have to do as much of the like.

**Yeah. Like I never want to set up a VPN again personally. I've done it. I don't like it. I don't want if I want to do it again. Right. And the idea that like I don't have to do it is great.**

But it also means that like this totally kind of different thing is on me to understand. And like I said, like it is, I think it's still early days, like so much things that we think are common knowledge and people are not just like muscle memory for us.

**So yeah, you can make poor choices that will either be expensive choices or just like bad user experiences. And so far the amount of data you're sending over the wire and stuff along those lines and like for a lot of the code that we write, we don't get great logs all the time. Right. Because it's running on somebody else's device. Right. We do emulators and stuff like that. But like, it's not like, oh, I just look at this data center and is that like 99 percent CPR or something like that? Like, no, just somebody I thought, man, this stinks and took it off their phone. You don't know why. So.**

>>> The other thing is, too, it's like there is a little bit of like vendor locking.

**Yeah. I mean, good abstractions, right. The idea that we have provider components that is handy stuff and rather than writing like collection and dark everywhere will go a long way for you.**

Right. Like so that if you can find like the one or two provider components or whatever like redux or whatever you're doing. Right. And figure it out like giving the instructions that most of your application doesn't really care. I mean that's true.

DODATNO: 'cloud firestor is somewhat based on cloud data store' (JCP database as well)
