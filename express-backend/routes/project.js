import express from 'express';
var router = express.Router();


router.post('/posts', async function(req, res, next) {
  console.log("testing post")
  try {
    const newProject = new req.Models.Project({
        projectName: req.body.projectName,
        projectDescription: req.body.projectDetail,
        projectMembers: req.body.members,
        projectStarter: ''
    })
    await newProject.save()
    res.json({ status: "success" })
  } catch(err) {
    console.log(err)
    res.status(500).json({ status: "error", error: err.message })
  }
});

export default router;