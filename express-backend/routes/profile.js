import express from 'express';
var router = express.Router();

  /* GET users listing. */
  // router.get('/', function (req, res, next) {
  //   if (req.session && req.session.account) {
  //     console.log("Username:", req.session.account.username);
  //     res.send(`Hello, ${req.session.account.username}`);
  //   } else {
  //     console.log("No user session found.");
  //     res.status(401).send('Not signed in');
  //   }
  // });

router.get('/posterName', (req, res) => {
  if (req.session?.account?.username) {
    res.json({ username: req.session.account.username }); 
  } else {
    res.status(401).json({ error: 'Not logged in' });
  }
});

router.post('/posts', async function (req, res, next) {
  console.log("testing post")
  console.log("incoming body:", req.body);
  // save to mongo db now
  try {
    const newProfile = new req.models.User({
      username: req.session.account.username,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      picture: req.body.picture,
      role: req.body.role,
      description: req.body.description
    })
    await newProfile.save()
    res.json({ status: "success" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: "error", error: err.message })
  }
});

export default router;