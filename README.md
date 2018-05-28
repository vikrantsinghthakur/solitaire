# Solitaire
This is solitaire game built using React, a product of my boredom coupled with free time.
Standard solitaire rules apply, click the deck on top left corner to draw cards. No scorekeeping, just whether you win or don't. Additionally, no undo button for wrong moves; life doesn't give you one either.

# Dev notes
Redux is employed here to maintain state of the app and update it based on events.  
For drag and drop support, react-dnd is doing the lifting augmented by touch-backend. Touch-backend was preferred over HTML5 due to touch support, at the expense of additional configuration.

### Footnote for future self
initialSetup branch has initial setup of react with Webpack. advancedSetup branch has additional setup which includes redux and webpack-dev-server with HMR.  
These can be used as boilerplate for future projects.

# Known issues
Image fetching for cards is too slow. This causes laggy rendering of cards. ~~Hosting on a separate CDN is required. Since this project is cost sensitive, there is a need to analyse potential options.~~ Hosting these small projects is not so costly after all!
However, the image sizes still prove too large for medium to slow networks. They need to be compressed to smaller sizes before being served over the wire. Also need to analyse performance after prefetching those images.  
Another minor issue is the time required for first load of the app. If you are reading this and your name is not Vikrant, it is because of hosting on Heroku dyno. If there haven't been many requests to the dyno over a period of time, it goes to sleep. Any new incoming request has to wake it up first, and that wake-up time gets added to the load time. Subsequent reloads should work normally until the dyno has not served requests for a period of time and goes to sleep again.

# Reachout
[Facebook](https://www.facebook.com/vikrantsingh.thakur.14)
[LinkedIn](https://www.linkedin.com/in/vikrantsingh-thakur-7b855285/)
