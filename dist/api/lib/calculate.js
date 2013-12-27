var seedrandom = require('seedrandom');

/**
 * Get a solution to a given question in the problem set
 * @param data
 * @param cb
 */
function getResultForQuestion(data, cb) {
  // index of the question we need to find the solution to
  var qIdx = data.questionId;
  // question structure
  var question = data.problem.questions[qIdx - 1];
  // factors that will influence the randomization
  var factors = [ data.session.email ];
  var generatedFormula = generateOpenMathFromFormula(question, factors);

  data.gap.calculate(generatedFormula, function(err, resp) {
    console.log('generatedFormula');
    console.log(generatedFormula);
    console.log(resp);
    if (!err) {
      cb(null, resp);
    } else {
      cb(err, null);
    }
  });
}

/**
 * Substitutes the variables in the OpenMath formula template
 * with configured variables.
 */
function generateOpenMathFromFormula(question, factors) {
  var formula = question.field_formula;

  // generate a version of this question for this user based on factors
  question.field_variables.forEach(function(v) {
    // integer type of variables
    if (v.type === 'int') {
        // create a seed for randomization
        // TODO: sanitize question title?
        var seed = factors[0] + v.name + question.field_title + '.';
        var rng = seedrandom(seed); // creates a new PRNG
        var rnd = rng(); // gives random seed
        var min = parseInt(v.from, 10);
        var max = parseInt(v.to, 10);
        var result = min + Math.floor(rnd * (max - min + 1));
        // <OMV name='q1name1'/>
        var lookFor = "<OMV name='q" + question.field_id + v.name + "'/>";
        // <OMI>3</OMI>
        var replaceWith = "<OMI>" + result + "</OMI>";
        formula = replaceAll(formula, lookFor, replaceWith);
    }
  });

  return formula;
}


/**
 * Replace all occurrences of search in string with replacement
 * @param search
 * @param replacement
 * @returns {string}
 */
function replaceAll(string, search, replacement) {
  return string.split(search).join(replacement);
}


exports.getResultForQuestion = getResultForQuestion;
