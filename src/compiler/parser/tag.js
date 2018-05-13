import { error, pushChild } from "./util";

const whitespaceRE = /\s/;

const parseAttributes = (index, input, length, attributes) => {
  while (index < length) {
    let char = input[index];

    if (char === "/" || char === ">") {
      break;
    } else if (whitespaceRE.test(char)) {
      index += 1;
      continue;
    } else {
      let key = "";
      let value = "";
      let literal = false;

      while (index < length) {
        char = input[index];

        if (char === "/" || char === ">" || whitespaceRE.test(char)) {
          value = key;
          break;
        } else if (char === "=") {
          index += 1;
          break;
        } else {
          key += char;
          index += 1;
        }
      }

      if (value.length === 0) {
        let quote;
        char = input[index];

        if (char === "\"" || char === "'") {
          quote = char;
          index += 1;
        } else if (char === "{") {
          quote = "}";
          literal = true;
          index += 1;
        } else {
          quote = whitespaceRE;
        }

        while (index < length) {
          char = input[index];

          if (char === "/" || char === ">") {
            break;
          } else if ((typeof quote === "object" && quote.test(char)) || char === quote) {
            index += 1;
            break;
          } else {
            value += char;
            index += 1;
          }
        }
      }

      attributes.push({
        key: key,
        value: value,
        literal: literal
      });
    }
  }

  return index;
};

export const parseOpeningTag = (index, input, length, stack) => {
  let type = "";
  let attributes;

  while (index < length) {
    const char = input[index];

    if (char === ">") {
      const element = {
        index: stack.parseIndex++,
        type: type,
        attributes: attributes,
        children: []
      };

      pushChild(element, stack);
      stack.push(element);

      index += 1;
      break;
    } else if (char === "/" && input[index + 1] === ">") {
      pushChild({
        index: stack.parseIndex++,
        type: type,
        attributes: attributes,
        children: []
      }, stack);

      index += 2;
      break;
    } else if (whitespaceRE.test(char)) {
      attributes = [];
      index = parseAttributes(index + 1, input, length, attributes);
    } else {
      type += char;
      index += 1;
    }
  }

  return index;
};

export const parseClosingTag = (index, input, length, stack) => {
  let type = "";

  for(; index < length; index++) {
    const char = input[index];

    if (char === ">") {
      index += 1;
      break;
    } else {
      type += char;
    }
  }

  const lastElement = stack.pop();
  if (type !== lastElement.type && process.env.MOON_ENV === "development") {
    error(`Unclosed tag "${lastElement.type}"`);
  }

  return index;
};
