const fs = require("fs");

const PATH = ".freeCodeCamp";

function readEnv() {
  let meta = {
    CURRENT_PROJECT: "calculator",
    LOCALE: "english",
    TEST_POLLING_RATE: "1000",
    LAST_KNOWN_LESSON_WITH_HASH: "1",
  };
  try {
    const META = fs.readFileSync("./.env", "utf8");
    const metaArr = META.split("\n").filter(Boolean);
    const new_meta = metaArr.reduce((meta, line) => {
      const [key, value] = line.split("=");
      return { ...meta, [key]: value };
    }, "");
    meta = { ...meta, ...new_meta };
  } catch (err) {
    console.error(err);
  }
  return meta;
}

function updateEnv(obj) {
  // TODO: Maybe not completely overwrite the file?
  const env = { ...readEnv(), ...obj };
  fs.writeFileSync(
    "./.env",
    Object.entries(env).reduce((acc, [key, value]) => {
      return `${acc}\n${key}=${value}`;
    }, "")
  );
}

module.exports = { readEnv, updateEnv, PATH };
