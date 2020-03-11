"use strict";

function isHookName(s) {
  return /^use[A-Z0-9].*$/.test(s);
}

module.exports = {
  create(context) {
    function checkIdentifier(node) {
      if (!isHookName(node.name)) {
        context.report({
          node,
          message: `variable storing value returned from create hook function must follow hook naming convention`,
        });
      }
    }

    const {
      createFunctionNames = [/^createUse[A-Z0-9].*$/],
      allowReturn = true,
      allowObjectProperties = false,
    } = Object.assign({}, ...context.options);

    function isHookCreatingName(s) {
      return createFunctionNames.some(matcher => {
        return typeof matcher === "string" ? s === matcher : matcher.test(s);
      });
    }

    function isHookCreating(node) {
      if (node.type === "Identifier") {
        return isHookCreatingName(node.name);
      } else if (
        node.type === "MemberExpression" &&
        !node.computed &&
        isHookCreating(node.property)
      ) {
        // Only consider React.useFoo() to be namespace hooks for now to avoid false positives.
        // We can expand this check later.
        const obj = node.object;
        return obj.type === "Identifier" && obj.name === "React";
      } else {
        return false;
      }
    }

    return {
      CallExpression(node) {
        if (isHookCreating(node.callee)) {
          switch (node.parent.type) {
            case "ReturnStatement":
              if (!allowReturn) {
                context.report({
                  node,
                  message: `create hook functions are not allowed to be directly returned from another function, assign it to a variable following hook naming conventions`,
                });
              }
              // TODO: should this be a warning? separate rule?
              break;
            case "AssignmentExpression":
              // console.log(node.p arent.left);
              if (node.parent.left.type === "Identifier") {
                checkIdentifier(node.parent.left);
              } else if (allowObjectProperties) {
                checkIdentifier(node.parent.left.property);
              } else {
                context.report({ node, message: `no assigning to namespace` });
              }
              break;
            case "Property":
              if (allowObjectProperties) {
                checkIdentifier(node.parent.key);
              } else {
                context.report({ node, message: `no assigning to namespace` });
              }
              break;
            case "VariableDeclarator":
              checkIdentifier(node.parent.id);
              break;
            // default:
            //   throw new Error(`unhandled parent type: ${node.parent.type}`);
          }
        }
      },
    };
  },
};
