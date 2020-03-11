"use strict";

function nameMatches(matcher, name) {
  return typeof matcher === "string" ? name === matcher : matcher.test(name);
}

const errors = {
  nameIncorrect: (funcMatcher, variableMatcher) =>
    `variable storing value returned from ${funcMatcher.toString()} must match ${variableMatcher.toString()}`,
  noReturn: funcMatcher =>
    `value returned from ${funcMatcher.toString()} is not allowed to be directly returned from another function`,
  noNameSpace: funcMatcher =>
    `value returned from ${funcMatcher.toString()} is not allowed to be stored in an Object`,
};

module.exports = {
  errors,
  create(context) {
    return {
      CallExpression(node) {
        context.options.forEach(
          ({
            allowReturn = true,
            functionName,
            allowObjectProperties = true,
            variableName,
          }) => {
            function checkIdentifier(node) {
              if (!nameMatches(variableName, node.name)) {
                context.report({
                  node,
                  message: errors.nameIncorrect(functionName, variableName),
                });
              }
            }

            function isFunctionMatch(node) {
              if (node.type === "Identifier") {
                return nameMatches(functionName, node.name);
              } else if (
                node.type === "MemberExpression" &&
                !node.computed &&
                isFunctionMatch(node.property)
              ) {
                return true;
              } else {
                return false;
              }
            }

            if (isFunctionMatch(node.callee)) {
              switch (node.parent.type) {
                case "ReturnStatement":
                  if (!allowReturn) {
                    context.report({
                      node,
                      message: errors.noReturn(functionName, variableName),
                    });
                  }
                  break;
                case "AssignmentExpression":
                  if (node.parent.left.type === "Identifier") {
                    checkIdentifier(node.parent.left);
                  } else if (allowObjectProperties) {
                    checkIdentifier(node.parent.left.property);
                  } else {
                    context.report({
                      node,
                      message: errors.noNameSpace(functionName, variableName),
                    });
                  }
                  break;
                case "Property":
                  if (allowObjectProperties) {
                    checkIdentifier(node.parent.key);
                  } else {
                    context.report({
                      node,
                      message: errors.noNameSpace(functionName, variableName),
                    });
                  }
                  break;
                case "VariableDeclarator":
                  checkIdentifier(node.parent.id);
                  break;
              }
            }
          }
        );
      },
    };
  },
};
