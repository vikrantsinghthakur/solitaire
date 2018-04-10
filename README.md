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
[SOLVED]~~Image fetching for cards is too slow. This causes laggy rendering of cards. Hosting on a separate CDN is required. Since this project is cost sensitive, there is a need to analyse potential options.~~

# Reachout
[Facebook](https://www.facebook.com/vikrantsingh.thakur.14)
[LinkedIn](https://www.linkedin.com/in/vikrantsingh-thakur-7b855285/)
