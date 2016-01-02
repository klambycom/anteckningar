import fs from 'fs';
import path from 'path';

let basePath = path.resolve(process.env.HOME, 'Anteckningar');
let markdown = '\.(markdown|md|mkd)(\.txt)?$';
let datePattern = '([12][0-9]{3})-([01][0-9])-([012][0-9])';
let matchDairy = new RegExp(`${basePath}/dairy/${datePattern}${markdown}`);
let matchMarkdown = new RegExp(markdown);
let defaultIndex = './index.md';
let index = path.resolve(basePath, 'index.md');

let walk = function (dir, done) {
  let results = [];

  fs.readdir(dir, function (err, list) {
    if (err) { return done(err); }

    let pending = list.length;

    if (!pending) { return done(null, results); }

    list.forEach(file => {
      file = path.resolve(dir, file);

      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            results = results.concat(res);
            if (!--pending) { done(null, results); }
          });
        }
        else {
          results.push(file);
          if (!--pending) { done(null, results); }
        }
      });
    });
  });
};

let createFileItem = x => {
  // Create wiki file
  let file = { path: x, isDairy: false, dairy: {} };

  // Create dairy file
  let matchedDairy = x.match(matchDairy);
  if (matchedDairy) {
    file.isDairy = true;
    file.dairy.year = matchedDairy[1];
    file.dairy.month = matchedDairy[2];
    file.dairy.day = matchedDairy[3];
  }

  return file;
};

export default {
  readIndex(cb) {
    fs.readFile(index, 'utf8', (err, data) => {
      if (err) { fs.readFile(defaultIndex, 'utf8', cb); }
      else { cb(null, data); }
    });
  },

  readFile(file, cb) {
    fs.readFile(path.resolve(basePath, file), 'utf8', cb);
  },

  readDir(cb) {
    walk(basePath, (err, data) => {
      if (err) { cb(err); }

      let files = data
        .filter(x => matchMarkdown.test(x))
        .map(createFileItem);

      cb(null, files);
    });
  }
};
