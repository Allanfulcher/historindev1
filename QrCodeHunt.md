New page for a new system that uses the google accounts we have

# Context

There are a bunch of QR codes in the city, in the same coordinates where the streets are
This will be a little game where if you read all QR codes you win a prize, each QR code you read will be saved into the DB fro your google account

# Design
Page with a camera to read the qr codes and get back what it read, compare to the qr codes strings and if it matches, save it into the DB and mark that one as completed, so if you read it again nothing will happen

Add a map icon to the page too, so people can get the coordinates and routes to the next qr code, this map will have to be differente from the other map, since this one is not to see stories, but to how to get there

Use our design system, make this page avaiable via a card in the home page

Make functions modular,

Page with camera to read qr code, maybe open camera after a button, and text showing how many qr codes you got and how many you need to get

If not logged in, show a login button and prompt the user

If possible, we add a check, if the user came to the website via a qr code he read in the street, from his camera app and no from the website, and he is logged in, we show a litte popup to congratulate him for reading the qr code and mark it as completed, but remember that our site redirects when you enter the website to the domain/#/ for a legacy system, so we would need to pass that info

see if this is possible, and what isnt, and lets start

Make components modular, save them under _compoents on the page folder, if they are only used for that, other wise make them in the public components folder, check everything use all of your tools, use things we already made