class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let ancestors = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      ancestors++;
      currentVampire = currentVampire.creator;
    }
    return ancestors;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    // If either of them is root then the root will be the common ancestor
    if (!this.creator) {
      return this;
    } else if (!vampire.creator) {
      return vampire;
    }

    // Check who is more senior
    let curr = vampire;
    let curr2 = this;
    if (curr2.isMoreSeniorThan(curr)) {
      const depth = curr2.numberOfVampiresFromOriginal
      while (curr.numberOfVampiresFromOriginal !== depth) {
        if (curr.creator === curr2) {
          return curr2;
        }
        curr = curr.creator;
      }
    } else if (curr.isMoreSeniorThan(curr2)) {
      const depth = curr.numberOfVampiresFromOriginal
      while (curr2.numberOfVampiresFromOriginal !== depth) {
        if (curr2.creator === curr) {
          return curr;
        }
        curr2 = curr2.creator;
      }
    }
    // this and vampire are now equal in seniority
    while (curr !== curr2) {
      curr = curr.creator;
      curr2 = curr2.creator;
    }
    return curr2;
  }
}

module.exports = Vampire;

