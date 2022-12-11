function createInstructor(firstName, lastName) {
  return {
    firstName: firstName,
    lastName: lastName
  }
}

// ES2015 Version
function createInstructor(firstName, lastName) {
  return { firstName, lastName }
}





var favoriteNumber = 42;

var instructor = {
  firstName: "Colt"
}

instructor[favoriteNumber] = "That is my favorite!"


// ES2015 Version
let instructor = {
  firstName: "Colt",
  [favoriteNumber]: "That is my favorite"
}





var instructor = {
  firstName: "Colt",
  sayHi: function() {
    return "Hi!";
  },
  sayBye: function() {
    return this.firstName + " says bye!";
  }
}

// ES2015 Version
let instructor = {
  firstName: "Colt",
  sayHi() {
    return "Hi!"
  },
  sayBye() {
    return this.firstName + " says bye!"
  }
}





function createAnimal(species, verb, noise) {
  return {
    species,
    [verb]() {
      console.log(noise)
    }
  }
}