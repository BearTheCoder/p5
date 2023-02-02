/*
if n is even, divide by 2
if n is odd, multiply by 3 and add 1

Numberphile Video:
https://www.youtube.com/watch?v=LqKpkdRRLZw 

The Coding Train Video:
https://www.youtube.com/watch?v=EYLWxwo1Ed8

"Explination" or Edmund Harriss Visualization:
https://opencurve.info/the-collatz-conjecture/

"If the current step is twice the value of the next step, rotate a fixed amount clockwise, 
otherwise rotate half of that fixed amount anticlockwise (and, again, stop at value 1)"

What isn't explained is that the sequence of numbers must be reversed. 
Example: (Start 53) [53, 80, 40, 20, 10, 5, 8, 4, 2, 1]
Example 2: (Start 9040) [9040, 4520, 2260, 1130, 565, 848, 424, 212, 106, 53, 80, 40, 20, 10, 5, 8, 4, 2, 1]

As you can see, the start of the array is hectic and all over the place, but at the end of the array we see a pattern we become firmiliar with.
This is what gives the visualization it's organic feel is that it "converges" or more realistically, expands a single point, in this case 1.

*/

function setup () {
  const length = 8;
  const angle = .08;
  createCanvas(1000, 1000);
  background(0);

  for (let i = 4; i < 10000; i++) {
    // Calculate Values
    let n = i;
    const seq = [];
    while (n != 1) {
      seq.push(n);
      n = collatz(n);
    }

    // Visualization Setup
    seq.reverse();
    resetMatrix();
    translate(400, height - 100); //Starting point
    rotate(-PI * .6); // Starting Angle
    stroke(255, 30);
    strokeWeight(.5);
    // Draw
    for (let j = 0; j < seq.length; j++) {
      if (seq[j] * 2 === seq[j + 1]) rotate(angle * 2);
      else rotate(-angle);
      line(0, 0, 0, -length);
      translate(0, -length);
    }
  }
}

function collatz (n) {
  if (n % 2 === 0) return n / 2;
  else return ((3 * n) + 1) / 2;
}
