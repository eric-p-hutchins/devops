const fs = require('fs')
const githubApi = require('github')
const token = 'ef517ce3872f7a50deefcf9866abe18dc5256b83'
const github = new githubApi()

github.authenticate({
  type: 'token',
  token: token
})

function getPullRequest(repo, number, callback) {
  github.pullRequests.get({
    owner: 'hutchiep190',
    repo: repo,
    number: number
  }, function (err, res) {
    callback(err, res)
  })
}

function dirFor(repo, branch) {
  return `github.com/hutchiep190/${repo}/${branch}`
}

function checkoutRepository(dir) {
  console.log(`Checking out ${dir}`)
}

function setupRepository(repo, headBranch, baseBranch) {
  const headDir = dirFor(repo, headBranch)
  const baseDir = dirFor(repo, baseBranch)
  fs.access(baseDir, (err) => {
    if (err) {
      if (err.code === "ENOENT") {
        checkoutRepository(baseDir)
      } else {
        throw err
      }
    }
  })
}

function handleAction(repo, number, action) {
  if (action != 'opened') {
    console.log(`Not handling action ${action}`)
    return
  }

  getPullRequest(repo, number, function (err, pullRequest) {
    if (err) {
      return console.log('Error getting pull request', err)
    }
    const baseBranch = pullRequest.base.ref
    const headBranch = pullRequest.head.ref
    console.log(`Handling pull request from branch ${headBranch} to branch ${baseBranch}`)
    setupRepository(repo, headBranch, baseBranch)
  })
}

module.exports.handleAction = handleAction
