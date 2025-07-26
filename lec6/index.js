function starter(callback) {
  console.log("starter order");
  setTimeout(() => {
    console.log("starter done");
    callback();
  }, 3000);
}

function maincourse(callback) {
  console.log("maincourse order");
  setTimeout(() => {
    console.log("main done");
    callback();
  }, 5000);
}

function sweets(callback) {
  console.log("sweets order");
  setTimeout(() => {
    console.log("sweets done");
    callback();
  }, 2000);
}

function bill(callback) {
  console.log("bill order");
  setTimeout(() => {
    console.log("bill done");
    callback();
  }, 6000);
}

// Correct flow
starter(() => {
  sweets(() => {
    maincourse(() => {
      bill(() => {
        console.log("All done, enjoy your meal!");
      });
    });
  });
});

