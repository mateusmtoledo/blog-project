require('dotenv').config();
const mongoose = require('mongoose');
const async = require('async');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function createUser(name, isAdmin = false) {
  const nameArray = name.split(' ');
  const hashedPassword = bcrypt.hashSync(nameArray.join('').toLowerCase(), 10);
  return ({
    firstName: nameArray[0],
    lastName: nameArray[1],
    username: nameArray.join('').toLowerCase(),
    password: hashedPassword,
    admin: !!isAdmin,
  });
}

const adminName = 'Mateus Toledo';
const names = [
  'Birdie Franklyn',
  'Kaycee Jessamyn',
  'Forrest Dalton',
  'Lyall Lilah',
  'Daryl Kiley',
  'Merrick Eliana',
  'Deana Trudi',
  'Frannie Anna',
  'Sharise Devyn',
  'Shannen Mahalia',
];

const users = [
  ...names.map((name) => createUser(name, false)),
  createUser(adminName, true),
];

function saveUsers(cb) {
  async.parallel(
    users.map((user) => (cb) => new User(user).save(cb)),
    cb,
  );
}

const dummyText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra malesuada justo, at rhoncus tortor feugiat eu. Etiam ut lectus vitae est iaculis fermentum. Donec varius ac lectus sed vulputate. In sodales dictum nisi, sed sollicitudin purus egestas ut. Aenean suscipit ex ante, a efficitur metus hendrerit pellentesque. Donec bibendum commodo felis in sodales. Maecenas mattis enim ut urna tempor, in interdum nibh pulvinar. Nunc lorem quam, congue in lacus in, porta gravida metus. Sed eu quam eros. Suspendisse finibus, enim vel hendrerit feugiat, augue felis facilisis magna, sit amet sagittis nisi diam ut massa.\nUt et euismod orci. Mauris id finibus risus, at luctus libero. Nulla facilisi. Fusce ac rutrum turpis, vitae sollicitudin nisl. Sed et odio sollicitudin quam tempor auctor vestibulum nec augue. Sed eu gravida mauris. Donec dolor mauris, finibus sit amet mauris id, efficitur scelerisque metus. Donec euismod ex eu mauris volutpat, vel tristique dui imperdiet. Ut in tortor cursus, vulputate orci ut, facilisis dui. Suspendisse lobortis consectetur odio, non cursus nisl maximus ac. Ut vitae interdum sapien, ut semper ligula. Nullam ut pretium nisl. Integer blandit risus nunc, id pellentesque sem posuere quis. Proin non hendrerit mauris, vel sollicitudin nibh.\nPhasellus libero diam, congue vitae tristique et, hendrerit at enim. Donec pulvinar, lectus pretium tempor imperdiet, nunc metus congue diam, vel volutpat diam velit id leo. Aliquam nulla risus, elementum sit amet porttitor lobortis, vestibulum quis mi. Ut nec placerat nibh. Cras dictum nulla at odio pretium fringilla. Duis placerat massa a dui maximus iaculis. Integer et risus nec diam eleifend dictum. Morbi convallis tellus in accumsan feugiat. Phasellus aliquet sit amet ipsum eget viverra. Integer at dui id quam consequat sollicitudin. Vivamus vulputate rutrum erat at vehicula. Duis et ex consequat, convallis justo vel, aliquet risus. Ut quis aliquet eros. Ut tincidunt porta diam, at ultricies nunc rhoncus in. Donec et eros sit amet arcu accumsan condimentum.\nCras ornare erat ultrices libero placerat venenatis. Maecenas tortor ex, ultrices vel magna vel, dapibus luctus nulla. Nullam non augue interdum, ornare diam nec, pulvinar nibh. Vestibulum commodo at ipsum a feugiat. Suspendisse hendrerit sollicitudin accumsan. Sed semper venenatis eros at efficitur. Nulla in condimentum mi. Morbi scelerisque lacinia enim, vitae facilisis nibh tincidunt nec. Proin non vulputate turpis. In quis pellentesque mauris, id pellentesque diam. Cras pharetra sed lectus id fermentum. Donec euismod volutpat risus id sagittis. Mauris sed convallis orci. Praesent posuere blandit cursus. Cras eget convallis eros.\nDonec nec convallis nunc, eu aliquam nisi. In porta, enim a elementum laoreet, ex nisi malesuada mi, quis eleifend massa ipsum sit amet elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer accumsan finibus nisi in scelerisque. Quisque id nibh viverra, dignissim nunc et, congue nisl. Ut aliquet efficitur magna, eu facilisis odio consectetur sit amet. Nunc non iaculis felis. Phasellus non auctor urna, nec commodo elit. Donec mollis, ligula vestibulum tempus ultricies, massa sem semper arcu, id auctor metus eros et lorem.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean placerat gravida magna, a mollis erat lacinia ut. Vestibulum nec metus nec dolor tempus malesuada. Integer libero eros, tincidunt vitae erat imperdiet, eleifend consectetur elit. Donec sapien arcu, volutpat non rutrum mollis, rhoncus eu tellus. Mauris enim velit, finibus vel leo et, finibus elementum nibh. Donec ultricies purus orci, ac porttitor diam consectetur vitae. Ut in fermentum nibh, quis congue nunc. Quisque consequat quam justo, quis rutrum mauris pulvinar ut. Vestibulum convallis dignissim pellentesque.\nDuis fringilla, mi eget volutpat rutrum, nisi purus posuere diam, eu feugiat nisi lorem et arcu. Suspendisse potenti. Vivamus eget iaculis ipsum, id consequat ex. Pellentesque suscipit felis sed elit faucibus, et scelerisque sapien egestas. Donec ac urna mauris. Cras laoreet tortor non arcu facilisis malesuada. Maecenas et nibh non ipsum dictum interdum ac ac est. Aliquam sit amet laoreet lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ullamcorper malesuada nunc eget eleifend. Nullam maximus tempor mi, ut semper augue. Duis dignissim lacus nec feugiat lobortis. Ut diam dui, sollicitudin at erat eget, convallis sodales nisi.\nUt pharetra sed libero vel luctus. Etiam molestie nunc eu viverra blandit. Phasellus gravida pretium fermentum. Curabitur ac feugiat nisl. Morbi orci neque, pharetra at porttitor eu, posuere et mauris. Phasellus feugiat ligula augue, a condimentum nulla semper et. Praesent efficitur cursus velit, quis faucibus ipsum mollis eget. Maecenas vehicula elit vel lacus sollicitudin, sed laoreet tellus pellentesque.\nVivamus eu ultricies arcu. Ut efficitur congue quam. Suspendisse quis mi sodales, imperdiet lectus vel, faucibus nulla. Fusce vel sodales magna, eget auctor nisi. Suspendisse finibus mattis purus, nec tristique diam ultricies dignissim. Aenean laoreet erat vitae maximus gravida. Vestibulum tempor dui ut turpis laoreet, sit amet vehicula risus mollis. Nullam semper risus sed pharetra lacinia. Aliquam accumsan justo et fermentum mattis.\nDuis sit amet purus nec urna euismod egestas. Donec at nunc lacus. Nulla pellentesque magna quis augue pharetra, quis luctus purus tempus. Aenean laoreet, diam sed tincidunt congue, justo est molestie tellus, ut congue sapien massa ut tellus. Etiam placerat eget mi a dapibus. Donec vel elementum ligula. Pellentesque blandit, purus at vestibulum commodo, dolor tellus accumsan lectus, nec mattis tortor elit at augue. Suspendisse quis congue lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.\n';

function getParagraphs(numberOfParagraphs) {
  return dummyText.split('\n').slice(0, numberOfParagraphs).join('\n');
}

function createPost() {
  return ({
    title: 'Lorem ipsum dolor sit amet',
    text: getParagraphs(Math.floor(Math.random() * 10) + 1),
  });
}

const posts = (() => {
  const postsArray = [];
  for (let i = 0; i < 10; i += 1) {
    postsArray[i] = createPost();
  }
  return postsArray;
})();

function savePosts(users, cb) {
  const adminId = users.find((user) => user.admin === true)._id;
  async.parallel(
    posts.map((post) => (cb) => new Post({ ...post, author: adminId }).save(cb)),
    (err, posts) => cb(err, { posts, users }),
  );
}

function createComment(authorId, postId) {
  return ({
    text: getParagraphs(1),
    author: authorId,
    post: postId,
  });
}

function saveComments({ users, posts }) {
  const nonAdminUsers = users.filter((user) => !user.admin);
  posts.forEach((post) => {
    for (let i = 0; i < 5; i += 1) {
      const randomAuthorId = nonAdminUsers[Math.floor(Math.random() * nonAdminUsers.length)]._id;
      const comment = createComment(randomAuthorId, post._id);
      new Comment(comment).save();
    }
  });
}

async.waterfall([
  saveUsers,
  savePosts,
  saveComments,
]);
