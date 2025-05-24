import express from 'express';
var router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    const projects = await req.models.Project.find();
    res.json({ status: "success", projects: projects });
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ status: "error", error: err.message })
  }
});


router.post('/posts', async function (req, res, next) {
  console.log("testing post")
  console.log("incoming body:", req.body);
  try {
    const newProject = new req.models.Project({
      projectName: req.body.projectName,
      projectDescription: req.body.projectDescription,
      projectMembers: req.body.members,
      projectStarter: req.body.projectStarter
    })
    await newProject.save()
    res.json({ status: "success" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: "error", error: err.message })
  }
});

export default router;