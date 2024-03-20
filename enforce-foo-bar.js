import util from 'util'

function logObject(obj) {
  console.log(util.inspect(obj, {showHidden: false, depth: null}))
}


// Performs action in the function on every variable declarator
function VariableDeclaratorVisitor(context, node, data) {

  data.myData.push(node)

  // Check if a `const` variable declaration
  if (node.parent.kind === "const") {
    // Check if variable name is `foo`
    if (node.id.type === "Identifier" && node.id.name === "foo") {
      // Check if value of variable is "bar"
      if (node.init && node.init.type === "Literal" && node.init.value !== "bar") {
        /*
          * Report error to ESLint. Error message uses
          * a message placeholder to include the incorrect value
          * in the error message.
          * Also includes a `fix(fixer)` function that replaces
          * any values assigned to `const foo` with "bar".
          */
        context.report({
            node,
            message: 'Value other than "bar" assigned to `const foo`. Unexpected value: {{ notBar }}.',
            data: {
                notBar: node.init.value
            },
            fix(fixer) {
                return fixer.replaceText(node.init, '"bar"');
            }
        });
      }
    }
  }
}

function ProgramProcessor(context, node, data) {
  // logObject(node)
}

const rule = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce that a variable named `foo` can only be assigned a value of 'bar'.",
    },
    fixable: "code",
    schema: []
  },
  create(context) {

    const data = {
      myData: []
    }

    return {
      VariableDeclarator(node) {

        VariableDeclaratorVisitor(context, node, data)
      },
      Program(node) {
        // console.log('OLA K ASE')
        ProgramProcessor(context, node)
      },
      // At the end of the script, you can access `storage` to retrieve the stored data
      'Program:exit'() {
        // Do something with stored data if needed
        console.log('Stored data:', data.myData.length);
      }
    };
  }
};


export default rule;
