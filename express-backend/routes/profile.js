import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (req.session && req.session.account) {
    console.log("Username:", req.session.account.username);
    res.send(`Hello, ${req.session.account.username}`);
  } else {
    console.log("No user session found.");
    res.status(401).send('Not signed in');
  }
});

router.post('/posts', async function (req, res, next) {
  console.log("testing post")
  // save to mongo db now
  try {
    const newProfile = new req.models.User({
      username: 'Test',
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      picture: req.body.proImage,
      role: req.body.roles,
      description: req.body.intro
    })
    await newProfile.save()
    res.json({ status: "success" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: "error", error: err.message })
  }
});

export default router;