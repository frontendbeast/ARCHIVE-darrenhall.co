const contentful = require('contentful');
const fs = require('fs');

var path;

switch(process.env.NODE_ENV) {
  case 'development':
    path = '../../../../../';
    break;
  case 'production':
    path = '../../';
    break;
  default:
    path = './';
}

const constants = require(`${path}constants`);

const client = contentful.createClient({
  space: constants.CONTENTFUL_SPACE,
  accessToken: constants.CONTENTFUL_TOKEN
});

const paths = {
  data: `${__dirname}/data`,
  posts: `${__dirname}/data/posts`
};

function writeJSON(file, path, data) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }

    const filePath = `${path}/${file}.json`;

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', error => {
      if (error) {
        reject(error);
      } else {
        resolve(`${path}/${file}.json`);
      }
    });
  });
}

const store = {
  update: function() {
    const index = client.getEntry('639QjkBShykwUmcO0uI8cg').then(entry => {
      return writeJSON('index', paths.data, entry);
    });

    const posts = client.getEntries({'content_type': 'post', limit: 1000}).then(data => {
      const promises = [];
      promises.push(writeJSON('index', paths.posts, data));

      data.items.forEach(entry => {
        promises.push(writeJSON(entry.fields.slug, paths.posts, entry));
      });

      return Promise.all(promises);
    });

    return Promise.all([index, posts]).then(results => {
      return [].concat.apply([], results);
    });
  }
}

module.exports = store;

require('make-runnable');
