const Translator = new Map()

const english = new Map();
english.set("is_known_as", "is known as");
const spanish = new Map();
spanish.set("is_known_as", "es ahora conocido como");

Translator.set("ENG", english);
Translator.set("ES", spanish);

export const translate = (target:string, key:string) => {
  const language = Translator.get(target);
  return language.get(key);
}