import express from 'express';
var router = express.Router();

  router.get('/', (req, res) => {
  if (req.session?.account?.username) {
    res.json({ username: req.session.account.username }); 
  } else {
    res.status(401).json({ error: 'Not logged in' });
  }
});

router.get('/profiles', async (req, res) => {
  try{
    const profiles = await req.models.User.find({});
    res.json({ profiles });
  } catch(err) {
    console.error("Failed to fetch profiles: ", err)
    res.status(500).json({ status: "error", error: err.message })
  }
})

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
      username: req.body.username,
      //username: req.session?.account?.username ?? 'anonymous',
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

router.get('/status', (req, res) => {
  if (req.session?.account?.username) {
    res.json({ loggedIn: true, username: req.session.account.username});
  } else {
    res.json({ loggedIn: false });
  }
});

export default router;