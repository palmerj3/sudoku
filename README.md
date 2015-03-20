#Sudoku
By Jason Palmer

## Don't care, want to play

Ok.

[http://palmerj3.github.io/sudoku/](http://palmerj3.github.io/sudoku/)

## Installation
1. Clone repo
2. `cd /path/to/sudoku`
3. `npm install`
4. `npm test` (alternatively `gulp test`)

## Usage
1. `cd /path/to/sudoku`
2. `gulp dev`
3. Open browser to http://localhost:8080
4. Have fun (read instructions first)

## Instructions
When the game begins you will be presented with a partially filled board. The cells already filled are immutable but it's your responsibility to fill in the other numbers correctly.

For each cell you can leave an annotation by single-clicking (tapping on mobile) any of the numbers. This is a great technique for keeping track of possible numbers for the cell.

![Overlay](http://www.jason-palmer.com/sudoku/overlay.png "Overlay Example")

When you feel confident in your choice double-click (tap twice on mobile) the number to apply the value to that cell.

![Value](http://www.jason-palmer.com/sudoku/value.png "Value Example")

Once you have selected all of the correct numbers you will be shown a "You won" screen.

## Architecture

### Third-party
* Browserify
* gulp
* jshint
* Mocha
* Karma (PhantomJS)
* HammerJS

### Patterns

#### Component Architecture

Inspired by the [Google Angular Style Guide](http://google-styleguide.googlecode.com/svn/trunk/angularjs-google-style.html) I have implemented basic components.

The idea is that each "component" should have everything it needs to function independently. So you place your classes, tests, css, images, etc associated with this component all in the same folder.

#### Game Loop

I decided to take a slightly experimental path when developing this game admittedly because it was fun and I've been learning game development lately.

The basic things you do when implementing a game loop is:

1. Ensure all of your components have a Tick and Draw method (more below what that means)
2. Ensure all your components maintain state tightly
3. Ensure state is exclusively used to draw

##### Tick

The tick method is responsible for manipulating state (or calling methods that do this).  A good example is asteroids... assume your character is moving around and shooting bullets.  When TICK is called 60/s its responsibility is to move things a little bit and update state. Maybe a bullet has collided with the character bounding box. Now my state is "dead".

##### Draw

The draw method is responsible for representing the state visually and audibly (if applicable).  How many bullets are on the screen, what direction and velocity are they traveling?  Draw them.

#### Testing

I have chosen Mocha as the test framework since I tend to like the BDD style of testing using it.

I have also chosen Karma with PhantomJS as the test runner. This allows for headless testing using a real browser. This is crucial for this app since it is so visually-centric, however it's also my preference for any app so you aren't messing with JSDom to mock the entire DOM. It's just problematic every time I go that route.
